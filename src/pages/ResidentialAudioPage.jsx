import { Home } from 'lucide-react'
import StandardDivisionPage from '../components/StandardDivisionPage'

const services = [
  {
    title: 'In-Ceiling & In-Wall Speakers',
    text: 'Flush-mounted speakers that blend into your home while delivering clear, natural sound in every room.'
  },
  {
    title: 'Media Room & Home Theater',
    text: 'Surround sound systems, subwoofer placement, and room calibration for an immersive movie and music experience.'
  },
  {
    title: 'Outdoor Audio',
    text: 'Weather-resistant speakers for patios, pools, and gardens — with the same quality sound you expect indoors.'
  },
  {
    title: 'Whole-Home Multi-Room Audio',
    text: 'Stream music everywhere or independently per room, controlled from your phone, tablet, or a wall panel.'
  },
  {
    title: 'Smart Home Integration',
    text: 'Connects with your existing smart home ecosystem for voice control, automation, and unified scene management.'
  },
  {
    title: 'Clean Installation & Calibration',
    text: 'No exposed wiring, professional-grade connections, and acoustic calibration tuned to your room\'s specific dimensions.'
  }
]

const whyUs = [
  'No visible wiring — clean, discreet installation',
  'Calibrated for your room\'s acoustics',
  'Easy smart control or simple wall panels',
  'Minimal disruption during the installation process',
  'Post-install walkthrough and ongoing support'
]

export default function ResidentialAudioPage() {
  return (
    <StandardDivisionPage
      eyebrow='AZ Audio Division'
      title='Residential Audio'
      text='Home audio installations that deliver clean, natural sound with discreet installation and simple everyday control.'
      Icon={Home}
      services={services}
      whyUs={whyUs}
    />
  )
}
