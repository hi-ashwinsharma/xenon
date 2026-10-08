import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type {
  DividerProps as CoreDividerProps,
  GroupProps as CoreGroupProps,
  HeadingProps as CoreHeadingProps,
  IconProps as CoreIconProps,
  StackProps as CoreStackProps,
  SurfaceContextValue as CoreSurfaceContextValue,
  SurfaceProps as CoreSurfaceProps,
  TextProps as CoreTextProps,
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
