/* Renders public/og.png (1200×630) and public/apple-touch-icon.png (180×180)
   from the token-faithful rigs scripts/og.html + scripts/icon.html using the
   local Chrome — zero image dependency in the repo. Run: node scripts/gen-og.mjs */
import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const chrome = existsSync(CHROME) ? CHROME : 'google-chrome'

function shoot(rig, out, size) {
  const src = fileURLToPath(new URL(rig, import.meta.url))
  const dest = fileURLToPath(new URL(out, import.meta.url))
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${size}`,
    `--screenshot=${dest}`,
    `file://${src}`,
  ])
  console.log(`${out}: ${Math.round(statSync(dest).size / 1024)} KB`)
}

shoot('og.html', '../public/og.png', '1200,630')
shoot('icon.html', '../public/apple-touch-icon.png', '180,180')
