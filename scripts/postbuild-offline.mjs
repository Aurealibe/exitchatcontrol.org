/* Builds dist/exitchatcontrol-offline.html — the whole prerendered guide as
   ONE self-contained file, openable from file:// or a USB stick. This keeps
   the v1 promise ("un site web autonome").

   Strategy: the prerendered HTML already contains the full bilingual content,
   so the React runtime is dead weight in a single-file context. We inline the
   CSS, DROP the module scripts, and inject a ~40-line vanilla script that
   re-implements every interaction the file needs: language toggle, theme
   toggle, profile filter, checklist persistence, and opening <details> for
   print. Result: fully functional AND ~300 KB lighter than inlining React. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url).pathname
let html = readFileSync(join(dist, 'index.html'), 'utf8')

// Inline stylesheets.
html = html.replace(
  /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g,
  (_m, file) => `<style>${readFileSync(join(dist, file), 'utf8')}</style>`,
)

// Drop the React runtime: modulepreload hints, module scripts, hydration data.
html = html.replace(/<link rel="modulepreload"[^>]*>/g, '')
html = html.replace(/<script type="module"[^>]*><\/script>/g, '')
html = html.replace(/<script>window\.__staticRouterHydrationData[^<]*<\/script>/g, '')

// Inline the favicon so the single file is truly standalone.
const fav = join(dist, 'favicon.svg')
if (existsSync(fav)) {
  const data = Buffer.from(readFileSync(fav)).toString('base64')
  html = html.replace(
    /<link rel="icon"[^>]*>/,
    `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${data}">`,
  )
}

// The "download the guide" link points at itself in the offline file — send
// it to the canonical origin instead (works from file:// too).
html = html.replace(
  /href="\/exitchatcontrol-offline\.html" download/g,
  'href="https://exitchatcontrol.org/exitchatcontrol-offline.html"',
)
// Same for any other root-absolute link (apple-touch etc. are head-only, fine).

// Vanilla interactivity — mirrors src/lib/prefs.ts + Checklist against the
// same DOM contract (classes .lang-*, .fb-*, input[data-id], :root attrs).
const vanilla = `
<script>
;(function () {
  var root = document.documentElement
  function on(sel, fn) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener('click', function () { fn(el) })
    })
  }
  on('.lang-fr', function () { setLang('fr') })
  on('.lang-en', function () { setLang('en') })
  function setLang(l) {
    root.setAttribute('data-lang', l)
    root.setAttribute('lang', l)
    document.title = l === 'en'
      ? 'Becoming Ungovernable — Escape Chat Control'
      : 'Devenir Ingouvernable — Échapper à Chat Control'
    try { localStorage.setItem('lang', l) } catch (e) {}
  }
  on('.controls .btn:not(.lang-fr):not(.lang-en)', function () {
    var cur = root.getAttribute('data-theme')
    if (!cur) cur = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    var next = cur === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (e) {}
  })
  function filt(f) { if (f) root.setAttribute('data-filter', f); else root.removeAttribute('data-filter') }
  on('.fb-all', function () { filt(null) })
  on('.fb-b', function () { filt('b') })
  on('.fb-i', function () { filt('i') })
  on('.fb-a', function () { filt('a') })
  var KEY = 'ecc-checklist', done = {}
  try { done = JSON.parse(localStorage.getItem(KEY) || '{}') } catch (e) {}
  document.querySelectorAll('.check input[data-id]').forEach(function (box) {
    var id = box.getAttribute('data-id')
    if (done[id]) box.checked = true
    box.addEventListener('change', function () {
      done[id] = box.checked
      try { localStorage.setItem(KEY, JSON.stringify(done)) } catch (e) {}
    })
  })
  addEventListener('beforeprint', function () {
    document.querySelectorAll('details:not([open])').forEach(function (d) {
      d.setAttribute('data-print-opened', '1'); d.open = true
    })
  })
  addEventListener('afterprint', function () {
    document.querySelectorAll('details[data-print-opened]').forEach(function (d) {
      d.open = false; d.removeAttribute('data-print-opened')
    })
  })
})()
</script>`
html = html.replace('</body>', `${vanilla}\n</body>`)

writeFileSync(join(dist, 'exitchatcontrol-offline.html'), html)
console.log('offline artifact: dist/exitchatcontrol-offline.html —', Math.round(html.length / 1024), 'KB, react-free, vanilla interactivity')
