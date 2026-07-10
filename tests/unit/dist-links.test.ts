import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import allowlist from '../../src/data/domains-allowlist.json'

// The anti-backlink gate, run against the BUILT site (ground truth).
// PR #1 taught us the lesson: a smuggled external link must never be
// mergeable silently. Every external hostname in dist/ must be declared
// in src/data/domains-allowlist.json (a reviewable diff), and every
// external anchor must carry the full safe rel.
//
// Requires `pnpm build` first (CI builds before testing).

const DIST = 'dist'

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return htmlFiles(path)
    return entry.name.endsWith('.html') ? [path] : []
  })
}

const built = existsSync(DIST)

describe.skipIf(!built)('built site external links', () => {
  const allowed = new Set<string>(allowlist.domains)
  const anchorRe = /<a\s[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi

  const anchors: { file: string; href: string; tag: string }[] = []
  for (const file of htmlFiles(DIST)) {
    const html = readFileSync(file, 'utf8')
    for (const m of html.matchAll(anchorRe)) {
      anchors.push({ file, href: m[1]!, tag: m[0]! })
    }
  }

  it('found external anchors to audit (sanity)', () => {
    expect(anchors.length).toBeGreaterThan(0)
  })

  it('every external hostname is on the allowlist', () => {
    const offenders = anchors
      .map((a) => ({ ...a, host: new URL(a.href).hostname }))
      .filter((a) => !allowed.has(a.host) && a.host !== 'exitchatcontrol.org')
    expect(
      offenders.map((o) => `${o.host} (${o.file})`),
      'unlisted external domain in built output — add it to domains-allowlist.json ONLY after review',
    ).toEqual([])
  })

  it('every external anchor is https and carries rel="noopener noreferrer"', () => {
    const offenders = anchors.filter(
      (a) =>
        !a.href.startsWith('https://') ||
        !/rel="[^"]*noopener[^"]*"/.test(a.tag) ||
        !/rel="[^"]*noreferrer[^"]*"/.test(a.tag),
    )
    expect(offenders.map((o) => o.tag)).toEqual([])
  })

  it('never links the domains PR #1 tried to smuggle in', () => {
    for (const { tag } of anchors) {
      expect(tag).not.toMatch(/nika\.sh|vpn-gratuit\.fr/)
    }
  })
})

describe('allowlist hygiene', () => {
  it('is sorted and unique (reviewable diffs)', () => {
    const domains = allowlist.domains
    expect([...new Set(domains)].sort()).toEqual(domains)
  })
})
