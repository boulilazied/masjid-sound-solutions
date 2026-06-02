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
| Backend | Express 4 |
| Icons | `lucide-react` — used in MasjidSoundSolutionsPage and StandardDivisionPage |
| Dev runner | `concurrently` (client + server in parallel) |
| Server hot-reload | `nodemon` |
| CORS | `cors` package, env-var allowlist (`ALLOWED_ORIGINS`) |
| Form storage | `server/submissions/quote-requests.json` (append-only local JSON) |

**Dev commands:**
- `npm run dev` — Vite (port 5173) + Express (port 3001)
- `npm run build` — production build
- `npm run preview` — preview build (port 4173)

**Vite proxy:** `/api` → `http://localhost:3001` in dev.

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
src/
  App.jsx                         — router root, NotFound component
  styles.css                      — single CSS file (~2,159 lines)
  pages/
    HomePage.jsx                  — hero, divisions grid, how-it-works, CTA band
    ServicesPage.jsx              — all four divisions via <DivisionPage>
    MasjidSoundSolutionsPage.jsx  — rich standalone page, custom CSS, lucide-react icons
    CommercialAudioPage.jsx       — full content via <StandardDivisionPage>
    ResidentialAudioPage.jsx      — full content via <StandardDivisionPage>
    EventRentalServicesPage.jsx   — full content via <StandardDivisionPage>
    AboutPage.jsx                 — company overview, all 4 divisions grid, values panel
    ContactPage.jsx               — SectionHeading + QuoteForm + contact card
  components/
    Layout.jsx                    — header (nav + hamburger menu), <main>, footer
    DivisionPage.jsx              — used only by ServicesPage; supports icon (SVG path) or logo (img)
    StandardDivisionPage.jsx      — reusable full-page template for Commercial/Residential/Event
    SectionHeading.jsx            — eyebrow + h2 + text, optional centered prop
    QuoteForm.jsx                 — controlled form, POSTs to /api/quote

server/
  index.js                        — Express server, /api/health, /api/quote
  submissions/
    quote-requests.json           — form submission storage

public/
  logo-az.png                     — main AZ Audio logo (wide)
  logo-az-transparent.png         — transparent version for footer
  logo-masjid-division.png        — Masjid Sound Solutions division logo
  az-masjid-audio-logo-clean.png  — hero logo in MasjidSoundSolutionsPage
  masjid-prayer-wide-new.png      — hero background (MasjidSoundSolutionsPage)
  masjid-khutba-mics-new.png      — microphone section image
  masjid-rack-room-new.png        — equipment rack section image
  masjid-multi-zone-layout.png    — zone layout diagram
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
- `.why-grid` / `.why-card` / `.why-icon` — 6-card grid for the "Why Specialized" section (3-col → 2-col → 1-col at breakpoints). Cards use **lucide-react** components (not inline SVG paths).
- `.brand-grid-clean` / `.clean-brand-tile` — 4-col partner brand logo grid using SVG files from `public/brand-logos/`.
- `.process-timeline` / `.process-step` / `.process-step-badge` / `.process-step-vline` / `.process-step-circle` / `.process-step-body` / `.process-commitment` — 7-step horizontal timeline with numbered badges, lucide icon circles, and a gold connecting line.
- `.zone-control-grid` / `.zone-option-card` / `.zone-option-header` / `.phone-mockup` / `.phone-zone-row` / `.phone-nav` / `.wall-mockup` / `.wall-zone-led` / `.wall-knob` / `.wall-mute-btn` / `.zone-option-features` — two-card zone control options section (phone mockup + wall panel mockup).
- `.signal-flow-diagram` / `.signal-sources` / `.signal-zones-output` / `.signal-node` / `.signal-node-icon` / `.signal-arrow` / `.signal-arrow-col` / `.signal-zone-badge` / `.signal-zone-output-item` / `.signal-col-label` — horizontal audio signal flow diagram (Sources → Mixer → DSP → Amplifier → 4 Zones).

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
| MasjidSoundSolutionsPage | **Complete** — rich standalone page: hero, why-grid, mic section, zone layout, zone control options, signal flow, rack, process timeline, brands, CTA |
| CommercialAudioPage | **Complete** — full content via `StandardDivisionPage` (6 services, 5 why-us points) |
| ResidentialAudioPage | **Complete** — full content via `StandardDivisionPage` (6 services, 5 why-us points) |
| EventRentalServicesPage | **Complete** — full content via `StandardDivisionPage` (6 services, 5 why-us points) |
| AboutPage | **Complete** — company overview, all 4 division cards, values checklist, dark CTA band |

---

## Known quirks

- The `masjid` field is used in QuoteForm state, the POST body, and the server record. Renaming it to `organization` requires changing all three.
- `public/masjid-real/` contains older layout PNGs from a case study — may or may not be actively used.
- No admin view for form submissions — they are stored raw in `server/submissions/quote-requests.json`.
- `nodemon --watch server` is intentional — do not remove the flag or nodemon will watch the whole project and restart on every file save.
