import type { ReactNode } from "react";
import type { ControlSize } from "@xenon/tokens";

export type SegmentedControlSize = ControlSize;

export interface SegmentedControlOption<T extends string = string> {
  readonly value: T;
  readonly label: ReactNode;
  readonly icon?: ReactNode;
  readonly disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  readonly options: readonly SegmentedControlOption<T>[];
  readonly value?: T;
  readonly defaultValue?: T;
  readonly onValueChange?: (value: T) => void;
  readonly size?: SegmentedControlSize;
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly "aria-label"?: string;
  readonly className?: string;
}
