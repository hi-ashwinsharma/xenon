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
import type { WebIconButtonProps } from "./web.types";

export function IconButton({
  variant = "filled",
  size = "md",
  glassType = "regular",
  loading = false,
  disabled = false,
  ariaLabel,
  children,
  className,
  style,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ...restProps
}: WebIconButtonProps): ReactElement {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const dimension = CONTROL_HEIGHTS[size];
  const borderRadius = clampControlRadius(dimension, xenonRadiusStop);

  const buttonStyle: CSSProperties = useMemo(() => {
    const base: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${dimension}px`,
      height: `${dimension}px`,
      padding: 0,
      borderRadius: `${borderRadius}px`,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transform:
        isPressed && !disabled && !loading ? "scale(0.98)" : "scale(1)",
      transition:
        "transform 100ms var(--x-spring-soft, cubic-bezier(0.16, 1, 0.3, 1)), background-color 160ms ease, border-color 160ms ease",
      outline: "none",
      boxSizing: "border-box",
      userSelect: "none",
      flexShrink: 0,
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
    dimension,
    borderRadius,
    disabled,
    loading,
    isPressed,
    variant,
    glassType,
    style,
  ]);

  return (
    <button
      aria-busy={loading ? "true" : undefined}
      aria-disabled={disabled ? "true" : undefined}
      aria-label={ariaLabel}
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
