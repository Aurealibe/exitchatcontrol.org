# Exit Chat Control

A free, trilingual (EN / FR / NL) guide to escape **Chat Control** and take back control of your digital privacy: encrypted messaging, email, VPN, DNS, 2FA, Linux, GrapheneOS, self-hosting, and more. Every tool is presented with **what it does**, **who it's for**, and **how to install it**.

🔗 **Live site: https://exitchatcontrol.org**

## What is this?

On 9 July 2026, the European Parliament let "Chat Control" through, opening the door to the scanning of private messages across the EU. This project is a practical, no-nonsense answer: a single, self-contained web page that references privacy-respecting tools anyone can use to opt out of mass surveillance, from the everyday citizen to the whistleblower.

It is intentionally simple: no tracking, no dependencies, no build step. Just open `index.html`.

## Repository

- **`index.html`** — the full guide (a standalone website).
- **`article-presse.md`** — a ready-to-publish, actionable article (for a blog, a newsletter, or an X Article).
- **`images/`** — screenshots used in the guide.

## Contributing

Contributions are very welcome. If you know a useful app that helps circumvent Chat Control or protect privacy, please **open a Pull Request** (or an Issue) to add it. **I review every submission personally.**

To be accepted, an app must meet **three simple rules**:

1. **It has traction** — an established, actively maintained project with a real user base, not an obscure or abandoned tool.
2. **It is open source.**
3. **It is privacy-respecting.**

That's it. If it ticks those three boxes and genuinely helps people escape surveillance, it belongs here.

**How to contribute:**
- Fork the repo, add a tool card in `index.html` following the existing format (logo, "what it does", "why", "who it's for", install steps), then open a PR.
- Not comfortable with code? Just open an Issue with the app's name, its link, and why it qualifies (traction + open source + privacy), and I'll add it.

## Roadmap

Right now, the goal is deliberately narrow: **reference useful apps to circumvent Chat Control**, on one clean, fast page.

Later, the site will be refactored to support more:

- Full written guides
- Dedicated pages for each application
- Step-by-step tutorials

This single-page version is the foundation the rest will be built on.

## Running it yourself

It's a static site (one `index.html`, plus an `images/` folder). Host it on any static host (Netlify, Vercel, Cloudflare Pages) or serve it behind a reverse proxy. No build, no dependencies.

## License

See [`LICENSE`](./LICENSE).

---

*Privacy is a right, not a confession. To encrypt is to vote. To self-host is to disobey. To reclaim your tools is to become ungovernable.*
