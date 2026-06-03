# AZ Audio Solutions — Project Context

## Business

**Company:** AZ Audio Solutions  
**Rebranded from:** Masjid Sound Solutions (scope expanded beyond masjids — some legacy naming remains in the codebase)  
**Four divisions:** Masjid Sound Solutions · Commercial Audio · Residential Audio · Event Rental Services  
**Contact:** contact@azaudios.com · WhatsApp +1 724 831 0196 · +1 724 427 5661 · USA and Canada

---

## Tech stack

| Layer | Tool |
|---|---|
| Frontend | React 18 SPA, React Router DOM v6 |
| Build | Vite 5 |
| Backend (local) | Express 4 (`server/index.js`) — dev only |
| Backend (production) | Vercel serverless function (`api/quote.js`) |
| Email | `resend` package — sends quote submissions to contact@azaudios.com |
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

**Production form flow:** Browser → `/api/quote` → Vercel serverless (`api/quote.js`) → Resend email to contact@azaudios.com. Requires `RESEND_API_KEY` env var in Vercel dashboard.

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
  quote.js                        — Vercel serverless function; validates fields, sends email via Resend

src/
  App.jsx                         — router root, NotFound component
  styles.css                      — single CSS file (~3,250 lines)
  pages/
    HomePage.jsx                  — hero, stats strip, divisions grid, how-it-works, credentials, commitments, CTA band
    ServicesPage.jsx              — all four divisions via <DivisionPage>
    MasjidSoundSolutionsPage.jsx  — rich 13-section standalone page, lucide-react icons
    CommercialAudioPage.jsx       — full content via <StandardDivisionPage>
    ResidentialAudioPage.jsx      — full content via <StandardDivisionPage>
    EventRentalServicesPage.jsx   — rich 9-section standalone page (matches masjid page quality)
    AboutPage.jsx                 — company overview, all 4 divisions grid, values panel
    ContactPage.jsx               — SectionHeading + QuoteForm + contact card
  components/
    Layout.jsx                    — header (nav + hamburger menu), <main>, footer
    DivisionPage.jsx              — used only by ServicesPage; supports Icon (lucide) or logo (img)
    StandardDivisionPage.jsx      — reusable full-page template for Commercial/Residential/Event
    SectionHeading.jsx            — eyebrow + h2 + text, optional centered prop
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

> The following public images are **superseded** — do not restore them:
> - `masjid-why-specialized.png` — "Why Specialized" section is now a live HTML/CSS card grid
> - `masjid-brands-real.png` — brands section uses individual SVG tiles from `brand-logos/`
> - `masjid-process.png` — process section is now a 7-step HTML/CSS timeline
> - `masjid-zone-control-new.png` — DSP/zone control section replaced by live Zone Control Options and Audio Signal Flow sections

---

## Navigation

**Header nav:** Home · Masjid Sound Solutions · Commercial Audio · Residential Audio · Event Rental Services · About + "Request a Quote" CTA → `/contact`

**Footer divisions column:** links to all four division pages + `/services` (All Services)

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
- `.sys-arch-grid` / `.sys-arch-components` / `.sys-arch-component` / `.sys-arch-badge` / `.sys-arch-comp-icon` / `.sys-rack-visual` / `.sys-rack-frame` / `.sys-rack-unit` / `.sys-rack-amp` / `.sys-rack-amp-zones` / `.sys-rack-amp-zone-more` / `.sys-arch-inputs` / `.sys-input-row` / `.sys-input-icon` / `.sys-input-arrow` — 3-column system architecture section (component list + CSS rack visual + audio inputs). Amplifier shown as multi-zone (not fixed at 4).
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
- `RESEND_API_KEY` — Resend API key for quote form emails (get from resend.com)

**Quote form flow (production):**  
Browser POST `/api/quote` → `api/quote.js` serverless function → Resend email to contact@azaudios.com  
`from: onboarding@resend.dev` (change to `quotes@azaudios.com` once azaudios.com is verified in Resend)

---

## Known quirks

- The `masjid` field is used in QuoteForm state, the POST body, and the server record. Renaming it to `organization` requires changing all three.
- `public/masjid-real/` contains older layout PNGs from a case study — may or may not be actively used.
- Local form submissions write to `server/submissions/quote-requests.json` (gitignored). Production submissions go to email via Resend — no local file is written on Vercel.
- `api/quote.js` has no persistent storage — if email sending fails silently, the submission is lost. Add a database if submission logging is needed.
- `nodemon --watch server` is intentional — do not remove the flag or nodemon will watch the whole project and restart on every file save.
