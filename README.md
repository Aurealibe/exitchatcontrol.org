# Exit Chat Control

A free, multilingual field guide to escape **Chat Control** and take back control of your digital privacy: encrypted messaging, email, VPN, DNS, 2FA, Linux, GrapheneOS, self-hosting, and more. Every tool is presented with **what it does**, **who it's for**, and **how to install it**.

🔗 **Live site: https://exitchatcontrol.org**

## What is this?

In July 2026, the European Parliament let the "Chat Control" machinery advance — the amended text now sits with the Council, and the permanent version (CSAR, "Chat Control 2.0") is still being negotiated. This project is a practical, no-nonsense answer: a guide referencing privacy-respecting tools anyone can use to opt out of mass surveillance, from the everyday citizen to the whistleblower.

Its promises, all enforced by tests:

- **Static and self-contained** — no tracker, no cookie, not a single request to a third-party domain.
- **Readable with JavaScript disabled** (Tor Browser "safest" mode included) — scripts only power the theme, filters and checklist.
- **Multilingual by design** — every language is a real prerendered route with correct `hreflang`; adding one means adding translation files, not touching code.
- **Printable and mirrorable** — a single-file offline version ships with every build.

## Stack

[Astro](https://astro.build) (static output, built-in i18n routing) · Tailwind CSS v4 (design tokens, `light-dark()` theming) · TypeScript strict · Vitest (content integrity, i18n parity, domain allowlist) · Playwright + axe (no-JS readability, zero-third-party-request guarantee, WCAG AA) · Docker (multi-stage build → nginx). Package manager: pnpm.

```sh
pnpm install
pnpm dev                # develop on http://localhost:4321
pnpm build              # static site + offline artifact in dist/
docker compose up preview   # prod-like: nginx + security headers on :8080
```

## Contributing

Contributions are very welcome — a tool to add, a translation, a correction. **Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) first**: it contains three simple rules for tools (traction, open source, privacy-respecting), a mandatory affiliation-disclosure policy, and a CI-enforced external-link policy. Large changes start with an issue, not a PR.

Not comfortable with code? Open an issue with the app's name, its link, and why it qualifies, and it will be added for you.

## License

See [`LICENSE`](./LICENSE).

---

_Privacy is a right, not a confession. To encrypt is to vote. To self-host is to disobey. To reclaim your tools is to become ungovernable._
