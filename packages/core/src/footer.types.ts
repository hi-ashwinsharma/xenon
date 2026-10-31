import type { ReactNode } from "react";

export interface FooterLinkItem {
  readonly label: string;
  readonly href: string;
  /** Opens outside the current app */
  readonly external?: boolean;
}

export interface FooterColumnItem {
  readonly title: string;
  readonly links: readonly FooterLinkItem[];
}

export interface FooterProps {
  /** Leading slot: logo and a one-line description */
  readonly brand?: ReactNode;
  readonly columns?: readonly FooterColumnItem[];
  /** Bottom row, start: copyright and legal text */
  readonly legal?: ReactNode;
  /** Bottom row, end: maker credit */
  readonly credit?: ReactNode;
  /** Wraps each link for client-side routers; receives the link and its default content */
  readonly renderLink?: (link: FooterLinkItem, label: ReactNode) => ReactNode;
  readonly className?: string;
}
