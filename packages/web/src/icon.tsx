import {
  cloneElement,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { IconSize } from "@xenon/core";
import type { WebIconProps } from "./web.types";

function resolveIconSize(size?: IconSize): number {
  if (typeof size === "number") {
    return size;
  }
  switch (size) {
    case "sm":
      return 16;
    case "lg":
      return 24;
    case "md":
    default:
      return 20;
  }
}

export function Icon({
  size = "md",
  color = "currentColor",
  weight = "thin",
  ariaLabel,
  ariaHidden,
  children,
  className,
  style,
  ...restProps
}: WebIconProps): ReactElement {
  const pixelSize = resolveIconSize(size);
  const isHidden = ariaHidden ?? !ariaLabel;

  const iconWrapperStyle: CSSProperties = useMemo(
    () => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${pixelSize}px`,
      height: `${pixelSize}px`,
      color,
      lineHeight: 1,
      flexShrink: 0,
      ...style,
    }),
    [pixelSize, color, style],
  );

  const renderedChild = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(
        children as ReactElement<{
          size?: number;
          weight?: string;
          color?: string;
        }>,
        {
          size: pixelSize,
          weight: "thin", // Enforce Thin weight strictly
          color,
        },
      );
    }
    return children;
  }, [children, pixelSize, color]);

  return (
    <span
      aria-hidden={isHidden ? "true" : undefined}
      aria-label={ariaLabel}
      className={className}
      role={ariaLabel ? "img" : "presentation"}
      style={iconWrapperStyle}
      {...restProps}
    >
      {renderedChild}
    </span>
  );
}
