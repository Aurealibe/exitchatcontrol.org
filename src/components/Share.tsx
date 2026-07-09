import { useState } from 'react'
import { T } from '../lib/i18n'

const URL_CANON = 'https://exitchatcontrol.org/'

/* Spread-the-guide row — a campaign site lives by being shared. Native
   navigator.share when available (mobile), clipboard fallback, print-to-PDF.
   Zero third-party share widget (they are trackers by design). */
export function ShareRow() {
  const [copied, setCopied] = useState(false)

  const doShare = async () => {
    const data = { title: document.title, url: URL_CANON }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
    } catch {
      /* user cancelled the sheet — nothing to do */
    }
    void doCopy()
  }

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(URL_CANON)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard denied (http, permissions) — the URL bar still works */
    }
  }

  return (
    <div className="share-row" role="group" aria-label="Partager ce guide — Share this guide">
      <button type="button" className="share-btn share-native" onClick={() => void doShare()}>
        ⇪ <T fr="Partager ce guide" en="Share this guide" />
      </button>
      <button type="button" className="share-btn share-copy" onClick={() => void doCopy()} aria-live="polite">
        {copied ? (
          <>✓ <T fr="Lien copié" en="Link copied" /></>
        ) : (
          <>⧉ <T fr="Copier le lien" en="Copy the link" /></>
        )}
      </button>
      <button type="button" className="share-btn share-print" onClick={() => window.print()}>
        ⎙ <T fr="Imprimer / PDF" en="Print / PDF" />
      </button>
    </div>
  )
}
