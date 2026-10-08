import {
  useId,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import type { SwitchSize } from "@xenon/core";
import type { WebSwitchProps } from "./web.types.js";

function getSwitchDimensions(size: SwitchSize = "md"): {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  inset: number;
  travel: number;
  fontSize: string;
  lh: string;
} {
  switch (size) {
    case "sm":
      return {
        trackWidth: 36,
        trackHeight: 20,
        thumbSize: 16,
        inset: 2,
        travel: 16,
        fontSize: "0.8125rem",
        lh: "1.125rem",
      };
    case "lg":
      return {
        trackWidth: 56,
        trackHeight: 32,
        thumbSize: 26,
        inset: 3,
        travel: 24,
        fontSize: "1rem",
        lh: "1.5rem",
      };
    case "md":
    default:
      return {
        trackWidth: 46,
        trackHeight: 26,
        thumbSize: 22,
        inset: 2,
        travel: 20,
        fontSize: "0.875rem",
        lh: "1.25rem",
      };
  }
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label,
  description,
  name,
  value,
  id,
  "aria-label": ariaLabel,
  className,
  style,
  ...restProps
}: WebSwitchProps): ReactElement {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;
  const [isPressed, setIsPressed] = useState(false);

  const { trackWidth, trackHeight, thumbSize, inset, travel, fontSize, lh } =
    getSwitchDimensions(size);

  const handleToggle = (): void => {
    if (disabled) {
      return;
    }
    const nextChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (disabled) {
      return;
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: description ? "flex-start" : "center",
    gap: "10px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    fontFamily: "var(--x-font-family)",
    userSelect: "none",
    ...style,
  };

  const trackStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    width: `${trackWidth}px`,
    height: `${trackHeight}px`,
    borderRadius: "9999px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isChecked ? "var(--x-accent)" : "var(--x-border)",
    backgroundColor: isChecked ? "var(--x-accent)" : "var(--x-surface-2)",
    padding: `${inset}px`,
    boxSizing: "border-box",
    outline: "none",
    transition:
      "background-color var(--x-dur-fast) var(--x-ease-standard), border-color var(--x-dur-fast) var(--x-ease-standard)",
    flexShrink: 0,
    marginTop: description ? "2px" : 0,
  };

  const translateX = isChecked ? travel : 0;
  const thumbStretch = isPressed ? 3 : 0;

  const thumbStyle: CSSProperties = {
    position: "absolute",
    left: `${inset}px`,
    width: `${thumbSize + thumbStretch}px`,
    height: `${thumbSize}px`,
    borderRadius: "9999px",
    backgroundColor: isChecked ? "var(--x-on-accent)" : "var(--x-text)",
    transform: `translateX(${translateX}px)`,
    transition:
      "transform var(--x-dur-base) cubic-bezier(0.2, 0, 0, 1), width var(--x-dur-instant) ease-out, background-color var(--x-dur-fast) var(--x-ease-standard)",
    willChange: "transform, width",
  };

  return (
    <label className={className} style={containerStyle}>
      <button
        aria-checked={isChecked}
        aria-label={typeof label === "string" ? label : ariaLabel}
        disabled={disabled}
        id={switchId}
        name={name}
        onClick={(e) => {
          e.preventDefault();
          handleToggle();
        }}
        onKeyDown={handleKeyDown}
        onMouseDown={() => !disabled && setIsPressed(true)}
        onMouseLeave={() => setIsPressed(false)}
        onMouseUp={() => setIsPressed(false)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchStart={() => !disabled && setIsPressed(true)}
        role="switch"
        style={trackStyle}
        type="button"
        value={value}
        {...restProps}
      >
        <span aria-hidden="true" style={thumbStyle} />
      </button>

      {(label || description) && (
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {label && (
            <span
              style={{
                fontSize,
                lineHeight: lh,
                color: "var(--x-text)",
                fontWeight: 400,
              }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              style={{
                fontSize: "0.75rem",
                lineHeight: "1rem",
                color: "var(--x-text-muted)",
                fontWeight: 300,
              }}
            >
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
