import {
  useId,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type ReactElement,
} from "react";
import type { CheckboxSize } from "@xenon/core";
import type { WebCheckboxProps } from "./web.types";

function getDimensions(size: CheckboxSize = "md"): {
  boxSize: number;
  radius: number;
  iconSize: number;
  fontSize: string;
  lh: string;
} {
  switch (size) {
    case "sm":
      return {
        boxSize: 16,
        radius: 3,
        iconSize: 12,
        fontSize: "0.8125rem",
        lh: "1.125rem",
      };
    case "lg":
      return {
        boxSize: 24,
        radius: 5,
        iconSize: 16,
        fontSize: "1rem",
        lh: "1.5rem",
      };
    case "md":
    default:
      return {
        boxSize: 20,
        radius: 4,
        iconSize: 14,
        fontSize: "0.875rem",
        lh: "1.25rem",
      };
  }
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  indeterminate = false,
  disabled = false,
  error = false,
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
}: WebCheckboxProps): ReactElement {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const { boxSize, radius, iconSize, fontSize, lh } = getDimensions(size);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (disabled) {
      return;
    }
    const nextChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: description ? "flex-start" : "center",
    gap: "10px",
    position: "relative",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    fontFamily: "var(--x-font-family)",
    userSelect: "none",
    ...style,
  };

  const visualBoxStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: `${boxSize}px`,
    height: `${boxSize}px`,
    borderRadius: `${radius}px`,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error
      ? "var(--x-danger)"
      : isChecked || indeterminate
        ? "var(--x-accent)"
        : isHovered
          ? "var(--x-border-active)"
          : "var(--x-border)",
    backgroundColor:
      isChecked || indeterminate
        ? "var(--x-accent)"
        : "var(--x-surface-2)",
    color: "var(--x-on-accent)",
    flexShrink: 0,
    marginTop: description ? "2px" : 0,
    transform: isPressed && !disabled ? "scale(0.92)" : "scale(1)",
    transition:
      "background-color var(--x-dur-fast) var(--x-ease-standard), border-color var(--x-dur-fast) var(--x-ease-standard), transform var(--x-dur-instant) ease-out",
    boxSizing: "border-box",
  };

  const hiddenInputStyle: CSSProperties = {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    pointerEvents: "none",
  };

  return (
    <label
      className={className}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={containerStyle}
    >
      <input
        aria-checked={indeterminate ? "mixed" : isChecked}
        aria-invalid={error ? "true" : undefined}
        aria-label={ariaLabel}
        checked={isChecked}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={handleChange}
        style={hiddenInputStyle}
        type="checkbox"
        value={value}
        {...restProps}
      />
      <span aria-hidden="true" style={visualBoxStyle}>
        {(isChecked || indeterminate) && (
          <svg
            fill="none"
            height={iconSize}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            style={{
              transform: "scale(1)",
              animation: "fadeScale 120ms ease-out",
            }}
            viewBox="0 0 16 16"
            width={iconSize}
          >
            {indeterminate ? (
              <line x1="3" x2="13" y1="8" y2="8" />
            ) : (
              <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
            )}
          </svg>
        )}
      </span>
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
