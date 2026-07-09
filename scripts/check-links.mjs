/* Live-checks the guide's citation links — the timeline's primary sources,
   the Big Brother observatory's sources and the footer's legal sources.
   404 / DNS failure / 5xx = FAIL; 403/429 (bot walls on europa.eu etc.) are
   reported as WARN and tolerated. Run: node scripts/check-links.mjs */
import { readFileSync } from 'node:fs'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const events = readFileSync(new URL('../src/content/events.tsx', import.meta.url), 'utf8')
const drift = readFileSync(new URL('../src/content/drift.tsx', import.meta.url), 'utf8')
const footer = readFileSync(new URL('../src/components/Footer.tsx', import.meta.url), 'utf8')
const urls = [...new Set([...`${events}\n${drift}\n${footer}`.matchAll(/https:\/\/[^\s"'`<>)]+/g)].map((m) => m[0].replace(/[.,]$/, '')))]

let fail = 0
let warn = 0

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const controller = new AbortController()
      const t = setTimeout(() => controller.abort(), 15_000)
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' },
      })
      clearTimeout(t)
      if (res.status === 405 && method === 'HEAD') continue // try GET
      return res.status
    } catch (e) {
      if (method === 'GET') return `ERR:${e.name === 'AbortError' ? 'timeout' : e.cause?.code ?? e.name}`
    }
  }
  return 'ERR:unknown'
}

console.log(`checking ${urls.length} cited sources…`)
const results = await Promise.all(
  urls.map(async (url) => ({ url, status: await probe(url) })),
)

for (const { url, status } of results.sort((a, b) => String(a.status).localeCompare(String(b.status)))) {
  if (typeof status === 'number' && status >= 200 && status < 300) {
    console.log(`  ✓ ${status} ${url}`)
  } else if (status === 403 || status === 429 || status === 401) {
    warn++
    console.log(`  ~ ${status} ${url} (bot wall — verify by hand once)`)
  } else {
    fail++
    console.log(`  ✗ ${status} ${url}`)
  }
}

console.log(`\nlinks: ${urls.length - fail - warn} ok · ${warn} bot-walled · ${fail} broken`)
process.exit(fail === 0 ? 0 : 1)
