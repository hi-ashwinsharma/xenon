# Typography

1. **Use the text styles, never ad hoc sizes.** Pick a style from `TOKENS.md`. Apple defines a style as weight, size and leading together `(Apple HIG)`.
2. **Hierarchy by size and tone, not weight.** Xenon caps weight at 400. Separate levels with size steps and `--x-text` versus `--x-text-muted`.
3. **Go larger when lighter.** Apple advises larger-than-recommended sizes for thin custom fonts `(Apple HIG)`. Weight 200 starts at 28px, weight 300 at 13px.
4. **Floors.** Apple's iOS default is 17pt and minimum 11pt; macOS default 13pt and minimum 10pt `(Apple HIG)`. On native, body is 17pt. On web, body is 16px and the scale is derived from Apple's `(proposed)`. Never under 11.
5. **Few typefaces.** Geist Sans, plus Geist Mono in code, plus the display face for wordmark and display headings only `(Apple HIG: minimize typefaces)`.
6. **Tracking tightens as size grows to about 20px, then loosens.** Apply the tracking column in `TOKENS.md` for the platform. Never add tracking by hand.
7. **Measure.** Prose width 55 to 75 characters (about 560 to 680px). Cap with `max-width` in `ch`.
8. **Line height.** Use the paired value from the style. Do not set `line-height` separately.
9. **Alignment.** Left align text. Center only short headings and single lines. Never justify.
10. **One heading level per idea.** Do not skip levels. One display or large-title per page.
11. **Case.** Sentence case for UI labels and headings. No all-caps, except tiny overline labels at caption-2 with tracking `(proposed)`.
12. **Numbers.** Use tabular figures (`font-variant-numeric: tabular-nums`) in tables, stats and timers.
13. **Truncation.** Truncate rarely. Allow wrapping in labels. Truncate only single-line list items and always provide the full text in a tooltip or detail view `(Apple HIG: Dynamic Type)`.
14. **Respect user text size.** Web uses `rem` so browser settings scale it. Native honors the OS font scale within the caps in `TOKENS.md`. Test at 200 percent.
15. **Do not scale everything.** When text grows, tab titles and chrome stay fixed; prioritize content `(Apple HIG)`.
16. **Links.** Underline with a hairline offset, or accent color plus underline on hover. Never color alone.
17. **Code.** Geist Mono at footnote size, on `--x-surface`, with a hairline border.
