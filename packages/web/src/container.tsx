import { type ReactElement } from "react";
import type { ContainerSize } from "@xenon/core";
import type { WebContainerProps } from "./web.types";

const WIDTHS: Readonly<Record<ContainerSize, string>> = {
  sm: "45rem",
  md: "60rem",
  lg: "77.5rem",
};

export function Container({
  size = "lg",
  children,
  style,
  ...restProps
}: WebContainerProps): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: WIDTHS[size],
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "var(--x-space-5)",
        paddingRight: "var(--x-space-5)",
        boxSizing: "border-box",
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
