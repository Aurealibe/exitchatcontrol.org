# Exit Chat Control

[![ci](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/ci.yml/badge.svg)](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/ci.yml)
[![link-rot](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/link-rot.yml/badge.svg)](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/link-rot.yml)

Guide bilingue (FR / EN — néerlandais en cours de portage, voir Langues) pour
échapper à **Chat Control** et reprendre sa souveraineté numérique : messagerie
chiffrée, e-mail, VPN, DNS, 2FA, Linux, GrapheneOS, auto-hébergement. Chaque
outil : « à quoi ça sert », « pourquoi », « pour qui », « comment l'installer ».
Et pour comprendre contre quoi on se protège :

- la **chronologie des précédents** — 25 ans de dérives sourcées (1993 → 2026),
  chaque entrée datée + un document primaire ;
- l'**observatoire « Big Brother, pièce par pièce »** — la dérive EN COURS
  (2024 → 2026) sur les cinq fronts à la fois (messages, argent, identité,
  information, biométrie), 35 faits filtrables par région/front, deep-linkables,
  avec **LE FIL** (téléscripteur des dernières entrées) et la contre-vague
  (dont [Tapestry](https://thealliance.ai/projects/tapestry), l'IA fédérée) ;
- l'**annuaire open source** — 68 projets en 14 catégories, licences vérifiées ;
- les **initiatives alliées** et une **checklist de migration** (progression
  stockée uniquement dans votre navigateur).

**Zéro traqueur, zéro cookie, zéro requête externe** — polices système, icônes
embarquées au build. Ouvrez l'inspecteur réseau et vérifiez.

🔗 **Site : https://exitchatcontrol.org**

## What is this? (EN)

On 9 July 2026, the European Parliament let "Chat Control" through, opening the
door to the scanning of private messages across the EU. This project is a
practical, no-nonsense answer: a fast, prerendered page referencing
privacy-respecting tools anyone can use to opt out of mass surveillance, from
the everyday citizen to the whistleblower. English landing: **`/en/`**.

## Langues · Languages

- **Français** — original, défaut.
- **English** — complet, avec sa page d'atterrissage `/en/`.
- **Nederlands** — une traduction complète a été contribuée par
  [@thomasboom](https://github.com/thomasboom) sur l'ancienne version
  mono-fichier (merci / bedankt!). Elle est en cours de portage vers le modèle
  de contenu structuré (`src/content/`, feuilles `<T>`) ; en attendant, le
  texte NL reste accessible via `git show 471bbbc:index.html`. Rien n'est perdu.

## Stack

Vite + React 19 + Tailwind v4 (`@tailwindcss/vite`) + `vite-plugin-react-ssg` :
tout le guide est **prérendu en HTML statique** (lisible JS coupé — Tor Browser
« le plus sûr » compris), puis hydraté pour les toggles langue/thème, les filtres
(profil + observatoire) et la checklist. L'esthétique « dossier tamponné » vit
dans deux couches : `src/styles/tokens.css` (les tokens + composants) et
`src/styles/dossier.css` (le grain, la couverture, LE FIL — compositor-only,
`prefers-reduced-motion` respecté partout).

L'esprit « un fichier qu'on ouvre » de la v1 est conservé — en plus fort :
chaque build produit **`dist/exitchatcontrol-offline.html`**, le guide entier
en UN fichier interactif sans React (langue, thème, filtres, checklist, FIL).

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # type-check + prerender + /en/ + sitemap + artefact offline
pnpm preview    # sert dist/
pnpm test       # intégrité du contenu (précédents, observatoire, annuaire, icônes)
pnpm lint       # eslint --max-warnings 0
pnpm icons      # régénère src/icons.generated.ts depuis simple-icons
node scripts/e2e.mjs         # battery complète : statique + hydraté + axe (2 thèmes) + offline
node scripts/check-links.mjs # sonde chaque source primaire citée (aussi en cron hebdo)
```

## Contenu

- **`src/content/events.tsx`** : les précédents 1993-2026 (données, testées).
- **`src/content/drift.tsx`** : l'observatoire 2024-2026 (données, testées,
  disjointes des précédents par test).
- **`src/content/directory.tsx`** : l'annuaire open source (licences testées).
- **`src/sections/`** : les sections du guide (FR/EN via `<T>`).
- **`docs/REVIEW.md`** : review v1 → v2. **`docs/RESEARCH.md`** : sources primaires
  de la chaîne législative Chat Control + méthodes des projets de chronique.
- **`article-presse.md`** : article prêt à publier.

## Publication

Site statique : déposez `dist/` sur n'importe quel hébergeur statique (ou servez-le
avec Caddy). Chaque build produit aussi :
- **`dist/en/index.html`** — la page d'atterrissage anglaise (`/en/`, même DOM
  bilingue, tête et attributs EN par défaut, cluster hreflang propre) ;
- **`dist/exitchatcontrol-offline.html`** — le guide entier en un seul fichier,
  interactif sans React (langue, thème, filtres, checklist, FIL) — mirrorable,
  envoyable, archivable.

## Contributing

Contributions are very welcome — corrections, translations and new tool entries.
To be accepted, an app must meet **three simple rules** (upstream policy):

1. **It has traction** — an established, actively maintained project with a real
   user base, not an obscure or abandoned tool.
2. **It is open source** — for the directory, the license is verified against
   the repository (source-available doesn't qualify).
3. **It is privacy-respecting.**

**How to contribute:** tool entries live in typed data files under
`src/content/` (`directory.tsx` for the directory, section files for the full
cards) — `pnpm test` tells you if an entry is malformed. Not comfortable with
code? Open an Issue with the app's name, link, and why it qualifies.
Cited sources must be primary and are link-checked weekly.

## Licence

MIT — voir `LICENSE`. Icônes de marques : [simple-icons](https://github.com/simple-icons/simple-icons) (CC0), inlinées au build.
