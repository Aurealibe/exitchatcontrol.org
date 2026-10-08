/* hreflang clusters for the sitemap. Section and tool slugs are localized,
   so @astrojs/sitemap's i18n option (which pairs identical paths across
   locale prefixes) can't find the translations: astro.config.mjs maps each
   URL to its cluster from here instead. Mirrors the <link rel="alternate">
   set that Base.astro prints on every page. */
import tools from '../data/tools.json'
import { localePath, locales, type Locale } from '../i18n/config'
import { pageSlugs, type PageId } from '../i18n/slugs'
import { allLocales, homeHref, pageHref, toolHref } from './pages'

const SITE = 'https://exitchatcontrol.org'

const clusters: Record<Locale, string>[] = [
  allLocales(homeHref),
  allLocales((l) => `${localePath(l)}/quiz/`),
  ...(Object.keys(pageSlugs) as PageId[])
    .filter((id) => id !== 'full')
    .map((id) => allLocales((l) => pageHref(l, id))),
  ...tools.map((t) => allLocales((l) => toolHref(l, t.id))),
]

/** pathname → sitemap `links` (every locale + x-default). */
export const sitemapAlternates = new Map(
  clusters.flatMap((cluster) => {
    const links = [
      ...locales.map((lang) => ({ lang, url: `${SITE}${cluster[lang]}` })),
      { lang: 'x-default', url: `${SITE}${cluster.en}` },
    ]
    return locales.map((l) => [cluster[l], links] as const)
  }),
)

/** The one-page guide: noindex, so kept out of the sitemap. */
export const fullGuidePaths = new Set(locales.map((l) => pageHref(l, 'full')))
