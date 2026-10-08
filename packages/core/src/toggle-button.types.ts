import type { ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "./button.types.js";

export interface ToggleButtonProps {
  readonly pressed?: boolean;
  readonly defaultPressed?: boolean;
  readonly onPressedChange?: (pressed: boolean) => void;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
  readonly children?: ReactNode;
  readonly className?: string;
}
