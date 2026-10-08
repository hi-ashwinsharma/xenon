import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import type {
  ButtonGroupProps as CoreButtonGroupProps,
  ButtonProps as CoreButtonProps,
  DividerProps as CoreDividerProps,
  FieldProps as CoreFieldProps,
  GroupProps as CoreGroupProps,
  HeadingProps as CoreHeadingProps,
  IconButtonProps as CoreIconButtonProps,
  IconProps as CoreIconProps,
  InputGroupProps as CoreInputGroupProps,
  InputProps as CoreInputProps,
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
