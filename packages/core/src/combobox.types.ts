import type { ReactNode } from "react";
import type { SelectSize } from "./select.types";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  size?: SelectSize;
  fullWidth?: boolean;
  clearable?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface ComboboxContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  query: string;
  setQuery: (query: string) => void;
  onSelect: (value: string) => void;
  filteredOptions: ComboboxOption[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
