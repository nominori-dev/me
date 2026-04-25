# TODO

Roadmap for the portfolio. Milestones are sequential — finish one before starting the next unless explicitly noted.

---

## Milestone 1 — Projects portfolio (local MDX)

**Goal:** ship a `/projects` index and `/projects/[slug]` detail pages backed by MDX files committed to the repo. No CMS, no database — content is read at build time so Vercel just serves the rendered output.

### Setup
- [ ] Pick the MDX runtime: `next-mdx-remote/rsc` (recommended for the App Router) or `@next/mdx` if we want pure file-based routes.
- [ ] Add deps: `next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-pretty-code` (Shiki-based syntax highlighting).
- [ ] Wire MDX loader in `next.config.ts` if going with `@next/mdx`.

### Content layer
- [ ] Create `content/projects/` at the repo root for `.mdx` files.
- [ ] Define a Zod (already a dep) frontmatter schema: `title`, `slug`, `summary`, `cover`, `tech: string[]`, `repo?`, `url?`, `featured?: boolean`, `publishedAt` (ISO date).
- [ ] Add `src/lib/projects.ts` helpers: `getAllProjects()`, `getProjectBySlug(slug)`, `getFeaturedProjects(n)`. Validate frontmatter with Zod so a bad file fails the build.
- [ ] Seed 1–2 placeholder MDX files to drive layout work.

### Routes
- [ ] `src/app/(home)/projects/page.tsx` — index grid using shadcn `Card`. Sort by `publishedAt` desc.
- [ ] `src/app/(home)/projects/[slug]/page.tsx` — detail page with `generateStaticParams`, `generateMetadata` (title, OG, canonical), and an MDX component map (typography, code blocks, callouts).
- [ ] Add a "Featured projects" preview block to the home page using `getFeaturedProjects(3)`.
- [ ] Add `/projects` link to the header nav.

### Polish
- [ ] OG image per project (static at `content/projects/<slug>/og.png` or generated via `next/og`).
- [ ] Update `sitemap.ts` and `robots.ts` to include each project URL.
- [ ] Loading skeleton + `not-found.tsx` for unknown slugs.

---

## Milestone 2 — Y2K UI refresh (minimalist)

**Goal:** restyle existing surfaces in a restrained Y2K aesthetic — chrome accents, iridescence, pixel detail, monospace flourishes — without falling into retro maximalism. Modern stack only: Tailwind v4 tokens, shadcn primitives, `motion`, `simplex-noise` (already a dep) for procedural grain.

### Design tokens
- [ ] Audit `globals.css` and replace the neutral palette with a Y2K-leaning system: silver/chrome, holographic accents (oklch gradients), one signal color. Keep AAA contrast.
- [ ] Add a font pair: a geometric mono (e.g. `JetBrains Mono` or `Geist Mono`) for accents + Roboto for body. Wire via `next/font`.
- [ ] Define reusable gradient & noise utilities in `globals.css`: `.chrome`, `.holo`, `.scanlines`, `.grain`.

### Components
- [ ] Extend `Button` with `y2k` and `chrome` variants alongside the existing `brutal`.
- [ ] Restyle `Card` and `Badge` (used for the tech-stack chips on the home page) with beveled borders and a subtle inner glow.
- [ ] Rework `Header`: chrome logotype, monospace nav, slot reserved for the locale switcher (M3).
- [ ] Hero: replace the static `goofy.jpg` block with a `motion`-driven holographic panel; add a noise overlay using `simplex-noise`.
- [ ] Add a minimal animated cursor / pointer accent — respect `prefers-reduced-motion`.

### Validation
- [ ] Light + dark theme parity — every new token defined in both.
- [ ] Lighthouse pass: no CLS regressions from animated surfaces.
- [ ] Refresh `/og_banner.png` to match the new aesthetic.

---

## Milestone 3 — Content + i18n (en / pl)

**Goal:** fill in real copy and ship an English/Polish version of the site with proper localized SEO.

### i18n plumbing
- [ ] Add `next-intl` (App Router-native, works on Vercel without extra runtime).
- [ ] Locale routing: `/en/...` and `/pl/...` via middleware; default redirect from `/` to the user's preferred locale.
- [ ] Translation dictionaries under `messages/{en,pl}.json`, keyed flat per page/section.
- [ ] Localize all metadata in `layout.tsx` (`generateMetadata` per locale, `alternates.languages`, `hreflang`).
- [ ] Locale switcher in the header that preserves the current path.

### Content
- [ ] Write final copy for: Hero, About, every section currently in `(home)`, contact block, footer.
- [ ] Translate all copy to Polish; review with a native speaker before shipping.
- [ ] Replace placeholder MDX projects with the real portfolio. Decide: per-locale files (`<slug>.en.mdx` / `<slug>.pl.mdx`) or single source with translated frontmatter blocks.
- [ ] Add a downloadable CV link per locale (`cv.en.pdf` / `cv.pl.pdf`).

### SEO / release
- [ ] Localized `sitemap.ts` with `<xhtml:link rel="alternate" hreflang="...">` entries.
- [ ] Verify OG images render correctly per locale.
- [ ] Final Lighthouse + accessibility pass on both locales.
- [ ] Update the project docs with the new content workflow.
