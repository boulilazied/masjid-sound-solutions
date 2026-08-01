# Audit Remediation — 2026-08-01

Companion to [AUDIT-2026-08-01.md](AUDIT-2026-08-01.md). This is what actually changed, what was
deliberately left alone, and what still needs the owner.

**Verification:** `npm run build` succeeds (1773 modules, 18.2 s). All nine routes checked in a
browser against the production build — one `<h1>` each, correct titles, correct `robots`, no broken
images, no console errors, no horizontal overflow at 375 px.

**Deployed.** Committed as `37462a0` and pushed to `main` on 2026-08-01; Vercel built and shipped it
(live bundle `index-BqLWW3Kv.js`). Every fix was re-verified against production afterwards.

> **Note on the pruned assets:** `azaudios.com/masjid-real/full-final-layout.png` and friends still
> answer **HTTP 200** — but the body is byte-identical to `index.html` (same md5), because Vercel's
> SPA rewrite catches any unmatched path. The files are genuinely gone; the URL just falls through to
> the app shell instead of a 404. Do not read that 200 as "the asset is still there".

---

## Content and claims

**`src/pages/HomePage.jsx`**
- Deleted the three fabricated testimonials and the whole testimonials section.
- Replaced the stats strip. Was `25+ Projects Completed` · `10+ Masjids Served` · `Free Initial
  Consultation` · `100% Transparent Pricing`. Now:

  | Value | Label | Why it's defensible |
  |---|---|---|
  | `4` | Service Divisions | Countable — the four division pages |
  | `Free` | Initial Consultation | A policy the business controls |
  | `MSc` | Signal Processing Engineer | The credential already stated on `/about` |
  | `100%` | Itemized Proposals | A policy, already promised in the commitments section |

  No project counts, client counts, or years-in-business. A comment in the file states the rule.
- Added an **Equipment Standards** section in the testimonials' place — the eight-logo brand grid
  (reusing existing `.brand-grid-clean` styles and SVGs) under *"Built with proven professional AV
  equipment"*, framed as equipment we specify, explicitly **not** as partnership. The page keeps its
  visual rhythm without the removed section leaving a hole.
- Division card titles and the About-hierarchy list moved to canonical names.

**`src/pages/MasjidSoundSolutionsPage.jsx`**
- Signal-flow diagram: `4-CH AMPLIFIER` → `MULTI-ZONE AMPLIFIER`, `4 ZONES OUTPUT` → `ZONE OUTPUTS`,
  plus a `.signal-zone-note` caption reading *"Example layout — zones scale to your masjid"*. The four
  named zones stay as an illustration, now labelled as one.
- Warranty wording: *"a full warranty"* → *"full manufacturer warranty coverage on every component we
  supply"*.
- Brands eyebrow: *"Partnering with industry leaders"* → *"Equipment we build with"*.
- H1: *"Trusted solutions for sacred spaces."* → *"Masjid sound systems built for sacred spaces."*

---

## Naming consistency

Canonical division names, now identical in nav, footer, every card, `Seo.jsx` and the JSON-LD `@graph`:

```
Masjid Sound Solutions
Commercial Audio Solutions
Residential Audio Solutions
Event Rental Services
```

Touched: `Layout.jsx` · `HomePage.jsx` · `AboutPage.jsx` · `ServicesPage.jsx` ·
`CommercialAudioPage.jsx` · `ResidentialAudioPage.jsx` · `Seo.jsx` · `index.html`.

The footer services list now maps over the same `serviceLinks` array the header nav uses, so the two
cannot drift apart again.

> Chose `Event Rental Services` over `Event Audio Solutions` because it matches the route
> (`/event-rental-services`), the nav, the footer and the page's own eyebrow — three places to change
> versus one, and the service genuinely is rental.

---

## SEO

**`src/components/SectionHeading.jsx`** — new `as` prop (defaults to `h2`). Pages with no other
page-level heading pass `as='h1'`. CSS updated so `.section-heading h1` matches the existing h2 sizing.

**H1 added to** `/services` (via `DivisionPage`), `/about`, `/contact`, and the 404 component. Cards
inside `/services` demoted `h3` → `h2` to keep the outline valid; `.division-detail-card h3` renamed
to `h2` in `styles.css`.

**`src/components/Seo.jsx`**
- Added a `NOT_FOUND` metadata entry. Unknown paths no longer inherit homepage title/description.
- Now writes a `robots` meta on every route: `index, follow, max-image-preview:large, max-snippet:-1`
  for known routes, `noindex, follow` for unknown ones. Written on every route change rather than only
  on 404, so the tag can't go stale when navigating away from a 404.
- Event division title/description corrected to `Event Rental Services`.

**`public/sitemap.xml`** — `/services` added (priority 0.7). Now 8 of 8 routes.

**`src/components/DivisionPage.jsx`** — each card gained an "Explore …" link to its division page
alongside the existing quote button, in a new `.division-detail-actions` flex row. `/services` is no
longer a dead end.

---

## Exposure

**`src/components/Layout.jsx`** — LinkedIn social link removed (404), with a comment.
**`index.html`** — matching `linkedin.com/company/azaudiosolutions` entry removed from JSON-LD `sameAs`.

**`public/` pruned: 57 files / 47 MB → 19 files / 9.7 MB.** Removed via `git rm` so it's all
recoverable from history. Deleted:

- `masjid-real/` (8 files) — client floor plans and rack architecture
- `brochure-front.png`, `brochure-back.png`, `catalog-masjid-grid.png` — print collateral
- `masjid-why-specialized.png`, `masjid-brands-real.png`, `masjid-process.png`,
  `masjid-zone-control.png`, `masjid-zone-control-new.png` — superseded by live HTML/CSS sections
- `brand-{atlasied,dbx,jbl,qsc,rcf,sennheiser,shure,yamaha}.svg` — eight zero-byte root-level stubs
- `masjid-khutba-mics.png`, `masjid-prayer-wide.png`, `masjid-rack-room.png` — pre-`-new` variants
- `logo.png`, `az-masjid-audio-logo-transparent.png`, `az-masjid-logo-transparent.png`,
  `masjid-audio-hero.svg`, `realistic-zone-control.svg`, `equipment-*.svg` (4)

`robots.txt` and `sitemap.xml` retained — they are referenced by URL, not by filename, so a naive
"unreferenced" sweep would wrongly flag them.

---

## Housekeeping

- `CommercialAudioPage.jsx` — removed unused `Link` import.
- `styles.css` — deleted the now-dead `.testimonial*` rules and their two responsive overrides;
  added `.signal-zone-note` and `.division-detail-actions`.
- `CLAUDE.md` — corrected all six drifted claims and added a **Public claims policy** section
  codifying the #1 rules (no invented social proof, no invented metrics, no unearned status claims,
  no open-ended guarantees) so this does not recur.

---

## Deliberately not changed

- **Hero "View Services" → `#divisions` anchor.** Points at the on-page division grid rather than
  `/services`. Now that `/services` is in the sitemap and linked from the footer with working
  outbound links, this is a design choice, not a defect.
- **Event page H1** (*"Professional audio for every event."*) left as-is — its eyebrow already carries
  *"AZ Audio — Event Rental Services"*, so the keyword is present. Unlike the masjid page, which had none.
- **`server/index.js` writes JSON and never sends email** — local dev only; production uses
  `api/quote.js`. Pre-existing, documented, correct.
- **SPA / no prerendering** — the real SEO ceiling, but a build-architecture change.

---

## Still needs you

1. **Two consolidation steps are still outstanding** — the agent sandbox refused them. See the
   *Consolidation* section at the end of this file for the exact commands and the safety checks that
   were run first.

2. **Confirm the two remaining credential claims are accurate**, since they now carry more weight with
   the testimonials gone: the *Master's degree in signal processing* and the *practicing imam on the
   team*. Both appear on `/` and `/about`, and `MSc` is now in the stats strip. If either is aspirational
   rather than factual, tell me and I'll rewrite those sections the same way.

3. **Optional — LinkedIn.** Create the company page and I'll restore the footer link and the `sameAs`
   entry together.

4. **Optional — a real workmanship warranty.** If you offer one, give me the term and I'll state it
   explicitly instead of the current manufacturer-only wording.

---

## Consolidation — one site

Audited 2026-08-01. The duplication was: two local working copies of this repo, and three remote
branches. One Vercel deployment only (`masjidsoundsolutions.com` does not resolve).

**Done:** `main` pushed and deployed.

**Blocked — run these manually.** Both were refused by the agent sandbox's permission classifier;
both are safe, and both were verified first.

```sh
# 1. Delete the two dead remote branches.
#    Verified: `git rev-list --count origin/main..origin/<branch>` == 0 for both,
#    i.e. neither holds a single commit that is not already in main.
git push origin --delete master
git push origin --delete seo/az-audio-brand-authority
git branch -D seo/az-audio-brand-authority        # local copy
git fetch --prune origin

# 2. Delete the stale second working copy.
#    Clean tree, no stashes, one commit (7099440) that was never pushed anywhere.
#    Archived first — restore with: git clone website-archive-2026-08-01.bundle
rm -rf "D:/work/masjidSoundSolutions/website"
```

Archive: `D:\work\masjidSoundSolutions\website-archive-2026-08-01.bundle` (105 KB, `git bundle
verify` reports a complete history). Delete it too once you are sure you want nothing from that
old version.
