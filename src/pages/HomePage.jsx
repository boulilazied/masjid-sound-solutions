import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const divisions = [
  {
    title: 'Masjid Sound Solutions',
    path: '/masjid-sound-solutions',
    logo: '/logo-masjid-division.png',
    text: 'Specialized masjid audio design, khutba intelligibility improvement, speaker coverage optimization, DSP tuning, and volunteer-friendly controls.'
  },
  {
    title: 'Commercial Audio',
    path: '/commercial-audio',
    logo: '/logo-az.png',
    text: 'Professional audio for offices, schools, retail, community centers, paging systems, background music, and conference spaces.'
  },
  {
    title: 'Residential Audio',
    path: '/residential-audio',
    logo: '/logo-az.png',
    text: 'Clean home audio installations, in-ceiling speakers, media room sound, multi-room audio, and smart control integration.'
  },
  {
    title: 'Event Rental Services',
    path: '/event-rental-services',
    logo: '/logo-az.png',
    text: 'Portable PA systems, wireless microphones, mixers, speakers, and temporary audio support for events and gatherings.'
  }
]

const steps = [
  'Free consultation and needs assessment',
  'System design and clear proposal',
  'Professional installation or event setup',
  'Final tuning, training, and follow-up support'
]

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
            <div className='hero-visual-card brand-hero-card'>
              <img src='/logo-az.png' alt='AZ Audio Solutions' className='hero-logo hero-logo-wide' />
              <div className='visual-kicker'>Four professional audio divisions</div>
              <h3>One trusted brand for complete audio solutions</h3>
              <p>
                From permanent installations to temporary event systems, AZ Audio Solutions brings
                technical knowledge, clean execution, and dependable support.
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
                <img src={division.logo} alt={`${division.title} logo`} className='division-tab-logo' />
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
            <Link to='/contact' className='button button-secondary'>
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
