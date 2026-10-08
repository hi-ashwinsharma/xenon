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
import { useXenon } from "./provider.js";
import type { WebInputGroupProps } from "./web.types.js";

export function InputGroup({
  size = "md",
  invalid = false,
  disabled = false,
  children,
  className,
  style,
  ...restProps
}: WebInputGroupProps): ReactElement {
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
    return {
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "stretch",
      width: "100%",
      height: `${height}px`,
      borderRadius: `${outerRadius}px`,
      border: `1px solid ${invalid ? "var(--x-danger)" : "var(--x-border)"}`,
      backgroundColor: "var(--x-surface)",
      boxSizing: "border-box",
      overflow: "hidden",
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : undefined,
      ...style,
    };
  }, [height, outerRadius, invalid, disabled, style]);

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
              }>,
              {
                size,
                style: {
                  borderRadius: 0,
                  border: "none",
                  outline: "none",
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
              alignItems: "stretch",
              flex: index === 0 ? 1 : undefined,
              height: "100%",
            }}
          >
            {renderedChild}
            {isNotLast && (
              <span
                aria-hidden="true"
                style={{
                  width: "1px",
                  height: "55%",
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
