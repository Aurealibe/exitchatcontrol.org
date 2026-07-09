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
   synchronous (flushSync per click), so it completes during module evaluation,
   before `load` — a plain --dump-dom capture reliably sees the verdict. */
if (new URLSearchParams(location.search).has('e2e')) {
  runE2E()
}
