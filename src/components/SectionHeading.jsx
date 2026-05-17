export default function SectionHeading({ eyebrow, title, text, centered = false }) {
  return (
    <div className={centered ? 'section-heading centered' : 'section-heading'}>
      {eyebrow ? <div className='eyebrow'>{eyebrow}</div> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}
