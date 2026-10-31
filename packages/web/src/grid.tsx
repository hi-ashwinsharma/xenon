"use client";

import { type CSSProperties, type ReactElement } from "react";
import type { WebGridItemProps, WebGridProps } from "./web.types";

const GRID_CSS = `
.x-grid-fixed {
  grid-template-columns: repeat(var(--x-grid-columns), minmax(0, 1fr));
}
.x-grid-item {
  grid-column: span var(--x-grid-span);
  min-width: 0;
}
@media (max-width: 60rem) {
  .x-grid-fixed { grid-template-columns: minmax(0, 1fr); }
  .x-grid-item { grid-column: span 1; }
}
`;

export function Grid({
  minItemWidth = 280,
  columns,
  gap = 16,
  children,
  className,
  style,
  ...restProps
}: WebGridProps): ReactElement {
  const fixed = typeof columns === "number";
  return (
    <div
      className={fixed ? `x-grid-fixed ${className ?? ""}`.trim() : className}
      style={{
        display: "grid",
        gap: `${gap}px`,
        ...(fixed
          ? ({ "--x-grid-columns": columns } as CSSProperties)
          : {
              gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}px), 1fr))`,
            }),
        ...style,
      }}
      {...restProps}
    >
      {fixed && (
        <style href="x-grid" precedence="default">
          {GRID_CSS}
        </style>
      )}
      {children}
    </div>
  );
}

export function GridItem({
  span = 1,
  children,
  className,
  style,
  ...restProps
}: WebGridItemProps): ReactElement {
  return (
    <div
      className={className ? `x-grid-item ${className}` : "x-grid-item"}
      style={{ "--x-grid-span": span, ...style } as CSSProperties}
      {...restProps}
    >
      {children}
    </div>
  );
}
