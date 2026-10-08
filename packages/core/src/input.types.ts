import type { ChangeEvent, ReactNode } from "react";
import type { ControlSize } from "@xenon/tokens";

export type InputSize = ControlSize;

export interface InputProps {
  readonly value?: string;
  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly size?: InputSize;
  readonly prefix?: ReactNode;
  readonly suffix?: ReactNode;
  readonly invalid?: boolean;
  readonly clearable?: boolean;
  readonly onClear?: () => void;
  readonly onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly className?: string;
}

export interface InputGroupProps {
  readonly size?: InputSize;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}

export interface FieldProps {
  readonly label?: string;
  readonly helpText?: string;
  readonly error?: string;
  readonly optional?: boolean;
  readonly htmlFor?: string;
  readonly id?: string;
  readonly children: ReactNode;
  readonly className?: string;
}
