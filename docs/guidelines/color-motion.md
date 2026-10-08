# Color and motion

## Color

1. **One accent at a time.** The global accent marks the primary action, selected state, focus ring and key indicators. Do not use two accents to decorate one screen.
2. **Neutral by default.** Roughly 90 percent of any screen is neutral surfaces and text; accent covers at most about 10 percent `(proposed)`.
3. **Accent is a fill, not body text on light.** Light-theme accent values are too bright for text on white. Use `--x-text` for text and reserve accent for fills, borders and indicators.
4. **Text on accent** is `--x-on-accent`. Check contrast per accent.
5. **Contrast.** 4.5:1 for text up to 17pt, 3:1 for 18pt and larger or bold `(Apple HIG: Accessibility)`. Xenon asks 4.5:1 for any text under 24px because of thin weights `(proposed)`. Offer an increased-contrast mode.
6. **Never rely on color alone.** Pair status color with an icon or text `(Apple HIG)`.
7. **AMOLED black.** The page is `#000000` in dark. Surfaces step up only slightly (see `TOKENS.md`). Do not use pure white text for body; use `--x-text`.
8. **Semantic colors** (danger, warning, success, info) are for status only, never decoration.
9. **Charts and tags** may use the other named hues, one hue per series, never in the same row as the accent unless they encode data.
10. **No gradients, no transparency tricks to fake depth.** Opacity is used for hairlines and disabled states only.
11. **Disabled** is 40 percent opacity and `cursor: not-allowed`. Never remove a disabled control's label.

## States

Every interactive component defines: rest, hover, pressed, focus-visible, disabled, selected, loading and error where relevant. States change border, tone and text color only. They never change size or layout.

## Motion

1. **Purposeful.** Add motion to support understanding, not to decorate `(Apple HIG: Motion)`.
2. **Brief and precise.** Feedback animations are short and unobtrusive. Default 160 to 240ms.
3. **Do not animate frequent interactions.** Avoid extra motion on actions repeated constantly `(Apple HIG)`.
4. **Cancelable.** Users never wait on an animation to continue `(Apple HIG)`. Overlays stay interactive while animating out.
5. **Realistic.** Enter and exit follow the same path. A sheet that slides up exits downward `(Apple HIG)`.
6. **Optional.** Support `prefers-reduced-motion`: replace movement with a fade of at most 100ms. Never convey information by motion alone `(Apple HIG)`.
7. **Press.** Pressed controls scale to 0.98 over 100ms. Release is a spring.
8. **Easing.** Use `--x-ease-standard` for most; `--x-spring-soft` for press release, switch thumbs and sheets.
9. **Animate transform and opacity only.** Never animate layout properties. Use View Transitions for route and theme changes where supported.
10. **Theme and accent switching** crossfades colors in `--x-dur-base`.
11. **Stagger** is allowed on landing page reveals at 40ms steps, maximum 6 items, never on product UI.
