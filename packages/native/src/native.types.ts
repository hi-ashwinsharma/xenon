import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type {
  AccordionContentProps as CoreAccordionContentProps,
  AccordionItemProps as CoreAccordionItemProps,
  AccordionProps as CoreAccordionProps,
  AccordionTriggerProps as CoreAccordionTriggerProps,
  AccordionType as CoreAccordionType,
  AccordionVariant as CoreAccordionVariant,
  AlertProps as CoreAlertProps,
  AvatarGroupProps as CoreAvatarGroupProps,
  AvatarProps as CoreAvatarProps,
  AvatarShape as CoreAvatarShape,
  AvatarSize as CoreAvatarSize,
  AvatarStatus as CoreAvatarStatus,
  AvatarStatusPlacement as CoreAvatarStatusPlacement,
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
  CodeBlockProps as CoreCodeBlockProps,
  CodeBlockVariant as CoreCodeBlockVariant,
  CodeToken as CoreCodeToken,
  CodeTokenType as CoreCodeTokenType,
  ComboboxOption as CoreComboboxOption,
  ComboboxProps as CoreComboboxProps,
  CommandPaletteItem as CoreCommandPaletteItem,
  CommandPaletteProps as CoreCommandPaletteProps,
  DataTableColumn as CoreDataTableColumn,
  DataTableProps as CoreDataTableProps,
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
  AccentPickerProps as CoreAccentPickerProps,
  ContainerProps as CoreContainerProps,
  FooterProps as CoreFooterProps,
  GridProps as CoreGridProps,
  GroupProps as CoreGroupProps,
  RevealProps as CoreRevealProps,
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
  TableAlign as CoreTableAlign,
  TableBodyProps as CoreTableBodyProps,
  TableCaptionProps as CoreTableCaptionProps,
  TableCellProps as CoreTableCellProps,
  TableFooterProps as CoreTableFooterProps,
  TableHeadProps as CoreTableHeadProps,
  TableHeaderProps as CoreTableHeaderProps,
  TableProps as CoreTableProps,
  TableRowProps as CoreTableRowProps,
  TableSize as CoreTableSize,
  TableVariant as CoreTableVariant,
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

export interface NativeContainerProps extends Omit<
  CoreContainerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeGridProps extends Omit<CoreGridProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeRevealProps extends Omit<CoreRevealProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeFooterProps extends Omit<CoreFooterProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeAccentPickerProps extends Omit<
  CoreAccentPickerProps,
  "className"
> {
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

export interface NativeSegmentedControlProps<
  T extends string = string,
> extends Omit<CoreSegmentedControlProps<T>, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTextareaProps extends Omit<
  CoreTextareaProps,
  "className" | "onChange"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly inputStyle?: StyleProp<TextStyle>;
  readonly onChangeText?: (text: string) => void;
}

export interface NativeNavbarProps extends Omit<CoreNavbarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeGlassBarProps extends Omit<
  CoreGlassBarProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarProps extends Omit<
  CoreSidebarProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarHeaderProps extends Omit<
  CoreSidebarHeaderProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarNavProps extends Omit<
  CoreSidebarNavProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarDividerProps extends Omit<
  CoreSidebarDividerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarGroupProps extends Omit<
  CoreSidebarGroupProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSidebarItemProps extends Omit<
  CoreSidebarItemProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeSidebarFooterProps extends Omit<
  CoreSidebarFooterProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabsProps extends Omit<CoreTabsProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabsListProps extends Omit<
  CoreTabsListProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabsTriggerProps extends Omit<
  CoreTabsTriggerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeTabsContentProps extends Omit<
  CoreTabsContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabBarProps extends Omit<CoreTabBarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTabBarItemProps extends Omit<
  CoreTabBarItemProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeBreadcrumbProps extends Omit<
  CoreBreadcrumbProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeBreadcrumbListProps extends Omit<
  CoreBreadcrumbListProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeBreadcrumbItemProps extends Omit<
  CoreBreadcrumbItemProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeBreadcrumbLinkProps extends Omit<
  CoreBreadcrumbLinkProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<TextStyle>;
  readonly onPress?: () => void;
}

export interface NativeBreadcrumbPageProps extends Omit<
  CoreBreadcrumbPageProps,
  "className"
> {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeBreadcrumbSeparatorProps extends Omit<
  CoreBreadcrumbSeparatorProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativePaginationProps extends Omit<
  CorePaginationProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

// --- Overlays ---

export interface NativePopoverProps extends CorePopoverProps {}

export interface NativePopoverTriggerProps extends CorePopoverTriggerProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativePopoverContentProps extends Omit<
  CorePopoverContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativePopoverCloseProps extends CorePopoverCloseProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTooltipProps extends CoreTooltipProps {}

export interface NativeTooltipTriggerProps extends CoreTooltipTriggerProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTooltipContentProps extends Omit<
  CoreTooltipContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDialogProps extends CoreDialogProps {}

export interface NativeDialogTriggerProps extends CoreDialogTriggerProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDialogContentProps extends Omit<
  CoreDialogContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDialogHeaderProps extends CoreDialogHeaderProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDialogTitleProps extends CoreDialogTitleProps {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeDialogDescriptionProps extends CoreDialogDescriptionProps {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeDialogFooterProps extends CoreDialogFooterProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDialogCloseProps extends CoreDialogCloseProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSheetProps extends CoreSheetProps {}

export interface NativeSheetTriggerProps extends CoreSheetTriggerProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSheetContentProps extends Omit<
  CoreSheetContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSheetHeaderProps extends CoreSheetHeaderProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSheetTitleProps extends CoreSheetTitleProps {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeSheetDescriptionProps extends CoreSheetDescriptionProps {
  readonly style?: StyleProp<TextStyle>;
}

export interface NativeSheetFooterProps extends CoreSheetFooterProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSheetCloseProps extends CoreSheetCloseProps {
  readonly style?: StyleProp<ViewStyle>;
}

// --- Overlays (Batch 2) ---

export interface NativeDropdownMenuProps extends CoreDropdownMenuProps {}

export interface NativeDropdownMenuTriggerProps extends CoreDropdownMenuTriggerProps {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDropdownMenuContentProps extends Omit<
  CoreDropdownMenuContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDropdownMenuGroupProps extends Omit<
  CoreDropdownMenuGroupProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDropdownMenuItemProps extends Omit<
  CoreDropdownMenuItemProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeDropdownMenuSeparatorProps extends Omit<
  CoreDropdownMenuSeparatorProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSelectProps extends Omit<CoreSelectProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSelectTriggerProps extends Omit<
  CoreSelectTriggerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSelectContentProps extends Omit<
  CoreSelectContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSelectItemProps extends Omit<
  CoreSelectItemProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeComboboxProps extends Omit<
  CoreComboboxProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeCommandPaletteProps extends Omit<
  CoreCommandPaletteProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

// --- Feedback (Batch 1) ---

export interface NativeBadgeProps extends Omit<CoreBadgeProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

export interface NativeAlertProps extends Omit<CoreAlertProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeProgressProps extends Omit<
  CoreProgressProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSpinnerProps extends Omit<
  CoreSpinnerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeSkeletonProps extends Omit<
  CoreSkeletonProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeToastProps extends Omit<CoreToastProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeToastProviderProps extends CoreToastProviderProps {}

// --- Data Display (Batch 2) ---

export interface NativeTableProps extends Omit<CoreTableProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTableHeaderProps extends Omit<
  CoreTableHeaderProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTableBodyProps extends Omit<
  CoreTableBodyProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTableFooterProps extends Omit<
  CoreTableFooterProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeTableRowProps extends Omit<
  CoreTableRowProps,
  "className" | "onClick"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly onPress?: () => void;
}

export interface NativeTableHeadProps extends Omit<
  CoreTableHeadProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

export interface NativeTableCellProps extends Omit<
  CoreTableCellProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

export interface NativeTableCaptionProps extends Omit<
  CoreTableCaptionProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

export interface NativeDataTableProps<T> extends Omit<
  CoreDataTableProps<T>,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeAccordionProps extends Omit<
  CoreAccordionProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeAccordionItemProps extends Omit<
  CoreAccordionItemProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeAccordionTriggerProps extends Omit<
  CoreAccordionTriggerProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

export interface NativeAccordionContentProps extends Omit<
  CoreAccordionContentProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeAvatarProps extends Omit<CoreAvatarProps, "className"> {
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

export interface NativeAvatarGroupProps extends Omit<
  CoreAvatarGroupProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export interface NativeCodeBlockProps extends Omit<
  CoreCodeBlockProps,
  "className"
> {
  readonly style?: StyleProp<ViewStyle>;
}

export type {
  AccordionType,
  AccordionVariant,
  AlertTone,
  AlertVariant,
  AvatarShape,
  AvatarSize,
  AvatarStatus,
  AvatarStatusPlacement,
  BadgeSize,
  BadgeTone,
  BadgeVariant,
  CodeBlockVariant,
  CodeToken,
  CodeTokenType,
  ComboboxOption,
  CommandPaletteItem,
  DataTableColumn,
  ProgressSize,
  ProgressTone,
  SkeletonVariant,
  SpinnerSize,
  SpinnerTone,
  TableAlign,
  TableSize,
  TableVariant,
  ToastAction,
  ToastItem,
  ToastOptions,
  ToastPlacement,
  ToastTone,
} from "@xenon/core";
