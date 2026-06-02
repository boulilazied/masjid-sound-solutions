import DivisionPage from '../components/DivisionPage'

const ICON_COMMERCIAL = 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
const ICON_RESIDENTIAL = 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
const ICON_EVENT = 'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'

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
    icon: ICON_COMMERCIAL,
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
    icon: ICON_RESIDENTIAL,
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
    icon: ICON_EVENT,
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
