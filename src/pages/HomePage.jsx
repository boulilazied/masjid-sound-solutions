import { Link } from 'react-router-dom'
import { Building2, Home, Mic2, ClipboardCheck, Receipt, Wrench, Headphones, GraduationCap, BookOpen } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import MasjidIcon from '../components/MasjidIcon'

const divisions = [
  {
    title: 'Masjid Sound Solutions',
    path: '/masjid-sound-solutions',
    Icon: MasjidIcon,
    featured: true,
    text: 'Specialized masjid audio design, khutba intelligibility improvement, speaker coverage optimization, DSP tuning, and volunteer-friendly controls.'
  },
  {
    title: 'Commercial Audio',
    path: '/commercial-audio',
    Icon: Building2,
    text: 'Professional audio for offices, schools, retail, community centers, paging systems, background music, and conference spaces.'
  },
  {
    title: 'Residential Audio',
    path: '/residential-audio',
    Icon: Home,
    text: 'Clean home audio installations, in-ceiling speakers, media room sound, multi-room audio, and smart control integration.'
  },
  {
    title: 'Event Rental Services',
    path: '/event-rental-services',
    Icon: Mic2,
    text: 'Portable PA systems, wireless microphones, mixers, speakers, and temporary audio support for events and gatherings.'
  }
]

const stats = [
  { num: '25+',      label: 'Projects Completed' },
  { num: '10+',      label: 'Masjids Served' },
  { num: 'Free',     label: 'Initial Consultation' },
  { num: '100%',     label: 'Transparent Pricing' },
]

const steps = [
  { num: '01', title: 'Consultation',      text: 'Site visit or call to assess your space, needs, and existing setup.' },
  { num: '02', title: 'Design & Proposal', text: 'Custom system design with clear scope, equipment list, and transparent pricing.' },
  { num: '03', title: 'Installation',      text: 'Professional installation with minimal disruption and clean cable management.' },
  { num: '04', title: 'Tuning & Support',  text: 'DSP tuning, staff training, and ongoing support after handover.' },
]

const commitments = [
  {
    Icon: ClipboardCheck,
    title: 'Honest Assessment',
    text: 'We assess your real needs before recommending anything. No overselling, no equipment you do not need.',
  },
  {
    Icon: Receipt,
    title: 'Transparent Pricing',
    text: 'Every proposal is itemized with a clear equipment list and scope. You know exactly what you are paying for.',
  },
  {
    Icon: Wrench,
    title: 'Clean Installation',
    text: 'Professional cable management, organized rack build, and a system that looks as good as it sounds.',
  },
  {
    Icon: Headphones,
    title: 'Support After Handover',
    text: 'We do not disappear after installation. Remote and on-site support is available whenever you need it.',
  },
]

const testimonials = [
  {
    quote: 'The clarity during khutba is night and day compared to our old system. Every worshipper can hear clearly — even in the back rows and the sisters\' section.',
    author: 'Masjid Board Member',
    location: 'Pittsburgh, PA'
  },
  {
    quote: 'AZ Audio came in, assessed everything, gave us an honest proposal, and delivered exactly what they promised. No surprises, no upselling.',
    author: 'Community Center Director',
    location: 'Columbus, OH'
  },
  {
    quote: 'We use the mobile app to control the zones every single day. Our volunteers learned it in five minutes — it couldn\'t be simpler.',
    author: 'Masjid Operations Manager',
    location: 'Dearborn, MI'
  },
]

export default function HomePage() {
  return (
    <>
      <section className='hero'>
        <div className='container hero-grid'>
          <div className='hero-copy'>
            <div className='eyebrow'>Professional Audio Systems · USA &amp; Canada</div>
            <h1>AZ Audio Solutions</h1>
            <p className='hero-text hero-subtitle'>
              Professional Audio Solutions for Masjids, Commercial Facilities, Events and
              Residential Projects
            </p>
            <p className='hero-text'>
              Premium Quality. Affordable Cost. AZ Audio Solutions designs, installs, tunes, and
              supports reliable audio systems for masjids, commercial buildings, homes, and events —
              systems that sound clear and are easy to use.
            </p>
            <div className='hero-actions'>
              <Link to='/contact' className='button button-primary'>Request a Quote</Link>
              <a href='#divisions' className='button button-secondary'>View Services</a>
            </div>
          </div>

          <div className='hero-visual-wrap'>
            <div className='hero-visual-card'>
              <div className='hero-div-preview-grid'>
                {divisions.map((d) => (
                  <Link to={d.path} key={d.title} className={`hero-div-chip${d.featured ? ' hero-div-chip--featured' : ''}`}>
                    <div className={`hero-div-chip-icon${d.featured ? ' hero-div-chip-icon--featured' : ''}`}>
                      <d.Icon size={d.featured ? 22 : 18} strokeWidth={1.5} />
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

      <section className='hp-stats-strip'>
        <div className='container'>
          <div className='hp-stats-row'>
            {stats.map((s, i) => (
              <div key={s.num} className='hp-stat-group'>
                <div className='hp-stat'>
                  <span className='hp-stat-num'>{s.num}</span>
                  <span className='hp-stat-label'>{s.label}</span>
                </div>
                {i < stats.length - 1 && <div className='hp-stat-divider' />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section surface-muted' id='divisions'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Services'
            title='Choose the audio service you need'
            text='AZ Audio Solutions is organized into four clear divisions so each customer quickly finds the right service.'
          />
          <div className='division-tabs'>
            {divisions.map((division) => (
              <Link to={division.path} className='division-tab' key={division.title}>
                <div className='division-tab-icon'>
                  <division.Icon size={26} strokeWidth={1.5} />
                </div>
                <h3>{division.title}</h3>
                <p>{division.text}</p>
                <span className='division-tab-cta'>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='section' id='about-az'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='About'
            title='About AZ Audio Solutions'
            text='AZ Audio Solutions specializes in professional audio system design, installation, DSP tuning, acoustic optimization, and multi-zone audio control. We serve masjids, schools, commercial facilities, event venues, and residential clients across North America. Our expertise includes speech intelligibility improvement, acoustic analysis, system commissioning, and long-term support for mission-critical audio environments.'
          />

          <p style={{ textAlign: 'center', color: 'var(--muted)', maxWidth: '760px', margin: '0 auto 1.5rem' }}>
            <strong>AZ Audio Solutions</strong> is the parent company. Our work is organized into
            four specialized service divisions:
          </p>

          <ul className='az-division-hierarchy'>
            <li>
              <Link to='/masjid-sound-solutions'><strong>Masjid Sound Solutions</strong></Link>
              <span> — a service division of AZ Audio Solutions for masjid &amp; prayer-hall audio.</span>
            </li>
            <li>
              <Link to='/commercial-audio'><strong>Commercial Audio Solutions</strong></Link>
              <span> — a service division of AZ Audio Solutions for offices, schools &amp; facilities.</span>
            </li>
            <li>
              <Link to='/residential-audio'><strong>Residential Audio Solutions</strong></Link>
              <span> — a service division of AZ Audio Solutions for home &amp; multi-room audio.</span>
            </li>
            <li>
              <Link to='/event-rental-services'><strong>Event Audio Solutions</strong></Link>
              <span> — a service division of AZ Audio Solutions for events &amp; PA rental support.</span>
            </li>
          </ul>

          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to='/contact' className='button button-primary'>Contact AZ Audio Solutions</Link>
          </p>
        </div>
      </section>

      <section className='section'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='How It Works'
            title='From first call to final tuning'
            text='A clear, predictable four-step process on every project — no surprises.'
          />
          <div className='hp-steps-row'>
            {steps.map((step) => (
              <div key={step.num} className='hp-step'>
                <div className='hp-step-num'>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='hp-credentials'>
        <div className='container'>
          <div className='hp-cred-header'>
            <div className='eyebrow eyebrow-light'>Our Expertise</div>
            <h2>Two disciplines most AV companies don't have in-house.</h2>
            <p>Engineering precision and deep masjid knowledge — both on every project.</p>
          </div>
          <div className='hp-cred-grid'>
            <div className='hp-cred-card'>
              <div className='hp-cred-icon'>
                <GraduationCap size={28} strokeWidth={1.5} />
              </div>
              <div className='hp-cred-tag'>Signal Treatment Engineer</div>
              <h3>Master's Degree in Signal Processing</h3>
              <p>
                Our lead engineer holds a master's degree in signal treatment. DSP configuration,
                room analysis, speaker placement, and acoustic tuning are backed by technical
                engineering — not trial and error.
              </p>
            </div>
            <div className='hp-cred-card'>
              <div className='hp-cred-icon'>
                <BookOpen size={28} strokeWidth={1.5} />
              </div>
              <div className='hp-cred-tag'>In-House Masjid Expertise</div>
              <h3>Imam with Deep Prayer Hall Knowledge</h3>
              <p>
                Our team includes a practicing imam who understands the real audio needs of khutba,
                salat, and community events — from the person who actually leads the prayer, not
                just someone who has measured a room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='section surface-muted'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Client Feedback'
            title='Trusted by masjids and organizations'
            text='What our clients say after we design, install, and tune their audio systems.'
          />
          <div className='testimonials-grid'>
            {testimonials.map((t) => (
              <div key={t.author} className='testimonial-card'>
                <div className='testimonial-stars'>★★★★★</div>
                <p className='testimonial-quote'>"{t.quote}"</p>
                <div className='testimonial-author'>
                  <strong>{t.author}</strong>
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Standards'
            title='What every project includes'
            text='Clear communication, clean work, and accountability — on every job, regardless of size.'
          />
          <div className='hp-commitments'>
            {commitments.map((c) => (
              <div key={c.title} className='hp-commitment'>
                <div className='hp-commitment-icon'>
                  <c.Icon size={22} strokeWidth={1.5} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
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
          <Link to='/contact' className='button button-primary button-light'>Request a Quote</Link>
        </div>
      </section>
    </>
  )
}
