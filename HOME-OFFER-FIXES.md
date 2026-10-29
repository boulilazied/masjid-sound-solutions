# Home offer fixes — local only

Implemented the overlap between the two October 29 audits:

- Package cards and comparison appear before exploratory solution sections.
- Package actions carry service and package into a home-specific inquiry, with an editable selection and context in production email and local development records.
- Home-specific form copy and consultation expectations replace a generic organization-first experience.
- A privacy notice linked from the form/footer explains the implemented hosting and email flow without inventing retention periods or legal guarantees.
- A Pittsburgh-based availability disclosure asks for location confirmation instead of promising unverified residential coverage in every state or Canada.
- Price-adjacent and detailed ownership-cost disclosures distinguish installation, app/cloud/connectivity costs, and optional monitoring without inventing fees.
- Home-only mobile call/consultation actions remain available while scrolling.

Business facts still required:

- Approved home installation radius and travel terms.
- Equipment platform, app, supported integrations and service fees.
- Genuine residential installation photographs and permission-cleared customer quotes. Generated images are illustrative and do not resolve the customer-proof gap.

No additional package counts or lower prices have been invented. Existing prices and survey-confirmed allowances remain intact. Technical SEO prerendering and logo optimization were outside the findings shared by both audits and are not included in this change.

No push or deployment is authorized by this local implementation request.

## Additional requested visual changes

- Main homepage: split hero with a new audio-installation illustration, visible mixer, rack and speakers; first-image placement adjusted for narrow screens.
- Home offer: generated entry and exterior concepts; dedicated small home-cinema illustration under optional audio, not in base packages.
- The furniture-led living-room candidate was rejected and is not shipped in the repository.
- All generated imagery is labeled illustrative. The old home flyer image was removed from the gallery claiming completed installations.
- Image prompts and destinations are in `generated-image-prompts.json`; optimized WebP assets are in `public/home-offer/`.

## Verification

- Final production build: passed (`npm run build`).
- Isolated quote contract tests: passed (`node scripts/test-home-quote.mjs`); covers all tiers, email context, invalid/custom selection, non-home submissions, escaping, validation and email failure. No mail sent.
- Browser checks: homepage image placement at the current narrow preview size, home package-to-contact context (Plus), optional cinema presentation, privacy route and content.
- Git whitespace check: passed. Existing `src/service-experience.css` edits preserved byte-for-byte.
- Exact 375px and wide desktop viewports were not independently exercised in this browser session; a complete accessibility audit and production delivery test remain outside verification.
- No commit, push, or deployment performed. Local preview: `http://127.0.0.1:5178/`.
