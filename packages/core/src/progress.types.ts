export type ProgressSize = "sm" | "md";
export type ProgressTone = "accent" | "neutral" | "success" | "warning" | "danger";

export interface ProgressProps {
  value?: number;
  indeterminate?: boolean;
  size?: ProgressSize;
  tone?: ProgressTone;
  ariaLabel?: string;
  className?: string;
}
