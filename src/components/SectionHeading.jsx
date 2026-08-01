// `as` controls the heading level. Pages that have no other page-level heading
// pass as='h1' so every route ships exactly one H1; everything else stays h2.
export default function SectionHeading({ eyebrow, title, text, centered = false, as: Tag = 'h2' }) {
  return (
    <div className={centered ? 'section-heading centered' : 'section-heading'}>
      {eyebrow ? <div className='eyebrow'>{eyebrow}</div> : null}
      <Tag>{title}</Tag>
      {text ? <p>{text}</p> : null}
    </div>
  )
}
