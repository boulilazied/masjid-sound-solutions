import MasjidSoundSolutionsPage from './MasjidSoundSolutionsPage'

// Alias route for print collateral that wants clean attribution.
//
// The AMJA banner and flyers already in print encode /masjid-sound-solutions,
// so this route renders exactly that page. Kept live so QR codes from the
// conference collateral keep landing somewhere real; the lead-capture modal
// that used to open here was retired after the conference (see
// src/components/LeadCaptureModal.jsx — unmounted, kept for the next event).
export default function AmjaPage() {
  return <MasjidSoundSolutionsPage />
}
