import DivisionPage from '../components/DivisionPage'

const divisions = [
  {
    title: 'Event Rental Services',
    subtitle: 'Temporary audio systems for events, gatherings, and programs.',
    logo: '/logo-az.png',
    points: [
      'Portable PA speaker rental',
      'Wireless microphone rental',
      'Mixer and sound setup support',
      'Small to mid-size event sound reinforcement',
      'Setup, testing, operation support, and breakdown options'
    ]
  }
]

export default function EventRentalServicesPage() {
  return (
    <DivisionPage
      eyebrow='AZ Audio Division'
      title='Event Rental Services'
      text='Professional event audio rental support for clear sound without permanent installation.'
      divisions={divisions}
    />
  )
}
