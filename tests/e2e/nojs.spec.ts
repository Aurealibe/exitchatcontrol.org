import { expect, test } from '@playwright/test'
import { localePaths } from './helpers'

// Tor Browser "safest" mode is part of this site's audience: the FULL
// guide must be readable with JavaScript disabled. These run in the
// `nojs` project (javaScriptEnabled: false) — and still pass with JS on.
for (const path of localePaths) {
  test(`guide fully readable without JS on ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    // the guide's narrative sections are prerendered
    const sections = page.locator('main section[id]')
    expect(await sections.count()).toBeGreaterThan(10)
    // <details> is native HTML — install steps must open with JS off
    const details = page.locator('main details').first()
    if ((await details.count()) > 0) {
      await details.locator('summary').click()
      await expect(details).toHaveAttribute('open', '')
    }
    // the language switcher is a native <details> dropdown: it opens and
    // exposes plain links with no script at all
    await page.locator('[data-lang-menu] summary').click()
    await expect(page.locator('[data-lang-menu] a').first()).toBeVisible()
  })
}
