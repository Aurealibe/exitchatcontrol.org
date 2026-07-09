# exitchatcontrol

[![ci](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/ci.yml/badge.svg)](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/ci.yml)
[![link-rot](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/link-rot.yml/badge.svg)](https://github.com/Aurealibe/exitchatcontrol/actions/workflows/link-rot.yml)

Guide bilingue (FR / EN) pour échapper à **Chat Control** et reprendre sa souveraineté
numérique : messagerie chiffrée, e-mail, VPN, DNS, 2FA, Linux, GrapheneOS,
auto-hébergement. Chaque outil : « à quoi ça sert », « pourquoi », « pour qui »,
« comment l'installer ». Plus : une **chronologie sourcée de 25 ans de dérives**
(1993 → 2026), les **initiatives alliées**, et une **checklist de migration**
(progression stockée uniquement dans votre navigateur).

**Zéro traqueur, zéro cookie, zéro requête externe** — polices système, icônes
embarquées au build. Ouvrez l'inspecteur réseau et vérifiez.

## Stack

Vite + React 19 + Tailwind v4 (`@tailwindcss/vite`) + `vite-plugin-react-ssg` :
tout le guide est **prérendu en HTML statique** (lisible JS coupé — Tor Browser
« le plus sûr » compris), puis hydraté pour les toggles langue/thème, le filtre
par profil et la checklist.

```bash
pnpm install
pnpm dev        # dev server
pnpm build      # type-check + prerender + sitemap + artefact offline
pnpm preview    # sert dist/
pnpm test       # intégrité du contenu (timeline, icônes)
pnpm lint       # eslint --max-warnings 0
pnpm icons      # régénère src/icons.generated.ts depuis simple-icons
```

## Contenu

- **`src/content/events.tsx`** : la timeline des précédents (données, testées).
- **`src/sections/`** : les 20 sections du guide (FR/EN via `<T>`).
- **`docs/REVIEW.md`** : review v1 → v2. **`docs/RESEARCH.md`** : sources primaires
  de la chaîne législative Chat Control + méthodes des projets de chronique.
- **`article-presse.md`** : article prêt à publier.

## Publication

Site statique : déposez `dist/` sur n'importe quel hébergeur statique (ou servez-le
avec Caddy). Chaque build produit aussi **`dist/exitchatcontrol-offline.html`** :
le guide entier en un seul fichier (~660 KB) — mirrorable, envoyable, archivable.

Domaine : https://exitchatcontrol.org

## Licence

MIT — voir `LICENSE`. Icônes de marques : [simple-icons](https://github.com/simple-icons/simple-icons) (CC0), inlinées au build.
