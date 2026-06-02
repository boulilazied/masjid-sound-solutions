import { Link } from 'react-router-dom'
import {
  Mic2, AudioWaveform, SlidersHorizontal, Network, TrendingUp, CircleDollarSign,
  PhoneCall, PenLine, ClipboardList, HardHat, Gauge, GraduationCap, ShieldCheck, BadgeCheck,
  Smartphone, Mic, Music, Zap, Sliders
} from 'lucide-react'

const processSteps = [
  { n: '1', title: 'Consultation',      text: 'Site visit or remote call to assess your layout, acoustics, congregation size, and existing equipment.', Icon: PhoneCall },
  { n: '2', title: 'System Design',     text: 'Custom speaker placement, zone routing, and equipment selection engineered for your specific building.', Icon: PenLine },
  { n: '3', title: 'Proposal',          text: 'Clear, itemized scope of work with equipment list, timeline, and transparent pricing. No vague estimates.', Icon: ClipboardList },
  { n: '4', title: 'Installation',      text: 'Professional installation with minimal disruption to daily prayers. Clean cable runs and organized rack build.', Icon: HardHat },
  { n: '5', title: 'Testing & Tuning',  text: 'On-site DSP tuning, zone coverage verification, and a full staff walkthrough before we hand over the system.', Icon: Gauge },
  { n: '6', title: 'Training',          text: 'Hands-on session with the imam and authorized staff on system operation, zone control, and daily use.', Icon: GraduationCap },
  { n: '7', title: 'Support & Warranty',text: 'Remote and on-site support, firmware updates, and a full warranty to keep your system performing long-term.', Icon: ShieldCheck },
]

const brands = [
  { name: 'JBL', file: 'jbl.svg' },
  { name: 'QSC', file: 'qsc.svg' },
  { name: 'Yamaha', file: 'yamaha.svg' },
  { name: 'Shure', file: 'shure.svg' },
  { name: 'TOA', file: 'toa.svg' },
  { name: 'DBX', file: 'dbx.svg' },
  { name: 'RCF', file: 'rcf.svg' },
  { name: 'Atlas IED', file: 'atlasied.svg' },
  { name: 'Sennheiser', file: 'sennheiser.svg' },
]

const whyItems = [
  { title: 'Speech Clarity',    text: 'Optimized for khutba and recitation intelligibility, not just loudness.',                              Icon: Mic2 },
  { title: 'Full Coverage',     text: 'Even sound distribution reaching every corner without dead spots or reflections.',                     Icon: AudioWaveform },
  { title: 'Feedback Control',  text: 'DSP tuning and proper gain structure to eliminate microphone feedback.',                               Icon: SlidersHorizontal },
  { title: 'Zone Flexibility',  text: "Independent control for the main hall, women's section, lobby, and overflow.",                        Icon: Network },
  { title: 'Future-Ready',      text: 'Infrastructure built for livestreaming, recording, and system expansion.',                            Icon: TrendingUp },
  { title: 'Community Budget',  text: "Practical solutions sized to the masjid's real needs and available resources.",                       Icon: CircleDollarSign },
]

export default function MasjidSoundSolutionsPage() {
  return (
    <div className='masjid-clean-page'>
      <section className='clean-hero'>
        <img src='/masjid-prayer-wide-new.png' alt='Real masjid prayer hall during salat' className='clean-hero-image' />
        <div className='clean-hero-overlay' />
        <div className='container clean-hero-inner'>
          <div className='clean-hero-panel'>
            <img src='/az-masjid-audio-logo-clean.png' alt='AZ Masjid Audio' className='clean-masjid-logo' />
            <div className='real-eyebrow'>Professional masjid audio systems</div>
            <h1>Trusted solutions for sacred spaces.</h1>
            <p>
              We help masjids create an environment where every word is heard, every message is understood,
              and every worshipper feels connected.
            </p>
            <div className='real-actions'>
              <Link to='/contact' className='real-button real-button-gold'>Request Consultation</Link>
              <a href='https://wa.me/17248310196' className='real-button real-button-ghost'>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section id='specialized-design' className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Specialized design</div>
            <h2>Why masjid audio requires specialized design</h2>
            <p>
              Masjids are unique spaces with varying sizes, materials and layouts that present acoustic challenges.
              The system must deliver clear, natural and consistent sound throughout every corner.
            </p>
          </div>
          <div className='why-grid'>
            {whyItems.map((item) => (
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
            <div className='real-eyebrow'>Microphones for khutba & salat</div>
            <h2>The right microphone placement makes the voice natural and stable.</h2>
            <p>
              Khutba, salat, khatira and classes need microphone positions that respect the space while keeping
              speech clear for the main musalla, overflow rooms and recordings.
            </p>
            <ul className='real-check-list'>
              <li>Khutba microphone and imam voice pickup</li>
              <li>Wireless, lavalier, headset and handheld options</li>
              <li>Feedback control through gain structure and DSP tuning</li>
              <li>Reliable audio for daily use and special events</li>
            </ul>
          </div>
          <div className='clean-photo-card'>
            <img src='/masjid-khutba-mics-new.png' alt='Real masjid khutba and microphone setup' />
          </div>
        </div>
      </section>

      <section className='clean-section clean-white'>
        <div className='container split-layout-section'>
          <div className='clean-section-intro'>
            <div className='real-eyebrow'>Multi-zone audio layout</div>
            <h2>Independent control where you need it.</h2>
            <p>
              A masjid audio system should not behave like one large room. Main prayer halls, women's areas,
              common spaces and outdoor overflow zones need independent volume, routing and control.
            </p>
          </div>
          <div className='clean-poster-card zone-layout-card'>
            <img src='/masjid-multi-zone-layout.png' alt='Example multi-zone masjid audio layout and control' />
          </div>
        </div>
      </section>

      <section className='clean-section clean-soft'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>User control options</div>
            <h2>Control from anywhere — app or wall.</h2>
            <p>Imams and authorized staff can adjust zones, switch presets, and control volume from a mobile app or a dedicated wall controller near the mihrab.</p>
          </div>
          <div className='zone-control-grid'>

            <div className='zone-option-card'>
              <div className='zone-option-header'>
                <Smartphone size={20} strokeWidth={1.5} />
                <div>
                  <strong>Mobile App Control</strong>
                  <span>iOS / Android</span>
                </div>
              </div>
              <div className='phone-mockup'>
                <div className='phone-camera-dot' />
                <div className='phone-screen-header'>Zones</div>
                {[
                  { name: 'Zone 1 — Musalla', pct: 70 },
                  { name: 'Zone 2 — Support Area', pct: 20 },
                  { name: 'Zone 3 — Basement', pct: 0 },
                  { name: 'Zone 4 — Outdoor', pct: 70 },
                ].map(z => (
                  <div key={z.name} className='phone-zone-row'>
                    <span className='phone-zone-name'>{z.name}</span>
                    <div className='phone-zone-track'>
                      <div className='phone-zone-fill' style={{ width: `${z.pct}%` }} />
                    </div>
                    <span className='phone-zone-val'>{z.pct}%</span>
                  </div>
                ))}
                <div className='phone-nav'>
                  <span>HOME</span>
                  <span className='phone-nav-active'>ZONES</span>
                  <span>SOURCES</span>
                  <span>SETTINGS</span>
                </div>
              </div>
              <ul className='zone-option-features'>
                <li>Real-time per-zone volume and mute control</li>
                <li>Preset recall for salat, khutba, and events</li>
                <li>Works over local Wi-Fi — no internet needed</li>
                <li>Multiple authorized users supported</li>
              </ul>
            </div>

            <div className='zone-option-card'>
              <div className='zone-option-header'>
                <Sliders size={20} strokeWidth={1.5} />
                <div>
                  <strong>Wall Controller</strong>
                  <span>Installed near the mihrab</span>
                </div>
              </div>
              <div className='wall-mockup'>
                <div className='wall-zones-list'>
                  {[
                    { label: 'ZONE 1', active: true },
                    { label: 'ZONE 2', active: true },
                    { label: 'ZONE 3', active: true },
                    { label: 'ZONE 4', active: false },
                  ].map(z => (
                    <div key={z.label} className='wall-zone-row'>
                      <div className={`wall-zone-led${z.active ? ' wall-zone-led-on' : ''}`} />
                      <span>{z.label}</span>
                    </div>
                  ))}
                </div>
                <div className='wall-right-controls'>
                  <div className='wall-knob'><span>VOLUME</span></div>
                  <div className='wall-mute-btn'>MUTE</div>
                </div>
              </div>
              <ul className='zone-option-features'>
                <li>Physical volume knob — no phone required</li>
                <li>LED indicators show active zones at a glance</li>
                <li>One-touch mute for the entire system</li>
                <li>Simple enough for any staff member</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <section className='clean-section clean-soft'>
        <div className='container two-column rack-clean-section'>
          <div className='clean-photo-card rack-card'>
            <img src='/masjid-rack-room-new.png' alt='Professional masjid audio rack inside a dedicated equipment room' />
          </div>
          <div className='feature-copy'>
            <div className='real-eyebrow'>Rack & infrastructure</div>
            <h2>A dedicated equipment room keeps the system reliable.</h2>
            <p>
              The rack is the technical center of the masjid audio system: receivers, DSP, mixer,
              amplification, recording, power protection, network control and future expansion.
            </p>
            <ul className='real-check-list'>
              <li>Clean rack layout and ventilation</li>
              <li>Power protection and organized service access</li>
              <li>DSP, mixer, amplifier and recording equipment</li>
              <li>Prepared for future livestreaming and additional zones</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='clean-section clean-white'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Audio signal flow</div>
            <h2>From microphone to every speaker.</h2>
            <p>Every source is routed through the mixer, processed by the DSP, amplified, and delivered independently to each zone.</p>
          </div>
          <div className='signal-flow-diagram'>

            <div className='signal-sources'>
              <div className='signal-col-label'>SOURCES</div>
              <div className='signal-source-item'><Mic size={20} strokeWidth={1.5} /><span>Handheld Mic</span></div>
              <div className='signal-source-item'><Mic2 size={20} strokeWidth={1.5} /><span>Podium Mic</span></div>
              <div className='signal-source-item'><Smartphone size={20} strokeWidth={1.5} /><span>Mobile / Stream</span></div>
              <div className='signal-source-item'><Music size={20} strokeWidth={1.5} /><span>Media Player</span></div>
            </div>

            <div className='signal-arrow-col'><div className='signal-arrow' /></div>

            <div className='signal-node'>
              <div className='signal-node-icon'><SlidersHorizontal size={28} strokeWidth={1.5} /></div>
              <strong>MIXER</strong>
              <span>Integrated</span>
            </div>

            <div className='signal-arrow-col'><div className='signal-arrow' /></div>

            <div className='signal-node'>
              <div className='signal-node-icon'><AudioWaveform size={28} strokeWidth={1.5} /></div>
              <strong>DSP PROCESSING</strong>
              <span>EQ · Delay · Feedback<br />Crossover · Routing</span>
            </div>

            <div className='signal-arrow-col'><div className='signal-arrow' /></div>

            <div className='signal-node'>
              <div className='signal-node-icon'><Zap size={28} strokeWidth={1.5} /></div>
              <strong>4-CH AMPLIFIER</strong>
              <span>Independent power<br />for each zone</span>
            </div>

            <div className='signal-arrow-col'><div className='signal-arrow' /></div>

            <div className='signal-zones-output'>
              <div className='signal-col-label'>4 ZONES OUTPUT</div>
              {['Musalla', 'Support Areas', 'Basement', 'Outdoor'].map((name, i) => (
                <div key={name} className='signal-zone-output-item'>
                  <div className='signal-zone-badge'>{i + 1}</div>
                  <span>{name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className='clean-section clean-soft'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Professional process</div>
            <h2>A process built on clarity, precision, and trust.</h2>
            <p>Seven defined steps from consultation to long-term support — no surprises, no shortcuts.</p>
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
              <strong>Our Commitment</strong>
              <p>We are committed to delivering a professional, reliable, and future-ready audio system for your masjid. Our goal is to ensure the highest quality of sound, ease of use, and long-term satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='clean-section brands-clean-section'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>Partnering with industry leaders</div>
            <h2>Designed with trusted AV brands</h2>
            <p>Real products, real support, and serviceable systems built with proven AV ecosystems.</p>
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
            <div className='real-eyebrow'>Ready to improve clarity?</div>
            <h2>Request a masjid sound consultation.</h2>
            <p>
              We can assess your current system, review the layout, and recommend the right upgrade
              or new installation path for your masjid.
            </p>
          </div>
          <Link to='/contact' className='real-button real-button-gold'>Request Consultation</Link>
        </div>
      </section>
    </div>
  )
}
