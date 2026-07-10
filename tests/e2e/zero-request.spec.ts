import { expect, test } from '@playwright/test'
import { localePaths } from './helpers'

// The site's core promise, enforced: not a single request leaves for a
// third-party host. Fonts, icons, styles, scripts — everything same-origin.
for (const path of localePaths) {
  test(`zero third-party requests on ${path}`, async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin
    const offenders: string[] = []
    page.on('request', (req) => {
      const url = new URL(req.url())
      if (url.origin !== origin && url.protocol !== 'data:') offenders.push(req.url())
    })
    await page.goto(path, { waitUntil: 'networkidle' })
    // scroll to the bottom to trigger any lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    expect(offenders).toEqual([])
  })
}
