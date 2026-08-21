import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
// API_PORT, not PORT: `npm run dev` runs this alongside Vite, and tooling that
// injects a generic PORT (IDE run configs, preview harnesses) would otherwise
// make this bind Vite's port, leaving the /api proxy pointing at nothing.
// Must stay in sync with the proxy target in vite.config.js.
const PORT = process.env.API_PORT || 3001

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:4173']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))
app.use(express.json())

const submissionsDir = path.join(__dirname, 'submissions')
const submissionsFile = path.join(submissionsDir, 'quote-requests.json')

if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir, { recursive: true })
}

if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, '[]', 'utf-8')
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/quote', (req, res) => {
  const { name, masjid, email, phone, city, needs, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Name, email, and project details are required.'
    })
  }

  const record = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    name,
    masjid: masjid || '',
    email,
    phone: phone || '',
    city: city || '',
    needs: needs || '',
    message
  }

  let current = []
  try {
    current = JSON.parse(fs.readFileSync(submissionsFile, 'utf-8'))
  } catch {
    current = []
  }

  current.push(record)
  fs.writeFileSync(submissionsFile, JSON.stringify(current, null, 2), 'utf-8')

  res.json({
    ok: true,
    message: 'Your request has been received successfully.'
  })
})

// Local mirror of api/lead.js (the conference QR capture on /amja). Writes to
// server/submissions/leads.json instead of emailing, so the modal can be tested
// end to end without sending mail or touching the Google Sheet. Production
// traffic goes to the Vercel serverless function, not here.
const leadsFile = path.join(submissionsDir, 'leads.json')

if (!fs.existsSync(leadsFile)) {
  fs.writeFileSync(leadsFile, '[]', 'utf-8')
}

app.post('/api/lead', (req, res) => {
  const {
    name, masjid, city, email, phone, message,
    smsConsent, needs, timeline, event, source, clientId, submittedAt
  } = req.body || {}

  if (!name || !masjid || !city || !email) {
    return res.status(400).json({
      ok: false,
      error: 'Please fill in your name, organization, city and email.'
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
    return res.status(400).json({ ok: false, error: 'That email address does not look right.' })
  }

  const record = {
    id: Date.now(),
    clientId: clientId || null,
    receivedAt: new Date().toISOString(),
    submittedAt: submittedAt || null,
    event: event || 'Booth',
    source: source || 'direct',
    name,
    masjid,
    city,
    email,
    phone: phone || '',
    smsConsent: smsConsent === true,
    needs: Array.isArray(needs) ? needs : [],
    timeline: timeline || '',
    message: message || ''
  }

  let current = []
  try {
    current = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'))
  } catch {
    current = []
  }

  // Same dedupe the Apps Script does in production: an offline retry that
  // actually reached us must not become a second row.
  if (record.clientId && current.some((entry) => entry.clientId === record.clientId)) {
    console.log(`[lead] duplicate ignored (${record.clientId})`)
    return res.json({ ok: true, duplicate: true })
  }

  current.push(record)
  fs.writeFileSync(leadsFile, JSON.stringify(current, null, 2), 'utf-8')
  console.log(`[lead] ${record.event} · ${record.name} / ${record.masjid} (${record.city})`)

  res.json({ ok: true, confirmationSent: false })
})

app.listen(PORT, () => {
  console.log(`Masjid Sound Solutions backend running on http://localhost:${PORT}`)
})
