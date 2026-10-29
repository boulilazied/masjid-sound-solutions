import { Link } from 'react-router-dom'
import { homeInquiryPath } from '../../shared/home-inquiry.js'
import { ExperienceFaq, ExperienceStories } from '../components/ServiceExperience'
import {
  ShieldCheck, Lightbulb, Smartphone, Layers, Video, DoorOpen, Music,
  PhoneCall, MapPin, ClipboardList, HardHat, Settings2, Headphones,
  Flame, Droplets, Plug, Wifi, BatteryCharging, Film, Speaker, Waves, HardDrive,
  Check, Minus, Globe, Mail
} from 'lucide-react'

// Package structure, wording and starting prices follow the October 2026 house-offer
// brief (Home Security & Connected Living). The brief gives no device counts for
// sensors, switches or curtain tracks, so those are written as survey-confirmed
// allowances — do not invent numbers here. Monitoring, dispatch, insurance, response
// times and "one app controls everything" must stay out of the copy until the supplier,
// contract and recurring fee are confirmed (see the claims policy in CLAUDE.md).

const TIER_ORDER = ['essential', 'plus', 'complete']

const TIERS = {
  essential: {
    name: 'Essential Home Security',
    short: 'Essential',
    price: '$6,500',
    summary: 'A professionally installed security foundation.',
    offerImage: '/home-offer/entry-v1.webp',
    inherits: null,
    tagline: 'Start with protection. Add comfort later.',
    tiles: [
      { img: 'alarm',        title: 'Alarm Control Panel or Central Hub', text: 'The core of your security system and the point every other device connects to.' },
      { img: 'alarm',        title: 'Door/Window & Motion Sensors',       text: 'A starter sensor allowance for entry points and key rooms, confirmed at your home survey.' },
      { img: 'cameras-8',    title: 'Up to 8 Security Cameras',           text: 'Indoor and outdoor coverage with a recorder, placed after we check sightlines.' },
      { img: 'lock-doorbell',title: 'Video Doorbell',                     text: 'See and speak to visitors from your phone.' },
      { img: 'lock-doorbell',title: 'One Smart Door Lock',                text: 'Lock and unlock your main entry from the app.' },
      { Icon: Smartphone,    title: 'Mobile App Setup & Household Walkthrough', text: 'We set up the app and show everyone in your home how to use it.' },
      { img: 'materials',    title: 'Installation Materials & Programming', text: 'Standard installation materials, cabling and system programming.' },
    ],
  },
  plus: {
    name: 'Smart Home Plus',
    short: 'Plus',
    price: '$8,500',
    summary: 'Everything in Essential Home Security, plus everyday automation.',
    offerImage: '/home-offer/automation-interior-v2.webp',
    inherits: 'Essential Home Security',
    tagline: 'Security that also runs your daily routine.',
    tiles: [
      { img: 'thermostat',     title: 'Smart Thermostat',          text: 'Temperature control from your phone, with schedules.' },
      { img: 'light-switches', title: 'Smart Light Switches',      text: 'A defined switch allowance, confirmed at your home survey.' },
      { img: 'garage-control', title: 'Garage-Door Control',       text: 'Open, close and check your garage door from the app.' },
      { Icon: Droplets,        title: 'Safety or Water-Leak Sensors', text: 'A selected sensor allowance, confirmed at your home survey.' },
      { Icon: Layers,          title: 'Custom Schedules & Scenes', text: 'Lighting, climate and security routines set up around your household.' },
      { img: 'hub',            title: 'System Integration & Programming', text: 'The devices configured to work together.' },
    ],
  },
  complete: {
    name: 'Complete Connected Home',
    short: 'Complete',
    price: '$12,500',
    summary: 'For larger homes or wider property coverage.',
    offerImage: '/home-offer/coverage-v1.webp',
    inherits: 'Smart Home Plus',
    tagline: 'Wider coverage, more automation, and a full handover.',
    tiles: [
      { img: 'cameras-16',        title: 'Up to 16 Security Cameras',  text: 'Wider property coverage with a recorder.' },
      { img: 'garage-opener-cam', title: 'Garage Control with Compatible Camera Option', text: 'Garage control, with a camera option where compatible.' },
      { img: 'light-switches',    title: 'Expanded Lighting & Sensor Allowance', text: 'A larger switch and sensor allowance, confirmed at your home survey.' },
      { img: 'curtains',          title: 'Motorized Curtains',          text: 'A defined motorized-curtain allowance, confirmed at your home survey.' },
      { img: 'ups',               title: '1000W UPS Battery Backup',    text: 'Backup power for selected core equipment.' },
      { img: 'hub',               title: 'Advanced Scenes, Integration & Full Household Handover', text: 'Deeper programming and a complete walkthrough for your household.' },
    ],
  },
}

// false renders as a dash. Strings are shown as written.
const comparison = [
  { label: 'Alarm control panel or central hub',  essential: true, plus: true, complete: true },
  { label: 'Door/window & motion sensors',        essential: 'Starter allowance', plus: 'Starter allowance', complete: 'Expanded allowance' },
  { label: 'Security cameras with recorder',      essential: 'Up to 8', plus: 'Up to 8', complete: 'Up to 16' },
  { label: 'Video doorbell',                      essential: true, plus: true, complete: true },
  { label: 'Smart door lock',                     essential: 'One lock', plus: 'One lock', complete: 'One lock' },
  { label: 'Mobile app setup & walkthrough',      essential: true, plus: true, complete: true },
  { label: 'Smart thermostat',                    essential: false, plus: true, complete: true },
  { label: 'Smart light switches',                essential: false, plus: 'Defined allowance', complete: 'Expanded allowance' },
  { label: 'Garage-door control',                 essential: false, plus: true, complete: 'With compatible camera option' },
  { label: 'Safety or water-leak sensors',        essential: false, plus: 'Selected allowance', complete: 'Expanded allowance' },
  { label: 'Custom schedules & scenes',           essential: false, plus: true, complete: 'Advanced' },
  { label: 'Motorized curtains',                  essential: false, plus: false, complete: 'Defined allowance' },
  { label: '1000W UPS battery backup',            essential: false, plus: false, complete: 'Selected core equipment' },
  { label: 'Installation materials & programming',essential: 'Standard', plus: 'Plus integration', complete: 'Full handover' },
]

const categories = [
  { eyebrow: 'Security & Alarm', title: 'Know your home is protected.', text: 'Control panel, door and window sensors, motion detection, audible alerts, phone notifications, and optional professional monitoring when available.', image: '/home-offer/alarm-kit-v2.webp', alt: 'Illustrative complete alarm panel and sensors', imageCaption: 'AI-generated equipment illustration. Models and quantities are confirmed in your proposal.', link: '#packages', action: 'See the packages' },
  { eyebrow: 'Cameras & Video Doorbell', title: 'See what is happening, wherever you are.', text: 'Indoor and outdoor camera coverage, recorded video, remote viewing, activity alerts, and a video doorbell.', image: '/home-offer/coverage-v1.webp', alt: 'Illustrative outdoor security cameras installed below a soffit', imageCaption: 'AI-generated camera-installation illustration. Equipment and placement are confirmed after your survey.', link: '#compare', action: 'Compare camera coverage' },
  { eyebrow: 'Smart Entry', title: 'Answer the door without going to it.', text: 'Smart locks, garage-door control, visitor communication, and access management from your phone.', image: '/home-offer/entry-v1.webp', alt: 'Illustrative installed smart lock and video doorbell, shown in full', imageCaption: 'AI-generated smart-entry illustration. Exact equipment is confirmed in your proposal.', link: '#packages', action: 'Find your package' },
  { eyebrow: 'Lighting & Comfort', title: 'Set the scene for everyday living.', text: 'Smart switches, thermostat control, schedules, scenes, and compatible motorized curtains.', image: '/home-offer/automation-interior-v2.webp', alt: 'Illustrative thermostat and light switches on an interior hallway wall', imageCaption: 'AI-generated interior-control illustration. Equipment and compatibility are confirmed in your proposal.', link: '#home-process', action: 'See how installation works' },
  { eyebrow: 'Optional Audio & Entertainment', title: 'Bring the cinema experience home.', text: 'Optional home theater, whole-home audio, outdoor speakers, and media-room calibration — designed as part of the same home project. Audio upgrades are quoted separately from the security packages.', image: '/home-offer/cinema-v1.webp', alt: 'Illustrative small home cinema with projection, installed speakers, acoustic treatment and an AV rack', imageCaption: 'AI-generated home-cinema illustration. Equipment and installation are quoted to your room.', link: '#audio-entertainment', action: 'See audio options' },
]

const everyday = [
  { n: '01', title: 'Set schedules and scenes', text: 'Lighting, climate and security routines set up around how your household lives.' },
  { n: '02', title: 'Get alerts on your phone', text: 'Activity notifications from your cameras, doorbell and alarm sensors, wherever you are.' },
  { n: '03', title: 'Control it from the app', text: 'We set up the mobile app and walk everyone in your home through it.' },
]

const blocks = [
  { image: '/home-offer/alarm-kit-v2.webp', title: 'Alarm Control Panel & Sensors', href: '#packages' },
  { image: '/home-offer/coverage-v1.webp', title: 'Security Cameras',              href: '#compare' },
  { image: '/home-offer/entry-v1.webp', title: 'Video Doorbell & Smart Lock', href: '#packages' },
  { image: '/home-offer/automation-interior-v2.webp', title: 'Thermostat & Lighting',         href: '#compare' },
]

const protections = [
  { Icon: Video,       title: 'Cameras & phone alerts',     text: 'Live and recorded video and activity notifications on your phone. You see what happened; nobody is watching for you.' },
  { Icon: ShieldCheck, title: 'Alarm system',               text: 'Sensors, a control panel and audible alerts on site. It sounds locally and notifies the people you choose.' },
  { Icon: PhoneCall,   title: 'Professional emergency monitoring', text: 'A separate, optional service where an operator responds to alarms. Not part of the starting prices.' },
]

const optionalUpgrades = [
  { Icon: Flame,     title: 'Smoke & CO Detectors',        text: 'Smart smoke and carbon-monoxide detection with phone alerts.' },
  { Icon: Droplets,  title: 'Water-Leak Sensors',          text: 'Early leak detection under sinks, near heaters and in basements.' },
  { Icon: HardDrive, title: 'More Cameras or Recording Storage', text: 'Additional camera positions or extended recording storage.' },
  { Icon: Plug,      title: 'Plugs, Outlets, Fans & Irrigation', text: 'Smart plugs, outlets, ceiling-fan controls and irrigation scheduling.' },
  { Icon: Wifi,      title: 'Network & Wi-Fi Improvements', text: 'Better coverage where cameras and devices need it.' },
  { Icon: BatteryCharging, title: 'Additional Battery Backup', text: 'Extra backup power beyond the equipment included in your package.' },
]

const audioUpgrades = [
  { Icon: Film,    title: 'Home Theater & Media-Room Audio', text: 'Surround sound, thoughtful speaker placement and calibration for your media room.' },
  { Icon: Music,   title: 'Whole-Home Multi-Room Audio',     text: 'Music in the rooms you use, with independent source and volume per room.' },
  { Icon: Waves,   title: 'Outdoor Patio & Pool Audio',      text: 'Weather-resistant speakers for patios, pools and gardens.' },
  { Icon: Speaker, title: 'Media-Room Calibration',          text: 'Room-specific tuning so dialogue and music sound right in your space.' },
]

const processSteps = [
  { n: '1', title: 'Consultation',        text: 'We learn your household’s security, comfort and entertainment priorities.', Icon: PhoneCall },
  { n: '2', title: 'Home Survey',         text: 'We check entry points, camera sightlines, Wi-Fi, wiring routes, equipment location and installation conditions.', Icon: MapPin },
  { n: '3', title: 'Itemized Proposal',   text: 'Exact quantities, package allowances, options, recurring fees and exclusions.', Icon: ClipboardList },
  { n: '4', title: 'Installation',        text: 'Equipment installed and labeled with clean cable management.', Icon: HardHat },
  { n: '5', title: 'Programming & Testing', text: 'Alerts, users, schedules, scenes, recording and access configured and tested.', Icon: Settings2 },
  { n: '6', title: 'Household Handover',  text: 'App set up, household trained, and support information provided.', Icon: Headphones },
]

function Cell({ value }) {
  if (value === true) return <span className='sh-cell-yes'><Check size={17} strokeWidth={3} /><span className='sr-only'>Included</span></span>
  if (value === false) return <span className='sh-cell-no'><Minus size={17} strokeWidth={2.5} aria-hidden='true' /><span className='sr-only'>Not included</span></span>
  return <span className='sh-cell-spec'>{value}</span>
}

export default function ConnectedHomePage() {
  return (
    <div className='smarthome-page'>

      <section className='az-service-hero az-connected-hero'>
        <div className='container az-service-hero-inner'>
          <div className='az-service-hero-copy'>
            <span className='eyebrow eyebrow-light'>Home Security &amp; Connected Living</span>
            <h1>Protect your home. Control it from anywhere.</h1>
            <p>Security cameras, smart entry, alarm sensors, lighting, climate, garage control, and optional whole-home audio — professionally designed, installed, and configured for your home.</p>
            <div className='az-hero-actions'>
              <Link to={homeInquiryPath()} className='button button-primary'>Request a Free Home Consultation</Link>
              <a href='#packages' className='button button-secondary'>Packages &amp; Prices</a>
            </div>
            <p className='hs-service-area'>Based in Pittsburgh, PA. Tell us your city to confirm home-installation availability, travel requirements and on-site support before choosing a package.</p>
            <a href='tel:+17243211106' className='az-phone'><PhoneCall size={18} aria-hidden='true' />Call +1 724 321 1106</a>
          </div>
          <figure><img src='/home-offer/hero-v1.webp' alt='Illustrative stone-front home with warm entry lighting at dusk' width='1536' height='1024' fetchPriority='high' /><figcaption>AI-generated home illustration. Your installation is designed after a home survey.</figcaption></figure>
        </div>
      </section>
      <div className='az-proof-strip'><div className='container'><span><HardHat size={20} aria-hidden='true' />Professional installation</span><span><Smartphone size={20} aria-hidden='true' />Household setup & training</span><span><ClipboardList size={20} aria-hidden='true' />Itemized proposal</span><span><MapPin size={20} aria-hidden='true' />Pittsburgh-based team</span></div></div>
      <nav className='az-service-nav container' aria-label='Home security page sections'><a href='#solutions'>What we install</a><a href='#packages'>Packages</a><a href='#compare'>Compare</a><a href='#monitoring'>Monitoring</a><a href='#optional-upgrades'>Optional upgrades</a><a href='#home-process'>How it works</a></nav>

      {/* Tier switcher + tile grid + price */}
      <section className='sh-packages' id='packages'>
        <div className='container'>
          <div className='az-package-heading'>
            <span className='eyebrow'>Find your fit</span>
            <h2>Three packages. Three clear outcomes.</h2>
            <p>Start with security, add everyday automation, or cover a larger property. Quantities marked as allowances are confirmed at your home survey and shown in your itemized proposal.</p>
            <a className='az-text-link' href='#compare'>Compare all included features →</a>
          </div>
          <p className='hs-cost-note'>Starting prices cover an installation project, not a monitoring subscription. Professional emergency monitoring is separate and optional. <a href='#ownership-costs'>See ongoing costs and what your proposal will confirm.</a></p>
          <div className='hs-pkgs'>
            {TIER_ORDER.map((key) => {
              const t = TIERS[key]
              return (
                <article className={`hs-pkg hs-pkg--${key}`} key={key}>
                  <div className='hs-pkg-media'><img src={t.offerImage} alt='' width='1536' height='1024' loading='lazy' /></div>
                  <div className='hs-pkg-head'>
                    <h3>{t.name}</h3>
                    <div className='hs-pkg-price'><span>from</span> {t.price}</div>
                  </div>
                  <p className='hs-pkg-sum'>{t.summary}</p>
                  {t.inherits && <p className='hs-pkg-inherits'>Includes everything in {t.inherits}, plus:</p>}
                  <ul className='hs-pkg-list'>
                    {t.tiles.map((item) => <li key={item.title}><Check size={16} strokeWidth={3} aria-hidden='true' /><span>{item.title}</span></li>)}
                  </ul>
                  <Link to={homeInquiryPath(key)} className='button button-primary hs-pkg-cta' aria-label={`Request ${t.name}`}>Request this package</Link>
                </article>
              )
            })}
          </div>

          <p className='hs-image-disclosure'>Package images are AI-generated illustrations of the services, not completed AZ Audio installations or exact equipment models.</p>
          <div className='sh-price-side hs-pkg-contact'>
            <a className='hs-bigphone' href='tel:+17243211106'><PhoneCall size={20} aria-hidden='true' />Questions? Call +1 724 321 1106</a>
            <a className='sh-price-contact' href='https://azaudios.com'><Globe size={15} strokeWidth={2} />AZaudios.com</a>
            <a className='sh-price-contact' href='mailto:contact@azaudios.com'><Mail size={15} strokeWidth={2} />contact@azaudios.com</a>
          </div>
          <p className='sh-fineprint'>
            Starting prices assume standard installation conditions. Final device quantities, camera placement,
            cable pathways, compatibility, recurring services, and pricing are confirmed after the home survey
            and shown in an itemized proposal.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className='clean-section clean-white' id='compare'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Compare</div>
            <h2>What each package includes.</h2>
            <p>
              Essential covers security. Plus adds everyday automation. Complete extends coverage
              and adds curtains and backup power.
            </p>
          </div>

          <div className='sh-table-wrap'>
            <table className='sh-table'>
              <thead>
                <tr>
                  <th scope='col'>Feature</th>
                  {TIER_ORDER.map((k) => (
                    <th scope='col' key={k}>
                      {TIERS[k].short}<span>from {TIERS[k].price}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope='row'>{row.label}</th>
                    {TIER_ORDER.map((k) => (
                      <td key={k}>
                        <Cell value={row[k]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className='sh-fineprint'>
            An allowance is a starting quantity included in the package price. Anything beyond it, or
            anything the survey shows is needed, is itemized in your proposal before work begins.
          </p>
        </div>
      </section>

      <section className='clean-section clean-soft' id='ownership-costs'>
        <div className='container'>
          <div className='clean-section-intro centered'><div className='real-eyebrow'>Plan the whole cost</div><h2>Installation and ongoing services, explained separately.</h2><p>Your proposal separates equipment and installation from any recurring services. Review both before you approve the project.</p></div>
          <div className='hs-cost-grid'>
            <article><h3>Equipment &amp; installation</h3><p>The starting prices cover the listed package scope under standard installation conditions. Your survey confirms device quantities, compatibility and cable routes; the proposal identifies additional work and exclusions.</p></article>
            <article><h3>App, storage &amp; connectivity</h3><p>App subscriptions, cloud storage or connectivity charges depend on the selected equipment and service. Ask us to identify which services are required, which are optional, and their costs in your proposal.</p></article>
            <article><h3>Optional emergency monitoring</h3><p>Not included in the starting prices. Availability, provider agreements and recurring fees must be confirmed separately. Cameras and phone alerts alone do not include an operator responding to alarms.</p><a className='az-text-link' href='#monitoring'>Understand monitoring →</a></article>
          </div>
          <p className='sh-fineprint'>No universal monthly fee is quoted here: it depends on your selected system and services. Request written details of recurring fees, terms, installation conditions and any travel charges for your address.</p>
        </div>
      </section>

      <section className='section hs-everyday'>
        <div className='container'>
          <div className='az-section-heading'>
            <span className='eyebrow'>Get more from your home</span>
            <h2>Simple enough for the whole household.</h2>
          </div>
          <div className='az-benefit-grid'>
            {everyday.map((e) => (
              <article key={e.n}><span className='az-benefit-number'>{e.n}</span><h3>{e.title}</h3><p>{e.text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className='section' id='solutions'>
        <div className='container'>
          <div className='az-section-heading'>
            <span className='eyebrow'>Protection, control and comfort</span>
            <h2>One home project. Five ways to make it safer and easier.</h2>
            <p>Start with the security of your home, then add the control and comfort that fit your household.</p>
          </div>
        </div>
        <ExperienceStories items={categories} />
      </section>

      <section className='section surface-muted hs-blocks-sec'>
        <div className='container'>
          <div className='az-section-heading'>
            <span className='eyebrow'>Building blocks</span>
            <h2>Start with the pieces that matter most.</h2>
          </div>
          <div className='hs-blocks'>
            {blocks.map((b) => (
              <a key={b.title} href={b.href} className='hs-block'>
                <img src={b.image || `/smart-home/${b.img}.jpg`} alt='' loading='lazy' />
                <span>{b.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring disclosure */}
      <section className='clean-section clean-soft' id='monitoring'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Know what you are buying</div>
            <h2>Cameras, alarms and monitoring are different services.</h2>
            <p>
              Professional emergency monitoring is separate from camera viewing and phone alerts.
              Monitoring availability, third-party agreements, and recurring fees are confirmed with
              you before any monitoring is added to your proposal.
            </p>
          </div>
          <div className='why-grid'>
            {protections.map((p) => (
              <div key={p.title} className='why-card'>
                <div className='why-icon'><p.Icon size={26} strokeWidth={1.5} /></div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional upgrades */}
      <section className='clean-section clean-white' id='optional-upgrades'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Optional home upgrades</div>
            <h2>Add what your home needs.</h2>
            <p>Any of these can be added to a package. Each is quoted as its own line in your itemized proposal.</p>
          </div>
          <div className='why-grid'>
            {optionalUpgrades.map((item) => (
              <div key={item.title} className='why-card'>
                <div className='why-icon'><item.Icon size={26} strokeWidth={1.5} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className='clean-section-intro centered' id='audio-entertainment' style={{ marginTop: '3.5rem' }}>
            <div className='real-eyebrow'>Audio &amp; Entertainment</div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', margin: '0.4rem 0 0.6rem' }}>Great sound, designed into the same project.</h3>
            <p>Audio is where AZ Audio started. These options are designed alongside your security and comfort system, not as a separate job.</p>
          </div>
          <div className='why-grid'>
            {audioUpgrades.map((item) => (
              <div key={item.title} className='why-card'>
                <div className='why-icon'><item.Icon size={26} strokeWidth={1.5} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className='clean-section clean-soft' id='home-process'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>How it works</div>
            <h2>From first call to household handover.</h2>
            <p>Six steps: surveyed, itemized, cleanly installed, and tested before we hand it over.</p>
          </div>
          <div className='process-timeline'>
            {processSteps.map((step) => (
              <div key={step.n} className='process-step'>
                <div className='process-step-top'>
                  <span className='process-step-badge'>{step.n}</span>
                  <div className='process-step-vline' />
                  <div className='process-step-circle'><step.Icon size={28} strokeWidth={1.5} /></div>
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

      <ExperienceFaq items={[
        ['What does the starting price include?', 'The listed equipment and allowances, standard installation materials, professional installation, and programming, under standard installation conditions. Final quantities, camera placement, cable pathways, compatibility, recurring services and pricing are confirmed after the home survey.'],
        ['Will there be ongoing monthly costs?', 'It depends on the selected equipment and services. Professional monitoring is separate and optional. Ask us to identify any required or optional app, cloud-storage and connectivity fees, along with their terms, in your itemized proposal.'],
        ['Where can you install a home system?', 'Our team is based in Pittsburgh, PA. Share your city and state or province so we can confirm residential installation availability, travel requirements and on-site support before you choose a package.'],
        ['What is an allowance?', 'A starting quantity included in the package price, such as door and window sensors or smart light switches. Your home survey confirms how many your home needs, and any additional quantity is itemized in your proposal.'],
        ['Is professional emergency monitoring included?', 'No. Camera viewing, phone alerts and an on-site alarm are different from an operator responding to an alarm. Monitoring availability, third-party agreements and recurring fees are confirmed with you before it is added to a proposal.'],
        ['Can I add home theater or whole-home audio?', 'Yes. Home theater, whole-home audio, outdoor speakers and media-room calibration are optional upgrades, designed as part of the same project and itemized in your proposal.'],
      ]} />

      {/* Final CTA */}
      <section className='clean-section final-consultation'>
        <div className='container final-consultation-inner'>
          <div>
            <div className='real-eyebrow'>Ready to start?</div>
            <h2>Request a free home consultation.</h2>
            <p>
              Tell us about your home and what matters most to you. We&rsquo;ll confirm availability
              for your address, recommend a package and discuss the survey and proposal with no obligation.
            </p>
          </div>
          <div className='hs-final-actions'>
            <Link to={homeInquiryPath()} className='real-button real-button-gold'>Request a Free Home Consultation</Link>
            <a className='hs-bigphone hs-bigphone--light' href='tel:+17243211106'><PhoneCall size={20} aria-hidden='true' />+1 724 321 1106</a>
          </div>
        </div>
      </section>

      <nav className='hs-mobile-actions' aria-label='Home consultation actions'><a href='tel:+17243211106'>Call AZ Audio</a><Link to={homeInquiryPath()}>Request consultation</Link></nav>
    </div>
  )
}
