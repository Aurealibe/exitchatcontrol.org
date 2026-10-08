// One-shot migration (SEO split): moves every <ToolCard tool="…">…</ToolCard>
// block out of src/content/sections/<lang>/*.mdx into its own entry
// src/content/tools/<lang>/<slug>.mdx, and leaves a <Tool id="…" />
// reference in the section. The block itself is copied verbatim (slots
// unchanged), so the rendered card is byte-for-byte the same; only the
// `variant` prop is threaded through for the standalone product page.
// Also records each tool's home section in src/data/tools.json.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const SECTIONS = join(ROOT, 'src/content/sections')
const TOOLS_DIR = join(ROOT, 'src/content/tools')
const TOOLS_JSON = join(ROOT, 'src/data/tools.json')

const tools = JSON.parse(readFileSync(TOOLS_JSON, 'utf8'))
const byId = new Map(tools.map((t) => [t.id, t]))
const sectionOf = new Map()

const BLOCK = /^<ToolCard tool="([a-z0-9-]+)">\n([\s\S]*?)^<\/ToolCard>\n/gm

for (const lang of readdirSync(SECTIONS)) {
  for (const file of readdirSync(join(SECTIONS, lang))) {
    const path = join(SECTIONS, lang, file)
    const src = readFileSync(path, 'utf8')
    const sectionId = /^id: '([^']+)'/m.exec(src)[1]
    const out = src.replace(BLOCK, (block, id) => {
      const tool = byId.get(id)
      if (!tool) throw new Error(`${path}: unknown tool ${id}`)
      const prev = sectionOf.get(id)
      if (prev && prev !== sectionId) throw new Error(`${id} in ${prev} and ${sectionId}`)
      sectionOf.set(id, sectionId)
      mkdirSync(join(TOOLS_DIR, lang), { recursive: true })
      const body = block.replace(
        `<ToolCard tool="${id}">`,
        `<ToolCard tool="${id}" variant={props.variant}>`,
      )
      writeFileSync(
        join(TOOLS_DIR, lang, `${id.replace(/^t-/, '')}.mdx`),
        `---\ntool: '${id}'\n---\n\n${body}`,
      )
      return `<Tool id="${id}" />\n`
    })
    if (out.includes('<ToolCard')) throw new Error(`${path}: unmatched ToolCard left`)
    writeFileSync(path, out)
  }
}

for (const t of tools) {
  if (!sectionOf.has(t.id)) throw new Error(`${t.id} never used`)
}
const updated = tools.map(({ id, ...rest }) => ({ id, section: sectionOf.get(id), ...rest }))
writeFileSync(TOOLS_JSON, JSON.stringify(updated, null, 2) + '\n')
console.log(`extracted ${tools.length} tools`)
