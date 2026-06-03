import nodemailer from 'nodemailer'

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function buildQuoteEmail({ name, masjid, email, phone, city, needs, message }) {
  const rows = [
    ['Name', name],
    ['Organization / Masjid', masjid || '—'],
    ['Email', email],
    ['Phone', phone || '—'],
    ['City / State', city || '—'],
    ['Project Type', needs || '—']
  ]

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#5f6b7a;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;color:#0f172a">${escapeHtml(value)}</td>
      </tr>`)
    .join('')

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e6e2d8;border-radius:14px;overflow:hidden">
      <div style="background:#0b1220;padding:28px 32px">
        <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#b8860b">AZ Audio Solutions</p>
        <h1 style="margin:6px 0 0;font-size:24px;color:#ffffff">New Quote Request</h1>
      </div>
      <div style="padding:28px 32px">
        <table style="width:100%;border-collapse:collapse;background:#f8f9fa;border-radius:10px;overflow:hidden">
          <tbody>${tableRows}</tbody>
        </table>
        <div style="margin-top:24px">
          <p style="margin:0 0 8px;font-weight:600;color:#5f6b7a;font-size:13px;text-transform:uppercase;letter-spacing:.06em">Project Details</p>
          <div style="background:#f8f9fa;border-radius:10px;padding:16px 20px;color:#0f172a;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</div>
        </div>
      </div>
      <div style="padding:16px 32px 28px;color:#5f6b7a;font-size:12px">
        Reply directly to this email to respond to ${escapeHtml(name)}.
      </div>
    </div>
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, masjid, email, phone, city, needs, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Name, email, and project details are required.'
    })
  }

  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD
  const emailTo = process.env.EMAIL_TO || 'contact@azaudios.com'

  if (!emailUser || !emailPassword) {
    console.error('EMAIL_USER or EMAIL_PASSWORD is not set')
    return res.status(500).json({
      ok: false,
      error: 'Email service is not configured. Please contact us via WhatsApp.'
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    })

    await transporter.sendMail({
      from: `AZ Audio Solutions <${emailUser}>`,
      to: emailTo,
      replyTo: email,
      subject: `New Quote Request — ${name}${masjid ? ` / ${masjid}` : ''}`,
      html: buildQuoteEmail({ name, masjid, email, phone, city, needs, message }),
      text: [
        'New Quote Request',
        '',
        `Name: ${name}`,
        `Organization / Masjid: ${masjid || '—'}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        `City / State: ${city || '—'}`,
        `Project Type: ${needs || '—'}`,
        '',
        'Project Details:',
        message
      ].join('\n')
    })

    return res.json({ ok: true, message: 'Your request has been received successfully.' })
  } catch (err) {
    console.error('Quote handler error:', err)
    return res.status(500).json({
      ok: false,
      error: 'Unable to send your request. Please contact us via WhatsApp.'
    })
  }
}
