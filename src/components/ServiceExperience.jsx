import { Link } from 'react-router-dom'
import { ArrowRight, Check, PhoneCall } from 'lucide-react'
import '../service-experience.css'

const audiences = {
  business: {
    label: 'Commercial Audio Solutions', headline: 'Better sound. A better day at work.',
    image: '/home/work-rack.jpg', alt: 'Organized audio equipment rack from an AZ Audio installation',
    caption: 'The details behind dependable everyday audio.',
    intro: 'Sound that works the way your business does.',
    introText: 'Help people hear clearly, set the right atmosphere, and give your staff controls they can use with confidence.',
    benefits: [
      ['Make every message clearer', 'Paging and meeting-room audio designed around speech, so announcements and conversations are easier to follow.'],
      ['Set the mood, zone by zone', 'Background music and independent volume controls for customer areas, workspaces, and shared facilities.'],
      ['Keep daily operation simple', 'Practical controls, staff training, and a clean installation that your team can manage every day.'],
    ],
    stories: [
      { title: 'One building. Different sound in every space.', text: 'Keep music in the lobby, paging in the right areas, and meeting audio where it belongs. We plan speaker coverage and source routing around your building and daily workflow.', image: '/home/work-app.jpg', alt: 'Audio zone controls on a mobile device', link: '#solutions', action: 'Explore business audio' },
      { title: 'A system your staff can take over with confidence.', text: 'Equipment selection is only the beginning. Clean cabling, on-site tuning, and a practical walkthrough help turn a new installation into a useful everyday tool.', image: '/home/work-rack.jpg', alt: 'Professionally organized and labeled audio equipment', link: '/contact', action: 'Discuss your space' },
    ],
    faq: [
      ['Can you improve our existing system?', 'Yes. We assess the existing equipment, coverage, and controls before recommending tuning, component upgrades, or a new system.'],
      ['What determines the project price?', 'Your building layout, number of zones, equipment, cabling, and installation requirements determine the scope. You receive an itemized proposal before installation.'],
      ['Will our staff receive training?', 'Yes. On-site tuning and a staff walkthrough are part of the process. Ongoing support and maintenance options can be discussed with your proposal.'],
    ],
  },
}

export function ExperienceStories({ items }) {
  return <div className='az-stories container'>{items.map((item, index) => (
    <article className={`az-story${index % 2 ? ' az-story-reverse' : ''}`} key={item.title}>
      <div className={`az-story-image${item.imageCaption ? ' az-story-photo' : ''}`}><img src={item.image} alt={item.alt} loading='lazy' />{item.imageCaption && <p className='az-story-caption'>{item.imageCaption}</p>}</div>
      <div className='az-story-copy'><span className='eyebrow'>{item.eyebrow || 'Designed around you'}</span><h2>{item.title}</h2><p>{item.text}</p><a className='az-text-link' href={item.link}>{item.action}<ArrowRight size={18} aria-hidden='true' /></a></div>
    </article>
  ))}</div>
}

export function ExperienceFaq({ items }) {
  return <section className='section az-faq'><div className='container az-faq-inner'><div><span className='eyebrow'>A clearer next step</span><h2>Before you get started.</h2><p>Practical answers to help you plan your project.</p></div><div>{items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
}

export function ExperienceClosing({ audience }) {
  return <section className='section cta-band'><div className='container cta-inner'><div><span className='eyebrow eyebrow-light'>Let’s plan your project</span><h2>Make your space sound better.</h2><p>Start with a free initial consultation and a clear, itemized proposal.</p></div><div className='az-closing-actions'><Link to='/contact' className='button button-primary'>Book a Free Consultation</Link><a href='tel:+17243211106'>Call +1 724 321 1106</a></div></div></section>
}

export default function ServiceExperience({ audience, text, services, whyUs }) {
  const content = audiences[audience]
  return <div className='az-experience'>
    <section className='az-service-hero'><div className='container az-service-hero-inner'><div className='az-service-hero-copy'><span className='eyebrow eyebrow-light'>{content.label}</span><h1>{content.headline}</h1><p>{text}</p><div className='az-hero-actions'><Link to='/contact' className='button button-primary'>Book a Free Consultation</Link><a href='tel:+17243211106' className='az-phone'><PhoneCall size={18} aria-hidden='true' />Call +1 724 321 1106</a></div><a className='az-hero-explore' href='#solutions'>Explore your options <ArrowRight size={17} aria-hidden='true' /></a></div><figure><img src={content.image} alt={content.alt} fetchPriority='high' /><figcaption>{content.caption}</figcaption></figure></div></section>
    <div className='az-proof-strip'><div className='container'><span><Check size={17} aria-hidden='true' />Free initial consultation</span><span><Check size={17} aria-hidden='true' />Itemized proposals</span><span><Check size={17} aria-hidden='true' />Professional installation & tuning</span></div></div>
    <nav className='az-service-nav container' aria-label={`${content.label} page sections`}><a href='#benefits'>Everyday benefits</a><a href='#solutions'>Our solutions</a><a href='#process'>How it works</a><Link to='/school-systems'>School systems<ArrowRight size={15} aria-hidden='true' /></Link></nav>
    <section className='section' id='benefits'><div className='container'><div className='az-section-heading'><span className='eyebrow'>Built around everyday life</span><h2>{content.intro}</h2><p>{content.introText}</p></div><div className='az-benefit-grid'>{content.benefits.map(([title, description], i) => <article key={title}><span className='az-benefit-number'>0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <ExperienceStories items={content.stories} />
    <section className='section surface-muted' id='solutions'><div className='container'><div className='az-section-heading'><span className='eyebrow'>Explore your options</span><h2>The right audio for your business.</h2><p>Choose your starting point. We will tailor the equipment and installation to your space.</p></div><div className='std-features-grid'>{services.map(svc => <article className='std-feature-card az-service-card' key={svc.title}><h3>{svc.title}</h3><p>{svc.text}</p><Link className='az-text-link' to='/contact' aria-label={`Discuss ${svc.title}`}>Discuss this solution<ArrowRight size={16} aria-hidden='true' /></Link></article>)}</div></div></section>
    <section className='section'><div className='container split-layout'><div><span className='eyebrow'>Why AZ Audio</span><h2 className='az-large-heading'>Thoughtful design.<br />Practical installation.</h2><p>From the first conversation to the final walkthrough, we focus on clear sound and controls you feel comfortable using.</p></div><div className='value-panel az-value-panel'><ul className='check-list'>{whyUs.map(item => <li key={item}>{item}</li>)}</ul></div></div></section>
    <ExperienceFaq items={content.faq} />
  </div>
}
