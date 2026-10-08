import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// One entry per guide section per locale (src/content/sections/<locale>/NN-<slug>.mdx).
// `id` is the LEGACY anchor id of the section (e.g. "menace", "messagerie"):
// it must be preserved on the rendered <section> wrapper so every historical
// deep link keeps working.
const sections = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/sections' }),
  schema: z.object({
    id: z.string(),
    part: z.number(),
    order: z.number(),
    title: z.string(),
    // Search-result snippet of the section's own page (SEO split).
    description: z.string().optional(),
  }),
})

// One entry per tool card per locale (src/content/tools/<locale>/<slug>.mdx):
// the <ToolCard> block with its localized slots. Sections embed it through
// <Tool id="…" />, and the product page renders it on its own.
const tools = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/tools' }),
  schema: z.object({
    tool: z.string(),
  }),
})

export const collections = { sections, tools }
