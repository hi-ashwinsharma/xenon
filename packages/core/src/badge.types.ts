import type { ReactNode } from "react";

export type BadgeVariant = "subtle" | "outline" | "accent" | "dot";
export type BadgeTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
  count?: number;
  maxCount?: number;
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}
