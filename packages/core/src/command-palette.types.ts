import type { ReactNode } from "react";

export interface CommandPaletteItem {
  id: string;
  label: string;
  group?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CommandPaletteItem[];
  placeholder?: string;
  emptyText?: string;
  shortcutKey?: string;
  className?: string;
  children?: ReactNode;
}

export interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  filteredItems: CommandPaletteItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
