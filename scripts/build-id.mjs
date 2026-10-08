// Post-build: stamps dist/build.txt with the commit being deployed, so the
// IndexNow workflow can wait until the live site serves this very commit
// before pinging search engines (scripts/indexnow.mjs).
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

let sha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || ''
if (!sha) {
  try {
    sha = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
  } catch {
    sha = 'unknown'
  }
}
writeFileSync('dist/build.txt', `${sha}\n`)
console.log(`[build-id] ${sha}`)
