import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type {
  AlertProps as CoreAlertProps,
  BadgeProps as CoreBadgeProps,
  BreadcrumbItemProps as CoreBreadcrumbItemProps,
  BreadcrumbLinkProps as CoreBreadcrumbLinkProps,
  BreadcrumbListProps as CoreBreadcrumbListProps,
  BreadcrumbPageProps as CoreBreadcrumbPageProps,
  BreadcrumbProps as CoreBreadcrumbProps,
  BreadcrumbSeparatorProps as CoreBreadcrumbSeparatorProps,
  ButtonGroupProps as CoreButtonGroupProps,
  ButtonProps as CoreButtonProps,
  CheckboxProps as CoreCheckboxProps,
  ComboboxOption as CoreComboboxOption,
  ComboboxProps as CoreComboboxProps,
  CommandPaletteItem as CoreCommandPaletteItem,
  CommandPaletteProps as CoreCommandPaletteProps,
  DialogCloseProps as CoreDialogCloseProps,
  DialogContentProps as CoreDialogContentProps,
  DialogDescriptionProps as CoreDialogDescriptionProps,
  DialogFooterProps as CoreDialogFooterProps,
  DialogHeaderProps as CoreDialogHeaderProps,
  DialogProps as CoreDialogProps,
  DialogTitleProps as CoreDialogTitleProps,
  DialogTriggerProps as CoreDialogTriggerProps,
  DividerProps as CoreDividerProps,
  DropdownMenuContentProps as CoreDropdownMenuContentProps,
  DropdownMenuGroupProps as CoreDropdownMenuGroupProps,
  DropdownMenuItemProps as CoreDropdownMenuItemProps,
  DropdownMenuProps as CoreDropdownMenuProps,
  DropdownMenuSeparatorProps as CoreDropdownMenuSeparatorProps,
  DropdownMenuTriggerProps as CoreDropdownMenuTriggerProps,
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
  PopoverCloseProps as CorePopoverCloseProps,
  PopoverContentProps as CorePopoverContentProps,
  PopoverPlacement as CorePopoverPlacement,
  PopoverProps as CorePopoverProps,
  PopoverTriggerProps as CorePopoverTriggerProps,
  ProgressProps as CoreProgressProps,
  RadioGroupProps as CoreRadioGroupProps,
  RadioProps as CoreRadioProps,
  SegmentedControlProps as CoreSegmentedControlProps,
  SelectContentProps as CoreSelectContentProps,
  SelectItemProps as CoreSelectItemProps,
  SelectOption as CoreSelectOption,
  SelectProps as CoreSelectProps,
  SelectSize as CoreSelectSize,
  SelectTriggerProps as CoreSelectTriggerProps,
  SheetCloseProps as CoreSheetCloseProps,
  SheetContentProps as CoreSheetContentProps,
  SheetDescriptionProps as CoreSheetDescriptionProps,
  SheetFooterProps as CoreSheetFooterProps,
  SheetHeaderProps as CoreSheetHeaderProps,
  SheetProps as CoreSheetProps,
  SheetSide as CoreSheetSide,
  SheetTitleProps as CoreSheetTitleProps,
  SheetTriggerProps as CoreSheetTriggerProps,
  SidebarDividerProps as CoreSidebarDividerProps,
  SidebarFooterProps as CoreSidebarFooterProps,
  SidebarGroupProps as CoreSidebarGroupProps,
  SidebarHeaderProps as CoreSidebarHeaderProps,
  SidebarItemProps as CoreSidebarItemProps,
  SidebarNavProps as CoreSidebarNavProps,
  SidebarProps as CoreSidebarProps,
  SkeletonProps as CoreSkeletonProps,
  SliderProps as CoreSliderProps,
  SpinnerProps as CoreSpinnerProps,
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
  ToastProps as CoreToastProps,
  ToastProviderProps as CoreToastProviderProps,
  ToggleButtonProps as CoreToggleButtonProps,
  TooltipContentProps as CoreTooltipContentProps,
  TooltipPlacement as CoreTooltipPlacement,
  TooltipProps as CoreTooltipProps,
  TooltipTriggerProps as CoreTooltipTriggerProps,
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

// --- Overlays ---

export interface WebPopoverProps extends CorePopoverProps {}

export interface WebPopoverTriggerProps
  extends
    Omit<CorePopoverTriggerProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

export interface WebPopoverContentProps
  extends
    Omit<CorePopoverContentProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebPopoverCloseProps
  extends
    Omit<CorePopoverCloseProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

export interface WebTooltipProps extends CoreTooltipProps {}

export interface WebTooltipTriggerProps
  extends
    Omit<CoreTooltipTriggerProps, "children">,
    Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: React.ReactNode;
}

export interface WebTooltipContentProps
  extends
    Omit<CoreTooltipContentProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDialogProps extends CoreDialogProps {}

export interface WebDialogTriggerProps
  extends
    Omit<CoreDialogTriggerProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

export interface WebDialogContentProps
  extends
    Omit<CoreDialogContentProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDialogHeaderProps
  extends
    Omit<CoreDialogHeaderProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDialogTitleProps
  extends
    Omit<CoreDialogTitleProps, "className">,
    Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {}

export interface WebDialogDescriptionProps
  extends
    Omit<CoreDialogDescriptionProps, "className">,
    Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {}

export interface WebDialogFooterProps
  extends
    Omit<CoreDialogFooterProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDialogCloseProps
  extends
    Omit<CoreDialogCloseProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

export interface WebSheetProps extends CoreSheetProps {}

export interface WebSheetTriggerProps
  extends
    Omit<CoreSheetTriggerProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

export interface WebSheetContentProps
  extends
    Omit<CoreSheetContentProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSheetHeaderProps
  extends
    Omit<CoreSheetHeaderProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSheetTitleProps
  extends
    Omit<CoreSheetTitleProps, "className">,
    Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {}

export interface WebSheetDescriptionProps
  extends
    Omit<CoreSheetDescriptionProps, "className">,
    Omit<HTMLAttributes<HTMLParagraphElement>, "children"> {}

export interface WebSheetFooterProps
  extends
    Omit<CoreSheetFooterProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSheetCloseProps
  extends
    Omit<CoreSheetCloseProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

// --- Overlays (Batch 2) ---

export interface WebDropdownMenuProps extends CoreDropdownMenuProps {}

export interface WebDropdownMenuTriggerProps
  extends
    Omit<CoreDropdownMenuTriggerProps, "children">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
}

export interface WebDropdownMenuContentProps
  extends
    Omit<CoreDropdownMenuContentProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDropdownMenuGroupProps
  extends
    Omit<CoreDropdownMenuGroupProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebDropdownMenuItemProps
  extends
    Omit<CoreDropdownMenuItemProps, "className" | "style">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onSelect"> {
  children: React.ReactNode;
}

export interface WebDropdownMenuSeparatorProps
  extends
    Omit<CoreDropdownMenuSeparatorProps, "className" | "style">,
    HTMLAttributes<HTMLHRElement> {}

export interface WebSelectProps
  extends
    Omit<CoreSelectProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children" | "defaultValue"> {}

export interface WebSelectTriggerProps
  extends
    Omit<CoreSelectTriggerProps, "className" | "style">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: React.ReactNode;
}

export interface WebSelectContentProps
  extends
    Omit<CoreSelectContentProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

export interface WebSelectItemProps
  extends
    Omit<CoreSelectItemProps, "className" | "style">,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value"> {
  children: React.ReactNode;
}

export interface WebComboboxProps
  extends
    Omit<CoreComboboxProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children" | "defaultValue"> {}

export interface WebCommandPaletteProps
  extends
    Omit<CoreCommandPaletteProps, "className" | "style">,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {}

// --- Feedback (Batch 1) ---

export interface WebBadgeProps
  extends
    Omit<CoreBadgeProps, "className">,
    HTMLAttributes<HTMLSpanElement> {}

export interface WebAlertProps
  extends
    Omit<CoreAlertProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "title"> {}

export interface WebProgressProps
  extends
    Omit<CoreProgressProps, "className">,
    HTMLAttributes<HTMLDivElement> {}

export interface WebSpinnerProps
  extends
    Omit<CoreSpinnerProps, "className">,
    HTMLAttributes<HTMLSpanElement> {}

export interface WebSkeletonProps
  extends
    Omit<CoreSkeletonProps, "className">,
    HTMLAttributes<HTMLDivElement> {}

export interface WebToastProps
  extends
    Omit<CoreToastProps, "className">,
    Omit<HTMLAttributes<HTMLDivElement>, "title"> {}

export interface WebToastProviderProps extends CoreToastProviderProps {}

export type {
  AlertTone,
  AlertVariant,
  BadgeSize,
  BadgeTone,
  BadgeVariant,
  ComboboxOption,
  CommandPaletteItem,
  DropdownMenuItemProps,
  ProgressSize,
  ProgressTone,
  SelectOption,
  SkeletonVariant,
  SpinnerSize,
  SpinnerTone,
  ToastAction,
  ToastItem,
  ToastOptions,
  ToastPlacement,
  ToastTone,
} from "@xenon/core";
