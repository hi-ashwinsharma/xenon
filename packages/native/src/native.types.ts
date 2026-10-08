import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type {
  ButtonGroupProps as CoreButtonGroupProps,
  ButtonProps as CoreButtonProps,
  CheckboxProps as CoreCheckboxProps,
  DividerProps as CoreDividerProps,
  FieldProps as CoreFieldProps,
  GroupProps as CoreGroupProps,
  HeadingProps as CoreHeadingProps,
  IconButtonProps as CoreIconButtonProps,
  IconProps as CoreIconProps,
  InputGroupProps as CoreInputGroupProps,
  InputProps as CoreInputProps,
  LinkProps as CoreLinkProps,
  RadioGroupProps as CoreRadioGroupProps,
  RadioProps as CoreRadioProps,
  SliderProps as CoreSliderProps,
  StackProps as CoreStackProps,
  SurfaceContextValue as CoreSurfaceContextValue,
  SurfaceProps as CoreSurfaceProps,
  SwitchProps as CoreSwitchProps,
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

export interface NativeInputProps extends Omit<
  CoreInputProps,
  "className" | "onChange"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly inputStyle?: StyleProp<TextStyle>;
  readonly onChangeText?: (text: string) => void;
}

export interface NativeInputGroupProps extends Omit<
  CoreInputGroupProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeFieldProps extends Omit<CoreFieldProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeCheckboxProps extends Omit<
  CoreCheckboxProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeRadioGroupProps extends Omit<
  CoreRadioGroupProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeRadioProps extends Omit<CoreRadioProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSwitchProps extends Omit<CoreSwitchProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSliderProps extends Omit<CoreSliderProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}
