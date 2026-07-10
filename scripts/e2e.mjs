/* Deep e2e battery — run: node scripts/e2e.mjs (expects `pnpm build` done).
   Serves dist/ with `vite preview`, then:
   STATIC  (no JS)  — asserts the prerendered HTML contract
   DYNAMIC (hydrated) — drives real React handlers via the ?e2e=1 in-page
   battery (src/lib/e2e.ts) and reads the E2E:PASS/FAIL verdict from <title>
   OFFLINE — asserts the single-file artifact is self-contained + interactive
   Exit code 0 = all green. */
import { spawn } from 'node:child_process'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { withBrowser } from './cdp.mjs'

const ROOT = new URL('..', import.meta.url).pathname
const DIST = join(ROOT, 'dist')
const PORT = 4531

let failures = 0
function check(name, pass, detail = '') {
  console.log(`${pass ? '  ✓' : '  ✗'} ${name}${pass || !detail ? '' : ` — ${detail}`}`)
  if (!pass) failures++
}

/* ─── STATIC battery (the no-JS reader: Tor Browser safest mode) ─── */
console.log('▸ static (prerendered HTML, no JS)')
const html = readFileSync(join(DIST, 'index.html'), 'utf8')

const SECTIONS = [
  'menace', 'precedents', 'bigbrother', 'memo', 'messagerie', 'email', 'navigateur', 'dns',
  'vpn', 'censure', 'proton', 'stockage', 'motsdepasse', 'deuxfa', 'social',
  'argent', 'ia', 'boiteaoutils', 'selfhost', 'tor', 'os', 'telephonie',
  'opsec', 'ecosysteme', 'allies', 'action',
]
const missing = SECTIONS.filter((id) => !html.includes(`id="${id}"`))
check(`all ${SECTIONS.length} section anchors prerendered`, missing.length === 0, missing.join(','))

check('both languages in the DOM', html.includes('data-l="fr"') && html.includes('data-l="en"'))
check('fr page declares lang="fr" (prerenderer overwrite repaired)', html.includes('<html lang="fr" data-lang="fr">'))
check('content actually prerendered (>200 KB)', html.length > 200_000, `${Math.round(html.length / 1024)} KB`)
check('timeline events present', (html.match(/tl-item/g) ?? []).length >= 20, `${(html.match(/tl-item/g) ?? []).length}`)
check('tool cards present', (html.match(/class="tg"/g) ?? []).length >= 40, `${(html.match(/class="tg"/g) ?? []).length}`)
check('canonical + hreflang', html.includes('rel="canonical"') && html.includes('hreflang="en"'))
check('og:image + twitter card', html.includes('og:image') && html.includes('twitter:card'))
check('noscript notice present', html.includes('<noscript>'))
check('json-ld structured data', html.includes('application/ld+json') && html.includes('"@type": "Article"'))
check('webmanifest linked', html.includes('rel="manifest"'))
check('share row prerendered', html.includes('share-native') && html.includes('share-print'))
check('back-to-top prerendered', html.includes('class="to-top"'))
check('timeline events deep-linkable', html.includes('id="tl-2020-02-11"') && html.includes('id="tl-1993"'))
check('section § anchors', html.includes('sec-anchor'))
check('reading progress bar prerendered', html.includes('class="progress"'))
check('nika featured card (guide’s pick) prerendered', html.includes('dir-featured') && html.includes('nika.sh'))
{
  /* SEO backlinks must be FOLLOW: rel carries noopener only. A later refactor
     sweeping rel="noopener noreferrer" everywhere would silently kill them. */
  const followTargets = ['https://vpn-gratuit.fr/', 'https://nika.sh']
  const bad = []
  for (const t of followTargets) {
    const anchors = [...html.matchAll(new RegExp(`<a [^>]*href="${t.replaceAll('/', '\\/')}"[^>]*>`, 'g'))].map((m) => m[0])
    if (anchors.length === 0) bad.push(`${t}: absent`)
    for (const a of anchors) {
      if (/nofollow|noreferrer/.test(a)) bad.push(`${t}: ${a.slice(0, 80)}`)
    }
  }
  check('follow backlinks intact (nika.sh + vpn-gratuit.fr, no nofollow/noreferrer)', bad.length === 0, bad.join(' | '))
}
check('agentic-AI pointer in AI section', html.includes('dir-ia-locale-agentique'))
check('observatory events prerendered', (html.match(/bb-item/g) ?? []).length >= 30, `${(html.match(/bb-item/g) ?? []).length}`)
check('observatory deep-linkable', html.includes('id="bb-going-dark"') && html.includes('id="bb-pega-kouloglou"'))
check('observatory counter-wave cites Tapestry', html.includes('https://thealliance.ai/projects/tapestry'))
check('the wire prerendered (both tracks)', (html.match(/bb-wire-track/g) ?? []).length >= 2, `${(html.match(/bb-wire-track/g) ?? []).length}`)
check('hero dossier microtype (derived fact count)', html.includes('hero-doss'))
check('front tabs carry their numerals', html.includes('data-no="01"') && html.includes('data-no="05"'))

/* Outbound <a href> targets legitimately live in the bundle (the guide links
   out constantly). The invariant is that nothing gets LOADED from a third
   party: no CSS url(http…), no resource-CDN / font / analytics host anywhere. */
const assets = readdirSync(join(DIST, 'assets'))
const externals = []
const LOADER_HOSTS = /cdn\.|fonts\.googleapis|fonts\.gstatic|unpkg\.com|jsdelivr|cloudflareinsights|googletagmanager|google-analytics|plausible\.io|sentry\.io/i
for (const f of assets) {
  const body = readFileSync(join(DIST, 'assets', f), 'utf8')
  if (f.endsWith('.css')) {
    for (const m of body.matchAll(/url\(\s*['"]?(https?:)?\/\/[^)]+\)/g)) externals.push(`${f}: ${m[0].slice(0, 60)}`)
  }
  for (const m of body.matchAll(/https?:\/\/[a-z0-9.-]+/g)) {
    if (LOADER_HOSTS.test(m[0])) externals.push(`${f}: ${m[0]}`)
  }
}
check('no third-party loads (CSS urls, CDN/font/analytics hosts)', externals.length === 0, externals.slice(0, 3).join(' '))
check('no CDN icon requests', !html.includes('cdn.simpleicons.org') && !assets.some((f) => readFileSync(join(DIST, 'assets', f), 'utf8').includes('cdn.simpleicons.org')))

for (const f of ['sitemap.xml', 'robots.txt', 'favicon.svg', 'og.png', 'apple-touch-icon.png', 'exitchatcontrol-offline.html', '404.html', 'site.webmanifest', '.well-known/security.txt']) {
  check(`dist/${f} shipped`, existsSync(join(DIST, f)))
}

/* ─── ENGLISH landing battery (dist/en/ derived at postbuild) ─── */
console.log('▸ english landing (/en/)')
const enPath = join(DIST, 'en', 'index.html')
check('dist/en/index.html shipped', existsSync(enPath))
if (existsSync(enPath)) {
  const en = readFileSync(enPath, 'utf8')
  check('en: html defaults to english', en.includes('<html lang="en" data-lang="en">'))
  check('en: english title', en.includes('<title>Becoming Ungovernable'))
  check('en: canonical /en/', en.includes('href="https://exitchatcontrol.org/en/"'))
  check('en: still fully bilingual DOM', en.includes('data-l="fr"') && en.includes('data-l="en"'))
  check('en: og locale swapped', en.includes('content="en_GB"'))
}
const sitemapXml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
check('sitemap lists / and /en/ with hreflang cluster', sitemapXml.includes(`<loc>https://exitchatcontrol.org/en/</loc>`) && sitemapXml.includes('hreflang="x-default"'))

/* anchor integrity: every internal href="#x" must target an existing id — a
   renamed section or timeline id would silently break TOC/citations */
{
  const ids = new Set([...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]))
  const dead = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))].filter((a) => !ids.has(a))
  check('all internal #anchors resolve', dead.length === 0, dead.slice(0, 5).join(','))
}

/* JS weight budget: a document page has no business growing unbounded */
{
  // the axe-* chunk is e2e-only (dynamic import gated behind ?e2e) — real
  // readers never fetch it, so it sits outside the shipping budget
  const totalJs = assets
    .filter((f) => f.endsWith('.js') && !f.startsWith('axe-'))
    .reduce((n, f) => n + readFileSync(join(DIST, 'assets', f)).length, 0)
  check('js budget < 800 KB raw (react runtime, axe chunk excluded)', totalJs < 800_000, `${Math.round(totalJs / 1024)} KB`)
}

/* ─── OFFLINE artifact battery ─── */
console.log('▸ offline artifact (single file)')
const off = readFileSync(join(DIST, 'exitchatcontrol-offline.html'), 'utf8')
check('no module scripts left', !off.includes('type="module"'))
check('no asset references left', !/href="\/assets\/|src="\/assets\//.test(off))
check('vanilla interactivity injected', off.includes("setLang('fr')") && off.includes('ecc-checklist'))
check('vanilla share + print wired', off.includes('.share-native') && off.includes('window.print'))
check('vanilla observatory filter wired', off.includes('data-bbf') && off.includes('bbOpen'))
check('css inlined', off.includes('<style>') && off.includes('--accent'))
check('download link points at canonical origin', off.includes('https://exitchatcontrol.org/exitchatcontrol-offline.html'))
check('full content carried over (>250 KB)', off.length > 250_000, `${Math.round(off.length / 1024)} KB`)

/* ─── DYNAMIC battery (hydrated interactions via ?e2e=1) ─── */
console.log('▸ dynamic (hydrated React handlers, headless Chrome)')
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'ignore',
})
try {
  // wait for the server
  let up = false
  for (let i = 0; i < 40 && !up; i++) {
    await new Promise((r) => setTimeout(r, 250))
    try {
      const res = await fetch(`http://localhost:${PORT}/`)
      up = res.ok
    } catch {
      /* retry */
    }
  }
  check('preview server up', up)

  if (up) {
    const base = `http://localhost:${PORT}`
    await withBrowser(async ({ openPage }) => {
      /* interaction battery + axe on the DEFAULT (dark) scheme */
      const dark = await openPage(`${base}/?lang=fr&e2e=1`)
      const verdict = await dark.waitFor(`document.documentElement.getAttribute('data-e2e')`)
      check('in-page battery verdict', String(verdict ?? '').startsWith('E2E:PASS'), String(verdict ?? 'no data-e2e verdict'))
      check('battery restored fr', (await dark.evaluate(`document.documentElement.getAttribute('data-lang')`)) === 'fr')
      const axeDark = await dark.evaluate('window.__axe', { awaitPromise: true })
      const darkPass = Array.isArray(axeDark) && axeDark.length === 0
      check('axe WCAG A/AA · dark: 0 violations', darkPass,
        (axeDark ?? []).map((v) => `${v.id}(${v.impact}×${v.nodes})`).join(' '))
      if (!darkPass) console.log(JSON.stringify(await dark.evaluate('window.__axeFull', { awaitPromise: true }), null, 1).slice(0, 2400))
      await dark.close()

      /* axe again on the LIGHT scheme (different token set, different contrast) */
      const light = await openPage(`${base}/?lang=fr&e2e=1&theme=light`)
      await light.waitFor(`document.documentElement.getAttribute('data-e2e')`)
      const axeLight = await light.evaluate('window.__axe', { awaitPromise: true })
      const lightPass = Array.isArray(axeLight) && axeLight.length === 0
      check('axe WCAG A/AA · light: 0 violations', lightPass,
        (axeLight ?? []).map((v) => `${v.id}(${v.impact}×${v.nodes})`).join(' '))
      if (!lightPass) console.log(JSON.stringify(await light.evaluate('window.__axeFull', { awaitPromise: true }), null, 1).slice(0, 2400))
      await light.close()

      /* /en/ must survive HYDRATION — a '/'-only route table 404s client-side
         and the router wipes the prerendered page (caught by the vision loop
         once; never again) */
      const en = await openPage(`${base}/en/?e2e=1`)
      const enVerdict = await en.waitFor(`document.documentElement.getAttribute('data-e2e')`)
      check('/en/ battery verdict', String(enVerdict ?? '').startsWith('E2E:PASS'), String(enVerdict ?? ''))
      check('/en/ hydrates without router 404', (await en.evaluate(`!document.body.textContent.includes('Unexpected Application Error') && !!document.getElementById('precedents')`)) === true)
      await en.close()

      /* offline artifact from file:// — its boot script must run (lang param)
         and the DOM must carry the guide */
      const offUrl = `file://${join(DIST, 'exitchatcontrol-offline.html')}?lang=en&theme=dark`
      const offline = await openPage(offUrl)
      const offLang = await offline.waitFor(`document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : null`)
      check('offline boot script runs from file:// (lang=en)', offLang === 'en')
      check('offline carries the guide + directory', (await offline.evaluate(`!!document.getElementById('t-signal') && !!document.getElementById('dir-ia-locale-agentique')`)) === true)
      await offline.close()
    })
  }
} finally {
  server.kill()
}

console.log(failures === 0 ? '\nE2E: ALL GREEN' : `\nE2E: ${failures} FAILURE(S)`)
process.exit(failures === 0 ? 0 : 1)
