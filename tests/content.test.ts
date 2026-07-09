import { describe, expect, it } from 'vitest'
import { EVENTS } from '../src/content/events'
import { DIRECTORY, DIR_CATEGORIES } from '../src/content/directory'
import { DRIFT, driftTags } from '../src/content/drift'
import { BRAND_ICONS } from '../src/icons.generated'

/* Content-integrity tests: the build itself is the render test (the SSG
   prerender executes <Home/> server-side), so these guard the DATA the
   render consumes — the precedents timeline and the embedded icon set. */

describe('precedents timeline', () => {
  it('has a substantial, chronologically sorted event list', () => {
    expect(EVENTS.length).toBeGreaterThanOrEqual(15)
    expect(EVENTS.length).toBeLessThanOrEqual(30)
    const years = EVENTS.map((e) => Number(e.date.slice(0, 4)))
    const sorted = [...years].sort((a, b) => a - b)
    expect(years).toEqual(sorted)
  })

  it('every event is bilingual, tagged with a known kind, and primary-sourced over https', () => {
    const kinds = new Set(['promise', 'creep', 'struck', 'revealed'])
    for (const ev of EVENTS) {
      expect(kinds.has(ev.kind), `${ev.date}: kind ${ev.kind}`).toBe(true)
      expect(ev.title.fr.length).toBeGreaterThan(3)
      expect(ev.title.en.length).toBeGreaterThan(3)
      expect(ev.src.href.startsWith('https://'), `${ev.date}: ${ev.src.href}`).toBe(true)
      expect(ev.src.label.length).toBeGreaterThan(2)
    }
  })

  it('covers the full arc: opens in the 90s crypto wars, ends on the 9 July 2026 vote', () => {
    expect(EVENTS[0].date).toBe('1993')
    expect(EVENTS[EVENTS.length - 1].date).toBe('2026-07-09')
  })

  it('dates are unique (each event is deep-linkable as #tl-<date>)', () => {
    const dates = EVENTS.map((e) => e.date)
    expect(new Set(dates).size).toBe(dates.length)
  })
})

describe('open-source directory', () => {
  const SPDX_ALLOWED = new Set([
    'AGPL-3.0', 'GPL-3.0', 'GPL-2.0', 'GPL-2.0/3.0', 'LGPL-3.0', 'MIT',
    'Apache-2.0', 'MPL-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'EUPL-1.2', 'Artistic/GPL',
  ])

  it('every entry: known category, allowed free-software license, https link, bilingual', () => {
    const cats = new Set(DIR_CATEGORIES.map((c) => c.key))
    for (const e of DIRECTORY) {
      expect(cats.has(e.cat), `${e.name}: cat ${e.cat}`).toBe(true)
      expect(SPDX_ALLOWED.has(e.license), `${e.name}: license ${e.license}`).toBe(true)
      expect(e.href.startsWith('https://'), e.name).toBe(true)
      expect(e.fr.length).toBeGreaterThan(10)
      expect(e.en.length).toBeGreaterThan(10)
    }
  })

  it('names are unique, coverage substantial, no empty category', () => {
    const names = DIRECTORY.map((e) => e.name)
    expect(new Set(names).size).toBe(names.length)
    expect(DIRECTORY.length).toBeGreaterThanOrEqual(50)
    for (const c of DIR_CATEGORIES) {
      expect(DIRECTORY.some((e) => e.cat === c.key), c.key).toBe(true)
    }
  })

  it('nika is listed in the agentic-AI category, AGPL, pointing at nika.sh', () => {
    const nika = DIRECTORY.find((e) => e.name === 'Nika')
    expect(nika).toBeDefined()
    expect(nika?.cat).toBe('ia-locale-agentique')
    expect(nika?.license).toBe('AGPL-3.0')
    expect(nika?.href).toBe('https://nika.sh')
  })
})

describe('big brother observatory (drift)', () => {
  it('has a substantial, chronologically sorted list', () => {
    expect(DRIFT.length).toBeGreaterThanOrEqual(18)
    expect(DRIFT.length).toBeLessThanOrEqual(45)
    const dates = DRIFT.map((e) => e.date)
    expect(dates).toEqual([...dates].sort())
  })

  it('ids are unique slugs (each event deep-linkable as #bb-<id>)', () => {
    const ids = DRIFT.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id, id).toMatch(/^[a-z0-9-]+$/)
  })

  it('every event is bilingual, tagged, statused and primary-sourced over https', () => {
    for (const ev of DRIFT) {
      expect(ev.themes.length, ev.id).toBeGreaterThanOrEqual(1)
      expect(ev.title.fr.length, ev.id).toBeGreaterThan(3)
      expect(ev.title.en.length, ev.id).toBeGreaterThan(3)
      expect(ev.body.fr.length, ev.id).toBeGreaterThan(80)
      expect(ev.body.en.length, ev.id).toBeGreaterThan(80)
      expect(ev.src.href.startsWith('https://'), `${ev.id}: ${ev.src.href}`).toBe(true)
      expect(ev.src.label.length, ev.id).toBeGreaterThan(2)
      expect(driftTags(ev), ev.id).toMatch(/^(eu|fr|world)( (messaging|identity|money|media|aibio))+$/)
    }
  })

  it('covers all 5 fronts and the 3 region groups (no filter chip is ever empty)', () => {
    const tags = new Set(DRIFT.flatMap((e) => driftTags(e).split(' ')))
    for (const t of ['eu', 'fr', 'world', 'messaging', 'identity', 'money', 'media', 'aibio']) {
      expect(tags.has(t), t).toBe(true)
    }
  })

  it('does not duplicate the precedents timeline (the two dossiers stay disjoint)', () => {
    const tl = new Set(EVENTS.map((e) => e.src.href))
    for (const ev of DRIFT) {
      expect(tl.has(ev.src.href), `${ev.id} reuses a precedents source`).toBe(false)
    }
  })
})

describe('embedded brand icons', () => {
  it('ships enough icons and every path is inline SVG data (no URL, no CDN)', () => {
    const entries = Object.entries(BRAND_ICONS)
    expect(entries.length).toBeGreaterThanOrEqual(30)
    for (const [slug, path] of entries) {
      expect(/^[Mm]/.test(path), slug).toBe(true)
      expect(path.includes('://'), slug).toBe(false)
    }
  })
})
