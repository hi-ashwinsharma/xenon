import {
  createContext,
  useContext,
  useId,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type ReactElement,
} from "react";
import type { RadioContextValue, RadioSize } from "@xenon/core";
import type { WebRadioGroupProps, WebRadioProps } from "./web.types.js";

const RadioContext = createContext<RadioContextValue | null>(null);

function getRadioDimensions(size: RadioSize = "md"): {
  outerSize: number;
  innerSize: number;
  fontSize: string;
  lh: string;
} {
  switch (size) {
    case "sm":
      return {
        outerSize: 16,
        innerSize: 6,
        fontSize: "0.8125rem",
        lh: "1.125rem",
      };
    case "lg":
      return {
        outerSize: 24,
        innerSize: 10,
        fontSize: "1rem",
        lh: "1.5rem",
      };
    case "md":
    default:
      return {
        outerSize: 20,
        innerSize: 8,
        fontSize: "0.875rem",
        lh: "1.25rem",
      };
  }
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  name,
  orientation = "vertical",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  children,
  className,
  style,
  ...restProps
}: WebRadioGroupProps): ReactElement {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const selectedValue = isControlled ? controlledValue : internalValue;

  const handleSelect = (nextValue: string): void => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const groupStyle: CSSProperties = {
    display: "flex",
    flexDirection: orientation === "horizontal" ? "row" : "column",
    gap: orientation === "horizontal" ? "20px" : "12px",
    fontFamily: "var(--x-font-family)",
    ...style,
  };

  return (
    <RadioContext.Provider
      value={{
        name: groupName,
        value: selectedValue,
        onValueChange: handleSelect,
        disabled,
        size,
      }}
    >
      <div
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={className}
        role="radiogroup"
        style={groupStyle}
        {...restProps}
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
}

export function Radio({
  value,
  label,
  description,
  disabled: itemDisabled,
  size: itemSize,
  "aria-label": ariaLabel,
  id,
  className,
  style,
  ...restProps
}: WebRadioProps): ReactElement {
  const context = useContext(RadioContext);
  const generatedId = useId();
  const radioId = id ?? generatedId;

  const groupName = context?.name;
  const isSelected = context?.value === value;
  const isDisabled = itemDisabled ?? context?.disabled ?? false;
  const effectiveSize = itemSize ?? context?.size ?? "md";

  const { outerSize, innerSize, fontSize, lh } =
    getRadioDimensions(effectiveSize);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (isDisabled) {
      return;
    }
    if (e.target.checked) {
      context?.onValueChange?.(value);
    }
  };

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: description ? "flex-start" : "center",
    gap: "8px",
    position: "relative",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.45 : 1,
    fontFamily: "var(--x-font-family)",
    userSelect: "none",
    ...style,
  };

  const ringStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: `${outerSize}px`,
    height: `${outerSize}px`,
    borderRadius: "9999px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isSelected ? "var(--x-accent)" : "var(--x-border)",
    backgroundColor: "transparent",
    flexShrink: 0,
    marginTop: description ? "2px" : 0,
    boxSizing: "border-box",
    transition:
      "border-color var(--x-dur-fast) var(--x-ease-standard), box-shadow var(--x-dur-fast) var(--x-ease-standard)",
  };

  const dotStyle: CSSProperties = {
    width: `${innerSize}px`,
    height: `${innerSize}px`,
    borderRadius: "9999px",
    backgroundColor: "var(--x-accent)",
    transform: isSelected ? "scale(1)" : "scale(0)",
    opacity: isSelected ? 1 : 0,
    transition:
      "transform var(--x-dur-fast) var(--x-ease-standard), opacity var(--x-dur-fast) var(--x-ease-standard)",
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
    <label className={className} style={containerStyle}>
      <input
        aria-label={ariaLabel}
        checked={isSelected}
        disabled={isDisabled}
        id={radioId}
        name={groupName}
        onChange={handleChange}
        style={hiddenInputStyle}
        type="radio"
        value={value}
        {...restProps}
      />
      <span aria-hidden="true" style={ringStyle}>
        <span style={dotStyle} />
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
