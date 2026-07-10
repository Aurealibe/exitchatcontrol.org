// Renders scripts/og.html (1200×630) to public/og.png via Playwright's
// bundled chromium — no hand-rolled browser driving, no image dependency.
// Run: node scripts/gen-og.mjs
import { chromium } from '@playwright/test'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(new URL('./og.html', import.meta.url).href)
await page.screenshot({ path: 'public/og.png' })
await browser.close()
console.log('[gen-og] public/og.png regenerated (1200×630)')
