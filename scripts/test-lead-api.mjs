// Regression test for the lead-capture serverless handler (api/lead.js).
//
//   node scripts/test-lead-api.mjs
//
// Sends nothing: SMTP is left unconfigured and global fetch is stubbed to
// capture the Google Sheet call. Asserts the capture contract that the
// client-side retry queue depends on —
//
//   200  the lead reached the Sheet or our inbox (client may forget it)
//   500  it reached neither (client must keep it queued and retry)
//
// A 200 with the lead stored nowhere is the one outcome that loses data
// silently, so it is checked explicitly.

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import handler from '../api/lead.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const GUIDE = path.join(__dirname, '..', 'public', 'guides', 'masjid-sound-guide.pdf')
const MOCK_SHEET = 'https://script.google.com/mock-webhook'

function mockRes() {
  const res = { statusCode: 200, body: null, headers: {} }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (body) => { res.body = body; return res }
  res.setHeader = (key, value) => { res.headers[key] = value }
  return res
}

const valid = {
  name: 'Imam Yusuf Abdullah',
  masjid: 'Masjid Al-Noor',
  city: 'Pittsburgh, PA',
  email: 'test.lead@example.com',
  phone: '+1 412 555 0142',
  needs: ['Back rows or dead spots', 'Echo in the hall'],
  timeline: 'Next 6-12 months',
  smsConsent: true,
  clientId: 'test-client-id-1',
  event: 'AMJA',
  source: 'booth',
  message: 'Main hall seats about 400.',
}

const realFetch = globalThis.fetch
let failures = 0

async function check(label, { body = valid, method = 'POST', sheet = null, sheetFails = false, expect }) {
  if (sheet) process.env.LEAD_SHEET_WEBHOOK_URL = sheet
  else delete process.env.LEAD_SHEET_WEBHOOK_URL

  const sheetCalls = []
  globalThis.fetch = async (url, options) => {
    if (sheet && String(url) === sheet) {
      sheetCalls.push(JSON.parse(options.body))
      return { ok: !sheetFails, status: sheetFails ? 502 : 200 }
    }
    return realFetch(url, options)
  }

  const res = mockRes()
  try {
    await handler({ method, body }, res)
  } finally {
    globalThis.fetch = realFetch
  }

  const ok = res.statusCode === expect
  if (!ok) failures += 1
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label}\n` +
      `      expected ${expect}, got ${res.statusCode}` +
      (sheet ? `, sheet rows: ${sheetCalls.length}` : '')
  )
  return sheetCalls
}

// SMTP deliberately unconfigured for every case.
delete process.env.EMAIL_USER
delete process.env.EMAIL_PASSWORD

console.log('api/lead.js\n')

await check('rejects non-POST', { method: 'GET', expect: 405 })
await check('rejects missing required fields', { body: { name: 'A', city: 'C' }, expect: 400 })
await check('rejects malformed email', { body: { ...valid, email: 'nope' }, expect: 400 })
await check('500 when the lead reached nowhere', { expect: 500 })
const rows = await check('200 when the Sheet took it and email is down', {
  sheet: MOCK_SHEET,
  expect: 200,
})
await check('500 when Sheet and email both fail', {
  sheet: MOCK_SHEET,
  sheetFails: true,
  expect: 500,
})

// The Sheet row must carry the fields the follow-up list is sorted by.
const row = rows[0]
const rowOk =
  row &&
  row.clientId === valid.clientId &&
  row.source === 'booth' &&
  row.needs.length === 2 &&
  row.smsConsent === true
if (!rowOk) failures += 1
console.log(`${rowOk ? 'PASS' : 'FAIL'}  Sheet row carries clientId, source, needs and consent`)

// The attachment must resolve from disk, with no network call at send time.
const guideOk = fs.existsSync(GUIDE) && fs.readFileSync(GUIDE).subarray(0, 5).toString() === '%PDF-'
if (!guideOk) failures += 1
console.log(`${guideOk ? 'PASS' : 'FAIL'}  guide PDF present on disk and is a valid PDF`)

console.log(failures ? `\n${failures} failure(s)` : '\nAll checks passed')
process.exit(failures ? 1 : 0)
