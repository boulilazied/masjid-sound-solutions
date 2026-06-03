import { Building2, Home, Mic2 } from 'lucide-react'
import DivisionPage from '../components/DivisionPage'

const divisions = [
  {
    title: 'Masjid Sound Solutions',
    subtitle: 'Dedicated AZ Audio division for masjid audio clarity',
    logo: '/logo-masjid-division.png',
    points: [
      'Prayer hall audio system design and upgrades',
      'Khutba intelligibility improvement',
      'Wireless microphone and podium microphone setup',
      'DSP tuning, delay, EQ, and feedback control',
      "Women's section, classroom, and overflow audio zones"
    ]
  },
  {
    title: 'Commercial Audio',
    subtitle: 'Reliable audio for professional and public spaces',
    Icon: Building2,
    points: [
      'Background music and paging systems',
      'Office, school, and retail audio installations',
      'Conference and meeting room audio',
      'Multi-zone commercial speaker systems',
      'Simple controls for staff and managers'
    ]
  },
  {
    title: 'Residential Audio',
    subtitle: 'Clean home audio installations and smart listening spaces',
    Icon: Home,
    points: [
      'In-ceiling and in-wall speaker installation',
      'Media room and family room sound systems',
      'Multi-room home audio',
      'Smart audio control integration',
      'Clean wiring and discreet installation'
    ]
  },
  {
    title: 'Event Rental Services',
    subtitle: 'Temporary audio systems for events and gatherings',
    Icon: Mic2,
    points: [
      'Portable PA speaker rental',
      'Wireless microphone rental',
      'Mixer and sound setup support',
      'Small to mid-size event sound reinforcement',
      'Setup, testing, and breakdown support'
    ]
  }
]

export default function ServicesPage() {
  return (
    <DivisionPage
      eyebrow='Services'
      title='Four audio divisions under AZ Audio Solutions'
      text='Each section is built around a different customer need: masjids, commercial buildings, homes, and events.'
      divisions={divisions}
    />
  )
}
