import type { ReactNode } from "react";

export type AlertTone = "info" | "success" | "warning" | "danger" | "neutral";
export type AlertVariant = "subtle" | "surface" | "outline";

export interface AlertProps {
  tone?: AlertTone;
  variant?: AlertVariant;
  title?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  dismissible?: boolean;
  className?: string;
  children?: ReactNode;
}
