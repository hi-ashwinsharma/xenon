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
import { useXenon } from "./provider";
import type { WebInputProps } from "./web.types";

function getArchitecturalRadius(
  size: "sm" | "md" | "lg",
  stop: RadiusStop,
): number {
  if (stop === 0) {
    return 0;
  }
  if (stop === 1) {
    return 4;
  }
  switch (size) {
    case "sm":
      return 6;
    case "lg":
      return 10;
    case "md":
    default:
      return 8;
  }
}

function getHorizontalPadding(size: "sm" | "md" | "lg"): number {
  switch (size) {
    case "sm":
      return 10;
    case "lg":
      return 14;
    case "md":
    default:
      return 12;
  }
}

function getFontSize(size: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return "0.8125rem"; // 13px
    case "lg":
      return "1rem"; // 16px
    case "md":
    default:
      return "0.875rem"; // 14px (Apple HIG subhead standard)
  }
}

export function Input({
  value: controlledValue,
  defaultValue = "",
  placeholder,
  disabled = false,
  readOnly = false,
  size = "md",
  variant = "default",
  shortcutKey,
  surface = "subtle",
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
  const [isClearHovered, setIsClearHovered] = useState<boolean>(false);
  const [isClearPressed, setIsClearPressed] = useState<boolean>(false);
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
  const borderRadius =
    variant === "search"
      ? height / 2
      : getArchitecturalRadius(size, xenonRadiusStop);
  const baseHorizontalPadding = getHorizontalPadding(size);

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

    const bgColor =
      surface === "surface" ? "var(--x-surface)" : "var(--x-surface-2)";

    return {
      display: "inline-flex",
      alignItems: "center",
      height: `${height}px`,
      width: "100%",
      boxSizing: "border-box",
      borderRadius: `${borderRadius}px`,
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      outline: "none",
      paddingLeft: prefix ? "10px" : `${baseHorizontalPadding}px`,
      paddingRight:
        suffix || clearable || shortcutKey
          ? "8px"
          : `${baseHorizontalPadding}px`,
      gap: "8px",
      opacity: disabled ? 0.45 : 1,
      cursor: disabled ? "not-allowed" : "text",
      transition:
        "border-color var(--x-dur-fast) var(--x-ease-standard), background-color var(--x-dur-fast) var(--x-ease-standard), border-radius var(--x-dur-base) var(--x-ease-standard)",
      ...style,
    };
  }, [
    height,
    borderRadius,
    baseHorizontalPadding,
    surface,
    invalid,
    isFocused,
    prefix,
    suffix,
    clearable,
    shortcutKey,
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
    fontSize: getFontSize(size),
    fontWeight: 400,
    color: "var(--x-text)",
    cursor: disabled ? "not-allowed" : "text",
    minWidth: 0,
  };

  const showClear = clearable && !disabled && !readOnly && Boolean(value);
  const showShortcut =
    Boolean(shortcutKey) && !isFocused && !value && !disabled;

  return (
    <div
      className={className}
      onClick={() => inputRef.current?.focus()}
      style={containerStyle}
    >
      {prefix && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: isFocused ? "var(--x-accent)" : "var(--x-text-muted)",
            opacity: isFocused ? 1 : 0.6,
            transform: isFocused ? "scale(1.05)" : "scale(1)",
            transition:
              "opacity var(--x-dur-fast) var(--x-ease-standard), transform var(--x-dur-fast) var(--x-spring-soft, ease), color var(--x-dur-fast) var(--x-ease-standard)",
            flexShrink: 0,
            pointerEvents: "none",
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
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsClearPressed(true);
          }}
          onMouseEnter={() => setIsClearHovered(true)}
          onMouseLeave={() => {
            setIsClearHovered(false);
            setIsClearPressed(false);
          }}
          onMouseUp={() => setIsClearPressed(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: isClearHovered
              ? "var(--x-border-active)"
              : "transparent",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            padding: 0,
            cursor: "pointer",
            color: isClearHovered ? "var(--x-text)" : "var(--x-text-muted)",
            transform: isClearPressed ? "scale(0.88)" : "scale(1)",
            transition:
              "background-color var(--x-dur-instant) ease, transform var(--x-dur-instant) ease, color var(--x-dur-instant) ease",
            flexShrink: 0,
          }}
          type="button"
        >
          <svg
            fill="none"
            height="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            viewBox="0 0 16 16"
            width="12"
          >
            <line x1="4" x2="12" y1="4" y2="12" />
            <line x1="12" x2="4" y1="4" y2="12" />
          </svg>
        </button>
      )}

      {showShortcut && (
        <kbd
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontFamily: "var(--x-font-family-mono, monospace)",
            padding: "2px 5px",
            borderRadius: "4px",
            backgroundColor: "var(--x-surface)",
            border: "1px solid var(--x-border)",
            color: "var(--x-text-muted)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        >
          {shortcutKey}
        </kbd>
      )}

      {suffix && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
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
