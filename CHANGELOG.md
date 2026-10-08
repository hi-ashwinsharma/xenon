# Changelog

All notable changes are documented here. Format based on [Keep a Changelog](https://keepachangelog.com), versioning follows [SemVer](https://semver.org).

## [Unreleased]

### Added

- Multi-package pnpm monorepo architecture (`tokens`, `core`, `web`, `native`, `eslint-plugin`, `docs`, `native-example`).
- `@xenon/tokens`: Single source of truth token engine with CSS variable and React Native compilers.
- `@xenon/core`: Pure mathematical formulas (`computeNestedRadius`, `clampControlRadius`, `groupJointRadius`), centralized route constants (`AppRoutes`), and shared component contracts (`*.types.ts`).
- `@xenon/web` and `@xenon/native` foundation primitives: `XenonProvider`, `Surface` (concentric nesting and Liquid Glass), `Divider`, `Stack`, `Group`, `Text`, `Heading` (strict weights 200, 300, 400), `Icon` (Phosphor Thin wrapper), and `VisuallyHidden`.
- `@xenon/web` and `@xenon/native` signature action controls: `Button` (6 variants including subtle and glass, optical padding, spring micro-interactions), `IconButton` (circular bounds and accessible labeling), `ButtonGroup` (Apple-style grouped capsule with inset hairline dividers), `Link` (hairline offset underline and safe external rel), and `ToggleButton` (surface feedback and aria-pressed).
- `@xenon/web` and `@xenon/native` form controls & grouped inputs: `Input` (single line text input with optical padding, hairline focus ring, and accessible states), `InputGroup` (continuous capsule grouping attached prefixes, inputs, and action buttons with flush joints), and `Field` (accessible form field wrapper with persistent label, optional indicator, help text, and error alert presentation).
- `@xenon/core` slider calculation formulas: `clampValue`, `snapToStep`, `valueToPercent`, and `percentToValue`.
- `@xenon/web` and `@xenon/native` tactile selection controls: `Checkbox` (concentric indicator, hairline border, spring toggle, indeterminate support), `RadioGroup` and `Radio` (circular pill with concentric scaling inner dot and accessible context), `Switch` (proportional capsule track, Apple HIG spring kinematics, tactile stretch micro-interaction), and `Slider` (capsule track with active fill, 1.15x spring thumb scaling, accessible keyboard and gesture drag).
- Comprehensive Vitest test suites for tokens, mathematical formulas, web primitives, and action controls.
- Project scaffold: Next.js, TypeScript, Tailwind CSS v4, ESLint, Prettier, CI.
- Proprietary license, README, security policy, PR and issue templates.
