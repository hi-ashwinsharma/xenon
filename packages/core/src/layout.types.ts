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

export interface ChapterProps {
  /** Chapter headline */
  readonly title: ReactNode;
  /** One or two sentences under the headline */
  readonly lead?: ReactNode;
  /** The chapter's single visual or interactive demo */
  readonly visual?: ReactNode;
  /** Places the visual before the copy on wide viewports (default: false) */
  readonly reverse?: boolean;
  readonly className?: string;
}

export interface ScrollSceneProps {
  /** Scroll distance the scene stays pinned for, in viewport heights. Default: 3 */
  readonly length?: number;
  /** Progress shown when the scene cannot scrub, such as under reduced motion. Default: 1 */
  readonly restingProgress?: number;
  /**
   * The pinned frame. A function re-renders from progress between 0 and 1. Plain
   * nodes do not re-render and read progress from the `--x-scroll` CSS variable.
   */
  readonly children: ReactNode | ((progress: number) => ReactNode);
  readonly className?: string;
}
