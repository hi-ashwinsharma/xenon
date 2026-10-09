import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type {
  BreadcrumbItemProps as CoreBreadcrumbItemProps,
  BreadcrumbLinkProps as CoreBreadcrumbLinkProps,
  BreadcrumbListProps as CoreBreadcrumbListProps,
  BreadcrumbPageProps as CoreBreadcrumbPageProps,
  BreadcrumbProps as CoreBreadcrumbProps,
  BreadcrumbSeparatorProps as CoreBreadcrumbSeparatorProps,
  ButtonGroupProps as CoreButtonGroupProps,
  ButtonProps as CoreButtonProps,
  CheckboxProps as CoreCheckboxProps,
  DividerProps as CoreDividerProps,
  FieldProps as CoreFieldProps,
  GlassBarProps as CoreGlassBarProps,
  GroupProps as CoreGroupProps,
  HeadingProps as CoreHeadingProps,
  IconButtonProps as CoreIconButtonProps,
  IconProps as CoreIconProps,
  InputGroupProps as CoreInputGroupProps,
  InputProps as CoreInputProps,
  LinkProps as CoreLinkProps,
  NavbarProps as CoreNavbarProps,
  PaginationProps as CorePaginationProps,
  RadioGroupProps as CoreRadioGroupProps,
  RadioProps as CoreRadioProps,
  SegmentedControlProps as CoreSegmentedControlProps,
  SidebarDividerProps as CoreSidebarDividerProps,
  SidebarFooterProps as CoreSidebarFooterProps,
  SidebarGroupProps as CoreSidebarGroupProps,
  SidebarHeaderProps as CoreSidebarHeaderProps,
  SidebarItemProps as CoreSidebarItemProps,
  SidebarNavProps as CoreSidebarNavProps,
  SidebarProps as CoreSidebarProps,
  SliderProps as CoreSliderProps,
  StackProps as CoreStackProps,
  SurfaceContextValue as CoreSurfaceContextValue,
  SurfaceProps as CoreSurfaceProps,
  SwitchProps as CoreSwitchProps,
  TabBarItemProps as CoreTabBarItemProps,
  TabBarProps as CoreTabBarProps,
  TabsContentProps as CoreTabsContentProps,
  TabsListProps as CoreTabsListProps,
  TabsProps as CoreTabsProps,
  TabsTriggerProps as CoreTabsTriggerProps,
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

export interface WebNavbarProps
  extends
    Omit<CoreNavbarProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebGlassBarProps
  extends
    Omit<CoreGlassBarProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebSidebarProps
  extends
    Omit<CoreSidebarProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebSidebarHeaderProps
  extends
    Omit<CoreSidebarHeaderProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSidebarNavProps
  extends
    Omit<CoreSidebarNavProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebSidebarDividerProps
  extends
    Omit<CoreSidebarDividerProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSidebarGroupProps
  extends
    Omit<CoreSidebarGroupProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSidebarItemProps
  extends
    Omit<CoreSidebarItemProps, "className" | "onClick">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {}

export interface WebSidebarFooterProps
  extends
    Omit<CoreSidebarFooterProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebTabsProps
  extends
    Omit<CoreTabsProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children" | "defaultValue"> {}

export interface WebTabsListProps
  extends
    Omit<CoreTabsListProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebTabsTriggerProps
  extends
    Omit<CoreTabsTriggerProps, "className">,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "children" | "disabled" | "value"
    > {}

export interface WebTabsContentProps
  extends
    Omit<CoreTabsContentProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebTabBarProps
  extends
    Omit<CoreTabBarProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebTabBarItemProps
  extends
    Omit<CoreTabBarItemProps, "className" | "onClick">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled"> {}

export interface WebBreadcrumbProps
  extends
    Omit<CoreBreadcrumbProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

export interface WebBreadcrumbListProps
  extends
    Omit<CoreBreadcrumbListProps, "className">,
    Omit<HTMLAttributes<HTMLOListElement>, "children"> {}

export interface WebBreadcrumbItemProps
  extends
    Omit<CoreBreadcrumbItemProps, "className">,
    Omit<HTMLAttributes<HTMLLIElement>, "children"> {}

export interface WebBreadcrumbLinkProps
  extends
    Omit<CoreBreadcrumbLinkProps, "className" | "onClick">,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {}

export interface WebBreadcrumbPageProps
  extends
    Omit<CoreBreadcrumbPageProps, "className">,
    Omit<HTMLAttributes<HTMLSpanElement>, "children"> {}

export interface WebBreadcrumbSeparatorProps
  extends
    Omit<CoreBreadcrumbSeparatorProps, "className">,
    Omit<HTMLAttributes<HTMLLIElement>, "children"> {}

export interface WebPaginationProps
  extends
    Omit<CorePaginationProps, "className">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {}

