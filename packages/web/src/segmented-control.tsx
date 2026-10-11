import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import {
  CONTROL_HEIGHTS,
  DEFAULT_RADIUS_STOP,
  type RadiusStop,
} from "@xenon/tokens";
import { clampControlRadius } from "@xenon/core";
import { useXenon } from "./provider";
import type { WebSegmentedControlProps } from "./web.types";

export function SegmentedControl<T extends string = string>({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = "md",
  disabled = false,
  fullWidth = false,
  "aria-label": ariaLabel,
  className,
  style,
  ...restProps
}: WebSegmentedControlProps<T>): ReactElement {
  const generatedId = useId();
  const isControlled = controlledValue !== undefined;
  const initialValue = defaultValue ?? options[0]?.value;
  const [internalValue, setInternalValue] = useState<T | undefined>(
    initialValue,
  );
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  const [hoveredValue, setHoveredValue] = useState<T | null>(null);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<T, HTMLButtonElement>>(new Map());

  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const height = CONTROL_HEIGHTS[size];
  const outerRadius = clampControlRadius(height, xenonRadiusStop);
  const innerRadius = Math.max(0, outerRadius - 3);

  const updateIndicator = useCallback(() => {
    if (!selectedValue || !containerRef.current) {
      return;
    }
    const selectedEl = itemRefs.current.get(selectedValue);
    if (!selectedEl) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = selectedEl.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
      ready: true,
    });
  }, [selectedValue]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator, options]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    if (!containerRef.current || typeof ResizeObserver === "undefined") {
      return () => window.removeEventListener("resize", updateIndicator);
    }
    const observer = new ResizeObserver(() => {
      updateIndicator();
    });
    observer.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  const handleSelect = (val: T): void => {
    if (disabled) {
      return;
    }
    if (!isControlled) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (disabled) {
      return;
    }
    const enabledOptions = options.filter((opt) => !opt.disabled);
    const currentIndex = enabledOptions.findIndex(
      (opt) => opt.value === selectedValue,
    );

    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % enabledOptions.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex =
        (currentIndex - 1 + enabledOptions.length) % enabledOptions.length;
    }

    if (nextIndex >= 0 && enabledOptions[nextIndex]) {
      e.preventDefault();
      const nextVal = enabledOptions[nextIndex].value;
      handleSelect(nextVal);
      itemRefs.current.get(nextVal)?.focus();
    }
  };

  const containerStyle: CSSProperties = useMemo(() => {
    return {
      position: "relative",
      display: fullWidth ? "flex" : "inline-flex",
      alignItems: "stretch",
      height: `${height}px`,
      padding: "3px",
      boxSizing: "border-box",
      borderRadius: `${outerRadius}px`,
      backgroundColor: "var(--x-surface-2)",
      border: "1px solid var(--x-border)",
      opacity: disabled ? 0.45 : 1,
      userSelect: "none",
      fontFamily: "var(--x-font-family)",
      transition:
        "border-radius var(--x-dur-base) var(--x-ease-standard), border-color var(--x-dur-base) var(--x-ease-standard), background-color var(--x-dur-base) var(--x-ease-standard)",
      width: fullWidth ? "100%" : undefined,
      ...style,
    };
  }, [height, outerRadius, fullWidth, disabled, style]);

  return (
    <div
      aria-label={ariaLabel}
      className={className}
      id={generatedId}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      role="tablist"
      style={containerStyle}
      {...restProps}
    >
      {/* Active Floating Pill Thumb */}
      {indicatorStyle.ready && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "3px",
            bottom: "3px",
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            borderRadius: `${innerRadius}px`,
            backgroundColor: "var(--x-surface)",
            border: "1px solid var(--x-border)",
            boxSizing: "border-box",
            pointerEvents: "none",
            transform: isPressed ? "scale(0.98)" : "scale(1)",
            transition:
              "left var(--x-dur-base) var(--x-spring-soft, cubic-bezier(0.16, 1, 0.3, 1)), width var(--x-dur-fast) var(--x-ease-standard), transform var(--x-dur-instant) ease-out, border-radius var(--x-dur-base) var(--x-ease-standard)",
          }}
        />
      )}

      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        const isItemDisabled = disabled || Boolean(option.disabled);
        const isHovered = hoveredValue === option.value && !isSelected;

        return (
          <button
            aria-selected={isSelected}
            disabled={isItemDisabled}
            key={option.value}
            onClick={() => handleSelect(option.value)}
            onMouseDown={() => !isItemDisabled && setIsPressed(true)}
            onMouseEnter={() =>
              !isItemDisabled && setHoveredValue(option.value)
            }
            onMouseLeave={() => {
              setHoveredValue(null);
              setIsPressed(false);
            }}
            onMouseUp={() => setIsPressed(false)}
            ref={(el) => {
              if (el) {
                itemRefs.current.set(option.value, el);
              } else {
                itemRefs.current.delete(option.value);
              }
            }}
            role="tab"
            style={{
              position: "relative",
              zIndex: 1,
              flex: fullWidth ? 1 : undefined,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              paddingLeft:
                size === "sm" ? "10px" : size === "lg" ? "18px" : "14px",
              paddingRight:
                size === "sm" ? "10px" : size === "lg" ? "18px" : "14px",
              height: "100%",
              borderRadius: `${innerRadius}px`,
              border: "none",
              backgroundColor: isHovered
                ? "var(--x-border-active)"
                : "transparent",
              color: isSelected
                ? "var(--x-text)"
                : isHovered
                  ? "var(--x-text)"
                  : "var(--x-text-muted)",
              fontFamily: "inherit",
              fontSize:
                size === "sm"
                  ? "0.8125rem"
                  : size === "lg"
                    ? "1rem"
                    : "0.875rem",
              fontWeight: 400,
              cursor: isItemDisabled ? "not-allowed" : "pointer",
              outline: "none",
              transition:
                "color var(--x-dur-fast) var(--x-ease-standard), background-color var(--x-dur-fast) var(--x-ease-standard)",
              whiteSpace: "nowrap",
            }}
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            {option.icon && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  opacity: isSelected ? 1 : 0.6,
                }}
              >
                {option.icon}
              </span>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
