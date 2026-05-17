import DivisionPage from '../components/DivisionPage'

const divisions = [
  {
    title: 'Residential Audio',
    subtitle: 'Clean home audio systems designed to fit your space.',
    logo: '/logo-az.png',
    points: [
      'In-ceiling and in-wall speaker installation',
      'Media room and family room sound systems',
      'Multi-room home audio',
      'Smart audio control integration',
      'Clean wiring, discreet installation, and practical training'
    ]
  }
]

export default function ResidentialAudioPage() {
  return (
    <DivisionPage
      eyebrow='AZ Audio Division'
      title='Residential Audio'
      text='Home audio installations that deliver clean sound, simple control, and a professional finish.'
      divisions={divisions}
    />
  )
}
