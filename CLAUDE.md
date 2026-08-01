# AZ Audio Solutions — Project Context

## Business

**Company:** AZ Audio Solutions  
**Rebranded from:** Masjid Sound Solutions (scope expanded beyond masjids — some legacy naming remains in the codebase)  
**Four divisions (canonical names — use these exact strings everywhere):** Masjid Sound Solutions · Commercial Audio Solutions · Residential Audio Solutions · Event Rental Services  
**Contact:** contact@azaudios.com · WhatsApp +1 724 831 0196 · +1 724 427 5661 · USA and Canada

---

## Public claims policy

Everything published on this site is a commercial representation by a real LLC. **Do not add copy
that cannot be substantiated on request.** Specifically:

- **No invented social proof.** No testimonials, quotes, star ratings, review counts, or named
  clients unless the client actually said it and agreed to be quoted. A prior version of
  `HomePage.jsx` shipped three fabricated testimonials with attributed roles and cities — they were
  removed on 2026-08-01. Under FTC 16 CFR 255 a fabricated endorsement is an unfair or deceptive act.
- **No invented metrics.** No project counts, client counts, years-in-business, or "X+ masjids
  served" figures unless they are true and countable. The stats strip deliberately uses only
  structural facts (division count, free consultation, engineer credential, itemized-proposal policy).
- **No unearned status claims.** "Partner", "authorized dealer", "certified" and similar imply a
  contractual relationship with the manufacturer. Brand logos are framed as *equipment we build with*,
  never as partnership.
- **No open-ended guarantees.** State the actual scope — "full manufacturer warranty coverage on
  every component we supply", not "a full warranty".
- Policy and capability statements ("transparent pricing", "free initial consultation") are fine —
  those are commitments the business controls, not claims about past performance.

When in doubt, ask the owner for the underlying fact rather than writing something plausible.

---

## Tech stack

| Layer | Tool |
|---|---|
| Frontend | React 18 SPA, React Router DOM v6 |
| Build | Vite 5 |
| Backend (local) | Express 4 (`server/index.js`) — dev only |
| Backend (production) | Vercel serverless function (`api/quote.js`) |
| Email | `nodemailer` + Gmail SMTP (port 465/SSL) — sends quote submissions to contact@azaudios.com |
| Icons | `lucide-react` — used across all pages; component refs stored in data arrays |
| Dev runner | `concurrently` (client + server in parallel) |
| Server hot-reload | `nodemon` |
| CORS | `cors` package, env-var allowlist (`ALLOWED_ORIGINS`) |
| Form storage | `server/submissions/quote-requests.json` — local dev only, gitignored |

**Dev commands:**
- `npm run dev` — Vite (port 5173) + Express (port 3001)
- `npm run build` — production build
- `npm run preview` — preview build (port 4173)

**Vite proxy:** `/api` → `http://localhost:3001` in dev.

**Production form flow:** Browser → `/api/quote` → Vercel serverless (`api/quote.js`) → Gmail SMTP (port 465/SSL) → email delivered to contact@azaudios.com. Requires `EMAIL_USER` and `EMAIL_PASSWORD` env vars in Vercel dashboard. `replyTo` is set to the customer's email so replies go directly to them.

**CORS defaults:** `localhost:5173` and `localhost:4173`. Override with `ALLOWED_ORIGINS=https://yourdomain.com` in production.

**nodemon:** `dev:server` uses `nodemon --watch server server/index.js` — the `--watch server` flag restricts watching to only the `server/` directory. Do not remove it; without it nodemon watches the entire project and restarts on every Vite file change or form submission write.

---

## Routes

| Path | Component |
|---|---|
| `/` | HomePage |
| `/services` | ServicesPage |
| `/masjid-sound-solutions` | MasjidSoundSolutionsPage |
| `/commercial-audio` | CommercialAudioPage |
| `/residential-audio` | ResidentialAudioPage |
| `/event-rental-services` | EventRentalServicesPage |
| `/about` | AboutPage |
| `/contact` | ContactPage |
| `*` | NotFound (inline in App.jsx) |

---

## File structure

```
api/
  quote.js                        — Vercel serverless function; validates fields, sends email via nodemailer + Gmail SMTP

src/
  App.jsx                         — router root, NotFound component
  styles.css                      — single CSS file (~3,500 lines)
  pages/
    HomePage.jsx                  — hero (H1 "AZ Audio Solutions", slogan "Premium Quality. Affordable Cost."), stats strip, divisions grid, About AZ Audio Solutions + brand-hierarchy section, how-it-works, credentials, equipment-standards brand grid, commitments, CTA band
    ServicesPage.jsx              — all four divisions via <DivisionPage>
    MasjidSoundSolutionsPage.jsx  — rich 13-section standalone page, lucide-react icons
    CommercialAudioPage.jsx       — full content via <StandardDivisionPage>
    ResidentialAudioPage.jsx      — full content via <StandardDivisionPage>
    EventRentalServicesPage.jsx   — rich 9-section standalone page (matches masjid page quality)
    AboutPage.jsx                 — company overview, all 4 divisions grid, team section (reuses `.hp-cred-grid`), values panel
    ContactPage.jsx               — SectionHeading + QuoteForm + contact card
  components/
    Layout.jsx                    — header (nav + hamburger menu), <main>, footer; mounts <RouteSeo /> once
    Seo.jsx                       — RouteSeo: per-route <title>/description/canonical/OG/Twitter for the SPA (see SEO section)
    DivisionPage.jsx              — used only by ServicesPage; supports Icon (lucide) or logo (img)
    StandardDivisionPage.jsx      — reusable full-page template for Commercial/Residential/Event
    SectionHeading.jsx            — eyebrow + heading + text; `centered` prop, and `as` prop for heading level (defaults to h2; pages with no other page-level heading pass as='h1')
    MasjidIcon.jsx                — custom inline masjid SVG; the featured division icon on HomePage
    QuoteForm.jsx                 — controlled form, POSTs to /api/quote; graceful JSON-parse error handling

server/
  index.js                        — Express server (local dev only), /api/health, /api/quote
  submissions/
    quote-requests.json           — local dev form storage (gitignored — may contain customer data)

public/
  logo-az.png                     — main AZ Audio logo (wide)
  logo-az-transparent.png         — transparent version for footer
  logo-masjid-division.png        — Masjid Sound Solutions division logo
  az-masjid-audio-logo-clean.png  — hero logo in MasjidSoundSolutionsPage
  masjid-prayer-wide-new.png      — hero background (MasjidSoundSolutionsPage)
  masjid-khutba-mics-new.png      — microphone section image
  masjid-rack-room-new.png        — equipment rack section image
  masjid-multi-zone-layout.png    — zone layout diagram
  ptz-camera.png                  — PTZ camera product photo (Livestreaming & Recording section)
  brand-logos/                    — SVG logos for the partner brands section
    jbl.svg                       — real Simple Icons path (actual JBL mark)
    sennheiser.svg                — real Simple Icons path (actual Sennheiser mark)
    yamaha.svg                    — brand-color wordmark (#171717)
    shure.svg                     — brand-color wordmark (navy #1A3364)
    qsc.svg                       — brand-color wordmark (blue #005DAA)
    toa.svg                       — brand-color wordmark (#171717)
    dbx.svg                       — brand-color wordmark, lowercase (#171717)
    rcf.svg                       — brand-color wordmark (red #E10016)
    atlasied.svg                  — two-line wordmark: ATLAS (#0058A5) / IED (#666)
```

> `public/` was pruned from 57 files (47 MB) to 19 files (9.7 MB) — every unreferenced asset was
> deleted. **Do not restore any of them.** Anything in `public/` is served publicly at
> `azaudios.com/<filename>` whether or not the site links to it, so nothing goes in here unless a
> page actually renders it. Notably removed:
> - `masjid-real/` — a real client's floor plans and rack architecture; publicly downloadable, never linked
> - `brochure-front.png` / `brochure-back.png` / `catalog-masjid-grid.png` — print collateral, never linked
> - `masjid-why-specialized.png`, `masjid-brands-real.png`, `masjid-process.png`, `masjid-zone-control*.png`
>   — superseded by live HTML/CSS sections
> - `brand-*.svg` at the `public/` root — eight zero-byte stubs; the real logos live in `brand-logos/`
> - old pre-`-new` photo variants, `logo.png`, `equipment-*.svg`, `realistic-zone-control.svg`

---

## Navigation

**Header nav:** Home · **Services** (dropdown → the four division pages) · About · phone link `+1 724 831 0196` · "Request a Quote" CTA → `/contact`. Below 1080px the dropdown is hidden and the four service links render flat via `.nav-mobile-services`.

**Footer divisions column:** maps over the same `serviceLinks` array the nav uses (single source of truth for division names) + `/services` (All Services)

**Footer social:** Instagram and Facebook only. LinkedIn was removed — `linkedin.com/company/azaudiosolutions` returns 404. Restore the footer link *and* the `sameAs` entry in `index.html` together, once the page exists.

> There is no Packages page — it was removed as no longer relevant.

---

## CSS architecture (`src/styles.css`)

Single `:root` block with gold/amber brand tokens:
```css
--primary: #b8860b
--primary-dark: #8a6508
--primary-soft: #fff4d6
--bg-soft: #fbf7ee
--cta-bg: #0b1220
```

**MasjidSoundSolutionsPage** uses `.masjid-clean-page` as its root wrapper (not `<main>`, to avoid nesting inside Layout's `<main>`). It has its own design tokens defined inside that block: `--real-ink`, `--real-gold`, `--real-gold-dark: #9d7430`, `--real-border`, etc.

Key component classes in the Masjid page:
- `.masjid-benefits-strip` / `.masjid-benefits-inner` / `.masjid-benefits-tag` / `.masjid-benefits-list` / `.masjid-benefit-item` — dark navy key benefits bar immediately after hero (6 items: sound, control, zones, reliability, scalability, quality).
- `.why-grid` / `.why-card` / `.why-icon` — 6-card grid for the "Why Specialized" section (3-col → 2-col → 1-col at breakpoints). Cards use **lucide-react** components (not inline SVG paths).
- `.brand-grid-clean` / `.clean-brand-tile` — 4-col partner brand logo grid using SVG files from `public/brand-logos/`.
- `.process-timeline` / `.process-step` / `.process-step-badge` / `.process-step-vline` / `.process-step-circle` / `.process-step-body` / `.process-commitment` — 7-step horizontal timeline with numbered badges, lucide icon circles, and a gold connecting line.
- `.zone-control-grid` / `.zone-option-card` / `.zone-option-header` / `.phone-mockup` / `.phone-zone-row` / `.phone-nav` / `.wall-mockup` / `.wall-zone-led` / `.wall-knob` / `.wall-mute-btn` / `.zone-option-features` — two-card zone control options section (phone mockup + wall panel mockup).
- `.signal-flow-diagram` / `.signal-sources` / `.signal-zones-output` / `.signal-node` / `.signal-node-icon` / `.signal-arrow` / `.signal-arrow-col` / `.signal-zone-badge` / `.signal-zone-output-item` / `.signal-col-label` — horizontal audio signal flow diagram (Sources → Mixer → DSP → Amplifier → Zones).
- `.sys-arch-grid` / `.sys-arch-components` / `.sys-arch-component` / `.sys-arch-badge` / `.sys-arch-comp-icon` / `.sys-rack-visual` / `.sys-rack-frame` / `.sys-rack-unit` / `.sys-rack-amp` / `.sys-rack-amp-zones` / `.sys-rack-amp-zone-more` / `.sys-arch-inputs` / `.sys-input-row` / `.sys-input-icon` / `.sys-input-arrow` — 3-column system architecture section (component list + CSS rack visual + audio inputs).
- **Zone count is never fixed at four.** This applies to *both* the System Architecture section and the Audio Signal Flow section (`MULTI-ZONE AMPLIFIER`, `ZONE OUTPUTS`, `.signal-zone-note`). The four named zones in the signal-flow diagram are an illustrative example and are labelled as such — if you touch one section, check the other.
- `.stream-mockup-card` / `.stream-live-badge` / `.stream-live-dot` / `.stream-output-list` / `.stream-output-row` / `.stream-status-on` / `.stream-status-off` / `.stream-audio-wrap` / `.stream-audio-bars` / `.stream-audio-bar` / `.stream-camera-preview` / `.stream-camera-photo-wrap` / `.stream-camera-img` / `.stream-camera-caption` / `.stream-camera-badge` — dark broadcast panel mockup for the Livestreaming & Recording section; includes PTZ camera photo (`ptz-camera.png`) in a white inset card above the output rows.

**MasjidSoundSolutionsPage section order (13 sections):** Hero → Key Benefits Strip → Why Specialized → Microphones → Multi-zone layout → Zone Control Options → Rack & Infrastructure → System Architecture Overview → Audio Signal Flow → Livestreaming & Recording → Process Timeline → Partner Brands → Final CTA

**StandardDivisionPage** classes:
- `.std-hero` / `.std-hero-inner` / `.std-hero-icon` — dark gradient hero with gold icon box
- `.std-features-grid` / `.std-feature-card` — 3-col service card grid
- `.button-ghost-light` — ghost button for use on dark backgrounds

Responsive breakpoints: **1080px, 980px, 760px, 640px**

**Do not re-add:**
- `.masjid-premium-page` — deleted, was design iteration 1, never used
- `.masjid-real-page` bulk — deleted, was design iteration 2, replaced by `.masjid-clean-page`
- A second `:root` block — was merged into the single canonical `:root`
- The static poster PNGs for "why specialized", "brands", "process", and "zone control" — all replaced by live HTML/CSS

---

## lucide-react icon pattern

Icons in MasjidSoundSolutionsPage data arrays are stored as component references, not SVG path strings:

```js
// In data arrays (whyItems, processSteps):
{ title: 'Speech Clarity', text: '...', Icon: Mic2 }

// In JSX:
<item.Icon size={26} strokeWidth={1.5} />
```

Do not revert to raw Heroicons SVG path strings — lucide-react components render cleaner and are easier to maintain.

---

## Backend: `/api/quote` fields

```js
{ name, masjid, email, phone, city, needs, message }
// "masjid" = organization or masjid name (form label: "Organization / Masjid")
```
Required: `name`, `email`, `message`. All others optional.

---

## Division page status

| Page | Status |
|---|---|
| MasjidSoundSolutionsPage | **Complete** — 13-section standalone page: hero, key benefits strip, why-grid, mic section, zone layout, zone control options, rack, system architecture, signal flow, livestreaming & recording (with PTZ camera), process timeline, brands, CTA |
| CommercialAudioPage | **Complete** — full content via `StandardDivisionPage` (6 services, 5 why-us points) |
| ResidentialAudioPage | **Complete** — full content via `StandardDivisionPage` (6 services, 5 why-us points) |
| EventRentalServicesPage | **Complete** — rich 9-section standalone page (hero, benefits strip, equipment grid, rental mockup card, event types, includes, 6-step process, brands, CTA) |
| AboutPage | **Complete** — company overview, all 4 division cards, values checklist, dark CTA band |

---

## Deployment

**Platform:** Vercel  
**Deployed repo:** github.com/boulilazied/masjid-sound-solutions  
**SPA routing:** `vercel.json` uses negative-lookahead rewrite `/((?!api/).*)` → `/index.html` so `/api/*` reaches the serverless function.

**Vercel env vars required:**
- `EMAIL_USER` — Gmail address used to send (e.g. `azaudiosolutions@gmail.com`)
- `EMAIL_PASSWORD` — Gmail App Password (16-char, no spaces — generated at myaccount.google.com → Security → App passwords). **Not** the regular Gmail password.
- `EMAIL_TO` — recipient address (defaults to `contact@azaudios.com` if not set)

**Quote form flow (production):**  
Browser POST `/api/quote` → `api/quote.js` serverless function → Gmail SMTP port 465 (SSL) via nodemailer → email delivered to `EMAIL_TO`  
`from` header is the Gmail account; `replyTo` is set to the customer's email so replies go directly to them.

**Changing the Gmail account:** generate a new App Password for the new account, update `EMAIL_USER` and `EMAIL_PASSWORD` in Vercel, then redeploy.

---

## SEO

Goal: establish **AZ Audio Solutions** as the primary brand entity in Google while keeping the
four divisions intact (Google had been showing "Masjid Sound Solutions" as the homepage title).

**On-page / technical (in code):**
- `index.html` — brand-first `<title>`, description, `keywords`, `robots`, `canonical`, Open Graph /
  Twitter tags, and a **JSON-LD `@graph`**: `Organization` (`#organization`, `alternateName: azaudios`),
  `WebSite`, `LocalBusiness` (Pittsburgh, PA), and 4× `Service` — each Service linked to the org via
  `provider → @id` so search engines read AZ Audio Solutions as the parent and the four offerings as
  service divisions. These are the homepage defaults.
- `src/components/Seo.jsx` (`RouteSeo`) — mounted once in `Layout`. On every client-side route change it
  rewrites `document.title`, meta description, `<link rel="canonical">`, `robots`, and OG/Twitter tags from a
  per-route `META` map. Division titles read **"… — A Division of AZ Audio Solutions"** to reinforce the
  hierarchy. Unknown paths fall through to a dedicated `NOT_FOUND` entry and get `robots: noindex, follow`
  — Vercel's SPA rewrite answers every URL with HTTP 200, so without that they would be indexable
  soft-404s carrying the homepage title. **When you add a route, add it to `META` *and* `sitemap.xml`.**
- **Every route ships exactly one H1.** HomePage, the four division pages and 404 declare their own;
  `/services`, `/about` and `/contact` get theirs via `<SectionHeading as='h1'>`.
- `public/robots.txt` and `public/sitemap.xml` list all 8 real routes (incl. `/services`).

**Canonical routes** (use the real paths — NOT `/commercial`, `/residential`, `/events`):
`/` · `/masjid-sound-solutions` · `/commercial-audio` · `/residential-audio` · `/event-rental-services` ·
`/services` · `/about` · `/contact`.

**Off-page (not code):** see [`MARKETING-SEO.md`](MARKETING-SEO.md) — Google Business Profile kit, NAP
brand-consistency checklist, short bios, and Search Console steps. Brand ranking for "azaudios" / "AZ Audio"
is hard because it collides with established Arizona ("AZ") audio companies; the levers are GBP + consistent
citations + backlinks + time, not more code. Lead with the full name + "Pittsburgh, PA" everywhere.

**SPA caveat:** SEO depends on Google rendering JS. If indexing stays weak, prerendering/SSR (static HTML
per route) is the biggest available win — a build change, not a metadata tweak.

---

## Git workflow

- **Use `main` only.** For this repository, commit and push directly to `main` — do **not** create feature branches or PRs. (The single deployed branch is `main`; Vercel auto-deploys from it.)
- Push only when the user asks.

---

## Known quirks

- The `masjid` field is used in QuoteForm state, the POST body, and the server record. Renaming it to `organization` requires changing all three.
- `public/masjid-real/` contains older layout PNGs from a case study — may or may not be actively used.
- Local form submissions write to `server/submissions/quote-requests.json` (gitignored). Production submissions go to email via Gmail SMTP — no local file is written on Vercel.
- `api/quote.js` has no persistent storage — if email sending fails silently, the submission is lost. Add a database if submission logging is needed.
- `nodemon --watch server` is intentional — do not remove the flag or nodemon will watch the whole project and restart on every file save.
