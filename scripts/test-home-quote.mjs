import assert from 'node:assert/strict'
import nodemailer from 'nodemailer'
import handler from '../api/quote.js'
import { HOME_SERVICE, HOME_PACKAGES, validHomePackage, homeInquiryPath } from '../shared/home-inquiry.js'

// Isolated contract test: no network, real recipients, credentials, or submissions.
const originalTransport = nodemailer.createTransport
const originalEnv = { EMAIL_USER: process.env.EMAIL_USER, EMAIL_PASSWORD: process.env.EMAIL_PASSWORD, EMAIL_TO: process.env.EMAIL_TO }
const sent = []
nodemailer.createTransport = () => ({ async sendMail(message) { sent.push(message) } })
process.env.EMAIL_USER = 'test@example.invalid'
process.env.EMAIL_PASSWORD = 'test-only'
process.env.EMAIL_TO = 'recipient@example.invalid'
async function call(body, method = 'POST') {
  const res = { code: 200, status(code) { this.code = code; return this }, json(value) { this.body = value; return this } }
  await handler({ method, body }, res)
  return res
}
try {
  for (const [id, name] of Object.entries(HOME_PACKAGES)) {
    const url = new URL(homeInquiryPath(id), 'https://example.invalid')
    assert.equal(url.searchParams.get('package'), id)
    assert.equal(url.searchParams.get('service'), 'connected-home')
    const result = await call({ name: '<Test>', email: 'visitor@example.invalid', message: '<details>', needs: HOME_SERVICE, homePackage: id })
    assert.equal(result.code, 200)
    assert.equal(result.body.ok, true)
    assert.ok(sent.at(-1).html.includes(name))
    assert.ok(sent.at(-1).text.includes(`Home Package: ${name}`))
    assert.ok(sent.at(-1).html.includes('&lt;Test&gt;'))
    assert.ok(sent.at(-1).html.includes('&lt;details&gt;'))
    assert.equal(sent.at(-1).replyTo, 'visitor@example.invalid')
  }
  assert.equal(validHomePackage('toString'), '')
  assert.equal(validHomePackage(['plus']), '')
  assert.equal(new URL(homeInquiryPath('invalid'), 'https://example.invalid').searchParams.has('package'), false)
  await call({ name: 'Test', email: 'visitor@example.invalid', message: 'Test', needs: HOME_SERVICE, homePackage: '<script>' })
  assert.ok(sent.at(-1).text.includes('Not sure / custom scope'))
  await call({ name: 'Test', email: 'visitor@example.invalid', message: 'Test', needs: 'Commercial audio system', homePackage: 'plus' })
  assert.ok(sent.at(-1).text.includes('Home Package: —'))
  const before = sent.length
  assert.equal((await call({ name: 'Test' })).code, 400)
  assert.equal((await call({}, 'GET')).code, 405)
  assert.equal(sent.length, before)
  nodemailer.createTransport = () => ({ async sendMail() { throw new Error('Simulated mail failure') } })
  const originalError = console.error
  console.error = () => {}
  try {
    const result = await call({ name: 'Test', email: 'visitor@example.invalid', message: 'Test' })
    assert.equal(result.code, 500)
    assert.equal(result.body.ok, false)
  } finally { console.error = originalError }
  console.log('PASS: all three package links and email payloads; custom/invalid selections; non-home inquiries; HTML escaping; required fields; methods; mail-failure behavior. No mail sent.')
} finally {
  nodemailer.createTransport = originalTransport
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
}
