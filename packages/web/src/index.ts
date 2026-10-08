export type {
  WebButtonGroupProps,
  WebButtonProps,
  WebDividerProps,
  WebFieldProps,
  WebGroupProps,
  WebHeadingProps,
  WebIconButtonProps,
  WebIconProps,
  WebInputGroupProps,
  WebInputProps,
  WebLinkProps,
  WebRendererConfig,
  WebStackProps,
  WebSurfaceContextValue,
  WebSurfaceProps,
  WebTextProps,
  WebToggleButtonProps,
  WebVisuallyHiddenProps,
  WebXenonContextValue,
  WebXenonProviderProps,
} from "./web.types.js";

export { XenonProvider, useXenon } from "./provider.js";
export { Surface, useSurface } from "./surface.js";
export { Divider } from "./divider.js";
export { Stack } from "./stack.js";
export { Group } from "./group.js";
export { Text } from "./text.js";
export { Heading } from "./heading.js";
export { Icon } from "./icon.js";
export { VisuallyHidden } from "./visually-hidden.js";

export { Button } from "./button.js";
export { IconButton } from "./icon-button.js";
export { ButtonGroup } from "./button-group.js";
export { Link } from "./link.js";
export { ToggleButton } from "./toggle-button.js";

export { Input } from "./input.js";
export { InputGroup } from "./input-group.js";
export { Field } from "./field.js";

export const webRendererConfig = {
  platform: "web",
  ready: true,
} as const;
