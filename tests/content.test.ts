import { describe, expect, it } from 'vitest'
import { EVENTS } from '../src/content/events'
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
