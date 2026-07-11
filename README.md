## Exit Chat Control (exitchatcontrol.org) magyar nyelven is

Motiváció a lokalizációval:
egy beszélgetőtárs a sok közül megmutatta nekem az eredeti exitchatcontrol.org-ot mikor a francián, angolon és holland nyelven kívül (magyarul sem) nem volt más nyelven elérhető, mióta elkészült a magyar lokalizáció a német is elérhetővé vált a hivatalos oldalon de a magyar még vár magára.

Hazai politikai szempontból: a jelenlegi kormánypárt (TISZA) EP képviselőinek nagy többsége is támogatja a Chat Control 1.0 bevezetését, ezért mindenáron a választópolgárokat és az állampolgárokat FONTOS informálni a valós történésekről és a döntések következményeiről, a Chat Controlról szóló (reddit megathread-en belül) további információkat  és beszélgetéseket itt lehet megkeresni (redlib proxyn keresztül): https://redlib.catsarch.com/r/hungary/comments/1uro7bs/chat_control_megathread/ - bár ez a magyar diskurzus közvetlenül nem kapcsolódik teljesen a projekthez. 

Ha van javaslatod, azt írd meg az eredeti exitchatcontrol.org Git-en és meg lehet ott beszélni miket érdemes hozzáadni magához a nyílt forráskódú weboldalhoz és ehhez a kezdeményezéshez. 

A nyelvi lokalizáció elsősorban a meglévő json (./src/i18n könyvtárban) és az mdx fájlok (./src/content/sections) használatával és azokból újak létrehozásával valósult meg angol (en fájlok/könyvtárak/részek) forrásból.

Maga a fordítás és a lektorálás a Google Gemini nagy nyelvi model (LLM) használatával készült - figyelembevéve a magyar nyelvben érvényes szabályokat (pl. macskakaparás helyett az idézőjel használatát, elkerülni a gondolatjelet és más idegen nyelvből származó karaktereket magán a végterméken) továbbá kikerülve az ún. AI slop tartalom kiengedését, a nyelvi implementáláshoz szükséges módosítások - hogy valóban meg is jelenjen a magyar tartalom - a Kimi K2.7 Pro-val valósult meg. Gondosan ellenőrízve lett az eredmény További módosításokért kérem böngészd az eredeti alkotó(k) Github repositorját.

Az eddigi módosítások pull requestelve lettek az eredeti alkotó(k) felé.

Jelenlegi fordítás és ez a fork a 2026 július 10-ei állapotot tükrözi. Bármilyen eredeti tartalom az eredeti alkotó(k) munkáját tükrözi.

🔗 Live hungarian site: https://exitchatcontrol.hu

# Exit Chat Control

A free, multilingual field guide to escape **Chat Control** and take back control of your digital privacy: encrypted messaging, email, VPN, DNS, 2FA, Linux, GrapheneOS, self-hosting, and more. Every tool is presented with **what it does**, **who it's for**, and **how to install it**.

🔗 **Live site: https://exitchatcontrol.org**

## What is this?

In July 2026, the European Parliament let the "Chat Control" machinery advance — the amended text now sits with the Council, and the permanent version (CSAR, "Chat Control 2.0") is still being negotiated. This project is a practical, no-nonsense answer: a guide referencing privacy-respecting tools anyone can use to opt out of mass surveillance, from the everyday citizen to the whistleblower.

Its promises, all enforced by tests:

- **Static and self-contained** — no tracker, no cookie, not a single request to a third-party domain.
- **Readable with JavaScript disabled** (Tor Browser "safest" mode included) — scripts only power the theme, filters, checklist and quiz.
- **Multilingual by design** — every language is a real prerendered route with correct `hreflang`; adding one means adding translation files, not touching code.
- **Educational quiz** — `/quiz` scores your censorship resistance on a 0–100 scale and points you at concrete fixes in the guide. Server-rendered questions and scoring key (readable with JS off); the score itself is computed locally in the browser, nothing sent or stored.
- **Printable and mirrorable** — a single-file offline version ships with every build.

## Stack

[Astro](https://astro.build) (static output, built-in i18n routing) · Tailwind CSS v4 (design tokens, `light-dark()` theming) · TypeScript strict · Vitest (content integrity, i18n parity, domain allowlist) · Playwright + axe (no-JS readability, zero-third-party-request guarantee, WCAG AA) · Docker (multi-stage build → nginx). Package manager: pnpm.

```sh
pnpm install
pnpm dev                # develop on http://localhost:4321
pnpm build              # static site + offline artifact in dist/
docker compose -f docker-compose.dev.yml up preview   # prod-like: nginx + security headers on :8080
```

Production deploys `docker-compose.yml` (single nginx service behind the platform's reverse proxy — Coolify, etc.), or point any static host at `pnpm build` → `dist/`.

## Contributing

Contributions are very welcome — a tool to add, a translation, a correction. **Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) first**: it contains three simple rules for tools (traction, open source, privacy-respecting), a mandatory affiliation-disclosure policy, and a CI-enforced external-link policy. Large changes start with an issue, not a PR.

Not comfortable with code? Open an issue with the app's name, its link, and why it qualifies, and it will be added for you.

## License

See [`LICENSE`](./LICENSE).

## Support

If this guide is useful and you want to help keep it going:

- **Monero (XMR)** — `42qH4daCTfrguG17aPbGC46vompZajjVZhMCuJ9tb5r9fciQa2wSH2N3RYZohjT9Tw1gdTuQsg4MGFsSp1zLVkQAEgap6j4`
- **Bitcoin (BTC)** — `bc1qc4384nue4ea3gn97qkuxjfnrj48zskh6032ysc`

---

_Encrypting is protecting your private life. Self-hosting is pulling yourself out of Big Tech's surveillance. Taking back control of your tools is becoming ungovernable and sovereign._

