import { useMemo, type CSSProperties, type ReactElement } from "react";
import { useSurface } from "./surface";
import type { WebDividerProps } from "./web.types";

export function Divider({
  orientation = "horizontal",
  inset = false,
  decorative = true,
  className,
  style,
  ...restProps
}: WebDividerProps): ReactElement {
  const surface = useSurface();

  const insetPx: number = useMemo(() => {
    if (typeof inset === "number") {
      return inset;
    }
    if (inset === true) {
      return surface ? surface.padding : 24;
    }
    return 0;
  }, [inset, surface]);

  const dividerStyle: CSSProperties = useMemo(() => {
    const isHorizontal = orientation === "horizontal";
    const base: CSSProperties = {
      boxSizing: "border-box",
      flexShrink: 0,
      backgroundColor: "var(--x-border)",
      ...style,
    };

    if (isHorizontal) {
      return {
        ...base,
        height: "1px",
        width: insetPx > 0 ? `calc(100% - ${insetPx * 2}px)` : "100%",
        marginLeft: insetPx > 0 ? `${insetPx}px` : undefined,
        marginRight: insetPx > 0 ? `${insetPx}px` : undefined,
      };
    }

    return {
      ...base,
      width: "1px",
      height: insetPx > 0 ? `calc(100% - ${insetPx * 2}px)` : "100%",
      marginTop: insetPx > 0 ? `${insetPx}px` : undefined,
      marginBottom: insetPx > 0 ? `${insetPx}px` : undefined,
    };
  }, [orientation, insetPx, style]);

  return (
    <div
      aria-hidden={decorative ? "true" : undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={className}
      role={decorative ? "presentation" : "separator"}
      style={dividerStyle}
      {...restProps}
    />
  );
}
