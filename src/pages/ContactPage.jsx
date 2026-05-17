import SectionHeading from '../components/SectionHeading'
import QuoteForm from '../components/QuoteForm'

export default function ContactPage() {
  return (
    <section className='section page-top surface-muted'>
      <div className='container contact-grid'>
        <div>
          <SectionHeading
            eyebrow='Contact'
            title='Request a quote or schedule a sound check'
            text='Share a few details about your masjid and the current audio challenges. Your request is submitted directly to the website backend.'
          />
          <div className='contact-card'>
            <div className='contact-item'>
              <strong>Email</strong>
              <span>info@masjidsoundsolutions.com</span>
            </div>
            <div className='contact-item'>
              <strong>WhatsApp</strong>
              <span>+1 724 831 0196</span>
            </div>
            <div className='contact-item'>
              <strong>WhatsApp</strong>
              <span>+1 724 427 5661</span>
            </div>
            <div className='contact-item'>
              <strong>Region</strong>
              <span>USA and Canada</span>
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
