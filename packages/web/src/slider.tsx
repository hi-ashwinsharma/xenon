import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type TouchEvent as ReactTouchEvent,
} from "react";
import {
  clampValue,
  snapToStep,
  valueToPercent,
  percentToValue,
  type SliderSize,
} from "@xenon/core";
import type { WebSliderProps } from "./web.types";

function getSliderDimensions(size: SliderSize = "md"): {
  trackHeight: number;
  thumbSize: number;
  hitHeight: number;
} {
  switch (size) {
    case "sm":
      return { trackHeight: 3, thumbSize: 14, hitHeight: 32 };
    case "lg":
      return { trackHeight: 6, thumbSize: 22, hitHeight: 44 };
    case "md":
    default:
      return { trackHeight: 4, thumbSize: 18, hitHeight: 36 };
  }
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = "md",
  onValueChange,
  onValueCommit,
  "aria-label": ariaLabel,
  name,
  id,
  className,
  style,
  ...restProps
}: WebSliderProps): ReactElement {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number>(() =>
    snapToStep(defaultValue, min, max, step),
  );
  const currentValue = isControlled
    ? clampValue(controlledValue, min, max)
    : internalValue;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const { trackHeight, thumbSize, hitHeight } = getSliderDimensions(size);
  const percent = valueToPercent(currentValue, min, max);

  const updateFromPosition = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) {
        return currentValue;
      }
      const rect = trackRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const rawPercent = (relativeX / rect.width) * 100;
      const newValue = percentToValue(rawPercent, min, max, step);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      return newValue;
    },
    [currentValue, isControlled, min, max, step, onValueChange],
  );

  const handlePointerDown = (clientX: number): void => {
    if (disabled) {
      return;
    }
    setIsDragging(true);
    const newValue = updateFromPosition(clientX);

    const handlePointerMove = (e: MouseEvent | TouchEvent): void => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromPosition(x);
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent): void => {
      setIsDragging(false);
      const x =
        "changedTouches" in e
          ? e.changedTouches[0].clientX
          : (e as MouseEvent).clientX;
      const finalValue = updateFromPosition(x);
      onValueCommit?.(finalValue);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);
  };

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    handlePointerDown(e.clientX);
  };

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>): void => {
    if (e.touches.length > 0) {
      handlePointerDown(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (disabled) {
      return;
    }
    let nextValue = currentValue;
    const stepMultiplier = 10;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        nextValue = clampValue(currentValue + step, min, max);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        nextValue = clampValue(currentValue - step, min, max);
        break;
      case "PageUp":
        nextValue = clampValue(currentValue + step * stepMultiplier, min, max);
        break;
      case "PageDown":
        nextValue = clampValue(currentValue - step * stepMultiplier, min, max);
        break;
      case "Home":
        nextValue = min;
        break;
      case "End":
        nextValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    nextValue = snapToStep(nextValue, min, max, step);
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
    onValueCommit?.(nextValue);
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: `${hitHeight}px`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    touchAction: "none",
    userSelect: "none",
    ...style,
  };

  const trackBgStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: `${trackHeight}px`,
    borderRadius: "9999px",
    backgroundColor: "var(--x-surface-2)",
    border: "1px solid var(--x-border)",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const trackFillStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: `${percent}%`,
    backgroundColor: "var(--x-accent)",
    transition: isDragging
      ? "none"
      : "width var(--x-dur-fast) var(--x-ease-standard)",
  };

  const thumbStyle: CSSProperties = {
    position: "absolute",
    left: `${percent}%`,
    top: "50%",
    width: `${thumbSize}px`,
    height: `${thumbSize}px`,
    borderRadius: "9999px",
    backgroundColor: "var(--x-text)",
    border: "1px solid var(--x-border)",
    transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
    transition: isDragging
      ? "transform var(--x-dur-instant) ease-out"
      : "left var(--x-dur-fast) var(--x-ease-standard), transform var(--x-dur-fast) var(--x-ease-standard)",
    boxSizing: "border-box",
    boxShadow: "none",
    outline: "none",
  };

  return (
    <div
      aria-disabled={disabled ? "true" : undefined}
      aria-label={ariaLabel}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={currentValue}
      className={className}
      id={sliderId}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={trackRef}
      role="slider"
      style={containerStyle}
      tabIndex={disabled ? -1 : 0}
      {...restProps}
    >
      <div style={trackBgStyle}>
        <div style={trackFillStyle} />
      </div>
      <div aria-hidden="true" style={thumbStyle} />
      {name && <input name={name} type="hidden" value={currentValue} />}
    </div>
  );
}
