/* Post-build: packs each locale's one-page guide — and its quiz — into self-contained
   HTML files (stylesheets and scripts inlined, favicon as a data URI) so the
   site can be mirrored, e-mailed, or carried on a USB stick and opened from
   file://. No parallel implementation: each artifact IS the built page,
   inlined. Outputs dist/exitchatcontrol-offline[.<locale>].html (contract
   shared with Footer.astro) and dist/exitchatcontrol-quiz-offline[.<locale>].html. */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
// Locales derive from the dictionary files; the default locale (served at /)
// is read from src/i18n/locales.ts — adding a language needs no change here.
const DEFAULT = /defaultLocale: Locale = '(\w+)'/.exec(
  readFileSync('src/i18n/locales.ts', 'utf8'),
)?.[1]
if (!DEFAULT) throw new Error('[build-offline] cannot read defaultLocale from src/i18n/locales.ts')
// The one-page guide's localized slug (src/i18n/slugs.ts, `full`).
const FULL_SLUGS = Object.fromEntries(
  [
    ...(/full: \{([^}]+)\}/.exec(readFileSync('src/i18n/slugs.ts', 'utf8'))?.[1] ?? '').matchAll(
      /(\w+): '([^']+)'/g,
    ),
  ].map(([, code, slug]) => [code, slug]),
)
const LOCALES = readdirSync('src/i18n')
  .filter((f) => /^[a-z]{2}\.json$/.test(f))
  .map((f) => f.slice(0, 2))
  .map((code) => {
    const prefix = code === DEFAULT ? '' : `/${code}`
    const suffix = code === DEFAULT ? '' : `.${code}`
    if (!FULL_SLUGS[code]) throw new Error(`[build-offline] no full-guide slug for ${code}`)
    return {
      code,
      pages: [
        {
          route: `${prefix}/${FULL_SLUGS[code]}`,
          page: `${prefix}/${FULL_SLUGS[code]}/index.html`.slice(1),
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
// guide). The split guide's pages (hub, one page per section and per tool)
// all collapse into the one-page guide, at the anchor of their content.
// A page's links to its own artifact become in-page anchors.
// Root-absolute hrefs must never survive: from file:// they point at the
// reader's filesystem (tests/unit/offline-links.test.ts enforces this).
const ROUTES = LOCALES.flatMap(({ code, pages }) => {
  const [guide, quiz] = pages
  const prefix = code === DEFAULT ? '' : `/${code}`
  const routes = [
    { route: guide.route, out: guide.out },
    { route: prefix, out: guide.out },
    { route: quiz.route, out: quiz.out },
  ]
  // every other page under this locale's prefix: its content anchor is the
  // first section/article id after the breadcrumb header (.page-head)
  for (const file of htmlFiles(join(DIST, prefix))) {
    const route = `/${file.slice(DIST.length + 1, -'/index.html'.length)}`
    if (routes.some((r) => r.route === route)) continue
    if (
      code === DEFAULT &&
      LOCALES.some((l) => route.startsWith(`/${l.code}/`) || route === `/${l.code}`)
    )
      continue
    const html = readFileSync(file, 'utf8')
    const head = html.indexOf('class="page-head"')
    if (head < 0) continue
    const anchor = /<(?:section|article)[^>]*\bid="([^"]+)"/.exec(html.slice(head))?.[1]
    if (anchor) routes.push({ route, out: guide.out, anchor: `#${anchor}` })
  }
  return routes
})

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return htmlFiles(path)
    return name === 'index.html' ? [path] : []
  })
}

function relinkRoutes(html, self) {
  html = html.replace(/href="(\/[^"#]*?)\/?(#[^"]*)?"/g, (match, path, hash) => {
    const hit = ROUTES.find((r) => r.route === (path === '/' ? '' : path))
    if (!hit) return match
    const target = hash || hit.anchor || ''
    return hit.out === self && target ? `href="${target}"` : `href="./${hit.out}${target}"`
  })
  // the footer's own download link becomes a working relative link
  html = html.replaceAll('href="/exitchatcontrol-', 'href="./exitchatcontrol-')
  // pages with no offline artifact (legal notice…) point at the live site
  return html.replace(
    /href="\/(?!\/)([^"]*)"/g,
    'href="https://exitchatcontrol.org/$1" rel="noopener noreferrer"',
  )
}

for (const { code, pages } of LOCALES) {
  for (const { page, out } of pages) {
    let html = inlineAssets(readFileSync(join(DIST, page), 'utf8'))
    html = relinkRoutes(html, out)
    // downloadable copies duplicate the live pages: keep them out of search
    html = html.replace('<head>', '<head><meta name="robots" content="noindex">')
    writeFileSync(join(DIST, out), html)
    console.log(`[build-offline] ${out} (${code}) — ${(html.length / 1024).toFixed(0)} KB`)
  }
}
