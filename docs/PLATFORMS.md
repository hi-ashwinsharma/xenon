# Platforms: web and native

Xenon looks the same on web, iOS and Android. How it behaves differs because input, screen and platform capabilities differ. Apple HIG values are used directly on native and adapted on web `(proposed)`.

## Mapping

| Concern        | Web                                                                                                                     | Native (Expo)                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Units          | px, type in `rem`                                                                                                       | dp                                                                                                       |
| Hairline       | 1px                                                                                                                     | `StyleSheet.hairlineWidth` for dividers, 1dp for control borders                                         |
| Hover          | Only inside `@media (hover: hover)`                                                                                     | None. Use pressed state                                                                                  |
| Pressed        | `:active`, scale 0.98                                                                                                   | `Pressable` pressed, scale 0.98                                                                          |
| Focus ring     | `:focus-visible` 2px accent outline, 2px offset                                                                         | No ring for touch. Show for hardware keyboard and screen-reader focus where supported                    |
| Hit area       | Expand to 44px on `pointer: coarse`                                                                                     | `hitSlop` to 44dp                                                                                        |
| Text scaling   | Browser zoom and `rem`                                                                                                  | OS font scale, capped by `maxFontSizeMultiplier` (see `TOKENS.md`)                                       |
| Theme          | `data-x-theme`, `prefers-color-scheme`                                                                                  | `useColorScheme` through provider                                                                        |
| Safe area      | `env(safe-area-inset-*)`                                                                                                | `react-native-safe-area-context`                                                                         |
| Keyboard       | Native browser behavior                                                                                                 | Keyboard-avoiding layout on forms and sheets                                                             |
| Motion         | CSS, View Transitions                                                                                                   | Reanimated                                                                                               |
| Reduced motion | `prefers-reduced-motion`                                                                                                | `AccessibilityInfo.isReduceMotionEnabled`                                                                |
| Haptics        | None                                                                                                                    | Light impact on switch, segment change, destructive confirm (`expo-haptics`) `(proposed)`                |
| Shadow         | Banned                                                                                                                  | Banned, including Android `elevation` and iOS `shadow*` props                                            |
| Blur           | Banned in static content. Allowed as Liquid Glass (`regular` / `clear`) on floating & overlay layers: `backdrop-filter` | Banned in static content. Allowed as Liquid Glass on floating & overlay layers: `expo-blur` (`BlurView`) |

## Responsive behavior

- Design mobile first on both platforms. Web adds layout, not features.
- Web breakpoints `(proposed)`: sm 640, md 768, lg 1024, xl 1280. Use container queries for components.
- Native layout adapts by window width using the same breakpoints, which matters for tablets and foldables.
- Touch-first components (sheet, bottom navigation) are first-class on native and appear on web below `md`.
- Never hide critical actions behind hover.

## Component forms per platform

Same name and props, different presentation where touch demands it.

| Component        | Web                             | Native                                                             |
| ---------------- | ------------------------------- | ------------------------------------------------------------------ |
| `Popover`        | Anchored floating panel         | Anchored panel, or sheet when space is tight                       |
| `DropdownMenu`   | Anchored menu                   | Action sheet style menu                                            |
| `Select`         | Anchored listbox                | Bottom sheet picker                                                |
| `Combobox`       | Anchored listbox with typeahead | Full-height sheet with search field                                |
| `Tooltip`        | Hover and focus                 | Long press, or omitted when the label is visible                   |
| `Dialog`         | Centered modal                  | Centered modal                                                     |
| `Sheet`          | Side or bottom drawer           | Bottom sheet with drag handle and swipe dismiss                    |
| `Toast`          | Corner stack                    | Top or bottom inset, respects safe area                            |
| `CommandPalette` | Keyboard shortcut overlay       | Search sheet                                                       |
| `Table`          | Native table                    | Scrollable list with row cells; horizontal scroll only when needed |

## Platform rules

1. A component spec lists its web form and native form. If it has none, it is not in v1.
2. A behavior spec (states, keyboard map, ARIA roles and native accessibility roles) is written once in the component doc and implemented twice.
3. Accessibility roles: ARIA on web, `accessibilityRole` and `accessibilityState` on native. Both are specified.
4. Never use a platform feature to change the look. Platform differences are about input and behavior only.
5. Test every component on iOS, Android and a desktop browser before it is called done.
