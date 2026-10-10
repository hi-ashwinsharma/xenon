"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  WebDropdownMenuContentProps,
  WebDropdownMenuGroupProps,
  WebDropdownMenuItemProps,
  WebDropdownMenuProps,
  WebDropdownMenuSeparatorProps,
  WebDropdownMenuTriggerProps,
} from "./web.types";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  openOnHover?: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerRect: Rect | null;
  updateTriggerRect: () => void;
  contentId: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerItem: (index: number, onSelect?: () => void, disabled?: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenu(): DropdownMenuContextValue {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu");
  }
  return context;
}

export function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  openOnHover = false,
  hoverDelayMs = 150,
  children,
}: WebDropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [triggerRect, setTriggerRect] = useState<Rect | null>(null);
  const contentId = useId();

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const itemsMapRef = useRef<Map<number, { onSelect?: () => void; disabled?: boolean }>>(new Map());
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const setOpen = useCallback((nextOpen: boolean) => {
    clearHoverTimer();
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    if (!nextOpen) {
      setActiveIndex(-1);
    }
    onOpenChange?.(nextOpen);
  }, [clearHoverTimer, isControlled, onOpenChange]);

  const updateTriggerRect = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!openOnHover) return;
    clearHoverTimer();
    updateTriggerRect();
    setOpen(true);
  }, [openOnHover, clearHoverTimer, updateTriggerRect, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!openOnHover) return;
    clearHoverTimer();
    hoverTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, hoverDelayMs);
  }, [openOnHover, clearHoverTimer, hoverDelayMs, setOpen]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const registerItem = (index: number, onSelect?: () => void, disabled?: boolean) => {
    itemsMapRef.current.set(index, { onSelect, disabled });
  };

  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        setOpen,
        openOnHover,
        handleMouseEnter,
        handleMouseLeave,
        triggerRef,
        contentRef,
        triggerRect,
        updateTriggerRect,
        contentId,
        activeIndex,
        setActiveIndex,
        registerItem,
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  asChild,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: WebDropdownMenuTriggerProps) {
  const {
    open,
    setOpen,
    triggerRef,
    updateTriggerRect,
    contentId,
    openOnHover,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropdownMenu();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateTriggerRect();
    setOpen(!open);
    onClick?.(e);
  };

  const onEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (openOnHover) handleMouseEnter();
    onMouseEnter?.(e);
  };

  const onLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (openOnHover) handleMouseLeave();
    onMouseLeave?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(e);
        handleClick(e);
      },
      onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onMouseEnter?.(e);
        if (openOnHover) handleMouseEnter();
      },
      onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onMouseLeave?.(e);
        if (openOnHover) handleMouseLeave();
      },
      "aria-haspopup": "menu",
      "aria-expanded": open,
      "aria-controls": open ? contentId : undefined,
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      {...props}
      aria-controls={open ? contentId : undefined}
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={handleClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        ...props.style,
      }}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  placement = "bottom-start",
  offset = 6,
  width = 220,
  ariaLabel = "Menu",
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: WebDropdownMenuContentProps) {
  const {
    open,
    setOpen,
    contentRef,
    triggerRef,
    triggerRect,
    contentId,
    activeIndex,
    setActiveIndex,
    openOnHover,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropdownMenu();
  const { isMounted, status } = usePresence({ open, durationMs: 180 });
  const [coords, setCoords] = useState<FloatingResult | null>(null);

  // Count items
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
    const floatingWidth = contentEl.offsetWidth || 220;
    const floatingHeight = contentEl.offsetHeight || 160;

    const result = computeFloatingPlacement({
      triggerRect,
      floatingWidth,
      floatingHeight,
      placement,
      offset,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    });

    setCoords(result);
  }, [isMounted, triggerRect, placement, offset]);

  if (!isMounted) return null;

  const isEntered = status === "entered";

  return createPortal(
    <div
      ref={contentRef}
      aria-label={ariaLabel}
      id={contentId}
      onKeyDown={handleKeyDown}
      role="menu"
      tabIndex={-1}
      {...props}
      className={className}
      onMouseEnter={(e) => {
        if (openOnHover) handleMouseEnter();
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (openOnHover) handleMouseLeave();
        onMouseLeave?.(e);
      }}
      style={{
        position: "fixed",
        top: coords ? coords.y : -9999,
        left: coords ? coords.x : -9999,
        width: typeof width === "number" ? `${width}px` : width,
        boxSizing: "border-box",
        zIndex: 999,
        backgroundColor: "var(--x-glass-regular-tint)",
        backdropFilter: "blur(var(--x-glass-regular-blur))",
        WebkitBackdropFilter: "blur(var(--x-glass-regular-blur))",
        border: "1px solid var(--x-border)",
        borderRadius: "var(--x-radius-control, 12px)",
        padding: "6px",
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
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, {
          _index: index,
          _active: activeIndex === index,
        });
      })}
    </div>,
    document.body,
  );
}

export function DropdownMenuGroup({
  label,
  children,
  className,
  style,
  ...props
}: WebDropdownMenuGroupProps) {
  return (
    <div
      role="group"
      {...props}
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "2px", ...style }}
    >
      {label && (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--x-text-muted)",
            padding: "6px 8px 4px",
            userSelect: "none",
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export interface InternalDropdownMenuItemProps extends WebDropdownMenuItemProps {
  _index?: number;
  _active?: boolean;
}

export function DropdownMenuItem({
  disabled = false,
  destructive = false,
  icon,
  shortcut,
  onSelect,
  children,
  className,
  style,
  _index,
  _active,
  onClick,
  ...props
}: InternalDropdownMenuItemProps) {
  const { setOpen, activeIndex, setActiveIndex } = useDropdownMenu();
  const isHighlighted = _active || (_index !== undefined && activeIndex === _index);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
    onClick?.(e);
  };

  return (
    <button
      disabled={disabled}
      role="menuitem"
      type="button"
      {...props}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => {
        if (!disabled && _index !== undefined) {
          setActiveIndex(_index);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "7px 10px",
        borderRadius: "var(--x-radius-joint, 6px)",
        border: "none",
        background: isHighlighted ? "var(--x-surface-2)" : "transparent",
        color: destructive
          ? "var(--x-error, #ff453a)"
          : disabled
            ? "var(--x-text-muted)"
            : "var(--x-text)",
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "0.875rem",
        fontWeight: 400,
        textAlign: "left",
        outline: "none",
        transition: "background 100ms ease",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon && <span style={{ display: "inline-flex", opacity: 0.85 }}>{icon}</span>}
        <span>{children}</span>
      </div>

      {shortcut && (
        <span
          style={{
            fontSize: "11px",
            fontFamily: "var(--x-font-family-mono, monospace)",
            color: "var(--x-text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function DropdownMenuSeparator({
  className,
  style,
  ...props
}: WebDropdownMenuSeparatorProps) {
  return (
    <hr
      role="separator"
      {...props}
      className={className}
      style={{
        border: "none",
        borderTop: "1px solid var(--x-border)",
        margin: "4px 0",
        ...style,
      }}
    />
  );
}
