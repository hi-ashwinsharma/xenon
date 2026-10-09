# Changelog

All notable changes are documented here. Format based on [Keep a Changelog](https://keepachangelog.com), versioning follows [SemVer](https://semver.org).

## [Unreleased]

### Added

- Multi-package pnpm monorepo architecture (`tokens`, `core`, `web`, `native`, `eslint-plugin`, `docs`, `native-example`).
- `@xenon/tokens`: Single source of truth token engine with CSS variable and React Native compilers.
- `@xenon/core`: Pure mathematical formulas (`computeNestedRadius`, `clampControlRadius`, `groupJointRadius`), centralized route constants (`AppRoutes`), and shared component contracts (`*.types.ts`).
- `@xenon/web` and `@xenon/native` foundation primitives: `XenonProvider`, `Surface` (concentric nesting and Liquid Glass), `Divider`, `Stack`, `Group`, `Text`, `Heading` (strict weights 200, 300, 400), `Icon` (Phosphor Thin wrapper), and `VisuallyHidden`.
- `@xenon/web` and `@xenon/native` signature action controls: `Button` (6 variants including subtle and glass, optical padding, spring micro-interactions), `IconButton` (circular bounds and accessible labeling), `ButtonGroup` (Apple-style grouped capsule with inset hairline dividers), `Link` (hairline offset underline and safe external rel), and `ToggleButton` (surface feedback and aria-pressed).
- `@xenon/web` and `@xenon/native` form controls & architectural inputs: `Input` (restrained 6–8px architectural corners, optical 12px padding, dedicated `SearchInput` pill variant, living prefix icon, Phosphor Thin clear action, shortcut key badge), `InputGroup` (continuous flush joint capsule grouping), `Field` (accessible wrapper with Phosphor `WarningCircle` thin error alert), and `Textarea` (architectural multi-line field with dynamic auto-growth, hairline boundary, and live character metrics).
- `@xenon/core` slider calculation formulas: `clampValue`, `snapToStep`, `valueToPercent`, and `percentToValue`.
- `@xenon/web` and `@xenon/native` tactile selection controls: `Checkbox` (concentric indicator, recessed resting surface, hover micro-lift, press squash, spring checkmark draw-in), `RadioGroup` and `Radio` (Aperture Iris micro-indicator, spring bloom, and architectural Selection Tile mode), `Switch` (proportional capsule track, Apple HIG spring kinematics, tactile stretch micro-interaction), and `Slider` (capsule track with active fill, 1.15x spring thumb scaling, accessible keyboard and gesture drag).
- `@xenon/web` and `@xenon/native` `SegmentedControl`: Apple HIG sliding capsule selector with squash-and-stretch spring kinematics and zero-flicker hairline boundary.
- Comprehensive Vitest test suites for tokens, mathematical formulas, web primitives, action controls, and form controls.
- Project scaffold: Next.js, TypeScript, Tailwind CSS v4, ESLint, Prettier, CI.
- Proprietary license, README, security policy, PR and issue templates.
