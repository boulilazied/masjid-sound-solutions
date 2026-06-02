import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const ICON_MASJID = 'M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
const ICON_COMMERCIAL = 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
const ICON_RESIDENTIAL = 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
const ICON_EVENT = 'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'

const aboutDivisions = [
  {
    title: 'Masjid Sound Solutions',
    path: '/masjid-sound-solutions',
    iconPath: ICON_MASJID,
    text: 'Specialized audio design for prayer halls, khutba clarity, multi-zone coverage, and volunteer-friendly controls.'
  },
  {
    title: 'Commercial Audio',
    path: '/commercial-audio',
    iconPath: ICON_COMMERCIAL,
    text: 'Background music, paging, conference room, and multi-zone systems for offices, schools, and retail spaces.'
  },
  {
    title: 'Residential Audio',
    path: '/residential-audio',
    iconPath: ICON_RESIDENTIAL,
    text: 'In-ceiling speakers, media rooms, multi-room audio, and smart home integration with a clean, professional finish.'
  },
  {
    title: 'Event Rental Services',
    path: '/event-rental-services',
    iconPath: ICON_EVENT,
    text: 'Portable PA systems, wireless microphones, and complete temporary audio support for events of all sizes.'
  }
]

function DivisionIcon({ path }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' d={path} />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <>
      <section className='section page-top'>
        <div className='container'>
          <SectionHeading
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
                  <DivisionIcon path={d.iconPath} />
                </div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className='section'>
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
              Whether it's a new installation, an upgrade, or a one-time event — we'll
              recommend a clear and practical path forward.
            </p>
          </div>
          <Link to='/contact' className='button button-primary button-light'>Request a Quote</Link>
        </div>
      </section>
    </>
  )
}
