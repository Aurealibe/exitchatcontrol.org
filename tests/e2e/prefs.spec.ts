import { expect, test } from '@playwright/test'

test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'prefs need JS')

test('theme toggle persists across reloads', async ({ page }) => {
  await page.goto('/')
  const before = await page.evaluate(() => document.documentElement.dataset.theme || '')
  await page.locator('[data-theme-toggle]').click()
  const after = await page.evaluate(() => document.documentElement.dataset.theme)
  expect(after).toMatch(/^(light|dark)$/)
  expect(after).not.toBe(before)
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', after!)
})

test('explicit language choice is remembered on the root', async ({ page }) => {
  await page.goto('/')
  // pick French from the dropdown: stores ecc-lang and navigates
  await page.locator('[data-lang-menu] summary').click()
  await page.locator('[data-lang-choice="fr"]').click()
  await page.waitForURL('**/fr/')
  // back to the root: the boot script honors the stored choice
  await page.goto('/')
  await page.waitForURL('**/fr/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  // switching back to English sticks too (no redirect loop)
  await page.locator('[data-lang-menu] summary').click()
  await page.locator('[data-lang-choice="en"]').click()
  await page.waitForURL((url) => url.pathname === '/')
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('checklist state survives a reload (when present)', async ({ page }) => {
  await page.goto('/')
  const box = page.locator('[data-checklist] input[type="checkbox"]').first()
  test.skip((await box.count()) === 0, 'checklist not yet wired')
  await box.check()
  await page.reload()
  await expect(page.locator('[data-checklist] input[type="checkbox"]').first()).toBeChecked()
})
