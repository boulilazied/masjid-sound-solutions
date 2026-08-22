// Generates print collateral for a conference booth into marketing/<event>/:
//
//   * QR codes as SVG (vector, for a print shop) and high-res PNG, one per
//     placement so ?src= tells you which piece actually got scanned
//   * booth-card.pdf — a ready-to-print letter-size table card
//
//   npm run build:marketing
//
// Styled to match the existing print collateral in toprint/ (AMJA_ads.ai,
// flyer1.ai, the 80x200cm banner): black ground, gold rules, serif headline.
// Error correction is 'H' (~30% recoverable) because these get printed,
// creased, and scanned across a room at an angle.

import QRCode from 'qrcode'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The printed QR codes point at the site root, so these match it — existing
// stock and any reprint send people to the same place. Only the ?src= tag
// differs per placement. The home page opens the capture modal on arrival.
const EVENT_SLUG = 'amja'
const LANDING = 'https://azaudios.com'
const HUMAN_URL = 'azaudios.com'

// One code per placement. `src` lands in the lead record and the Google Sheet.
const PLACEMENTS = [
  { src: 'booth', label: 'Booth banner / backdrop', png: 2400 },
  { src: 'flyer', label: 'Handout flyer', png: 1400 },
  { src: 'card', label: 'Business card / table tent', png: 1000 },
]

// Sampled from the printed collateral rather than the website palette.
const BLACK = '#000000'
const GOLD = '#d4af37'
const GOLD_BRIGHT = '#f4dd8f'
const GOLD_DEEP = '#a67c1a'
const WHITE = '#ffffff'
const SERIF = 'Times-Roman'

const OUT_DIR = path.join(__dirname, '..', 'marketing', EVENT_SLUG)
fs.mkdirSync(OUT_DIR, { recursive: true })

// QR modules stay pure black on pure white — gold-on-black looks on-brand and
// scans badly, which is the one thing this asset cannot afford.
const qrOptions = (width) => ({
  errorCorrectionLevel: 'H',
  margin: 2,
  width,
  color: { dark: '#000000', light: '#ffffff' },
})

const written = []

for (const placement of PLACEMENTS) {
  const url = `${LANDING}?src=${placement.src}`
  const base = `qr-${EVENT_SLUG}-${placement.src}`

  const svg = await QRCode.toString(url, { ...qrOptions(1000), type: 'svg' })
  const svgPath = path.join(OUT_DIR, `${base}.svg`)
  fs.writeFileSync(svgPath, svg, 'utf-8')
  written.push(svgPath)

  const pngPath = path.join(OUT_DIR, `${base}.png`)
  await QRCode.toFile(pngPath, url, qrOptions(placement.png))
  written.push(pngPath)
}

// ---------------------------------------------------------------------------
// Booth card — letter portrait, readable from a few feet away. The offer is
// stated next to the code: a bare QR with no promise attached gets scanned far
// less often, and this repeats the promise the banner already makes.
// ---------------------------------------------------------------------------
const W = 612
const H = 792

const cardPath = path.join(OUT_DIR, 'booth-card.pdf')
const doc = new PDFDocument({
  size: 'LETTER',
  margin: 0,
  info: {
    Title: 'AZ Audio Solutions — booth card',
    Author: 'AZ Audio Solutions',
    Subject: 'Free audio consultation for masjids',
  },
})
const cardStream = fs.createWriteStream(cardPath)
doc.pipe(cardStream)

// Black ground with an inset gold frame, as on the flyer panels.
doc.save().rect(0, 0, W, H).fillColor(BLACK).fill().restore()
doc
  .save()
  .rect(26, 26, W - 52, H - 52)
  .lineWidth(1.4)
  .strokeColor(GOLD_DEEP)
  .stroke()
  .restore()

doc
  .font('Helvetica-Bold')
  .fontSize(11)
  .fillColor(GOLD)
  .text('AZ  |  MASJID AUDIO', 0, 66, { width: W, align: 'center', characterSpacing: 3.4 })

doc
  .save()
  .moveTo(W / 2 - 46, 92)
  .lineTo(W / 2 + 46, 92)
  .lineWidth(1)
  .strokeColor(GOLD_DEEP)
  .stroke()
  .restore()

doc
  .font('Helvetica')
  .fontSize(8.5)
  .fillColor(GOLD)
  .text('PREMIUM QUALITY.  AFFORDABLE COST.', 0, 104, {
    width: W,
    align: 'center',
    characterSpacing: 2,
  })

// Serif headline, matching the flyer lockup.
doc
  .font(SERIF)
  .fontSize(37)
  .fillColor(WHITE)
  .text('Hear every Ayah.', 0, 148, { width: W, align: 'center' })
doc
  .font(SERIF)
  .fontSize(37)
  .fillColor(WHITE)
  .text('Reach every corner.', 0, 192, { width: W, align: 'center' })

// Gold offer block — the same promise as the printed banner.
const offerTop = 262
doc
  .save()
  .roundedRect(122, offerTop, W - 244, 62, 10)
  .lineWidth(1.4)
  .strokeColor(GOLD)
  .stroke()
  .restore()
doc
  .font('Helvetica-Bold')
  .fontSize(15.5)
  .fillColor(GOLD)
  .text('FREE AUDIO CONSULTATION', 0, offerTop + 15, {
    width: W,
    align: 'center',
    characterSpacing: 1.1,
  })
doc
  .font('Helvetica')
  .fontSize(11)
  .fillColor('#cfc7b4')
  .text('Scan to schedule — we will send you our Masjid Sound Guide too', 0, offerTop + 38, {
    width: W,
    align: 'center',
  })

// QR on a white panel so the contrast is exactly what a scanner wants.
const qrBuffer = await QRCode.toBuffer(`${LANDING}?src=card`, qrOptions(1400))
const qrSize = 236
const qrX = (W - qrSize) / 2
const qrY = 366
doc
  .save()
  .roundedRect(qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 12)
  .fillColor(WHITE)
  .fill()
  .restore()
doc.image(qrBuffer, qrX, qrY, { width: qrSize, height: qrSize })

doc
  .font('Helvetica-Bold')
  .fontSize(13)
  .fillColor(WHITE)
  .text(HUMAN_URL, 0, qrY + qrSize + 34, { width: W, align: 'center' })
doc
  .font('Helvetica')
  .fontSize(9.5)
  .fillColor('#8f886f')
  .text('or type it in — no app needed', 0, qrY + qrSize + 52, { width: W, align: 'center' })

// Footer contact band, mirroring the strip along the bottom of the banner.
const footTop = H - 118
doc
  .save()
  .moveTo(26, footTop)
  .lineTo(W - 26, footTop)
  .lineWidth(1.4)
  .strokeColor(GOLD_DEEP)
  .stroke()
  .restore()
doc
  .font('Helvetica-Bold')
  .fontSize(9.5)
  .fillColor(GOLD)
  .text('MASJID  ·  COMMERCIAL  ·  RESIDENTIAL  ·  EVENTS  ·  CONNECTED HOME', 0, footTop + 20, {
    width: W,
    align: 'center',
    characterSpacing: 0.8,
  })
doc
  .font('Helvetica')
  .fontSize(11.5)
  .fillColor(WHITE)
  .text('+1 724 831 0196   ·   +1 724 427 5661   ·   contact@azaudios.com', 0, footTop + 44, {
    width: W,
    align: 'center',
  })
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor('#7d765f')
  .text('Masjid Sound Solutions — a division of AZ Audio Solutions', 0, footTop + 68, {
    width: W,
    align: 'center',
  })

doc.end()
written.push(cardPath)

// Report once the PDF is actually flushed to disk, so the sizes are real.
cardStream.on('finish', () => {
  console.log('Wrote:')
  written.forEach((file) => {
    const kb = (fs.statSync(file).size / 1024).toFixed(1)
    console.log(`  ${path.relative(process.cwd(), file)}  (${kb} KB)`)
  })
  console.log('\nPlacement URLs:')
  PLACEMENTS.forEach((p) => console.log(`  ${p.label.padEnd(28)} ${LANDING}?src=${p.src}`))
  console.log(`\nAlias for future print runs: https://azaudios.com/amja?src=<placement>`)
})
