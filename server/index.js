import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
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

app.listen(PORT, () => {
  console.log(`Masjid Sound Solutions backend running on http://localhost:${PORT}`)
})
