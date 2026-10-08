// THE single place where the site's languages are declared.
// Adding a language: extend this tuple, then create src/i18n/<code>.json
// and the content translations. astro.config.mjs, the routes, the sitemap
// and the hreflang cluster all derive from this tuple.
export const locales = ['en', 'fr', 'nl', 'de', 'es', 'cs', 'hu'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  nl: 'Nederlands',
  de: 'Deutsch',
  es: 'Español',
  cs: 'Čeština',
  hu: 'Magyar',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  nl: '🇳🇱',
  de: '🇩🇪',
  es: '🇪🇸',
  cs: '🇨🇿',
  hu: '🇭🇺',
}

// Open Graph locale codes (language_TERRITORY), for og:locale tags.
export const ogLocales: Record<Locale, string> = {
  en: 'en_GB',
  fr: 'fr_FR',
  nl: 'nl_NL',
  de: 'de_DE',
  es: 'es_ES',
  cs: 'cs_CZ',
  hu: 'hu_HU',
}
