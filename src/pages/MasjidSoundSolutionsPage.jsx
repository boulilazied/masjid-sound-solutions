import { Link } from 'react-router-dom'
import {
  Mic2, AudioWaveform, SlidersHorizontal, Network, TrendingUp, CircleDollarSign,
  PhoneCall, PenLine, ClipboardList, HardHat, Gauge, GraduationCap, ShieldCheck, BadgeCheck,
  Smartphone, Mic, Music, Zap, Sliders, Globe, Video, Archive, Radio,
  Volume2, Wifi, Power, Camera
} from 'lucide-react'

const keyBenefits = [
  { Icon: Volume2,     title: 'Clear & Intelligible Sound',   text: 'Optimal for Khutba, Adhan, Quran & Daily Salah' },
  { Icon: Smartphone,  title: 'Easy Control',                 text: 'Mobile App & Wall Controller for simple daily operation' },
  { Icon: Network,     title: 'Independent Zone Management',  text: 'Adjust volume or mute any zone independently' },
  { Icon: ShieldCheck, title: 'Reliable & Safe',              text: 'Professional 70V system with surge protection' },
  { Icon: TrendingUp,  title: 'Future Scalable',              text: 'Easy to expand with additional zones or speakers' },
  { Icon: BadgeCheck,  title: 'Professional Quality',         text: 'Designed for long-term durability and performance' },
]

const rackComponents = [
  { n: 1, Icon: Wifi,              title: 'Wireless Microphone System',     desc: 'Imam & Lectern Mic' },
  { n: 2, Icon: SlidersHorizontal, title: 'Digital Mixer (Integrated)',     desc: 'Audio Mixing & Source Control' },
  { n: 3, Icon: AudioWaveform,     title: 'Integrated DSP Processor',       desc: 'EQ, Feedback Suppression, Delay, Crossover, Routing' },
  { n: 4, Icon: Zap,               title: 'Multi-Zone 70V Power Amplifier', desc: 'Independent amplification — zones sized to your layout' },
  { n: 5, Icon: Power,             title: 'Power Conditioner',              desc: 'Surge Protection & Power Management' },
]

const audioInputs = [
  { Icon: Mic,        label: 'Wireless Mic (Imam)' },
  { Icon: Mic2,       label: 'Lectern Mic' },
  { Icon: Music,      label: 'Media / Quran Player' },
  { Icon: Smartphone, label: 'AUX / Mobile Input' },
]

const processSteps = [
  { n: '1', title: 'Consultation',      text: 'Site visit or remote call to assess your layout, acoustics, congregation size, and existing equipment.', Icon: PhoneCall },
  { n: '2', title: 'System Design',     text: 'Custom speaker placement, zone routing, and equipment selection engineered for your specific building.', Icon: PenLine },
  { n: '3', title: 'Proposal',          text: 'Clear, itemized scope of work with equipment list, timeline, and transparent pricing. No vague estimates.', Icon: ClipboardList },
  { n: '4', title: 'Installation',      text: 'Professional installation with minimal disruption to daily prayers. Clean cable runs and organized rack build.', Icon: HardHat },
  { n: '5', title: 'Testing & Tuning',  text: 'On-site DSP tuning, zone coverage verification, and a full staff walkthrough before we hand over the system.', Icon: Gauge },
  { n: '6', title: 'Training',          text: 'Hands-on session with the imam and authorized staff on system operation, zone control, and daily use.', Icon: GraduationCap },
  { n: '7', title: 'Support & Warranty',text: 'Remote and on-site support, firmware updates, and full manufacturer warranty coverage on every component we supply.', Icon: ShieldCheck },
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
        <img src='/masjid-prayer-wide-new.png' alt='Masjid prayer hall with professional audio installation' className='clean-hero-image' />
        <div className='clean-hero-overlay' />
        <div className='container clean-hero-inner'>
          <div className='clean-hero-panel'>
            <img src='/az-masjid-audio-logo-clean.png' alt='AZ Masjid Audio' className='clean-masjid-logo' />
            <div className='real-eyebrow'>Professional masjid audio systems</div>
            <h1>Masjid sound systems built for sacred spaces.</h1>
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

      <section className='masjid-benefits-strip'>
        <div className='container'>
          <div className='masjid-benefits-inner'>
            <div className='masjid-benefits-tag'>
              <span>KEY BENEFITS</span>
            </div>
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
            <img src='/masjid-khutba-mics-new.png' alt='Masjid khutba microphone and podium setup' loading='lazy' />
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
            <img src='/masjid-multi-zone-layout.png' alt='Multi-zone masjid audio layout diagram showing independent zone coverage' loading='lazy' />
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
            <img src='/masjid-rack-room-new.png' alt='Professional audio equipment rack inside a dedicated masjid AV room' loading='lazy' />
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

      <section className='clean-section clean-soft'>
        <div className='container'>
          <div className='clean-section-intro centered'>
            <div className='real-eyebrow'>System architecture overview</div>
            <h2>A centralized system manages all audio processing, mixing, and amplification.</h2>
            <p>All components mount in a standard 19&quot; rack cabinet. Zones are configured to your masjid layout — not limited to four.</p>
          </div>
          <div className='sys-arch-grid'>

            <div className='sys-arch-components'>
              {rackComponents.map((c) => (
                <div key={c.title} className='sys-arch-component'>
                  <div className='sys-arch-badge'>{c.n}</div>
                  <div className='sys-arch-comp-icon'><c.Icon size={18} strokeWidth={1.5} /></div>
                  <div>
                    <strong>{c.title}</strong>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='sys-rack-visual'>
              <div className='sys-rack-frame'>
                <div className='sys-rack-unit sys-rack-unit-sm'>
                  <div className='sys-rack-unit-label'>
                    <Wifi size={10} strokeWidth={1.5} /><span>WIRELESS MICROPHONE RECEIVER</span>
                  </div>
                  <div className='sys-rack-channel-display'>CH 12</div>
                </div>
                <div className='sys-rack-unit sys-rack-unit-md'>
                  <div className='sys-rack-unit-label'>
                    <SlidersHorizontal size={10} strokeWidth={1.5} /><span>DIGITAL MIXER / SOURCE SELECT</span>
                  </div>
                  <div className='sys-rack-faders'>
                    {[60, 80, 55, 75, 65].map((h, i) => (
                      <div key={i} className='sys-rack-fader' style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className='sys-rack-unit sys-rack-unit-sm'>
                  <div className='sys-rack-unit-label'>
                    <AudioWaveform size={10} strokeWidth={1.5} /><span>DSP PROCESSOR</span>
                  </div>
                  <div className='sys-rack-eq-bars'>
                    {[40, 65, 80, 55, 75, 50, 70, 45].map((h, i) => (
                      <div key={i} className='sys-rack-eq-bar' style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className='sys-rack-unit sys-rack-unit-lg sys-rack-amp'>
                  <div className='sys-rack-unit-label'>
                    <Zap size={10} strokeWidth={1.5} /><span>MULTI-ZONE 70V POWER AMPLIFIER</span>
                  </div>
                  <div className='sys-rack-amp-zones'>
                    <div className='sys-rack-amp-zone'>ZONE 1</div>
                    <div className='sys-rack-amp-zone'>ZONE 2</div>
                    <div className='sys-rack-amp-zone'>ZONE 3</div>
                    <div className='sys-rack-amp-zone sys-rack-amp-zone-more'>+ MORE</div>
                  </div>
                  <p className='sys-rack-amp-note'>Zones configured to your layout</p>
                </div>
                <div className='sys-rack-unit sys-rack-unit-sm'>
                  <div className='sys-rack-unit-label'>
                    <Power size={10} strokeWidth={1.5} /><span>POWER CONDITIONER</span>
                  </div>
                  <div className='sys-rack-outlets'>
                    {[1,2,3,4].map(i => <div key={i} className='sys-rack-outlet' />)}
                  </div>
                </div>
              </div>
              <p className='sys-rack-caption'>19&quot; Rack Cabinet (12U)</p>
            </div>

            <div className='sys-arch-inputs'>
              <div className='sys-inputs-header'>AUDIO INPUTS</div>
              {audioInputs.map((inp) => (
                <div key={inp.label} className='sys-input-row'>
                  <div className='sys-input-icon'><inp.Icon size={20} strokeWidth={1.5} /></div>
                  <div className='sys-input-arrow' />
                  <span>{inp.label}</span>
                </div>
              ))}
            </div>

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
              <strong>MULTI-ZONE AMPLIFIER</strong>
              <span>Independent power<br />for each zone</span>
            </div>

            <div className='signal-arrow-col'><div className='signal-arrow' /></div>

            {/* Zone count is never fixed at four — the example below is illustrative
                and must stay consistent with the System Architecture section. */}
            <div className='signal-zones-output'>
              <div className='signal-col-label'>ZONE OUTPUTS</div>
              {['Musalla', 'Support Areas', 'Basement', 'Outdoor'].map((name, i) => (
                <div key={name} className='signal-zone-output-item'>
                  <div className='signal-zone-badge'>{i + 1}</div>
                  <span>{name}</span>
                </div>
              ))}
              <p className='signal-zone-note'>Example layout — zones scale to your masjid</p>
            </div>

          </div>
        </div>
      </section>

      <section className='clean-section clean-soft'>
        <div className='container two-column feature-photo-section'>
          <div className='feature-copy'>
            <div className='real-eyebrow'>Livestreaming &amp; recording</div>
            <h2>Reach your community beyond the prayer hall — with audio and video.</h2>
            <p>
              Your masjid audio system feeds a clean, balanced signal directly to a stream encoder.
              Pair it with a professional motorized camera and your community gets a complete broadcast —
              no second microphone setup, no degraded quality, no separate video crew.
            </p>
            <ul className='real-check-list'>
              <li>Motorized camera covers the imam, mimbar, and prayer hall from a single mount point</li>
              <li>Remote pan, tilt, and zoom — no operator needed during salat</li>
              <li>Stream to YouTube, Facebook Live, or any RTMP platform</li>
              <li>Dedicated audio stream output — independent of room speaker levels</li>
              <li>Local recording for khutba archives and lesson libraries</li>
              <li>Remote community members see and hear the same quality as those present</li>
            </ul>
          </div>
          <div className='clean-photo-card stream-mockup-card'>
            <div className='stream-live-badge'>
              <span className='stream-live-dot' />
              <span>LIVE</span>
            </div>
            <div className='stream-camera-preview'>
              <div className='stream-camera-photo-wrap'>
                <img src='/ptz-camera.png' alt='PTZ motorized camera for masjid livestreaming and recording' className='stream-camera-img' loading='lazy' />
              </div>
              <div className='stream-camera-caption'>
                <strong>Directly connected to your sound system</strong>
                <span className='stream-camera-badge'>1080p HD</span>
              </div>
            </div>
            <div className='stream-output-list'>
              {[
                { Icon: Camera,  label: 'Camera Feed',     active: true  },
                { Icon: Globe,   label: 'YouTube Live',    active: true  },
                { Icon: Globe,   label: 'Facebook Live',   active: true  },
                { Icon: Video,   label: 'Local Recording', active: true  },
                { Icon: Archive, label: 'Khutba Archive',  active: false },
              ].map(({ Icon, label, active }) => (
                <div key={label} className='stream-output-row'>
                  <Icon size={14} strokeWidth={1.5} />
                  <span>{label}</span>
                  <span className={active ? 'stream-status-on' : 'stream-status-off'}>
                    {active ? 'Active' : 'Standby'}
                  </span>
                </div>
              ))}
            </div>
            <div className='stream-audio-wrap'>
              <div className='stream-audio-label'>
                <Radio size={13} strokeWidth={1.5} />
                <span>Audio Output Level</span>
              </div>
              <div className='stream-audio-bars'>
                {[55, 75, 88, 70, 92, 68, 80, 60, 85, 72].map((h, i) => (
                  <div key={i} className='stream-audio-bar' style={{ height: `${h}%` }} />
                ))}
              </div>
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
            <div className='real-eyebrow'>Equipment we build with</div>
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
