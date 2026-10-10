"use client";

import React, {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  computeFloatingPlacement,
  type FloatingResult,
  type Rect,
} from "@xenon/core";
import { useClickOutside } from "./hooks/use-click-outside";
import { usePresence } from "./hooks/use-presence";
import { useRovingFocus } from "./hooks/use-roving-focus";
import type {
  WebSelectContentProps,
  WebSelectItemProps,
  WebSelectProps,
  WebSelectTriggerProps,
} from "./web.types";

interface RegisteredItem {
  value: string;
  label: string;
  disabled: boolean;
}

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: string;
  onSelect: (value: string) => void;
  size: "sm" | "md" | "lg";
  disabled: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerRect: Rect | null;
  updateTriggerRect: () => void;
  contentId: string;
  items: RegisteredItem[];
  registerItem: (value: string, label: string, disabled: boolean) => () => void;
  selectedLabel?: string;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelect(): SelectContextValue {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a Select");
  }
  return context;
}

export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "Select an option...",
  options,
  disabled = false,
  size = "md",
  fullWidth = false,
  className,
  style,
  children,
  ...props
}: WebSelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [open, setOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [triggerRect, setTriggerRect] = useState<Rect | null>(null);
  const contentId = useId();

  const [items, setItems] = useState<RegisteredItem[]>([]);

  const registerItem = (val: string, label: string, dis: boolean) => {
    setItems((prev) => {
      if (prev.some((item) => item.value === val)) return prev;
      return [...prev, { value: val, label, disabled: dis }];
    });
    return () => {
      setItems((prev) => prev.filter((item) => item.value !== val));
    };
  };

  const handleSelect = (nextValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
    setOpen(false);
  };

  const updateTriggerRect = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  // Find label from options shorthand or registered items
  let selectedLabel: string | undefined;
  if (options) {
    selectedLabel = options.find((opt) => opt.value === value)?.label;
  } else {
    selectedLabel = items.find((item) => item.value === value)?.label;
  }

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onSelect: handleSelect,
        size,
        disabled,
        triggerRef,
        contentRef,
        triggerRect,
        updateTriggerRect,
        contentId,
        items,
        registerItem,
        selectedLabel,
      }}
    >
      <div
        {...props}
        className={className}
        style={{
          display: fullWidth ? "flex" : "inline-flex",
          width: fullWidth ? "100%" : "auto",
          position: "relative",
          ...style,
        }}
      >
        {options ? (
          <>
            <SelectTrigger placeholder={placeholder} />
            <SelectContent>
              {options.map((opt) => (
                <SelectItem
                  disabled={opt.disabled}
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </>
        ) : (
          children
        )}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  placeholder = "Select...",
  children,
  className,
  style,
  ...props
}: WebSelectTriggerProps) {
  const {
    open,
    setOpen,
    triggerRef,
    updateTriggerRect,
    size,
    disabled,
    contentId,
    selectedLabel,
  } = useSelect();

  const handleClick = () => {
    if (disabled) return;
    updateTriggerRect();
    setOpen(!open);
  };

  const getHeight = () => {
    switch (size) {
      case "sm":
        return 32;
      case "lg":
        return 48;
      case "md":
      default:
        return 40;
    }
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      {...props}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="listbox"
      className={className}
      disabled={disabled}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minWidth: "180px",
        height: `${getHeight()}px`,
        padding: "0 12px",
        backgroundColor: "var(--x-surface-2)",
        color: selectedLabel ? "var(--x-text)" : "var(--x-text-muted)",
        border: `1px solid ${open ? "var(--x-accent)" : "var(--x-border)"}`,
        // Dynamic architectural radius respecting active stop (0 = sharp, 6 = pill)
        borderRadius: "var(--x-radius-control)",
        fontSize: size === "sm" ? "0.8125rem" : "0.875rem",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "border-color 150ms ease, background-color 150ms ease",
        outline: "none",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {children ?? (selectedLabel || placeholder)}
      </span>

      {/* Phosphor CaretDown Thin Icon */}
      <span
        style={{
          display: "inline-flex",
          marginLeft: "8px",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
          color: "var(--x-text-muted)",
        }}
      >
        <svg
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 16 16"
          width="14"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </span>
    </button>
  );
}

export function SelectContent({
  children,
  className,
  style,
  ...props
}: WebSelectContentProps) {
  const { open, setOpen, contentRef, triggerRef, triggerRect, contentId } = useSelect();
  const { isMounted, status } = usePresence({ open, durationMs: 180 });
  const [coords, setCoords] = useState<FloatingResult | null>(null);

  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;

  const { handleKeyDown } = useRovingFocus({
    enabled: open,
    itemCount,
    initialIndex: 0,
    onEscape: () => setOpen(false),
  });

  useClickOutside({
    enabled: open,
    containerRef: contentRef,
    triggerRef,
    onClickOutside: () => setOpen(false),
  });

  useLayoutEffect(() => {
    if (!isMounted || !contentRef.current || !triggerRect) return;

    const contentEl = contentRef.current;
    const floatingWidth = triggerRect.width || contentEl.offsetWidth || 200;
    const floatingHeight = contentEl.offsetHeight || 160;

    const result = computeFloatingPlacement({
      triggerRect,
      floatingWidth,
      floatingHeight,
      placement: "bottom-start",
      offset: 6,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });

    setCoords(result);
  }, [isMounted, triggerRect]);

  if (!isMounted) return null;

  const isEntered = status === "entered";

  return createPortal(
    <div
      ref={contentRef}
      id={contentId}
      onKeyDown={handleKeyDown}
      role="listbox"
      tabIndex={-1}
      {...props}
      className={className}
      style={{
        position: "fixed",
        top: coords ? coords.y : -9999,
        left: coords ? coords.x : -9999,
        width: triggerRect ? `${triggerRect.width}px` : "auto",
        minWidth: "180px",
        maxHeight: "260px",
        overflowY: "auto",
        boxSizing: "border-box",
        zIndex: 999,
        backgroundColor: "var(--x-glass-regular-tint)",
        backdropFilter: "blur(var(--x-glass-regular-blur))",
        WebkitBackdropFilter: "blur(var(--x-glass-regular-blur))",
        border: "1px solid var(--x-border)",
        borderRadius: "var(--x-radius-control, 12px)",
        padding: "4px",
        color: "var(--x-text)",
        transformOrigin: coords?.transformOrigin ?? "center top",
        transform: isEntered ? "scale(1)" : "scale(0.94)",
        opacity: isEntered ? 1 : 0,
        transition:
          "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease-out",
        pointerEvents: "auto",
        outline: "none",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        ...style,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export function SelectItem({
  value,
  disabled = false,
  children,
  className,
  style,
  ...props
}: WebSelectItemProps) {
  const { value: selectedValue, onSelect, registerItem } = useSelect();
  const isSelected = selectedValue === value;

  useLayoutEffect(() => {
    const label = typeof children === "string" ? children : value;
    return registerItem(value, label, disabled);
  }, [value, children, disabled, registerItem]);

  return (
    <button
      aria-selected={isSelected}
      disabled={disabled}
      role="option"
      type="button"
      {...props}
      className={className}
      onClick={() => {
        if (!disabled) onSelect(value);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 10px",
        borderRadius: "var(--x-radius-joint, 6px)",
        border: "none",
        background: isSelected ? "var(--x-surface-2)" : "transparent",
        color: disabled ? "var(--x-text-muted)" : "var(--x-text)",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "0.875rem",
        fontWeight: isSelected ? 400 : 300,
        textAlign: "left",
        outline: "none",
        transition: "background 100ms ease",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <span>{children}</span>

      {/* Phosphor Check Thin Icon when selected */}
      {isSelected && (
        <span style={{ color: "var(--x-accent)", display: "inline-flex" }}>
          <svg
            fill="none"
            height="14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            viewBox="0 0 16 16"
            width="14"
          >
            <polyline points="3 8 6.5 11.5 13 4.5" />
          </svg>
        </span>
      )}
    </button>
  );
}
