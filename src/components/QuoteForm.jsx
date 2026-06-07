import { useState } from 'react'

const initialState = {
  name: '',
  masjid: '',
  email: '',
  phone: '',
  city: '',
  needs: '',
  message: ''
}

export default function QuoteForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
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
        message: 'Your request has been sent. We will review your project and reply within 1 business day — check your inbox or WhatsApp for our response.'
      })
      setForm(initialState)
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
      <div className='form-grid'>
        <label>
          <span>Name</span>
          <input name='name' value={form.name} onChange={handleChange} placeholder='Your name' required />
        </label>

        <label>
          <span>Organization / Masjid</span>
          <input
            name='masjid'
            value={form.masjid}
            onChange={handleChange}
            placeholder='Organization or masjid name'
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
          <span>City / State</span>
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
            <option value='Residential / home audio'>Residential / home audio</option>
            <option value='Event audio rental'>Event audio rental</option>
            <option value='Streaming / recording setup'>Streaming / recording setup</option>
            <option value='Troubleshooting / support'>Troubleshooting / support</option>
          </select>
        </label>
      </div>

      <label>
        <span>Project Details</span>
        <textarea
          name='message'
          value={form.message}
          onChange={handleChange}
          rows='6'
          placeholder='Tell us about your space, current issues, and what you would like to improve.'
          required
        />
      </label>

      <div className='form-actions'>
        <button className='button button-primary' type='submit' disabled={loading}>
          {loading ? 'Sending...' : 'Send Quote Request'}
        </button>

        {status.message ? (
          <div className={status.type === 'success' ? 'status-message success' : 'status-message error'}>
            {status.message}
          </div>
        ) : null}

        <div className='whatsapp-links'>
          <a
            className='button button-secondary'
            href='https://wa.me/17248310196'
            target='_blank'
            rel='noreferrer'
          >
            WhatsApp +1 724 831 0196
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
