import SectionHeading from '../components/SectionHeading'

export default function AboutPage() {
  return (
    <section className='section page-top'>
      <div className='container about-grid'>
        <div>
          <SectionHeading
            eyebrow='About'
            title='A focused service built around masjid audio needs'
            text='Many masjid sound problems come from general-purpose installations that were never tuned for speech clarity. Our work is centered on that exact challenge.'
          />
          <p className='lead-paragraph'>
            We help masjids improve khutbah delivery, recitation clarity, and overall listening
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
  )
}
