export type {
  WebDividerProps,
  WebGroupProps,
  WebHeadingProps,
  WebIconProps,
  WebRendererConfig,
  WebStackProps,
  WebSurfaceContextValue,
  WebSurfaceProps,
  WebTextProps,
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

export const webRendererConfig = {
  platform: "web",
  ready: true,
} as const;
