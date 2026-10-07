# Jurgen Leka — Portfolio

The source for [jurgenleka.com](https://jurgenleka.com): an editorial portfolio for Jurgen Leka's product engineering work across enterprise web platforms, native iOS, developer tools, and carefully bounded AI systems.

## What is showcased

- **MySigner** — mobile signing and release automation through a Rails dashboard, API, and Ruby CLI
- **Aichu** — local secret redaction for prompts sent through AI coding agents
- **Subtitle.fm** — AI-assisted, realtime collaborative subtitle production
- **Reading Companion** — a local-first EPUB reader with spoiler-bounded story memory
- **Goldengo** — a privacy-minded native iOS personal-finance app
- **OopsFee** — a cross-platform promises, verification, and accountability product
- **OptionsBot** — paper-only IBKR options research and deterministic execution controls
- **Polymarket Bot** — paper-only prediction-market research with a separate execution and risk service
- **Great Wall of Ideas** — realtime idea discovery, discussion, and remixing
- **Resume Builder** — a typed, configurable, print-ready CV system
- **Chat Application** — an early Angular realtime group-messaging product

Four featured projects have original interface studies built directly in React and CSS. All eleven projects remain available in a filterable index with expandable workflow illustrations and repository links. The studies illustrate the products; they are not screenshots or live product interfaces.

## Art direction

Parchment, olive, terracotta, peach, and dusty lilac; oversized DM Sans headlines, Instrument Serif accents, and DM Mono labels. The copy is direct and playful: “Code. Ship. Repeat.”

The opening sculpture has 26 CSS planes, a continuous 3D rotation, pointer tilt, and three remixable forms. Masked entrance typography, a looping marquee, scroll parallax, sticky project panels, magnetic links, pointer-following project labels, section reveals, and a curved contact transition give the page a consistent motion language. Lenis smooths desktop wheel scrolling and anchors; touch scrolling stays native. Motion is always enabled, with no switch or stored preference. The public location is Europe.

The design draws on [Miranda's paper portfolio](https://www.niccolomiranda.com/), [Dennis Snellenberg's typographic scale](https://dennissnellenberg.com/), [Rauno Freiberg's interaction craft](https://rauno.me/), and [Bruno Simon's sense of play](https://bruno-simon.com/). Layouts, artwork, interface studies, and implementation are original to this portfolio.

The custom JL monogram combines a curved J, squared L, and terracotta accent. `public/logo-mark.svg` is the master vector. Run `npm run brand:generate` to regenerate favicon sizes and the social preview from that source.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion, Lenis, CSS 3D transforms, and native disclosure controls
- Resend for the contact form
- OpenNext for Cloudflare deployment

## Local development

```bash
git clone https://github.com/jouleka/personal-website-v2.git
cd personal-website-v2
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The site renders without contact-form credentials; configure the values documented in `.env.example` to send messages.

## Verification

```bash
npm run lint
npm run test:security
npm audit
npm run build
```

## Deployment

Production runs as an OpenNext Cloudflare Worker on `jurgenleka.com` and
`www.jurgenleka.com`. The checked-in Wrangler configuration includes the
Worker entry point, static assets, domain routes, and R2 incremental cache
binding. Contact-form values stay in Cloudflare secrets and are never committed.

Use Node.js 22.18 or newer. `predev` and `prebuild` generate the Cloudflare
binding/runtime declarations from `wrangler.toml`; regenerate them with
`npm run cf:typegen` after changing bindings.

## Security

The custom `worker.mjs` entry point caps contact request bodies at 32 KiB
while streaming, before OpenNext buffers them, and times out stalled bodies
after five seconds. Only same-origin JSON POSTs reach the contact handler.
Other write endpoints are disabled because this portfolio has no Server Actions.

Cloudflare bindings limit contact attempts to five per IP per minute, delivery
to one per email address per minute, and delivery to ten messages per minute
across the site. These counters are approximate and **per Cloudflare location**,
not a global billing quota. Missing or unavailable limiters fail closed. Email
counter keys are hashes, and message content is not logged. A hidden honeypot
discards basic automated submissions without sending email.

The Worker and Next config set CSP, anti-framing, MIME-sniffing, referrer,
permissions, and HTTPS headers; `public/_headers` covers Cloudflare-served
static assets. CSP allows inline bootstrap scripts and motion styles needed
by the statically rendered page, so it is not a nonce-based strict CSP.

The pinned Next.js release includes security patches through 16.3.8. Sharp is
overridden to its patched 0.35.5 release, including Miniflare's exact dependency.
Tailwind 4 removes its vulnerable legacy glob/watch dependencies. Next's lint
plugin still uses an unpatched `braces` dependency through `fast-glob`; the
scoped override in `package.json` replaces just that lint-only glob operation
with the small `tools/eslint-glob` adapter backed by `tinyglobby`. Its directory
matching contract is covered by regression tests. Remove the override when
Next's lint plugin adopts a patched dependency chain.

Recheck the installed lockfile with `npm audit` after dependency changes. Do not
use `npm audit fix --force` to roll deployment or lint tooling back to old majors.

```bash
npm run preview
npm run deploy
```

## License

The site content and design are personal portfolio material. You may use the code as inspiration, but do not present Jurgen's identity, copy, or project work as your own.
