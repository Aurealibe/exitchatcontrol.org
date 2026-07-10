// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defaultLocale, locales } from './src/i18n/locales'

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
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((l) => [l, l])),
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
