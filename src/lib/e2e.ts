/* In-page e2e battery — loaded ONLY when the page is opened with ?e2e=1
   (see main.tsx). Drives the REAL hydrated React handlers via synthetic
   clicks, asserts the observable contract (html attributes, computed styles,
   localStorage), and writes the verdict into a data-e2e attribute on <html>
   so a headless `--dump-dom` run can read it (scripts/e2e.mjs). */

import { flushSync } from 'react-dom'

type Check = { name: string; pass: boolean; detail?: string }

/* flushSync forces React to commit the store-driven re-render (aria-pressed…)
   before the next assertion — keeps the whole battery synchronous, so it
   completes before `load` and a plain --dump-dom capture sees the verdict. */
function click(sel: string): boolean {
  const el = document.querySelector<HTMLElement>(sel)
  if (!el) return false
  flushSync(() => el.click())
  return true
}

export function runE2E() {
  const checks: Check[] = []
  const root = document.documentElement
  const ok = (name: string, pass: boolean, detail?: string) => checks.push({ name, pass, detail })

  // 1 · language toggle drives the html contract + the document title
  ok('click-en', click('.lang-en'))
  ok('lang-attr-en', root.getAttribute('data-lang') === 'en', root.getAttribute('data-lang') ?? 'null')
  ok('title-en', document.title.includes('Ungovernable'), document.title)
  ok('aria-pressed-en', document.querySelector('.lang-en')?.getAttribute('aria-pressed') === 'true')

  // 2 · profile filter hides non-matching tool cards (computed style, not class)
  ok('click-filter-a', click('.fb-a'))
  ok('filter-attr', root.getAttribute('data-filter') === 'a')
  const firefox = document.getElementById('t-firefox')
  const tor = document.getElementById('t-tor')
  ok('filter-hides-green', !!firefox && getComputedStyle(firefox).display === 'none')
  ok('filter-keeps-red', !!tor && getComputedStyle(tor).display !== 'none')
  ok('click-filter-all', click('.fb-all'))
  ok('filter-cleared', root.getAttribute('data-filter') === null)

  // 3 · checklist persists to localStorage (and only there)
  try {
    localStorage.removeItem('ecc-checklist')
  } catch {
    /* private mode */
  }
  ok('click-checkbox', click('.check input[data-id="signal"]'))
  let stored: Record<string, boolean> = {}
  try {
    stored = JSON.parse(localStorage.getItem('ecc-checklist') ?? '{}') as Record<string, boolean>
  } catch {
    /* private mode */
  }
  ok('checklist-stored', stored.signal === true, JSON.stringify(stored))

  // 4 · theme toggle flips the attribute
  const before = root.getAttribute('data-theme')
  ok('click-theme', click('.controls .btn:not(.lang-fr):not(.lang-en)'))
  const after = root.getAttribute('data-theme')
  ok('theme-flipped', after !== null && after !== before, `${before} -> ${after}`)

  // 5 · restore neutral state (fresh headless profile anyway, but be polite)
  click('.lang-fr')

  const failed = checks.filter((c) => !c.pass)
  const verdict =
    failed.length === 0
      ? `E2E:PASS ${checks.length}/${checks.length}`
      : `E2E:FAIL ${checks.length - failed.length}/${checks.length} [${failed
          .map((c) => `${c.name}${c.detail ? `=${c.detail}` : ''}`)
          .join(' | ')}]`
  // On <html>, not in <title>: a head manager (unhead) re-applies the title
  // on its own schedule and would overwrite the verdict.
  document.documentElement.setAttribute('data-e2e', verdict)
}
