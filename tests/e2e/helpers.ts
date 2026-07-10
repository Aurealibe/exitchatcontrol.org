import { defaultLocale, locales } from '../../src/i18n/locales'

export { defaultLocale, locales }

/** ['/', '/fr/', '/nl/', …] derived from the locales tuple. */
export const localePaths = locales.map((l) => (l === defaultLocale ? '/' : `/${l}/`))
