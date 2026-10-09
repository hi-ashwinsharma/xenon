import type { StyleProp, TextStyle, ViewStyle } from "react-native";
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

export interface NativeSegmentedControlProps<T extends string = string>
  extends Omit<CoreSegmentedControlProps<T>, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTextareaProps
  extends Omit<CoreTextareaProps, "className" | "onChange"> {
  readonly style?: StyleProp<ViewStyle>;
  readonly inputStyle?: StyleProp<TextStyle>;
  readonly onChangeText?: (text: string) => void;
}

export interface NativeNavbarProps extends Omit<CoreNavbarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeGlassBarProps
  extends Omit<CoreGlassBarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarProps
  extends Omit<CoreSidebarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarHeaderProps
  extends Omit<CoreSidebarHeaderProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarNavProps
  extends Omit<CoreSidebarNavProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarGroupProps
  extends Omit<CoreSidebarGroupProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarItemProps
  extends Omit<CoreSidebarItemProps, "className" | "onClick"> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeSidebarFooterProps
  extends Omit<CoreSidebarFooterProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabsProps
  extends Omit<CoreTabsProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabsListProps
  extends Omit<CoreTabsListProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabsTriggerProps
  extends Omit<CoreTabsTriggerProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeTabsContentProps
  extends Omit<CoreTabsContentProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabBarProps extends Omit<CoreTabBarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabBarItemProps
  extends Omit<CoreTabBarItemProps, "className" | "onClick"> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeBreadcrumbProps
  extends Omit<CoreBreadcrumbProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeBreadcrumbListProps
  extends Omit<CoreBreadcrumbListProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeBreadcrumbItemProps
  extends Omit<CoreBreadcrumbItemProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeBreadcrumbLinkProps
  extends Omit<CoreBreadcrumbLinkProps, "className" | "onClick"> {
  readonly style?: StyleProp<TextStyle>;
  readonly onPress?: () => void;
}

export interface NativeBreadcrumbPageProps
  extends Omit<CoreBreadcrumbPageProps, "className"> {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeBreadcrumbSeparatorProps
  extends Omit<CoreBreadcrumbSeparatorProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativePaginationProps
  extends Omit<CorePaginationProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

