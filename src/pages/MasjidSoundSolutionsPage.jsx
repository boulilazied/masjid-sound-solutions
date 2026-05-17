import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const services = [
  {
    title: 'Prayer Hall Audio',
    text: 'Balanced speaker coverage, cleaner wiring, and reliable amplification for khutba, announcements, and daily prayers.'
  },
  {
    title: 'Wireless Microphones',
    text: 'Handheld, lapel, and podium microphone solutions with cleaner speech pickup and reduced feedback.'
  },
  {
    title: 'Acoustic Optimization',
    text: 'Echo reduction recommendations, DSP tuning, and speech intelligibility improvement for challenging spaces.'
  },
  {
    title: 'Streaming & Overflow',
    text: 'Audio routing for livestreams, recording, classrooms, women’s sections, and overflow prayer areas.'
  }
]

const serviceBlocks = [
  {
    title: 'Prayer Hall Sound Systems',
    points: [
      'Speaker selection and placement',
      'Amplifier and mixer configuration',
      'Balanced front, center, and rear coverage',
      'Cleaner sound for khutba and announcements'
    ]
  },
  {
    title: 'Microphones and Voice Pickup',
    points: [
      'Wireless handheld and lapel microphones',
      'Podium and desk microphone options',
      'Feedback control and clearer vocal gain',
      'Setup for imam, guest speakers, and events'
    ]
  },
  {
    title: 'DSP Tuning and Acoustic Improvement',
    points: [
      'EQ tuning and speech optimization',
      'Delay settings for larger halls',
      'Feedback suppression and gain staging',
      'Recommendations for acoustic treatment'
    ]
  },
  {
    title: 'Streaming, Recording, and Overflow Zones',
    points: [
      'Audio feed for livestream and recording',
      'Women’s section and overflow room audio',
      'Classroom and community room distribution',
      'Simple controls for volunteers and staff'
    ]
  }
]

const steps = [
  'Free on-site assessment',
  'System design and clear proposal',
  'Professional installation and cable management',
  'Final tuning, training, and follow-up support'
]

const highlights = [
  'Designed specifically for masjid environments',
  'Clearer khutba and Qur’an recitation',
  'Flexible packages for different budgets',
  'Support for upgrades, repairs, and maintenance'
]

const packages = [
  {
    name: 'Starter',
    price: '$2,500 – $4,000',
    bestFor: 'Small prayer rooms and focused upgrades',
    features: [
      'Basic speaker coverage improvement',
      'Mixer and microphone refresh',
      'Initial tuning and feedback reduction',
      'Volunteer handoff and quick training'
    ]
  },
  {
    name: 'Standard',
    price: '$6,000 – $12,000',
    bestFor: 'Medium-size masjids needing full coverage',
    features: [
      'Distributed speakers and balanced hall coverage',
      'Wireless microphone setup',
      'DSP tuning and speech optimization',
      'Improved clarity for khutba and classes'
    ]
  },
  {
    name: 'Premium',
    price: '$15,000+',
    bestFor: 'Large prayer halls and multi-zone environments',
    features: [
      'Full multi-zone audio design',
      'Streaming, recording, and overflow routing',
      'Advanced DSP and delay tuning',
      'Acoustic recommendations and long-term support'
    ]
  }
]

export default function MasjidSoundSolutionsPage() {
  return (
    <>
      <section className='hero'>
        <div className='container hero-grid'>
          <div className='hero-copy'>
            <div className='eyebrow'>AZ Audio Division</div>
            <h1>Professional sound systems built for masjids</h1>
            <p className='hero-text'>
              We design, install, and optimize audio systems that improve clarity, reduce echo,
              and support a better prayer experience for the entire congregation.
            </p>

            <div className='hero-actions'>
              <Link to='/contact' className='button button-primary'>
                Get a Free Sound Check
              </Link>
              <a href='#masjid-packages' className='button button-secondary'>
                View Packages
              </a>
            </div>

            <div className='hero-metrics'>
              <div className='metric-card'>
                <strong>USA & Canada</strong>
                <span>Service coverage</span>
              </div>
              <div className='metric-card'>
                <strong>Clearer Speech</strong>
                <span>Better intelligibility</span>
              </div>
              <div className='metric-card'>
                <strong>Reliable Audio</strong>
                <span>Friday prayer confidence</span>
              </div>
            </div>
          </div>

          <div className='hero-visual-wrap'>
            <div className='hero-visual-card'>
              <img
                src='/logo-masjid-division.png'
                alt='Masjid AZ Audio Division'
                className='hero-logo'
              />
              <div className='visual-kicker'>Free on-site audio assessment</div>
              <h3>Identify weak zones, echo, feedback, and coverage gaps</h3>
              <p>
                Start with a practical evaluation of your current setup and receive a clear
                recommendation for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Masjid Services'
            title='Designed for clarity, comfort, and reliability'
            text='A good masjid sound system is not only about volume. It is about speech intelligibility, balanced coverage, and dependable weekly performance.'
          />

          <div className='card-grid four-up'>
            {services.map((service) => (
              <article className='info-card' key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='section'>
        <div className='container'>
          <SectionHeading
            eyebrow='Complete Masjid Audio Solutions'
            title='From small upgrades to full audio redesigns'
            text='We focus on clarity, reliability, respectful installation, and simple daily operation for volunteers and staff.'
          />

          <div className='card-grid two-up'>
            {serviceBlocks.map((block) => (
              <article className='detail-card' key={block.title}>
                <h3>{block.title}</h3>
                <ul className='check-list'>
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container split-layout'>
          <div>
            <SectionHeading
              eyebrow='How It Works'
              title='A simple process with professional results'
              text='We keep the process clear from the first call to final system tuning.'
            />
            <div className='step-list'>
              {steps.map((step, index) => (
                <div className='step-card' key={step}>
                  <div className='step-number'>{index + 1}</div>
                  <div>{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='value-panel'>
            <div className='eyebrow'>Why Choose Us</div>
            <h3>We understand masjid spaces and sound challenges</h3>
            <p>
              Prayer halls often include hard surfaces, large volumes, domes, and reflective walls.
              We design around those realities to improve clarity without harsh sound.
            </p>
            <ul className='check-list'>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className='section' id='masjid-packages'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Masjid Packages'
            title='Flexible options for different masjid sizes'
            text='These are example ranges. Final pricing depends on hall size, existing equipment, wiring conditions, and project goals.'
          />

          <div className='pricing-grid'>
            {packages.map((item) => (
              <article className='price-card' key={item.name}>
                <div className='eyebrow'>{item.name}</div>
                <h3>{item.price}</h3>
                <p className='price-best-for'>{item.bestFor}</p>
                <ul className='check-list'>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to='/contact' className='button button-primary'>
                  Request Pricing
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container about-grid'>
          <div>
            <SectionHeading
              eyebrow='About This Division'
              title='A focused service built around masjid audio needs'
              text='Many masjid sound problems come from general-purpose installations that were never tuned for speech clarity. Our work is centered on that exact challenge.'
            />
            <p className='lead-paragraph'>
              We help masjids improve khutba delivery, recitation clarity, and overall listening
              comfort through practical system design, careful equipment selection, clean
              installation, and final tuning.
            </p>
            <p className='lead-paragraph'>
              Whether a masjid needs a small upgrade or a full redesign, the goal remains the same:
              reliable, respectful, and easy-to-use audio that supports worship and community events.
            </p>
          </div>

          <div className='value-panel'>
            <div className='eyebrow'>Our Approach</div>
            <h3>Technical, practical, and respectful</h3>
            <ul className='check-list'>
              <li>Assess the current setup before recommending replacement</li>
              <li>Focus on speech intelligibility, not only loudness</li>
              <li>Recommend solutions aligned to budget and hall size</li>
              <li>Keep controls simple for everyday volunteers and staff</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='section cta-band'>
        <div className='container cta-inner'>
          <div>
            <div className='eyebrow eyebrow-light'>Ready to improve your masjid sound?</div>
            <h2>Book a consultation and get a practical recommendation</h2>
            <p>
              We can assess your current setup and suggest a clear path for better khutba and
              prayer audio.
            </p>
          </div>
          <Link to='/contact' className='button button-primary button-light'>
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  )
}
