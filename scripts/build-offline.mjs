/* Post-build: packs each locale's guide — and its quiz — into self-contained
   HTML files (stylesheets and scripts inlined, favicon as a data URI) so the
   site can be mirrored, e-mailed, or carried on a USB stick and opened from
   file://. No parallel implementation: each artifact IS the built page,
   inlined. Outputs dist/exitchatcontrol-offline[.<locale>].html (contract
   shared with Footer.astro) and dist/exitchatcontrol-quiz-offline[.<locale>].html. */
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
  .map((code) => {
    const prefix = code === DEFAULT ? '' : `/${code}`
    const suffix = code === DEFAULT ? '' : `.${code}`
    return {
      code,
      pages: [
        {
          route: `${prefix}/`,
          page: `${prefix}/index.html`.slice(1),
          out: `exitchatcontrol-offline${suffix}.html`,
        },
        {
          route: `${prefix}/quiz`,
          page: `${prefix}/quiz/index.html`.slice(1),
          out: `exitchatcontrol-quiz-offline${suffix}.html`,
        },
      ],
    }
  })

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

// Internal routes → sibling artifacts, with anchors carried over, so the
// whole multilingual guide+quiz set navigates side-by-side from file://
// (language switcher, brand link, quiz nav, the quiz's deep links into the
// guide). A page's links to its own route collapse to in-page anchors.
// Root-absolute hrefs must never survive: from file:// they point at the
// reader's filesystem (tests/unit/offline-links.test.ts enforces this).
const ROUTES = LOCALES.flatMap((l) => l.pages)

function relinkRoutes(html, self) {
  for (const { route, out } of ROUTES) {
    const re = new RegExp(`href="${route.replaceAll('/', '\\/')}(#[^"]*)?"`, 'g')
    html = html.replace(re, (_, hash = '') =>
      out === self && hash ? `href="${hash}"` : `href="./${out}${hash}"`,
    )
  }
  // the footer's own download link becomes a working relative link
  return html.replaceAll('href="/exitchatcontrol-', 'href="./exitchatcontrol-')
}

for (const { code, pages } of LOCALES) {
  for (const { page, out } of pages) {
    let html = inlineAssets(readFileSync(join(DIST, page), 'utf8'))
    html = relinkRoutes(html, out)
    writeFileSync(join(DIST, out), html)
    console.log(`[build-offline] ${out} (${code}) — ${(html.length / 1024).toFixed(0)} KB`)
  }
}
