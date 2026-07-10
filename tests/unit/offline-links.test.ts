import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { defaultLocale, locales } from '../../src/i18n/locales'

// The offline artifacts open from file://, where a root-absolute href
// ("/fr/quiz", "/fr/#toc") silently points at the reader's filesystem.
// Regression guard (the quiz nav links shipped exactly that): every <a>
// inside an offline artifact must be external (https://), relative to a
// sibling artifact ("./…"), or an in-page anchor ("#…").
//
// Requires `pnpm build` first (CI builds before testing).

const DIST = 'dist'

const artifacts = locales.flatMap((locale) => {
  const suffix = locale === defaultLocale ? '' : `.${locale}`
  return [`exitchatcontrol-offline${suffix}.html`, `exitchatcontrol-quiz-offline${suffix}.html`]
})

describe.skipIf(!existsSync(DIST))('offline artifacts', () => {
  for (const name of artifacts) {
    it(`${name} ships and contains no root-absolute link`, () => {
      const path = join(DIST, name)
      expect(existsSync(path), `${name} missing from dist/`).toBe(true)
      const html = readFileSync(path, 'utf8')
      const offenders = [...html.matchAll(/<a\s[^>]*href="(\/[^"]*)"/gi)].map((m) => m[1])
      expect(offenders, 'root-absolute hrefs break from file://').toEqual([])
    })
  }
})
