import { Link } from 'react-router-dom'

const brands = [
  ['JBL', '/brand-jbl.svg'],
  ['QSC', '/brand-qsc.svg'],
  ['Yamaha', '/brand-yamaha.svg'],
  ['Shure', '/brand-shure.svg'],
  ['Sennheiser', '/brand-sennheiser.svg'],
  ['RCF', '/brand-rcf.svg'],
  ['AtlasIED', '/brand-atlasied.svg'],
  ['dbx', '/brand-dbx.svg']
]

export default function MasjidSoundSolutionsPage() {
  return (
    <main className='masjid-real-page masjid-clean-page'>
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
          <div className='clean-poster-card wide-poster'>
            <img src='/masjid-why-specialized.png' alt='Why masjid audio requires specialized design: speech clarity, coverage, feedback control, zoning, future-ready and affordability' />
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
              A masjid audio system should not behave like one large room. Main prayer halls, women’s areas,
              common spaces and outdoor overflow zones need independent volume, routing and control.
            </p>
          </div>
          <div className='clean-poster-card zone-layout-card'>
            <img src='/masjid-multi-zone-layout.png' alt='Example multi-zone masjid audio layout and control' />
          </div>
        </div>
      </section>

      <section className='clean-section clean-dark control-section'>
        <div className='container two-column'>
          <div className='feature-copy light-copy'>
            <div className='real-eyebrow'>Advanced DSP & zone control</div>
            <h2>Simple control for imams and authorized staff.</h2>
            <p>
              Authorized users can adjust each zone, mute areas, and recall presets for salat, khutba,
              classes and events from a mobile or tablet interface.
            </p>
            <div className='control-pills'>
              <span>Main Prayer Hall</span>
              <span>Women’s Area</span>
              <span>Lobby</span>
              <span>Outdoor</span>
              <span>USB Recording</span>
            </div>
          </div>
          <div className='clean-photo-card no-shadow'>
            <img src='/masjid-zone-control-new.png' alt='Masjid audio zone control mobile app with DSP interface' />
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
            <div className='real-eyebrow'>Professional process</div>
            <h2>Professional. Transparent. Reliable.</h2>
          </div>
          <div className='clean-poster-card wide-poster'>
            <img src='/masjid-process.png' alt='Masjid audio process: consultation, design, proposal, installation, testing and tuning, support' />
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
          <div className='clean-poster-card brands-poster-card'>
            <img src='/masjid-brands-real.png' alt='Trusted AV brand logos including Bose, JBL, QSC, Yamaha, TOA, Audac, Turbosound and Rockville' />
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
    </main>
  )
}
