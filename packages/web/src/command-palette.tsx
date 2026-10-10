"use client";

import React, {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "./hooks/use-click-outside";
import { useFocusTrap } from "./hooks/use-focus-trap";
import { usePresence } from "./hooks/use-presence";
import { useRovingFocus } from "./hooks/use-roving-focus";
import type {
  CommandPaletteItem,
  WebCommandPaletteProps,
} from "./web.types";

export function CommandPalette({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  items,
  placeholder = "Type a command or search...",
  emptyText = "No commands found.",
  shortcutKey = "⌘K",
  className,
  style,
  ...props
}: WebCommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const paletteId = useId();

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    if (!nextOpen) {
      setQuery("");
    }
    onOpenChange?.(nextOpen);
  };

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [open]);

  // Filter items
  const filteredItems = query.trim()
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        (item.group && item.group.toLowerCase().includes(query.toLowerCase())),
      )
    : items;

  // Group items
  const groupedItems = filteredItems.reduce<Record<string, CommandPaletteItem[]>>(
    (acc, item) => {
      const groupName = item.group || "General";
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(item);
      return acc;
    },
    {},
  );

  const flatItems: CommandPaletteItem[] = [];
  Object.values(groupedItems).forEach((groupList) => {
    flatItems.push(...groupList);
  });

  const { activeIndex, setActiveIndex, handleKeyDown } = useRovingFocus({
    enabled: open,
    itemCount: flatItems.length,
    initialIndex: 0,
    onSelect: (index) => {
      const selected = flatItems[index];
      if (selected && !selected.disabled) {
        selected.onSelect?.();
        setOpen(false);
      }
    },
    onEscape: () => setOpen(false),
  });

  useFocusTrap({
    active: open,
    containerRef: contentRef,
    initialFocusRef: inputRef,
    onEscape: () => setOpen(false),
  });

  useClickOutside({
    enabled: open,
    containerRef: contentRef,
    onClickOutside: () => setOpen(false),
  });

  const { isMounted, status } = usePresence({ open, durationMs: 200 });

  if (!isMounted) return null;

  const isEntered = status === "entered";

  return createPortal(
    <div
      aria-modal="true"
      id={paletteId}
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "12vh",
        paddingLeft: "16px",
        paddingRight: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* Full-Canvas Liquid Glass Blur Scrim */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          opacity: isEntered ? 1 : 0,
          transition: "opacity 200ms ease-out",
        }}
      />

      {/* Floating Spotlight Console Card */}
      <div
        ref={contentRef}
        {...props}
        className={className}
        style={{
          position: "relative",
          zIndex: 1001,
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "var(--x-surface)",
          border: "1px solid var(--x-border)",
          borderRadius: "var(--x-radius-surface, 16px)",
          overflow: "hidden",
          color: "var(--x-text)",
          boxSizing: "border-box",
          transformOrigin: "center top",
          transform: isEntered ? "scale(1) translateY(0)" : "scale(0.96) translateY(-8px)",
          opacity: isEntered ? 1 : 0,
          transition:
            "transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out",
          outline: "none",
          ...style,
        }}
      >
        {/* Top Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderBottom: "1px solid var(--x-border)",
          }}
        >
          {/* Phosphor MagnifyingGlass Thin Icon */}
          <span style={{ color: "var(--x-text-muted)", display: "inline-flex" }}>
            <svg
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              viewBox="0 0 16 16"
              width="18"
            >
              <circle cx="7" cy="7" r="4.5" />
              <line x1="10.5" x2="14" y1="10.5" y2="14" />
            </svg>
          </span>

          <input
            ref={inputRef}
            aria-autocomplete="list"
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            role="searchbox"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              color: "var(--x-text)",
              fontSize: "1.0625rem",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              outline: "none",
              padding: 0,
              margin: 0,
            }}
            value={query}
          />

          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--x-font-family-mono, monospace)",
              padding: "2px 6px",
              borderRadius: "4px",
              backgroundColor: "var(--x-surface-2)",
              border: "1px solid var(--x-border)",
              color: "var(--x-text-muted)",
            }}
          >
            ESC
          </span>
        </div>

        {/* Command Groups List */}
        <div
          style={{
            maxHeight: "340px",
            overflowY: "auto",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {flatItems.length === 0 ? (
            <div
              style={{
                padding: "28px 16px",
                textAlign: "center",
                fontSize: "0.875rem",
                color: "var(--x-text-muted)",
              }}
            >
              {emptyText}
            </div>
          ) : (
            Object.entries(groupedItems).map(([groupName, groupList]) => (
              <div key={groupName} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--x-text-muted)",
                    padding: "6px 10px 2px",
                    userSelect: "none",
                  }}
                >
                  {groupName}
                </span>

                {groupList.map((item) => {
                  const itemIndex = flatItems.findIndex((fi) => fi.id === item.id);
                  const isHighlighted = activeIndex === itemIndex;

                  return (
                    <button
                      disabled={item.disabled}
                      key={item.id}
                      onClick={() => {
                        if (!item.disabled) {
                          item.onSelect?.();
                          setOpen(false);
                        }
                      }}
                      onMouseEnter={() => {
                        if (!item.disabled) setActiveIndex(itemIndex);
                      }}
                      role="option"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "var(--x-radius-joint, 8px)",
                        border: "none",
                        background: isHighlighted ? "var(--x-surface-2)" : "transparent",
                        color: item.disabled ? "var(--x-text-muted)" : "var(--x-text)",
                        opacity: item.disabled ? 0.45 : 1,
                        cursor: item.disabled ? "not-allowed" : "pointer",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        textAlign: "left",
                        outline: "none",
                        transition: "background 100ms ease",
                        boxSizing: "border-box",
                      }}
                      type="button"
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {item.icon && (
                          <span style={{ display: "inline-flex", opacity: 0.85 }}>
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </div>

                      {item.shortcut && (
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--x-font-family-mono, monospace)",
                            color: "var(--x-text-muted)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderTop: "1px solid var(--x-border)",
            backgroundColor: "var(--x-surface-2)",
            fontSize: "11px",
            color: "var(--x-text-muted)",
          }}
        >
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span>Trigger anytime with {shortcutKey}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
