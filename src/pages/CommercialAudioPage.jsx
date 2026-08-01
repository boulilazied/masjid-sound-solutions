import { Building2, PhoneCall, PenLine, HardHat, Gauge, ShieldCheck } from 'lucide-react'
import StandardDivisionPage from '../components/StandardDivisionPage'
import SectionHeading from '../components/SectionHeading'

const services = [
  {
    title: 'Background Music & Zone Paging',
    text: 'Zoned music playback with PA override for announcements — ideal for retail, restaurants, lobbies, and open-plan offices.'
  },
  {
    title: 'Conference & Meeting Room Audio',
    text: 'Speech-optimized ceiling speakers with echo cancellation and simple controls for clear in-room and hybrid communication.'
  },
  {
    title: 'Schools & Educational Facilities',
    text: 'Classroom PA, gymnasium sound reinforcement, and multi-zone audio systems built for daily school use.'
  },
  {
    title: 'Retail & Hospitality',
    text: 'Consistent background music experience with even coverage, simple volume control, and zone-by-zone management.'
  },
  {
    title: 'Multi-Zone Speaker Systems',
    text: 'Independent volume and source routing per zone — so every area sounds right without affecting the others.'
  },
  {
    title: 'Upgrades & Ongoing Support',
    text: 'System diagnostics, DSP tuning, component upgrades, and maintenance contracts to keep your audio performing reliably.'
  }
]

const whyUs = [
  'Reliable systems designed for daily business use',
  'Controls simple enough for non-technical staff',
  'Clean cable management and professional finish',
  'Post-installation tuning and staff training',
  'Ongoing support and maintenance available'
]

const processSteps = [
  { n: '01', title: 'Consultation',  text: 'We assess your space, daily workflow, and audio requirements before recommending anything.', Icon: PhoneCall },
  { n: '02', title: 'System Design', text: 'Custom speaker placement, zone routing, and equipment selection for your specific building.', Icon: PenLine },
  { n: '03', title: 'Installation',  text: 'Professional installation with minimal business disruption, clean cabling, and a tidy finish.', Icon: HardHat },
  { n: '04', title: 'Tuning',        text: 'On-site DSP tuning and staff walkthrough so your team can operate the system from day one.', Icon: Gauge },
  { n: '05', title: 'Support',       text: 'Ongoing remote and on-site support, firmware updates, and maintenance contracts available.', Icon: ShieldCheck },
]

const brands = [
  { name: 'JBL',      file: 'jbl.svg' },
  { name: 'QSC',      file: 'qsc.svg' },
  { name: 'Yamaha',   file: 'yamaha.svg' },
  { name: 'Shure',    file: 'shure.svg' },
  { name: 'DBX',      file: 'dbx.svg' },
  { name: 'Atlas IED',file: 'atlasied.svg' },
]

export default function CommercialAudioPage() {
  return (
    <>
      <StandardDivisionPage
        eyebrow='AZ Audio Division'
        title='Commercial Audio Solutions'
        text='Professional audio systems for offices, schools, retail spaces, and community centers — reliable, easy to operate, and built to last.'
        Icon={Building2}
        services={services}
        whyUs={whyUs}
      />

      {/* Process */}
      <section className='section'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Process'
            title='From assessment to long-term support'
            text='A defined five-step process on every commercial project — no surprises, no shortcuts.'
          />
          <div className='hp-steps-row'>
            {processSteps.map((step) => (
              <div key={step.n} className='hp-step'>
                <div className='hp-step-num'>{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className='section surface-muted'>
        <div className='container'>
          <SectionHeading centered eyebrow='Trusted Brands' title='Built with proven AV equipment' />
          <div className='brand-grid-clean'>
            {brands.map((brand) => (
              <div key={brand.name} className='clean-brand-tile'>
                <img src={`/brand-logos/${brand.file}`} alt={`${brand.name} logo`} loading='lazy' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
