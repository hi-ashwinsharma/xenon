import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
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
  SegmentedControlProps as CoreSegmentedControlProps,
  SliderProps as CoreSliderProps,
  StackProps as CoreStackProps,
  SurfaceContextValue as CoreSurfaceContextValue,
  SurfaceProps as CoreSurfaceProps,
  SwitchProps as CoreSwitchProps,
  TextareaProps as CoreTextareaProps,
  TextProps as CoreTextProps,
  ToggleButtonProps as CoreToggleButtonProps,
  VisuallyHiddenProps as CoreVisuallyHiddenProps,
  XenonContextValue as CoreXenonContextValue,
  XenonProviderProps as CoreXenonProviderProps,
} from "@xenon/core";

export interface WebRendererConfig {
  readonly platform: "web";
  readonly ready: boolean;
}

export type WebXenonContextValue = CoreXenonContextValue;
export type WebXenonProviderProps = CoreXenonProviderProps;

export type WebSurfaceContextValue = CoreSurfaceContextValue;
export interface WebSurfaceProps
  extends
    Omit<CoreSurfaceProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDividerProps
  extends
    Omit<CoreDividerProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebStackProps
  extends
    Omit<CoreStackProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebGroupProps
  extends
    Omit<CoreGroupProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebTextProps
  extends
    Omit<CoreTextProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebHeadingProps
  extends
    Omit<CoreHeadingProps, "className">,
    Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {}

export interface WebIconProps
  extends
    Omit<CoreIconProps, "className">,
    Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color"> {}

export interface WebVisuallyHiddenProps
  extends
    Omit<CoreVisuallyHiddenProps, "className">,
    Omit<HTMLAttributes<HTMLSpanElement>, "children"> {}

export interface WebButtonProps
  extends
    Omit<CoreButtonProps, "className" | "onClick">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {}

export interface WebIconButtonProps
  extends
    Omit<CoreIconButtonProps, "className" | "onClick">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {}

export interface WebButtonGroupProps
  extends
    Omit<CoreButtonGroupProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebLinkProps
  extends
    Omit<CoreLinkProps, "className" | "onClick">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {}

export interface WebToggleButtonProps
  extends
    Omit<CoreToggleButtonProps, "className">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {}

export interface WebInputProps
  extends
    Omit<CoreInputProps, "className" | "onChange">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | "children"
      | "size"
      | "prefix"
      | "disabled"
      | "readOnly"
      | "value"
      | "defaultValue"
      | "placeholder"
    > {}

export interface WebInputGroupProps
  extends
    Omit<CoreInputGroupProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebFieldProps
  extends
    Omit<CoreFieldProps, "className" | "id">,
    Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> {}

export interface WebCheckboxProps
  extends
    Omit<CoreCheckboxProps, "className">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      | "children"
      | "size"
      | "checked"
      | "defaultChecked"
      | "disabled"
      | "value"
      | "name"
      | "id"
      | "onChange"
    > {}

export interface WebRadioGroupProps
  extends
    Omit<CoreRadioGroupProps, "className">,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      "children" | "defaultValue" | "onChange"
    > {}

export interface WebRadioProps
  extends
    Omit<CoreRadioProps, "className">,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "children" | "size" | "disabled" | "value" | "name" | "id" | "onChange"
    > {}

export interface WebSwitchProps
  extends
    Omit<CoreSwitchProps, "className">,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | "children"
      | "size"
      | "disabled"
      | "value"
      | "name"
      | "id"
      | "onChange"
      | "onClick"
    > {}

export interface WebSliderProps
  extends
    Omit<CoreSliderProps, "className">,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      "children" | "defaultValue" | "onChange"
    > {}

export interface WebSegmentedControlProps<T extends string = string>
  extends
    Omit<CoreSegmentedControlProps<T>, "className" | "aria-label">,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      "children" | "defaultValue" | "onChange"
    > {}

export interface WebTextareaProps
  extends
    Omit<CoreTextareaProps, "className" | "onChange">,
    Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      | "children"
      | "value"
      | "defaultValue"
      | "placeholder"
      | "disabled"
      | "readOnly"
      | "maxLength"
    > {}
