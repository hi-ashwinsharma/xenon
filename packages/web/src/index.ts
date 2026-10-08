export type {
  WebButtonGroupProps,
  WebButtonProps,
  WebCheckboxProps,
  WebDividerProps,
  WebFieldProps,
  WebGroupProps,
  WebHeadingProps,
  WebIconButtonProps,
  WebIconProps,
  WebInputGroupProps,
  WebInputProps,
  WebLinkProps,
  WebRadioGroupProps,
  WebRadioProps,
  WebRendererConfig,
  WebSliderProps,
  WebStackProps,
  WebSurfaceContextValue,
  WebSurfaceProps,
  WebSwitchProps,
  WebTextProps,
  WebToggleButtonProps,
  WebVisuallyHiddenProps,
  WebXenonContextValue,
  WebXenonProviderProps,
} from "./web.types";

export { XenonProvider, useXenon } from "./provider";
export { Surface, useSurface } from "./surface";
export { Divider } from "./divider";
export { Stack } from "./stack";
export { Group } from "./group";
export { Text } from "./text";
export { Heading } from "./heading";
export { Icon } from "./icon";
export { VisuallyHidden } from "./visually-hidden";

export { Button } from "./button";
export { IconButton } from "./icon-button";
export { ButtonGroup } from "./button-group";
export { Link } from "./link";
export { ToggleButton } from "./toggle-button";

export { Input } from "./input";
export { InputGroup } from "./input-group";
export { Field } from "./field";

export { Checkbox } from "./checkbox";
export { RadioGroup, Radio } from "./radio";
export { Switch } from "./switch";
export { Slider } from "./slider";

export const webRendererConfig = {
  platform: "web",
  ready: true,
} as const;
