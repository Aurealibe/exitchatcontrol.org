import { defaultLocale, locales } from '../../src/i18n/locales'
import { pageSlugs } from '../../src/i18n/slugs'

export { defaultLocale, locales }

const prefix = (l: (typeof locales)[number]) => (l === defaultLocale ? '' : `/${l}`)

/** ['/', '/fr/', '/nl/', …] derived from the locales tuple: the hub pages. */
export const localePaths = locales.map((l) => `${prefix(l)}/`)

/** The whole guide on one page, per locale ('/full-guide/', '/fr/guide-complet/'…). */
export const fullGuidePaths = locales.map((l) => `${prefix(l)}/${pageSlugs.full[l]}/`)

/** A sample of the split guide's pages: a section, a tool, a dataset page. */
export const samplePages = (['en', 'fr', 'de'] as const).flatMap((l) => [
  `${prefix(l)}/${pageSlugs.messagerie[l]}/`,
  `${prefix(l)}/${pageSlugs.messagerie[l]}/signal/`,
  `${prefix(l)}/${pageSlugs.directory[l]}/`,
])

/** The migration checklist page (holds the checkbox state). */
export const checklistPath = `/${pageSlugs.checklist.en}/`
