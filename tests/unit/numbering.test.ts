import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { locales } from '../../src/i18n/locales'
import { DATA_PAGES } from '../../src/lib/pages'

// Part numbers are printed by hand in every language ("PARTIE 07 ·",
// "23. RÉSZ ·"…): the guide sections' part-num headers, then the dataset
// sections' eyebrows. In reading order they must run 00, 01, 02… with no
// gap or repeat, in every locale.

const partNumber = (label: string) => /(\d{2})/.exec(label.split('·')[0])?.[1]

function sectionNumbers(locale: string) {
  const dir = join('src/content/sections', locale)
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const src = readFileSync(join(dir, f), 'utf8')
      const part = Number(/^part: (\d+)/m.exec(src)![1])
      const order = Number(/^order: (\d+)/m.exec(src)![1])
      const header = /class="part-num">([\s\S]*?)<\/(?:p|div)>/.exec(src)?.[1] ?? ''
      return { f, part, order, n: partNumber(header) }
    })
    .sort((a, b) => a.part - b.part || a.order - b.order)
}

describe.each(locales)('part numbering (%s)', (locale) => {
  const dict = JSON.parse(readFileSync(`src/i18n/${locale}.json`, 'utf8'))
  const sections = sectionNumbers(locale)
  const numbers = [
    ...sections.map((s) => s.n ?? `missing in ${s.f}`),
    ...DATA_PAGES.map((id) => partNumber(dict.sections2[id].eyebrow) ?? `missing in ${id}`),
  ]

  it('runs 00, 01, 02… in reading order', () => {
    expect(numbers).toEqual(numbers.map((_, i) => String(i).padStart(2, '0')))
  })
})
