# SensForge: Free FPS Sensitivity & Aiming Calculators

A static Astro site with 7 free browser-based calculators for competitive FPS players:

| Tool | URL | What it does |
|---|---|---|
| Sensitivity Converter | `/sensitivity-converter/` | Convert mouse sensitivity between 12 games via cm/360 matching |
| eDPI Calculator | `/edpi-calculator/` | Effective DPI + cm/360 + competitive band comparison |
| cm/360 Calculator | `/cm-360-calculator/` | Physical mouse distance per full turn + mousepad checks |
| Mouse DPI Analyzer | `/dpi-analyzer/` | Measure true DPI from sensor counts (pointer-lock based) |
| FOV Calculator | `/fov-calculator/` | FOV ↔ aspect ratio conversion + screen-space match factors |
| Crosshair Generator | `/crosshair-generator/` | Live crosshair designer, style values copy + PNG export |
| Sensitivity Randomizer | `/sens-randomizer/` | Practice rolls for aim training (±3–20% bands) |

Plus support pages: home, all-tools hub, 2 guides, about, methodology, contact, changelog, HTML sitemap, privacy, terms, 404.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve the build locally
```

Node 22+ required. No environment variables, no backend, no database.

## Verification

```bash
node scripts/test-math.mjs   # 21 formula tests (cm/360, eDPI, conversions, FOV, match factor)
node scripts/test-dom.mjs    # 24 DOM tests (loads built pages in jsdom, runs the tools)
```

Both must pass before deploy. The DOM tests execute the actual bundled scripts and verify computed outputs (e.g. CS2 2.0 @ 800 DPI → Valorant 0.629).

## Project structure

```
src/
├── data/
│   ├── games.ts        # Game list: yaw constants + confidence labels (single source of truth)
│   └── site.ts         # Site name, domain, contact email
├── lib/sens.ts         # Pure math functions (mirror of scripts/test-math.mjs)
├── layouts/Base.astro  # <head> SEO: title, meta, canonical, hreflang, OG, JSON-LD graph
├── components/         # Header, Footer, Breadcrumbs, Faq, ToolCard, TrustBlock
├── styles/global.css   # Design system (dark theme, WCAG-conscious contrast)
└── pages/              # One directory per route; tool pages carry their own client script
public/                 # robots.txt, favicon.svg, og-default.png, logo-512.png
scripts/
├── test-math.mjs       # Formula tests
├── test-dom.mjs        # Browser-behavior tests (jsdom + esbuild)
└── gen-assets.py       # Regenerates OG image / logo / favicon (PIL)
```

## Editing guide

- **Add a game**: append an entry to `src/data/games.ts` (yaw + confidence + source note) and update the methodology table. It flows into every tool automatically. Verify the yaw from the game's own docs or 2+ independent sources first.
- **Change copy**: each page's text lives in its own `src/pages/<tool>/index.astro` (title/description consts at top of frontmatter).
- **Change colors/spacing**: `src/styles/global.css` variables at `:root`.
- **Update example tables**: recompute with `node scripts/test-math.mjs` values, never hand-wave numbers (test failures catch mismatches).
- **Regenerate images**: `python3 scripts/gen-assets.py`.
- **Domain change**: `src/data/site.ts` + `astro.config.mjs` (site:) + `public/robots.txt` sitemap line.

## SEO implementation notes (per the site's SEO master prompt)

- SSG: all content (headings, tool shells, FAQ answers, internal links, JSON-LD) is in the server HTML. Tools hydrate as plain inline scripts, no framework runtime.
- One H1 per page; title ≤ 60 chars, meta ≤ 155 (enforced in review, see `dist` audit).
- JSON-LD: Organization + WebSite sitewide; BreadcrumbList on subpages; WebApplication on every tool; Article on guides. No fake ratings.
- Canonicals self-referencing; sitemap-index generated; robots.txt allows CSS/JS, blocks parameter spaces.
- Internal linking: hub (`/tools/`) ↔ tools ↔ related tools/guides; every tool reachable in ≤2 clicks; breadcrumbs everywhere.
- Result states are never indexable pages (noindex not needed (they don't exist as URLs); share links use `?sg=...` params which are excluded via robots (`Disallow: /*?q=` covers query space partially) extend if analytics show crawling).
- E-E-A-T: methodology page with sourced yaw table + confidence labels, changelog, contact, privacy; "corrections with credit" policy.
- Privacy: zero trackers; DPI analyzer documents pointer-lock usage locally.

## Deploy (Cloudflare Pages)

| Setting | Value |
|---|---|
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(empty, repo root)* |
| Node version | 22+ required; set env var `NODE_VERSION=22` if the build fails on an older default |

Static `dist/` also deploys to Netlify / Vercel / any static host.

After deploy:
1. Add your custom domain (`sensforge.top`) in Cloudflare Pages → Custom domains, update DNS as instructed.
2. Update `site:` in `astro.config.mjs`, `src/data/site.ts`, and `public/robots.txt` to the final domain, then redeploy (canonicals and sitemap use the `site` value).
3. Submit `https://<domain>/sitemap-index.xml` in Google Search Console + Bing Webmaster Tools; request indexing for `/`, `/tools/`, `/sensitivity-converter/`, and `/games/`.
4. Post-deploy checks: no staging noindex; canonicals point at the production domain; 404 returns a real 404; test one share link (`/sensitivity-converter/?sg=cs2&dg=valorant`).

## Content accuracy policy

- Yaw constants carry confidence labels (`confirmed` / `corroborated` / `single-source`) and must reflect `research/worker-01..03` findings + the methodology page.
- Never ship a number you can't reproduce with `scripts/test-math.mjs`.
- Example tables are generated from the same formulas the tools run.
