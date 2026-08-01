import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

export default function DivisionPage({ eyebrow, title, text, divisions }) {
  return (
    <section className='section page-top'>
      <div className='container'>
        <SectionHeading as='h1' eyebrow={eyebrow} title={title} text={text} />

        <div className='division-page-grid'>
          {divisions.map((division) => (
            <article className='division-detail-card' key={division.title}>
              {division.Icon ? (
                <div className='division-detail-icon-box'>
                  <division.Icon size={28} strokeWidth={1.5} />
                </div>
              ) : (
                <img src={division.logo} alt={`${division.title} logo`} className='division-detail-logo' />
              )}
              <div>
                <h2>{division.title}</h2>
                <p>{division.subtitle}</p>
                <ul className='check-list'>
                  {division.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className='division-detail-actions'>
                  <Link to={division.path} className='button button-primary'>
                    Explore {division.title}
                  </Link>
                  <Link to='/contact' className='button button-secondary'>
                    Request a Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
