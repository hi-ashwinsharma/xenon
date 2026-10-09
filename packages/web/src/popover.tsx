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
import { useFocusTrap } from "./hooks/use-focus-trap";
import { usePresence } from "./hooks/use-presence";
import type {
  WebPopoverCloseProps,
  WebPopoverContentProps,
  WebPopoverProps,
  WebPopoverTriggerProps,
} from "./web.types";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerRect: Rect | null;
  updateTriggerRect: () => void;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

export function usePopover(): PopoverContextValue {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a Popover");
  }
  return context;
}

/**
 * Popover Root: Abolishes view-blocking dialogs in favor of anchored popovers.
 * Features hero container transforms expanding directly from and collapsing back into the trigger.
 */
export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: WebPopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [triggerRect, setTriggerRect] = useState<Rect | null>(null);
  const contentId = useId();

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
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

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        contentRef,
        triggerRect,
        updateTriggerRect,
        contentId,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  asChild,
  children,
  onClick,
  ...props
}: WebPopoverTriggerProps) {
  const { open, setOpen, triggerRef, updateTriggerRect, contentId } = usePopover();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateTriggerRect();
    setOpen(!open);
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-haspopup": "dialog",
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
      aria-haspopup="dialog"
      onClick={handleClick}
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

export function PopoverContent({
  placement = "bottom",
  offset = 8,
  width = 280,
  ariaLabel = "Dialog",
  children,
  className,
  style,
  ...props
}: WebPopoverContentProps) {
  const { open, setOpen, contentRef, triggerRef, triggerRect, contentId } = usePopover();
  const { isMounted, status } = usePresence({ open, durationMs: 180 });
  const [coords, setCoords] = useState<FloatingResult | null>(null);

  // Focus trap & Escape handling
  useFocusTrap({
    active: open,
    containerRef: contentRef,
    onEscape: () => setOpen(false),
  });

  // Click outside detection (unobstructed UI)
  useClickOutside({
    enabled: open,
    containerRef: contentRef,
    triggerRef,
    onClickOutside: () => setOpen(false),
  });

  // Calculate positioning and hero transform origin
  useLayoutEffect(() => {
    if (!isMounted || !contentRef.current || !triggerRect) return;

    const contentEl = contentRef.current;
    const floatingWidth = contentEl.offsetWidth || 280;
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
      aria-modal="true"
      id={contentId}
      role="dialog"
      tabIndex={-1}
      {...props}
      className={className}
      style={{
        position: "fixed",
        top: coords ? coords.y : -9999,
        left: coords ? coords.x : -9999,
        width: typeof width === "number" ? `${width}px` : width,
        boxSizing: "border-box",
        zIndex: 999,
        // Material: Liquid Glass (regular blur) with 1px hairline border
        backgroundColor: "var(--x-glass-regular-tint)",
        backdropFilter: "blur(var(--x-glass-regular-blur))",
        WebkitBackdropFilter: "blur(var(--x-glass-regular-blur))",
        border: "1px solid var(--x-border)",
        borderRadius: "var(--x-radius-surface, 12px)",
        padding: "16px",
        color: "var(--x-text)",
        // Hero transform kinematics: scale from trigger coordinates
        transformOrigin: coords?.transformOrigin ?? "center top",
        transform: isEntered ? "scale(1)" : "scale(0.92)",
        opacity: isEntered ? 1 : 0,
        transition:
          "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease-out",
        pointerEvents: "auto",
        outline: "none",
        ...style,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}

export function PopoverClose({
  asChild,
  children,
  onClick,
  ...props
}: WebPopoverCloseProps) {
  const { setOpen } = usePopover();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    });
  }

  return (
    <button
      type="button"
      {...props}
      onClick={handleClick}
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
