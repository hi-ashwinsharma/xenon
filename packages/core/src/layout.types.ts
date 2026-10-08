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
