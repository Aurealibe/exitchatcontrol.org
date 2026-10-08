import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { fullGuidePaths } from './helpers'

// Legacy deep links (/#messagerie, /#t-signal…) are shared all over the
// place. The inventory is produced by migration/extract.mjs. Every anchor
// id must still exist on the one-page guide of every locale, and a legacy
// link to the hub must land on the new page of that section or tool.
// Four legacy ids were toggle BUTTONS in the old chrome (never link
// targets, nothing on the web points at them) — the new chrome replaces
// them, so they are deliberately not preserved.
const LEGACY_CHROME_IDS = new Set(['lang-fr', 'lang-en', 'lang-nl', 'theme'])

const inventory = (
  JSON.parse(
    readFileSync(new URL('../../migration/inventory/anchors.json', import.meta.url), 'utf8'),
  ) as string[]
).filter((id) => !LEGACY_CHROME_IDS.has(id))

for (const path of fullGuidePaths) {
  test(`all ${inventory.length} legacy anchors exist on ${path}`, async ({ page }) => {
    await page.goto(path)
    const present = await page.evaluate(
      (ids) => ids.filter((id) => !document.getElementById(id)),
      inventory,
    )
    expect(present, 'missing legacy anchor ids').toEqual([])
  })
}

test.describe('legacy hub anchors forward to the split pages', () => {
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'forwarding needs JS')

  const cases: [string, RegExp][] = [
    ['/#messagerie', /\/encrypted-messaging\/$/],
    ['/#t-signal', /\/encrypted-messaging\/signal\/$/],
    ['/fr/#vpn', /\/fr\/vpn\/$/],
    ['/fr/#t-veracrypt', /\/fr\/stockage-chiffre\/veracrypt\/$/],
    ['/de/#directory', /\/de\/open-source-verzeichnis\/$/],
    ['/#tl-unknown-anchor', /\/full-guide\/#tl-unknown-anchor$/],
  ]
  for (const [from, to] of cases) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from)
      await page.waitForURL(to)
    })
  }

  test('an anchor present on the hub stays put', async ({ page }) => {
    await page.goto('/#menace')
    await expect(page.locator('#menace')).toBeVisible()
    expect(new URL(page.url()).pathname).toBe('/')
  })
})
