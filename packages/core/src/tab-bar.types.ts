import type { ReactNode } from "react";

export type TabBarVariant = "floating" | "docked";

export interface TabBarProps {
  /** Presentation style: 'floating' (pill island centered above bottom safe area with Liquid Glass, default) or 'docked' (edge-to-edge at viewport bottom) */
  readonly variant?: TabBarVariant;
  readonly ariaLabel?: string;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TabBarItemProps {
  /** Phosphor thin icon */
  readonly icon: ReactNode;
  /** Item title / label */
  readonly label?: ReactNode;
  /** Active state */
  readonly active?: boolean;
  /** Notification badge or dot */
  readonly badge?: ReactNode;
  /** Disabled item state */
  readonly disabled?: boolean;
  readonly onClick?: () => void;
  readonly children?: ReactNode;
  readonly className?: string;
}
