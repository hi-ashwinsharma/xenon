export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerTone = "current" | "accent" | "muted";

export interface SpinnerProps {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  label?: string;
  className?: string;
}
