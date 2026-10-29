// Writes one static HTML file per route in Seo.jsx META, after `vite build` (client)
// and `vite build --ssr src/entry-server.jsx --outDir dist-ssr` (server bundle).
//   /                -> dist/index.html
//   /connected-home  -> dist/connected-home.html (served by a rewrite in vercel.json)
//   anything else    -> dist/spa.html (the untouched app shell)
// Each file carries the route's own title, description, canonical, robots and share
// tags, plus the rendered page body. The client app then takes over as before.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, META, resolveMeta } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'))

const attr = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

// Replaces the value between the two capture groups. A replacer function is used so
// "$" in content (prices such as "$6,500") is never read as a group reference.
function setTag(html, pattern, value, label, route) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in index.html (route ${route})`)
  return html.replace(pattern, (_, open, close) => `${open}${value}${close}`)
}

function pageHtml(route) {
  const m = resolveMeta(route)
  let html = template
  html = setTag(html, /(<title>)[\s\S]*?(<\/title>)/, attr(m.title), 'title', route)
  html = setTag(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, attr(m.description), 'description', route)
  html = setTag(html, /(<meta name="robots" content=")[^"]*(")/, attr(m.robots), 'robots', route)
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, attr(m.canonical), 'canonical', route)
  for (const [key, value] of [['og:url', m.canonical], ['og:title', m.title], ['og:description', m.description], ['og:image', m.image]]) {
    html = setTag(html, new RegExp(`(<meta property="${key}"\\s+content=")[^"]*(")`), attr(value), key, route)
  }
  for (const [key, value] of [['twitter:title', m.title], ['twitter:description', m.description], ['twitter:image', m.image]]) {
    html = setTag(html, new RegExp(`(<meta name="${key}"\\s+content=")[^"]*(")`), attr(value), key, route)
  }
  return setTag(html, /(<div id="root">)(<\/div>)/, render(route), 'root div', route)
}

// Unknown paths fall through to this empty shell (vercel.json catch-all), so they never
// carry another page's content; the client renders NotFound and sets noindex.
fs.writeFileSync(path.join(dist, 'spa.html'), template)

const routes = Object.keys(META)
const rewrites = new Map((vercel.rewrites || []).map((r) => [r.source, r.destination]))
const missing = []

for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  fs.writeFileSync(path.join(dist, file), pageHtml(route))
  if (rewrites.get(route) !== `/${file}`) missing.push(route)
  console.log(`prerendered ${route} -> dist/${file}`)
}

if (missing.length) {
  throw new Error(`prerender: vercel.json needs a rewrite for ${missing.join(', ')} (source "/x" -> destination "/x.html"), before the catch-all`)
}
