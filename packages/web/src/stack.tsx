import { useMemo, type CSSProperties, type ReactElement } from "react";
import type { FlexAlign, FlexJustify } from "@xenon/core";
import type { WebStackProps } from "./web.types.js";

function mapAlign(align?: FlexAlign): CSSProperties["alignItems"] {
  switch (align) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "stretch":
      return "stretch";
    case "baseline":
      return "baseline";
    default:
      return undefined;
  }
}

function mapJustify(justify?: FlexJustify): CSSProperties["justifyContent"] {
  switch (justify) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return undefined;
  }
}

export function Stack({
  direction = "column",
  gap = 16,
  align,
  justify,
  children,
  className,
  style,
  ...restProps
}: WebStackProps): ReactElement {
  const stackStyle: CSSProperties = useMemo(
    () => ({
      display: "flex",
      flexDirection: direction,
      gap: `${gap}px`,
      alignItems: mapAlign(align),
      justifyContent: mapJustify(justify),
      boxSizing: "border-box",
      ...style,
    }),
    [direction, gap, align, justify, style],
  );

  return (
    <div className={className} style={stackStyle} {...restProps}>
      {children}
    </div>
  );
}
