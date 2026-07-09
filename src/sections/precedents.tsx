import { T } from '../lib/i18n'
import { Box, PartHead } from '../components/ui'
import { EVENTS, KIND_LABEL, type Ev } from '../content/events'

/* ═══ NEW SECTION · The precedents timeline ═════════════════════════════════
   Rendering for src/content/events.tsx — see that file for the data. */

function TlItem({ ev }: { ev: Ev }) {
  // each precedent is individually linkable: exitchatcontrol.org/#tl-2020-02-11
  const id = `tl-${ev.date}`
  return (
    <li className={`tl-item tl-${ev.kind}`} id={id}>
      <a className="tl-date" href={`#${id}`}>{ev.date}</a>
      <div className="tl-body">
        <span className="tl-title">
          <T fr={ev.title.fr} en={ev.title.en} />
        </span>
        <span className="tl-tag">
          <T fr={KIND_LABEL[ev.kind].fr} en={KIND_LABEL[ev.kind].en} />
        </span>
        <p>
          <T fr={ev.body.fr} en={ev.body.en} />{' '}
          <a className="tl-src" href={ev.src.href} target="_blank" rel="noopener noreferrer">
            {ev.src.label} →
          </a>
        </p>
      </div>
    </li>
  )
}

export function Precedents() {
  return (
    <section id="precedents">
      <PartHead
        anchor="precedents"
        num={<>DOSSIER · <T fr="1993 → 2026" en="1993 → 2026" /></>}
        title={<T fr="Les précédents : 25 ans de dérives datées" en="The precedents: 25 years of dated drift" />}
        intro={
          <T
            fr="« Une fois l'infrastructure posée, elle sert à autre chose » n'est pas une opinion : c'est un motif documenté. Chaque entrée est sourcée sur un document primaire (loi, arrêt, archive déclassifiée, enquête). Quatre motifs reviennent : la promesse (« temporaire, ciblé »), la dérive (extension du périmètre), le rempart (un tribunal ou un parlement tient), la révélation (l'abus surfacé des années après)."
            en={`"Once the infrastructure exists, it gets repurposed" is not an opinion: it is a documented pattern. Every entry cites a primary document (statute, ruling, declassified archive, investigation). Four motifs recur: the promise ("temporary, targeted"), the creep (scope expands), the rampart (a court or parliament holds), the reveal (the abuse surfaces years later).`}
          />
        }
      />
      <ol className="timeline">
        {EVENTS.map((ev) => (
          <TlItem key={ev.date + ev.title.en} ev={ev} />
        ))}
      </ol>
      <Box tone="honest" label={<T fr="Ce que la chronologie prouve" en="What the timeline proves" />}>
        <p>
          <T
            fr={<>Trois lois de la gravité institutionnelle. <strong>1.</strong> Le « temporaire » se renouvelle (Patriot Act, rétention des données, Chat Control 1.0 : sunset 2024 → 2026 → 2028, et le Conseil propose déjà de supprimer la clause). <strong>2.</strong> Le périmètre s'étend toujours (volontaire → obligatoire ; enfants → terrorisme → droit d'auteur ; messageries → argent). <strong>3.</strong> Les remparts existent : des arrêts de la CJUE ont annulé des directives entières, Apple a reculé, le Parlement a dit non en mars. La technique (ce guide) vous protège pendant que le politique se joue — les deux se renforcent.</>}
            en={<>Three laws of institutional gravity. <strong>1.</strong> "Temporary" renews itself (Patriot Act, data retention, Chat Control 1.0: sunset 2024 → 2026 → 2028, and the Council already proposes deleting the clause). <strong>2.</strong> Scope always widens (voluntary → mandatory; children → terrorism → copyright; messages → money). <strong>3.</strong> Ramparts are real: CJEU rulings annulled entire directives, Apple backed down, Parliament said no in March. Technology (this guide) protects you while the politics plays out — each reinforces the other.</>}
          />
        </p>
      </Box>
    </section>
  )
}
