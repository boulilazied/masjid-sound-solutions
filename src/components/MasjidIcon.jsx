/**
 * Custom masjid dome + minaret icon.
 * Draws a central dome flanked by two slim minarets — instantly recognisable
 * as a masjid silhouette without needing any external image.
 */
export default function MasjidIcon({ size = 22, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      {/* Left minaret */}
      <line x1='4' y1='20' x2='4' y2='10' />
      <line x1='2.5' y1='10' x2='5.5' y2='10' />
      {/* Left minaret top finial */}
      <path d='M4 10 Q4 7.5 4 7' />
      <circle cx='4' cy='6.5' r='0.6' fill={color} stroke='none' />

      {/* Right minaret */}
      <line x1='20' y1='20' x2='20' y2='10' />
      <line x1='18.5' y1='10' x2='21.5' y2='10' />
      {/* Right minaret top finial */}
      <path d='M20 10 Q20 7.5 20 7' />
      <circle cx='20' cy='6.5' r='0.6' fill={color} stroke='none' />

      {/* Central dome body */}
      <path d='M7 20 L7 14 Q7 8 12 8 Q17 8 17 14 L17 20' />

      {/* Dome crescent finial */}
      <path d='M12 8 Q12 5.5 12 5' />
      <path d='M10.8 4.2 A1.5 1.5 0 0 1 13.5 4.8 A1.2 1.2 0 0 0 10.8 4.2Z' fill={color} stroke='none' opacity='0.9' />

      {/* Base / ground line */}
      <line x1='2' y1='20' x2='22' y2='20' />

      {/* Central door arch */}
      <path d='M10 20 L10 16.5 Q10 15 12 15 Q14 15 14 16.5 L14 20' />
    </svg>
  )
}
