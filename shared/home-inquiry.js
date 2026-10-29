export const HOME_SERVICE = 'Home security & smart living'
export const HOME_PACKAGES = Object.freeze({
  essential: 'Essential Home Security',
  plus: 'Smart Home Plus',
  complete: 'Complete Connected Home'
})

export function validHomePackage(value) {
  return typeof value === 'string' && Object.hasOwn(HOME_PACKAGES, value) ? value : ''
}

export function homeInquiryPath(packageId = '') {
  const params = new URLSearchParams({ service: 'connected-home' })
  const selected = validHomePackage(packageId)
  if (selected) params.set('package', selected)
  return `/contact?${params}`
}
