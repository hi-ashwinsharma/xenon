import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type {
  ButtonGroupProps as CoreButtonGroupProps,
  ButtonProps as CoreButtonProps,
  DividerProps as CoreDividerProps,
  GroupProps as CoreGroupProps,
  HeadingProps as CoreHeadingProps,
  IconButtonProps as CoreIconButtonProps,
  IconProps as CoreIconProps,
  LinkProps as CoreLinkProps,
  StackProps as CoreStackProps,
  SurfaceContextValue as CoreSurfaceContextValue,
  SurfaceProps as CoreSurfaceProps,
  TextProps as CoreTextProps,
  ToggleButtonProps as CoreToggleButtonProps,
  VisuallyHiddenProps as CoreVisuallyHiddenProps,
  XenonContextValue as CoreXenonContextValue,
  XenonProviderProps as CoreXenonProviderProps,
} from "@xenon/core";

export interface NativeRendererConfig {
  readonly platform: "native";
  readonly ready: boolean;
}

export type NativeXenonContextValue = CoreXenonContextValue;
export type NativeXenonProviderProps = CoreXenonProviderProps;

export type NativeSurfaceContextValue = CoreSurfaceContextValue;

export interface NativeSurfaceProps extends Omit<
  CoreSurfaceProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDividerProps extends Omit<
  CoreDividerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeStackProps extends Omit<CoreStackProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeGroupProps extends Omit<CoreGroupProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTextProps extends Omit<
  CoreTextProps,
  "className" | "as"
> {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeHeadingProps extends Omit<
  CoreHeadingProps,
  "className"
> {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeIconProps extends Omit<CoreIconProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeVisuallyHiddenProps extends Omit<
  CoreVisuallyHiddenProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeButtonProps extends Omit<
  CoreButtonProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeIconButtonProps extends Omit<
  CoreIconButtonProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeButtonGroupProps extends Omit<
  CoreButtonGroupProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeLinkProps extends Omit<
  CoreLinkProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<TextStyle>;
  readonly onPress?: () => void;
}

export interface NativeToggleButtonProps extends Omit<
  CoreToggleButtonProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}
