/* The split guide as data: every page of one locale in reading order, with
   its title, search snippet and the tools it embeds. Shared by the hub grid,
   the section/tool pages (pager, alternatives) and their <head> metadata. */

import { getCollection, type CollectionEntry } from 'astro:content'
import { useT, type Locale } from '../i18n/config'
import type { PageId } from '../i18n/slugs'
import { DATA_PAGES, HUB_SECTION, homeHref, pageHref, toolById, toolHref, type Tool } from './pages'

export interface GuidePage {
  id: string
  /** Sequential part number, 00…, as printed in the contents. */
  prefix: string
  title: string
  description: string
  href: string
  kind: 'hub' | 'section' | 'data'
  entry?: CollectionEntry<'sections'>
  /** Tool ids in the order the section shows them. */
  tools: string[]
}

export interface GuideTool {
  tool: Tool
  name: string
  what: string
  href: string
  entry: CollectionEntry<'tools'>
}

/** Markup → plain text (search snippets only). */
export const plain = (s: string) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{' '\}/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/\s+/g, ' ')
    .trim()

/** Trim to a search-snippet length on a word boundary. */
export const snippet = (s: string, max = 158) => {
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '')}…`
}

/** First prose paragraph after the section's "## " heading. */
function leadParagraph(body: string): string {
  const afterHeading = body.slice(body.search(/^## /m)).split('\n').slice(1).join('\n')
  for (const block of afterHeading.split(/\n\s*\n/)) {
    const text = block.trim()
    if (text && !text.startsWith('<') && !text.startsWith('|') && !text.startsWith('#')) {
      return plain(text)
    }
  }
  return ''
}

const slotText = (body: string, slot: string) => {
  const m = new RegExp(`<Fragment slot="${slot}">([\\s\\S]*?)</Fragment>`).exec(body)
  return m ? plain(m[1]) : ''
}

export async function loadGuide(locale: Locale): Promise<GuidePage[]> {
  const t = useT(locale)
  const entries = await getCollection('sections', ({ id }) => id.startsWith(`${locale}/`))
  entries.sort((a, b) => a.data.part - b.data.part || a.data.order - b.data.order)

  const pages: Omit<GuidePage, 'prefix'>[] = entries.map((entry) => {
    const id = entry.data.id
    const tools = [...(entry.body ?? '').matchAll(/<Tool id="([^"]+)"/g)].map((m) => m[1])
    return {
      id,
      title: entry.data.title,
      description: snippet(entry.data.description ?? leadParagraph(entry.body ?? '')),
      href: id === HUB_SECTION ? homeHref(locale) : pageHref(locale, id as PageId),
      kind: id === HUB_SECTION ? 'hub' : 'section',
      entry,
      tools,
    }
  })
  for (const id of DATA_PAGES) {
    pages.push({
      id,
      title: t(`sections2.${id}.title`),
      description: snippet(plain(t(`sections2.${id}.intro`))),
      href: pageHref(locale, id),
      kind: 'data',
      tools: [],
    })
  }
  return pages.map((p, i) => ({ ...p, prefix: String(i).padStart(2, '0') }))
}

export async function loadTools(locale: Locale): Promise<Map<string, GuideTool>> {
  const entries = await getCollection('tools', ({ id }) => id.startsWith(`${locale}/`))
  return new Map(
    entries.map((entry) => {
      const tool = toolById(entry.data.tool)
      const body = entry.body ?? ''
      return [
        tool.id,
        {
          tool,
          entry,
          name: slotText(body, 'name') || tool.name,
          what: slotText(body, 'what'),
          href: toolHref(locale, tool.id),
        },
      ]
    }),
  )
}
