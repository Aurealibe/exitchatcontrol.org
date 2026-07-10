/* Post-build: packs each locale's page into ONE self-contained HTML file —
   stylesheets and scripts inlined, favicon as a data URI — so the guide can
   be mirrored, e-mailed, or carried on a USB stick and opened from file://.
   No parallel implementation: the artifact IS the built page, inlined.
   Outputs dist/exitchatcontrol-offline[.<locale>].html (contract shared
   with Footer.astro). */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
// Locales derive from the dictionary files; the default locale (served at /)
// is read from src/i18n/locales.ts — adding a language needs no change here.
const DEFAULT = /defaultLocale: Locale = '(\w+)'/.exec(
  readFileSync('src/i18n/locales.ts', 'utf8'),
)?.[1]
if (!DEFAULT) throw new Error('[build-offline] cannot read defaultLocale from src/i18n/locales.ts')
const LOCALES = readdirSync('src/i18n')
  .filter((f) => /^[a-z]{2}\.json$/.test(f))
  .map((f) => f.slice(0, 2))
  .map((code) => ({
    code,
    page: code === DEFAULT ? 'index.html' : `${code}/index.html`,
    out: `exitchatcontrol-offline${code === DEFAULT ? '' : `.${code}`}.html`,
  }))

const faviconDataUri = `data:image/png;base64,${readFileSync('public/favicon.png').toString('base64')}`

function inlineAssets(html) {
  // stylesheets → <style>
  html = html.replace(
    /<link[^>]+rel="stylesheet"[^>]+href="(\/[^"]+\.css)"[^>]*>/g,
    (_, href) => `<style>${readFileSync(join(DIST, href), 'utf8')}</style>`,
  )
  // module scripts → inline (first occurrence per src; duplicates dropped so
  // delegated listeners never register twice)
  const seen = new Set()
  html = html.replace(
    /<script([^>]*)\ssrc="(\/[^"]+\.js)"([^>]*)><\/script>/g,
    (_, pre, src, post) => {
      if (seen.has(src)) return ''
      seen.add(src)
      return `<script${pre}${post}>${readFileSync(join(DIST, src), 'utf8')}</script>`
    },
  )
  // favicon → data URI; PWA/touch links make no sense from file://
  html = html.replace(/href="\/favicon\.png"/g, `href="${faviconDataUri}"`)
  html = html.replace(/<link rel="(manifest|apple-touch-icon)"[^>]*>/g, '')
  return html
}

for (const { code, page, out } of LOCALES) {
  let html = inlineAssets(readFileSync(join(DIST, page), 'utf8'))
  // language switcher + brand link → sibling offline artifacts, so the
  // whole multilingual set works side-by-side from file://
  for (const sibling of LOCALES) {
    const route = sibling.code === DEFAULT ? '/' : `/${sibling.code}/`
    html = html.replaceAll(`href="${route}"`, `href="./${sibling.out}"`)
  }
  writeFileSync(join(DIST, out), html)
  console.log(`[build-offline] ${out} (${code}) — ${(html.length / 1024).toFixed(0)} KB`)
}
