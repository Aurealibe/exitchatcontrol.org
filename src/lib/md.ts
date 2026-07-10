/* Micro-markdown for dataset prose (timeline/observatory bodies, checklist
   steps). Renders EXACTLY three things — **bold**, [text](https://url) and
   line breaks — and nothing else. The input is HTML-escaped FIRST, so overlay
   content can never inject markup; links are only generated for https:// URLs
   and always carry the same target/rel policy as Ext.astro enforces. */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Escapes the five HTML special characters. Always applied before markup. */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch)
}

/**
 * Renders the dataset markdown micro-dialect to safe HTML:
 *   **bold**                    → <strong>bold</strong>
 *   [label](https://example)    → <a … rel="noopener noreferrer">label</a>
 *   \n                          → <br />
 * Non-https "links" stay literal text — mirroring Ext.astro's https-only rule.
 */
export function mdToHtml(text: string): string {
  let html = escapeHtml(text)
  html = html.replace(
    /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,
    (_match, label: string, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`,
  )
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  return html.replace(/\n/g, '<br />')
}
