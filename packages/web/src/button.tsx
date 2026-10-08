import {
  useMemo,
  useState,
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
import type { WebButtonProps } from "./web.types";

export function Button({
  variant = "filled",
  size = "md",
  glassType = "regular",
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  className,
  style,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...restProps
}: WebButtonProps): ReactElement {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const height = CONTROL_HEIGHTS[size];
  const horizontalPadding = height / 2; // Optical padding rule: horizontal >= height / 2
  const borderRadius = clampControlRadius(height, xenonRadiusStop);

  const buttonStyle: CSSProperties = useMemo(() => {
    const base: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: `${height}px`,
      paddingLeft: `${horizontalPadding}px`,
      paddingRight: `${horizontalPadding}px`,
      borderRadius: `${borderRadius}px`,
      fontFamily: "var(--x-font-family)",
      fontSize:
        size === "sm" ? "0.875rem" : size === "lg" ? "1.0625rem" : "1rem",
      fontWeight: 400,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transform:
        isPressed && !disabled && !loading ? "scale(0.98)" : "scale(1)",
      transition:
        "transform 100ms var(--x-spring-soft, cubic-bezier(0.16, 1, 0.3, 1)), background-color 160ms ease, border-color 160ms ease",
      outline: "none",
      boxSizing: "border-box",
      userSelect: "none",
      whiteSpace: "nowrap",
      width: fullWidth ? "100%" : undefined,
      ...style,
    };

    switch (variant) {
      case "accent":
        return {
          ...base,
          backgroundColor: "var(--x-accent)",
          color: "var(--x-on-accent)",
          border: "none",
        };
      case "subtle":
        return {
          ...base,
          backgroundColor: "var(--x-surface-2)",
          color: "var(--x-text)",
          border: "1px solid var(--x-border)",
        };
      case "outline":
        return {
          ...base,
          backgroundColor: "transparent",
          color: "var(--x-text)",
          border: "1px solid var(--x-border)",
        };
      case "ghost":
        return {
          ...base,
          backgroundColor: "transparent",
          color: "var(--x-text)",
          border: "none",
        };
      case "glass": {
        const isClear = glassType === "clear";
        return {
          ...base,
          backgroundColor: isClear
            ? "var(--x-glass-clear-bg)"
            : "var(--x-glass-regular-bg)",
          backdropFilter: isClear
            ? "blur(var(--x-glass-clear-blur))"
            : "blur(var(--x-glass-regular-blur))",
          WebkitBackdropFilter: isClear
            ? "blur(var(--x-glass-clear-blur))"
            : "blur(var(--x-glass-regular-blur))",
          color: "var(--x-text)",
          border: "1px solid var(--x-border)",
        };
      }
      case "filled":
      default:
        return {
          ...base,
          backgroundColor: "var(--x-surface)",
          color: "var(--x-text)",
          border: "1px solid var(--x-border)",
        };
    }
  }, [
    height,
    horizontalPadding,
    borderRadius,
    size,
    disabled,
    loading,
    isPressed,
    fullWidth,
    variant,
    glassType,
    style,
  ]);

  return (
    <button
      aria-busy={loading ? "true" : undefined}
      aria-disabled={disabled ? "true" : undefined}
      className={className}
      disabled={disabled}
      onMouseDown={(e) => {
        setIsPressed(true);
        onMouseDown?.(e);
      }}
      onMouseLeave={(e) => {
        setIsPressed(false);
        onMouseLeave?.(e);
      }}
      onMouseUp={(e) => {
        setIsPressed(false);
        onMouseUp?.(e);
      }}
      style={buttonStyle}
      type="button"
      {...restProps}
    >
      {loading ? (
        <span
          style={{
            display: "inline-block",
            width: "14px",
            height: "14px",
            border: "1.5px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      ) : (
        children
      )}
    </button>
  );
}
