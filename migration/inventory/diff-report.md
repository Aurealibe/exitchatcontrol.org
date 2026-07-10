# Content-migration diff report

Legacy monolith `index.html` (591 tri-lingual span lines / 659 `data-l` spans per
language) → per-locale MDX under `src/content/sections/{en,fr,nl}/` + `src/data/tools.json`.

## How the inventories were produced

- `legacy-<lang>.txt` — the FULL legacy document reduced to one language
  (every `data-l` run resolved), one line of whitespace-collapsed text per
  block-level element. Chrome (topbar, hero, status banner, TOC, footer) is
  included so nothing is hidden from this audit.
- `built-<lang>.txt` — same dump algorithm over `dist/index.html`,
  `dist/fr/index.html`, `dist/nl/index.html` after `pnpm build`.
  One deviation: `<noscript>` is skipped because parse5 exposes its children
  as raw text (it is new chrome, absent from the legacy page anyway).
- `<b class="lbl">` / `<b class="tool-label">` elements are flushed to their
  own line on both sides so tool-card prose lines stay comparable.
- Non-breaking spaces are folded into plain spaces on both sides.
- `node migration/compare.mjs` then segments each file into
  head-chrome / narrative window / tail-chrome (narrative = first `PART 00 ·`
  line through the manifesto paragraph) and walks the two narrative windows
  **in order, line by line**. Every line must either match exactly or fall in
  one of the categories below; anything else exits non-zero.

## Result

| lang | legacy narrative lines | built narrative lines | unexplained differences |
| ---- | ---------------------- | --------------------- | ----------------------- |
| en   | 789                    | 991                   | **0**                   |
| fr   | 789                    | 991                   | **0**                   |
| nl   | 789                    | 991                   | **0**                   |

`991 = 789 − 6 (deferred legislative rows) + 208 (tool-card labels)` in every
language. Full machine output: `compare-report.json`.

## Explained differences, exhaustively

### 1. Tool-card labels are now real text (+208 lines per language)

In the legacy page the field labels ("What it's for / Why it matters /
For whom & when", `À quoi ça sert / Pourquoi / Pour qui & quand`,
`Waarvoor dient het / …`) and the `Install & use` summary were **CSS
`::before`/`::after` generated content**, so they never appeared in the DOM
text. `ToolCard.astro` renders them as real, accessible text:
54 cards × 3 field labels + 46 install summaries = 208 new lines per language.
The label strings are byte-identical to the legacy CSS `content` values.

### 2. Deferred legislative-status claims (−6 lines per language)

Per the migration plan, adopted/extended claims are being rewritten from
verified sources separately. Dropped from the `#menace` comparison table
(rows 4 and 5), verbatim:

- EN: `Duration` / `Temporary, extended to 3 April 2028` / `Permanent` /
  `Status (Jul 2026)` / `Adopted 9 July 2026` / `Under negotiation, 5th trilogue failed 29 June`
- FR: `Durée` / `Temporaire, prolongé jusqu'au 3 avril 2028` / `Permanent` /
  `Statut (juil. 2026)` / `Adopté le 9 juillet 2026` / `En négociation, 5e trilogue échoué le 29 juin`
- NL: `Looptijd` / `Tijdelijk, verlengd tot 3 april 2028` / `Permanent` /
  `Status (juli 2026)` / `Aangenomen op 9 juli 2026` / `In onderhandeling, 5e trialoog mislukt op 29 juni`

The status banner ("Dernière minute : 9 juillet 2026" block) was excluded
wholesale with the chrome (see §4); it is replaced by `StatusBanner.astro`
fed from verified sources in the parallel workstream.

Two borderline in-prose date claims were **kept** (judgment call — they are
narrative argument, not adopted/extended status): the 19 March 2026 joint
appeal, and the "kept scanning after the legal basis lapsed on 4 April 2026"
sentence, both in `#menace`.

### 3. Typographic quotes (smartypants)

Astro's default markdown pipeline (`markdown.smartypants`, ON by default)
typesets `"` as `“ ”` and `'` as `’` in the rendered pages
(en: 138 lines affected, fr: 225, nl: 70). No other smartypants rule fires:
the legacy prose contains no ASCII `...` or `--` (its 3 `…` are literal and
pass through unchanged). This is the **only character-level transformation**
in the entire narrative.

It could not be disabled from inside this migration's ownership
(`astro.config.mjs` is off-limits). If byte-identical glyphs are required,
the config owner can add `markdown: { smartypants: false }` — one line — and
the compare gate can then drop its quote normalization.

### 4. Chrome not migrated (rebuilt separately)

Legacy head-chrome (36 lines/language) and tail-chrome (8 lines/language)
deliberately not migrated to MDX:

- topbar: brand `◆ EXIT CHAT CONTROL`, FR/NL/EN buttons, theme toggle;
- hero: stamp (`Mass surveillance · EU · 2026`), eyebrow, `Exit Chat Control_`
  h1, lede paragraph, three profile meta tags;
- status banner: `Breaking: 9 July 2026` + the vote paragraph
  (superseded content, see §2);
- TOC (24 lines) — duplicates the section titles that ARE migrated;
- footer: Resources / Sources / Act link lists, GitHub link, disclaimer
  (`Facts last updated: 9 July 2026`).

The built pages already contain replacement chrome from the parallel
rebuild workstream (TopBar/Footer/StatusBanner components, new hero h1 +
description, skip-link, noscript note, rewritten source lists citing
official roll-call results). That text intentionally differs from the
legacy chrome and is **not** part of this migration's fidelity claim; it
sits outside the compared narrative window (built head-chrome: 6 lines,
tail-chrome: 9 lines).

- The legacy inline JS (lang/theme toggles, simpleicons CDN loader) was not
  migrated by design. Icon rendering will be rebuilt offline later; the
  legacy CDN slugs are preserved in `tools.json.iconSlug` (validated, §6).

### 5. NL gaps

None. Every one of the 649 `data-l` runs carries all three languages
(en/fr/nl counts are equal in every run), so the EN-fallback path never
fired. `extract-log.json → nlGaps: []`.

### 6. tools.json notes (language-neutral facts)

- 54 entries; every entry has `url` (first neutral footer link), full `links`
  array (21 cards have 2–3 links), `monogram`, `color`, `profiles`
  (the 🟢🟡🔴 footer note), `level` where the legacy card carried a level tag
  (34 cards; the other 20 never had one).
- `iconSlug` was validated against the installed `simple-icons` package.
  Renamed upstream and mapped: `tutanota → tuta`, `aegis → aegisauthenticator`.
  Removed upstream and therefore set to null (6): `briar`, `molly`, `ivpn`,
  `protonpass`, `nostr`, `standardnotes`. 5 cards never had an icon in the
  legacy map (`t-bitchat`, `t-databrokers`, `t-mailbox`, `t-website`,
  `t-yunohost`).
- 7 cards have localized display names (e.g. `Firefox (durci/hardened/gehard)`,
  `Sauvegardes chiffrées / Encrypted backups / Versleutelde back-ups`).
  `tools.json.name` stores the EN plain text; the localized display name is
  rendered through the ToolCard `name` slot from each locale's MDX.
- One presentational attribute dropped: `style="margin:.6rem 0 .4rem"` on the
  warning box inside `t-bitchat` (styling is rebuilt later; text intact).

### 7. Anchors

`anchors.json` lists all 82 `id=` values of the legacy file. 78 exist in
every built page: 23 section ids on `<section>` wrappers, 54 tool ids on
ToolCard `<article>` roots, `top` on the hero h1. The 4 missing are the
legacy control-widget ids `lang-fr`, `lang-nl`, `lang-en`, `theme`
(toggle buttons, never used as link targets — chrome rebuilt separately).

### 8. External domains for the allowlist review

The migrated content links to 75 unique external hostnames
(`external-domains.txt`). The parallel workstream's
`tests/unit/dist-links.test.ts` fails until these are reviewed and added to
`src/data/domains-allowlist.json` — that file requires review and is outside
this migration's ownership, so it was left untouched.

## Reproduce

```
node migration/extract.mjs          # MDX + tools.json + anchors + legacy dumps
pnpm build
node migration/extract.mjs --built  # built-page dumps
node migration/compare.mjs          # exits non-zero on any unexplained diff
```
