# Repository Guidelines

## Project Structure

This portfolio uses Next.js App Router, React, and TypeScript. Routes and layouts live in `src/app/`; `src/app/(home)/` contains the home page, shared header and footer, and project routes. Place home page sections in its `sections/` directory. Reusable UI primitives live in `src/components/ui/`, other shared components in `src/components/`, hooks in `src/hooks/`, and utilities in `src/lib/`.

Project case studies are MDX files in `content/projects/`; their frontmatter is validated by `src/app/(home)/projects/lib/schema.ts`. Put static images and other public assets in `public/`.

The root `src/app/layout.tsx` owns site metadata, fonts, and the theme provider. The `(home)` route group does not appear in URLs; its `layout/` directory holds the header and footer.

## Build and Development

- `npm ci` installs the dependencies recorded in `package-lock.json`.
- `npm run dev` starts the local Next.js development server with Turbopack.
- `npm run build` creates a production build; `npm start` serves that build.
- `npm run lint` runs ESLint with the Next.js core web vitals and TypeScript rules.

## Coding Style

Follow the surrounding file's indentation and formatting; existing files use both two and four spaces. Use TypeScript with strict checking, PascalCase for React components, and descriptive kebab-case filenames such as `hero-section.tsx`. Use the `@/` alias for imports from `src/`. Add `"use client"` to components requiring client-side behavior. Style with Tailwind CSS and use `cn()` from `src/lib/utils.ts` when combining conditional classes. Global theme tokens are in `src/app/(home)/globals.css`.

Tailwind v4 theme tokens are defined in CSS. shadcn/ui primitives use the `new-york` style and belong in `src/components/ui/`. Note that `components.json` points to `src/app/globals.css`, while the actual stylesheet is under `(home)`; check this path when using the shadcn CLI.

## Testing

No test runner or coverage threshold is currently configured. Run `npm run lint` and `npm run build` before submitting changes, and manually check affected routes and responsive layouts. For content changes, verify the project page and its MDX frontmatter render correctly.

## Commits and Pull Requests

Prefer the Conventional Commit style used in the history, for example `feat(ui): add project card` or `fix(seo): update metadata`. Keep subjects short and imperative, and each commit focused on one logical change. Pull requests should describe the change and its motivation, link any relevant issue, list checks performed, and include screenshots for visible UI changes.
