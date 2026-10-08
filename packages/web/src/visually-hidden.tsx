import { type CSSProperties, type ReactElement } from "react";
import type { WebVisuallyHiddenProps } from "./web.types.js";

const visuallyHiddenStyle: CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function VisuallyHidden({
  children,
  className,
  style,
  ...restProps
}: WebVisuallyHiddenProps): ReactElement {
  return (
    <span
      className={className}
      style={{ ...visuallyHiddenStyle, ...style }}
      {...restProps}
    >
      {children}
    </span>
  );
}
