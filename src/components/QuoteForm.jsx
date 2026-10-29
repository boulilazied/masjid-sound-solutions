import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HOME_SERVICE, HOME_PACKAGES, validHomePackage } from '../../shared/home-inquiry.js'

const initialState = {
  name: '',
  masjid: '',
  email: '',
  phone: '',
  city: '',
  needs: '',
  homePackage: '',
  message: ''
}

export default function QuoteForm() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const selectedPackage = validHomePackage(params.get('package'))
  const homeContext = params.get('service') === 'connected-home' || Boolean(selectedPackage)
  const [form, setForm] = useState(() => ({ ...initialState, needs: homeContext ? HOME_SERVICE : '', homePackage: selectedPackage }))
  const isHome = form.needs === HOME_SERVICE
  useEffect(() => {
    setForm(current => ({ ...current, needs: homeContext ? HOME_SERVICE : '', homePackage: selectedPackage }))
  }, [search])
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value, ...(name === 'needs' && value !== HOME_SERVICE ? { homePackage: '' } : {}) }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      let data
      try {
        data = await response.json()
      } catch {
        throw new Error('Server did not respond. Please try WhatsApp or email us directly.')
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus({
        type: 'success',
        message: 'Your request has been sent. We will review your project and get back to you — check your inbox or WhatsApp for our response.'
      })
      setForm({ ...initialState, needs: form.needs, homePackage: form.homePackage })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your request right now.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='quote-form' onSubmit={handleSubmit}>
      {isHome && <div className='home-inquiry-summary'><strong>Home Security &amp; Smart Living</strong><p>{HOME_PACKAGES[form.homePackage] || 'Not sure which package? We can help you choose.'}</p><p>This is a consultation request. We will discuss your address, requirements and scheduling with you; an appointment is not booked by submitting this form.</p></div>}
      <div className='form-grid'>
        <label>
          <span>Name</span>
          <input name='name' value={form.name} onChange={handleChange} placeholder='Your name' required />
        </label>

        <label>
          <span>{isHome ? 'Organization (optional)' : 'Organization / Masjid (optional)'}</span>
          <input
            name='masjid'
            value={form.masjid}
            onChange={handleChange}
            placeholder={isHome ? 'Leave blank for a personal home project' : 'Organization or masjid name'}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            name='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            placeholder='name@example.com'
            required
          />
        </label>

        <label>
          <span>Phone</span>
          <input
            name='phone'
            value={form.phone}
            onChange={handleChange}
            placeholder='+1 (___) ___-____'
          />
        </label>

        <label>
          <span>City / State or Province</span>
          <input
            name='city'
            value={form.city}
            onChange={handleChange}
            placeholder='Pittsburgh, PA'
          />
        </label>

        <label>
          <span>Project Type</span>
          <select name='needs' value={form.needs} onChange={handleChange}>
            <option value=''>Select one</option>
            <option value='New installation'>New installation</option>
            <option value='Upgrade existing system'>Upgrade existing system</option>
            <option value='Masjid audio design'>Masjid audio design</option>
            <option value='Commercial audio system'>Commercial audio system</option>
            <option value='Home security & smart living'>Home security &amp; smart living</option>
            <option value='Event audio rental'>Event audio rental</option>
            <option value='Streaming / recording setup'>Streaming / recording setup</option>
            <option value='Troubleshooting / support'>Troubleshooting / support</option>
          </select>
        </label>
        {isHome && <label><span>Home package</span><select name='homePackage' value={form.homePackage} onChange={handleChange}><option value=''>Not sure / custom scope</option>{Object.entries(HOME_PACKAGES).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label>}
      </div>

      <label>
        <span>Project Details</span>
        <textarea
          name='message'
          value={form.message}
          onChange={handleChange}
          rows='6'
          placeholder={isHome ? 'Tell us what you want to protect or automate, any existing equipment, and whether this is a new installation or upgrade. Do not include alarm codes or passwords.' : 'Tell us about your space, current issues, and what you would like to improve.'}
          required
        />
      </label>

      <p className='form-privacy'>We use your details to respond to your inquiry and discuss your project. Please do not send passwords or alarm codes. <Link to='/privacy' target='_blank' rel='noreferrer'>Read our privacy notice (opens in a new tab)</Link>.</p>
      <div className='form-actions'>
        <button className='button button-primary' type='submit' disabled={loading}>
          {loading ? 'Sending...' : 'Send Quote Request'}
        </button>

        {status.message ? (
          <div role='status' aria-live='polite' className={status.type === 'success' ? 'status-message success' : 'status-message error'}>
            {status.message}
          </div>
        ) : null}

        <div className='whatsapp-links'>
          <a
            className='button button-secondary'
            href='https://wa.me/17243211106'
            target='_blank'
            rel='noreferrer'
          >
            WhatsApp +1 724 321 1106
          </a>
          <a
            className='button button-secondary'
            href='https://wa.me/17244275661'
            target='_blank'
            rel='noreferrer'
          >
            WhatsApp +1 724 427 5661
          </a>
        </div>
      </div>
    </form>
  )
}
