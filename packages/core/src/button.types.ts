import type { MouseEvent, ReactNode } from "react";
import type { ControlSize, LiquidGlassVariant } from "@xenon/tokens";

export type ButtonVariant =
  "accent" | "filled" | "subtle" | "outline" | "ghost" | "glass";

export type ButtonSize = ControlSize;

export interface ButtonProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly glassType?: LiquidGlassVariant;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface IconButtonProps extends Omit<
  ButtonProps,
  "children" | "fullWidth"
> {
  readonly ariaLabel: string;
  readonly children: ReactNode;
}

export interface ButtonGroupProps {
  readonly size?: ButtonSize;
  readonly variant?: ButtonVariant;
  readonly disabled?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}
