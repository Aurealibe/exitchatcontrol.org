/* Derives dist/en/index.html — the real English landing page — from the
   prerendered dist/index.html. Same bilingual DOM (both languages are in it),
   but EN-default <html> attributes + EN head, so crawlers index an actual
   English page instead of a ?lang= query variant. The boot script treats the
   /en path as the language default (sharer's intent). */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url).pathname
let html = readFileSync(join(dist, 'index.html'), 'utf8')

/* The prerenderer overwrites the template's lang attribute with its own
   default (`<html lang="en" data-lang="fr">`), which mislabels the French
   page for screen readers and crawlers when JS is off. Repair FR first —
   the offline artifact is derived from this file afterwards, so it inherits
   the fix (build order: vite build → this script → postbuild-offline). */
const htmlTagRe = /<html lang="[a-z-]+" data-lang="fr">/
if (!htmlTagRe.test(html)) {
  console.error('postbuild-en: unexpected <html> tag shape in dist/index.html')
  process.exit(1)
}
html = html.replace(htmlTagRe, '<html lang="fr" data-lang="fr">')
writeFileSync(join(dist, 'index.html'), html)

const TITLE_EN = 'Exit Chat Control · Becoming ungovernable'
const DESC_EN =
  'Chat Control wants to scan your private messages. A bilingual (FR/EN) field manual to take back control: encrypted messaging, email, VPN, Linux, GrapheneOS, self-hosting — step by step, from citizen to whistleblower.'

const swaps = [
  // html element: EN defaults (pre-hydration + no-JS readers get English)
  [/<html lang="fr" data-lang="fr">/, '<html lang="en" data-lang="en">'],
  [/<title>[^<]*<\/title>/, `<title>${TITLE_EN}</title>`],
  [/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${DESC_EN}$2`],
  // canonical + og point at the /en/ page itself (the prerenderer strips
  // self-closing slashes, so match the emitted `<link …>` shape)
  [/<link rel="canonical" href="https:\/\/exitchatcontrol\.org\/"\s*\/?>/, '<link rel="canonical" href="https://exitchatcontrol.org/en/">'],
  [/(<meta property="og:url" content=")[^"]*(")/, '$1https://exitchatcontrol.org/en/$2'],
  [/(<meta property="og:title" content=")[^"]*(")/, `$1${TITLE_EN}$2`],
  [/(<meta property="og:description" content=")[^"]*(")/, `$1The EU let private-message scanning through. A digital sovereignty field manual, step by step: Signal, Proton, Mullvad, Linux, GrapheneOS, self-hosting. Free, tracker-free, open source.$2`],
  [/(<meta property="og:locale" content=")fr_FR(")/, '$1en_GB$2'],
  [/(<meta property="og:locale:alternate" content=")en_GB(")/, '$1fr_FR$2'],
  [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${TITLE_EN}$2`],
  [/(<meta name="twitter:description" content=")[^"]*(")/, '$1Private-message scanning is now allowed in the EU. Here is how to take back control, step by step.$2'],
  // structured data: this page is the English article
  [/("headline": ")[^"]*(")/, '$1Becoming Ungovernable: escape Chat Control$2'],
  [/("description": ")[^"]*(")/, `$1${DESC_EN}$2`],
  [/("inLanguage": ")fr(")/, '$1en$2'],
]

for (const [re, replacement] of swaps) {
  const before = html
  html = html.replace(re, replacement)
  if (html === before) {
    console.error(`postbuild-en: pattern did not match: ${re}`)
    process.exit(1)
  }
}

mkdirSync(join(dist, 'en'), { recursive: true })
writeFileSync(join(dist, 'en', 'index.html'), html)
console.log('english landing: dist/en/index.html —', Math.round(html.length / 1024), 'KB, lang=en default')
