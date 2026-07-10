# Contributing to Exit Chat Control

Contributions are welcome — this guide exists because people share what works. But this is a **trust-first** project: readers follow our recommendations to protect themselves from surveillance. That trust is the product, so the rules below are strict and non-negotiable. Every submission is reviewed personally by the maintainer.

## Adding a tool or resource

A tool must meet all three of the original rules:

1. **Traction** — an established, actively maintained project with a real user base. Not an obscure or abandoned tool, and not your three-month-old project.
2. **Open source** — a public repository with an OSI-approved license.
3. **Privacy-respecting** — no trackers, no data monetization, honest documentation.

## Disclosure of affiliation (mandatory)

If you are the author, maintainer, employee, investor, or otherwise affiliated with a tool, service, or website you propose to add or link, **you must say so in the PR description**. Undisclosed self-promotion — however good the surrounding work — gets the PR closed and the account reported for inauthentic activity. This has happened before; it will happen again.

## Link policy (enforced by CI)

- Every external link is rendered through the `Ext` component, which enforces `rel="noopener noreferrer"`. No per-link `rel` exceptions, for anyone, ever.
- Every external domain must be listed in `src/data/domains-allowlist.json`. The test suite fails if the built site links to a domain that isn't allowlisted — adding a domain is therefore always an explicit, reviewable diff.
- Editorial placements ("featured", "guide's pick", ranking changes) are the maintainer's decision only. PRs that visually elevate one tool above others will be asked to remove that change.

## Content and facts

- Every dated claim (timeline, observatory) needs a source URL, primary wherever possible (legislation, court rulings, institutional press releases — not blog posts).
- Translations: UI strings live in `src/i18n/<lang>.json`; long-form content in `src/content/sections/<lang>/`; dataset prose in `src/i18n/content/<lang>/`. Adding a language = adding those files plus one line in `src/i18n/locales.ts`. Parity is tested.

## Large changes

Open an issue **before** writing a large PR (redesigns, stack changes, new sections). Unsolicited full rebuilds are closed by default — not because the work is bad, but because review cost and trust cost scale with diff size.

## Development

```sh
pnpm install
pnpm dev        # dev server
pnpm lint && pnpm check && pnpm build && pnpm test   # what CI runs (tests audit dist/)
```

The site must remain: static, readable with JavaScript disabled, free of any request to a third-party domain, and printable. Tests enforce all four.
