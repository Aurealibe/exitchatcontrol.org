import type { ReactNode } from 'react'
import { T } from '../lib/i18n'

/* ─── PartHead ─── */
export function PartHead({
  num,
  title,
  intro,
  anchor,
}: {
  num: ReactNode
  title: ReactNode
  intro?: ReactNode
  /** section id — renders a § deep-link so a reader can cite the section */
  anchor?: string
}) {
  return (
    <div className="part-head">
      <div className="num">
        {num}
        {anchor ? (
          <a className="sec-anchor" href={`#${anchor}`} aria-label="Lien direct vers cette section — Direct link to this section">
            §
          </a>
        ) : null}
      </div>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

/* ─── Level badge ─── */
export function Lvl({ n, children }: { n: 1 | 2 | 3; children?: ReactNode }) {
  return <span className={`lvl lvl-${n}`}>{children ?? (n === 1 ? '🟢' : n === 2 ? '🟡' : '🔴')}</span>
}

/* ─── Callout box ─── */
export function Box({
  tone,
  label,
  children,
}: {
  tone?: 'warn' | 'honest' | 'ok' | 'info'
  label: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`box${tone && tone !== 'info' ? ` ${tone}` : ''}`}>
      <span className="lab">{label}</span>
      {children}
    </div>
  )
}

/* ─── Inline citation (superscript source link) ─── */
export function Cite({ href, title }: { href: string; title: string }) {
  return (
    <a className="cite" href={href} target="_blank" rel="noopener noreferrer" title={title}>
      [src]
    </a>
  )
}

/* ─── Scrollable table wrapper ─── */
export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="tablewrap">{children}</div>
}

/* ─── The three reader profiles (threat model cards) ─── */
export function Profiles() {
  return (
    <div className="profiles">
      <div className="profile p1">
        <div className="lvl lvl-1">
          <T fr="Débutant" en="Beginner" />
        </div>
        <h4>
          🟢 <T fr="Le citoyen ordinaire" en="The ordinary citizen" />
        </h4>
        <p>
          <T
            fr="Vous voulez simplement que vos conversations et votre vie privée cessent d'être scannées et monétisées. Objectif : la confidentialité au quotidien, sans devenir expert."
            en="You just want your conversations and private life to stop being scanned and monetised. Goal: everyday privacy, without becoming an expert."
          />
        </p>
      </div>
      <div className="profile p2">
        <div className="lvl lvl-2">
          <T fr="Intermédiaire" en="Intermediate" />
        </div>
        <h4>
          🟡 <T fr="Le compte pseudonyme" en="The pseudonymous account" />
        </h4>
        <p>
          <T
            fr="Compte d'information, page militante, créateur : vous craignez d'être déanonymisé, doxxé, ou de perdre votre compte. Objectif : séparer votre identité réelle de votre identité publique."
            en="Information account, activist page, creator: you fear being deanonymised, doxxed, or losing your account. Goal: separate your real identity from your public one."
          />
        </p>
      </div>
      <div className="profile p3">
        <div className="lvl lvl-3">
          <T fr="Avancé" en="Advanced" />
        </div>
        <h4>
          🔴 <T fr="Le lanceur d'alerte" en="The whistleblower" />
        </h4>
        <p>
          <T
            fr="Journaliste, activiste, source, face à un adversaire puissant (État, employeur). Objectif : anonymat fort, anti-corrélation, transmettre des documents sans se faire prendre."
            en="Journalist, activist, source, facing a powerful adversary (state, employer). Goal: strong anonymity, anti-correlation, passing documents without being caught."
          />
        </p>
      </div>
    </div>
  )
}
