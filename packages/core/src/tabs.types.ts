import type { ReactNode } from "react";

export type TabsVariant = "pill" | "underline";

export interface TabsContextValue {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly variant: TabsVariant;
}

export interface TabsProps {
  /** Active indicator style: 'pill' (sliding capsule, default) or 'underline' (minimalist 1px hairline accent indicator) */
  readonly variant?: TabsVariant;
  /** Controlled active tab value */
  readonly value?: string;
  /** Uncontrolled default active tab value */
  readonly defaultValue?: string;
  /** Callback fired when active tab changes */
  readonly onValueChange?: (value: string) => void;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TabsListProps {
  readonly ariaLabel?: string;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TabsTriggerProps {
  /** Unique value matching corresponding TabsContent */
  readonly value: string;
  /** Disabled trigger */
  readonly disabled?: boolean;
  /** Optional Phosphor thin leading icon */
  readonly icon?: ReactNode;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface TabsContentProps {
  /** Value matching corresponding TabsTrigger */
  readonly value: string;
  readonly children?: ReactNode;
  readonly className?: string;
}
