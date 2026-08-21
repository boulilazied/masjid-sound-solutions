// Conference lead capture — POST /api/lead
//
// Fed by LeadCaptureModal on the /amja QR landing route. Deliberately separate
// from api/quote.js: different fields, and this one has to do three things per
// submission instead of one.
//
// Per submission, in priority order:
//   1. Append the row to the Google Sheet (durable, exportable list)
//   2. Email the internal notification to EMAIL_TO
//   3. Email the attendee their confirmation with the guide attached
//
// The three run independently. A lead is only reported as failed when every
// path failed, because the client queues failures in localStorage and retries —
// returning 500 when the row already landed in the Sheet would produce
// duplicates on retry.
//
// Env vars: EMAIL_USER, EMAIL_PASSWORD, EMAIL_TO (shared with api/quote.js),
// plus optional LEAD_SHEET_WEBHOOK_URL and SITE_ORIGIN.

import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

const GUIDE_FILENAME = 'AZ-Audio-Masjid-Sound-Guide.pdf'
const GUIDE_PUBLIC_PATH = '/guides/masjid-sound-guide.pdf'
const MAX_FIELD = 2000

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

// Trim, cap length, and collapse the newline injection vector in header-bound
// fields (name and email end up in a Subject and a replyTo).
function clean(value, { singleLine = false } = {}) {
  let out = String(value ?? '').trim().slice(0, MAX_FIELD)
  if (singleLine) out = out.replace(/[\r\n]+/g, ' ')
  return out
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function toList(value) {
  if (Array.isArray(value)) return value.map((item) => clean(item, { singleLine: true })).filter(Boolean)
  const single = clean(value, { singleLine: true })
  return single ? [single] : []
}

// ---------------------------------------------------------------------------
// The guide attachment.
// Try local disk first (vercel.json includeFiles ships public/guides with the
// function, and it is simply present in local dev), then fall back to fetching
// the deployed URL. If both fail the confirmation still goes out, with a link
// in place of the attachment — a lead is worth more than a perfect email.
// ---------------------------------------------------------------------------
async function loadGuide(origin) {
  const candidates = [
    path.join(process.cwd(), 'public', 'guides', 'masjid-sound-guide.pdf'),
    path.join(process.cwd(), 'guides', 'masjid-sound-guide.pdf'),
    path.join('/var/task', 'public', 'guides', 'masjid-sound-guide.pdf'),
  ]

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return { content: fs.readFileSync(candidate), filename: GUIDE_FILENAME }
      }
    } catch {
      /* try the next candidate */
    }
  }

  try {
    const response = await fetch(`${origin}${GUIDE_PUBLIC_PATH}`)
    if (response.ok) {
      const buffer = Buffer.from(await response.arrayBuffer())
      if (buffer.length > 1000) return { content: buffer, filename: GUIDE_FILENAME }
    }
  } catch {
    /* fall through to link-only */
  }

  console.warn('lead: guide PDF unavailable, sending link instead')
  return null
}

// ---------------------------------------------------------------------------
// Google Sheet append via an Apps Script Web App. See GOOGLE-SHEET-SETUP.md.
// Inert until LEAD_SHEET_WEBHOOK_URL is set, so the route works before the
// Sheet exists.
// ---------------------------------------------------------------------------
async function appendToSheet(lead) {
  const webhook = process.env.LEAD_SHEET_WEBHOOK_URL
  if (!webhook) return { skipped: true }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Sheet webhook returned ${response.status}`)
    return { ok: true }
  } finally {
    clearTimeout(timer)
  }
}

function internalEmail(lead) {
  const rows = [
    ['Name', lead.name],
    ['Masjid / Organization', lead.masjid],
    ['City / State', lead.city],
    ['Email', lead.email],
    ['Phone / WhatsApp', lead.phone || '—'],
    ['OK to text', lead.smsConsent ? 'Yes' : 'No'],
    ['Timeline', lead.timeline || '—'],
    ['Event', lead.event],
    ['QR source', lead.source],
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#5f6b7a;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;color:#0f172a">${escapeHtml(value)}</td>
      </tr>`
    )
    .join('')

  const needsHtml = lead.needs.length
    ? lead.needs
        .map(
          (need) =>
            `<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 11px;border-radius:99px;background:#fff4d6;color:#8a6508;font-size:13px;font-weight:600">${escapeHtml(need)}</span>`
        )
        .join('')
    : '<span style="color:#5f6b7a">None selected</span>'

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e2d8;border-radius:14px;overflow:hidden">
      <div style="background:#0b1220;padding:26px 32px">
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b8860b">${escapeHtml(lead.event)} · Booth Lead</p>
        <h1 style="margin:6px 0 0;font-size:23px;color:#ffffff">${escapeHtml(lead.name)}${lead.masjid ? ` — ${escapeHtml(lead.masjid)}` : ''}</h1>
      </div>
      <div style="padding:26px 32px">
        <table style="width:100%;border-collapse:collapse;background:#f8f9fa;border-radius:10px;overflow:hidden">
          <tbody>${tableRows}</tbody>
        </table>
        <div style="margin-top:22px">
          <p style="margin:0 0 10px;font-weight:600;color:#5f6b7a;font-size:12px;text-transform:uppercase;letter-spacing:.07em">Wants to solve</p>
          ${needsHtml}
        </div>
        ${
          lead.message
            ? `<div style="margin-top:22px">
                 <p style="margin:0 0 8px;font-weight:600;color:#5f6b7a;font-size:12px;text-transform:uppercase;letter-spacing:.07em">Their notes</p>
                 <div style="background:#f8f9fa;border-radius:10px;padding:14px 18px;color:#0f172a;line-height:1.7;white-space:pre-wrap">${escapeHtml(lead.message)}</div>
               </div>`
            : ''
        }
      </div>
      <div style="padding:14px 32px 26px;color:#5f6b7a;font-size:12px">
        Reply to this email to reach ${escapeHtml(lead.name)} directly. The guide has already been sent to them.
      </div>
    </div>
  `
}

function confirmationEmail(lead, attached) {
  const firstName = lead.name.split(' ')[0] || lead.name
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e6e2d8;border-radius:14px;overflow:hidden">
      <div style="background:#0b1220;padding:28px 32px">
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b8860b">AZ Audio Solutions</p>
        <h1 style="margin:8px 0 0;font-size:24px;color:#ffffff;line-height:1.25">Your Masjid Sound Guide</h1>
      </div>
      <div style="padding:28px 32px;color:#0f172a;line-height:1.75;font-size:15px">
        <p style="margin:0 0 16px">Assalamu alaikum ${escapeHtml(firstName)},</p>
        <p style="margin:0 0 16px">
          Thank you for stopping by our booth. ${
            attached
              ? 'The guide is attached to this email.'
              : `You can read the guide here: <a href="${process.env.SITE_ORIGIN || 'https://azaudios.com'}${GUIDE_PUBLIC_PATH}" style="color:#8a6508;font-weight:600">The Masjid Sound Guide</a>.`
          }
          It covers the five reasons a prayer hall is hard to hear in, what is physically causing each one, and what a correct fix looks like — including the questions worth asking any installer before you sign.
        </p>
        <div style="background:#fbf7ee;border-left:3px solid #b8860b;border-radius:10px;padding:16px 20px;margin:0 0 20px">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#8a6508">What you told us</p>
          <p style="margin:0;color:#0f172a">
            ${lead.needs.length ? escapeHtml(lead.needs.join(' · ')) : 'No specific issues selected'}${
              lead.timeline ? `<br><span style="color:#5f6b7a">Timeline: ${escapeHtml(lead.timeline)}</span>` : ''
            }
          </p>
        </div>
        <p style="margin:0 0 16px">
          We will review this and follow up within one business day. If you would rather talk sooner, call or WhatsApp us any time.
        </p>
        <p style="margin:0 0 6px">
          <a href="tel:+17248310196" style="color:#8a6508;font-weight:700;text-decoration:none">+1 724 831 0196</a>
          &nbsp;·&nbsp;
          <a href="tel:+17244275661" style="color:#8a6508;font-weight:700;text-decoration:none">+1 724 427 5661</a>
        </p>
        <p style="margin:0 0 22px">
          <a href="mailto:contact@azaudios.com" style="color:#8a6508;text-decoration:none">contact@azaudios.com</a>
          &nbsp;·&nbsp;
          <a href="https://azaudios.com" style="color:#8a6508;text-decoration:none">azaudios.com</a>
        </p>
        <p style="margin:0;color:#5f6b7a;font-size:13px">
          Jazak Allah khair,<br>
          <strong style="color:#0f172a">AZ Audio Solutions</strong><br>
          Masjid Sound Solutions — a division of AZ Audio Solutions
        </p>
      </div>
    </div>
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = req.body || {}

  const lead = {
    name: clean(body.name, { singleLine: true }),
    masjid: clean(body.masjid, { singleLine: true }),
    city: clean(body.city, { singleLine: true }),
    email: clean(body.email, { singleLine: true }),
    phone: clean(body.phone, { singleLine: true }),
    message: clean(body.message),
    smsConsent: body.smsConsent === true,
    needs: toList(body.needs),
    timeline: clean(body.timeline, { singleLine: true }),
    event: clean(body.event, { singleLine: true }) || 'Booth',
    source: clean(body.source, { singleLine: true }) || 'direct',
    // Client-generated id, stable across offline retries. Passed to the Sheet
    // so the Apps Script can skip a row it has already recorded.
    clientId: clean(body.clientId, { singleLine: true }),
    submittedAt: clean(body.submittedAt, { singleLine: true }) || new Date().toISOString(),
  }

  if (!lead.name || !lead.masjid || !lead.city || !lead.email) {
    return res.status(400).json({
      ok: false,
      error: 'Please fill in your name, organization, city and email.',
    })
  }

  if (!isEmail(lead.email)) {
    return res.status(400).json({ ok: false, error: 'That email address does not look right.' })
  }

  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD
  const emailTo = process.env.EMAIL_TO || 'contact@azaudios.com'
  const origin = process.env.SITE_ORIGIN || 'https://azaudios.com'

  const guide = await loadGuide(origin)
  const attachments = guide ? [guide] : []

  let transporter = null
  if (emailUser && emailPassword) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPassword },
    })
  } else {
    console.error('lead: EMAIL_USER or EMAIL_PASSWORD is not set')
  }

  const needsText = lead.needs.length ? lead.needs.join(', ') : 'None selected'

  const tasks = {
    sheet: appendToSheet(lead),

    notify: transporter
      ? transporter.sendMail({
          from: `AZ Audio Solutions <${emailUser}>`,
          to: emailTo,
          replyTo: lead.email,
          subject: `${lead.event} lead — ${lead.name} / ${lead.masjid} (${lead.city})`,
          html: internalEmail(lead),
          text: [
            `${lead.event} booth lead`,
            '',
            `Name: ${lead.name}`,
            `Masjid / Organization: ${lead.masjid}`,
            `City / State: ${lead.city}`,
            `Email: ${lead.email}`,
            `Phone / WhatsApp: ${lead.phone || '—'}`,
            `OK to text: ${lead.smsConsent ? 'Yes' : 'No'}`,
            `Timeline: ${lead.timeline || '—'}`,
            `Wants to solve: ${needsText}`,
            `QR source: ${lead.source}`,
            '',
            'Their notes:',
            lead.message || '—',
          ].join('\n'),
        })
      : Promise.reject(new Error('Email not configured')),

    confirm: transporter
      ? transporter.sendMail({
          from: `AZ Audio Solutions <${emailUser}>`,
          to: lead.email,
          replyTo: emailTo,
          subject: 'Your Masjid Sound Guide — AZ Audio Solutions',
          html: confirmationEmail(lead, Boolean(guide)),
          attachments,
          text: [
            `Assalamu alaikum ${lead.name.split(' ')[0] || lead.name},`,
            '',
            guide
              ? 'Thank you for stopping by our booth. The Masjid Sound Guide is attached to this email.'
              : `Thank you for stopping by our booth. You can read the guide here: ${origin}${GUIDE_PUBLIC_PATH}`,
            '',
            'It covers the five reasons a prayer hall is hard to hear in, what is causing each one,',
            'and what a correct fix looks like — plus the questions worth asking any installer.',
            '',
            `What you told us: ${needsText}`,
            lead.timeline ? `Timeline: ${lead.timeline}` : '',
            '',
            'We will follow up within one business day. To reach us sooner:',
            '+1 724 831 0196  |  +1 724 427 5661  |  contact@azaudios.com',
            '',
            'Jazak Allah khair,',
            'AZ Audio Solutions',
          ]
            .filter(Boolean)
            .join('\n'),
        })
      : Promise.reject(new Error('Email not configured')),
  }

  const [sheet, notify, confirm] = await Promise.allSettled([tasks.sheet, tasks.notify, tasks.confirm])

  // A skipped Sheet (no webhook configured) is NOT a capture. Counting it as
  // one would return 200 with the lead stored nowhere, and the client would
  // clear its retry queue on the strength of that — losing the lead silently.
  const sheetCaptured = sheet.status === 'fulfilled' && sheet.value?.ok === true
  const notifyCaptured = notify.status === 'fulfilled'
  const captured = sheetCaptured || notifyCaptured

  for (const [label, result] of [
    ['sheet', sheet],
    ['notify', notify],
    ['confirm', confirm],
  ]) {
    if (result.status === 'rejected') console.error(`lead: ${label} failed —`, result.reason?.message)
  }

  // The lead is captured if it reached the Sheet or our inbox. The attendee's
  // confirmation failing is a bad look but not a lost lead, so it does not
  // trigger the client-side retry (which would re-send everything).
  if (!captured) {
    return res.status(500).json({
      ok: false,
      error: 'Unable to send right now. Please try again, or WhatsApp us at +1 724 831 0196.',
    })
  }

  return res.json({ ok: true, confirmationSent: confirm.status === 'fulfilled' })
}
