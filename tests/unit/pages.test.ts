import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import tools from '../../src/data/tools.json'
import { defaultLocale, locales } from '../../src/i18n/locales'
import { pageSlugs } from '../../src/i18n/slugs'

// The split guide, checked against the BUILT site: every section and tool
// page exists in every locale with its own title, description and canonical,
// hreflang clusters are reciprocal, internal links resolve, and the one-page
// guide stays out of the index. Requires `pnpm build` first.

const DIST = 'dist'
const SITE = 'https://exitchatcontrol.org'
const built = existsSync(DIST)

const prefix = (l: string) => (l === defaultLocale ? '' : `/${l}`)
const slug = (s: string | Record<string, string>, l: string) => (typeof s === 'string' ? s : s[l])

function pageFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return pageFiles(path)
    return entry.name === 'index.html' ? [path] : []
  })
}

const routeOf = (file: string) => `/${file.slice(DIST.length + 1, -'index.html'.length)}`

describe.skipIf(!built)('split guide pages', () => {
  const pages = new Map(pageFiles(DIST).map((f) => [routeOf(f), readFileSync(f, 'utf8')]))
  const meta = (html: string, re: RegExp) => re.exec(html)?.[1]

  const expected = locales.flatMap((l) => [
    ...Object.entries(pageSlugs).map(([, s]) => `${prefix(l)}/${s[l]}/`),
    ...tools.map((t) => {
      const section = (pageSlugs as Record<string, Record<string, string>>)[t.section][l]
      return `${prefix(l)}/${section}/${slug(t.slug, l)}/`
    }),
  ])

  it('builds every section, dataset and tool page in every locale', () => {
    expect(expected.filter((r) => !pages.has(r))).toEqual([])
  })

  it('gives each indexable page a unique title, description and self canonical', () => {
    // unique within a locale (translations may share a title, e.g. "Tor")
    const titles = new Map<string, string>()
    const problems: string[] = []
    for (const route of expected) {
      const html = pages.get(route)!
      if (html.includes('name="robots" content="noindex"')) continue
      const title = meta(html, /<title>([^<]*)<\/title>/)!
      const description = meta(html, /<meta name="description" content="([^"]*)"/) ?? ''
      const canonical = meta(html, /<link rel="canonical" href="([^"]*)"/)
      if (canonical !== `${SITE}${route}`) problems.push(`${route}: canonical ${canonical}`)
      if (description.length < 40) problems.push(`${route}: short description`)
      const key = `${meta(html, /<html lang="([a-z]+)"/)}|${title}`
      if (titles.has(key)) problems.push(`${route}: title also on ${titles.get(key)}`)
      titles.set(key, route)
    }
    expect(problems).toEqual([])
  })

  it('has reciprocal hreflang clusters that point at built pages', () => {
    const problems: string[] = []
    for (const route of expected) {
      const html = pages.get(route)!
      if (html.includes('content="noindex"')) continue
      const alts = [...html.matchAll(/hreflang="([a-z-]+)" href="([^"]+)"/g)]
      for (const [, , href] of alts) {
        const target = href.replace(SITE, '')
        const back = pages.get(target)
        if (!back) problems.push(`${route}: hreflang → missing ${target}`)
        else if (!back.includes(`href="${SITE}${route}"`))
          problems.push(`${route}: ${target} does not link back`)
      }
    }
    expect(problems).toEqual([])
  })

  it('has no broken internal link', () => {
    const broken = new Set<string>()
    for (const [route, html] of pages) {
      for (const [, href] of html.matchAll(/<a\s[^>]*href="(\/[^"#?]*)/g)) {
        if (href.startsWith('//')) continue
        const path = href.endsWith('/') ? href : `${href}/`
        const file = href.split('/').pop()!.includes('.')
        if (file ? !existsSync(join(DIST, href)) : !pages.has(path))
          broken.add(`${route} → ${href}`)
      }
    }
    expect([...broken]).toEqual([])
  })

  it('keeps the one-page guide out of the index and the sitemap', () => {
    const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8')
    for (const l of locales) {
      const route = `${prefix(l)}/${pageSlugs.full[l]}/`
      expect(pages.get(route)).toContain('<meta name="robots" content="noindex">')
      expect(sitemap).not.toContain(`${SITE}${route}<`)
    }
  })
})
