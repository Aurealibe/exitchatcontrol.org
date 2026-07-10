import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { T } from '../lib/i18n'
import { Box, PartHead } from '../components/ui'
import { DRIFT, REGION_META, STATUS_META, driftTags, type BbFilter, type DriftEv } from '../content/drift'

/* ═══ NEW SECTION · The Big Brother observatory ═════════════════════════════
   The precedents timeline (#precedents) proves the PATTERN over 25 years;
   this section shows the pattern LIVE, today, on every front at once —
   messages, money, identity, information, biometrics — EU and worldwide.
   Data lives in src/content/drift.tsx (same discipline as events.tsx:
   dated + one primary source per entry, weekly link-rot checked).

   Interactivity is the house pattern (FilterBar): a single data attribute
   drives pure-CSS visibility, so the filter also works in the offline
   artifact via ~10 lines of vanilla (scripts/postbuild-offline.mjs). The
   attribute lives on the SECTION, not :root — two filters, zero collision. */

/* The five fronts, numbered 01-05 — the numbering IS the thesis (five files
   in one dossier). The numeral renders as a ::after ghost from data-no. */
const FRONTS: { f: BbFilter; no: string; name: { fr: string; en: string }; d: { fr: string; en: string } }[] = [
  {
    f: 'messaging',
    no: '01',
    name: { fr: 'Les messages', en: 'The messages' },
    d: {
      fr: "Chat Control : le scan des conversations privées, adopté le 9 juillet. La lignée complète est aux Précédents.",
      en: 'Chat Control: scanning private conversations, adopted 9 July. The full lineage sits in the Precedents.',
    },
  },
  {
    f: 'money',
    no: '02',
    name: { fr: "L'argent", en: 'The money' },
    d: {
      fr: 'Euro numérique traçable, plafond de détention, recul du cash : un argent qui s\'observe et se rationne.',
      en: 'A traceable digital euro, holding caps, cash in retreat: money that watches and rations itself.',
    },
  },
  {
    f: 'identity',
    no: '03',
    name: { fr: "L'identité", en: 'The identity' },
    d: {
      fr: "Wallet d'identité européen fin 2026, vérification d'âge : montrer patte blanche pour entrer en ligne.",
      en: 'An EU identity wallet by late 2026, age verification: papers, please — to go online.',
    },
  },
  {
    f: 'media',
    no: '04',
    name: { fr: "L'information", en: 'The information' },
    d: {
      fr: 'Spyware « sécurité nationale » contre des journalistes, blocages administratifs : qui décide du visible.',
      en: '"National security" spyware on journalists, administrative blocking: who decides what is visible.',
    },
  },
  {
    f: 'aibio',
    no: '05',
    name: { fr: 'Le corps', en: 'The body' },
    d: {
      fr: 'Biométrie aux frontières, vidéosurveillance algorithmique, police prédictive : le visage devient identifiant.',
      en: 'Biometrics at the border, algorithmic CCTV, predictive policing: the face becomes an identifier.',
    },
  },
]

/* region chips keep their flags (flags are data); front chips reuse the
   tab numerals — aria-hidden decor, the label carries the meaning */
const No = ({ n }: { n: string }) => <span className="chip-no" aria-hidden="true">{n}</span>

const CHIPS: { f: BbFilter | null; label: ReactNode }[] = [
  { f: null, label: <T fr="Tous" en="All" /> },
  { f: 'eu', label: <>🇪🇺 <T fr="UE" en="EU" /></> },
  { f: 'fr', label: <>🇫🇷 France</> },
  { f: 'world', label: <>🌍 <T fr="Monde" en="World" /></> },
  { f: 'messaging', label: <><No n="01" /> <T fr="Messages" en="Messages" /></> },
  { f: 'money', label: <><No n="02" /> <T fr="Argent" en="Money" /></> },
  { f: 'identity', label: <><No n="03" /> <T fr="Identité" en="Identity" /></> },
  { f: 'media', label: <><No n="04" /> <T fr="Information" en="Information" /></> },
  { f: 'aibio', label: <><No n="05" /> <T fr="Biométrie & IA" en="Biometrics & AI" /></> },
]

/* LE FIL — the last 12 entries as a news wire, most recent first */
const WIRE = [...DRIFT].slice(-12).reverse()

function BbItem({ ev }: { ev: DriftEv }) {
  const id = `bb-${ev.id}`
  const r = REGION_META[ev.region]
  const s = STATUS_META[ev.status]
  return (
    <li className="bb-item" id={id} data-tags={driftTags(ev)}>
      <details className={`bb-card bb-s-${ev.status}`}>
        <summary>
          <span className="bb-date">{ev.date}</span>
          <span className="bb-flag" aria-hidden="true">{r.flag}</span>
          <span className="sr-only"><T fr={r.fr} en={r.en} /></span>
          <span className="bb-title"><T fr={ev.title.fr} en={ev.title.en} /></span>
          <span className="bb-pill"><T fr={s.fr} en={s.en} /></span>
        </summary>
        <div className="bb-body">
          <p><T fr={ev.body.fr} en={ev.body.en} /></p>
          <p className="bb-foot">
            <a className="bb-src" href={ev.src.href} target="_blank" rel="noopener noreferrer">
              {ev.src.label} →
            </a>
            <a className="bb-anchor" href={`#${id}`}>
              § <T fr="lien direct" en="direct link" />
            </a>
          </p>
        </div>
      </details>
    </li>
  )
}

export function BigBrother() {
  const [f, setF] = useState<BbFilter | null>(null)
  const wireRef = useRef<HTMLDivElement>(null)

  /* Deep links (#bb-<id>) land on a CLOSED <details>: the browser scrolls
     and :target highlights, but only JS can open it. Same ~6 lines are
     mirrored in the offline artifact's vanilla script. */
  useEffect(() => {
    const openTarget = () => {
      const id = location.hash.slice(1)
      if (!id.startsWith('bb-')) return
      const d = document.getElementById(id)?.querySelector('details')
      if (d) d.open = true
    }
    openTarget()
    window.addEventListener('hashchange', openTarget)
    return () => window.removeEventListener('hashchange', openTarget)
  }, [])

  /* the wire pauses when it scrolls out of view (looping animations don't
     get to burn compositor time offscreen) — mirrored in the offline vanilla */
  useEffect(() => {
    const el = wireRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.removeAttribute('data-off')
      else el.setAttribute('data-off', '')
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const regionCount = new Set(DRIFT.map((e: DriftEv) => e.region)).size

  return (
    <section id="bigbrother" data-bbf={f ?? undefined}>
      <PartHead
        anchor="bigbrother"
        num={<>CONVERGENCE · <T fr="TOUS LES FRONTS, EN MÊME TEMPS" en="EVERY FRONT AT ONCE" /></>}
        title={<T fr="Big Brother, pièce par pièce" en="Big Brother, piece by piece" />}
        intro={
          <T
            fr="Orwell avait imaginé le télécran imposé par la force. Le nôtre s'assemble par règlements — un acronyme raisonnable à la fois, chacun muni d'un prétexte qu'on n'ose pas refuser : les enfants, la fraude, le terrorisme. Pris séparément, chaque texte se défend. Posés côte à côte, ils dessinent autre chose : une infrastructure. Voici les deux dernières années, front par front, datées et sourcées — filtrez, dépliez, vérifiez."
            en="Orwell imagined the telescreen bolted on by force. Ours is being assembled by regulation — one reasonable acronym at a time, each carrying a pretext nobody dares refuse: children, fraud, terrorism. Taken alone, every text sounds defensible. Laid side by side, they draw something else: an infrastructure. Here are the last two years, front by front, dated and sourced — filter, expand, verify."
          />
        }
      />

      <div className="bb-wire" ref={wireRef} role="navigation" aria-label="Le fil de la dérive — The drift wire">
        <span className="bb-wire-lab"><T fr="LE FIL" en="THE WIRE" /></span>
        <div className="bb-wire-view">
          {[false, true].map((dup) => (
            <ul
              key={String(dup)}
              className="bb-wire-track"
              aria-hidden={dup || undefined}
              inert={dup || undefined}
            >
              {WIRE.map((ev) => (
                <li key={ev.id}>
                  <a href={`#bb-${ev.id}`}>
                    <span className="w-d">{ev.date}</span>
                    <T fr={ev.title.fr} en={ev.title.en} />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="bb-fronts">
        {FRONTS.map((fr) => (
          <button
            key={fr.f}
            type="button"
            className="bbfront bbf"
            data-f={fr.f}
            data-no={fr.no}
            aria-pressed={f === fr.f}
            onClick={() => setF(f === fr.f ? null : fr.f)}
          >
            <b><T fr={fr.name.fr} en={fr.name.en} /></b>
            <span className="d"><T fr={fr.d.fr} en={fr.d.en} /></span>
          </button>
        ))}
      </div>

      <figure className="bb-1984">
        <blockquote>
          <T
            fr="« 1984 » était un avertissement, pas un cahier des charges."
            en={'"Nineteen Eighty-Four" was a warning, not an instruction manual.'}
          />
        </blockquote>
      </figure>

      <div className="bb-chips" role="group" aria-label="Filtrer la dérive — Filter the drift">
        <span className="fb-lab">
          <T fr="Filtrer la dérive" en="Filter the drift" />
        </span>
        {CHIPS.map((c) => (
          <button
            key={c.f ?? 'all'}
            type="button"
            className={`btn bbf${c.f === null ? ' bbf-all' : ''}`}
            data-f={c.f ?? ''}
            aria-pressed={f === c.f}
            onClick={() => setF(c.f)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="bb-count">
        {DRIFT.length} <T fr="faits documentés" en="documented facts" /> · 5 <T fr="fronts" en="fronts" /> ·{' '}
        {regionCount} <T fr="juridictions" en="jurisdictions" /> ·{' '}
        <T fr="mise à jour : 10 juillet 2026" en="updated: 10 July 2026" />
      </p>

      <ol className="bb-list">
        {DRIFT.map((ev: DriftEv) => (
          <BbItem key={ev.id} ev={ev} />
        ))}
      </ol>

      <Box tone="ok" label={<T fr="La contre-vague" en="The counter-wave" />}>
        <p>
          <T
            fr={<>Ce tableau n'est pas une fatalité, c'est une carte. Les remparts tiennent parfois : la CJUE a annulé des régimes entiers de surveillance, le Parlement européen est passé à 47 voix de bloquer le scan, Apple a préféré retirer une fonction que poser une porte dérobée, et Proton a promis de quitter la Suisse plutôt que d'espionner ses utilisateurs. Et pendant que les uns installent des scanners, d'autres construisent l'inverse : le chiffrement qui tient (Signal), les réseaux fédérés (Mastodon, Matrix), les outils libres de ce guide — jusqu'à l'intelligence artificielle, où <a href="https://thealliance.ai/projects/tapestry" target="_blank" rel="noopener noreferrer">Tapestry</a> (The AI Alliance, 200+ organisations) développe l'entraînement <strong>fédéré</strong> de modèles de pointe : seuls les poids circulent, les données ne quittent jamais ceux à qui elles appartiennent. La décentralisation n'est pas une nostalgie, c'est une feuille de route. La vôtre commence au <a href="#memo">Mémo</a>, juste en dessous — et l'action politique à la <a href="#action">partie 15</a>.</>}
            en={<>This table is not fate, it is a map. The ramparts sometimes hold: the CJEU has annulled entire surveillance regimes, the European Parliament came 47 votes short of blocking the scan, Apple chose to pull a feature rather than build a backdoor, and Proton vowed to leave Switzerland rather than spy on its users. And while some install scanners, others build the reverse: encryption that holds (Signal), federated networks (Mastodon, Matrix), the free tools in this guide — up to artificial intelligence, where <a href="https://thealliance.ai/projects/tapestry" target="_blank" rel="noopener noreferrer">Tapestry</a> (The AI Alliance, 200+ organisations) is building <strong>federated</strong> frontier-model training: only the weights travel, the data never leaves its owners. Decentralisation is not nostalgia, it is a roadmap. Yours starts at the <a href="#memo">Memo</a>, right below — and political action at <a href="#action">part 15</a>.</>}
          />
        </p>
      </Box>
    </section>
  )
}
