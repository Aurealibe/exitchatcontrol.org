import en from './en.json'
import fr from './fr.json'
import nl from './nl.json'
import { defaultLocale, locales, type Locale } from './locales'

export { locales, defaultLocale, localeNames, localeFlags, type Locale } from './locales'

type Dict = typeof en
// fr/nl are type-checked against the English shape: a missing key is a
// build error, not a silent English fallback.
const dicts: Record<Locale, Dict> = { en, fr, nl }

function lookup(dict: Dict, path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (node && typeof node === 'object' && key in node) {
      return (node as Record<string, unknown>)[key]
    }
    return undefined
  }, dict)
}

/** Returns the UI string for `path` in `locale`, falling back to English. */
export function useT(locale: Locale) {
  return (path: string): string => {
    const hit = lookup(dicts[locale], path) ?? lookup(dicts[defaultLocale], path)
    if (typeof hit !== 'string') {
      throw new Error(`Missing i18n key "${path}" (locale: ${locale})`)
    }
    return hit
  }
}

/** Path prefix for a locale: '' for the default locale (served at /). */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`
}

/** The non-default locales, e.g. for getStaticPaths of the [lang] route. */
export const translatedLocales = locales.filter((l) => l !== defaultLocale)
