import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <section className='section page-top'>
      <article className='container privacy-copy'>
        <span className='eyebrow'>AZ Audio Solutions</span>
        <h1>Privacy notice</h1>
        <p>Updated October 29, 2026. This notice explains how information submitted through our website inquiry form is handled.</p>
        <h2>Information you provide</h2>
        <p>The quote form asks for your name, email, project details, and optional information such as your phone number, organization, city, project type, and selected home package. Please do not include passwords, alarm codes, payment details, or other sensitive security information.</p>
        <h2>How we use your inquiry</h2>
        <p>AZ Audio Solutions uses your inquiry to respond, discuss your requirements, prepare a proposal, and coordinate requested services. Sending an inquiry does not book an appointment or enroll you in a marketing mailing list.</p>
        <h2>Services that process your information</h2>
        <p>Our website is hosted on Vercel. Form submissions are sent to the AZ Audio Solutions team using Google-hosted email. These providers process information to host the site and deliver our correspondence. If you choose a WhatsApp, social-media, or email link, that service handles your interaction under its own privacy terms.</p>
        <h2>Questions, corrections, or deletion requests</h2>
        <p>Email <a href='mailto:contact@azaudios.com'>contact@azaudios.com</a> to ask about your inquiry information, request a correction, or request deletion. We will review your request, including any records that need to be kept for an active project or applicable recordkeeping obligations.</p>
        <Link to='/contact' className='button button-secondary'>Contact AZ Audio Solutions</Link>
      </article>
    </section>
  )
}
