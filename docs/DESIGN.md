# Xenon design philosophy

Xenon is a quiet UI kit. It earns trust through geometry, restraint and negative space instead of decoration.

## Pillars

1. **Hairline clarity.** Edges are 1px, soft and crisp. Structure comes from borders and dividers.
2. **Flat depth.** No shadows. No gradients. Layers are separated by surface tone and hairlines.
3. **Negative space.** Space is a material. When in doubt, add space, not elements.
4. **Concentric geometry.** Shapes nest with mathematically related radii. Nothing looks alien inside its parent.
5. **Thin type.** Geist Sans at weights 200 to 400, sized larger when lighter (Apple HIG guidance for thin fonts).
6. **Pill-first controls.** Buttons and inputs are pills at the pill radius stop. Groups use pill outer edges and small inner joints.
7. **Apple-grade motion.** Brief, purposeful, cancelable, and always reduced-motion safe.
8. **One accent.** One acid accent at a time, chosen globally. Everything else is neutral.

## Banned patterns

| Banned                                                                                   | Use instead                                          |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `linear-gradient`, `radial-gradient`, `conic-gradient`, gradient text, mesh blobs        | Flat surface tones                                   |
| `box-shadow`, `drop-shadow`, `text-shadow`, glow, ring-as-shadow                         | 1px hairline border, surface tone step               |
| Emoji and emoji-like glyphs                                                              | Phosphor Thin icons                                  |
| Card inside card                                                                         | Divider, spacing, or a header row inside one surface |
| Font weight 500 or higher                                                                | Size and color for hierarchy                         |
| Raw hex, raw px, raw ms, raw easing in components                                        | Tokens                                               |
| Hardcoded `border-radius: 9999px` on large surfaces                                      | Radius tokens with surface cap                       |
| Pure-white text on AMOLED black for body copy                                            | `--x-text` (softened)                                |
| Multiple accents on one screen for decoration                                            | One accent, semantic colors only for status          |
| Heavy borders (2px+), dashed borders for decoration                                      | 1px hairline                                         |
| Decorative animation, parallax, looping motion                                           | Purposeful feedback only                             |
| Mixed icon sets or icon weights                                                          | Phosphor `thin` via `Icon`                           |
| Backdrop blur and glassmorphism in the static content layer (cards, inputs, page canvas) | Opaque surfaces (`--x-surface`)                      |

## Liquid Glass: the floating layer exception

Blur is allowed exclusively as **Liquid Glass** on floating and overlay elements `(Apple HIG: Materials)`. Liquid Glass forms a distinct functional layer that floats above scrollable content, letting background elements peek through to preserve spatial context without sacrificing foreground legibility.

### Permitted Floating Scope:

- **Navigation & Structural Bars**: Top Navbar (`GlassBar`), Bottom TabBar, Floating Dock/Segmented Bar.
- **Floating Action Controls**: Floating action buttons (`IconButton glass`, `Button glass`), floating media/filter controls.
- **Floating Overlays**: `Popover`, `CommandPalette`, `Sheet` headers, `Dialog`.

### Strictly Banned in Content Layer:

- Never apply glass to standard inline content cards, table rows, form input fields, static inline buttons, or page canvas backgrounds. Glass inside the content layer creates visual chaos and destroys information hierarchy.

### Two Variants:

- **`regular`**: High legibility, structural blur for text-bearing chrome, navigation bars, and overlays.
- **`clear`**: Ultra-translucent blur for minimal floating action icon pills over rich visual media.

## What "no AI look" means here

Avoid the generic generated-UI look: purple-blue gradients, glowing cards, emoji bullets, oversized rounded cards stuffed with badges, and dense dashboards on landing pages. Xenon pages are sparse, aligned to a grid, and typographically led.

## Showcase tone

The landing page is sparse. One idea per viewport. Show real components, not mock screenshots. Lead with the signature features: global radius scale, concentric nesting, grouped controls, accent and theme switching.
