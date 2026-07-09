import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createHead, UnheadProvider } from '@unhead/react/client'
import { createBrowserRouter, RouterProvider, type HydrationState } from 'react-router'
import './index.css'
import { routes } from './routes'
import { runE2E } from './lib/e2e'

/* Client entry — hydrate the prerendered HTML in prod, mount fresh in dev
   (same pattern as nika.sh: vite-plugin-react-ssg injects
   window.__staticRouterHydrationData into each prerendered page). */
const hydrationData = (
  window as Window & { __staticRouterHydrationData?: HydrationState }
).__staticRouterHydrationData

const router = createBrowserRouter(routes, {
  ...(hydrationData ? { hydrationData } : {}),
})

const head = createHead()
const container = document.getElementById('app')!

const tree = (
  <StrictMode>
    <UnheadProvider head={head}>
      <RouterProvider router={router} />
    </UnheadProvider>
  </StrictMode>
)

if (container.firstChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}

/* Print completeness: the install steps live in <details>; a closed details
   does not render its content when printing and CSS alone cannot open it.
   Open them all on beforeprint, restore on afterprint. */
addEventListener('beforeprint', () => {
  document.querySelectorAll('details:not([open])').forEach((d) => {
    d.setAttribute('data-print-opened', '1')
    ;(d as HTMLDetailsElement).open = true
  })
})
addEventListener('afterprint', () => {
  document.querySelectorAll('details[data-print-opened]').forEach((d) => {
    ;(d as HTMLDetailsElement).open = false
    d.removeAttribute('data-print-opened')
  })
})

/* e2e hook — only fires with ?e2e=1 (scripts/e2e.mjs). The battery is fully
   synchronous (flushSync per click), so its verdict is set before `load`.
   The axe-core WCAG A/AA audit is exposed as a promise the CDP driver reads
   with awaitPromise (the chunk is dynamic: users never download it). */
if (new URLSearchParams(location.search).has('e2e')) {
  runE2E()
  const axeRun = import('axe-core').then((axe) =>
    axe.default.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } }),
  )
  const w = window as Window & { __axe?: Promise<unknown>; __axeFull?: Promise<unknown> }
  w.__axe = axeRun.then((r) => r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })))
  // full node detail (selector + failure message) — printed by the battery on
  // failure so a contrast regression names its exact element
  w.__axeFull = axeRun.then((r) =>
    r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.slice(0, 40).map((n) => ({
        t: n.target.join(' '),
        fix: (n.any[0]?.message ?? '').slice(0, 120),
      })),
    })),
  )
}
