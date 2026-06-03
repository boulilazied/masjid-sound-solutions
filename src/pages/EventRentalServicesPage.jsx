import { Link } from 'react-router-dom'
import {
  Mic2, Volume2, SlidersHorizontal, Headphones, Wrench, Package,
  Truck, Users, Building2, Sun, Star, MapPin, ClipboardList,
  PhoneCall, Gauge, BadgeCheck, Receipt, Zap
} from 'lucide-react'

const keyBenefits = [
  { Icon: Volume2,    title: 'Full PA System',    text: 'Line arrays, columns, and subwoofers sized to your venue' },
  { Icon: Mic2,       title: 'Wireless Mics',     text: 'Handheld, lavalier, and headset options included' },
  { Icon: Truck,      title: 'Delivered & Setup', text: 'We arrive early, build the rig, and tune before guests arrive' },
  { Icon: Building2,  title: 'Any Venue Size',    text: 'From small halls to large outdoor events' },
  { Icon: Headphones, title: 'On-site Support',   text: 'Technical operator available for the duration of your event' },
  { Icon: Receipt,    title: 'Clear Pricing',     text: 'Itemized quotes with no hidden fees' },
]

const equipment = [
  { Icon: Volume2,           title: 'Professional PA Systems',     text: 'Line arrays, powered column speakers, and subwoofers sized to your venue — indoor or outdoor.' },
  { Icon: Mic2,              title: 'Wireless Microphone Systems', text: 'Handheld, lavalier, and headset wireless mics — charged, tested, and ready before the event starts.' },
  { Icon: SlidersHorizontal, title: 'Digital Audio Mixers',       text: 'Analog and digital consoles for events with multiple sources, monitor sends, or complex routing.' },
  { Icon: Headphones,        title: 'Stage Monitors',             text: 'Floor wedges and stage fills so presenters and performers always hear themselves clearly.' },
  { Icon: Wrench,            title: 'Setup & Sound Check',        text: 'We build the rig, test every channel, and tune the system to the space before your guests arrive.' },
  { Icon: Package,           title: 'Breakdown & Collection',     text: 'Full post-event breakdown and equipment pickup included — no logistics burden on your team.' },
]

const eventTypes = [
  { Icon: Users,     title: 'Community Gatherings', text: 'Masjid events, fundraisers, cultural celebrations, and large community iftars.' },
  { Icon: Building2, title: 'Conferences & Panels', text: 'Multi-speaker setups, panel discussions, and professional presentation audio.' },
  { Icon: Sun,       title: 'Outdoor Events',       text: 'Open-air ceremonies, festivals, and outdoor markets with weather-ready equipment.' },
  { Icon: Star,      title: 'Private & Corporate',  text: 'Weddings, corporate functions, graduations, and VIP gatherings of any size.' },
]

const includes = [
  'Complete PA system sized to your venue and guest count',
  'Wireless microphone systems — fully charged and tested',
  'Digital mixing console with all cables and stands',
  'Stage monitors for presenters and performers',
  'Full delivery to your venue and on-time arrival',
  'Professional setup, cable management, and system test',
  'Sound check and EQ tuning to the room acoustics',
  'On-site or on-call technical support during the event',
  'Post-event breakdown and full equipment retrieval',
]

const processSteps = [
  { n: '1', title: 'Inquiry',             text: 'Contact us with your event date, venue, and estimated guest count.', Icon: PhoneCall },
  { n: '2', title: 'Site Assessment',     text: 'We review the venue layout and acoustics to select the right equipment.', Icon: MapPin },
  { n: '3', title: 'Equipment Proposal',  text: 'Clear itemized quote with full equipment list, delivery schedule, and pricing.', Icon: ClipboardList },
  { n: '4', title: 'Delivery',            text: 'Equipment arrives at your venue ahead of schedule, organized for efficient setup.', Icon: Truck },
  { n: '5', title: 'Setup & Sound Check', text: 'Full system build, level check, EQ tuning, and mic test before doors open.', Icon: Gauge },
  { n: '6', title: 'Breakdown',           text: 'Post-event breakdown and full equipment collection — nothing left for your team.', Icon: Package },
]

const brands = [
  { name: 'JBL',        file: 'jbl.svg' },
  { name: 'QSC',        file: 'qsc.svg' },
  { name: 'Yamaha',     file: 'yamaha.svg' },
  { name: 'Shure',      file: 'shure.svg' },
  { name: 'Sennheiser', file: 'sennheiser.svg' },
  { name: 'DBX',        file: 'dbx.svg' },
  { name: 'RCF',        file: 'rcf.svg' },
]

export default function EventRentalServicesPage() {
  return (
    <div className='event-rental-page'>

      <section className='rental-hero'>
        <div className='container'>
          <div className='rental-hero-inner'>
            <div className='rental-hero-icon'>
              <Mic2 size={40} strokeWidth={1.25} />
            </div>
            <div className='real-eyebrow'>AZ Audio — Event Rental Services</div>
            <h1>Professional audio for every event.</h1>
            <p>
              Complete portable PA systems, wireless microphones, and on-site technical support —
              delivered, set up, and tuned before your first guest arrives.
            </p>
            <div className='real-actions'>
              <Link to='/contact' className='real-button real-button-gold'>Request a Quote</Link>
              <a href='https://wa.me/17248310196' className='real-button real-button-ghost' target='_blank' rel='noreferrer'>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className='masjid-benefits-strip'>
        <div className='container'>
          <div className='masjid-benefits-inner'>
            <div className='masjid-benefits-tag'><span>KEY BENEFITS</span></div>
            <div className='masjid-benefits-list'>
              {keyBenefits.map((b) => (
                <div key={b.title} className='masjid-benefit-item'>
                  <b.Icon size={22} strokeWidth={1.5} />
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>What we provide</div>
            <h2>Everything you need for a professional event.</h2>
            <p>Every rental includes the full audio rig, cables, stands, setup, and on-site technical support — nothing to source separately.</p>
          </div>
          <div className='why-grid'>
            {equipment.map((item) => (
              <div key={item.title} className='why-card'>
                <div className='why-icon'>
                  <item.Icon size={26} strokeWidth={1.5} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='clean-section clean-soft'>
        <div className='container two-column feature-photo-section'>
          <div className='feature-copy'>
            <div className='real-eyebrow'>Rental equipment</div>
            <h2>Sized to your venue. Tested before every event.</h2>
            <p>
              We don't send a generic package — every rental is configured based on your venue
              dimensions, expected guest count, and event type. Equipment arrives pre-tested,
              fully charged, and ready for a fast setup.
            </p>
            <ul className='real-check-list'>
              <li>PA system selected for your room or outdoor area</li>
              <li>Wireless mic channels allocated per speaker and performer</li>
              <li>Mixing console configured for your source count</li>
              <li>All cables, stands, and power distribution included</li>
              <li>Full system test completed before doors open</li>
            </ul>
          </div>
          <div className='rental-equipment-card'>
            <div className='rental-eq-header'>
              <span className='rental-eq-badge'>RENTAL PACKAGE</span>
            </div>
            {[
              { Icon: Volume2,           label: 'PA System',          spec: 'Line array / Column / Sub' },
              { Icon: Mic2,              label: 'Wireless Mics',      spec: '2 – 8 channels' },
              { Icon: SlidersHorizontal, label: 'Digital Mixer',      spec: '16 – 32 channel console' },
              { Icon: Headphones,        label: 'Stage Monitors',     spec: 'Floor wedges or in-ear' },
              { Icon: Zap,               label: 'Power Distribution', spec: 'Surge-protected & conditioned' },
            ].map((row) => (
              <div key={row.label} className='rental-eq-row'>
                <row.Icon size={14} strokeWidth={1.5} />
                <span>{row.label}</span>
                <span className='rental-eq-spec'>{row.spec}</span>
              </div>
            ))}
            <p className='rental-eq-note'>Configured to your venue and guest count</p>
          </div>
        </div>
      </section>

      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Event types</div>
            <h2>From small gatherings to large-scale events.</h2>
            <p>We serve a wide range of events — each with a custom audio setup that matches the space, the audience, and the program.</p>
          </div>
          <div className='rental-event-types-grid'>
            {eventTypes.map((type) => (
              <div key={type.title} className='rental-event-type-card'>
                <div className='rental-event-type-icon'>
                  <type.Icon size={24} strokeWidth={1.5} />
                </div>
                <h3>{type.title}</h3>
                <p>{type.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='rental-includes-section'>
        <div className='container'>
          <div className='rental-includes-grid'>
            <div className='rental-includes-heading'>
              <div className='real-eyebrow'>Every rental includes</div>
              <h2>No gaps. No hidden extras. No last-minute surprises.</h2>
              <p>
                From first delivery to final collection, every item and service is covered in the
                quote. Your team handles the event — we handle the audio.
              </p>
              <Link to='/contact' className='real-button real-button-gold' style={{ marginTop: '1.75rem', display: 'inline-flex' }}>
                Request a Quote
              </Link>
            </div>
            <div className='rental-includes-list'>
              {includes.map((item) => (
                <div key={item} className='rental-includes-item'>
                  <BadgeCheck size={16} strokeWidth={1.75} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>How it works</div>
            <h2>A clear process from inquiry to breakdown.</h2>
            <p>Six defined steps — no surprises, no day-of emergencies, no audio problems at your event.</p>
          </div>
          <div className='process-timeline'>
            {processSteps.map((step) => (
              <div key={step.n} className='process-step'>
                <div className='process-step-top'>
                  <span className='process-step-badge'>{step.n}</span>
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

      <section className='clean-section brands-clean-section'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Equipment brands</div>
            <h2>Trusted names in professional audio</h2>
            <p>Our rental inventory is built around proven, professional-grade brands used by touring companies and installed AV specialists worldwide.</p>
          </div>
          <div className='brand-grid-clean'>
            {brands.map((brand) => (
              <div key={brand.name} className='clean-brand-tile'>
                <img src={`/brand-logos/${brand.file}`} alt={`${brand.name} logo`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='clean-section final-consultation'>
        <div className='container final-consultation-inner'>
          <div>
            <div className='real-eyebrow'>Ready to book?</div>
            <h2>Request a rental quote for your event.</h2>
            <p>
              Tell us your event date, venue, and expected guest count. We'll respond with a
              clear equipment recommendation and transparent pricing.
            </p>
          </div>
          <Link to='/contact' className='real-button real-button-gold'>Request a Quote</Link>
        </div>
      </section>

    </div>
  )
}
