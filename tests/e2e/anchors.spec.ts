import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { localePaths } from './helpers'

// Legacy deep links (/#messagerie, /#t-signal…) are shared all over the
// place — every anchor id from the old index.html must resolve on every
// locale page. The inventory is produced by migration/extract.mjs.
// Four legacy ids were toggle BUTTONS in the old chrome (never link
// targets, nothing on the web points at them) — the new chrome replaces
// them, so they are deliberately not preserved.
const LEGACY_CHROME_IDS = new Set(['lang-fr', 'lang-en', 'lang-nl', 'theme'])

const inventory = (
  JSON.parse(
    readFileSync(new URL('../../migration/inventory/anchors.json', import.meta.url), 'utf8'),
  ) as string[]
).filter((id) => !LEGACY_CHROME_IDS.has(id))

for (const path of localePaths) {
  test(`all ${inventory.length} legacy anchors exist on ${path}`, async ({ page }) => {
    await page.goto(path)
    const present = await page.evaluate(
      (ids) => ids.filter((id) => !document.getElementById(id)),
      inventory,
    )
    expect(present, 'missing legacy anchor ids').toEqual([])
  })
}
