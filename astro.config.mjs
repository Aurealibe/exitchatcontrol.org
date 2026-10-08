// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defaultLocale, locales } from './src/i18n/locales'
import { fullGuidePaths, sitemapAlternates } from './src/lib/alternates'

// Static multilingual guide. `/` is English (canonical); every other
// locale in src/i18n/config.ts gets a full prerendered translation at
// /<lang>/ — no dual-language DOM, no runtime language CSS toggling.
// The whole site must stay readable with JS off.
export default defineConfig({
  site: 'https://exitchatcontrol.org',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    // keep every stylesheet external so the CSP can stay `style-src 'self'`
    // (inline <style> would need per-build hashes)
    inlineStylesheets: 'never',
  },
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !fullGuidePaths.has(new URL(page).pathname),
      // hreflang clusters from the localized slugs (see src/lib/alternates.ts)
      serialize(item) {
        item.links = sitemapAlternates.get(new URL(item.url).pathname)
        return item
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
