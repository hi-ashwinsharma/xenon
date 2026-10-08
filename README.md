# Xenon

A minimalistic React UI kit built on hairline borders, crystal-clear edges, generous negative space and Apple-grade micro-interactions.

> Proprietary and closed source. See [LICENSE](./LICENSE). Not for redistribution.

## Principles

- Thin, modern type (Geist Sans, weights 200 to 400).
- 1px soft hairline borders and dividers. No shadows. No gradients.
- AMOLED black page background in dark theme.
- Pill-shaped controls. Grouped controls use pill outer edges and small inner radii.
- No card nesting. No emoji. Line icons only (Phosphor Thin).
- Acid accent palette (lime, pink, blue, purple, green) tuned for dark and light themes.
- Global tokens: theme, accent and a discrete corner-radius scale.

## Status

Pre-alpha. This repository currently holds the project scaffold. Foundation docs
(design system, tokens, architecture, component specs) are the next milestone.

## Planned sitemap

- Landing page
- Components, with search
- Guidelines
- Blog and discussions (Firebase-backed, lowest priority)

## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4
- pnpm
- Hosting: Vercel. Firebase for auth and data (later).

## Getting started

Requirements: Node.js 22 or newer, pnpm.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Script              | Purpose                    |
| ------------------- | -------------------------- |
| `pnpm dev`          | Start the dev server       |
| `pnpm build`        | Production build           |
| `pnpm start`        | Serve the production build |
| `pnpm lint`         | Run ESLint                 |
| `pnpm typecheck`    | Run the TypeScript checker |
| `pnpm format`       | Format with Prettier       |
| `pnpm format:check` | Verify formatting          |

## Workflow

Branch-based, with the repository kept private.

1. Create a branch from `main`: `feat/<name>`, `fix/<name>` or `docs/<name>`.
2. Commit using [Conventional Commits](https://www.conventionalcommits.org).
3. Open a pull request into `main` and wait for CI to pass.
4. Review, then merge.

## Security

See [SECURITY.md](./SECURITY.md).

## Copyright

Copyright (c) 2026 Ashwin Sharma. All rights reserved.
