import type { ReactNode } from "react";

export type FlexDirection = "column" | "row" | "column-reverse" | "row-reverse";

export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";

export type FlexJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface StackProps {
  readonly direction?: FlexDirection;
  readonly gap?: number;
  readonly align?: FlexAlign;
  readonly justify?: FlexJustify;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface GroupProps {
  readonly gap?: number;
  readonly align?: FlexAlign;
  readonly justify?: FlexJustify;
  readonly wrap?: FlexWrap;
  readonly children?: ReactNode;
  readonly className?: string;
}

export type ContainerSize = "sm" | "md" | "lg";

export interface ContainerProps {
  /** Maximum content width: 'sm' (prose), 'md' (focused), 'lg' (page). Default: 'lg' */
  readonly size?: ContainerSize;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface GridProps {
  /** Smallest width an item may shrink to before wrapping, in px. Default: 280 */
  readonly minItemWidth?: number;
  /** Fixed column track count for bento layouts; collapses to one column on narrow viewports */
  readonly columns?: number;
  readonly gap?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface GridItemProps {
  /** Tracks this item spans inside a Grid with `columns`. Default: 1 */
  readonly span?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}

export interface ConcentricFieldProps {
  /** Hairline rings around the child. Default: 6 */
  readonly rings?: number;
  /** Distance between rings in px; each ring's radius grows by the same amount. Default: 40 */
  readonly gap?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}
