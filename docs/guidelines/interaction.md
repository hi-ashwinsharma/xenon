# Interaction, forms and content

## Targets

1. **Hit area.** iOS default control 44x44pt, minimum 28x28; macOS default 28x28, minimum 20x20 `(Apple HIG: Accessibility)`. Xenon controls are 32, 40 or 48 high. On web `pointer: coarse` and on native (`hitSlop`) the hit area expands to at least 44 with invisible padding. Native defaults to `md` or `lg` controls.
2. **Space between targets.** Keep about 12px around bezelled controls, about 24px around bezel-less ones `(Apple HIG)`.
3. **Use style, not size, to mark the primary action.** Same-size buttons form a set of equal choices; make one filled and the others outline or ghost `(Apple HIG: Buttons)`.
4. **One primary per view.** At most one filled accent button in a surface.
5. **Avoid white fill with black text as a custom style.** It reads as a selected or toggled state.
6. **Focus and press.** On web every interactive element has a visible `:focus-visible` ring (2px accent outline, 2px offset); never remove outlines without replacement. On native, show a pressed state and give hardware-keyboard and screen-reader focus a visible ring.
   6a. **Hover is an enhancement.** It exists on web under `@media (hover: hover)` only. Touch has none, so every hover cue needs a pressed or focus equivalent.
7. **Keyboard and assistive tech.** Every control works by keyboard on web (WAI-ARIA Authoring Practices) and with VoiceOver and TalkBack on native (`accessibilityRole`, `accessibilityState`).
8. **Mobile keyboards.** Forms scroll the focused field into view, use the right `inputMode` or `keyboardType`, and never let the on-screen keyboard cover the action button.

## Forms

1. **Label above, always visible.** No placeholder-as-label. Placeholder is an example, in muted color.
2. **Help text below the field, error replaces help text.** Error text uses the danger color plus an icon.
3. **Inline validation on blur**, then on change after the first error. Never validate while the user is typing the first time.
4. **One column.** Forms are a single column up to 560px wide. Pair fields only when they are naturally paired (first name, last name).
5. **Required marking.** Mark optional fields as "Optional", not required ones with asterisks.
6. **Group related inputs** with a fieldset and legend, separated by a divider, not by nested cards.
7. **Disable only when useful.** Prefer explaining why an action is unavailable.

## Feedback

1. **Respond within 100ms** with a visible state change.
2. **Loading.** Use a skeleton for content, a spinner inside a button for actions. Keep the button width fixed.
3. **Toast** for non-blocking confirmation, auto-dismissed after 5 seconds, pausable, never the only place an error appears.
4. **Dialogs** for decisions that need attention. They trap focus and restore it on close. Max one stacked dialog.
5. **Empty states** have a short title, one sentence of help, and one action. No illustrations required.
6. **Errors** say what happened and what to do, with no blame and no jargon.
7. **Destructive actions** use a confirm step with the verb in the button ("Delete project"), never "OK".

## Content and microcopy

1. Sentence case. Verbs for actions. Short.
2. No exclamation marks, no emoji, no filler words ("Please", "Simply").
3. Numbers and units with a space when readable, e.g. `12 items`.
4. Dates in the user's locale. Use relative time only when it is under a day old.
5. Plain labels; avoid trailing ellipsis unless the action opens a further step.

## Accessibility baseline

1. WCAG 2.2 AA minimum. Semantic HTML first, ARIA only to fill gaps.
2. Icon-only controls require `aria-label`. Icons beside text are `aria-hidden`.
3. Respect `prefers-reduced-motion`, `prefers-contrast`, `prefers-color-scheme`, and user font size.
4. Do not trap keyboard focus except in modal dialogs.
5. Touch, pointer and keyboard are equal citizens.

## The Design of Everyday Things (Norman Principles)

All Xenon components strictly adhere to Don Norman's cognitive design framework:

1. **Affordances & Signifiers**:
   - Every clickable, draggable, or expandable element must visually signal its affordance.
   - Disclosure and dropdown triggers must feature an animated Phosphor `thin` chevron (`CaretDown`) that rotates smoothly on open/close (`0deg` closed, `180deg` open). Naked labels without signifiers are banned for disclosures.
2. **Apple-grade Restraint & Anti-Bloat**:
   - Never overfill popovers or dialogs with redundant controls, duplicated buttons, or unnecessary preview boxes.
   - If a slider or segmented control already manipulates a property, do not stack duplicate button rows or extraneous decorative containers below it. Ruthless reduction produces calm elegance.
3. **Feedback & Realtime Indication**:
   - Every input change provides instant, tactile feedback (<100ms).
   - Selection controls communicate state directly through the control itself and clear metric readouts.
4. **Natural Mapping**:
   - Controls follow natural spatial progression: stepped sliders progress left-to-right from minimum to maximum, incrementing logically.
5. **Physical & Logical Constraints**:
   - Prevent user error by constraining options to valid discrete states (e.g., 7 discrete radius stops 0–6 rather than arbitrary fractional inputs; clamped popup surfaces to prevent corner clipping).
6. **Conceptual Clarity & Discoverability**:
   - The interface must communicate its state clearly at all times, ensuring both humans and AI agents share an accurate, transparent conceptual model.
