import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import tools from '../../src/data/tools.json'
import { defaultLocale, locales } from '../../src/i18n/locales'
import { fullGuideSlugs, pageSlugs } from '../../src/i18n/slugs'

// The split guide, checked against the BUILT site: every section and tool
// page exists in every locale with its own title, description and canonical,
// hreflang clusters are reciprocal, internal links resolve, and each locale
// home carries the whole guide on one page. Requires `pnpm build` first.

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

  it('serves the whole guide on each locale home, linked by anchors only', () => {
    const sectionRoutes = new Set(
      locales.flatMap((l) => Object.values(pageSlugs).map((s) => `${prefix(l)}/${s[l]}/`)),
    )
    for (const l of locales) {
      const html = pages.get(`${prefix(l)}/`)!
      for (const id of [...Object.keys(pageSlugs), 'menace', 'manifesto'])
        expect(html, `${l}: #${id}`).toContain(`id="${id}"`)
      // the reader stays on the page: no link out to a section page
      const out = [...html.matchAll(/<a\s[^>]*href="(\/[^"#?]*)/g)]
        .map((m) => m[1])
        .filter((href) => sectionRoutes.has(href))
      expect(out, `${l}: links to section pages`).toEqual([])
      expect(html).not.toContain('name="robots" content="noindex"')
    }
  })

  it('numbers the home contents 00, 01, … in reading order', () => {
    for (const l of locales) {
      const html = pages.get(`${prefix(l)}/`)!
      const toc = /<nav id="toc"[\s\S]*?<\/nav>/.exec(html)![0]
      const nums = [...toc.matchAll(/class="toc-p"[^>]*>\s*(\d*)\s*</g)].map((m) => m[1])
      const parts = nums.filter(Boolean)
      expect(parts, l).toEqual(parts.map((_, i) => String(i).padStart(2, '0')))
      expect(parts.length, l).toBe(Object.keys(pageSlugs).length + 1)
    }
  })

  it('redirects the old one-page guide URLs to the home, out of the sitemap', () => {
    const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8')
    for (const l of locales) {
      const route = `${prefix(l)}/${fullGuideSlugs[l]}/`
      expect(pages.get(route), route).toMatch(
        new RegExp(`http-equiv="refresh" content="0;url=${prefix(l)}/"`),
      )
      expect(sitemap).not.toContain(`${SITE}${route}<`)
    }
  })
})
