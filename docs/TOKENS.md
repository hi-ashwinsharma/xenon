# Tokens

The only allowed values. Tags: `(Apple HIG)` verified against developer.apple.com/design/human-interface-guidelines, `(proposed)` awaiting maintainer sign-off. CSS variables use the `--x-` prefix. Global state lives on `<html>` as `data-x-theme`, `data-x-accent`, `data-x-radius`.

## Global switches

| Attribute       | Values                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| `data-x-theme`  | `dark` (default), `light`, `system`                                       |
| `data-x-accent` | `lime` (default), `pink`, `blue`, `purple`, `green`                       |
| `data-x-radius` | `0` sharp, `1`, `2`, `3`, `4`, `5`, `6` pill (discrete only, default `4`) |

## Type

Font: Geist Sans. Weights 200, 300, 400. Mono (Geist Mono) in code only. Display face: TBD, wordmark and large headings only.

Sizes and line heights follow the Apple iOS Large (default) text styles `(Apple HIG: Typography, iOS Dynamic Type sizes)`. Weights are Xenon's own mapping `(proposed)`: Apple Regular maps to 300, Semibold and Bold map to 400, display sizes use 200.

| Token                  | Size / line          | Weight | Tracking (em) |
| ---------------------- | -------------------- | ------ | ------------- |
| `--x-text-display`     | 56 / 60 `(proposed)` | 200    | -0.010        |
| `--x-text-large-title` | 34 / 41              | 200    | +0.012        |
| `--x-text-title-1`     | 28 / 34              | 200    | +0.014        |
| `--x-text-title-2`     | 22 / 28              | 300    | -0.012        |
| `--x-text-title-3`     | 20 / 25              | 300    | -0.023        |
| `--x-text-headline`    | 17 / 22              | 400    | -0.026        |
| `--x-text-body`        | 17 / 22              | 300    | -0.026        |
| `--x-text-callout`     | 16 / 21              | 300    | -0.020        |
| `--x-text-subhead`     | 15 / 20              | 300    | -0.016        |
| `--x-text-footnote`    | 13 / 18              | 300    | -0.006        |
| `--x-text-caption-1`   | 12 / 16              | 400    | 0             |
| `--x-text-caption-2`   | 11 / 13              | 400    | +0.006        |

Tracking values come from the SF Pro tracking table `(Apple HIG)`. Geist is not SF, so tune by eye `(proposed)`.

Legibility floors `(proposed, derived from Apple's advice to go larger with thin custom fonts)`: weight 200 only at 28px and above. Weight 300 at 13px and above. Below 13px use weight 400. Never go under 11px.

Default control label size: `--x-text-subhead`.

## Space

Base unit 4px `(proposed)`. Apple publishes control and padding guidance, not a numeric grid; see `guidelines/spacing-layout.md`.

`--x-space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 64, `-9` 96, `-10` 128 `(proposed)`.

## Control size

| Token            | Height       | Notes                                                                              |
| ---------------- | ------------ | ---------------------------------------------------------------------------------- |
| `--x-control-sm` | 32           |                                                                                    |
| `--x-control-md` | 40 (default) |                                                                                    |
| `--x-control-lg` | 48           |                                                                                    |
| `--x-hit-min`    | 44           | Pointer-coarse hit area minimum `(Apple HIG: Accessibility, iOS 44x44 pt default)` |

Heights are `(proposed)`. Apple: iOS default control 44x44 pt, minimum 28x28; macOS default 28x28, minimum 20x20 `(Apple HIG: Accessibility)`.

## Radius

Seven stops: sharp, five intermediate, pill `(proposed)`. Controls clamp to half their height. Surfaces clamp to a cap so large areas never go circular.

| Stop    | Control radius           | Surface radius | Group joint |
| ------- | ------------------------ | -------------- | ----------- |
| 0 sharp | 0                        | 0              | 0           |
| 1       | 4                        | 6              | 2           |
| 2       | 8                        | 10             | 2           |
| 3       | 12                       | 16             | 3           |
| 4       | 16                       | 20             | 4           |
| 5       | 20                       | 24             | 5           |
| 6 pill  | 9999 clamped to height/2 | 28 (cap)       | 6           |

Nested rule: `inner = max(outer - padding, outer * 0.4)`, never above `outer`. See `guidelines/shape.md`.

## Border

`--x-border-width` 1px. Hairline color is a low-alpha neutral: dark `rgba(255,255,255,0.10)`, light `rgba(0,0,0,0.08)` `(proposed)`. Stronger line for focus and hover: 0.20 and 0.16.

## Color

Neutrals `(proposed)`:

| Token            | Dark             | Light   |
| ---------------- | ---------------- | ------- |
| `--x-bg`         | #000000 (AMOLED) | #FFFFFF |
| `--x-surface`    | #0A0A0A          | #FAFAFA |
| `--x-surface-2`  | #111111          | #F4F4F4 |
| `--x-text`       | #EDEDED          | #0A0A0A |
| `--x-text-muted` | #A1A1A1          | #5C5C5C |

Accents `(proposed, contrast to be verified in the tokens implementation step)`:

| Accent | Dark    | Light (slightly deeper) |
| ------ | ------- | ----------------------- |
| lime   | #D4FF4F | #A8D900                 |
| pink   | #FFB3D9 | #F08BBE                 |
| blue   | #9ED8FF | #5FB4F0                 |
| purple | #CDB4FF | #A78BFA                 |
| green  | #9BFFB8 | #4FD683                 |

`--x-on-accent` is `#0A0A0A` in both themes. Semantic: `--x-danger` #FF8A80 dark and #E5484D light, `--x-warning`, `--x-success`, `--x-info` `(proposed)`.

Contrast `(Apple HIG: Accessibility)`: 4.5:1 for text up to 17pt, 3:1 at 18pt and above or bold. Xenon is stricter for thin weights: treat text under 24px as needing 4.5:1 `(proposed)`.

## Motion

| Token               | Value                                               |
| ------------------- | --------------------------------------------------- |
| `--x-dur-instant`   | 100ms                                               |
| `--x-dur-fast`      | 160ms                                               |
| `--x-dur-base`      | 240ms                                               |
| `--x-dur-slow`      | 400ms                                               |
| `--x-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)`                        |
| `--x-ease-spring`   | `linear()` spring curve, defined in the tokens file |

All values `(proposed)`. Press scale 0.98. Everything respects `prefers-reduced-motion`.

## Icons

Phosphor, weight `thin`. Sizes: 16, 20, 24. Icon color inherits text color. Icons paired with visible text are `aria-hidden`; icon-only controls require an accessible label.
