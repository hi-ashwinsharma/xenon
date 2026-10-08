import type { HTMLAttributes } from "react";
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
