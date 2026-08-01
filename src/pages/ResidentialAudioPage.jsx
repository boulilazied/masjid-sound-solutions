import { Home, PhoneCall, PenLine, HardHat, Gauge, ShieldCheck } from 'lucide-react'
import StandardDivisionPage from '../components/StandardDivisionPage'
import SectionHeading from '../components/SectionHeading'

const services = [
  {
    title: 'In-Ceiling & In-Wall Speakers',
    text: 'Flush-mounted speakers that blend into your home while delivering clear, natural sound in every room.'
  },
  {
    title: 'Media Room & Home Theater',
    text: 'Surround sound systems, subwoofer placement, and room calibration for an immersive movie and music experience.'
  },
  {
    title: 'Outdoor Audio',
    text: 'Weather-resistant speakers for patios, pools, and gardens — with the same quality sound you expect indoors.'
  },
  {
    title: 'Whole-Home Multi-Room Audio',
    text: 'Stream music everywhere or independently per room, controlled from your phone, tablet, or a wall panel.'
  },
  {
    title: 'Smart Home Integration',
    text: 'Connects with your existing smart home ecosystem for voice control, automation, and unified scene management.'
  },
  {
    title: 'Clean Installation & Calibration',
    text: 'No exposed wiring, professional-grade connections, and acoustic calibration tuned to your room\'s specific dimensions.'
  }
]

const whyUs = [
  'No visible wiring — clean, discreet installation',
  'Calibrated for your room\'s acoustics',
  'Easy smart control or simple wall panels',
  'Minimal disruption during the installation process',
  'Post-install walkthrough and ongoing support'
]

const processSteps = [
  { n: '01', title: 'Consultation',  text: 'We visit your home, discuss your listening goals, and assess the spaces and existing wiring.', Icon: PhoneCall },
  { n: '02', title: 'Design',        text: 'Speaker placement, zone routing, and equipment selection tailored to your home layout.', Icon: PenLine },
  { n: '03', title: 'Installation',  text: 'Discreet installation with no exposed wiring, clean wall plates, and a professional finish.', Icon: HardHat },
  { n: '04', title: 'Calibration',   text: 'Room-by-room acoustic calibration and smart control setup so everything sounds exactly right.', Icon: Gauge },
  { n: '05', title: 'Support',       text: 'Walkthrough of the full system, and ongoing support whenever you need it.', Icon: ShieldCheck },
]

const brands = [
  { name: 'JBL',         file: 'jbl.svg' },
  { name: 'QSC',         file: 'qsc.svg' },
  { name: 'Yamaha',      file: 'yamaha.svg' },
  { name: 'Shure',       file: 'shure.svg' },
  { name: 'Sennheiser',  file: 'sennheiser.svg' },
  { name: 'Atlas IED',   file: 'atlasied.svg' },
]

export default function ResidentialAudioPage() {
  return (
    <>
      <StandardDivisionPage
        eyebrow='AZ Audio Division'
        title='Residential Audio Solutions'
        text='Home audio installations that deliver clean, natural sound with discreet installation and simple everyday control.'
        Icon={Home}
        services={services}
        whyUs={whyUs}
      />

      {/* Process */}
      <section className='section'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Process'
            title='From home visit to final calibration'
            text='A defined five-step process — clean installation, properly tuned, with no mess left behind.'
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
