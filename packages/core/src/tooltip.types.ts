import type { ReactNode } from "react";
import type { FloatingPlacement } from "./floating";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayMs?: number;
  children: ReactNode;
}

export interface TooltipTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export interface TooltipContentProps {
  placement?: TooltipPlacement;
  offset?: number;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
}
