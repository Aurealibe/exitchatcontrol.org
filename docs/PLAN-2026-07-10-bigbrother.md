# Plan — « Big Brother, pièce par pièce » : l'observatoire de la dérive (2026-07-10)

> **Status** · EXÉCUTÉ — section `#bigbrother` live (35 événements · 10 juridictions ·
> 5 fronts · statut `revele` pour les affaires spyware), données `src/content/drift.tsx`,
> tests contenu + volet e2e hydraté + parité offline + link-rot élargis. Note d'arc :
> le repo a migré `~/dev` → le container pendant l'exécution ; le dataset a été
> réconcilié avec le stub posé par la session annuaire (API `themes[]`/statuts FR
> conservée, son axe-pass sur les pills intégré).
>
> **Round « dossier analogique » (même jour, complément de la passe wow-nika de la
> session sœur)** · `src/styles/dossier.css` chargé après tokens.css (zéro collision) :
> grain photocopie page-wide (pseudo, axe-invisible) · hero = couverture de dossier
> (microtype dérivé 58 faits + stagger d'entrée + balayage scanner scroll-driven) ·
> **LE FIL** : ticker des 12 dernières entrées (marquee CSS, pause hover/focus/offscreen
> via IntersectionObserver miroité dans l'offline, reduced-motion → liste statique
> scrollable) · les 5 fronts = onglets numérotés 01-05 (numéral fantôme en pseudo,
> emojis retirés) · figure 1984 (watermark ghost en ::before) · meta-strip du compteur ·
> OG refaite (« Le dossier Big Brother, 1993→2026 »).

> Demande : faire *ressentir* la convergence Big Brother dans le manifeste (Chat Control
> n'est qu'une pièce : euro numérique, identité, vérification d'âge, contrôle de l'info,
> biométrie — UE **et** monde), l'appuyer sur une **nouvelle section interactive** listant
> les développements récents inquiétants, datés + sourcés primaires, et mentionner
> Tapestry (The AI Alliance) dans la contre-vague. Recherche fraîche (Perplexity,
> 3 sweeps parallèles : CSAR/chiffrement UE · constellation contrôle UE · miroir mondial).

## La thèse (ce que la section doit faire ressentir)

Orwell décrivait un télécran imposé par la force ; le nôtre s'installe par règlements,
avec des acronymes raisonnables et des prétextes irrefusables. Cinq fronts avancent
séparément — mis côte à côte, on voit la machine :

```
💬 messages      Chat Control 1.0 adopté (09-07) · CSAR en trilogue · ProtectEU « lawful access »
💶 argent        euro numérique traçable + plafond · recul du cash
🪪 identité      EUDI Wallet obligatoire fin 2026 · vérification d'âge = carte d'identité d'Internet
📰 information   EMFA art. 4 (spyware sur journalistes) · blocages administratifs · DSA « crise »
👁 corps         EES biométrie aux frontières · VSA algorithmique · Palantir dans les polices
```

Le miroir mondial (UK, US, AU, CH, RU, CN) prouve que la pente n'est pas une paranoïa
locale : c'est une vague, et les régimes autoritaires montrent le point d'arrivée.

## Nouvelle section `#bigbrother` (entre `#precedents` et `#memo`)

- **Titre** : « Big Brother, pièce par pièce » / "Big Brother, piece by piece" ·
  num `DOSSIER · 2024 → 2026`. Pull-quote : « 1984 était un avertissement, pas un
  cahier des charges. »
- **Les 5 fronts** : strip compact (grid) nommant chaque front + sa pièce maîtresse.
- **Données** : `src/content/drift.tsx` (~25-30 événements 2024-07 → 2026-07),
  type `Drift { date, region, themes[], status, title{fr,en}, body{fr,en}, src }`.
  Régions `eu|fr|uk|us|au|ch|ru|cn|world` · thèmes `messaging|identity|money|media|aibio`
  · statuts `en_vigueur|adopte|negociation|propose|rejete|suspendu`.
  **Règle anti-doublon** : ce qui est déjà dans la timeline Précédents (lignée
  Chat Control / crypto-wars) n'est PAS répété ici — l'observatoire couvre les
  AUTRES fronts + le monde ; il pointe vers `#precedents` pour la lignée messages.
- **Interactivité** (pattern maison FilterBar, hydration-safe, offline-compatible) :
  - chips single-select : Tous · 🇪🇺 UE · 🇫🇷 France · 🌍 Monde · 💶 Argent ·
    🪪 Identité · 📰 Info · 👁 Biométrie & IA (attribut `data-bbf` posé sur la
    **section**, pas sur `:root` ; CSS `[data-bbf=x] .bb-item:not([data-tags~=x])`)
  - cartes `<details>` : summary = date + titre + pill statut + drapeau ;
    corps = faits datés + « pourquoi c'est grave » + lien source primaire
  - deep-link par événement `#bb-<date>` (`:target` surligné, unicité testée)
  - compteur dérivé des données (« N faits documentés · M fronts · maj 10 juillet 2026 »)
- **Contre-vague** (Box `ok`, fin de section) : les remparts tiennent parfois
  (CJUE, rejets, reculs) ET le monde construit l'inverse — chiffrement, fédération,
  logiciels libres (ce guide), jusqu'à l'IA : **Tapestry** (The AI Alliance, 200+
  organisations) = entraînement **fédéré** de modèles frontière, « only the weights
  are shared », les données restent chez leurs propriétaires
  (https://thealliance.ai/projects/tapestry). CTA → `#memo` / `#action`.

## Sources (rigueur = crédibilité)

- 1 source primaire par événement (EUR-Lex, consilium, BCE, textes officiels, EDRi,
  noyb, LQDN, EFF, AccessNow, presse de référence). URL **réellement vérifiée** —
  jamais reconstruite de mémoire. `scripts/check-links.mjs` étendu à `drift.tsx`
  (les nouvelles sources entrent dans le link-rot hebdo) + run manuel avant push.
- Événements incertains/contestés : exclus (le doute affaiblit tout le dossier).

## Copy pass (ressentir, sans hystérie)

- Le pitch reste sobre : l'effroi vient des dates et des chiffres alignés.
- Concepts orwelliens nommés (télécran, ministère de la Vérité) sans citation longue
  de la traduction française (Audiberti : pas dans le domaine public — l'anglais
  d'Orwell l'est, l'aphorisme « warning, not an instruction manual » est libre).
- Box euro numérique (section Menace) : + lien vers `#bigbrother` (le dossier complet).
- Hero/StatusBanner : INTOUCHÉS (calibrés le 9 juillet).
- TOC : entrée `👁 Big Brother, pièce par pièce` après Précédents.

## Gates (tout exit lu non-pipé)

1. Baseline sur l'arbre WIP (lint · vitest · build · e2e) → si vert, **committer
   d'abord le WIP /en/** (feat autonome de la session précédente), puis nos commits.
2. `tests/content.test.ts` : + describe drift (bornes, bilingue, tags/statuts valides,
   https, ids uniques, tri chronologique, zéro doublon de date avec `#tl-` ?
   non — ids distincts `bb-`, seule l'unicité interne compte).
3. `scripts/e2e.mjs` : + `bigbrother` dans SECTIONS · ≥ 20 `bb-item` prérendus ·
   deep-link `id="bb-…"` présent · lien Tapestry présent · offline : chips vanilla.
4. `src/lib/e2e.ts` : + volet 5 bis — clic chip 🇫🇷 → un item non-FR passe
   `display:none`, un item FR reste ; reset « Tous ».
5. `scripts/postbuild-offline.mjs` : wiring vanilla des chips (`.bbf` → `data-bbf`
   sur `#bigbrother` + aria-pressed), parité avec l'hydraté.
6. Captures fraîches (desktop/mobile, light/dark) · commits conventionnels scopés ·
   push fork → PR #1.

## DoD

Section live + filtrable + deep-linkable, prérendue dans les deux langues, données
sourcées-vérifiées (0 lien cassé), artefact offline interactif à parité, e2e ALL
GREEN local, Tapestry mentionné, TOC/plan/README cohérents, PR à jour.
