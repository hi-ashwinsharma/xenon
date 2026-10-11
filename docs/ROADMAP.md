# Xenon Development Roadmap & Phased Execution

This document defines the formal milestone roadmap for Xenon, from foundational architecture to the v1 showcase platform.

---

## The Component Innovation & Grilling Protocol

> [!IMPORTANT]
> **Never build generic, boring, or clone components.**
> Xenon is designed to be a peerless, innovative design system characterized by hairline precision, geometric purity, and Apple-grade micro-interactions.

For every component milestone (Phases 2 through 5), implementation **must not begin** until an interactive grilling and design alignment session is conducted:

1. **Aesthetic & Interaction Exploration**:
   - Deliberate deeply on the semantic role, negative space, and geometry of the component.
   - Investigate micro-interactions: spring response curves (`--x-spring-soft`), press state scale (`0.98`), keyboard shortcuts, tactile haptics on native.
   - Explore structural innovations: concentric radius computation, grouped joints (pill outer edge with small inner radius), floating Liquid Glass treatments (where Apple HIG permits), optical padding compensations.
2. **Interactive Grilling Session (`ask_question`)**:
   - Probe requirements, trade-offs, props, states, and edge cases.
   - Challenge conventional patterns found in generic libraries (shadcn, Material, HeroUI).
   - Resolve how the component feels and moves on both Web and React Native (Expo).
3. **Spec Alignment & Verification**:
   - Validate that no hard invariants from [DESIGN.md](DESIGN.md) (no gradients, no box-shadows, no emojis, no card nesting) are violated.
   - Check against [Apple HIG](https://developer.apple.com/design/human-interface-guidelines) research.
   - Lock in component prop contracts in `*.types.ts` before writing renderer UI.

---

## Phases Overview

- [x] **Phase 0: Foundations, Design Philosophy & Guidelines**
- [x] **Phase 1: Monorepo Scaffolding & Shared Token Engine**
- [x] **Phase 2: Core Primitives & Signature Grouped Controls**
- [x] **Phase 3: Form Controls & Structural Navigation**
- [x] **Phase 4: Overlays & Cross-Platform Behaviors**
- [x] **Phase 5: Feedback & Data Display**
- [x] **Phase 6: Documentation & Showcase Platform (`apps/docs`)**
- [x] **Phase 7: Marketing Landing Platform & RESTful Pricing (`/`, `/pricing`)**
- [ ] **Phase 8: Community, Discussions & Blog (Firebase)**

---

## Detailed Phase Breakdown

### Phase 0: Foundations, Design Philosophy & Guidelines

- [x] Proprietary repo scaffold, license, CI, repo hygiene.
- [x] [AGENTS.md](../AGENTS.md): Entry point, reading order, hard rules, anti-hallucination protocols.
- [x] [DESIGN.md](DESIGN.md): Visual pillars, banned patterns, Liquid Glass floating layer principles.
- [x] [TOKENS.md](TOKENS.md): Apple HIG-verified + proposed tokens, web rem and native dp scales, discrete 7-stop radius scale, regular & clear Liquid Glass tokens.
- [x] [ARCHITECTURE.md](ARCHITECTURE.md): Multi-package architecture (`tokens`, `core`, `web`, `native`, `docs`, `native-example`).
- [x] [PLATFORMS.md](PLATFORMS.md): Web and Expo parity mapping, safe areas, hairline handling, platform-specific component forms.
- [x] [docs/guidelines/](guidelines/README.md): Modular design rules (Typography, Spacing & Layout with background-less sidebars and ultrawide capping, Shape, Color & Motion, Interaction).
- [x] [V1-SCOPE.md](V1-SCOPE.md): Scope cut of ~30 components with web/native parity.

---

### Phase 1: Monorepo Scaffolding & Shared Token Engine

_Goal: Set up the workspace infrastructure and compile tokens deterministically without duplication._

- [x] Configure `pnpm` workspaces:
  - `packages/tokens`: Single source of truth (TypeScript).
  - `packages/core`: Shared contracts, math functions, route constants.
  - `packages/web`: `@xenon/web` renderer.
  - `packages/native`: `@xenon/native` renderer.
  - `packages/eslint-plugin`: Lint rules enforcing banned patterns (no gradients, no shadows, no emojis, no hardcoded colors).
  - `apps/docs`: Next.js documentation & showcase app.
  - `apps/native-example`: Expo app for native verification.
- [x] Implement `packages/tokens`:
  - Token compiler: Generates CSS variables (`--x-*`) for web and a strongly typed immutable object for React Native.
- [x] Implement `packages/core`:
  - Pure mathematical formulas with 100% test coverage:
    - `computeNestedRadius(parentRadius, padding)`
    - `clampControlRadius(height, radiusStop)`
    - `groupJointRadius(outerRadius)`
  - Centralized route constants (`AppRoutes`).
- [x] Automated verification pipeline (format, lint, typecheck, unit tests).

---

### Phase 2: Core Primitives & Signature Grouped Controls

_Goal: Deliver the foundational visual surfaces, text, icons, and signature pill/grouped action controls._

- [x] **Grilling & Design Session**: Surface concentric mechanics, button press spring dynamics, grouped joint geometry.
- [x] Shared Foundations:
  - `XenonProvider` (web & native theme, accent, radius context).
  - `Surface` (concentric radius inheritance, optional `glass` support).
  - `Divider` (1px hairline web, `StyleSheet.hairlineWidth` native).
  - `Stack` and `Group` layout primitives.
  - `Text` and `Heading` (Geist Sans, Apple HIG-aligned scales, tracking curves).
  - `Icon` wrapper (Phosphor Thin on web & native).
  - `VisuallyHidden` a11y primitive.
- [x] Signature Action Controls:
  - `Button` (pill shape, 6 variants including subtle & glass, spring micro-interactions).
  - `IconButton` (concentric/circular pill bounds, accessible labeling).
  - `ButtonGroup` (Apple-grade grouped capsule: outer edges, inset hairline dividers).
  - `Link` and `ToggleButton`.
- [x] Initial Form Grouping:
  - `Input` (pill shape, focus ring, prefix/suffix, clearable, muted example placeholder).
  - `InputGroup` (grouped inputs with attached buttons/labels sharing hairline boundaries).
  - `Field` (persistent top label, optional indicator, bottom help, error with icon).

---

### Phase 3: Form Controls & Structural Navigation

_Goal: Deliver clean input controls and structural navigation chrome._

- [x] **Grilling & Design Session**: Micro-interactions, aperture iris single choice, architectural form geometry, and Apple spring kinematics.
- [x] Form Controls:
  - `Textarea` (smooth resize, hairline border, auto-growth, character counter).
  - `Checkbox` and `RadioGroup` (hairline geometry, aperture iris indicator, tile selection mode).
  - `Switch` (smooth sliding thumb, native haptic feedback).
  - `Slider` (discrete & continuous, spring thumb).
  - `SegmentedControl` (grouped pill selector with animated active indicator and spring squash physics).
  - `Input` & `Field` (architectural geometry, dedicated pill search input with living prefix and shortcut badge, Phosphor WarningCircle and X thin icons).
- [x] Navigation Chrome:
  - `Navbar` / `GlassBar` (adaptive scroll elevation for Navbar, permanent Liquid Glass for GlassBar).
  - `TabBar` (mobile bottom navigation with floating Liquid Glass island and docked modes).
  - `Sidebar` (background-less by default, rail collapsible mode, optional hairline separator, solid surface mode).
  - `Tabs` (pill capsule and sliding hairline underline indicators, roving focus).
  - `Breadcrumb` and `Pagination` (Phosphor Thin caret separators, direct page jumps, compact mode).

---

### Phase 4: Overlays & Cross-Platform Behaviors

_Goal: Hand-craft accessible overlay primitives across Web (DOM) and Native (Expo)._

- [x] **Grilling & Design Session**: Native sheet vs web popover paradigms, backdrop dismiss springs, focus traps.
- [x] Shared Core Hooks:
  - Focus trap, roving focus index, floating anchor positioning, presence/unmount animation coordinator, click outside.
- [x] Overlays (Batch 1 & Batch 2):
  - `Popover` (anchored floating panel on web; compact sheet on native).
  - `Tooltip` (instant hover on web; accessible press hint on native).
  - `Dialog` (centered modal, backdrop scrim, focus restore).
  - `Sheet` (drawer on web; native gesture-driven bottom sheet with drag handle).
  - `DropdownMenu` (accessible action menu with openOnHover, keyboard roving focus, and groups).
  - `Select` (architectural listbox on web with dynamic radius; bottom picker sheet on native).
  - `Combobox` (searchable listbox with keyboard navigation and clear trigger).
  - `CommandPalette` (floating quick-search overlay with keyboard shortcut trigger).

---

### Phase 5: Feedback & Data Display

_Goal: High-density and clean data presentation components._

- [x] **Grilling & Design Session**: Table scroll ergonomics, subtle accordion spring collapses, clean avatars, isomorphic code highlighting.
- [x] Feedback Elements:
  - `Badge` (acid accent indicators, subtle neutral tags).
  - `Toast` (queue-managed transient notifications with imperative store & declarative component).
  - `Progress` (thin track, determinate fill & indeterminate sweep).
  - `Spinner` and `Skeleton` (geometric loading states).
  - `Alert` (inline status callout, semantic tones).
- [x] Data Display:
  - `Table` & `DataTable` (clean hairline dividers, tabular numbers, horizontal scroll containment).
  - `Accordion` (smooth disclosure without jarring jumps, spring caret rotation).
  - `Avatar` & `AvatarGroup` (pill/circle bounds, fallback typography, group clustering with ring masks).
  - `CodeBlock` (Geist Mono, surface container, hairline border, copy micro-action with checkmark feedback timer, zero-dependency isomorphic tokenizer).

---

### Phase 6: Documentation & Showcase Platform (`apps/docs`)

_Goal: Build the public face of Xenon on Next.js._

- [x] Sparse, typographically led **Landing Page**:
  - Hero with Geist display type and interactive live component sandbox.
  - Interactive signature features:
    - Live 7-stage radius slider demonstration.
    - Concentric nesting visualizer.
    - Liquid Glass live scroll preview.
    - Acid accent palette switcher (lime, pink, blue, purple, green).
    - Grouped control anatomy visualizer (pill edges vs inner joints).
- [x] **Component Catalog**:
  - Real-time search with `CommandPalette`.
  - Component playgrounds with live props customization.
  - Side-by-side Web vs React Native code snippets.
  - Built-in accessibility audit badges.
- [x] **Guidelines Viewer**:
  - Interactive representations of spacing scales, typography rules, and shape math.

---

### Phase 7: Marketing Landing Platform & RESTful Pricing (`/`, `/pricing`)

_Goal: High-impact, human, calm marketing experience and transparent pricing._

- [x] Sparse, peaceful **Marketing Landing Page (`/`)**:
  - One idea per viewport calm scroll.
  - Wry, authentic human & AI developer storytelling ("Friday night egg modal").
  - Effortless `npx xenon init` quick-start command.
  - 4 Minimalist line-based technical blueprint illustrations (ink + active acid accent):
    1. Concentricity vs Egg Mode ($R_{\text{child}} = \max(0, R_{\text{parent}} - p)$)
    2. Hairline Precision vs Muddy Shadows (1px edge vs fuzzy box-shadow)
    3. Fluid Kinematics vs Jarring Snap (Apple damped spring curve vs square jump)
    4. Single Accent Isolation vs Clown Car (90% neutral canvas with 1 purposeful spark)
  - Real-time global accent and radius ripple animation affecting the entire platform A to Z.
- [x] **Transparent RESTful Pricing Page (`/pricing`)**:
  - $0 Free forever for Students, Open Source contributors, and personal builders worldwide.
  - $5 / month Pro tier for production apps and startups.
  - Custom Enterprise tier.
- [x] **Full RESTful Routing (`/docs/*`)**:
  - Dedicated documentation sub-routes (`/docs`, `/docs/components`, `/docs/components/[slug]`, `/docs/guidelines`).
  - Bidirectional URL state synchronization (`?theme=...&accent=...&radius=...&variant=...`).

---

### Phase 8: Community, Discussions & Blog (Firebase)

_Goal: Community engagement and technical retrospectives layer._

- [ ] Firebase Authentication (sign in for discussions and comments).
- [ ] Blog engine for releases and design rationale.
- [ ] Discussion board / component feedback forum.
