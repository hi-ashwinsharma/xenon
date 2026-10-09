import type { ReactNode } from "react";
import type { FloatingPlacement } from "./floating";

export type PopoverPlacement = FloatingPlacement;

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface PopoverTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface PopoverContentProps {
  placement?: PopoverPlacement;
  offset?: number;
  width?: number | string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface PopoverCloseProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  triggerRect: { x: number; y: number; width: number; height: number } | null;
  updateTriggerRect: () => void;
}
