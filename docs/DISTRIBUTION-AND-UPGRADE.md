# Xenon Distribution, AI Registry & Upgrade Architecture

This document defines how Xenon packages are built, published, distributed, queried by AI coding agents, and upgraded over time with zero dependency friction for consumers.

---

## 1. Package Readiness & Distribution

Xenon provides two distribution modalities depending on how consumers adopt the design system:

### Modality A: Scoped Library Packages (Pre-bundled ESM + CJS + Types)

Built using industry-standard `tsup` with dual output targets:

- `dist/index.js` (ES2022 ES Module)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` & `dist/index.d.cts` (TypeScript Declaration Maps)
- `dist/styles.css` (Compiled token CSS variables)

#### Available Packages:

1. **`@xenon/tokens`** (or `@hi-ashwinsharma/tokens` on GitHub Packages):
   - Pure design tokens: color palettes, radius stops R0-R6, motion springs, spacing, and CSS/Native compilers.
2. **`@xenon/core`** (or `@hi-ashwinsharma/core` on GitHub Packages):
   - Shared math (`computeNestedRadius`, `clampControlRadius`), floating placement engine, toast store, and canonical types.
3. **`@xenon/web`** (or `@hi-ashwinsharma/web` on GitHub Packages):
   - All 26 React DOM components with 1px hairline precision, Phosphor Thin iconography, and physics spring kinematics.
   - External dependencies strictly isolated to `react`, `react-dom`, and `@phosphor-icons/react`.

#### Zero Dependency Friction:

- Monorepo internal references (`workspace:*`) are bundled cleanly at build time so consumers never face missing internal workspace package errors.
- Consumers simply run:
  ```bash
  pnpm add @xenon/web
  ```
  and import:
  ```tsx
  import { Button, XenonProvider } from "@xenon/web";
  import "@xenon/web/styles.css";
  ```

---

## 2. GitHub Packages (Git Packages) CI/CD Pipeline

Because GitHub Packages (`npm.pkg.github.com`) strictly enforces that package scopes match the repository owner (`@hi-ashwinsharma`), Xenon includes automated Git Workflows.

### GitHub Actions Workflows:

1. **`.github/workflows/ci.yml`**:
   - Triggers on every pull request and push to `main`.
   - Runs `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test` (all 101 tests), and full workspace `pnpm build`.
2. **`.github/workflows/publish.yml`**:
   - Triggers automatically on version tag pushes (`git tag v0.1.0 && git push origin v0.1.0`) or manual `workflow_dispatch`.
   - Authenticates to GitHub Packages using `GITHUB_TOKEN`.
   - Executes `node scripts/prepare-github-publish.mjs` to map workspace packages to the `@hi-ashwinsharma` owner scope.
   - Publishes `@hi-ashwinsharma/tokens`, `@hi-ashwinsharma/core`, and `@hi-ashwinsharma/web` with public access.

### Consumer `.npmrc` Setup for GitHub Packages:

Consumers installing from GitHub Packages configure `.npmrc`:

```ini
@hi-ashwinsharma:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

---

## 3. AI Agent Registry Endpoints (`/r/*` & `/llms.txt`)

AI coding agents (Windsurf, Cursor Composer, Claude 3.7 Sonnet, Copilot, v0, AGY) do not navigate browser GUIs. They require fast, machine-readable HTTP endpoints to retrieve component contracts and source code directly into their context window.

Xenon exposes statically cached endpoints in `apps/docs`:

### Endpoint Specifications:

1. **`GET /r/index.json`** (and `GET /r`):
   - Full JSON manifest of all 26 components with categories, descriptions, dependencies, and individual component URLs.
2. **`GET /r/[slug].json`** (e.g. `/r/button.json`, `/r/dialog.json`, `/r/sidebar.json`):
   - Machine-readable schema conforming to the component registry standard.
   - Contains:
     - `name`, `category`, `description`, `accessibility` contract.
     - `dependencies` & `registryDependencies`.
     - `props`: Array of props with types, defaults, requirements, and descriptions.
     - `usage`: Verified TypeScript code snippet.
     - `files`: File definitions for CLI placement (`target: "components/ui/[slug].tsx"`).
3. **`GET /llms.txt`**:
   - Standardized context file for LLM IDE tools.
   - Summarizes Xenon's core principles (pure canvas, 1px hairlines, spring physics, Don Norman principles, R0-R6 radius stops).
   - Lists all 26 components with usage snippets for instant prompt augmentation.
4. **`GET /llms-full.txt`**:
   - Exhaustive technical reference including full Markdown prop tables, accessibility rules, and token scales.

---

## 4. Upgrade Architecture (`npm upgrade` & `npx xenon`)

How consumers stay in sync with upstream Xenon updates:

### Path A: Monolithic / Package Consumers (`npm update @xenon/web`)

1. **Semantic Versioning (SemVer 2.0.0)**:
   - **Patch (`0.1.x`)**: Hairline border rendering fixes, accessibility attribute enhancements, internal performance optimizations. Zero breaking changes.
   - **Minor (`0.x.0`)**: New components (e.g. Phase 6 additions), non-breaking prop additions, new token variants.
   - **Major (`1.0.0`)**: Deprecation of props, changes to token CSS variable names, structural React 19 changes.
2. **Automated Upgrade**:
   - Consumers run:
     ```bash
     pnpm update @xenon/web @xenon/core
     ```
   - Pre-compiled bundles in `dist/` ensure zero build breakage.

### Path B: Component Registry Consumers (`npx xenon upgrade`)

When components are copied into local repositories (shadcn style):

1. **`npx xenon diff [component]`**:
   - Compares the local `components/ui/[component].tsx` against the upstream JSON definition from `https://xenon.design/r/[component].json`.
   - Uses AST-aware 3-way diff to highlight user customizations vs upstream bug fixes.
2. **`npx xenon update [component]`**:
   - Automatically applies upstream updates while preserving user-defined classes and props.
3. **`npx xenon sync-tokens`**:
   - Re-fetches the latest `tokens.css` from `/r/tokens.json` to keep CSS variables and radius stops updated.
