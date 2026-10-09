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
import { usePresence } from "./hooks/use-presence";
import type {
  WebTooltipContentProps,
  WebTooltipProps,
  WebTooltipTriggerProps,
} from "./web.types";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  triggerRect: Rect | null;
  updateTriggerRect: () => void;
  delayMs: number;
  tooltipId: string;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

export function useTooltip(): TooltipContextValue {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a Tooltip");
  }
  return context;
}

export function Tooltip({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayMs = 250,
  children,
}: WebTooltipProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [triggerRect, setTriggerRect] = useState<Rect | null>(null);
  const tooltipId = useId();

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
    <TooltipContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        contentRef,
        triggerRect,
        updateTriggerRect,
        delayMs,
        tooltipId,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({
  asChild,
  children,
  ...props
}: WebTooltipTriggerProps) {
  const { setOpen, triggerRef, updateTriggerRect, delayMs, tooltipId } = useTooltip();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    // Only trigger hover on devices that support hover
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
      return;
    }
    updateTriggerRect();
    timerRef.current = setTimeout(() => {
      setOpen(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  const handleFocus = () => {
    updateTriggerRect();
    setOpen(true);
  };

  const handleBlur = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      "aria-describedby": tooltipId,
    });
  }

  return (
    <span
      ref={triggerRef as React.RefObject<HTMLSpanElement>}
      {...props}
      aria-describedby={tooltipId}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex", cursor: "default", ...props.style }}
    >
      {children}
    </span>
  );
}

export function TooltipContent({
  placement = "top",
  offset = 6,
  ariaLabel,
  children,
  className,
  style,
  ...props
}: WebTooltipContentProps) {
  const { open, contentRef, triggerRect, tooltipId } = useTooltip();
  const { isMounted, status } = usePresence({ open, durationMs: 140 });
  const [coords, setCoords] = useState<FloatingResult | null>(null);

  useLayoutEffect(() => {
    if (!isMounted || !contentRef.current || !triggerRect) return;

    const contentEl = contentRef.current;
    const floatingWidth = contentEl.offsetWidth || 120;
    const floatingHeight = contentEl.offsetHeight || 32;

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
      id={tooltipId}
      role="tooltip"
      {...props}
      className={className}
      style={{
        position: "fixed",
        top: coords ? coords.y : -9999,
        left: coords ? coords.x : -9999,
        zIndex: 1000,
        backgroundColor: "var(--x-surface)",
        border: "1px solid var(--x-border)",
        borderRadius: "var(--x-radius-control, 9999px)",
        padding: "4px 10px",
        color: "var(--x-text)",
        fontSize: "0.75rem",
        fontWeight: 400,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        transformOrigin: coords?.transformOrigin ?? "center bottom",
        transform: isEntered ? "scale(1)" : "scale(0.96)",
        opacity: isEntered ? 1 : 0,
        transition:
          "transform 140ms cubic-bezier(0.16, 1, 0.3, 1), opacity 140ms ease-out",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
