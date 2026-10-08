export type {
  NativeDividerProps,
  NativeGroupProps,
  NativeHeadingProps,
  NativeIconProps,
  NativeRendererConfig,
  NativeStackProps,
  NativeSurfaceContextValue,
  NativeSurfaceProps,
  NativeTextProps,
  NativeVisuallyHiddenProps,
  NativeXenonContextValue,
  NativeXenonProviderProps,
} from "./native.types.js";

export { XenonProvider, useXenon } from "./provider.js";
export { Surface, useSurface } from "./surface.js";
export { Divider } from "./divider.js";
export { Stack } from "./stack.js";
export { Group } from "./group.js";
export { Text } from "./text.js";
export { Heading } from "./heading.js";
export { Icon } from "./icon.js";
export { VisuallyHidden } from "./visually-hidden.js";

export const nativeRendererConfig: {
  readonly platform: "native";
  readonly ready: true;
} = {
  platform: "native",
  ready: true,
} as const;
