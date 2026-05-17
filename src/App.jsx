import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PackagesPage from './pages/PackagesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import MasjidSoundSolutionsPage from './pages/MasjidSoundSolutionsPage'
import CommercialAudioPage from './pages/CommercialAudioPage'
import ResidentialAudioPage from './pages/ResidentialAudioPage'
import EventRentalServicesPage from './pages/EventRentalServicesPage'

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
        <Route path='/packages' element={<PackagesPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    </Layout>
  )
}
