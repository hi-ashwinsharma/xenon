import type { MouseEvent, ReactNode } from "react";

export interface LinkProps {
  readonly href: string;
  readonly external?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
