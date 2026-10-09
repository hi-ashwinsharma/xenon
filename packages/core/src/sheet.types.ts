import type { ReactNode } from "react";

export type SheetSide = "bottom" | "right" | "left" | "top";

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface SheetTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface SheetContentProps {
  side?: SheetSide;
  ariaLabel?: string;
  hasGrabHandle?: boolean;
  className?: string;
  children: ReactNode;
}

export interface SheetHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface SheetTitleProps {
  className?: string;
  children: ReactNode;
}

export interface SheetDescriptionProps {
  className?: string;
  children: ReactNode;
}

export interface SheetFooterProps {
  className?: string;
  children: ReactNode;
}

export interface SheetCloseProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}
