import type { ReactNode } from "react";

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface DialogTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface DialogContentProps {
  width?: number | string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface DialogHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface DialogTitleProps {
  className?: string;
  children: ReactNode;
}

export interface DialogDescriptionProps {
  className?: string;
  children: ReactNode;
}

export interface DialogFooterProps {
  className?: string;
  children: ReactNode;
}

export interface DialogCloseProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}
