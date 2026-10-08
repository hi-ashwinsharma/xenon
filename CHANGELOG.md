# Changelog

All notable changes are documented here. Format based on [Keep a Changelog](https://keepachangelog.com), versioning follows [SemVer](https://semver.org).

## [Unreleased]

### Added

- Multi-package pnpm monorepo architecture (`tokens`, `core`, `web`, `native`, `eslint-plugin`, `docs`, `native-example`).
- `@xenon/tokens`: Single source of truth token engine with CSS variable and React Native compilers.
- `@xenon/core`: Pure mathematical formulas (`computeNestedRadius`, `clampControlRadius`, `groupJointRadius`), centralized route constants (`AppRoutes`), and shared component contracts (`*.types.ts`).
- `@xenon/web` and `@xenon/native` foundation primitives: `XenonProvider`, `Surface` (concentric nesting and Liquid Glass), `Divider`, `Stack`, `Group`, `Text`, `Heading` (strict weights 200, 300, 400), `Icon` (Phosphor Thin wrapper), and `VisuallyHidden`.
- Comprehensive Vitest test suites for tokens, mathematical formulas, and web primitives.
- Project scaffold: Next.js, TypeScript, Tailwind CSS v4, ESLint, Prettier, CI.
- Proprietary license, README, security policy, PR and issue templates.
