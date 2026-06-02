import StandardDivisionPage from '../components/StandardDivisionPage'

const iconPath = 'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'

const services = [
  {
    title: 'Professional PA Systems',
    text: 'Line arrays, powered column speakers, and subwoofers — sized to the venue and optimized for indoor or outdoor use.'
  },
  {
    title: 'Wireless Microphone Systems',
    text: 'Handheld, lavalier, and headset wireless mics — fully charged, tested, and ready before the event begins.'
  },
  {
    title: 'Digital Audio Mixers',
    text: 'Analog and digital mixing desks for events with multiple sources, monitor sends, or complex stage routing.'
  },
  {
    title: 'Monitor Speakers & Stage Fills',
    text: 'Floor and stage monitors so presenters and performers always hear themselves clearly regardless of venue size.'
  },
  {
    title: 'Setup, Sound Check & Operation',
    text: 'We build the rig, test every channel, and tune the system to the space before your guests arrive.'
  },
  {
    title: 'Breakdown & Retrieval',
    text: 'Post-event breakdown and equipment pickup is included — no logistics headache for your organizing team.'
  }
]

const whyUs = [
  'Tested, maintained, and reliable rental equipment',
  'Delivery, setup, and sound check included',
  'Available for small gatherings to large conferences',
  'Technical support on-site or on-call during events',
  'Flexible rental periods and transparent pricing'
]

export default function EventRentalServicesPage() {
  return (
    <StandardDivisionPage
      eyebrow='AZ Audio Division'
      title='Event Rental Services'
      text='Complete portable audio solutions for masjids, community centers, outdoor events, and private gatherings — delivered, set up, and ready to go.'
      iconPath={iconPath}
      services={services}
      whyUs={whyUs}
    />
  )
}
