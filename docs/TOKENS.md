# Tokens

The only allowed values. Tags: `(Apple HIG)` verified against developer.apple.com/design/human-interface-guidelines, `(proposed)` awaiting maintainer sign-off.

Tokens are **platform-neutral**. The single source lives in `packages/tokens` (TS). It compiles to CSS variables with the `--x-` prefix for web and to a typed object for React Native. Lengths are unitless numbers: px on web, dp on native. See [ARCHITECTURE.md](ARCHITECTURE.md) and [PLATFORMS.md](PLATFORMS.md). Token names below use the web CSS form; native uses the same name in camelCase (`xTextBody`).

## Global switches

Set once on the provider. On web they surface as attributes on `<html>`; on native they live in context.

| Switch   | Web attribute   | Values                                                                    |
| -------- | --------------- | ------------------------------------------------------------------------- |
| theme    | `data-x-theme`  | `dark` (default), `light`, `system`                                       |
| accent   | `data-x-accent` | `lime` (default), `pink`, `blue`, `purple`, `green`                       |
| radius   | `data-x-radius` | `0` sharp, `1`, `2`, `3`, `4`, `5`, `6` pill (discrete only, default `4`) |
| platform | n/a             | `web` or `native`, set by the renderer package, not by the user           |

## Type

Font: Geist Sans. Weights 200, 300, 400. Mono (Geist Mono) in code only. Display face: TBD, wordmark and large headings only. Native must load static Geist files for ExtraLight (200), Light (300) and Regular (400), because React Native does not reliably support variable-font weights `(proposed)`.

Each text style has a **native** value and a **web** value.

- **Native** sizes and line heights are the Apple iOS Large (default) text styles `(Apple HIG: Typography, iOS Dynamic Type sizes)`.
- **Web** sizes are Xenon's own, derived from the native scale on a 16px base `(proposed)`. They are in `rem` (px shown at 16px root). Apple's iOS numbers are not copied to web, because web body text runs at 16px and pointer UIs are denser than touch.
- Weights are Xenon's own mapping `(proposed)`: Apple Regular maps to 300, Semibold and Bold map to 400, display sizes use 200.

| Token                  | Native size / line   | Web size / line (proposed) | Weight | Tracking native / web (em) |
| ---------------------- | -------------------- | -------------------------- | ------ | -------------------------- |
| `--x-text-display`     | 56 / 60 `(proposed)` | 64 / 68                    | 200    | +0.006 / +0.004            |
| `--x-text-large-title` | 34 / 41              | 40 / 48                    | 200    | +0.012 / +0.010            |
| `--x-text-title-1`     | 28 / 34              | 32 / 40                    | 200    | +0.014 / +0.013            |
| `--x-text-title-2`     | 22 / 28              | 24 / 32                    | 300    | -0.012 / +0.003            |
| `--x-text-title-3`     | 20 / 25              | 20 / 28                    | 300    | -0.023 / -0.023            |
| `--x-text-headline`    | 17 / 22              | 16 / 24                    | 400    | -0.026 / -0.020            |
| `--x-text-body`        | 17 / 22              | 16 / 24                    | 300    | -0.026 / -0.020            |
| `--x-text-callout`     | 16 / 21              | 15 / 22                    | 300    | -0.020 / -0.016            |
| `--x-text-subhead`     | 15 / 20              | 14 / 20                    | 300    | -0.016 / -0.011            |
| `--x-text-footnote`    | 13 / 18              | 13 / 18                    | 300    | -0.006 / -0.006            |
| `--x-text-caption-1`   | 12 / 16              | 12 / 16                    | 400    | 0 / 0                      |
| `--x-text-caption-2`   | 11 / 13              | 11 / 14                    | 400    | +0.006 / +0.006            |

Tracking values come from the SF Pro tracking table at the matching point size `(Apple HIG)`, with the web column using the value for the web size. Geist is not SF, so tune by eye `(proposed)`.

Legibility floors `(proposed, derived from Apple's advice to go larger with thin custom fonts)`: weight 200 only at 28 and above. Weight 300 at 13 and above. Below 13 use weight 400. Never go under 11.

Native text must scale with the user's font size setting (`allowFontScaling`), capped by `maxFontSizeMultiplier` of 1.4 on chrome (tabs, buttons) and 2.0 on content `(proposed, Apple HIG: do not scale everything)`. Web type uses `rem`.

Default control label size: `--x-text-subhead` on web, `--x-text-callout` on native `(proposed)`.

## Space

Base unit 4px `(proposed)`. Apple publishes control and padding guidance, not a numeric grid; see `guidelines/spacing-layout.md`.

`--x-space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 64, `-9` 96, `-10` 128 `(proposed)`.

## Control size

| Token            | Height       | Notes                                                                                                               |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `--x-control-sm` | 32           |                                                                                                                     |
| `--x-control-md` | 40 (default) |                                                                                                                     |
| `--x-control-lg` | 48           |                                                                                                                     |
| `--x-hit-min`    | 44           | Touch hit area minimum (web `pointer: coarse`, native `hitSlop`) `(Apple HIG: Accessibility, iOS 44x44 pt default)` |

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

`--x-border-width` 1px on web. Native uses `StyleSheet.hairlineWidth` for dividers and 1dp for control borders `(proposed)`. Hairline color is a low-alpha neutral: dark `rgba(255,255,255,0.10)`, light `rgba(0,0,0,0.08)` `(proposed)`. Stronger line for focus and hover: 0.20 and 0.16.

## Color

Neutrals `(proposed)`:

| Token            | Dark (AMOLED on) | Dark (AMOLED off / Claude Charcoal) | Light   |
| ---------------- | ---------------- | ----------------------------------- | ------- |
| `--x-bg`         | #000000 (AMOLED) | #181816                             | #FFFFFF |
| `--x-surface`    | #0A0A0A          | #22211F                             | #FAFAFA |
| `--x-surface-2`  | #111111          | #2C2B28                             | #F4F4F4 |
| `--x-text`       | #EDEDED          | #EDE8DF                             | #0A0A0A |
| `--x-text-muted` | #A1A1A1          | #9E9B91                             | #5C5C5C |

Accents `(proposed, contrast to be verified in the tokens implementation step)`:

| Accent | Dark    | Light (slightly deeper) |
| ------ | ------- | ----------------------- |
| lime   | #D4FF4F | #A8D900                 |
| orange | #FF7E47 | #D9532F                 |
| pink   | #FFB3D9 | #F08BBE                 |
| blue   | #9ED8FF | #5FB4F0                 |
| purple | #CDB4FF | #A78BFA                 |
| green  | #9BFFB8 | #4FD683                 |

`--x-on-accent` is `#0A0A0A` in both themes. Semantic: `--x-danger` #FF8A80 dark and #E5484D light, `--x-warning`, `--x-success`, `--x-info` `(proposed)`.

Contrast `(Apple HIG: Accessibility)`: 4.5:1 for text up to 17pt, 3:1 at 18pt and above or bold. Xenon is stricter for thin weights: treat text under 24px as needing 4.5:1 `(proposed)`.

## Motion

| Token               | Value                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--x-dur-instant`   | 100ms                                                                                                                                           |
| `--x-dur-fast`      | 160ms                                                                                                                                           |
| `--x-dur-base`      | 240ms                                                                                                                                           |
| `--x-dur-slow`      | 400ms                                                                                                                                           |
| `--x-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)`                                                                                                                    |
| `--x-spring-soft`   | stiffness 300, damping 30, mass 1 `(proposed)`. Web compiles it to a `linear()` curve at build time. Native passes the parameters to Reanimated |

All values `(proposed)`. Press scale 0.98. Native animates with Reanimated using the same durations and spring parameters. Everything respects `prefers-reduced-motion`.

## Icons

Phosphor, weight `thin`: `@phosphor-icons/react` on web, `phosphor-react-native` on native, behind one `Icon` wrapper with the same props. Sizes: 16, 20, 24. Icon color inherits text color. Icons paired with visible text are `aria-hidden`; icon-only controls require an accessible label.

## Liquid Glass

Blur is permitted exclusively as **Liquid Glass** on floating and overlay elements `(Apple HIG: Materials)`. Liquid Glass creates a functional floating layer above content, allowing underlying elements to peek through while preserving foreground contrast.

Liquid Glass has two variants:

- **`regular`** (default): Balanced blur + tint for structural chrome, popovers, dialogs, and text-bearing overlays.
- **`clear`**: High-translucency blur for minimal floating icon action buttons, media controls, and floating pill toolbars over rich visual content.

| Token                       | Regular Variant                                                  | Clear Variant                                                    |
| --------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| Blur intensity              | 20px web `blur()` / Native `BlurView` intensity ~50 `(proposed)` | 10px web `blur()` / Native `BlurView` intensity ~25 `(proposed)` |
| Tint dark (`--x-bg`)        | 72% opacity (`rgba(0,0,0,0.72)`) `(proposed)`                    | 40% opacity (`rgba(0,0,0,0.40)`) `(proposed)`                    |
| Tint light (`--x-bg`)       | 80% opacity (`rgba(255,255,255,0.80)`) `(proposed)`              | 50% opacity (`rgba(255,255,255,0.50)`) `(proposed)`              |
| Hairline edge               | 1px `--x-border` on exposed content edges                        | 1px `--x-border` (faint neutral hairline)                        |
| Dimming layer (clear, opt.) | n/a                                                              | 35% dark dimming layer when over bright imagery `(Apple HIG)`    |
| Fallback                    | Opaque `--x-bg` or `--x-surface`                                 | Opaque `--x-surface-2` or `--x-bg`                               |

### Rules & Permitted Scope

1. **Permitted Components**:
   - Navigation and structural bars (`Navbar`/`GlassBar`, `TabBar`, floating segmented bars).
   - Floating action controls and icon buttons (`IconButton glass`, `Button glass`, floating toolbars).
   - Floating overlays (`Popover`, `CommandPalette`, `Sheet` drag header, `Dialog`).
2. **Strictly Banned in Static Content**:
   - Never use Liquid Glass on standard content cards, form inputs, table rows, static inline buttons, or page canvas backgrounds.
3. **No Decorative Extras**: No saturation boost, no multi-color bloom, no gradients, and no drop shadows.
4. **Fallback Handling**: Gracefully falls back to opaque backgrounds when `prefers-reduced-transparency` is active, when `backdrop-filter` is unsupported, or on Android devices with low GPU capabilities.
5. **Component API**: Supported components accept `glass?: boolean | "regular" | "clear"` (`true` defaults to `"regular"`). Dedicated aliases like `GlassBar` are provided for developer ergonomics.
6. **Mirror edge (experimental, web only)**: Open Design-style mirror refraction remains an opt-in web-only prototype. Plain blur remains the universal cross-platform baseline.
