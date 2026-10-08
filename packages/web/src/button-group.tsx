import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
} from "react";
import {
  CONTROL_HEIGHTS,
  DEFAULT_RADIUS_STOP,
  type RadiusStop,
} from "@xenon/tokens";
import { clampControlRadius } from "@xenon/core";
import { useXenon } from "./provider";
import type { WebButtonGroupProps } from "./web.types";

export function ButtonGroup({
  size = "md",
  variant = "filled",
  disabled = false,
  children,
  className,
  style,
  ...restProps
}: WebButtonGroupProps): ReactElement {
  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const height = CONTROL_HEIGHTS[size];
  const outerRadius = clampControlRadius(height, xenonRadiusStop);

  const containerStyle: CSSProperties = useMemo(() => {
    const base: CSSProperties = {
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "stretch",
      height: `${height}px`,
      borderRadius: `${outerRadius}px`,
      border: "1px solid var(--x-border)",
      boxSizing: "border-box",
      overflow: "hidden",
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : undefined,
      userSelect: "none",
      ...style,
    };

    switch (variant) {
      case "subtle":
        return {
          ...base,
          backgroundColor: "var(--x-surface-2)",
        };
      case "outline":
      case "ghost":
        return {
          ...base,
          backgroundColor: "transparent",
        };
      case "filled":
      default:
        return {
          ...base,
          backgroundColor: "var(--x-surface)",
        };
    }
  }, [height, outerRadius, disabled, variant, style]);

  const childArray = Children.toArray(children).filter(Boolean);

  return (
    <div
      aria-disabled={disabled ? "true" : undefined}
      className={className}
      role="group"
      style={containerStyle}
      {...restProps}
    >
      {childArray.map((child, index) => {
        const isNotLast = index < childArray.length - 1;

        const renderedChild = isValidElement(child)
          ? cloneElement(
              child as ReactElement<{
                style?: CSSProperties;
                size?: typeof size;
                variant?: typeof variant;
              }>,
              {
                size,
                variant: "ghost", // flush interior within group container
                style: {
                  borderRadius: 0,
                  border: "none",
                  height: "100%",
                },
              },
            )
          : child;

        return (
          <span
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {renderedChild}
            {isNotLast && (
              <span
                aria-hidden="true"
                style={{
                  width: "1px",
                  height: "55%", // Apple-grade inset hairline separator
                  backgroundColor: "var(--x-border)",
                  alignSelf: "center",
                  flexShrink: 0,
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
