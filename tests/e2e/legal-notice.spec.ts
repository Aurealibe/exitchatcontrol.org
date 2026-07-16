import { expect, test } from '@playwright/test'
import { localePaths } from './helpers'

test('the legal notice is an English-only static page', async ({ page }) => {
  await page.goto('/legal-notice')

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { level: 1, name: 'Legal Notice' })).toBeVisible()
  await expect(page.getByText('Publication director:')).toBeVisible()
  await expect(page.getByText('Hostinger International Ltd.')).toBeVisible()
  await expect(page.getByText('does not collect or process any personal data')).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://exitchatcontrol.org/legal-notice',
  )
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0)
})

for (const path of localePaths) {
  test(`the footer links to the legal notice from ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('footer a[href="/legal-notice"]')).toHaveText('Legal notice')
  })
}
