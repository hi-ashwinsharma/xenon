<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Xenon: agent entry point

Xenon is a closed-source, minimalistic UI kit for **web (React DOM) and React Native (Expo)**, built from one shared token source and two renderers. Read this file first, then follow the routing below. Do not rely on memory of other UI kits (shadcn, HeroUI, Material). Xenon deliberately differs from them.

## Reading order (mandatory before writing UI code)

1. [docs/DESIGN.md](docs/DESIGN.md): philosophy and the **banned patterns list**.
2. [docs/TOKENS.md](docs/TOKENS.md): the only allowed values for color, type, space, radius, motion.
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): packages, shared core, the two renderers.
4. [docs/PLATFORMS.md](docs/PLATFORMS.md): how web and native differ in input, layout and behavior.
5. [docs/guidelines/README.md](docs/guidelines/README.md): rules for type, spacing, layout, shape, color, motion, interaction.
6. [docs/V1-SCOPE.md](docs/V1-SCOPE.md): which components exist in v1.

## Hard rules (never violate)

- No gradients. No shadows of any kind (CSS `box-shadow`, iOS `shadow*`, Android `elevation`). No blur. Depth comes from hairlines and surface tone only.
- No emoji anywhere. Icons: Phosphor, weight `thin`, via the Xenon `Icon` wrapper on both platforms.
- No raw hex, px, ms or cubic-bezier in components. Use tokens from `docs/TOKENS.md`.
- Every v1 component ships on web and native with identical props. Shared logic and formulas live in `packages/core`, never duplicated per renderer.
- Hover is web-only and gated by `@media (hover: hover)`. Never hide critical actions behind hover.
- No card inside a card. Use dividers and spacing to group within a surface.
- Radius comes from the global radius token. Nested radius follows the concentric rule in `docs/guidelines/shape.md`.
- Font weights are 200, 300 or 400 only. Never 500 or above.
- Types live in dedicated `*.types.ts` files, never in `.tsx` components.
- Routes come from the central route constants, never string literals.

## Anti-hallucination protocol

- If a token, prop, component or rule is not documented in `docs/`, it does not exist. Do not invent it. Ask the maintainer or add it to the docs first.
- When docs and code disagree, the docs describe intent and the code is a bug unless the maintainer says otherwise.
- Every number in the docs is either tagged `(Apple HIG)` with a source, or `(proposed)`. Do not present `(proposed)` values as final.
- Never add a dependency without asking.

## Repo workflow

Private repo, branch-based. Branch from `main`, use Conventional Commits, open a PR into `main`. Never commit to `main` directly after the scaffold commit.
