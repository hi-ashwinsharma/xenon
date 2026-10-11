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
7. [docs/ROADMAP.md](docs/ROADMAP.md): execution phases and the **Component Innovation & Grilling Protocol**.

## Hard rules (never violate)

- No gradients. No shadows of any kind (CSS `box-shadow`, iOS `shadow*`, Android `elevation`). No blur except Liquid Glass on floating/overlay layers (see `docs/TOKENS.md`). Depth comes from hairlines and surface tone only.
- No emoji anywhere. No raw ASCII/unicode characters (`×`, `!`, `+`, `-`, `?`, `>`) for UI chrome, badges, indicators, clear buttons, or action triggers. Icons must strictly be Phosphor, weight `thin`, via the Xenon `Icon` wrapper on both platforms.
- Hairline precision & focus: All borders and dividers are strictly 1px (`StyleSheet.hairlineWidth` on native). Focus states must NEVER use detached browser outlines (no `outline-offset: 2px` or harsh halos). Interactive focus must smoothly transition the 1px hairline border to `var(--x-accent)` or hug the geometry seamlessly.
- Dividers strictly demarcate macro act transitions: Dividers (1px hairlines) exist solely to separate major architectural acts (e.g., above Act I, above Act II, above Act III, above closing CTA). Never slice sub-sections, chapters, or consecutive scenes inside the same act with arbitrary dividers; maintain Gestalt continuity and group related content through proximity and negative space.
- Form control architectural geometry: Standard data inputs and form fields must not be styled as oblong stadium capsules/pills. Inputs maintain restrained architectural corner geometry (Stop 1–2 / 6–8px) with optical horizontal padding (10–14px, never `height / 2`). Full pills are reserved strictly for action buttons, chips, and dedicated search bars.
- Zero instant/snappy transitions: No UI state change should EVER be snappy, instantaneous, or abrupt. Every transition (disclosures, expansions, collapses, active states, caret rotations, appearances, dismissals, hover, focus) must go through Apple-grade fluid animations using physics springs (`springSoft` / `springSnappy`) or tokenized ease curves (`var(--x-ease-standard)`, `var(--x-motion-ease-spring)`). Never use HTML `hidden` or `display: none` directly on elements being animated without presence/unmount coordination, as `display: none` immediately cancels all CSS transitions.
- No raw hex, px, ms or cubic-bezier in components. Use tokens from `docs/TOKENS.md`.
- Every v1 component ships on web and native with identical props. Shared logic and formulas live in `packages/core`, never duplicated per renderer.
- Hover is web-only and gated by `@media (hover: hover)`. Never hide critical actions behind hover.
- No card inside a card. Use dividers and spacing to group within a surface.
- Radius comes from the global radius token. Nested radius follows the concentric rule in `docs/guidelines/shape.md`.
- Font weights are 200, 300 or 400 only. Never 500 or above.
- Absolute type safety: never use `any` or loose `unknown`. Every prop, function, hook, ref, event handler, and callback must have explicit, exhaustive types. Types live in dedicated `*.types.ts` files, never in `.tsx` components.
- Routes come from the central route constants, never string literals.
- Before authoring any component, execute the **Component Innovation & Grilling Protocol** (`docs/ROADMAP.md`): brainstorm micro-interactions, distinct geometry, and Apple-grade precision via `ask_question`. Never output generic boilerplate, unstyled placeholders, or legacy UI patterns.
- The Design of Everyday Things (Norman Invariant): Every component, control, disclosure, and interactive surface must strictly embody Don Norman's 7 fundamental principles of design (*The Design of Everyday Things*):
  1. Affordances: Physical and perceived possibilities for action must be unambiguous.
  2. Signifiers: Interactive capabilities must be explicitly communicated (e.g., interactive disclosure triggers must always feature animated rotating carets/chevrons; clear touch targets and visual states). Never leave an interactive element looking like static display text.
  3. Mapping: Spatial and conceptual controls must map directly to their real-world outcome (e.g., stepped sliders arranged in natural directional sequence).
  4. Feedback: Immediate, continuous sensory confirmation for all actions within 100ms (clear state feedback, tactile indicators, spring kinematics).
  5. Conceptual Models: Provide users and AI agents a transparent, coherent mental model of system state (discrete stops, explicit scales, clear modes).
  6. Constraints: Prevent invalid states through architectural constraints (e.g., mathematical radius clamping to prevent popup content clipping).
  7. Discoverability: All possible operations and active states must be directly visible and discoverable without guesswork.
- Ruthless Apple Restraint & Anti-Bloat: Floating surfaces, popovers, and dialogs must NEVER be overfilled with redundant widgets, duplicate buttons, or decorative preview boxes. Apple achieves elegance through ruthless reduction. If a control (e.g., a slider) already handles the action, do not clutter the surface with duplicate button rows, redundant preview boxes, or stacked badges. Keep popups compact, quiet, focused, and purposeful.

## Anti-hallucination protocol

- If a token, prop, component or rule is not documented in `docs/`, it does not exist. Do not invent it. Ask the maintainer or add it to the docs first.
- When docs and code disagree, the docs describe intent and the code is a bug unless the maintainer says otherwise.
- Every number in the docs is either tagged `(Apple HIG)` with a source, or `(proposed)`. Do not present `(proposed)` values as final.
- Never add a dependency without asking.

## Repo workflow

Private repo, branch-based. Branch from `main`, use Conventional Commits, open a PR into `main`. Never commit to `main` directly after the scaffold commit.
