import {
  useCallback,
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
import type { WebToggleButtonProps } from "./web.types";

export function ToggleButton({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant = "subtle",
  size = "md",
  disabled = false,
  ariaLabel,
  children,
  className,
  style,
  onClick,
  ...restProps
}: WebToggleButtonProps): ReactElement {
  const [uncontrolledPressed, setUncontrolledPressed] =
    useState<boolean>(defaultPressed);

  const isPressed = controlledPressed ?? uncontrolledPressed;

  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const height = CONTROL_HEIGHTS[size];
  const horizontalPadding = height / 2;
  const borderRadius = clampControlRadius(height, xenonRadiusStop);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      if (disabled) return;
      const nextPressed = !isPressed;
      setUncontrolledPressed(nextPressed);
      onPressedChange?.(nextPressed);
      onClick?.(e);
    },
    [disabled, isPressed, onPressedChange, onClick],
  );

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
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      outline: "none",
      boxSizing: "border-box",
      userSelect: "none",
      whiteSpace: "nowrap",
      transition:
        "background-color 160ms ease, border-color 160ms ease, transform 100ms var(--x-spring-soft, cubic-bezier(0.16, 1, 0.3, 1)), border-radius var(--x-dur-base) var(--x-ease-standard)",
      ...style,
    };

    if (isPressed) {
      return {
        ...base,
        backgroundColor: "var(--x-surface-2)",
        color: "var(--x-text)",
        border: "1px solid var(--x-accent)",
      };
    }

    switch (variant) {
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
          border: "1px solid transparent",
        };
      case "subtle":
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
    isPressed,
    variant,
    style,
  ]);

  return (
    <button
      aria-disabled={disabled ? "true" : undefined}
      aria-label={ariaLabel}
      aria-pressed={isPressed}
      className={className}
      disabled={disabled}
      onClick={handleClick}
      style={buttonStyle}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
}
