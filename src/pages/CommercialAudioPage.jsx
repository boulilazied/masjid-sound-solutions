import StandardDivisionPage from '../components/StandardDivisionPage'

const iconPath = 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'

const services = [
  {
    title: 'Background Music & Zone Paging',
    text: 'Zoned music playback with PA override for announcements — ideal for retail, restaurants, lobbies, and open-plan offices.'
  },
  {
    title: 'Conference & Meeting Room Audio',
    text: 'Speech-optimized ceiling speakers with echo cancellation and simple controls for clear in-room and hybrid communication.'
  },
  {
    title: 'Schools & Educational Facilities',
    text: 'Classroom PA, gymnasium sound reinforcement, and multi-zone audio systems built for daily school use.'
  },
  {
    title: 'Retail & Hospitality',
    text: 'Consistent background music experience with even coverage, simple volume control, and zone-by-zone management.'
  },
  {
    title: 'Multi-Zone Speaker Systems',
    text: 'Independent volume and source routing per zone — so every area sounds right without affecting the others.'
  },
  {
    title: 'Upgrades & Ongoing Support',
    text: 'System diagnostics, DSP tuning, component upgrades, and maintenance contracts to keep your audio performing reliably.'
  }
]

const whyUs = [
  'Reliable systems designed for daily business use',
  'Controls simple enough for non-technical staff',
  'Clean cable management and professional finish',
  'Post-installation tuning and staff training',
  'Ongoing support and maintenance available'
]

export default function CommercialAudioPage() {
  return (
    <StandardDivisionPage
      eyebrow='AZ Audio Division'
      title='Commercial Audio'
      text='Professional audio systems for offices, schools, retail spaces, and community centers — reliable, easy to operate, and built to last.'
      iconPath={iconPath}
      services={services}
      whyUs={whyUs}
    />
  )
}
