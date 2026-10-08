// IndexNow (https://www.indexnow.org): tells Bing, Yandex, Seznam, Naver…
// that pages changed, so they recrawl now instead of eventually. Open
// protocol, no account: the key below is published at /<key>.txt to prove
// we own the host. Run by .github/workflows/indexnow.yml after a deploy.
//
//   node scripts/indexnow.mjs [--wait <commit-sha>] [--dry-run]
//
// --wait polls /build.txt (scripts/build-id.mjs) until the live site serves
// that commit, then submits every URL of the live sitemap.
const HOST = 'exitchatcontrol.org'
const SITE = `https://${HOST}`
const KEY = '7dd22f3a2daabdb12610e0508f72492c'

const args = process.argv.slice(2)
const waitFor = args.includes('--wait') ? args[args.indexOf('--wait') + 1] : ''
const dryRun = args.includes('--dry-run')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function text(url) {
  const res = await fetch(url, { headers: { 'cache-control': 'no-cache' } })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return res.text()
}

if (waitFor) {
  const deadline = Date.now() + 20 * 60_000
  for (;;) {
    const live = (await text(`${SITE}/build.txt?t=${Date.now()}`).catch(() => '')).trim()
    if (live === waitFor) break
    if (Date.now() > deadline) throw new Error(`live site still on ${live || '?'}, not ${waitFor}`)
    console.log(`[indexnow] live build ${live || '?'} ≠ ${waitFor.slice(0, 7)}, waiting…`)
    await sleep(30_000)
  }
}

const liveKey = (await text(`${SITE}/${KEY}.txt`)).trim()
if (liveKey !== KEY) throw new Error(`key file does not match (got "${liveKey}")`)

const index = await text(`${SITE}/sitemap-index.xml`)
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const urls = []
for (const sitemap of sitemaps) {
  const xml = await text(sitemap)
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))
}
console.log(`[indexnow] ${urls.length} URLs from ${sitemaps.length} sitemap(s)`)
if (dryRun) process.exit(0)

// The protocol caps a request at 10,000 URLs.
for (let i = 0; i < urls.length; i += 10_000) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls.slice(i, i + 10_000),
    }),
  })
  console.log(`[indexnow] HTTP ${res.status} ${await res.text()}`)
  // 200 OK and 202 Accepted are both success
  if (res.status !== 200 && res.status !== 202) process.exit(1)
}
