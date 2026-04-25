# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (Next.js + Turbopack)
- `npm run build` — production build (Turbopack)
- `npm start` — run the production build
- `npm run lint` — run ESLint (`next/core-web-vitals` + `next/typescript`)

There is no test runner configured.

## Architecture

Single-page personal portfolio built on the Next.js 15 App Router with React 19 and TypeScript (strict). The site is one route — `/` — assembled from sections.

- **Route group `src/app/(home)/`** holds all visible site code: the home `page.tsx`, a `layout.tsx` that wraps children with `Header` + `Footer`, plus `sections/` and `layout/` subfolders for the page composition. The group's parens mean it does not appear in the URL.
- **Root `src/app/layout.tsx`** owns global metadata (OpenGraph, robots, `metadataBase`), loads the Roboto font via `next/font/google`, applies `max-w-[1440px] mx-auto` to `<body>`, and wraps the tree in `ThemeProvider` (`next-themes`, `attribute="class"`, `defaultTheme="light"`).
- **Global CSS lives at `src/app/(home)/globals.css`** and is imported from the root layout. Note: `components.json` declares `tailwind.css` as `src/app/globals.css`, which doesn't match the real location — keep that in mind when running shadcn CLI commands.
- **Styling** uses Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config`; theme tokens are declared inline in `globals.css` via `@theme inline` and CSS custom properties). `tw-animate-css` is included. The `dark` variant is wired through `@custom-variant dark (&:is(.dark *))`.
- **shadcn/ui** is configured in `components.json` with the `new-york` style, `neutral` base color, and `lucide` icons. Generated primitives live in `src/components/ui/`; app-specific components go in `src/components/`.
- **Path alias** `@/*` → `./src/*`. The shadcn aliases (`@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`) follow the same convention.
- **Utility** `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge) is the standard class-name helper for components.

## Conventions

- New page sections belong in `src/app/(home)/sections/` and are composed from `src/app/(home)/page.tsx`.
- Header/footer chrome belongs in `src/app/(home)/layout/`.
- Client-only sections must start with `"use client"` (see `sections/hero-section.tsx`).
- When adding shadcn components, expect them under `src/components/ui/` per the aliases in `components.json`.

## Git workflow

- Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>)!?: <subject>`. Types seen in this repo: `feat`, `fix`, `refactor`. Common scopes: `seo`, `ui`. Append `!` for breaking changes (e.g. `refactor(ui)!: ...`).
- Commit after each meaningful domain change rather than batching unrelated work — one logical change per commit. Example boundaries: a new section, an SEO/metadata fix, a UI refactor, a dependency cleanup. Don't mix a `feat` with an unrelated `fix` in the same commit.
- Keep the subject short and imperative (lowercase, no trailing period), matching the existing log style.
