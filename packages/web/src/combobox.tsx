"use client";

import React, {
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
import type { WebComboboxProps } from "./web.types";

export function Combobox({
  value: controlledValue,
  defaultValue,
  onValueChange,
  options,
  placeholder = "Search options...",
  searchPlaceholder = "Type to search...",
  emptyText = "No results found.",
  disabled = false,
  size = "md",
  fullWidth = false,
  clearable = true,
  className,
  style,
  ...props
}: WebComboboxProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [triggerRect, setTriggerRect] = useState<Rect | null>(null);
  const contentId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = query.trim()
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  const { isMounted, status } = usePresence({ open, durationMs: 180 });
  const [coords, setCoords] = useState<FloatingResult | null>(null);

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

  const handleSelect = (nextValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
    setOpen(false);
    setQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) {
      setUncontrolledValue(undefined);
    }
    onValueChange?.("");
    setQuery("");
  };

  const { activeIndex, setActiveIndex, handleKeyDown } = useRovingFocus({
    enabled: open,
    itemCount: filteredOptions.length,
    initialIndex: 0,
    onSelect: (index) => {
      const target = filteredOptions[index];
      if (target && !target.disabled) {
        handleSelect(target.value);
      }
    },
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
    const floatingWidth = triggerRect.width || contentEl.offsetWidth || 240;
    const floatingHeight = contentEl.offsetHeight || 180;

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
  }, [isMounted, triggerRect, filteredOptions.length]);

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

  const isEntered = status === "entered";

  return (
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
      {/* Combobox Trigger Field */}
      <div
        ref={triggerRef}
        onClick={() => {
          if (disabled) return;
          updateTriggerRect();
          setOpen(true);
          inputRef.current?.focus();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          minWidth: "200px",
          height: `${getHeight()}px`,
          padding: "0 12px",
          backgroundColor: "var(--x-surface-2)",
          border: `1px solid ${open ? "var(--x-accent)" : "var(--x-border)"}`,
          borderRadius: "var(--x-radius-control)",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.45 : 1,
          boxSizing: "border-box",
          transition: "border-color 150ms ease",
        }}
      >
        {/* Phosphor MagnifyingGlass Thin Icon */}
        <span style={{ color: "var(--x-text-muted)", display: "inline-flex" }}>
          <svg
            fill="none"
            height="15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
            viewBox="0 0 16 16"
            width="15"
          >
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" x2="14" y1="10.5" y2="14" />
          </svg>
        </span>

        <input
          ref={inputRef}
          aria-autocomplete="list"
          aria-controls={open ? contentId : undefined}
          aria-expanded={open}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) {
              updateTriggerRect();
              setOpen(true);
            }
          }}
          onFocus={() => {
            updateTriggerRect();
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={selectedOption ? selectedOption.label : placeholder}
          role="combobox"
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            color: "var(--x-text)",
            fontSize: size === "sm" ? "0.8125rem" : "0.875rem",
            fontWeight: 400,
            outline: "none",
            padding: 0,
            margin: 0,
          }}
          value={query}
        />

        {/* Clear Button */}
        {clearable && (value || query) && (
          <button
            aria-label="Clear selection"
            onClick={handleClear}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--x-text-muted)",
              display: "inline-flex",
            }}
            type="button"
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
              <line x1="4" x2="12" y1="4" y2="12" />
              <line x1="12" x2="4" y1="4" y2="12" />
            </svg>
          </button>
        )}

        {/* Caret Indicator */}
        <span
          style={{
            display: "inline-flex",
            color: "var(--x-text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
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
      </div>

      {/* Floating Anchored Listbox */}
      {isMounted &&
        createPortal(
          <div
            ref={contentRef}
            id={contentId}
            role="listbox"
            tabIndex={-1}
            style={{
              position: "fixed",
              top: coords ? coords.y : -9999,
              left: coords ? coords.x : -9999,
              width: triggerRect ? `${triggerRect.width}px` : "auto",
              minWidth: "200px",
              maxHeight: "240px",
              overflowY: "auto",
              boxSizing: "border-box",
              zIndex: 999,
              backgroundColor: "var(--x-glass-regular-bg, var(--x-surface-2))",
              backdropFilter: "blur(var(--x-glass-regular-blur, 20px))",
              WebkitBackdropFilter: "blur(var(--x-glass-regular-blur, 20px))",
              border: "1px solid var(--x-border)",
              borderRadius: "min(var(--x-radius-surface, 12px), 14px)",
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
            }}
          >
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontSize: "0.8125rem",
                  color: "var(--x-text-muted)",
                }}
              >
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((opt, index) => {
                const isSelected = value === opt.value;
                const isHighlighted = activeIndex === index;

                return (
                  <button
                    aria-selected={isSelected}
                    disabled={opt.disabled}
                    key={opt.value}
                    onClick={() => {
                      if (!opt.disabled) handleSelect(opt.value);
                    }}
                    onMouseEnter={() => {
                      if (!opt.disabled) setActiveIndex(index);
                    }}
                    role="option"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "var(--x-radius-joint, 6px)",
                      border: "none",
                      background: isHighlighted
                        ? "var(--x-surface-2)"
                        : "transparent",
                      color: opt.disabled
                        ? "var(--x-text-muted)"
                        : "var(--x-text)",
                      opacity: opt.disabled ? 0.45 : 1,
                      cursor: opt.disabled ? "not-allowed" : "pointer",
                      fontSize: "0.875rem",
                      fontWeight: isSelected ? 400 : 300,
                      textAlign: "left",
                      outline: "none",
                      transition: "background 100ms ease",
                      boxSizing: "border-box",
                    }}
                    type="button"
                  >
                    <span>{opt.label}</span>

                    {isSelected && (
                      <span
                        style={{
                          color: "var(--x-accent)",
                          display: "inline-flex",
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
                          <polyline points="3 8 6.5 11.5 13 4.5" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
