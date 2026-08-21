# AZ Audio Solutions — Project Context

## Business

**Company:** AZ Audio Solutions  
**Rebranded from:** Masjid Sound Solutions (scope expanded beyond masjids — some legacy naming remains in the codebase)  
**Five divisions (canonical names — use these exact strings everywhere):** Masjid Sound Solutions · Commercial Audio Solutions · Residential Audio Solutions · Connected Home Solutions · Event Rental Services  
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
| `/connected-home` | ConnectedHomePage |
| `/event-rental-services` | EventRentalServicesPage |
| `/about` | AboutPage |
| `/contact` | ContactPage |
| `/amja` | AmjaPage → renders MasjidSoundSolutionsPage (campaign alias, noindex, canonical → `/masjid-sound-solutions`) |
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
    HomePage.jsx                  — cinematic photo hero (H1 "AZ Audio Solutions", slogan "Premium
                                    Quality. Affordable Cost.", division chips), stats strip, divisions
                                    grid, About + brand-hierarchy diagram, how-it-works gold timeline,
                                    "Our Work" photo band, credentials, equipment-standards brand grid,
                                    commitments, CTA band
    ServicesPage.jsx              — all four divisions via <DivisionPage>
    MasjidSoundSolutionsPage.jsx  — rich 13-section standalone page, lucide-react icons
    CommercialAudioPage.jsx       — full content via <StandardDivisionPage>
    ResidentialAudioPage.jsx      — full content via <StandardDivisionPage> + cross-link section to /connected-home
    ConnectedHomePage.jsx         — smart-home division page, laid out to echo the printed flyers: masthead with
                                    shield emblem, gold rule, Basic/Silver/Gold tier switcher driving a 12-tile
                                    numbered product grid + installed-price block, benefits bar, comparison table,
                                    add-ons, process, audio cross-link, CTA. Contents/prices/photography all come
                                    from the flyers.
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
  home/                           — home page imagery, re-encoded from existing assets (provenance below)
    hero-prayer.jpg               — full-bleed hero photograph (from masjid-prayer-wide-new.png)
    work-mics.jpg / work-rack.jpg / work-app.jpg / work-home.jpg — "Our Work" band
  masjid-app-zones.jpg            — real AtlasIED Atmosphere app screenshot (front panel)
  masjid-app-volume.jpg           — real Atmosphere app screenshot (zone source + volume) — MasjidSoundSolutionsPage
  smart-home/                     — 13 product shots + hero-home.jpg, all cropped from the smart-home flyers
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

> **Image provenance.** Everything under `public/smart-home/` was cropped out of the three
> Basic/Silver/Gold flyer JPEGs in `D:\work\masjidSoundSolutions\homes\` — product photos lifted from
> the tile grid, `hero-home.jpg` from the Silver flyer's left panel. The extraction script lives in the
> session scratchpad, not the repo; if the flyers are reissued, re-crop rather than hand-editing. Two
> traps when re-cropping: the tile caption text sits just below each product photo (crop too low and it
> bleeds in), and the flyer art has a **near-white backdrop rectangle** behind each product — pixels
> >= 246 are lifted to pure white so it does not read as a grey plate against the white tile.
>
> `public/home/` holds optimized JPEG re-encodings of photography already published elsewhere on the
> site — `hero-prayer.jpg` from `masjid-prayer-wide-new.png`, the work-band shots from the masjid
> photos and `smart-home/hero-home.jpg`, plus `work-app.jpg` from `ima4.png` in the assets folder.
> The originals are multi-MB PNGs and the hero is above the fold, so it must stay a compressed JPEG.
>
> `masjid-app-zones.jpg` / `masjid-app-volume.jpg` are real screenshots from an installed Atmosphere
> system. **The Safari toolbar was cropped off deliberately** — it showed the client's device IP
> (`10.0.0.240`). Keep it cropped on any replacement.
>
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

**Header nav:** Home · **Services** (dropdown → the five division pages) · About · phone link `+1 724 831 0196` · "Request a Quote" CTA → `/contact`. The phone link is hidden below 1080px. The dropdown is kept down to **760px** — below that `.main-nav` becomes a column behind the hamburger and the five service links render flat via `.nav-mobile-services`. Do not raise that 760px back to 1080px: five flat links do not fit in a horizontal row, and doing so pushes the header into horizontal overflow.

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

**Connected Home page classes** (`.smarthome-page` root):
- `[data-tier="basic|silver|gold"]` on the root drives `--tier` / `--tier-bright` / `--tier-panel`,
  which recolour the masthead, gold rule, tile badges, price block and table highlight together.
  React state sets the attribute; there is no per-tier stylesheet.
- `.sh-masthead` / `.sh-masthead-photo` / `.sh-masthead-wedge` / `.sh-masthead-panel` — the flyer
  masthead. The diagonal is two stacked `clip-path` polygons: the wedge paints `--tier`, the panel
  sits on top inset ~7px so the difference reads as a gold hairline. Both clips are dropped below 860px.
- `.sh-goldband` — the "A complete, fully-integrated smart home solution" rule
- `.sh-tier-tabs` / `.sh-tier-tab` — package switcher
- `.sh-tiles` / `.sh-tile` / `.sh-tile-badge` / `.sh-tile-media` / `.sh-tile-icon` — numbered product
  grid, 4 → 3 → 2 columns. `.sh-tile h3` carries a `min-height` so captions align across a row.
- `.sh-price-block` / `.sh-price-label` / `.sh-price-amount` / `.sh-price-tagline` / `.sh-price-cta`
- `.sh-benefits` / `.sh-benefits-row` / `.sh-benefit` — dark benefits bar
- The page re-declares the `--real-*` tokens on its root. They are otherwise only defined on
  `.masjid-clean-page`, and the shared `.clean-section` / `.real-eyebrow` / `.real-button` /
  `.why-card` / `.process-timeline` / `.final-consultation` components read them. **`.event-rental-page`
  does not declare them** — that page renders those components with unresolved custom properties.
- `.sh-table-wrap` / `.sh-table` / `.sh-th-featured` / `.sh-td-featured` / `.sh-cell-yes` / `.sh-cell-no`
  / `.sh-cell-spec` / `.sh-table-note` — package comparison table; the wrapper scrolls on its own below ~700px
- `.sh-crosslink` / `.sh-crosslink-icon` / `.sh-crosslink-copy` / `.sh-crosslink-cta` — Residential Audio band
- `.smarthome-page .process-timeline` is 6 columns and **outranks** the generic `.process-timeline`
  responsive rules — its 1080px/640px step-downs are declared explicitly. Same trap as `.event-rental-page`.
- This page uses its own `.sh-benefits` bar rather than the shared `.masjid-benefits-strip`, which
  does not wrap and clips its last item between 761px and 1080px. That pre-existing clipping still
  affects the masjid and event-rental pages.

**Five-division grid layout:** `.division-tabs` and `.about-div-grid` run on a 6-column track above
1080px with each card spanning 2, so five cards render 3 + 2-centered via `:nth-child(4)`/`:nth-child(5)`.
`.hero-div-chip--featured` spans the full row so the other four form a 2×2. **These rules hardcode five
items** — update them if the division count changes.

**Home page classes:**
- `.hp-hero` / `.hp-hero-media` / `.hp-hero-scrim` / `.hp-hero-inner` / `.hp-hero-eyebrow` /
  `.hp-hero-slogan` / `.hp-hero-lead` / `.hp-hero-actions` / `.hp-hero-chips` / `.hp-hero-chip` —
  full-bleed photo hero. `.hp-hero-media` is scaled 1.04 and clipped by the section's
  `overflow:hidden`, so it reports as overflowing in element-geometry audits while
  `body.scrollWidth` stays correct. `.hp-hero-scrim` stacks three gradients — do not reduce it to
  one, the chips need the bottom scrim to stay legible over the photo.
- `.hp-btn` / `.hp-btn-gold` / `.hp-btn-ghost` — hero buttons, separate from the global `.button`
- `.hp-tree` / `.hp-tree-parent` / `.hp-tree-stem` / `.hp-tree-branches` / `.hp-tree-node` — brand
  hierarchy diagram. Connector rule and stubs are dropped below 1080px once the row wraps.
  **The "A service division of AZ Audio Solutions for ..." phrasing is SEO-load-bearing — keep it.**
  Descriptors are stored already-lowercased in the `hierarchy` array; do not `.toLowerCase()` at
  render time, it mangles "PA".
- `.hp-work-grid` / `.hp-work-card` — "Our Work" photo band
- `.hp-timeline` — 4-column variant of the shared `.process-timeline`

**Do not re-add:**
- `.hero` / `.hero-grid` / `.hero-copy` / `.hero-text` / `.hero-subtitle` / `.hero-metrics` /
  `.hero-visual-wrap` / `.hero-visual-card` / `.hero-logo` / `.hero-logo-wide` / `.visual-kicker` /
  `.hero-div-preview-grid` / `.hero-div-chip*` — the old light split hero, replaced by `.hp-hero`
  on 2026-08-18 and deleted. `.hero-actions` survives and is still used by `StandardDivisionPage`.
- `.az-division-hierarchy` — five identical bordered rows, replaced by the `.hp-tree` diagram.
- `.phone-mockup` / `.phone-camera-dot` / `.phone-screen-header` / `.phone-zone-*` / `.phone-nav*` —
  a CSS-drawn fake phone showing invented zone names and volume percentages in the Zone Control
  section. Replaced on 2026-08-18 by `.zone-phone-shots` / `.zone-phone`, holding two real Atmosphere
  app screenshots. Real product evidence beats a mockup, and the mockup's four named zones conflicted
  with the "zone count is never fixed at four" rule above.
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

## Print-collateral lead capture (`/api/lead`)

Two-step modal (`src/components/LeadCaptureModal.jsx`) that captures leads from
the printed AMJA collateral. Setup docs: `GOOGLE-SHEET-SETUP.md`.

**Every printed QR code encodes `https://azaudios.com/masjid-sound-solutions`**
— verified by decoding `AMJA_ads.png`, `flyer1.png` and `QR_code.png` in the
sibling working folder. That is why the modal is mounted on
`MasjidSoundSolutionsPage`, not on a dedicated landing route. The print also
promises **"FREE AUDIO CONSULTATION — Scan to schedule"**, so the modal leads
with the consultation and treats the guide PDF as the bonus. Do not reverse
that emphasis: the landing page has to deliver what the flyer promised.

`/amja` is an alias for future print runs that want isolated attribution.

**Open behaviour:** immediate when the URL carries `?src=` or the path is
`/amja` (i.e. scan traffic); for organic visitors it waits for 14 s or 30%
scroll, so the division page is readable first. Dismissal is remembered per
session (`sessionStorage`), and a gold pill re-opens it.

**Fields sent:**
```js
{ name, masjid, city, email, phone, message, smsConsent,
  needs: [], timeline, event, source, clientId, submittedAt }
```
Required: `name`, `masjid`, `city`, `email`. `event` is `'AMJA'` for print
traffic and `'Website'` otherwise; `source` is the `?src=` value, else
`masjid-page` / `amja-qr`.

**Per submission `api/lead.js` does three independent things** (Promise.allSettled):
1. appends a row to the Google Sheet (skipped unless `LEAD_SHEET_WEBHOOK_URL` is set)
2. emails the internal notification to `EMAIL_TO`
3. emails the visitor a confirmation with `public/guides/masjid-sound-guide.pdf` attached

**The capture contract — do not weaken it.** It returns 200 only when the lead
reached the Sheet *or* the inbox, and 500 when it reached neither. The browser
keeps failed leads in `localStorage` and retries them on next load or `online`,
so a 200 tells the client it is safe to forget the lead. A skipped Sheet (no
webhook configured) must **not** count as a capture — that combination returning
200 would silently lose leads whenever Gmail is down. `npm run test:lead`
covers this; run it after touching `api/lead.js`.

Duplicate protection: the client generates a `clientId` per lead, the flush
claims its batch before sending and guards against concurrent runs, and both the
Apps Script and the local dev mirror skip a `clientId` they have already stored.

**Collateral generators** (committed output, re-runnable):
- `npm run build:guide` → `public/guides/masjid-sound-guide.pdf` (content lives in the `GUIDE` object in `scripts/build-guide-pdf.mjs`)
- `npm run build:marketing` → `marketing/amja/` QR codes (SVG + PNG, error correction H) and `booth-card.pdf`

---

## Division page status

| Page | Status |
|---|---|
| ConnectedHomePage | **Complete** — 9-section standalone page: hero, benefits strip, 12-component grid, Basic/Silver/Gold package cards, comparison table, optional add-ons, 6-step process, residential-audio cross-link, CTA |
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
- `LEAD_SHEET_WEBHOOK_URL` — *optional.* Apps Script Web App URL for the lead Sheet (see `GOOGLE-SHEET-SETUP.md`). Omit and `/api/lead` skips the Sheet and only emails.
- `SITE_ORIGIN` — *optional.* Fallback origin used to fetch the guide PDF if it is not on the function's disk. Defaults to `https://azaudios.com`.

`vercel.json` also declares `functions["api/lead.js"].includeFiles = "public/guides/**"` so the guide PDF ships with the function and can be attached without a network round-trip.

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
- `public/robots.txt` and `public/sitemap.xml` list all 9 real routes (incl. `/services`).

**Canonical routes** (use the real paths — NOT `/commercial`, `/residential`, `/events`, `/smart-home`):
`/` · `/masjid-sound-solutions` · `/commercial-audio` · `/residential-audio` · `/connected-home` ·
`/event-rental-services` · `/services` · `/about` · `/contact`.

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
- `server/index.js` reads **`API_PORT`**, not `PORT`. It runs alongside Vite under `npm run dev`, and tooling that injects a generic `PORT` (IDE run configs, preview harnesses) would otherwise make Express bind Vite's port, leaving the `/api` proxy connecting to nothing. Keep it in sync with the proxy target in `vite.config.js` (3001).
- `server/index.js` mirrors `/api/lead` by writing to `server/submissions/leads.json` (gitignored). It sends no email and touches no Sheet, so local testing never mails a real address.
- The lead modal is mounted inside `MasjidSoundSolutionsPage`, not in `Layout`. Moving it to `Layout` would show it on every page of the site.
