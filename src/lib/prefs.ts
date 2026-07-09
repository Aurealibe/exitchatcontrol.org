import { useSyncExternalStore } from 'react'

export type Lang = 'fr' | 'en'
export type Filter = 'b' | 'i' | 'a' | null

/* Tiny external store bridging the <html> attributes (owned by the boot
   script in index.html before hydration) and React. useSyncExternalStore
   is the sanctioned hydration-safe pattern: the server snapshot renders
   neutral (null → no aria-pressed), the client snapshot re-renders with
   the real value right after hydration — no mismatch, no effect. */

const subs = new Set<() => void>()
function notify() {
  subs.forEach((f) => f())
}
function subscribe(cb: () => void) {
  subs.add(cb)
  return () => {
    subs.delete(cb)
  }
}

export function currentLang(): Lang {
  return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'fr'
}

const TITLES: Record<Lang, string> = {
  fr: 'Devenir Ingouvernable — Échapper à Chat Control',
  en: 'Becoming Ungovernable — Escape Chat Control',
}

export function setLang(l: Lang) {
  const root = document.documentElement
  root.setAttribute('data-lang', l)
  root.setAttribute('lang', l)
  document.title = TITLES[l]
  try {
    localStorage.setItem('lang', l)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', l)
    window.history.replaceState(null, '', url)
  } catch {
    /* private mode: the attribute switch above is enough */
  }
  notify()
}

export function useLang(): Lang | null {
  return useSyncExternalStore(subscribe, currentLang, () => null)
}

let filter: Filter = null

export function setFilter(f: Filter) {
  const root = document.documentElement
  if (f) root.setAttribute('data-filter', f)
  else root.removeAttribute('data-filter')
  filter = f
  notify()
}

export function useFilter(): Filter {
  return useSyncExternalStore(
    subscribe,
    () => filter,
    () => null,
  )
}

export function toggleTheme() {
  const root = document.documentElement
  let cur = root.getAttribute('data-theme')
  if (!cur) {
    cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const next = cur === 'dark' ? 'light' : 'dark'
  root.setAttribute('data-theme', next)
  try {
    localStorage.setItem('theme', next)
  } catch {
    /* private mode */
  }
}
