import type { ReactNode } from "react";

export interface BreadcrumbProps {
  readonly ariaLabel?: string;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface BreadcrumbListProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface BreadcrumbItemProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface BreadcrumbLinkProps {
  readonly href?: string;
  readonly onClick?: () => void;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface BreadcrumbPageProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface BreadcrumbSeparatorProps {
  /** Custom separator node (defaults to Phosphor Thin CaretRight) */
  readonly children?: ReactNode;
  readonly className?: string;
}
