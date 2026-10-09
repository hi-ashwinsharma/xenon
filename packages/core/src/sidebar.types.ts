import type { ReactNode } from "react";

export type SidebarCollapsibleMode = "rail" | "offcanvas" | "none";

export interface SidebarProps {
  /** Whether the sidebar has a background surface. False (default) leaves it background-less on canvas `--x-bg`. */
  readonly hasBackground?: boolean;
  /** Whether to render an uninterrupted 1px vertical hairline separator on the right (default: false). */
  readonly separator?: boolean;
  /** Whether the sidebar is collapsed (default: false). */
  readonly collapsed?: boolean;
  /** Collapse strategy: 'rail' (shrinks to icon-only 56px mode, default) or 'offcanvas' (hides completely). */
  readonly collapsible?: SidebarCollapsibleMode;
  /** Expanded width in pixels (default: 240). */
  readonly width?: number;
  /** Collapsed rail width in pixels (default: 56). */
  readonly collapsedWidth?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface SidebarHeaderProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface SidebarNavProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface SidebarGroupProps {
  /** Optional section heading label in Geist subhead/footnote */
  readonly label?: ReactNode;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface SidebarItemProps {
  /** Phosphor thin icon wrapper */
  readonly icon?: ReactNode;
  /** Item label text */
  readonly label?: ReactNode;
  /** Trailing status badge or counter */
  readonly badge?: ReactNode;
  /** Active state with subtle accent tint */
  readonly active?: boolean;
  /** Disabled item state */
  readonly disabled?: boolean;
  /** Keyboard shortcut hint (e.g. '⌘1') */
  readonly shortcut?: string;
  readonly onClick?: () => void;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface SidebarFooterProps {
  readonly children?: ReactNode;
  readonly className?: string;
}
