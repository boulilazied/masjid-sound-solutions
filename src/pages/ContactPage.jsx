import { useSearchParams } from 'react-router-dom'
import { validHomePackage } from '../../shared/home-inquiry.js'
import SectionHeading from '../components/SectionHeading'
import QuoteForm from '../components/QuoteForm'

export default function ContactPage() {
  const [params] = useSearchParams()
  const isHome = params.get('service') === 'connected-home' || Boolean(validHomePackage(params.get('package')))
  return (
    <section className='section page-top surface-muted'>
      <div className='container contact-grid'>
        <div>
          <SectionHeading
            as='h1'
            eyebrow='Contact'
            title={isHome ? 'Request your free home consultation' : 'Request a quote or schedule a consultation'}
            text={isHome ? 'Tell us about your home. Our Pittsburgh-based team will confirm installation availability for your address, review your selected package and discuss the next step.' : 'Share a few details about your project — masjid, commercial space, home, or event. Your request goes directly to our team.'}
          />
          <div className='contact-card'>
            <div className='contact-item'>
              <strong>Email</strong>
              <a href='mailto:contact@azaudios.com' style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@azaudios.com</a>
            </div>
            <div className='contact-item'>
              <strong>WhatsApp</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                <a
                  href='https://wa.me/17243211106'
                  target='_blank'
                  rel='noreferrer'
                  className='button button-secondary'
                  style={{ fontSize: '0.88rem', padding: '0.55rem 0.9rem' }}
                >
                  +1 724 321 1106
                </a>
                <a
                  href='https://wa.me/17244275661'
                  target='_blank'
                  rel='noreferrer'
                  className='button button-secondary'
                  style={{ fontSize: '0.88rem', padding: '0.55rem 0.9rem' }}
                >
                  +1 724 427 5661
                </a>
              </div>
            </div>
            <div className='contact-item'>
              <strong>Region</strong>
              <span>Based in Pittsburgh, PA — serving Pennsylvania, Ohio, West Virginia, Michigan, and projects across the USA and Canada.</span>
            </div>
          </div>
        </div>

        <div className='form-panel'>
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
