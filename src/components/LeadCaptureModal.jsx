import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Loader2,
  PhoneCall,
  Mail
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Conference / print-collateral lead capture.
//
// IMPORTANT — why this is mounted on /masjid-sound-solutions:
// The printed AMJA collateral (marketing/toprint/AMJA_ads.ai, flyer1.ai, and
// the 80x200cm banner) all encode https://azaudios.com/masjid-sound-solutions
// and promise "FREE AUDIO CONSULTATION — Scan to schedule". So that page is
// where scans actually land, and the offer here has to be the free
// consultation the print promises. /amja is kept as an alias for any future
// print run that wants clean attribution.
//
// The Masjid Sound Guide is positioned as the bonus, not the headline offer —
// promising a PDF when the flyer promised a consultation is the fastest way to
// lose a scan.
// ---------------------------------------------------------------------------

// Label applied when the visitor arrived from print collateral. Change this
// per event; organic visitors are recorded as 'Website' instead.
const CAMPAIGN_LABEL = 'AMJA'

// Chip wording deliberately mirrors the six pillars on the printed flyer
// (speech clarity, even coverage, feedback control, flexible zoning, future
// ready, affordable solutions) so the page reads as a continuation of the
// piece they just scanned.
const NEEDS = [
  'Khutba is hard to understand',
  'Back rows or dead spots',
  'Echo in the hall',
  'Microphone feedback',
  'Zone control (hall, sisters, outdoor)',
  'Livestream & recording',
  'Cameras & security',
  'New build / full system'
]

const TIMELINES = [
  'Active project now',
  'Next 6-12 months',
  'Just exploring',
  'Want a system check-up'
]

const STORAGE_DISMISSED = 'az_lead_modal_dismissed'
const STORAGE_PENDING = 'az_pending_leads'

// Organic visitors to the masjid division page should get to read it before
// anything covers it. Scans (which carry ?src= or land on /amja) open at once.
const ORGANIC_DELAY_MS = 14000
const ORGANIC_SCROLL_RATIO = 0.3

const emptyContact = {
  name: '',
  masjid: '',
  city: '',
  email: '',
  phone: '',
  message: '',
  smsConsent: false
}

// Conference Wi-Fi drops constantly. Rather than losing a lead to a failed
// fetch, queue it in localStorage and retry on the next page load or as soon
// as the browser reports it is back online.
function readPending() {
  try {
    const raw = window.localStorage.getItem(STORAGE_PENDING)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writePending(list) {
  try {
    window.localStorage.setItem(STORAGE_PENDING, JSON.stringify(list))
  } catch {
    /* storage unavailable (private mode) - nothing we can do */
  }
}

function postLead(payload) {
  return fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
}

// Every lead carries a client-generated id so a retry that actually reached the
// server can be recognised and dropped downstream instead of becoming a second
// row in the follow-up list.
function newClientId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

// Guards against two flushes running at once. Without it, a second invocation
// (StrictMode's double effect in dev, an `online` event landing mid-flush, or a
// second tab on the same site) reads the same queue and re-posts every entry,
// producing duplicate leads.
let flushing = false

async function flushPending() {
  if (flushing) return
  const pending = readPending()
  if (!pending.length) return

  flushing = true
  // Claim the batch before sending: anything still unsent is written back at
  // the end, so a concurrent reader sees an empty queue rather than the same
  // payloads.
  writePending([])

  const remaining = []
  try {
    for (const payload of pending) {
      try {
        const response = await postLead(payload)
        // 4xx means the payload is permanently unacceptable — retrying it
        // forever would block the queue, so drop it.
        if (!response.ok && response.status >= 500) remaining.push(payload)
      } catch {
        remaining.push(payload)
      }
    }
  } finally {
    // Merge with anything queued while this batch was in flight.
    if (remaining.length) writePending([...remaining, ...readPending()])
    flushing = false
  }
}

export default function LeadCaptureModal() {
  const { search, pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [needs, setNeeds] = useState([])
  const [timeline, setTimeline] = useState('')
  const [contact, setContact] = useState(emptyContact)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(null)
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  const srcParam = new URLSearchParams(search).get('src')
  const fromPrint = Boolean(srcParam) || pathname === '/amja'
  // Attribution: honour an explicit ?src=, otherwise record which page the
  // visitor converted on. Only print traffic gets tagged with the campaign.
  const source = srcParam || (pathname === '/amja' ? 'amja-qr' : 'masjid-page')
  const campaign = fromPrint ? CAMPAIGN_LABEL : 'Website'

  // Open on arrival for scans; wait for intent from organic readers. Also
  // retry any lead that failed to send earlier.
  useEffect(() => {
    flushPending()
    const onOnline = () => flushPending()
    window.addEventListener('online', onOnline)

    let dismissed = false
    try {
      dismissed = window.sessionStorage.getItem(STORAGE_DISMISSED) === '1'
    } catch {
      dismissed = false
    }

    let timer = null
    let onScroll = null

    if (!dismissed) {
      if (fromPrint) {
        setOpen(true)
      } else {
        timer = window.setTimeout(() => setOpen(true), ORGANIC_DELAY_MS)
        onScroll = () => {
          const scrollable = document.body.scrollHeight - window.innerHeight
          if (scrollable > 0 && window.scrollY / scrollable > ORGANIC_SCROLL_RATIO) {
            setOpen(true)
          }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
      }
    }

    return () => {
      window.removeEventListener('online', onOnline)
      if (timer) window.clearTimeout(timer)
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [fromPrint])

  // Lock background scroll and wire Escape while the dialog is up.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return
      // Simple focus trap so keyboard and screen-reader users cannot tab out
      // into the page behind the overlay.
      const focusables = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input, select, textarea, a[href]'
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open && step === 2) firstFieldRef.current?.focus()
  }, [open, step])

  function close() {
    setOpen(false)
    try {
      window.sessionStorage.setItem(STORAGE_DISMISSED, '1')
    } catch {
      /* ignore */
    }
  }

  function toggleNeed(value) {
    setNeeds((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    )
  }

  function handleContactChange(event) {
    const { name, value, type, checked } = event.target
    setContact((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...contact,
      needs,
      timeline,
      event: campaign,
      source,
      clientId: newClientId(),
      submittedAt: new Date().toISOString()
    }

    try {
      const response = await postLead(payload)
      let data = null
      try {
        data = await response.json()
      } catch {
        data = null
      }

      // A 4xx means the payload itself is wrong, so retrying will not help -
      // surface it instead of silently queueing a lead that can never send.
      if (response.status >= 400 && response.status < 500) {
        setError(data?.error || 'Please check your details and try again.')
        return
      }

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || 'Send failed')
      }

      setDone({ email: contact.email, queued: false })
    } catch {
      // Never drop the lead: queue it and tell the visitor it is handled.
      writePending([...readPending(), payload])
      setDone({ email: contact.email, queued: true })
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button type='button' className='lead-reopen' onClick={() => setOpen(true)}>
        Book your free audio consultation
      </button>
    )
  }

  const canAdvance = needs.length > 0 || timeline !== ''

  return (
    <div
      className='lead-overlay'
      role='presentation'
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <div
        className='lead-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='lead-modal-title'
        ref={dialogRef}
      >
        <button type='button' className='lead-close' onClick={close} aria-label='Close'>
          <X size={18} strokeWidth={2.4} />
        </button>

        {done ? (
          <div className='lead-body lead-done'>
            <div className='lead-done-icon'>
              <CheckCircle2 size={38} strokeWidth={2} />
            </div>
            <h2 id='lead-modal-title'>Jazak Allah khair</h2>
            <p>
              {done.queued
                ? 'Your details are saved and will send automatically as soon as you have a signal, so there is no need to fill this in again.'
                : 'Your free consultation request is in.'}{' '}
              We will reach out within one business day, and your copy of the Masjid Sound Guide is
              on its way to <strong>{done.email}</strong>.
            </p>
            <div className='lead-done-actions'>
              <a className='button lead-gold-button' href='tel:+17248310196'>
                <PhoneCall size={17} strokeWidth={2.2} /> +1 724 831 0196
              </a>
              <a
                className='button lead-ghost-button'
                href='https://wa.me/17244275661'
                target='_blank'
                rel='noreferrer'
              >
                WhatsApp
              </a>
            </div>
            <button type='button' className='lead-text-button' onClick={close}>
              Continue to the site
            </button>
          </div>
        ) : (
          <>
            <div className='lead-head'>
              <p className='lead-eyebrow'>
                {fromPrint ? `${CAMPAIGN_LABEL} · Free audio consultation` : 'Free audio consultation'}
              </p>
              <h2 id='lead-modal-title'>
                {step === 1 ? (
                  <>
                    Hear every Ayah.
                    <br />
                    Reach every corner.
                  </>
                ) : (
                  'Where should we reach you?'
                )}
              </h2>
              <p className='lead-sub'>
                {step === 1
                  ? 'Tell us about your masjid in two quick screens. We will schedule your free audio consultation and send you our Masjid Sound Guide.'
                  : 'We will follow up within one business day and email your copy of the guide right away.'}
              </p>
              <div className='lead-progress' aria-hidden='true'>
                <span className='is-active' />
                <span className={step === 2 ? 'is-active' : ''} />
              </div>
            </div>

            {step === 1 ? (
              <div className='lead-body'>
                <fieldset className='lead-fieldset'>
                  <legend>What would you like to solve?</legend>
                  <div className='lead-chips'>
                    {NEEDS.map((item) => {
                      const active = needs.includes(item)
                      return (
                        <button
                          key={item}
                          type='button'
                          className={active ? 'lead-chip is-active' : 'lead-chip'}
                          aria-pressed={active}
                          onClick={() => toggleNeed(item)}
                        >
                          {active && <Check size={14} strokeWidth={3} />}
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <fieldset className='lead-fieldset'>
                  <legend>Where are you in the process?</legend>
                  <div className='lead-chips'>
                    {TIMELINES.map((item) => {
                      const active = timeline === item
                      return (
                        <button
                          key={item}
                          type='button'
                          className={active ? 'lead-chip is-active' : 'lead-chip'}
                          aria-pressed={active}
                          onClick={() => setTimeline(active ? '' : item)}
                        >
                          {active && <Check size={14} strokeWidth={3} />}
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className='lead-actions'>
                  <button
                    type='button'
                    className='button lead-gold-button lead-next'
                    onClick={() => setStep(2)}
                    disabled={!canAdvance}
                  >
                    Continue <ArrowRight size={17} strokeWidth={2.4} />
                  </button>
                  <p className='lead-note'>
                    {canAdvance ? 'One more screen.' : 'Pick at least one option to continue.'}
                  </p>
                </div>
              </div>
            ) : (
              <form className='lead-body lead-form' onSubmit={handleSubmit}>
                <div className='lead-grid'>
                  <label>
                    <span>Name</span>
                    <input
                      ref={firstFieldRef}
                      name='name'
                      value={contact.name}
                      onChange={handleContactChange}
                      autoComplete='name'
                      required
                    />
                  </label>
                  <label>
                    <span>Masjid / Organization</span>
                    <input
                      name='masjid'
                      value={contact.masjid}
                      onChange={handleContactChange}
                      autoComplete='organization'
                      required
                    />
                  </label>
                  <label>
                    <span>City / State</span>
                    <input
                      name='city'
                      value={contact.city}
                      onChange={handleContactChange}
                      autoComplete='address-level2'
                      required
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      name='email'
                      type='email'
                      value={contact.email}
                      onChange={handleContactChange}
                      autoComplete='email'
                      inputMode='email'
                      required
                    />
                  </label>
                  <label className='lead-span-2'>
                    <span>
                      Phone / WhatsApp <em>optional</em>
                    </span>
                    <input
                      name='phone'
                      type='tel'
                      value={contact.phone}
                      onChange={handleContactChange}
                      autoComplete='tel'
                      inputMode='tel'
                    />
                  </label>
                  <label className='lead-span-2'>
                    <span>
                      Anything we should know? <em>optional</em>
                    </span>
                    <textarea
                      name='message'
                      rows={2}
                      value={contact.message}
                      onChange={handleContactChange}
                    />
                  </label>
                </div>

                <label className='lead-consent'>
                  <input
                    type='checkbox'
                    name='smsConsent'
                    checked={contact.smsConsent}
                    onChange={handleContactChange}
                  />
                  <span>It is OK to text or WhatsApp me about my project.</span>
                </label>

                {error && (
                  <p className='lead-error' role='alert'>
                    {error}
                  </p>
                )}

                <div className='lead-actions lead-actions-row'>
                  <button
                    type='button'
                    className='button lead-ghost-button'
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    <ArrowLeft size={17} strokeWidth={2.4} /> Back
                  </button>
                  <button type='submit' className='button lead-gold-button lead-next' disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 size={17} strokeWidth={2.4} className='lead-spin' /> Sending
                      </>
                    ) : (
                      <>
                        <Mail size={17} strokeWidth={2.2} /> Book my consultation
                      </>
                    )}
                  </button>
                </div>
                <p className='lead-note'>
                  We use your details to arrange the consultation and send the guide. No lists, no
                  resale.
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
