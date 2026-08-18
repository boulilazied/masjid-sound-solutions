import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wrench, ShieldCheck, Lightbulb, Smartphone, Zap, Layers,
  PhoneCall, MapPin, ClipboardList, HardHat, Settings2, Headphones,
  Flame, Droplets, Plug, Fan, Sprout, Music, Check, Globe, Mail
} from 'lucide-react'

// Package contents, wording and prices come straight from the AZ Audio
// Basic / Silver / Gold Smart Home Package flyers, and the product photography
// in /public/smart-home is cropped from those same flyers. Do not add features
// or differentiators that are not on the flyers — see the claims policy in
// CLAUDE.md. If the flyers change, this file and those images change with them.

const TIER_ORDER = ['basic', 'silver', 'gold']

// Tiles shared by all three packages, in flyer order.
const shared = {
  lights:   { img: 'light-switches', title: 'Smart Light Switches',      text: 'Control and dim your lights from anywhere and create the perfect ambiance.' },
  thermo:   { img: 'thermostat',     title: 'Smart Thermostat',          text: 'Comfort and energy savings at your fingertips.' },
  lock:     { img: 'lock-doorbell',  title: 'Smart Door Lock with Video Doorbell', text: 'See, speak to and unlock your door from anywhere.' },
  garageCtl:{ img: 'garage-control', title: 'Smart Garage Control',      text: 'Works with your existing garage door opener.' },
  hub:      { img: 'hub',            title: 'Central Smart Home Integration System', text: 'The hub that connects and automates your entire smart home.' },
  alarm:    { img: 'alarm',          title: 'Smart Alarm System',        text: 'Protect your home with door/window sensors and motion detection.' },
  curtains: { img: 'curtains',       title: 'Smart Motorized Curtain Tracks', text: 'Automate your curtains for convenience, privacy and elegant living.' },
  ups:      { img: 'ups',            title: '1000W UPS Battery Backup',  text: 'Keep your essential systems running during power outages.' },
  materials:{ img: 'materials',      title: 'Installation Materials',    text: 'High-quality components and materials for a reliable installation.' },
  install:  { Icon: Wrench,          title: 'Professional Installation, Programming & System Integration', text: 'Expert setup, programming and seamless integration for optimal performance.' },
}

function tiles(cameras, opener) {
  return [
    shared.lights, cameras, shared.thermo, shared.lock,
    opener, shared.garageCtl, shared.hub, shared.alarm,
    shared.curtains, shared.ups, shared.materials, shared.install,
  ]
}

const TIERS = {
  basic: {
    name: 'Basic',
    price: '$6,500',
    headline: 'Security. Comfort. Convenience.',
    sub: 'All in perfect harmony.',
    tagline: 'Upgrade your home. Upgrade your lifestyle.',
    tiles: tiles(
      { img: 'cameras-8',     title: '8-Camera Security System', text: '24/7 protection for your home and property.' },
      { img: 'garage-opener', title: 'Smart Garage Door Opener', text: 'Open, close and monitor your garage remotely.' },
    ),
  },
  silver: {
    name: 'Silver',
    price: '$8,500',
    headline: 'More comfort. More security.',
    sub: 'A smarter way to live.',
    tagline: 'Upgrade your home. Simplify your life.',
    tiles: tiles(
      { img: 'cameras-8',         title: '8-Camera Security System', text: 'Complete coverage with high-definition cameras for 24/7 monitoring and peace of mind.' },
      { img: 'garage-opener-cam', title: 'Smart Garage Door Opener', text: 'Open, close and monitor your garage remotely with built-in camera.' },
    ),
  },
  gold: {
    name: 'Gold',
    price: '$12,500',
    headline: 'Security. Comfort. Convenience.',
    sub: 'All in perfect harmony.',
    tagline: 'Designed for your home. Built for your lifestyle.',
    tiles: tiles(
      { img: 'cameras-16',        title: '16-Camera Security System', text: 'Complete coverage with high-definition cameras for 24/7 monitoring and peace of mind.' },
      { img: 'garage-opener-cam', title: 'Smart Garage Door Opener', text: 'Open, close and monitor your garage door remotely with built-in camera.' },
    ),
  },
}

const benefits = [
  { Icon: ShieldCheck, title: '360° Security',       text: 'Protect your home inside and out, day and night.' },
  { Icon: Lightbulb,   title: 'Smart Comfort',       text: 'Lighting, climate, curtains and more — automated for your lifestyle.' },
  { Icon: Smartphone,  title: 'Control Anywhere',    text: 'Manage your home from your phone, anytime, anywhere.' },
  { Icon: Zap,         title: 'Power Protection',    text: 'Stay connected and protected during outages.' },
  { Icon: Layers,      title: 'One Seamless System', text: 'All devices work together beautifully — configured just for you.' },
]

const comparison = [
  { label: 'Smart light switches',                      basic: true, silver: true, gold: true },
  { label: 'Camera security system',                    basic: '8 cameras', silver: '8 cameras', gold: '16 cameras' },
  { label: 'Smart thermostat',                          basic: true, silver: true, gold: true },
  { label: 'Smart door lock with video doorbell',       basic: true, silver: true, gold: true },
  { label: 'Smart garage door opener',                  basic: 'Standard', silver: 'Built-in camera', gold: 'Built-in camera' },
  { label: 'Smart garage control (existing opener)',    basic: true, silver: true, gold: true },
  { label: 'Central smart home integration system',     basic: true, silver: true, gold: true },
  { label: 'Smart alarm system (door/window + motion)', basic: true, silver: true, gold: true },
  { label: 'Smart motorized curtain tracks',            basic: true, silver: true, gold: true },
  { label: '1000W UPS battery backup',                  basic: true, silver: true, gold: true },
  { label: 'Installation materials',                    basic: true, silver: true, gold: true },
  { label: 'Professional installation & programming',   basic: true, silver: true, gold: true },
]

// NOTE 1 on every flyer — available at additional cost.
const addOns = [
  { Icon: Flame,    title: 'Smoke & CO Detectors',       text: 'Smart smoke and carbon monoxide detection with phone alerts.' },
  { Icon: Droplets, title: 'Water-Leak Sensors',         text: 'Early leak detection under sinks, near heaters and in basements.' },
  { Icon: Plug,     title: 'Smart Plugs & Outlets',      text: 'Bring individual appliances and fixtures under app control.' },
  { Icon: Fan,      title: 'Smart Ceiling-Fan Controls', text: 'Speed and direction control from your phone or a wall switch.' },
  { Icon: Sprout,   title: 'Smart Irrigation',           text: 'Weather-aware watering schedules for lawns and gardens.' },
  { Icon: Music,    title: 'Whole-Home Audio',           text: 'Multi-room audio designed and installed by our Residential Audio division.' },
]

const processSteps = [
  { n: '1', title: 'Consultation', text: 'We discuss what you want your home to do — security, comfort, energy, or all three.', Icon: PhoneCall },
  { n: '2', title: 'Site Survey',  text: 'We walk the property, check Wi-Fi coverage, wiring and camera sightlines.', Icon: MapPin },
  { n: '3', title: 'Proposal',     text: 'An itemized package with exact device counts, placement plan and transparent pricing.', Icon: ClipboardList },
  { n: '4', title: 'Installation', text: 'Clean, discreet installation with proper cabling, plates and cable management.', Icon: HardHat },
  { n: '5', title: 'Programming',  text: 'Every device joined to one hub, scenes configured, app set up on your phones.', Icon: Settings2 },
  { n: '6', title: 'Handover',     text: 'A full walkthrough with your household, plus ongoing support whenever you need it.', Icon: Headphones },
]

// The shield-and-wifi emblem from the flyer masthead, drawn as SVG so it stays
// crisp at any size.
function ShieldMark({ size = 96 }) {
  return (
    <svg className='sh-shield' width={size} height={size} viewBox='0 0 64 64' fill='none' aria-hidden='true'>
      <path
        d='M32 3.5 L58 13 V31.5 C58 45.5 46.5 56.5 32 60.5 C17.5 56.5 6 45.5 6 31.5 V13 Z'
        stroke='currentColor' strokeWidth='3.2' strokeLinejoin='round'
      />
      <path d='M20.5 28.5a16 16 0 0 1 23 0' stroke='currentColor' strokeWidth='3.2' strokeLinecap='round' />
      <path d='M25.5 35.5a9 9 0 0 1 13 0' stroke='currentColor' strokeWidth='3.2' strokeLinecap='round' />
      <circle cx='32' cy='43' r='2.6' fill='currentColor' />
    </svg>
  )
}

function Cell({ value }) {
  if (value === true) return <span className='sh-cell-yes'><Check size={17} strokeWidth={3} /><span className='sr-only'>Included</span></span>
  return <span className='sh-cell-spec'>{value}</span>
}

export default function ConnectedHomePage() {
  const [tierKey, setTierKey] = useState('gold')
  const tier = TIERS[tierKey]

  return (
    <div className='smarthome-page' data-tier={tierKey}>

      {/* Flyer masthead */}
      <section className='sh-masthead'>
        <div className='sh-masthead-photo' role='img' aria-label='Modern smart home lit at dusk' />
        <div className='sh-masthead-wedge'>
          <div className='sh-masthead-panel'>
            <div className='sh-masthead-inner'>
              <ShieldMark size={104} />
              <div>
                <h1>
                  <span className='sh-masthead-tier'>{tier.name}</span>
                  <span className='sh-masthead-title'>Smart Home Package</span>
                </h1>
                <p className='sh-masthead-lead'>{tier.headline}<br />{tier.sub}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='sh-goldband'>
        <div className='container'>A complete, fully-integrated smart home solution</div>
      </div>

      {/* Tier switcher + flyer tile grid + price */}
      <section className='sh-packages' id='packages'>
        <div className='container'>
          <div className='sh-tier-tabs' role='tablist' aria-label='Smart home packages'>
            {TIER_ORDER.map((key) => (
              <button
                key={key}
                role='tab'
                type='button'
                aria-selected={key === tierKey}
                className={`sh-tier-tab sh-tier-tab--${key}${key === tierKey ? ' is-active' : ''}`}
                onClick={() => setTierKey(key)}
              >
                <span className='sh-tier-tab-name'>{TIERS[key].name}</span>
                <span className='sh-tier-tab-price'>{TIERS[key].price}</span>
              </button>
            ))}
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
              <div className='sh-price-label'>Total installed package price</div>
              <div className='sh-price-amount'>{tier.price}</div>
              <div className='sh-price-tagline'>{tier.tagline}</div>
            </div>
            <div className='sh-price-side'>
              <Link to='/contact' className='sh-price-cta'>Request this package</Link>
              <a className='sh-price-contact' href='https://azaudios.com'><Globe size={15} strokeWidth={2} />AZaudios.com</a>
              <a className='sh-price-contact' href='mailto:contact@azaudios.com'><Mail size={15} strokeWidth={2} />contact@azaudios.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits bar */}
      <section className='sh-benefits'>
        <div className='container sh-benefits-row'>
          {benefits.map((b) => (
            <div className='sh-benefit' key={b.title}>
              <b.Icon size={26} strokeWidth={1.5} />
              <strong>{b.title}</strong>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Compare</div>
            <h2>What each package includes.</h2>
            <p>
              All three packages are fully integrated systems with professional installation. The
              differences are in camera coverage and the garage door hardware.
            </p>
          </div>

          <div className='sh-table-wrap'>
            <table className='sh-table'>
              <thead>
                <tr>
                  <th scope='col'>Component</th>
                  {TIER_ORDER.map((k) => (
                    <th scope='col' key={k} className={k === tierKey ? 'sh-th-active' : undefined}>
                      {TIERS[k].name}<span>{TIERS[k].price}</span>
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
        </div>
      </section>

      {/* Notes 1 and 2 from the flyers */}
      <section className='clean-section clean-soft'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Optional extras</div>
            <h2>Add what your home needs.</h2>
            <p>
              These smart home features can be added to any package at additional cost — quoted
              itemized, so you see exactly what each one adds.
            </p>
          </div>
          <div className='why-grid'>
            {addOns.map((item) => (
              <div key={item.title} className='why-card'>
                <div className='why-icon'><item.Icon size={26} strokeWidth={1.5} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <p className='sh-fineprint'>
            We can tailor the system and services to meet your home's specific needs, layout,
            priorities and budget. Final equipment quantities and pricing may vary depending on site
            conditions and the selected configuration.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>How it works</div>
            <h2>From first call to full handover.</h2>
            <p>A defined six-step process — properly surveyed, cleanly installed, and programmed so it just works.</p>
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

      {/* Residential audio cross-link */}
      <section className='clean-section clean-soft'>
        <div className='container'>
          <div className='sh-crosslink'>
            <div className='sh-crosslink-icon'><Music size={30} strokeWidth={1.4} /></div>
            <div className='sh-crosslink-copy'>
              <div className='real-eyebrow'>Pairs with</div>
              <h2>Add whole-home audio to your connected home.</h2>
              <p>
                Audio is what we started with. In-ceiling speakers, media-room sound and multi-room
                audio can be designed into the same system and controlled from the same app —
                installed by our Residential Audio division.
              </p>
            </div>
            <Link to='/residential-audio' className='real-button real-button-gold sh-crosslink-cta'>
              Residential Audio Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='clean-section final-consultation'>
        <div className='container final-consultation-inner'>
          <div>
            <div className='real-eyebrow'>Ready to start?</div>
            <h2>Book a free connected home consultation.</h2>
            <p>
              Tell us about your home — size, layout, and what matters most to you. We'll recommend
              the right package and send an itemized proposal with no obligation.
            </p>
          </div>
          <Link to='/contact' className='real-button real-button-gold'>Request a Quote</Link>
        </div>
      </section>

    </div>
  )
}
