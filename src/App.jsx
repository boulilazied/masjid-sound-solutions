import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import MasjidSoundSolutionsPage from './pages/MasjidSoundSolutionsPage'
import CommercialAudioPage from './pages/CommercialAudioPage'
import ResidentialAudioPage from './pages/ResidentialAudioPage'
import EventRentalServicesPage from './pages/EventRentalServicesPage'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className='section page-top'>
      <div className='container'>
        <div className='eyebrow'>404</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0.5rem 0 1rem', letterSpacing: '-0.035em' }}>
          Page not found
        </h2>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to='/' className='button button-primary'>Back to Home</Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/masjid-sound-solutions' element={<MasjidSoundSolutionsPage />} />
        <Route path='/commercial-audio' element={<CommercialAudioPage />} />
        <Route path='/residential-audio' element={<ResidentialAudioPage />} />
        <Route path='/event-rental-services' element={<EventRentalServicesPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
