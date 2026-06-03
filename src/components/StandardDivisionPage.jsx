import { Link } from 'react-router-dom'

export default function StandardDivisionPage({ eyebrow, title, text, Icon, services, whyUs }) {
  return (
    <div>
      <section className='std-hero'>
        <div className='container std-hero-inner'>
          {Icon && (
            <div className='std-hero-icon'>
              <Icon size={36} strokeWidth={1.5} />
            </div>
          )}
          <div className='eyebrow eyebrow-light'>{eyebrow}</div>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className='hero-actions'>
            <Link to='/contact' className='button button-primary'>Request a Quote</Link>
            <a href='https://wa.me/17248310196' className='button button-ghost-light' target='_blank' rel='noreferrer'>WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section className='section surface-muted'>
        <div className='container'>
          <div className='std-features-grid'>
            {services.map((svc) => (
              <div key={svc.title} className='std-feature-card'>
                <h3>{svc.title}</h3>
                <p>{svc.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {whyUs && (
        <section className='section'>
          <div className='container split-layout'>
            <div>
              <div className='eyebrow'>Why AZ Audio</div>
              <h2 className='section-heading' style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0.35rem 0 0.8rem' }}>Professional audio with practical execution</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                From first consultation to post-install support, we deliver clear, reliable systems that are easy to use every day.
              </p>
            </div>
            <div className='value-panel' style={{ padding: '2rem' }}>
              <ul className='check-list'>
                {whyUs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to='/contact' className='button button-secondary' style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                Start Your Project
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className='section cta-band'>
        <div className='container cta-inner'>
          <div>
            <div className='eyebrow eyebrow-light'>Ready to get started?</div>
            <h2>Request a free consultation</h2>
            <p>Tell us about your space and needs. We'll recommend a clear, practical audio solution.</p>
          </div>
          <Link to='/contact' className='button button-primary button-light'>Request a Quote</Link>
        </div>
      </section>
    </div>
  )
}
