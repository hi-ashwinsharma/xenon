import type { ReactNode } from "react";
import type { ControlSize } from "@xenon/tokens";

export type IconSize = ControlSize | number;

export interface IconProps {
  readonly size?: IconSize;
  readonly color?: string;
  readonly weight?: "thin";
  readonly ariaLabel?: string;
  readonly ariaHidden?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}
