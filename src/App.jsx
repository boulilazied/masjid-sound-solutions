import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PrivacyPage from './pages/PrivacyPage'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import MasjidSoundSolutionsPage from './pages/MasjidSoundSolutionsPage'
import CommercialAudioPage from './pages/CommercialAudioPage'
import EventRentalServicesPage from './pages/EventRentalServicesPage'
import ConnectedHomePage from './pages/ConnectedHomePage'
import AmjaPage from './pages/AmjaPage'
import SchoolSystemsPage from './pages/SchoolSystemsPage'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className='section page-top'>
      <div className='container'>
        <div className='eyebrow'>404</div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0.5rem 0 1rem', letterSpacing: '-0.035em' }}>
          Page not found
        </h1>
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
        {/* Retired division. The permanent (308) redirect lives in vercel.json; this
            covers the local dev server and any client-side navigation. */}
        <Route path='/residential-audio' element={<Navigate to='/connected-home' replace />} />
        <Route path='/event-rental-services' element={<EventRentalServicesPage />} />
        <Route path='/connected-home' element={<ConnectedHomePage />} />
        <Route path='/school-systems' element={<SchoolSystemsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/contact' element={<ContactPage />} />
        {/* Conference QR landing — renders the masjid division page. */}
        <Route path='/amja' element={<AmjaPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
