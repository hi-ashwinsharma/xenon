import { useMemo, type CSSProperties, type ReactElement } from "react";
import type { FlexAlign, FlexJustify } from "@xenon/core";
import type { WebGroupProps } from "./web.types";

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
      return "center";
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

export function Group({
  gap = 8,
  align = "center",
  justify,
  wrap = "nowrap",
  children,
  className,
  style,
  ...restProps
}: WebGroupProps): ReactElement {
  const groupStyle: CSSProperties = useMemo(
    () => ({
      display: "flex",
      flexDirection: "row",
      flexWrap: wrap,
      gap: `${gap}px`,
      alignItems: mapAlign(align),
      justifyContent: mapJustify(justify),
      boxSizing: "border-box",
      ...style,
    }),
    [gap, align, justify, wrap, style],
  );

  return (
    <div className={className} style={groupStyle} {...restProps}>
      {children}
    </div>
  );
}
