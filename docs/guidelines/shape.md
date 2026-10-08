# Shape, radius and nesting

## Radius scale

Seven discrete stops from sharp (0) to pill (6), set globally via `data-x-radius`. Values are in `TOKENS.md`. The scale is discrete only; there is no continuous slider.

## Controls versus surfaces

- **Controls** (button, input, chip, switch, segmented) take the control radius for the stop, clamped to half their height. At stop 6 they are pills.
- **Surfaces** (card, dialog, sheet, popover) take the surface radius for the stop, capped at 28px. A pill stop never makes a large surface circular.
- Never write `border-radius: 9999px` on a surface. Use `--x-radius-surface`.

## Concentric nesting (Apple strategy)

When a child sits inside a parent with padding `p`, the child radius is the parent radius minus `p`, so the curves share a center.

On web the formula is CSS; on native it is `computeNestedRadius` from `packages/core`, with the parent radius and padding supplied by context.

```css
.child {
  border-radius: max(
    calc(var(--x-r-parent) - var(--x-pad)),
    calc(var(--x-r-parent) * 0.4)
  );
}
```

- `--x-r-parent` is the nearest ancestor surface or control radius. `--x-pad` is the padding between parent and child edges. Both are set by the parent component and read by children.
- **Floor.** The result never drops below 40 percent of the parent radius. This prevents a near-square button inside a large rounded surface `(proposed)`.
- **Ceiling.** The result never exceeds the parent radius.
- A pill control inside a surface follows the same math; its radius is also clamped to half its own height.
- Padding larger than the parent radius collapses to the floor.

Example: surface radius 24, padding 8, child radius 16. Surface radius 24, padding 24, child radius 9.6 (the floor).

## Grouped controls

Button groups, input groups and segmented controls share edges.

- Outer corners use the control radius (pill at stop 6).
- Inner joints use the group joint radius from `TOKENS.md` (about 25 percent of the outer radius).
- Joints are separated by one hairline, not by a gap and not by doubled borders.
- Hover and focus raise the border of the active segment only; z-index brings it above neighbours.
- Groups have one height. Mixed sizes are not allowed.

## No card nesting

A surface never contains another surface with its own border and fill. Inside a surface, group with:

1. Dividers.
2. Spacing.
3. Header and footer rows.
4. Tone steps only for transient states such as hover and selected, never as permanent inner boxes.

Controls inside a surface are allowed; they are controls, not cards.

## Hairlines

- 1px, soft, low-alpha neutral (see `TOKENS.md`). Never 2px, never dashed for decoration. Native dividers use `StyleSheet.hairlineWidth`.
- Use device-pixel-aware rendering: align the hairline to whole pixels, and do not scale elements by fractions that blur edges.
- A surface has a border or a tone step against its parent, not both strongly. Dark theme surfaces use a border and a faint tone step.
- No shadows and no glows, including Android `elevation` and iOS `shadow*` props. Web focus uses a 2px offset ring in the accent color, drawn as `outline`, not as a shadow.

## Icons in shapes

Icon buttons are circles at stop 6 and rounded squares of control radius at lower stops. Icon is centred, 20px in a 40px control.
