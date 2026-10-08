# Architecture

Xenon is one design system with two renderers. A shared core defines tokens, behavior specs and component contracts. `@xenon/web` renders to the DOM. `@xenon/native` renders to React Native (Expo, iOS and Android). Both expose the same component names and props.

## Packages

```
xenon/
  packages/
    tokens/    single source of truth (TS): color, type, space, radius, motion
    core/      platform-neutral: *.types.ts contracts, pure functions, behavior specs, route constants
    web/       @xenon/web      DOM components, compiled CSS, in-package docs
    native/    @xenon/native   React Native components, in-package docs
    eslint-plugin/             lint rules for banned patterns
  apps/
    docs/      Next.js: landing, component library with search, guidelines, blog
    native-example/            Expo app with Expo Router, used to verify native components
  docs/        repository docs (this folder)
```

`pnpm` workspaces. Package names and scope are `(proposed)`.

## Dependency direction

`tokens` <- `core` <- `web`, `native`. Apps depend on packages. Packages never import from apps. `web` and `native` never import each other.

## What is shared

| Shared in `tokens` and `core`                                                  | Not shared (per renderer)                    |
| ------------------------------------------------------------------------------ | -------------------------------------------- |
| Token values and names                                                         | Styling mechanism (CSS vs StyleSheet)        |
| Component prop contracts (`*.types.ts`)                                        | Elements (`div` vs `View`)                   |
| `computeNestedRadius`, `clampControlRadius`, `groupJointRadius` pure functions | Animation engine (CSS vs Reanimated)         |
| State machines and behavior specs (open, selected, disabled, loading)          | Focus, hover and gesture handling            |
| Component docs and the JSON manifest                                           | Overlay primitives (popover vs bottom sheet) |

If a rule is expressed as a number or formula, it lives in `core` and both renderers call it. Never re-implement the nested-radius formula in a renderer.

## Web renderer

- Hand-built components (no headless library) with WAI-ARIA behavior per the component spec.
- Tailwind CSS v4 is an internal build tool only. The published package ships precompiled CSS inside `@layer xenon`, so consumers do not need Tailwind.
- Tokens become CSS variables (`--x-*`). Theme, accent and radius are `data-x-*` attributes on `<html>`.
- Motion is CSS first (transitions, `linear()` springs, View Transitions).
- `className` is accepted everywhere; a lint rule flags overrides of protected properties.

## Native renderer

- Expo managed workflow with Expo Router. No NativeWind or Tailwind. Styles come from `StyleSheet` fed by the token object.
- Provider holds theme, accent and radius in context. Surfaces publish their radius and padding through context so children compute nested radius with the shared function.
- Motion uses Reanimated with the shared durations and spring parameters.
- Icons through `phosphor-react-native` (needs `react-native-svg`).
- Safe areas via `react-native-safe-area-context`.
- Static Geist font files (200, 300, 400) loaded with `expo-font`.
- The same look on iOS and Android, no platform-adaptive styling.

## Docs inside the package

Each package ships `docs/` with the guidelines, token reference, per-component specs and a `manifest.json` (component name, props, defaults, platform support). Props carry TSDoc. An LLM reading `node_modules/@xenon/web` or `node_modules/@xenon/native` has everything it needs, version-locked.

## Parity rule

A v1 component is done only when it exists in both renderers, has the same props, passes tests on its platform, and is verified in `apps/docs` and `apps/native-example`. Some components have platform-specific forms; see [PLATFORMS.md](PLATFORMS.md).

## Site (`apps/docs`)

Landing page, component library with search, guidelines, blog and discussions (Firebase, last priority). Hosted on Vercel. Routes come from central route constants.

## Order of work

See [ROADMAP.md](ROADMAP.md) for the detailed phased milestone roadmap, deliverables, and the **Component Innovation & Grilling Protocol**.

1. **Phase 1**: Monorepo scaffolding, tokens compiler, `core` pure math functions with unit tests.
2. **Phase 2**: Primitives & signature controls (`XenonProvider`, `Surface`, `Button`, `ButtonGroup`, `InputGroup`).
3. **Phase 3**: Form controls (`Switch`, `Slider`, `SegmentedControl`) & structural navigation (`Sidebar`, `GlassBar`, `TabBar`).
4. **Phase 4**: Overlays & shared behavior hooks (`Popover`, `Tooltip`, `Dialog`, `Sheet`, `Select`, `CommandPalette`).
5. **Phase 5**: Feedback & data display (`Badge`, `Toast`, `Table`, `Accordion`).
6. **Phase 6**: Docs site, landing page showcase, guidelines & component catalog (`apps/docs`).
7. **Phase 7**: Firebase discussions & blog.
