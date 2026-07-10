// QA gate for the content migration: proves that, inside the narrative window
// (everything between the first section head and the manifesto), the built
// pages carry EXACTLY the legacy prose, line-for-line and in order, modulo
// the documented categories below. Anything else fails loudly.
//
// Categories (each is reported with counts and samples):
//   labels      built-only lines that are ToolCard field labels — in the
//               legacy page these strings were CSS-generated (::before
//               content), so they are absent from the legacy DOM text.
//   excluded    legacy-only lines that belong to the deliberately deferred
//               legislative-status claims (see extract-log.json).
//   quotes      " and ' are typeset as “ ” ‘ ’ by Astro's default
//               markdown `smartypants`; normalized before comparing.
//   spacing     identical text but different whitespace at tag boundaries
//               (component templates put line breaks between inline elements
//               where the legacy HTML had none).
//
// Usage: node migration/compare.mjs   (after extract + build + extract --built)

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const INV = join(dirname(fileURLToPath(import.meta.url)), 'inventory')
const BASE_LANGS = ['en', 'fr', 'nl']
// Czech was added after the one-off legacy extraction, so compare it only if
// both inventories have explicitly been produced.
const OPTIONAL_LANGS = ['cs']
const optionalLangs = OPTIONAL_LANGS.filter(
  (lang) =>
    existsSync(join(INV, `legacy-${lang}.txt`)) && existsSync(join(INV, `built-${lang}.txt`)),
)
const LANGS = [...BASE_LANGS, ...optionalLangs]

const LABELS = {
  en: new Set(["What it's for", 'Why it matters', 'For whom & when', 'Install & use']),
  fr: new Set(['À quoi ça sert', 'Pourquoi', 'Pour qui & quand', 'Installer & utiliser']),
  nl: new Set([
    'Waarvoor dient het',
    'Waarom het ertoe doet',
    'Voor wie & wanneer',
    'Installeren & gebruiken',
  ]),
  cs: new Set(['K čemu slouží', 'Proč na tom záleží', 'Pro koho a kdy', 'Instalace a použití']),
}

// The six cell lines per language of the two deferred #menace table rows.
const EXCLUDED = {
  en: [
    'Duration',
    'Temporary, extended to 3 April 2028',
    'Permanent',
    'Status (Jul 2026)',
    'Adopted 9 July 2026',
    'Under negotiation, 5th trilogue failed 29 June',
  ],
  fr: [
    'Durée',
    "Temporaire, prolongé jusqu'au 3 avril 2028",
    'Permanent',
    'Statut (juil. 2026)',
    'Adopté le 9 juillet 2026',
    'En négociation, 5e trilogue échoué le 29 juin',
  ],
  nl: [
    'Looptijd',
    'Tijdelijk, verlengd tot 3 april 2028',
    'Permanent',
    'Status (juli 2026)',
    'Aangenomen op 9 juli 2026',
    'In onderhandeling, 5e trialoog mislukt op 29 juni',
  ],
  cs: [
    'Doba trvání',
    'Dočasné, prodlouženo do 3. dubna 2028',
    'Trvalé',
    'Stav (červenec 2026)',
    'Přijato 9. července 2026',
    'V jednání, 5. trialog selhal 29. června',
  ],
}

const unquote = (s) => s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
const START = /^(PART|PARTIE|DEEL|ČÁST|MEMO) 00 · |^(PART|PARTIE|DEEL|ČÁST) 00 · /
const END =
  /(become ungovernable|devenir ingouvernable|onbestuurbaar worden|neovladateln|stát se neovladateln)/i

function narrativeWindow(lines, file) {
  const start = lines.findIndex((l) => START.test(l))
  // the end sentinel is searched after the start (the new hero h1 also
  // contains "Become Ungovernable")
  const end = lines.findIndex((l, idx) => idx > start && END.test(l))
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`cannot find narrative window in ${file} (start=${start}, end=${end})`)
  }
  return {
    head: lines.slice(0, start),
    body: lines.slice(start, end + 1),
    tail: lines.slice(end + 1),
  }
}

const report = {}
let failed = false

for (const lang of LANGS) {
  const legacyAll = readFileSync(join(INV, `legacy-${lang}.txt`), 'utf8')
    .trimEnd()
    .split(/\r?\n/)
  const builtAll = readFileSync(join(INV, `built-${lang}.txt`), 'utf8')
    .trimEnd()
    .split(/\r?\n/)
  const legacy = narrativeWindow(legacyAll, `legacy-${lang}.txt`)
  const built = narrativeWindow(builtAll, `built-${lang}.txt`)

  const excludedPending = [...EXCLUDED[lang]]
  const stats = { labels: 0, excluded: [], quotes: 0, spacing: [], unexplained: [] }

  let i = 0
  let j = 0
  const L = legacy.body
  const B = built.body.map(unquote)
  const Braw = built.body
  while (i < L.length || j < B.length) {
    const a = L[i]
    const b = B[j]
    if (a !== undefined && b !== undefined && a === b) {
      if (Braw[j] !== b) stats.quotes++
      i += 1
      j += 1
      continue
    }
    if (a !== undefined && b !== undefined && a.replace(/\s+/g, '') === b.replace(/\s+/g, '')) {
      if (Braw[j] !== b) stats.quotes++
      stats.spacing.push(a.length > 90 ? a.slice(0, 90) + '…' : a)
      i += 1
      j += 1
      continue
    }
    if (b !== undefined && LABELS[lang].has(b)) {
      stats.labels++
      j++
      continue
    }
    if (a !== undefined && excludedPending.includes(a)) {
      excludedPending.splice(excludedPending.indexOf(a), 1)
      stats.excluded.push(a)
      i++
      continue
    }
    stats.unexplained.push({ line: i + 1, legacy: a ?? '(end)', built: b ?? '(end)' })
    failed = true
    if (stats.unexplained.length > 10) break
    i += 1
    j += 1
  }

  report[lang] = {
    legacy: { chromeHead: legacy.head.length, narrative: L.length, chromeTail: legacy.tail.length },
    built: { chromeHead: built.head.length, narrative: B.length, chromeTail: built.tail.length },
    matchedAfterCategories: !stats.unexplained.length,
    toolCardLabelLines: stats.labels,
    deferredLegislativeLines: stats.excluded,
    linesWithSmartQuotes: stats.quotes,
    tagBoundarySpacingLines: stats.spacing.length,
    tagBoundarySpacingSamples: stats.spacing.slice(0, 8),
    unexplained: stats.unexplained,
  }
}

writeFileSync(join(INV, 'compare-report.json'), JSON.stringify(report, null, 2) + '\n')
for (const [lang, r] of Object.entries(report)) {
  console.log(
    `${lang}: narrative legacy=${r.legacy.narrative} built=${r.built.narrative} | ` +
      `labels=+${r.toolCardLabelLines} excluded=-${r.deferredLegislativeLines.length} ` +
      `smartquotes=${r.linesWithSmartQuotes} spacing=${r.tagBoundarySpacingLines} ` +
      `unexplained=${r.unexplained.length}`,
  )
  for (const u of r.unexplained) console.log('  MISMATCH', u)
}
process.exit(failed ? 1 : 0)
