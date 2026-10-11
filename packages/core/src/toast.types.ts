import type { ReactNode } from "react";

export type ToastTone =
  "neutral" | "accent" | "success" | "warning" | "danger" | "info";
export type ToastPlacement =
  "bottom-center" | "bottom-end" | "top-center" | "top-end";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  icon?: ReactNode;
  action?: ToastAction;
  durationMs?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  icon?: ReactNode;
  action?: ToastAction;
  durationMs?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: ReactNode;
}

export interface ToastProviderProps {
  placement?: ToastPlacement;
  maxToasts?: number;
  children: ReactNode;
}

export type ToastOptions = Omit<ToastItem, "id">;
