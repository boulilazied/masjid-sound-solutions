import { Link } from 'react-router-dom'
import {
  School, BellRing, Megaphone, Mic2, Smartphone, Phone, PhoneCall, Radio, Server,
  Cctv, HardDrive, MonitorPlay, DoorOpen, Cable, Network, Archive, BatteryCharging,
  ClipboardList, FlaskConical, HardHat, GraduationCap, BadgeCheck
} from 'lucide-react'

// Content mirrors the printed school flyer (marketing-schools/school-flyer.html in the
// assets folder). Capability statements only: no school is named and no project
// counts are given, per the public claims policy in CLAUDE.md.
const pillars = [
  {
    n: '01',
    title: 'PA, Bells & Paging',
    Icon: Megaphone,
    items: [
      { Icon: Network,    text: 'Multi-zone AtlasIED system: classrooms, hallways, entrance hall, gym and outdoor, each controlled on its own' },
      { Icon: BellRing,   text: 'Automatic school bells on a daily schedule' },
      { Icon: Mic2,       text: 'Office announcement mic that takes priority over everything else in the building' },
      { Icon: Radio,      text: 'Shure wireless microphones for assemblies, graduations and events' },
      { Icon: Smartphone, text: 'Volume control from a phone or tablet, PIN-protected, with limits you set' },
    ],
  },
  {
    n: '02',
    title: 'Classroom Intercom',
    Icon: Phone,
    items: [
      { Icon: Phone,     text: 'An IP phone in every classroom and office, each with its own short extension' },
      { Icon: PhoneCall, text: "Principal's phone with a one-touch key for each classroom" },
      { Icon: Megaphone, text: '"Page all classrooms" from any office phone' },
      { Icon: Radio,     text: 'Cordless handsets for staff who move around the building' },
      { Icon: Server,    text: "3CX phone system on the school's own server, so internal calls stay on campus" },
    ],
  },
  {
    n: '03',
    title: 'Video Security',
    Icon: Cctv,
    items: [
      { Icon: Cctv,        text: 'High-resolution IP cameras indoors and outdoors, powered over the network cable' },
      { Icon: HardDrive,   text: 'Network video recorder with surveillance-grade storage' },
      { Icon: MonitorPlay, text: 'Live view and playback in the office, plus remote viewing' },
      { Icon: DoorOpen,    text: 'Video door entry (option): see and talk to visitors before letting them in' },
    ],
  },
]

const backbone = [
  { Icon: Cable,           text: 'Cat6 cabling, floor by floor' },
  { Icon: Network,         text: 'PoE network switch' },
  { Icon: Archive,         text: 'Labeled patch panel' },
  { Icon: Server,          text: 'Equipment rack' },
  { Icon: BatteryCharging, text: 'UPS battery backup' },
]

const processSteps = [
  { n: '1', title: 'Free Walk-Through',  text: 'We visit, count rooms and listen to your needs.',                       Icon: School },
  { n: '2', title: 'Itemized Proposal',  text: 'Every device and every cost listed line by line.',                     Icon: ClipboardList },
  { n: '3', title: 'Bench-Tested',       text: 'We build and test the system before it reaches your school.',          Icon: FlaskConical },
  { n: '4', title: 'Install & Program',  text: 'Wired, configured and tested zone by zone, room by room.',              Icon: HardHat },
  { n: '5', title: 'Staff Training',     text: 'Your team learns bells, paging and phones before we hand over.',        Icon: GraduationCap },
]

const brands = [
  { name: 'Atlas IED', file: 'atlasied.svg' },
  { name: 'JBL',       file: 'jbl.svg' },
  { name: 'Shure',     file: 'shure.svg' },
]

export default function SchoolSystemsPage() {
  return (
    <div className='masjid-clean-page school-page'>
      <section className='std-hero'>
        <div className='container std-hero-inner'>
          <div className='std-hero-icon'>
            <School size={36} strokeWidth={1.5} />
          </div>
          <div className='eyebrow eyebrow-light'>For K-12 &amp; private schools</div>
          <h1>Sound. Intercom. Security. One team, one system.</h1>
          <p>
            We design, wire, program and hand over your school's PA and bells, classroom intercom
            and video cameras, all on one network and in one equipment rack, so your staff learns
            one system, not three.
          </p>
          <div className='hero-actions'>
            <Link to='/contact' className='button button-primary'>Request a Walk-Through</Link>
            <a href='https://wa.me/17243211106' className='button button-ghost-light' target='_blank' rel='noreferrer'>WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>What we install</div>
            <h2>Three systems your school uses every day.</h2>
            <p>Each one can be installed on its own, or all three together on a shared backbone.</p>
          </div>

          <div className='school-pillars'>
            {pillars.map((p) => (
              <article key={p.n} className='school-pillar'>
                <span className='school-pillar-num'>{p.n}</span>
                <div className='why-icon'>
                  <p.Icon size={26} strokeWidth={1.5} />
                </div>
                <h3>{p.title}</h3>
                <ul>
                  {p.items.map((it) => (
                    <li key={it.text}>
                      <it.Icon size={16} strokeWidth={1.75} />
                      <span>{it.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='school-backbone'>
        <div className='container school-backbone-inner'>
          <div className='school-backbone-tag'>The backbone</div>
          <div className='school-backbone-list'>
            {backbone.map((b) => (
              <div key={b.text} className='school-backbone-item'>
                <b.Icon size={18} strokeWidth={1.6} />
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='clean-section clean-soft'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>How we work</div>
            <h2>From walk-through to handover.</h2>
            <p>Five defined steps. You see the full itemized scope before any work starts.</p>
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

          <div className='process-commitment'>
            <div className='process-commitment-icon'>
              <BadgeCheck size={20} strokeWidth={1.75} />
            </div>
            <div>
              <strong>Free initial consultation.</strong>{' '}
              The walk-through and the itemized proposal cost you nothing.
            </div>
          </div>
        </div>
      </section>

      <section className='clean-section clean-white brands-clean-section'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Equipment we build with</div>
            <h2>Professional brands, chosen for daily school use.</h2>
            <p>Intercom phones by Yealink on a 3CX phone system.</p>
          </div>
          <div className='brand-grid-clean school-brand-grid'>
            {brands.map((b) => (
              <div key={b.name} className='clean-brand-tile'>
                <img src={`/brand-logos/${b.file}`} alt={b.name} loading='lazy' />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='clean-section final-consultation'>
        <div className='container final-consultation-inner'>
          <div>
            <div className='real-eyebrow'>Let's talk about your school</div>
            <h2>Request a free walk-through.</h2>
            <p>
              Tell us how many classrooms and floors you have and what you need: bells, paging,
              intercom, cameras or all of it. We'll come back with an itemized proposal.
            </p>
          </div>
          <Link to='/contact' className='real-button real-button-gold'>Request a Walk-Through</Link>
        </div>
      </section>
    </div>
  )
}
