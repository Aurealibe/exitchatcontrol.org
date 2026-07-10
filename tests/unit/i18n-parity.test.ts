import { describe, expect, it } from 'vitest'
import en from '../../src/i18n/en.json'
import fr from '../../src/i18n/fr.json'
import nl from '../../src/i18n/nl.json'
import { defaultLocale, locales } from '../../src/i18n/locales'

// Every locale dictionary must have exactly the English key shape:
// a missing key would silently fall back to English in production.
function keyPaths(node: unknown, prefix = ''): string[] {
  if (typeof node === 'string') return [prefix]
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k))
  }
  return [prefix]
}

const dicts: Record<string, unknown> = { en, fr, nl }

describe('i18n dictionary parity', () => {
  it('declares a dictionary for every locale', () => {
    for (const locale of locales) expect(dicts[locale], `src/i18n/${locale}.json`).toBeDefined()
  })

  const reference = keyPaths(dicts[defaultLocale]).sort()

  for (const locale of locales.filter((l) => l !== defaultLocale)) {
    it(`${locale}.json matches the ${defaultLocale}.json key shape`, () => {
      const keys = keyPaths(dicts[locale]).sort()
      expect(keys).toEqual(reference)
    })
  }

  it('has no empty strings', () => {
    for (const [locale, dict] of Object.entries(dicts)) {
      const walk = (node: unknown, path: string) => {
        if (typeof node === 'string') {
          expect(node.trim(), `${locale}:${path}`).not.toBe('')
        } else if (node && typeof node === 'object') {
          for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`)
        }
      }
      walk(dict, locale)
    }
  })
})
