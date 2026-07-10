// Post-build: compute the Content-Security-Policy for the built site.
// Hashes every inline <script> found in dist/**/*.html (the theme/language
// boot script, plus anything Astro chose to inline) so the CSP can stay
// strict without 'unsafe-inline'. Emits docker/csp.conf (nginx snippet).
// Regenerated on every build — the hash can never drift from the markup.
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return htmlFiles(path)
    return entry.name.endsWith('.html') ? [path] : []
  })
}

const hashes = new Set()
const inlineScript = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8')
  for (const [, body] of html.matchAll(inlineScript)) {
    if (!body.trim()) continue
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`)
  }
}

const scriptSrc = ["'self'", ...hashes].join(' ')
const csp = [
  "default-src 'none'",
  `script-src ${scriptSrc}`,
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ')

writeFileSync('docker/csp.conf', `add_header Content-Security-Policy "${csp}" always;\n`)
console.log(`[gen-csp] ${hashes.size} inline script hash(es) → docker/csp.conf`)
