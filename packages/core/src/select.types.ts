import type { ReactNode } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options?: SelectOption[];
  disabled?: boolean;
  size?: SelectSize;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface SelectTriggerProps {
  placeholder?: string;
  className?: string;
  children?: ReactNode;
}

export interface SelectContentProps {
  className?: string;
  children?: ReactNode;
}

export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  onSelect: (value: string) => void;
  size: SelectSize;
  disabled: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLElement | null>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  registerItem: (value: string, label: string, disabled: boolean) => () => void;
  items: Array<{ value: string; label: string; disabled: boolean }>;
}
