import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { localePaths } from './helpers'

// WCAG 2 A/AA on every locale, in BOTH themes. The theme override is
// applied exactly like the boot script does (data-theme on <html>).
test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'axe needs JS')

for (const path of localePaths) {
  for (const theme of ['light', 'dark'] as const) {
    test(`axe WCAG A/AA · ${path} · ${theme}`, async ({ page }) => {
      // documentElement doesn't exist yet at init-script time — go through
      // localStorage, which the theme boot script applies before first paint.
      await page.addInitScript((t) => {
        localStorage.setItem('ecc-theme', t)
      }, theme)
      await page.goto(path)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
      expect(
        results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`),
      ).toEqual([])
    })
  }
}
