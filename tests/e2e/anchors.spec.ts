import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { legacyFullGuidePaths, localePaths } from './helpers'

// Legacy deep links (/#messagerie, /#t-signal…) are shared all over the
// place. The inventory is produced by migration/extract.mjs. Every anchor
// id must still exist on the one-page guide (the home) of every locale.
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

test('in-text links to a section stay on the one-page guide', async ({ page }) => {
  await page.goto('/fr/')
  const link = page.locator('#menace a[href="#vpn"]').first()
  await expect(link).toHaveCount(1)
  await link.click()
  expect(new URL(page.url()).pathname).toBe('/fr/')
  await expect(page.locator('#vpn')).toBeInViewport()
})

test.describe('old one-page guide URLs redirect to the home', () => {
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'meta refresh only')
  for (const [from, to] of legacyFullGuidePaths) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from)
      await page.waitForURL((url) => url.pathname === to)
    })
  }
})
