# V1 scope

Tags: **Core** must ship, **Should** is included in v1 cut. Everything under "Later" is out of v1.

Every v1 component ships on **web and native** with identical props (see `PLATFORMS.md` for platform-specific forms such as `Select` as a bottom sheet on native).

Grouped controls (button group, input group, segmented control) are a v1 signature feature and are marketed on the landing page.

## Foundations

`XenonProvider` (theme, accent, radius), `Surface`, `Divider`, `Stack`, `Group`, `Text`, `Heading`, `Icon`, `VisuallyHidden`.

## Actions

`Button`, `IconButton`, `ButtonGroup`, `Link`, `ToggleButton`.

## Inputs

`Field` (label, help, error), `Input`, `InputGroup`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `SegmentedControl`.

## Navigation

`Tabs`, `Breadcrumb`, `Pagination`, `CommandPalette`.

## Feedback

`Badge`, `Tooltip`, `Toast`, `Progress`, `Spinner`, `Skeleton`, `Alert`.

## Overlays

`Dialog`, `Popover`, `DropdownMenu`, `Sheet`.

## Data display

`Table`, `Accordion`, `Avatar`, `CodeBlock`.

## Later (not v1)

Date picker, calendar, number input, OTP input, file upload, sidebar, navbar, context menu, hover card, stat, charts, data grid, rich-text editor, carousel, tree, stepper.

## Build order (proposed)

1. Tokens, provider, `Surface`, `Divider`, `Text`, `Icon`.
2. `Button`, `IconButton`, `ButtonGroup`, `Input`, `InputGroup`, `Field`.
3. Shared hooks: focus trap, roving focus, positioning, presence.
4. Overlays: `Popover`, `Tooltip`, `Dialog`, `Sheet`, `DropdownMenu`, `Select`, `Combobox`, `CommandPalette`.
5. Remaining inputs, navigation, feedback, data display.
