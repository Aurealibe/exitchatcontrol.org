# Plan — /loop « à fond » : polir, attendre les sœurs, merger, finaliser la PR (2026-07-10)

> Boucle auto-cadencée (heartbeat ~20 min). Chaque itération : (1) une lane
> d'amélioration ci-dessous, gates verts, commit scoped, push ; (2) check de
> l'activité des sessions sœurs (procs live + WIP git + commits frais).
> Quand les sœurs sont ÉTEINTES et les lanes épuisées → phase finale F, puis stop.
> Discipline héritée : jamais toucher un fichier porteur de WIP sœur ; tout
> verdict d'exit lu non-pipé ; vision loop sur tout changement visuel.

## État au lancement

- Branche unique de travail : `revamp/nika-stack` (locale = fork, à jour).
  Le fork n'a que `main` (miroir upstream) + elle. « Merger toutes nos
  branches » = vérifier qu'aucun WIP ne traîne (worktrees ✓ un seul ·
  stash ✓ vide · ~/dev supprimé) et que la PR porte tout.
- PR #1 → Aurealibe/exitchatcontrol : OPEN, +11 967/−1 962, CI verte.
- Sœur(s) : ACTIVE(S) (previews vite 4544/4600 = gates/shots en cours).

## Lanes d'amélioration (une par itération, ordre indicatif)

- [ ] **A · vitrine & hygiène** — README refait (observatoire + LE FIL +
  annuaire + /en/ + axe/e2e documentés) · CSS mort retiré (`.bbf-ico`) ·
  `check-links.mjs` étend sa couverture à `directory.tsx` (l'annuaire entre
  dans le link-rot hebdo) · self-review `spn-ui-baseline` sur dossier.css +
  bigbrother.tsx (verdict greppable).
- [ ] **B · prose** — passe deslop/typos FR+EN sur les sections neuves
  (observatoire, contre-vague, hero microtype) ; cohérence « dossier » du
  vocabulaire ; aucune hyperbole non sourcée.
- [ ] **C · perf & poids** — budgets re-mesurés (JS < 800 KB, offline,
  prerender), CSS dossier.css audité (sélecteurs morts, doublons),
  grain/scan vérifiés compositor-only (pas de paint storm au scroll).
- [ ] **D · presse & données structurées** — note datée « observatoire »
  dans `article-presse.md` · JSON-LD `dateModified` aligné build ·
  description meta mentionne le dossier.
- [ ] **E · a11y ceinture-bretelles** — tab-order du FIL (focus pause ✓),
  `:focus-visible` sur cartes bb, axe re-run 2 thèmes, offline re-testé
  file:// (langue, filtre, wire statique reduced-motion).

## Phase finale F (gate : sœurs éteintes ET lanes closes)

1. `git fetch` + inventaire branches/worktrees/stash — consolider tout
   résidu dans `revamp/nika-stack` (au 10-07 : rien d'autre n'existe).
2. Sweep « mets au propre » : deslop du diff PR complet · plans docs
   status final · captures fraîches (hero, observatoire, annuaire,
   light/dark/mobile) · battery + check-links + vitest, exits non-pipés.
3. PR : titre + body réécrits à l'échelle réelle du delta (rebuild → v2 :
   précédents 1993-2026, observatoire Big Brother 35 faits, annuaire FOSS
   68 projets, /en/, offline, e2e/axe/CI, wow passes) + commentaire de
   synthèse des rounds du 10-07.
4. Mémoire + stop de la boucle (`ScheduleWakeup stop`).

## Journal des itérations

- it.1 (02:5x-03:1x) — plan écrit · lane A exécutée : README v2 (observatoire
  + FIL + annuaire + battery documentés, compte de sections dé-hardcodé),
  link-rot étendu à l'annuaire (**il a immédiatement payé : element.io/server
  404 → server-suite, 134 ok · 0 broken après fix**), baseline self-review
  0 hit mécanique. `.bbf-ico` mort retiré de tokens.css mais NON commité ici
  (le fichier porte le WIP trousse de la sœur — partira avec son commit).
  Sœurs TRÈS actives (showcase/trousse : Shelf 10 héros + marquee arsenal +
  **bouton pause WCAG 2.2.2**). → **Repris en lane E : LE FIL doit gagner le
  même bouton pause explicite (hover/focus/offscreen ne couvrent pas 2.2.2
  au tactile).** Gates locaux build/e2e SKIPPÉS exprès (elle sert dist/ sur
  ses previews 4544/4600) — CI valide mon commit sur l'arbre commité.
- quick-win inter-itérations (opérateur) — **lane E partielle : pause WCAG
  2.2.2 du FIL livrée** (toggle React+CSS absorbé par le commit polish sœur
  `e6a5712` — vérifié par grep dans HEAD · miroir vanilla offline `c5c8622`) ·
  CI verte.
- it.2 (03:1x-03:2x) — la sœur a **mergé l'upstream** `7d2aa6d` (rebrand
  « Exit Chat Control » + traduction NL communautaire @thomasboom + README
  Contributing) · CI du merge VERTE · audit cohérence rebrand : prefs/e2e/
  title/hero OK, OG jugée juste (marque au footer, pas de churn) · **lane D
  exécutée** : 2e note datée dans article-presse.md (l'observatoire entre
  dans la pièce de presse) `bd5e3ed` · JSON-LD dateModified déjà 10-07 ✓.
  Sœurs : tree clean mais previews toujours up + arcs récents ≤15 min →
  PAS encore éteintes, phase F différée. Lanes restantes : B (prose),
  C (perf/poids), E-solde (axe re-run + offline file:// re-test).
- it.3 (03:2x, déclenchée opérateur) — sœur en PLEIN VOL (cascade rebrand :
  index/404/og.png regen/webmanifest/i18n/print + CONTRIBUTING.md neuf).
  **Lane B close** : drift.tsx mécaniquement propre (0 espace de tête ·
  0 double espace · dates triées) + relecture des 35 titres FR : tenus,
  zéro slop, rien à corriger. **Lane C close** : budgets VERTS — JS shippé
  ≈679 KB <800 (axe exclu) · CSS 48 KB · prerender 640 KB · offline 694 KB ·
  dossier.css 170 l. Aucune action. E-solde (battery+axe+offline file://)
  FUSIONNÉE dans la phase F (la sœur churn dist/ en continu — un run
  frais n'aurait pas de valeur avant extinction). Reste : F uniquement.
