import { expect, test } from '@playwright/test'
import { defaultLocale, locales } from '../../src/i18n/locales'

// The generic nojs/zero-request specs only visit the three home pages, so the
// /quiz route gets its own coverage: it must be readable with JS off (the
// twelve questions and the scoring key are server-rendered), reveal a score
// once fully answered (JS enhancement), and never touch a third-party host.
const quizPaths = locales.map((l) => (l === defaultLocale ? '/quiz' : `/${l}/quiz`))

for (const path of quizPaths) {
  test(`quiz is readable and self-contained without JS on ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    // all twelve questions are prerendered as native fieldsets
    await expect(page.locator('[data-quiz-question]')).toHaveCount(12)
    await expect(page.locator('[data-quiz-question]').first()).toBeVisible()
    // the scoring key (bands + per-area guidance) is always visible
    await expect(page.locator('#quiz-key')).toBeVisible()
    await expect(page.locator('[data-quiz-cat-key] [data-cat-link]').first()).toBeVisible()
    // the computed result panel stays hidden until answered (needs JS)
    await expect(page.locator('[data-quiz-result]')).toBeHidden()
    // the TOC ("Contents") nav link must target the home guide, not a dead
    // in-page #toc that only exists on the guide page
    await expect(page.locator('#toc')).toHaveCount(0)
    await expect(page.locator('header a[href$="/#toc"]')).toHaveCount(1)
  })

  test(`quiz has zero third-party requests on ${path}`, async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin
    const offenders: string[] = []
    page.on('request', (req) => {
      const url = new URL(req.url())
      if (url.origin !== origin && url.protocol !== 'data:') offenders.push(req.url())
    })
    await page.goto(path, { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    expect(offenders).toEqual([])
  })
}

test('answering every question reveals a 100/100 sovereign score', async ({
  page,
  javaScriptEnabled,
}) => {
  test.skip(javaScriptEnabled === false, 'scoring is a JS enhancement')
  await page.goto('/quiz')
  const questions = page.locator('[data-quiz-question]')
  const count = await questions.count()
  for (let i = 0; i < count; i += 1) {
    // the strongest option is last in every question and worth the max points
    await questions.nth(i).locator('input[type="radio"]').last().check()
  }
  const result = page.locator('[data-quiz-result]')
  await expect(result).toBeVisible()
  await expect(page.locator('[data-quiz-score]')).toHaveText('100')
  await expect(page.locator('[data-quiz-recs] > *')).toHaveCount(3)
  // the live progress counter tracks answers (regression: it once stuck at 0)
  await expect(page.locator('[data-quiz-progress-text]')).toContainText('12 / 12')
  // the reader's band is highlighted in the scoring ladder, and at the top
  // band the nudge line switches to the "top band reached" message
  await expect(page.locator('[data-band-id="sovereign"]')).toHaveClass(/quiz-band--current/)
  const next = page.locator('[data-quiz-next]')
  await expect(next).not.toBeEmpty()
  await expect(next).not.toContainText('{')
})

test('all-weakest answers land in the lowest band with a next-band nudge', async ({
  page,
  javaScriptEnabled,
}) => {
  test.skip(javaScriptEnabled === false, 'scoring is a JS enhancement')
  await page.goto('/quiz')
  const questions = page.locator('[data-quiz-question]')
  const count = await questions.count()
  for (let i = 0; i < count; i += 1) {
    // the weakest option is first in every question and worth zero points
    await questions.nth(i).locator('input[type="radio"]').first().check()
  }
  await expect(page.locator('[data-quiz-result]')).toBeVisible()
  await expect(page.locator('[data-quiz-score]')).toHaveText('0')
  await expect(page.locator('[data-band-id="exposed"]')).toHaveClass(/quiz-band--current/)
  // the next band ("awakening") starts at 25, so the nudge names that gap
  await expect(page.locator('[data-quiz-next]')).toContainText('25')
  // restarting clears the ladder highlight along with the panel
  await page.locator('[data-quiz-restart]').click()
  await expect(page.locator('[data-quiz-result]')).toBeHidden()
  await expect(page.locator('.quiz-band--current')).toHaveCount(0)
})
