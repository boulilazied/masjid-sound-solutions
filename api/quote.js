import { Resend } from 'resend'

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

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({
      ok: false,
      error: 'Email service is not configured. Please contact us via WhatsApp.'
    })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const rows = [
      ['Name',                  name],
      ['Organization / Masjid', masjid || '—'],
      ['Email',                 email],
      ['Phone',                 phone  || '—'],
      ['City / State',          city   || '—'],
      ['Project Type',          needs  || '—'],
    ]

    const tableRows = rows
      .map(([label, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#5f6b7a;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:8px 12px;color:#0f172a">${value}</td>
        </tr>`)
      .join('')

    await resend.emails.send({
      from:    'AZ Audio Solutions <onboarding@resend.dev>',
      to:      'contact@azaudios.com',
      replyTo: email,
      subject: `New Quote Request — ${name}${masjid ? ` / ${masjid}` : ''}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff">
          <div style="background:#0b1220;padding:28px 32px">
            <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#b8860b">AZ Audio Solutions</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#fff">New Quote Request</h1>
          </div>
          <div style="padding:28px 32px">
            <table style="width:100%;border-collapse:collapse;background:#f8f9fa;border-radius:10px;overflow:hidden">
              <tbody>${tableRows}</tbody>
            </table>
            <div style="margin-top:24px">
              <p style="margin:0 0 8px;font-weight:600;color:#5f6b7a;font-size:13px;text-transform:uppercase;letter-spacing:.06em">Project Details</p>
              <div style="background:#f8f9fa;border-radius:10px;padding:16px 20px;color:#0f172a;line-height:1.7;white-space:pre-wrap">${message}</div>
            </div>
          </div>
          <div style="padding:16px 32px 28px;color:#5f6b7a;font-size:12px">
            Reply directly to this email to respond to ${name}.
          </div>
        </div>
      `,
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
