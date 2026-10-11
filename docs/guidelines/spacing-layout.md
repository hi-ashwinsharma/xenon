# Spacing and layout

1. **Use the space scale only.** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 `(proposed)`. Pick, do not compute. No odd values like 10 or 20.
2. **Group by proximity.** Related items sit closer than unrelated ones. Gap inside a group is at most half the gap between groups.
3. **Negative space is the default.** Surface padding starts at 24. Section spacing on pages starts at 96. Dense layouts are opt-in and labelled `density="compact"`.
4. **Padding around controls.** About 12pt around elements with a bezel, about 24pt around elements without one `(Apple HIG: Accessibility)`. Keep that distance between adjacent interactive items.
5. **Alignment is relationship.** Aligned items read as related; indented items read as subordinate `(Apple HIG: Layout)`. Align to one left edge per column. Use indentation only for hierarchy.
6. **Optical padding.** Pill controls need more horizontal padding than vertical: horizontal is at least `height / 2`. Text must not touch the curve.
7. **Surface padding is symmetric** unless a header row or footer row is present. Header and footer are separated by a divider, not an inner card.
8. **Page and dashboard width.** Web content max width 1120, prose 680, wide showcase / docs 1280, dashboard layout max width 1440 to 1600 `(proposed)`. On large or ultrawide displays (21:9 / 32:9), never allow dashboard content to stretch arbitrarily edge-to-edge; cap the container and let outer negative space breathe naturally. Side margin is 24 on phone, 48 on tablet and 64 on desktop.
9. **Grid.** 12 columns, 24 gutter on desktop, 16 on mobile. Components snap to column edges.
10. **One focal point per viewport.** Landing sections hold one idea, one headline, one visual.
11. **Vertical rhythm.** Section gap 96 to 128, heading to content 24 to 32, paragraph gap 16.
12. **Safe areas.** Respect `env(safe-area-inset-*)` on web and `react-native-safe-area-context` on native for fixed bars and sheets `(Apple HIG: Layout)`.
13. **Adaptive layout.** Layout must survive resizing, rotation and window changes without changing familiarity `(Apple HIG: Layout)`. Design mobile first, then widen.
14. **Density levels.** `comfortable` (default), `compact` (steps controls down one size and padding down one space step). Never mix levels in one surface.
15. **Dividers & Act Boundaries (Gestalt Continuity).** Use a divider instead of a box. Hairline, full width of the group, with inset equal to the surface padding when inside a list. On pages and narrative showcase surfaces, dividers strictly demarcate **macro structural transitions between major Acts** (e.g. above the Act I headline, above the Act II headline, above the Act III headline, and above the closing CTA). **Never place arbitrary horizontal dividers between consecutive scenes, chapters, or sub-sections inside a single act.** Sub-sections within an act must remain visually and narratively connected through negative space, vertical rhythm, and proximity (`gap inside < gap between`). Slicing content within an act shatters Gestalt continuity, creating disjointed micro-islands instead of a unified, fluid journey.
16. **Lists.** Row height at least 44 on touch; separate rows with a hairline, not spacing and background.
17. **Sticky bars.** Fixed headers and tab bars are either opaque (`--x-bg` plus a hairline) or a `GlassBar`. No other blurred or translucent element exists.
18. **Z-order.** Page, surface, popover, dialog, toast. Only overlays sit above surfaces, each separated by a hairline plus a scrim at 60 percent black in dark theme, 30 percent in light `(proposed)`.
19. **Sidebar architecture.**
    - **Default: background-less** (`hasBackground={false}`). The sidebar lives directly on the page canvas (`--x-bg`), letting navigation float quietly in negative space without boxing in the UI.
    - **Separator**: Separator-less by default (`separator={false}`) in documentation and sparse layouts where whitespace provides the natural visual boundary. An optional 1px hairline right separator (`separator={true}`) is available for users and dense dashboards that require structural guidance.
    - **Solid / Muscular variant**: When a dense application specifically requires a grounded, framed console look, `hasBackground={true}` applies `--x-surface` to the sidebar.
