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
  readonly gap?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}
