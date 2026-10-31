import { type ReactElement } from "react";
import type { WebGridProps } from "./web.types";

export function Grid({
  minItemWidth = 280,
  gap = 16,
  children,
  style,
  ...restProps
}: WebGridProps): ReactElement {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}px), 1fr))`,
        gap: `${gap}px`,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
