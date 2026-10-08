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
- [ ] **Phase 2: Core Primitives & Signature Grouped Controls**
- [ ] **Phase 3: Form Controls & Structural Navigation**
- [ ] **Phase 4: Overlays & Cross-Platform Behaviors**
- [ ] **Phase 5: Feedback & Data Display**
- [ ] **Phase 6: Documentation & Showcase Platform (`apps/docs`)**
- [ ] **Phase 7: Community, Discussions & Blog (Firebase)**

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

- [ ] **Grilling & Design Session**: Surface concentric mechanics, button press spring dynamics, grouped joint geometry.
- [ ] Shared Foundations:
  - `XenonProvider` (web & native theme, accent, radius context).
  - `Surface` (concentric radius inheritance, optional `glass` support).
  - `Divider` (1px hairline web, `StyleSheet.hairlineWidth` native).
  - `Stack` and `Group` layout primitives.
  - `Text` and `Heading` (Geist Sans, Apple HIG-aligned scales, tracking curves).
  - `Icon` wrapper (Phosphor Thin on web & native).
  - `VisuallyHidden` a11y primitive.
- [ ] Signature Action Controls:
  - `Button` (pill shape, regular & clear glass variants, spring micro-interactions).
  - `IconButton` (concentric/circular pill bounds, accessible labeling).
  - `ButtonGroup` (signature grouped control: pill outer edges, small joint inner radius, hairline seam).
  - `Link` and `ToggleButton`.
- [ ] Initial Form Grouping:
  - `Input` (pill shape, focus ring, muted example placeholder).
  - `InputGroup` (grouped inputs with attached buttons/labels).
  - `Field` (persistent top label, bottom help, error with icon).

---

### Phase 3: Form Controls & Structural Navigation

_Goal: Deliver clean input controls and structural navigation chrome._

- [ ] **Grilling & Design Session**: Fluid tactile interactions on native (switches, sliders), background-less sidebar navigation, and glass bar scroll triggers.
- [ ] Form Controls:
  - `Textarea` (smooth resize, hairline border).
  - `Checkbox` and `RadioGroup` (hairline geometry, spring indicator).
  - `Switch` (smooth sliding thumb, native haptic feedback).
  - `Slider` (discrete & continuous, spring thumb).
  - `SegmentedControl` (grouped pill selector with animated active indicator).
- [ ] Navigation Chrome:
  - `Navbar` / `GlassBar` (sticky top bar, transparent at rest, Liquid Glass on scroll).
  - `TabBar` (mobile bottom navigation with Liquid Glass option).
  - `Sidebar` (background-less by default, optional right hairline separator, optional solid surface mode).
  - `Tabs` (pill or underline indicator, roving focus).
  - `Breadcrumb` and `Pagination`.

---

### Phase 4: Overlays & Cross-Platform Behaviors

_Goal: Hand-craft accessible overlay primitives across Web (DOM) and Native (Expo)._

- [ ] **Grilling & Design Session**: Native sheet vs web popover paradigms, backdrop dismiss springs, focus traps.
- [ ] Shared Core Hooks:
  - Focus trap, roving focus index, floating anchor positioning, presence/unmount animation coordinator.
- [ ] Overlays:
  - `Popover` (anchored floating panel on web; compact sheet on native).
  - `Tooltip` (instant hover on web; long-press or accessible hint on native).
  - `Dialog` (centered modal, backdrop scrim, focus restore).
  - `Sheet` (drawer on web; native gesture-driven bottom sheet with drag handle).
  - `DropdownMenu` (accessible action menu).
  - `Select` (anchored listbox on web; bottom picker sheet on native).
  - `Combobox` (searchable listbox with keyboard navigation).
  - `CommandPalette` (floating quick-search overlay with keyboard shortcut trigger).

---

### Phase 5: Feedback & Data Display

_Goal: High-density and clean data presentation components._

- [ ] **Grilling & Design Session**: Table scroll ergonomics, subtle accordion spring collapses, clean avatars.
- [ ] Feedback Elements:
  - `Badge` (acid accent indicators, subtle neutral tags).
  - `Toast` (queue-managed transient notifications).
  - `Progress` (thin track, accent fill).
  - `Spinner` and `Skeleton` (geometric loading states).
  - `Alert` (inline status callout, semantic tones).
- [ ] Data Display:
  - `Table` (clean hairline dividers, tabular numbers, horizontal scroll containment).
  - `Accordion` (smooth disclosure without jarring jumps).
  - `Avatar` (pill/circle bounds, fallback typography, group clustering).
  - `CodeBlock` (Geist Mono, surface container, hairline border, copy micro-action).

---

### Phase 6: Documentation & Showcase Platform (`apps/docs`)

_Goal: Build the public face of Xenon on Next.js._

- [ ] Sparse, typographically led **Landing Page**:
  - Hero with Geist display type and interactive live component sandbox.
  - Interactive signature features:
    - Live 7-stage radius slider demonstration.
    - Concentric nesting visualizer.
    - Liquid Glass live scroll preview.
    - Acid accent palette switcher (lime, pink, blue, purple, green).
    - Grouped control anatomy visualizer (pill edges vs inner joints).
- [ ] **Component Catalog**:
  - Real-time search with `CommandPalette`.
  - Component playgrounds with live props customization.
  - Side-by-side Web vs React Native code snippets.
  - Built-in accessibility audit badges.
- [ ] **Guidelines Viewer**:
  - Interactive representations of spacing scales, typography rules, and shape math.

---

### Phase 7: Community, Discussions & Blog (Firebase)

_Goal: Community engagement layer._

- [ ] Firebase Authentication (sign in for discussions and comments).
- [ ] Blog engine for releases and design rationale.
- [ ] Discussion board / component feedback forum.
