import { defaultLocale, locales } from '../../src/i18n/locales'
import { fullGuideSlugs, pageSlugs } from '../../src/i18n/slugs'

export { defaultLocale, locales }

const prefix = (l: (typeof locales)[number]) => (l === defaultLocale ? '' : `/${l}`)

/** ['/', '/fr/', '/nl/', …] derived from the locales tuple: each locale home
    is the whole guide on one page. */
export const localePaths = locales.map((l) => `${prefix(l)}/`)

/** Former one-page guide URLs ('/full-guide/', '/fr/guide-complet/'…), now
    redirecting to the locale home. */
export const legacyFullGuidePaths = locales.map((l) => [
  `${prefix(l)}/${fullGuideSlugs[l]}/`,
  `${prefix(l)}/`,
])

/** A sample of the SEO pages: a section, a tool, a dataset page. */
export const samplePages = (['en', 'fr', 'de'] as const).flatMap((l) => [
  `${prefix(l)}/${pageSlugs.messagerie[l]}/`,
  `${prefix(l)}/${pageSlugs.messagerie[l]}/signal/`,
  `${prefix(l)}/${pageSlugs.directory[l]}/`,
])

/** The migration checklist page (holds the checkbox state). */
export const checklistPath = `/${pageSlugs.checklist.en}/`
