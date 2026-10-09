import type { ReactNode } from "react";

export type SidebarCollapsibleMode = "rail" | "offcanvas" | "none";
export type SidebarVariant = "floating" | "docked";

export interface SidebarProps {
  /** Presentation style: 'floating' (detached island with rounded geometry and insets, default) or 'docked' (edge-to-edge flush). */
  readonly variant?: SidebarVariant;
  /** Whether the sidebar has an outer border. Default is false (zero outer border). */
  readonly bordered?: boolean;
  /** Whether the sidebar has a background surface. False (default) leaves it background-less on canvas `--x-bg`. */
  readonly hasBackground?: boolean;
  /** Whether to render an uninterrupted vertical separator on the right (default: false). */
  readonly separator?: boolean;
  /** Whether to enable Liquid Glass backdrop blur (default: false). */
  readonly glass?: boolean;
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

export interface SidebarDividerProps {
  /** Inset padding in pixels from the left and right edges (default: 12). */
  readonly inset?: number;
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
