import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

// Build-time entry used by scripts/prerender.mjs: renders one route to static HTML
// so crawlers and link previews get real content before JavaScript runs.
export { META, resolveMeta } from './components/Seo'

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  )
}
