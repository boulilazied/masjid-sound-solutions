import SectionHeading from '../components/SectionHeading'
import { Link } from 'react-router-dom'

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

export default function PackagesPage() {
  return (
    <section className='section page-top surface-muted'>
      <div className='container'>
        <SectionHeading
          centered
          eyebrow='Packages'
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
  )
}
