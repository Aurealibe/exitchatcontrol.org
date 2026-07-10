// One-off content migration: legacy index.html (tri-lingual data-l spans)
// -> per-locale MDX section files + language-neutral tools.json + QA inventories.
//
// Usage:
//   node migration/extract.mjs          # extract MDX + tools.json + anchors + legacy inventories
//   node migration/extract.mjs --built  # dump built-page inventories from dist/ (run after pnpm build)
//
// Fidelity rules implemented here:
// - every visible prose character of the chosen language is preserved
//   (whitespace-collapsed); inline markup becomes markdown (**/*) in
//   markdown contexts and JSX-safe HTML in JSX contexts;
// - MDX-hostile characters ({ } < > * _ [ ] ` ~ \ |) are emitted as
//   HTML character references so they render byte-identical;
// - external links keep target="_blank" and get rel="noopener noreferrer";
// - "www." in plain text is emitted as "www&#46;" so remark-gfm cannot
//   invent autolinks that the legacy page did not have.
//
// Deliberate exclusions (per migration plan, all listed in diff-report.md):
// - topbar / hero / status banner / TOC / footer (UI chrome rebuilt separately);
// - the legislative status banner and adopted/extended claims
//   (#menace table rows "Durée/Duration" and "Statut/Status");
// - the runtime simpleicons CDN script and theme/lang toggle JS.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'
import * as simpleIcons from 'simple-icons'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEGACY = join(ROOT, 'index.html')
const OUT_SECTIONS = join(ROOT, 'src/content/sections')
const OUT_TOOLS = join(ROOT, 'src/data/tools.json')
const OUT_INVENTORY = join(ROOT, 'migration/inventory')
const LANGS = ['en', 'fr', 'nl']

const warnings = []
const exclusions = []
const nlGaps = []

// ---------------------------------------------------------------------------
// text escaping
// ---------------------------------------------------------------------------

/** Escape a text node so MDX renders it byte-identical, in md or jsx context. */
function escText(s) {
  return (
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
      .replace(/\*/g, '&#42;')
      .replace(/_/g, '&#95;')
      .replace(/`/g, '&#96;')
      .replace(/\[/g, '&#91;')
      .replace(/\]/g, '&#93;')
      .replace(/~/g, '&#126;')
      .replace(/\\/g, '&#92;')
      .replace(/\|/g, '&#124;')
      // keep non-breaking spaces (French punctuation) visible in the source
      .replace(/\u00A0/g, '&nbsp;')
      // remark-gfm autolink literals: "www.x" in plain text would become a link
      .replace(/\bwww\./gi, 'www&#46;')
  )
}

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

// collapse runs of whitespace EXCEPT non-breaking spaces (French punctuation)
function collapse(s) {
  return s.replace(/[^\S\u00A0]+/g, ' ')
}

/** Guard the first character of a markdown block against list/quote/heading parsing. */
function guardBlockStart(s) {
  const m = /^(\d+[.)] |[-+>#=] )/.exec(s)
  if (!m) return s
  const c = s.charAt(0)
  return `&#${c.charCodeAt(0)};` + s.slice(1)
}

// ---------------------------------------------------------------------------
// language filtering
// ---------------------------------------------------------------------------

/**
 * Reduce a cloned DOM subtree to one language: in every run of consecutive
 * [data-l] siblings, unwrap the spans of `lang` and drop the others.
 * If a run carries no span for `lang`, fall back to English and log it.
 */
function filterLang($, root, lang, context) {
  const parents = new Set()
  $(root)
    .find('[data-l]')
    .each((_, el) => parents.add(el.parent))
  if ($(root).is('[data-l]')) throw new Error('unexpected data-l on root')

  for (const parent of parents) {
    const runs = []
    let run = []
    for (const node of parent.children) {
      if (node.type === 'tag' && $(node).attr('data-l')) {
        run.push(node)
      } else if (node.type === 'text' && node.data.trim() === '') {
        continue // whitespace between alternates does not break a run
      } else if (run.length) {
        runs.push(run)
        run = []
      }
    }
    if (run.length) runs.push(run)

    for (const r of runs) {
      let chosen = r.filter((n) => $(n).attr('data-l') === lang)
      if (chosen.length === 0) {
        chosen = r.filter((n) => $(n).attr('data-l') === 'en')
        nlGaps.push({ lang, context, fallback: $(chosen).text().trim().slice(0, 80) })
      }
      for (const n of r) {
        if (chosen.includes(n)) $(n).replaceWith($(n).contents())
        else $(n).remove()
      }
    }
  }
  if ($(root).find('[data-l]').length) {
    throw new Error(`unfiltered data-l spans left in ${context}`)
  }
}

// ---------------------------------------------------------------------------
// inline serialization
// ---------------------------------------------------------------------------

function serializeLink($, a) {
  const href = $(a).attr('href') ?? ''
  const inner = inlineChildren($, a, 'jsx')
  if (href.startsWith('#')) return `<a href="${escAttr(href)}">${inner}</a>`
  return `<a href="${escAttr(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
}

/** Serialize the children of `el` as inline MDX content. mode: 'md' | 'jsx'. */
function inlineChildren($, el, mode) {
  let out = ''
  for (const node of el.children) {
    if (node.type === 'text') {
      out += escText(collapse(node.data))
      continue
    }
    if (node.type === 'comment') continue
    if (node.type !== 'tag') throw new Error(`unexpected node type ${node.type}`)
    const tag = node.tagName
    const inner = () => inlineChildren($, node, mode)
    if (tag === 'b' || tag === 'strong') {
      const hasChildEl = node.children.some((n) => n.type === 'tag')
      if (mode === 'md' && !hasChildEl) {
        out += wrapMd(inner(), '**')
      } else {
        out += `<${tag}>${inner()}</${tag}>`
      }
    } else if (tag === 'em' || tag === 'i') {
      const hasChildEl = node.children.some((n) => n.type === 'tag')
      if (mode === 'md' && !hasChildEl) {
        out += wrapMd(inner(), '*')
      } else {
        out += `<${tag}>${inner()}</${tag}>`
      }
    } else if (tag === 'sup') {
      out += `<sup>${inner()}</sup>`
    } else if (tag === 'br') {
      out += '<br />'
    } else if (tag === 'a') {
      out += serializeLink($, node)
    } else if (tag === 'span') {
      const cls = $(node).attr('class')
      out += cls ? `<span class="${escAttr(cls)}">${inner()}</span>` : `<span>${inner()}</span>`
    } else {
      throw new Error(`unhandled inline tag <${tag}> in ${$(el).attr('class') ?? el.tagName}`)
    }
  }
  return out
}

/** Wrap trimmed content in markdown emphasis markers, keeping outer spaces outside. */
function wrapMd(inner, marker) {
  const lead = /^\s/.test(inner) ? ' ' : ''
  const trail = /\s$/.test(inner) ? ' ' : ''
  const core = inner.trim()
  if (!core) return inner
  return `${lead}${marker}${core}${marker}${trail}`
}

function inlineMd($, el) {
  return guardBlockStart(inlineChildren($, el, 'md').trim())
}

function inlineJsx($, el) {
  return inlineChildren($, el, 'jsx').trim()
}

// ---------------------------------------------------------------------------
// JSX block serialization (tables, callouts, grids… anything with structure)
// ---------------------------------------------------------------------------

// Elements whose content is serialized on a single line (phrasing content).
const JSX_LEAF = new Set(['p', 'li', 'h3', 'h4', 'td', 'th', 'span', 'blockquote', 'small', 'b'])
// Elements serialized as multi-line containers of element children.
const JSX_CONTAINER = new Set(['div', 'ul', 'ol', 'table', 'thead', 'tbody', 'tr', 'details'])

function jsxAttrs($, el, extra = {}) {
  const keep = {}
  const cls = $(el).attr('class')
  if (cls) keep.class = cls
  for (const name of ['aria-label', 'aria-hidden', 'colspan', 'rowspan', 'start']) {
    const v = $(el).attr(name)
    if (v !== undefined) keep[name] = v
  }
  const style = $(el).attr('style')
  if (style) {
    // presentation only; styling is rebuilt later
    warnings.push(`dropped inline style "${style}" on <${el.tagName} class="${cls ?? ''}">`)
  }
  Object.assign(keep, extra)
  return Object.entries(keep)
    .map(([k, v]) => ` ${k}="${escAttr(String(v))}"`)
    .join('')
}

function jsxBlock($, el, indent = '', extraAttrs = {}) {
  const tag = el.tagName
  if (tag === 'a') return indent + serializeLink($, el)
  const attrs = jsxAttrs($, el, extraAttrs)
  const elementKids = el.children.filter((n) => n.type === 'tag')
  const significantText = el.children.some((n) => n.type === 'text' && n.data.trim() !== '')
  if (JSX_LEAF.has(tag) || significantText || elementKids.length === 0) {
    return `${indent}<${tag}${attrs}>${inlineJsx($, el)}</${tag}>`
  }
  if (!JSX_CONTAINER.has(tag)) throw new Error(`unhandled jsx block <${tag}>`)
  const inner = elementKids.map((k) => jsxBlock($, k, indent + '  ')).join('\n')
  return `${indent}<${tag}${attrs}>\n${inner}\n${indent}</${tag}>`
}

// ---------------------------------------------------------------------------
// tool cards
// ---------------------------------------------------------------------------

const LEVELS = { Beginner: 1, Intermediate: 2, Advanced: 3 }

/** Extract the language-neutral facts of a tool card (called on the raw, unfiltered card). */
function extractToolFacts($, tg, iconMap, iconSlugs) {
  const id = $(tg).attr('id')
  const logo = $(tg).find('.tg-logo').first()
  const nameEl = $(tg).find('h3.tg-name').first()
  const nameLocalized = nameEl.find('[data-l]').length > 0
  // EN plain text of the name, used as the stable language-neutral name
  const clone = nameEl.clone()
  clone.find('[data-l]').each((_, s) => {
    if ($(s).attr('data-l') !== 'en') $(s).remove()
  })
  const nameEn = collapse(clone.text()).trim()

  // level: from the tag whose EN text is a known level word
  let level = null
  $(tg)
    .find('.tg-tags .tg-tag')
    .each((_, t) => {
      const en = collapse($(t).find('[data-l="en"]').text()).trim()
      if (LEVELS[en]) level = LEVELS[en]
    })

  // neutral footer links (localized ones stay in the MDX, tracked by href)
  const links = []
  const localizedLinkHrefs = []
  $(tg)
    .find('.tg-foot a.tg-link')
    .each((_, a) => {
      if ($(a).find('[data-l]').length) {
        localizedLinkHrefs.push($(a).attr('href') ?? '')
        return
      }
      const label = collapse($(a).text()).trim().replace(/\s*→$/, '')
      links.push({ label, href: $(a).attr('href') })
    })

  const note = collapse($(tg).find('.tg-foot .tg-note').text()).trim()
  const profiles = [...note]

  const legacySlug = iconMap[id] ?? null
  const candidate = legacySlug && (ICON_RENAMES[legacySlug] ?? legacySlug)
  const iconSlug = candidate && iconSlugs.has(candidate) ? candidate : null
  if (legacySlug && !iconSlug) {
    warnings.push(`icon slug "${legacySlug}" (${id}) not found in simple-icons — set to null`)
  }

  return {
    nameLocalized,
    localizedLinkHrefs,
    facts: {
      id,
      name: nameEn,
      url: links[0]?.href ?? null,
      links,
      iconSlug,
      monogram: collapse(logo.text()).trim(),
      color: (/--b:\s*([^;"]+)/.exec(logo.attr('style') ?? '') ?? [])[1]?.trim() ?? null,
      level,
      profiles,
    },
  }
}

/** Serialize one (already language-filtered) tool card as a <ToolCard> MDX block. */
function toolCardMdx($, tg) {
  const id = $(tg).attr('id')
  const lines = [`<ToolCard tool="${id}">`]

  // name slot only when the legacy name carried localized content
  if (tg.__nameLocalized) {
    const nameEl = $(tg).find('h3.tg-name').first()
    lines.push(`  <Fragment slot="name">${inlineJsx($, nameEl[0])}</Fragment>`)
  }

  const tags = $(tg)
    .find('.tg-tags .tg-tag')
    .map((_, t) => `<span class="tool-tag">${inlineJsx($, t)}</span>`)
    .get()
  if (tags.length) {
    lines.push(`  <Fragment slot="tags">${tags.join('')}</Fragment>`)
  }

  for (const [slot, sel] of [
    ['what', '.lbl-what'],
    ['why', '.lbl-why'],
    ['who', '.lbl-who'],
  ]) {
    const p = $(tg).find(`p.tg-field > b${sel}`).parent()
    if (p.length !== 1) throw new Error(`tool ${id}: missing ${slot} field`)
    const cl = p.clone()
    cl.find('b.lbl').remove()
    lines.push(`  <Fragment slot="${slot}">${inlineJsx($, cl[0])}</Fragment>`)
  }

  // extra blocks (e.g. the unaudited-warning box inside t-bitchat)
  $(tg)
    .children('div.box')
    .each((_, box) => {
      lines.push(jsxBlock($, box, '  ', { slot: 'extra' }))
    })

  const steps = $(tg).find('details.tg-install > ol.tg-steps')
  if (steps.length) {
    const items = steps
      .children('li')
      .map((_, li) => `    <li>${inlineJsx($, li)}</li>`)
      .get()
    lines.push(`  <ol slot="install">\n${items.join('\n')}\n  </ol>`)
  }

  // localized footer links (neutral ones come from tools.json)
  const localizedHrefs = tg.__localizedLinkHrefs ?? []
  $(tg)
    .find('.tg-foot a.tg-link')
    .each((_, a) => {
      const href = $(a).attr('href') ?? ''
      if (!localizedHrefs.includes(href)) return
      const inner = inlineJsx($, a)
      lines.push(`  <a slot="links" class="tool-link" href="${escAttr(href)}">${inner}</a>`)
    })

  lines.push('</ToolCard>')
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// section blocks -> MDX
// ---------------------------------------------------------------------------

function blockToMdx($, el, sectionId) {
  const tag = el.tagName
  const cls = $(el).attr('class') ?? ''
  if (tag === 'div' && cls === 'part-head') {
    const parts = []
    for (const child of el.children.filter((n) => n.type === 'tag')) {
      if (child.tagName === 'div' && $(child).attr('class') === 'num') {
        parts.push(`<p class="part-num">${inlineJsx($, child)}</p>`)
      } else if (child.tagName === 'h2') {
        parts.push(`## ${inlineMd($, child)}`)
      } else if (child.tagName === 'p') {
        parts.push(inlineMd($, child))
      } else {
        throw new Error(`unhandled part-head child <${child.tagName}> in #${sectionId}`)
      }
    }
    return parts
  }
  if (tag === 'h3') return [`### ${inlineMd($, el)}`]
  if (tag === 'h4') return [`#### ${inlineMd($, el)}`]
  if (tag === 'p') return [inlineMd($, el)]
  if (tag === 'ul' || tag === 'ol') {
    const items = $(el)
      .children('li')
      .map((_, li) => inlineChildren($, li, 'md').trim())
      .get()
    const lines = items.map((t, i) => (tag === 'ol' ? `${i + 1}. ${t}` : `- ${t}`))
    return [lines.join('\n')]
  }
  if (tag === 'article' && cls.includes('tg')) return [toolCardMdx($, el)]
  if (
    (tag === 'div' &&
      /^(tablewrap|box( (warn|honest|ok|info))?|swap|namewall|profiles|eco|manifesto)$/.test(
        cls,
      )) ||
    (tag === 'blockquote' && cls === 'pull')
  ) {
    return [jsxBlock($, el)]
  }
  throw new Error(`unhandled block <${tag} class="${cls}"> in #${sectionId}`)
}

// ---------------------------------------------------------------------------
// plain-text inventories (shared by legacy and built dumps)
// ---------------------------------------------------------------------------

const TEXT_BLOCKS = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'body',
  'button',
  'details',
  'div',
  'dl',
  'dt',
  'dd',
  'fieldset',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
  'small',
])

/** One line of normalized text per block-level element. */
function textLines($, root) {
  const lines = []
  let buf = ''
  const flush = () => {
    const t = buf.replace(/[\s\u00A0]+/g, ' ').trim()
    if (t) lines.push(t)
    buf = ''
  }
  const walk = (node) => {
    if (node.type === 'text') {
      buf += node.data
      return
    }
    if (node.type !== 'tag') return
    const tag = node.tagName
    // noscript is excluded: parse5 keeps its children as raw text, which would
    // leak markup into the dump (it is new chrome, absent from the legacy page)
    if (['script', 'style', 'svg', 'template', 'noscript'].includes(tag)) return
    if (tag === 'br') {
      buf += ' '
      return
    }
    // label <b> elements get their own line so prose lines stay comparable
    const cls = ($(node).attr('class') ?? '').split(/\s+/)
    const isBlock = TEXT_BLOCKS.has(tag) || cls.includes('lbl') || cls.includes('tool-label')
    if (isBlock) flush()
    for (const c of node.children) walk(c)
    if (isBlock) flush()
  }
  walk(root)
  flush()
  return lines
}

// ---------------------------------------------------------------------------
// main passes
// ---------------------------------------------------------------------------

function loadLegacy() {
  return cheerio.load(readFileSync(LEGACY, 'utf8'))
}

function parseIconMap(html) {
  const script = /var ICONS=\{([\s\S]*?)\};/.exec(html)
  if (!script) throw new Error('legacy ICONS map not found')
  const map = {}
  for (const m of script[1].matchAll(/'([^']+)':'([^']+)'/g)) map[m[1]] = m[2]
  return map
}

function simpleIconSlugs() {
  return new Set(
    Object.values(simpleIcons)
      .map((i) => i && i.slug)
      .filter(Boolean),
  )
}

// Legacy CDN slugs whose brand was renamed in current simple-icons releases.
const ICON_RENAMES = { tutanota: 'tuta', aegis: 'aegisauthenticator' }

function applyExclusions($, log = false) {
  // Rule: adopted/extended legislative-status claims are rewritten from
  // verified sources separately -> drop the two claim rows of the #menace table.
  $('#menace .tablewrap tbody tr').each((_, tr) => {
    const firstCell = collapse($(tr).find('td').first().find('[data-l="en"]').text()).trim()
    if (firstCell === 'Duration' || /^Status/.test(firstCell)) {
      if (log) {
        exclusions.push({
          where: '#menace comparison table',
          why: 'adopted/extended legislative-status claim, deferred for verified rewrite',
          text: collapse($(tr).text()).trim(),
        })
      }
      $(tr).remove()
    }
  })
}

function extract() {
  const html = readFileSync(LEGACY, 'utf8')
  const $ = loadLegacy()
  if ($('[data-l] [data-l]').length) throw new Error('nested data-l spans — unsupported')

  mkdirSync(OUT_INVENTORY, { recursive: true })

  // ---- anchors.json: every id present in the legacy file, in document order
  const anchors = $('[id]')
    .map((_, el) => $(el).attr('id'))
    .get()
  writeFileSync(join(OUT_INVENTORY, 'anchors.json'), JSON.stringify(anchors, null, 2) + '\n')

  // ---- legacy per-language inventories (full document, before exclusions)
  for (const lang of LANGS) {
    const $full = loadLegacy()
    filterLang($full, $full('body')[0], lang, 'full-document')
    const lines = textLines($full, $full('body')[0])
    writeFileSync(join(OUT_INVENTORY, `legacy-${lang}.txt`), lines.join('\n') + '\n')
  }

  // ---- tools.json (language-neutral facts, from the raw DOM)
  const iconMap = parseIconMap(html)
  const slugs = simpleIconSlugs()
  const extracted = $('article.tg')
    .map((_, tg) => extractToolFacts($, tg, iconMap, slugs))
    .get()
  const toolsOut = extracted.map((e) => e.facts)
  mkdirSync(dirname(OUT_TOOLS), { recursive: true })
  writeFileSync(OUT_TOOLS, JSON.stringify(toolsOut, null, 2) + '\n')
  const localizedNames = new Set(extracted.filter((e) => e.nameLocalized).map((e) => e.facts.id))
  const localizedLinks = new Map(extracted.map((e) => [e.facts.id, e.localizedLinkHrefs]))

  // ---- sections -> MDX
  applyExclusions($, true)
  const sections = $('main > section').get()
  let lastPart = 0
  const written = { en: 0, fr: 0, nl: 0 }
  sections.forEach((section, idx) => {
    const id = $(section).attr('id')
    const order = idx + 1
    const numEn = collapse($(section).find('.part-head .num [data-l="en"]').text())
    const m = /(?:PART)\s+(\d+)/.exec(numEn)
    const part = m ? Number(m[1]) : lastPart
    lastPart = part

    for (const lang of LANGS) {
      const $lang = loadLegacy()
      applyExclusions($lang)
      const sec = $lang(`main > section#${id.replace(/([^\w-])/g, '\\$1')}`)[0]
      filterLang($lang, sec, lang, `#${id}`)
      // flag localized tool names / footer links for the MDX slots
      $lang(sec)
        .find('article.tg')
        .each((_, tg) => {
          const tgId = $lang(tg).attr('id')
          tg.__nameLocalized = localizedNames.has(tgId)
          tg.__localizedLinkHrefs = localizedLinks.get(tgId) ?? []
        })

      const title = collapse($lang(sec).find('.part-head h2').first().text()).trim()
      const blocks = []
      for (const child of sec.children.filter((n) => n.type === 'tag')) {
        blocks.push(...blockToMdx($lang, child, id))
      }
      const fm = [
        '---',
        `id: ${JSON.stringify(id)}`,
        `part: ${part}`,
        `order: ${order}`,
        `title: ${JSON.stringify(title)}`,
        '---',
      ].join('\n')
      const nn = String(order).padStart(2, '0')
      const dir = join(OUT_SECTIONS, lang)
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, `${nn}-${id}.mdx`), fm + '\n\n' + blocks.join('\n\n') + '\n')
      written[lang]++
    }
  })

  // ---- run log for the diff report
  const log = {
    sections: written,
    tools: toolsOut.length,
    anchors: anchors.length,
    nlGaps,
    exclusions,
    warnings,
  }
  writeFileSync(join(OUT_INVENTORY, 'extract-log.json'), JSON.stringify(log, null, 2) + '\n')
  console.log(`sections written: en=${written.en} fr=${written.fr} nl=${written.nl}`)
  console.log(`tools: ${toolsOut.length}, anchors: ${anchors.length}`)
  console.log(`NL gaps: ${nlGaps.length}`)
  console.log(`exclusions: ${exclusions.length}`)
  for (const w of warnings) console.log('WARN:', w)
}

function dumpBuilt() {
  const pages = {
    en: 'dist/index.html',
    fr: 'dist/fr/index.html',
    nl: 'dist/nl/index.html',
    cs: 'dist/cs/index.html',
  }
  for (const [lang, rel] of Object.entries(pages)) {
    const $ = cheerio.load(readFileSync(join(ROOT, rel), 'utf8'))
    const lines = textLines($, $('body')[0])
    writeFileSync(join(OUT_INVENTORY, `built-${lang}.txt`), lines.join('\n') + '\n')
    console.log(`built-${lang}.txt: ${lines.length} lines (from ${rel})`)
  }
}

if (process.argv.includes('--built')) dumpBuilt()
else extract()
