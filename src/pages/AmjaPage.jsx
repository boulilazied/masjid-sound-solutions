import MasjidSoundSolutionsPage from './MasjidSoundSolutionsPage'

// Alias route for print collateral that wants clean attribution.
//
// The AMJA banner and flyers already in print encode
// /masjid-sound-solutions, which mounts the capture modal itself. This route
// renders exactly that page so any *future* print run can point at
// azaudios.com/amja instead and have its traffic separated in the lead log —
// the modal reads the pathname and tags the lead accordingly.
export default function AmjaPage() {
  return <MasjidSoundSolutionsPage />
}
