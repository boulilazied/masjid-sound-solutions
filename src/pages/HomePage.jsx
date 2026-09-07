import { Link } from 'react-router-dom'
import { Building2, Home, HouseWifi, Mic2, ClipboardCheck, Receipt, Wrench, Headphones, GraduationCap, BookOpen, PhoneCall, PenLine, HardHat, Gauge } from 'lucide-react'
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
    title: 'Commercial Audio Solutions',
    path: '/commercial-audio',
    Icon: Building2,
    text: 'Professional audio for offices, schools, retail, community centers, paging systems, background music, and conference spaces.'
  },
  {
    title: 'Residential Audio Solutions',
    path: '/residential-audio',
    Icon: Home,
    text: 'Clean home audio installations, in-ceiling speakers, media room sound, multi-room audio, and smart control integration.'
  },
  {
    title: 'Connected Home Solutions',
    path: '/connected-home',
    Icon: HouseWifi,
    text: 'Fully integrated smart home packages — security cameras, smart locks, video doorbells, lighting, thermostats, alarm systems, and one app for the whole home.'
  },
  {
    title: 'Event Rental Services',
    path: '/event-rental-services',
    Icon: Mic2,
    text: 'Portable PA systems, wireless microphones, mixers, speakers, and temporary audio support for events and gatherings.'
  }
]

// Real photography from systems we have installed. These same images are already
// published on the division pages — no stock, no staged renders.
// Short descriptors for the brand-hierarchy diagram. Kept next to `divisions`
// so the two never drift apart.
const hierarchy = [
  { path: '/masjid-sound-solutions', title: 'Masjid Sound Solutions',      Icon: MasjidIcon, text: 'masjid & prayer-hall audio' },
  { path: '/commercial-audio',       title: 'Commercial Audio Solutions',  Icon: Building2,  text: 'offices, schools & facilities' },
  { path: '/residential-audio',      title: 'Residential Audio Solutions', Icon: Home,       text: 'home & multi-room audio' },
  { path: '/connected-home',         title: 'Connected Home Solutions',    Icon: HouseWifi,  text: 'smart home security, comfort & control' },
  { path: '/event-rental-services',  title: 'Event Rental Services',       Icon: Mic2,       text: 'events & PA rental support' },
]

const work = [
  { img: '/home/work-mics.jpg', title: 'Khutba microphones',  text: 'Podium and wireless mics set for speech clarity in a live prayer hall.' },
  { img: '/home/work-rack.jpg', title: 'Equipment rack build', text: 'Organised, labelled rack with clean cable management and serviceable layout.' },
  { img: '/home/work-app.jpg',  title: 'Zone control in hand', text: 'Per-zone source and volume control from a phone on the local network.' },
  { img: '/home/work-home.jpg', title: 'Connected home',       text: 'Cameras, locks, lighting and climate integrated into one system.' },
]

// Every item here must be verifiable from how we actually operate — no project
// counts, no client counts, no figures we cannot substantiate on request.
const stats = [
  { num: '5',    label: 'Service Divisions' },
  { num: 'Free', label: 'Initial Consultation' },
  { num: 'MSc',  label: 'Signal Processing Engineer' },
  { num: '100%', label: 'Itemized Proposals' },
]

const steps = [
  { num: '1', title: 'Consultation',      text: 'Site visit or call to assess your space, needs, and existing setup.', Icon: PhoneCall },
  { num: '2', title: 'Design & Proposal', text: 'Custom system design with clear scope, equipment list, and transparent pricing.', Icon: PenLine },
  { num: '3', title: 'Installation',      text: 'Professional installation with minimal disruption and clean cable management.', Icon: HardHat },
  { num: '4', title: 'Tuning & Support',  text: 'DSP tuning, staff training, and ongoing support after handover.', Icon: Gauge },
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

// Manufacturers whose equipment we specify and install. This is a statement about
// the equipment we build with — not a claim of dealer, partner, or reseller status.
const brands = [
  { name: 'JBL',        file: 'jbl.svg' },
  { name: 'QSC',        file: 'qsc.svg' },
  { name: 'Yamaha',     file: 'yamaha.svg' },
  { name: 'Shure',      file: 'shure.svg' },
  { name: 'Sennheiser', file: 'sennheiser.svg' },
  { name: 'TOA',        file: 'toa.svg' },
  { name: 'DBX',        file: 'dbx.svg' },
  { name: 'Atlas IED',  file: 'atlasied.svg' },
]

export default function HomePage() {
  return (
    <>
      <section className='hp-hero'>
        <div className='hp-hero-media' role='img' aria-label='Congregation in a prayer hall served by an AZ Audio system' />
        <div className='hp-hero-scrim' />
        <div className='container hp-hero-inner'>
          <div className='hp-hero-eyebrow'>Professional Audio Systems · USA &amp; Canada</div>
          <h1>AZ Audio Solutions</h1>
          <p className='hp-hero-slogan'>Premium Quality. Affordable Cost.</p>
          <p className='hp-hero-lead'>
            Professional audio and connected home solutions for masjids, commercial facilities,
            events and residential projects. We design, install, tune and support systems that
            sound clear and stay easy to use.
          </p>
          <div className='hp-hero-actions'>
            <Link to='/contact' className='hp-btn hp-btn-gold'>Request a Quote</Link>
            <a href='#divisions' className='hp-btn hp-btn-ghost'>View Services</a>
          </div>

          <div className='hp-hero-chips'>
            {divisions.map((d) => (
              <Link to={d.path} key={d.title} className='hp-hero-chip'>
                <d.Icon size={17} strokeWidth={1.6} />
                <span>{d.title}</span>
              </Link>
            ))}
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
            text='AZ Audio Solutions is organized into five clear divisions so each customer quickly finds the right service.'
          />
          <div className='division-tabs'>
            {divisions.map((division, i) => (
              <Link to={division.path} className='division-tab' key={division.title}>
                <span className='division-tab-index'>{String(i + 1).padStart(2, '0')}</span>
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

          <div className='hp-tree'>
            <div className='hp-tree-parent'>
              <span className='hp-tree-parent-tag'>Parent company</span>
              <strong>AZ Audio Solutions</strong>
              <span className='hp-tree-parent-sub'>Five specialized service divisions</span>
            </div>

            <div className='hp-tree-stem' aria-hidden='true' />

            <ul className='hp-tree-branches'>
              {hierarchy.map((h) => (
                <li key={h.path}>
                  <Link to={h.path} className='hp-tree-node'>
                    <span className='hp-tree-node-icon'><h.Icon size={22} strokeWidth={1.5} /></span>
                    <strong>{h.title}</strong>
                    <span className='hp-tree-node-text'>
                      A service division of AZ Audio Solutions for {h.text}.
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
          <div className='process-timeline hp-timeline'>
            {steps.map((step) => (
              <div key={step.num} className='process-step'>
                <div className='process-step-top'>
                  <span className='process-step-badge'>{step.num}</span>
                  <div className='process-step-vline' />
                  <div className='process-step-circle'>
                    <step.Icon size={28} strokeWidth={1.5} />
                  </div>
                </div>
                <div className='process-step-body'>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
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
            eyebrow='Our Work'
            title='Systems we have designed, installed and tuned'
            text='Photographs from real installations — prayer hall microphones, rack builds, zone control and connected home systems.'
          />
          <div className='hp-work-grid'>
            {work.map((w) => (
              <figure className='hp-work-card' key={w.title}>
                <img src={w.img} alt={w.title} loading='lazy' />
                <figcaption>
                  <strong>{w.title}</strong>
                  <span>{w.text}</span>
                </figcaption>
              </figure>
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

      {/* Equipment standards */}
      <section className='section surface-muted'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Equipment Standards'
            title='Built with proven professional AV equipment'
            text='We specify established manufacturer ecosystems rather than unbranded hardware — so replacement parts, firmware updates, and service remain available for the full life of your system.'
          />
          <div className='brand-grid-clean'>
            {brands.map((brand) => (
              <div key={brand.name} className='clean-brand-tile'>
                <img src={`/brand-logos/${brand.file}`} alt={`${brand.name} logo`} loading='lazy' />
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
