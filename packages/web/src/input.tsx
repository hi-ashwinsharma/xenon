import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type ReactElement,
} from "react";
import {
  CONTROL_HEIGHTS,
  DEFAULT_RADIUS_STOP,
  type RadiusStop,
} from "@xenon/tokens";
import { clampControlRadius } from "@xenon/core";
import { useXenon } from "./provider";
import type { WebInputProps } from "./web.types";

export function Input({
  value: controlledValue,
  defaultValue = "",
  placeholder,
  disabled = false,
  readOnly = false,
  size = "md",
  prefix,
  suffix,
  invalid = false,
  clearable = false,
  onClear,
  onChange,
  className,
  style,
  ...restProps
}: WebInputProps): ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    String(defaultValue),
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const height = CONTROL_HEIGHTS[size];
  const borderRadius = clampControlRadius(height, xenonRadiusStop);
  const baseHorizontalPadding = height / 2;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback((): void => {
    if (!isControlled) {
      setUncontrolledValue("");
    }
    onClear?.();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isControlled, onClear]);

  const containerStyle: CSSProperties = useMemo(() => {
    const borderColor = invalid
      ? "var(--x-danger)"
      : isFocused
        ? "var(--x-accent)"
        : "var(--x-border)";

    return {
      display: "inline-flex",
      alignItems: "center",
      height: `${height}px`,
      width: "100%",
      boxSizing: "border-box",
      borderRadius: `${borderRadius}px`,
      backgroundColor: "var(--x-surface)",
      border: `1px solid ${borderColor}`,
      outline: isFocused ? "2px solid var(--x-accent)" : "none",
      outlineOffset: "2px",
      paddingLeft: prefix ? "12px" : `${baseHorizontalPadding}px`,
      paddingRight: suffix || clearable ? "12px" : `${baseHorizontalPadding}px`,
      gap: "8px",
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition: "border-color 160ms ease",
      ...style,
    };
  }, [
    height,
    borderRadius,
    baseHorizontalPadding,
    invalid,
    isFocused,
    prefix,
    suffix,
    clearable,
    disabled,
    style,
  ]);

  const inputStyle: CSSProperties = {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    fontFamily: "var(--x-font-family)",
    fontSize: size === "sm" ? "0.875rem" : size === "lg" ? "1.0625rem" : "1rem",
    fontWeight: 400,
    color: "var(--x-text)",
    cursor: disabled ? "not-allowed" : "text",
  };

  const showClear = clearable && !disabled && !readOnly && Boolean(value);

  return (
    <div className={className} style={containerStyle}>
      {prefix && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--x-text-muted)",
            flexShrink: 0,
          }}
        >
          {prefix}
        </span>
      )}

      <input
        aria-disabled={disabled ? "true" : undefined}
        aria-invalid={invalid ? "true" : undefined}
        disabled={disabled}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        style={inputStyle}
        type="text"
        value={value}
        {...restProps}
      />

      {showClear && (
        <button
          aria-label="Clear input"
          onClick={handleClear}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "var(--x-text-muted)",
            width: "16px",
            height: "16px",
            lineHeight: 1,
          }}
          type="button"
        >
          ×
        </button>
      )}

      {suffix && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--x-text-muted)",
            flexShrink: 0,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
