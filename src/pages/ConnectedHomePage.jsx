import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExperienceFaq } from '../components/ServiceExperience'
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
  { Icon: ShieldCheck, title: 'Security & Alarm',           text: 'Control panel, door and window sensors, motion detection, audible alerts, phone notifications, and optional professional monitoring when available.' },
  { Icon: Video,       title: 'Cameras & Video Doorbell',   text: 'Indoor and outdoor camera coverage, recorded video, remote viewing, activity alerts, and a video doorbell.' },
  { Icon: DoorOpen,    title: 'Smart Entry',                text: 'Smart locks, garage-door control, visitor communication, and access management from your phone.' },
  { Icon: Lightbulb,   title: 'Lighting & Comfort',         text: 'Smart switches, thermostat control, schedules, scenes, and compatible motorized curtains.' },
  { Icon: Music,       title: 'Audio & Entertainment',      text: 'Optional home theater, whole-home audio, outdoor speakers, and media-room calibration — designed as part of the same home project.', href: '#audio-entertainment' },
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
  const [tierKey, setTierKey] = useState('plus')
  const tier = TIERS[tierKey]

  return (
    <div className='smarthome-page' data-tier={tierKey}>

      <section className='az-service-hero az-connected-hero'>
        <div className='container az-service-hero-inner'>
          <div className='az-service-hero-copy'>
            <span className='eyebrow eyebrow-light'>Home Security &amp; Connected Living</span>
            <h1>Protect your home. Control it from anywhere.</h1>
            <p>Security cameras, smart entry, alarm sensors, lighting, climate, garage control, and optional whole-home audio — professionally designed, installed, and configured for your home.</p>
            <div className='az-hero-actions'>
              <Link to='/contact' className='button button-primary'>Book a Free Home Consultation</Link>
              <a href='#compare' className='button button-secondary'>Compare Packages</a>
            </div>
            <a href='tel:+17243211106' className='az-phone'><PhoneCall size={18} aria-hidden='true' />Call +1 724 321 1106</a>
          </div>
          <figure><img src='/smart-home/hero-home.jpg' alt='Modern home illuminated at dusk' fetchPriority='high' /><figcaption>Security, comfort, and everyday control — designed around your home.</figcaption></figure>
        </div>
      </section>
      <div className='az-proof-strip'><div className='container'><span><Check size={17} aria-hidden='true' />Professional installation</span><span><Check size={17} aria-hidden='true' />One simple control experience</span><span><Check size={17} aria-hidden='true' />Itemized proposal</span><span><Check size={17} aria-hidden='true' />Local support</span></div></div>
      <nav className='az-service-nav container' aria-label='Home security page sections'><a href='#solutions'>What we install</a><a href='#packages'>Packages</a><a href='#compare'>Compare</a><a href='#monitoring'>Monitoring</a><a href='#optional-upgrades'>Optional upgrades</a><a href='#home-process'>How it works</a></nav>

      <section className='section' id='solutions'>
        <div className='container'>
          <div className='az-section-heading'>
            <span className='eyebrow'>Protection, control and comfort</span>
            <h2>One home project. Five ways to make it safer and easier.</h2>
            <p>Start with the security of your home, then add the control and comfort that fit your household.</p>
          </div>
          <div className='why-grid'>
            {categories.map((c) => (
              <div key={c.title} className='why-card'>
                <div className='why-icon'><c.Icon size={26} strokeWidth={1.5} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                {c.href && <a className='az-text-link' href={c.href}>See audio options →</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier switcher + tile grid + price */}
      <section className='sh-packages' id='packages'>
        <div className='container'>
          <div className='az-package-heading'>
            <span className='eyebrow'>Find your fit</span>
            <h2>Three packages. Three clear outcomes.</h2>
            <p>Start with security, add everyday automation, or cover a larger property. Quantities marked as allowances are confirmed at your home survey and shown in your itemized proposal.</p>
            <a className='az-text-link' href='#compare'>Compare all included features →</a>
          </div>
          <div className='sh-tier-tabs' role='group' aria-label='Home security packages'>
            {TIER_ORDER.map((key) => (
              <button
                key={key}
                type='button'
                aria-pressed={key === tierKey}
                className={`sh-tier-tab sh-tier-tab--${key}${key === tierKey ? ' is-active' : ''}`}
                onClick={() => setTierKey(key)}
              >
                <span className='sh-tier-tab-name'>{TIERS[key].short}</span>
                <span className='sh-tier-tab-price'>from {TIERS[key].price}</span>
              </button>
            ))}
          </div>

          <div className='az-package-summary' aria-live='polite'>
            <p><strong>{tier.name} · from {tier.price}</strong><br />{tier.summary}{tier.inherits && ` Includes everything in ${tier.inherits}, plus:`}</p>
            <a href='#compare'>See the differences</a>
          </div>
          <div className='sh-tiles'>
            {tier.tiles.map((item, i) => (
              <article className='sh-tile' key={item.title}>
                <span className='sh-tile-badge'>{i + 1}</span>
                <div className='sh-tile-media'>
                  {item.img
                    ? <img src={`/smart-home/${item.img}.jpg`} alt={item.title} loading='lazy' width='480' height='480' />
                    : <span className='sh-tile-icon'><item.Icon size={44} strokeWidth={1.4} /></span>}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className='sh-price-block'>
            <div className='sh-price-main'>
              <div className='sh-price-label'>Starting price, standard installation</div>
              <div className='sh-price-amount'>from {tier.price}</div>
              <div className='sh-price-tagline'>{tier.tagline}</div>
            </div>
            <div className='sh-price-side'>
              <Link to='/contact' className='sh-price-cta'>Request this package</Link>
              <a className='sh-price-contact' href='https://azaudios.com'><Globe size={15} strokeWidth={2} />AZaudios.com</a>
              <a className='sh-price-contact' href='mailto:contact@azaudios.com'><Mail size={15} strokeWidth={2} />contact@azaudios.com</a>
            </div>
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
                    <th scope='col' key={k} className={k === tierKey ? 'sh-th-active' : undefined}>
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
                      <td key={k} className={k === tierKey ? 'sh-td-active' : undefined}>
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
        ['What is an allowance?', 'A starting quantity included in the package price, such as door and window sensors or smart light switches. Your home survey confirms how many your home needs, and any additional quantity is itemized in your proposal.'],
        ['Is professional emergency monitoring included?', 'No. Camera viewing, phone alerts and an on-site alarm are different from an operator responding to an alarm. Monitoring availability, third-party agreements and recurring fees are confirmed with you before it is added to a proposal.'],
        ['Can I add home theater or whole-home audio?', 'Yes. Home theater, whole-home audio, outdoor speakers and media-room calibration are optional upgrades, designed as part of the same project and itemized in your proposal.'],
      ]} />

      {/* Final CTA */}
      <section className='clean-section final-consultation'>
        <div className='container final-consultation-inner'>
          <div>
            <div className='real-eyebrow'>Ready to start?</div>
            <h2>Book a free home consultation.</h2>
            <p>
              Tell us about your home and what matters most to you. We&rsquo;ll recommend a package
              and send an itemized proposal with no obligation.
            </p>
          </div>
          <Link to='/contact' className='real-button real-button-gold'>Book a Free Home Consultation</Link>
        </div>
      </section>

    </div>
  )
}
