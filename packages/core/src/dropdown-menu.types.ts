import type { ReactNode } from "react";
import type { FloatingPlacement } from "./floating";

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openOnHover?: boolean;
  hoverDelayMs?: number;
  children: ReactNode;
}

export interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface DropdownMenuContentProps {
  placement?: FloatingPlacement;
  offset?: number;
  width?: number | string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuGroupProps {
  label?: string;
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuItemProps {
  disabled?: boolean;
  destructive?: boolean;
  icon?: ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  className?: string;
  children: ReactNode;
}

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openOnHover?: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerItem: (id: string, disabled: boolean) => () => void;
}
