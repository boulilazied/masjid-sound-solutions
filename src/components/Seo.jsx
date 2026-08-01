import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Canonical site origin (no trailing slash).
const SITE = 'https://azaudios.com'
const OG_IMAGE = `${SITE}/logo-az.png`

// Per-route SEO metadata.
// Titles intentionally reinforce the brand hierarchy:
//   AZ Audio Solutions = parent company, each division = "A Division of AZ Audio Solutions".
const META = {
  '/': {
    title: 'AZ Audio Solutions | Professional Audio Systems for Masjids, Commercial, Residential & Events',
    description:
      'AZ Audio Solutions provides professional audio system design, installation, DSP tuning, acoustic optimization, multi-zone audio control, and support for masjids, commercial facilities, event venues, and residential projects throughout the USA and Canada.',
  },
  '/masjid-sound-solutions': {
    title: 'Masjid Sound Solutions — A Division of AZ Audio Solutions',
    description:
      'Masjid Sound Solutions, a division of AZ Audio Solutions: specialized masjid audio design, khutba intelligibility, speaker coverage optimization, DSP tuning and multi-zone control across the USA and Canada.',
  },
  '/commercial-audio': {
    title: 'Commercial Audio Solutions — A Division of AZ Audio Solutions',
    description:
      'Commercial Audio Solutions by AZ Audio Solutions: professional sound for offices, schools, retail, community centers, paging and conferencing across the USA and Canada.',
  },
  '/residential-audio': {
    title: 'Residential Audio Solutions — A Division of AZ Audio Solutions',
    description:
      'Residential Audio Solutions by AZ Audio Solutions: clean home audio, in-ceiling speakers, media-room sound, multi-room audio and smart control integration.',
  },
  '/event-rental-services': {
    title: 'Event Rental Services — A Division of AZ Audio Solutions',
    description:
      'Event Rental Services by AZ Audio Solutions: portable PA systems, wireless microphones, mixers, speakers and temporary audio support for events and gatherings.',
  },
  '/services': {
    title: 'Audio Services — AZ Audio Solutions',
    description:
      'Explore the four service divisions of AZ Audio Solutions: masjid, commercial, residential and event audio system design, installation and tuning.',
  },
  '/about': {
    title: 'About AZ Audio Solutions',
    description:
      'AZ Audio Solutions specializes in professional audio system design, installation, DSP tuning, acoustic optimization and multi-zone audio control for masjids, commercial facilities, events and residential clients across North America.',
  },
  '/contact': {
    title: 'Contact AZ Audio Solutions',
    description:
      'Contact AZ Audio Solutions for professional audio system design, installation and support for masjids, commercial facilities, events and residential projects across the USA and Canada.',
  },
}

// Unknown routes render the NotFound component, but Vercel's SPA rewrite still
// answers them with HTTP 200. Without this entry they would inherit the homepage
// title and description and become indexable soft-404s, so they get their own
// metadata plus noindex.
const NOT_FOUND = {
  title: 'Page Not Found — AZ Audio Solutions',
  description:
    'This page does not exist. Browse AZ Audio Solutions for masjid, commercial, residential and event audio system design, installation and support.',
}

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Single component, mounted once in Layout. Updates <title>, meta description,
// canonical and Open Graph / Twitter tags on every client-side route change so
// each route exposes correct, crawlable metadata in this Vite SPA.
export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const known = Object.prototype.hasOwnProperty.call(META, pathname)
    const meta = known ? META[pathname] : NOT_FOUND
    const canonical = pathname === '/' ? `${SITE}/` : `${SITE}${pathname}`

    document.title = meta.title
    upsertMeta('name', 'description', meta.description)
    upsertCanonical(canonical)
    upsertMeta(
      'name',
      'robots',
      known ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, follow'
    )

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'AZ Audio Solutions')
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', OG_IMAGE)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', OG_IMAGE)
  }, [pathname])

  return null
}
