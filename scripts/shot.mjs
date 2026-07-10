// Quick visual QA: screenshots a built page region in a given theme.
// Usage: node scripts/shot.mjs <url-path> <out.png> [dark|light] [#anchor]
// Requires `pnpm preview` (or any server) on 127.0.0.1:4321.
import { chromium } from '@playwright/test'

const [path = '/', out = 'shot.png', theme = 'dark', anchor = ''] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
// documentElement doesn't exist yet at init-script time — go through
// localStorage, which the theme boot script applies before first paint.
await page.addInitScript((t) => localStorage.setItem('ecc-theme', t), theme)
await page.goto(`http://127.0.0.1:4321${path}`)
if (anchor) {
  /* global document -- runs inside the browser via page.evaluate */
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, anchor.slice(1))
  await page.waitForTimeout(150)
}
await page.screenshot({ path: out })
await browser.close()
console.log(`[shot] ${out} ← ${path}${anchor} (${theme})`)
