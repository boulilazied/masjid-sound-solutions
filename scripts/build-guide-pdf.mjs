// Generates public/guides/masjid-sound-guide.pdf — the lead magnet attached to
// the confirmation email from /api/lead.
//
//   node scripts/build-guide-pdf.mjs
//
// The content lives in the GUIDE object below. Edit the text, re-run, commit
// the regenerated PDF. Deliberately built from built-in Helvetica so there are
// no font files to ship and the output is byte-stable.
//
// Editorial rule for this document (see CLAUDE.md): every claim must be
// physics or standard practice that holds independent of AZ Audio. No
// testimonials, no project counts, no performance numbers we cannot show.

import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'guides')
const OUT_FILE = path.join(OUT_DIR, 'masjid-sound-guide.pdf')

const NAVY = '#0b1220'
const GOLD = '#b8860b'
const GOLD_DARK = '#8a6508'
const TEXT = '#0f172a'
const MUTED = '#5f6b7a'
const RULE = '#d8e4e2'
const SOFT = '#fbf7ee'

const GUIDE = {
  title: 'The Masjid Sound Guide',
  subtitle:
    'Five reasons a prayer hall is hard to hear in — and what actually fixes each one.',
  intro:
    'Almost every masjid audio complaint comes back to one of five causes. None of them are solved by turning the volume up. This guide explains what is physically happening in the room, and what a correct fix looks like, so you can judge any proposal you are given — including ours.',
  sections: [
    {
      n: '01',
      title: 'The room is the loudest thing in it',
      problem:
        'Prayer halls are built from the hardest materials we have: tile, marble, plaster, glass, and often a dome. Sound does not stop at those surfaces, it bounces. What reaches the back rows is the imam plus several hundred milliseconds of the imam arriving late, layered on top of himself. That smearing is what people describe as "echo" or "I can hear him but I cannot understand him."',
      why: 'Reverberation time (RT60) is how long sound takes to decay by 60 dB. Speech needs a short RT60; a large hard-surfaced hall can easily run past two seconds, which is fine for a recitation and poor for a khutba. A dome makes it worse in a specific way: a curved ceiling focuses reflections back down into a hot spot instead of scattering them.',
      fixes: [
        'Measure RT60 before buying any equipment. If the room is the problem, no speaker upgrade will fix it.',
        'Treat the first-reflection surfaces — the rear wall behind the congregation and the side walls near the front — not the whole room.',
        'Carpet is not acoustic treatment. It absorbs the high frequencies you need for consonants and leaves the low-mid boom behind, which can make intelligibility worse.',
        'Under a dome, treat or diffuse the focal area rather than aiming more power at it.',
      ],
    },
    {
      n: '02',
      title: 'One loud pair of speakers cannot cover a hall',
      problem:
        'The most common installation is two speakers at the front, turned up until the back row can just about hear. The front rows are then uncomfortably loud, the middle is acceptable, and the back is still straining. Turning it up further makes the front worse without meaningfully helping the back.',
      why: 'Sound pressure falls roughly 6 dB every time you double the distance from the source. Across a long hall that is a 15–20 dB swing between the first and last row. You cannot close that gap with power; you close it by adding sources so nobody is ever far from one.',
      fixes: [
        'Distribute more speakers at lower individual levels rather than fewer at high level. The target is even coverage, commonly specified as within ±3 dB across the seating area.',
        'Time-align distant speakers with DSP delay. Sound travels roughly one foot per millisecond, so an untreated rear speaker arrives ahead of the front sound and produces a distinct doubling on speech.',
        'Aim speakers at the congregation, not down the length of the room. Energy that hits a bare wall becomes the problem in section 01.',
        'Ask for a coverage plan — a drawing showing predicted level at seated ear height. If nobody can produce one, the layout is a guess.',
      ],
    },
    {
      n: '03',
      title: 'Feedback is a gain-structure problem',
      problem:
        'The squeal when the imam steps toward a speaker, or when the wireless handheld is carried into the hall, is usually treated by turning the microphone down — which quietly removes the headroom the system needed in the first place.',
      why: 'Feedback happens when the microphone hears its own amplified output loudly enough to sustain a loop. The two variables that matter are how close the microphone is to the person speaking, and how much speaker energy lands back on the microphone. Both are placement decisions made before any processing is applied.',
      fixes: [
        'Get the microphone close to the source. Halving the mic-to-mouth distance is worth about 6 dB of usable gain, which is more than any processor will give you.',
        'Use a directional pattern (cardioid or hypercardioid) and orient the null toward the nearest speaker.',
        'Never place a speaker behind or beside the microphone position. A speaker in front of the mic line is the single biggest structural fix.',
        'Correct feedback with narrow parametric or notch filters at the specific ringing frequencies. Broad tone-control cuts sacrifice speech clarity to buy a little headroom.',
        'Automatic feedback suppressors are a safety net for a correctly designed system, not a substitute for one.',
      ],
    },
    {
      n: '04',
      title: 'Speech intelligibility lives in the mid-band',
      problem:
        'Systems are often tuned by ear to sound impressive — bass lifted, top end lifted — and the result is a warm, expensive-sounding system that people still cannot follow a khutba on.',
      why: 'Consonants are what carry meaning, and they sit roughly between 1 kHz and 4 kHz. Vowels carry the volume. Boosting the low end adds loudness and energy that competes with the consonants, especially in a reverberant room where low frequencies decay slowest.',
      fixes: [
        'High-pass every speech microphone, typically around 100–120 Hz. Nothing below that is the voice; it is handling noise, HVAC rumble, and foot traffic.',
        'Tune speech and music as separate presets. The curve that flatters a nasheed will bury a khutba.',
        'Judge a tuning by whether unfamiliar words are intelligible from the back row, not by whether it sounds full from the mixer position.',
        'Where the budget allows, ask for a measured intelligibility figure (STI or %ALcons) rather than a subjective sign-off.',
      ],
    },
    {
      n: '05',
      title: 'A system that volunteers cannot break',
      problem:
        'A well-tuned system drifts within months. Someone adjusts a knob for a wedding, someone else compensates the next day, and by Ramadan the settings bear no relation to the tuning that was paid for.',
      why: 'A masjid is not one venue. Jummah at capacity, daily salah with thirty people, weekend classes, an outdoor Eid prayer, and a livestream feed are five different requirements sharing one set of speakers. Without recallable presets, every one of those becomes a manual adjustment by whoever is available.',
      fixes: [
        'Insist on zones: main hall, sisters area, overflow and lobby, outdoor, and a separate feed for recording or livestream, each with its own level.',
        'Set up recallable presets for the modes you actually run, selectable from a simple wall panel or phone app.',
        'Lock the installer-level settings behind a password so the tuning cannot be edited by accident.',
        'Keep the DSP configuration file and the passwords in the masjid office, not only with the installer.',
      ],
    },
  ],
  checklist: {
    title: 'What to ask before you sign anything',
    items: [
      'Will you measure the room before proposing equipment, and show me the measurements?',
      'Can I see a coverage plan showing predicted level across the seating area?',
      'Which surfaces are you treating acoustically, and why those?',
      'How many zones, and what presets will be programmed?',
      'Will you re-measure after installation and give me the results?',
      'Who holds the DSP file and the admin password when the job is finished?',
      'What is covered by warranty, for how long, and what is the response time for a Friday failure?',
    ],
  },
  closing:
    'Every room is different, and none of the above replaces measuring yours. If you would like us to look at your space, or simply to sanity-check a proposal you have already received, we are glad to help either way.',
}

const CONTACT = {
  company: 'AZ Audio Solutions',
  division: 'Masjid Sound Solutions — a division of AZ Audio Solutions',
  site: 'azaudios.com',
  email: 'contact@azaudios.com',
  phones: ['+1 724 831 0196', '+1 724 427 5661'],
}

const PAGE = { size: 'LETTER', margin: 58 }
const CONTENT_WIDTH = 612 - PAGE.margin * 2
const PAGE_BOTTOM = 792 - PAGE.margin - 26

fs.mkdirSync(OUT_DIR, { recursive: true })

const doc = new PDFDocument({
  size: PAGE.size,
  margins: { top: PAGE.margin, bottom: PAGE.margin + 26, left: PAGE.margin, right: PAGE.margin },
  info: {
    Title: GUIDE.title,
    Author: CONTACT.company,
    Subject: 'Speech intelligibility and sound system design for prayer halls',
    Keywords: 'masjid audio, speech intelligibility, DSP, acoustics, sound system design',
  },
  autoFirstPage: false,
})

const outStream = fs.createWriteStream(OUT_FILE)
doc.pipe(outStream)

let pageIndex = 0
let inFooter = false

// Footer and page counter are driven off `pageAdded` rather than a manual call,
// so a page pdfkit inserts on its own (text flowing past the bottom margin)
// gets the same treatment as one we ask for. Without this the counter and the
// footers silently desync from the real page list.
doc.on('pageAdded', () => {
  pageIndex += 1
  drawFooter()
  doc.x = PAGE.margin
  doc.y = doc.page.margins.top
})

// Counts only the pages this layout deliberately asks for. Every page in this
// document is supposed to come from here, so comparing this to the page count
// in the finished file detects pages pdfkit inserted on its own. (Do not use
// pageIndex for that: the pageAdded handler increments it for unintended pages
// too, so it always agrees with the file and would never catch anything.)
let requestedPages = 0

function newPage() {
  requestedPages += 1
  doc.addPage()
}

function drawFooter() {
  // The footer sits *below* the bottom margin. Drawing text there is exactly
  // what pdfkit treats as page overflow, so it would insert another page —
  // which then draws another footer, and so on. Zeroing the bottom margin for
  // the duration (and guarding against re-entry) keeps it on this page.
  if (inFooter) return
  inFooter = true

  const savedBottom = doc.page.margins.bottom
  const savedX = doc.x
  const savedY = doc.y
  doc.page.margins.bottom = 0

  const y = 792 - PAGE.margin + 4
  doc
    .save()
    .moveTo(PAGE.margin, y - 10)
    .lineTo(612 - PAGE.margin, y - 10)
    .lineWidth(0.5)
    .strokeColor(RULE)
    .stroke()
  doc
    .font('Helvetica')
    .fontSize(7.5)
    .fillColor(MUTED)
    .text(`${CONTACT.company}  ·  ${CONTACT.site}  ·  ${CONTACT.email}`, PAGE.margin, y - 4, {
      width: CONTENT_WIDTH,
      align: 'left',
      lineBreak: false,
    })
  doc
    .font('Helvetica-Bold')
    .fontSize(7.5)
    .fillColor(MUTED)
    .text(String(pageIndex), PAGE.margin, y - 4, {
      width: CONTENT_WIDTH,
      align: 'right',
      lineBreak: false,
    })
  doc.restore()

  doc.page.margins.bottom = savedBottom
  doc.x = savedX
  doc.y = savedY
  inFooter = false
}

// Reserve vertical space, breaking to a new page when the block will not fit.
function ensure(space) {
  if (doc.y + space > PAGE_BOTTOM) newPage()
}

function paragraph(text, options = {}) {
  const { size = 10, color = TEXT, font = 'Helvetica', leading = 4.4, gap = 9 } = options
  doc.font(font).fontSize(size).fillColor(color)
  const height = doc.heightOfString(text, { width: CONTENT_WIDTH, lineGap: leading })
  // Reserve the paragraph's real height. Under-reserving used to let pdfkit
  // break the page itself mid-paragraph, which then collided with our own
  // break and produced blank pages. Cap at one page's usable height so a
  // paragraph taller than a page still just flows.
  ensure(Math.min(height, PAGE_BOTTOM - PAGE.margin))
  doc.text(text, PAGE.margin, doc.y, { width: CONTENT_WIDTH, lineGap: leading, align: 'left' })
  doc.y += gap
}

function bullets(items) {
  items.forEach((item) => {
    doc.font('Helvetica').fontSize(9.6).fillColor(TEXT)
    const textWidth = CONTENT_WIDTH - 18
    const height = doc.heightOfString(item, { width: textWidth, lineGap: 3.6 })
    ensure(height + 6)
    const top = doc.y
    doc
      .save()
      .circle(PAGE.margin + 4.5, top + 5.2, 2.1)
      .fillColor(GOLD)
      .fill()
      .restore()
    doc.text(item, PAGE.margin + 18, top, { width: textWidth, lineGap: 3.6 })
    doc.y += 6.5
  })
}

// ---------------------------------------------------------------------------
// Page 1: cover band + intro
// ---------------------------------------------------------------------------
newPage()

doc.save().rect(0, 0, 612, 214).fillColor(NAVY).fill().restore()

doc
  .font('Helvetica-Bold')
  .fontSize(8.5)
  .fillColor(GOLD)
  .text('MASJID SOUND SOLUTIONS', PAGE.margin, 52, { characterSpacing: 1.6 })

doc
  .font('Helvetica-Bold')
  .fontSize(30)
  .fillColor('#ffffff')
  .text(GUIDE.title, PAGE.margin, 76, { width: CONTENT_WIDTH - 40 })

doc
  .font('Helvetica')
  .fontSize(11.5)
  .fillColor('rgba')
  .fillColor('#c9d1de')
  .text(GUIDE.subtitle, PAGE.margin, 122, { width: CONTENT_WIDTH - 60, lineGap: 3.5 })

doc
  .save()
  .moveTo(PAGE.margin, 178)
  .lineTo(PAGE.margin + 54, 178)
  .lineWidth(2.5)
  .strokeColor(GOLD)
  .stroke()
  .restore()

doc
  .font('Helvetica')
  .fontSize(8.5)
  .fillColor('#8b97a8')
  .text(CONTACT.division, PAGE.margin, 188, { width: CONTENT_WIDTH })

doc.y = 248
paragraph(GUIDE.intro, { size: 10.8, color: MUTED, leading: 5, gap: 20 })

// ---------------------------------------------------------------------------
// The five sections
// ---------------------------------------------------------------------------
GUIDE.sections.forEach((section, index) => {
  // Keep the number, heading and opening line together; a heading stranded at
  // the foot of a page reads as a typo.
  ensure(96)
  if (index > 0) doc.y += 6

  const headTop = doc.y
  doc
    .save()
    .roundedRect(PAGE.margin, headTop, 34, 26, 8)
    .fillColor(GOLD)
    .fill()
    .restore()
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor('#ffffff')
    .text(section.n, PAGE.margin, headTop + 7.5, { width: 34, align: 'center' })

  doc
    .font('Helvetica-Bold')
    .fontSize(15.5)
    .fillColor(NAVY)
    .text(section.title, PAGE.margin + 46, headTop + 3.5, { width: CONTENT_WIDTH - 46 })

  doc.y = Math.max(doc.y, headTop + 26) + 12

  paragraph(section.problem, { size: 10, leading: 4.4, gap: 10 })

  // "Why" sits in a tinted block so the physics is visually separable from the
  // description of the symptom.
  doc.font('Helvetica-Oblique').fontSize(9.6).fillColor(TEXT)
  const whyHeight = doc.heightOfString(section.why, { width: CONTENT_WIDTH - 34, lineGap: 4 })
  // Panel is whyHeight + 26, plus the 13pt gap after it and the label that
  // follows — reserve all of it so the panel is never split across pages.
  ensure(whyHeight + 44)
  const whyTop = doc.y
  doc
    .save()
    .roundedRect(PAGE.margin, whyTop, CONTENT_WIDTH, whyHeight + 26, 10)
    .fillColor(SOFT)
    .fill()
    .restore()
  doc
    .save()
    .roundedRect(PAGE.margin, whyTop, 3.5, whyHeight + 26, 2)
    .fillColor(GOLD)
    .fill()
    .restore()
  doc
    .font('Helvetica-Bold')
    .fontSize(7.5)
    .fillColor(GOLD_DARK)
    .text('WHAT IS ACTUALLY HAPPENING', PAGE.margin + 17, whyTop + 10, { characterSpacing: 1.1 })
  doc
    .font('Helvetica')
    .fontSize(9.6)
    .fillColor(TEXT)
    .text(section.why, PAGE.margin + 17, whyTop + 24, {
      width: CONTENT_WIDTH - 34,
      lineGap: 4,
    })
  doc.y = whyTop + whyHeight + 26 + 13

  ensure(24)
  doc
    .font('Helvetica-Bold')
    .fontSize(8)
    .fillColor(NAVY)
    .text('WHAT A CORRECT FIX LOOKS LIKE', PAGE.margin, doc.y, { characterSpacing: 1.1 })
  doc.y += 9
  bullets(section.fixes)
  doc.y += 8
})

// ---------------------------------------------------------------------------
// Checklist
// ---------------------------------------------------------------------------
ensure(150)
doc.y += 4
const clTop = doc.y
doc
  .save()
  .roundedRect(PAGE.margin, clTop, CONTENT_WIDTH, 30, 10)
  .fillColor(NAVY)
  .fill()
  .restore()
doc
  .font('Helvetica-Bold')
  .fontSize(13)
  .fillColor('#ffffff')
  .text(GUIDE.checklist.title, PAGE.margin + 16, clTop + 9)
doc.y = clTop + 30 + 14

GUIDE.checklist.items.forEach((item) => {
  doc.font('Helvetica').fontSize(9.8).fillColor(TEXT)
  const textWidth = CONTENT_WIDTH - 26
  const height = doc.heightOfString(item, { width: textWidth, lineGap: 3.6 })
  ensure(height + 8)
  const top = doc.y
  doc
    .save()
    .roundedRect(PAGE.margin + 1, top + 1.5, 11, 11, 2.5)
    .lineWidth(1)
    .strokeColor(GOLD)
    .stroke()
    .restore()
  doc.text(item, PAGE.margin + 26, top, { width: textWidth, lineGap: 3.6 })
  doc.y += 8
})

// ---------------------------------------------------------------------------
// Closing + contact
// ---------------------------------------------------------------------------
doc.y += 10
// Measure before reserving: the panel is closeHeight + 74 tall and the contact
// line sits inside it, so a flat guess could push the panel past the margin and
// trigger a page break we did not plan for.
doc.font('Helvetica').fontSize(10).fillColor(TEXT)
const closeHeight = doc.heightOfString(GUIDE.closing, { width: CONTENT_WIDTH - 34, lineGap: 4.4 })
ensure(closeHeight + 82)
const closeTop = doc.y
doc
  .save()
  .roundedRect(PAGE.margin, closeTop, CONTENT_WIDTH, closeHeight + 74, 12)
  .fillColor(NAVY)
  .fill()
  .restore()
doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor('#c9d1de')
  .text(GUIDE.closing, PAGE.margin + 17, closeTop + 18, { width: CONTENT_WIDTH - 34, lineGap: 4.4 })
doc
  .font('Helvetica-Bold')
  .fontSize(10.5)
  .fillColor('#ffffff')
  .text(
    `${CONTACT.site}   ·   ${CONTACT.email}   ·   ${CONTACT.phones.join('   ·   ')}`,
    PAGE.margin + 17,
    closeTop + closeHeight + 38,
    { width: CONTENT_WIDTH - 34 }
  )
doc
  .save()
  .moveTo(PAGE.margin + 17, closeTop + closeHeight + 30)
  .lineTo(PAGE.margin + 71, closeTop + closeHeight + 30)
  .lineWidth(2)
  .strokeColor(GOLD)
  .stroke()
  .restore()

doc.end()

// Wait for the real flush before measuring, and verify the page count.
//
// A mismatch here means pdfkit inserted pages we did not account for — which is
// what happens when something draws past the bottom margin (the footer used to)
// or a block reserves less height than it occupies. The symptom is blank pages
// in the delivered PDF, so fail loudly rather than emailing that to people.
outStream.on('finish', () => {
  const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1)
  const raw = fs.readFileSync(OUT_FILE, 'latin1')
  const actualPages = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length

  console.log(`Wrote ${path.relative(process.cwd(), OUT_FILE)} (${kb} KB, ${actualPages} pages)`)

  if (actualPages !== requestedPages) {
    console.error(
      `\nERROR: this layout asked for ${requestedPages} pages but the PDF contains ${actualPages}.` +
        `\n${actualPages - requestedPages} page(s) were inserted by pdfkit and are probably blank.` +
        `\nSomething drew past the bottom margin, or a block reserved less height than it uses.`
    )
    process.exitCode = 1
  }
})
