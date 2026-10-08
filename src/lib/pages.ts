/* URL model of the split guide (one page per section and per tool).

     /<lang>/                       hub: hero, the threat section, contents grid
     /<lang>/<section-slug>/        one guide section, or a dataset page
     /<lang>/<section-slug>/<tool>/ one tool card, as a product page
     /<lang>/<full-slug>/           the whole guide on one page (noindex, print)

   English has no prefix. Slugs are localized (src/i18n/slugs.ts); tool slugs
   come from src/data/tools.json. Everything returned here ends with "/",
   matching the directory index nginx serves and the sitemap. */

import tools from '../data/tools.json'
import { localePath, locales, type Locale } from '../i18n/config'
import { pageSlugs, type PageId } from '../i18n/slugs'

export type Tool = (typeof tools)[number]

/** Dataset sections rendered after the MDX sections, in reading order. */
export const DATA_PAGES = ['precedents', 'observatory', 'allies', 'directory', 'checklist'] as const

/** The section that lives on the hub instead of its own page. */
export const HUB_SECTION = 'menace'

export const homeHref = (locale: Locale) => `${localePath(locale)}/`

export const pageHref = (locale: Locale, id: PageId) =>
  `${localePath(locale)}/${pageSlugs[id][locale]}/`

export const hasPage = (id: string): id is PageId => id in pageSlugs

/** Href of a guide section by legacy id; the hub section maps to the hub. */
export const sectionHref = (locale: Locale, id: string) => {
  if (id === HUB_SECTION) return `${homeHref(locale)}#${HUB_SECTION}`
  if (!hasPage(id)) throw new Error(`No page for section "${id}"`)
  return pageHref(locale, id)
}

export const toolById = (id: string): Tool => {
  const tool = tools.find((t) => t.id === id)
  if (!tool) throw new Error(`Unknown tool id "${id}" (not in src/data/tools.json)`)
  return tool
}

export const toolSlug = (tool: Tool, locale: Locale) =>
  typeof tool.slug === 'string' ? tool.slug : tool.slug[locale]

export const toolHref = (locale: Locale, id: string) => {
  const tool = toolById(id)
  return `${sectionHref(locale, tool.section)}${toolSlug(tool, locale)}/`
}

/** The same page in every locale, for hreflang and the language menu. */
export const allLocales = (href: (l: Locale) => string) =>
  Object.fromEntries(locales.map((l) => [l, href(l)])) as Record<Locale, string>

/** Legacy one-page anchors (/#messagerie, /fr/#t-signal…) → new URLs. Used
    by the hub's redirect script and to relink the offline single file. */
export function anchorTargets(locale: Locale): Record<string, string> {
  const map: Record<string, string> = {}
  for (const id of Object.keys(pageSlugs) as PageId[]) {
    if (id !== 'full') map[id] = pageHref(locale, id)
  }
  for (const tool of tools) map[tool.id] = toolHref(locale, tool.id)
  return map
}
