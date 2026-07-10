import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  DATASET_NAMES,
  DIRECTORY_CATEGORIES,
  THEMES,
  assertOverlayParity,
  loadDataset,
} from '../../src/lib/content'
import { locales } from '../../src/i18n/locales'

/* Content-integrity tests, ported from the pr1 typed-React content to the
   JSON core + per-locale overlay split: the DATA is what the sections render,
   so these guard it at build time in every language. */

describe('core + overlay integrity', () => {
  it('every dataset merges cleanly with every locale overlay (en/fr/nl parity)', () => {
    for (const name of DATASET_NAMES) {
      for (const locale of locales) {
        const rows = loadDataset(name, locale)
        expect(rows.length, `${name}/${locale}`).toBeGreaterThan(0)
      }
    }
  })

  it('ids are unique within each dataset AND across all datasets (deep links)', () => {
    const all: string[] = []
    for (const name of DATASET_NAMES) {
      const ids = loadDataset(name, 'en').map((row) => row.id)
      expect(new Set(ids).size, name).toBe(ids.length)
      for (const id of ids) expect(id, `${name}: ${id}`).toMatch(/^[a-z0-9-]+$/)
      all.push(...ids)
    }
    const dupes = all.filter((id, i) => all.indexOf(id) !== i)
    expect(dupes, `cross-dataset id collisions: ${dupes.join(', ')}`).toEqual([])
  })

  it('the parity check throws listing every missing and extra id', () => {
    const overlay = { a: { body: 'x' }, ghost: { body: 'y' }, _marker: true }
    expect(() => assertOverlayParity(['a', 'b', 'c'], overlay, 'unit')).toThrow(
      /missing ids \(2\): b, c.*extra ids \(1\): ghost/,
    )
    expect(() => assertOverlayParity(['a', 'ghost'], overlay, 'unit')).not.toThrow()
  })

  it('nl overlays carry the machine-translated stamp (no pending marker left)', () => {
    for (const name of DATASET_NAMES) {
      const raw = JSON.parse(
        readFileSync(new URL(`../../src/i18n/content/nl/${name}.json`, import.meta.url), 'utf8'),
      ) as Record<string, unknown>
      expect(raw._machineTranslationPending, name).toBeUndefined()
      expect(raw._machineTranslated, name).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})

describe('precedents timeline (events)', () => {
  const events = loadDataset('events', 'en')

  it('has the full 23-event arc, chronologically sorted', () => {
    expect(events).toHaveLength(23)
    const dates = events.map((e) => e.date)
    expect(dates).toEqual([...dates].sort())
  })

  it('opens in the 90s crypto wars, ends on the 9 July 2026 second-reading vote', () => {
    expect(events[0]?.id).toBe('clipper-chip')
    expect(events[0]?.date).toBe('1993')
    expect(events[events.length - 1]?.date).toBe('2026-07-09')
  })

  it('every event is titled, bodied and primary-sourced over https in every locale', () => {
    for (const locale of locales) {
      for (const ev of loadDataset('events', locale)) {
        expect(ev.title.length, `${ev.id}/${locale}`).toBeGreaterThan(3)
        expect(ev.body.length, `${ev.id}/${locale}`).toBeGreaterThan(80)
        expect(ev.src.href.startsWith('https://'), `${ev.id}: ${ev.src.href}`).toBe(true)
      }
    }
  })
})

describe('big brother observatory', () => {
  const drift = loadDataset('observatory', 'en')

  it('has 35 entries, chronologically sorted', () => {
    expect(drift).toHaveLength(35)
    const dates = drift.map((e) => e.date)
    expect(dates).toEqual([...dates].sort())
  })

  it('covers all 5 fronts and the 3 region groups (no filter chip is ever empty)', () => {
    const themes = new Set(drift.flatMap((e) => e.themes))
    for (const t of THEMES) expect(themes.has(t), t).toBe(true)
    const groups = new Set(
      drift.map((e) => (e.region === 'eu' ? 'eu' : e.region === 'fr' ? 'fr' : 'world')),
    )
    expect([...groups].sort()).toEqual(['eu', 'fr', 'world'])
  })

  it('every entry is sourced over https and stays disjoint from the precedents timeline', () => {
    const timelineSources = new Set(loadDataset('events', 'en').map((e) => e.src.href))
    for (const ev of drift) {
      expect(ev.src.href.startsWith('https://'), `${ev.id}: ${ev.src.href}`).toBe(true)
      expect(timelineSources.has(ev.src.href), `${ev.id} reuses a precedents source`).toBe(false)
    }
  })

  it('pending-verification flags only sit on the unverified 2025-09 → 2026-07 batch', () => {
    for (const ev of drift.filter((e) => e._pendingVerification)) {
      expect(
        ev.date >= '2025-09',
        `${ev.id} (${ev.date}) flagged but part of the verified batch`,
      ).toBe(true)
    }
  })
})

describe('open-source directory', () => {
  const SPDX_ALLOWED = new Set([
    'AGPL-3.0',
    'GPL-3.0',
    'GPL-2.0',
    'GPL-2.0/3.0',
    'LGPL-3.0',
    'MIT',
    'Apache-2.0',
    'MPL-2.0',
    'BSD-2-Clause',
    'BSD-3-Clause',
    'EUPL-1.2',
    'Artistic/GPL',
  ])
  const directory = loadDataset('directory', 'en')

  it('has 66 entries: free-software license allowlist, https links', () => {
    expect(directory).toHaveLength(66)
    for (const e of directory) {
      expect(SPDX_ALLOWED.has(e.license), `${e.name}: license ${e.license}`).toBe(true)
      expect(e.url.startsWith('https://'), e.name).toBe(true)
    }
  })

  it('names are unique and no category of the 14 is empty', () => {
    const names = directory.map((e) => e.name)
    expect(new Set(names).size).toBe(names.length)
    expect(DIRECTORY_CATEGORIES).toHaveLength(14)
    for (const cat of DIRECTORY_CATEGORIES) {
      expect(
        directory.some((e) => e.category === cat),
        cat,
      ).toBe(true)
    }
  })

  it('the undisclosed self-promo and scaffolding entries stay removed', () => {
    const names = new Set(directory.map((e) => e.name))
    for (const gone of ['Nika', 'goose', 'OpenHands', 'Aider', 'vLLM']) {
      expect(names.has(gone), gone).toBe(false)
    }
    expect(directory.some((e) => e.url.includes('nika.sh'))).toBe(false)
  })
})

describe('migration checklist', () => {
  const checklist = loadDataset('checklist', 'en')

  it('has the 14-step plan with all three effort levels', () => {
    expect(checklist).toHaveLength(14)
    const levels = new Set(checklist.map((c) => c.level))
    expect([...levels].sort()).toEqual(['green', 'red', 'yellow'])
  })
})

describe('allied initiatives', () => {
  const allies = loadDataset('allies', 'en')

  it('lists 8 campaigns and 8 chroniclers, all https', () => {
    expect(allies.filter((a) => a.group === 'campaigns')).toHaveLength(8)
    expect(allies.filter((a) => a.group === 'chroniclers')).toHaveLength(8)
    for (const a of allies) expect(a.url.startsWith('https://'), a.name).toBe(true)
  })
})
