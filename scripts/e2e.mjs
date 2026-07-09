/* Deep e2e battery — run: node scripts/e2e.mjs (expects `pnpm build` done).
   Serves dist/ with `vite preview`, then:
   STATIC  (no JS)  — asserts the prerendered HTML contract
   DYNAMIC (hydrated) — drives real React handlers via the ?e2e=1 in-page
   battery (src/lib/e2e.ts) and reads the E2E:PASS/FAIL verdict from <title>
   OFFLINE — asserts the single-file artifact is self-contained + interactive
   Exit code 0 = all green. */
import { execFileSync, spawn } from 'node:child_process'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const DIST = join(ROOT, 'dist')
const PORT = 4531
const CHROME_MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const CHROME = existsSync(CHROME_MAC) ? CHROME_MAC : 'google-chrome'

let failures = 0
function check(name, pass, detail = '') {
  console.log(`${pass ? '  ✓' : '  ✗'} ${name}${pass || !detail ? '' : ` — ${detail}`}`)
  if (!pass) failures++
}

/* ─── STATIC battery (the no-JS reader: Tor Browser safest mode) ─── */
console.log('▸ static (prerendered HTML, no JS)')
const html = readFileSync(join(DIST, 'index.html'), 'utf8')

const SECTIONS = [
  'menace', 'precedents', 'memo', 'messagerie', 'email', 'navigateur', 'dns',
  'vpn', 'censure', 'proton', 'stockage', 'motsdepasse', 'deuxfa', 'social',
  'argent', 'ia', 'boiteaoutils', 'selfhost', 'tor', 'os', 'telephonie',
  'opsec', 'ecosysteme', 'allies', 'action',
]
const missing = SECTIONS.filter((id) => !html.includes(`id="${id}"`))
check(`all ${SECTIONS.length} section anchors prerendered`, missing.length === 0, missing.join(','))

check('both languages in the DOM', html.includes('data-l="fr"') && html.includes('data-l="en"'))
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

/* ─── OFFLINE artifact battery ─── */
console.log('▸ offline artifact (single file)')
const off = readFileSync(join(DIST, 'exitchatcontrol-offline.html'), 'utf8')
check('no module scripts left', !off.includes('type="module"'))
check('no asset references left', !/href="\/assets\/|src="\/assets\//.test(off))
check('vanilla interactivity injected', off.includes("setLang('fr')") && off.includes('ecc-checklist'))
check('vanilla share + print wired', off.includes('.share-native') && off.includes('window.print'))
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
    const dom = execFileSync(
      CHROME,
      ['--headless=new', '--disable-gpu', '--dump-dom', `http://localhost:${PORT}/?lang=fr&e2e=1`],
      // SIGKILL: headless Chrome can ignore the default SIGTERM on timeout,
      // which would hang execFileSync (and the whole battery) forever.
      { encoding: 'utf8', timeout: 60_000, killSignal: 'SIGKILL' },
    )
    const verdict = (dom.match(/data-e2e="([^"]*)"/) ?? [])[1] ?? ''
    check('in-page battery verdict', verdict.startsWith('E2E:PASS'), verdict || 'no data-e2e verdict on <html>')

    // hydration sanity: the app re-rendered EN title after battery restored FR
    const langAttr = (dom.match(/<html[^>]*data-lang="([^"]+)"/) ?? [])[1]
    check('battery restored fr', langAttr === 'fr', langAttr)
  }
} finally {
  server.kill()
}

console.log(failures === 0 ? '\nE2E: ALL GREEN' : `\nE2E: ${failures} FAILURE(S)`)
process.exit(failures === 0 ? 0 : 1)
