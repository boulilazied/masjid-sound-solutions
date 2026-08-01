import { Link } from 'react-router-dom'
import { Volume2, Building2, Home, Mic2, GraduationCap, BookOpen } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const aboutDivisions = [
  {
    title: 'Masjid Sound Solutions',
    path: '/masjid-sound-solutions',
    Icon: Volume2,
    text: 'Specialized audio design for prayer halls, khutba clarity, multi-zone coverage, and volunteer-friendly controls.'
  },
  {
    title: 'Commercial Audio Solutions',
    path: '/commercial-audio',
    Icon: Building2,
    text: 'Background music, paging, conference room, and multi-zone systems for offices, schools, and retail spaces.'
  },
  {
    title: 'Residential Audio Solutions',
    path: '/residential-audio',
    Icon: Home,
    text: 'In-ceiling speakers, media rooms, multi-room audio, and smart home integration with a clean, professional finish.'
  },
  {
    title: 'Event Rental Services',
    path: '/event-rental-services',
    Icon: Mic2,
    text: 'Portable PA systems, wireless microphones, and complete temporary audio support for events of all sizes.'
  }
]

const team = [
  {
    Icon: GraduationCap,
    tag: 'Lead Engineer',
    name: 'Signal Treatment Engineer',
    bio: 'Holds a Master\'s degree in signal processing. Responsible for DSP configuration, acoustic analysis, speaker placement design, and system tuning on every project. Engineering-backed decisions — not guesswork.'
  },
  {
    Icon: BookOpen,
    tag: 'Masjid Specialist',
    name: 'Practicing Imam',
    bio: 'A practicing imam who understands khutba, salat, and community events from the inside. Ensures every masjid system is designed for real daily use — not just technical specs.'
  },
]

export default function AboutPage() {
  return (
    <>
      <section className='section page-top'>
        <div className='container'>
          <SectionHeading
            as='h1'
            centered
            eyebrow='About AZ Audio Solutions'
            title='Professional audio for every space and every need'
            text='AZ Audio Solutions is a USA and Canada-based audio company organized into four specialized divisions. We started with a deep focus on masjid audio and expanded to serve commercial buildings, homes, and events under one trusted brand.'
          />
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Four Divisions'
            title='One company, four specialized services'
            text='Each division is built around a distinct space and customer type — so you get focused expertise, not a generic contractor.'
          />
          <div className='about-div-grid'>
            {aboutDivisions.map((d) => (
              <Link to={d.path} key={d.title} className='about-div-card'>
                <div className='about-div-icon'>
                  <d.Icon size={26} strokeWidth={1.5} />
                </div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <span className='about-div-card-cta'>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className='section'>
        <div className='container'>
          <SectionHeading
            centered
            eyebrow='Our Team'
            title="Two disciplines most AV companies don't have in-house"
            text='Engineering precision and deep masjid knowledge — both available on every project.'
          />
          <div className='hp-cred-grid'>
            {team.map((member) => (
              <div key={member.tag} className='hp-cred-card'>
                <div className='hp-cred-icon'>
                  <member.Icon size={28} strokeWidth={1.5} />
                </div>
                <div className='hp-cred-tag'>{member.tag}</div>
                <h3>{member.name}</h3>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container split-layout'>
          <div>
            <SectionHeading
              eyebrow='Our Approach'
              title='Technical, practical, and community-focused'
              text='We believe professional audio should be built to last, easy to use, and honest about what it delivers. Every recommendation starts with understanding the real problem in the space.'
            />
            <p className='lead-paragraph'>
              Our roots are in masjid audio — spaces where clarity is critical and the margin for
              distraction is zero. That discipline carries through everything we build.
            </p>
          </div>

          <div className='value-panel'>
            <div className='eyebrow'>Core Principles</div>
            <h3>How we work</h3>
            <ul className='check-list'>
              <li>Site assessment before recommending any equipment</li>
              <li>Speech intelligibility first, not just volume</li>
              <li>Budget-aligned solutions sized to real needs</li>
              <li>Clean installation, organized cabling, professional finish</li>
              <li>Simple controls that non-technical staff can use daily</li>
              <li>Ongoing support after installation is complete</li>
            </ul>
          </div>
        </div>
      </section>

      <section className='section cta-band'>
        <div className='container cta-inner'>
          <div>
            <div className='eyebrow eyebrow-light'>Let&apos;s work together</div>
            <h2>Tell us about your project</h2>
            <p>
              Whether it&apos;s a new installation, an upgrade, or a one-time event — we&apos;ll
              recommend a clear and practical path forward.
            </p>
          </div>
          <Link to='/contact' className='button button-primary button-light'>Request a Quote</Link>
        </div>
      </section>
    </>
  )
}
