import DivisionPage from '../components/DivisionPage'

const divisions = [
  {
    title: 'Commercial Audio',
    subtitle: 'Reliable audio systems for business, education, and public spaces.',
    logo: '/logo-az.png',
    points: [
      'Background music and paging systems',
      'Office, school, retail, and community center audio',
      'Conference room and meeting room audio',
      'Multi-zone speaker systems and staff-friendly controls',
      'System upgrades, troubleshooting, and support'
    ]
  }
]

export default function CommercialAudioPage() {
  return (
    <DivisionPage
      eyebrow='AZ Audio Division'
      title='Commercial Audio'
      text='Professional commercial audio systems designed for clarity, reliability, and simple daily use.'
      divisions={divisions}
    />
  )
}
