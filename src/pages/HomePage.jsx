import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const ICON_MASJID = 'M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
const ICON_COMMERCIAL = 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
const ICON_RESIDENTIAL = 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
const ICON_EVENT = 'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'

const divisions = [
  {
    title: 'Masjid Sound Solutions',
    path: '/masjid-sound-solutions',
    iconPath: ICON_MASJID,
    text: 'Specialized masjid audio design, khutba intelligibility improvement, speaker coverage optimization, DSP tuning, and volunteer-friendly controls.'
  },
  {
    title: 'Commercial Audio',
    path: '/commercial-audio',
    iconPath: ICON_COMMERCIAL,
    text: 'Professional audio for offices, schools, retail, community centers, paging systems, background music, and conference spaces.'
  },
  {
    title: 'Residential Audio',
    path: '/residential-audio',
    iconPath: ICON_RESIDENTIAL,
    text: 'Clean home audio installations, in-ceiling speakers, media room sound, multi-room audio, and smart control integration.'
  },
  {
    title: 'Event Rental Services',
    path: '/event-rental-services',
    iconPath: ICON_EVENT,
    text: 'Portable PA systems, wireless microphones, mixers, speakers, and temporary audio support for events and gatherings.'
  }
]

const steps = [
  'Free consultation and needs assessment',
  'System design and clear proposal',
  'Professional installation or event setup',
  'Final tuning, training, and follow-up support'
]

function DivisionIcon({ path }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' d={path} />
    </svg>
  )
}

export default function HomePage() {
  return (
    <>
      <section className='hero'>
        <div className='container hero-grid'>
          <div className='hero-copy'>
            <div className='eyebrow'>AZ Audio Solutions</div>
            <h1>Sound. Clarity. Impact.</h1>
            <p className='hero-text'>
              Professional audio solutions for masjids, commercial buildings, homes, and events.
              We design, install, tune, and support reliable systems that sound clear and are easy
              to use.
            </p>

            <div className='hero-actions'>
              <Link to='/contact' className='button button-primary'>
                Request a Quote
              </Link>
              <a href='#divisions' className='button button-secondary'>
                View Divisions
              </a>
            </div>
          </div>

          <div className='hero-visual-wrap'>
            <div className='hero-visual-card'>
              <div className='hero-div-preview-grid'>
                {divisions.map((d) => (
                  <Link to={d.path} key={d.title} className='hero-div-chip'>
                    <div className='hero-div-chip-icon'>
                      <DivisionIcon path={d.iconPath} />
                    </div>
                    <span>{d.title}</span>
                  </Link>
                ))}
              </div>
              <div className='visual-kicker'>USA &amp; Canada</div>
              <p style={{ margin: '0.6rem 0 0', color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Four specialized audio divisions under one trusted brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section surface-muted' id='divisions'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Divisions'
            title='Choose the audio service you need'
            text='AZ Audio Solutions is organized into four clear sections so each customer quickly finds the right service.'
          />

          <div className='division-tabs'>
            {divisions.map((division) => (
              <Link to={division.path} className='division-tab' key={division.title}>
                <div className='division-tab-icon'>
                  <DivisionIcon path={division.iconPath} />
                </div>
                <h3>{division.title}</h3>
                <p>{division.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='section'>
        <div className='container split-layout'>
          <div>
            <SectionHeading
              eyebrow='How It Works'
              title='A simple process with professional results'
              text='We keep the process clear from the first call to final tuning or event delivery.'
            />
            <div className='step-list'>
              {steps.map((step, index) => (
                <div className='step-card' key={step}>
                  <div className='step-number'>{index + 1}</div>
                  <div>{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='value-panel'>
            <div className='eyebrow'>Why Choose Us</div>
            <h3>Professional audio with practical execution</h3>
            <p>
              We focus on clarity, reliability, clean installation, and systems that everyday users
              can operate confidently.
            </p>
            <ul className='check-list'>
              <li>Clear speech and balanced coverage</li>
              <li>Reliable equipment and clean cabling</li>
              <li>DSP tuning and feedback control</li>
              <li>Solutions for permanent installs and temporary events</li>
            </ul>
            <Link to='/contact' className='button button-secondary' style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <section className='section cta-band'>
        <div className='container cta-inner'>
          <div>
            <div className='eyebrow eyebrow-light'>Ready to improve your sound?</div>
            <h2>Book a consultation and get a practical recommendation</h2>
            <p>
              Tell us about your space, event, or installation need. We will recommend a clear next
              step and the right equipment direction.
            </p>
          </div>
          <Link to='/contact' className='button button-primary button-light'>
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  )
}
