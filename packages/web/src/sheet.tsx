"use client";

import React, {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "./hooks/use-click-outside";
import { useFocusTrap } from "./hooks/use-focus-trap";
import { usePresence } from "./hooks/use-presence";
import type {
  WebSheetCloseProps,
  WebSheetContentProps,
  WebSheetDescriptionProps,
  WebSheetFooterProps,
  WebSheetHeaderProps,
  WebSheetProps,
  WebSheetTitleProps,
  WebSheetTriggerProps,
} from "./web.types";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const SheetContext = createContext<SheetContextValue | null>(null);

export function useSheet(): SheetContextValue {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a Sheet");
  }
  return context;
}

export function Sheet({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: WebSheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] =
    useState<boolean>(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const titleId = useId();
  const descriptionId = useId();

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <SheetContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  asChild,
  children,
  onClick,
  ...props
}: WebSheetTriggerProps) {
  const { open, setOpen } = useSheet();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      "aria-haspopup": "dialog",
      "aria-expanded": open,
    });
  }

  return (
    <button
      type="button"
      {...props}
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

export function SheetContent({
  side = "bottom",
  ariaLabel,
  hasGrabHandle = true,
  children,
  className,
  style,
  ...props
}: WebSheetContentProps) {
  const { open, setOpen, titleId, descriptionId } = useSheet();
  const { isMounted, status } = usePresence({ open, durationMs: 240 });
  const contentRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap({
    active: open,
    containerRef: contentRef,
    onEscape: () => setOpen(false),
  });

  useClickOutside({
    enabled: open,
    containerRef: contentRef,
    onClickOutside: () => setOpen(false),
  });

  if (!isMounted) return null;

  const isEntered = status === "entered";

  // Position and slide transform offsets
  const getSideStyles = (): React.CSSProperties => {
    switch (side) {
      case "right":
        return {
          top: 0,
          right: 0,
          bottom: 0,
          width: "400px",
          maxWidth: "100%",
          borderLeft: "1px solid var(--x-border)",
          transform: isEntered ? "translateX(0)" : "translateX(100%)",
        };
      case "left":
        return {
          top: 0,
          left: 0,
          bottom: 0,
          width: "400px",
          maxWidth: "100%",
          borderRight: "1px solid var(--x-border)",
          transform: isEntered ? "translateX(0)" : "translateX(-100%)",
        };
      case "top":
        return {
          top: 0,
          left: 0,
          right: 0,
          maxHeight: "80vh",
          borderBottom: "1px solid var(--x-border)",
          transform: isEntered ? "translateY(0)" : "translateY(-100%)",
        };
      case "bottom":
      default:
        return {
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "85vh",
          borderTop: "1px solid var(--x-border)",
          borderTopLeftRadius: "var(--x-radius-surface, 20px)",
          borderTopRightRadius: "var(--x-radius-surface, 20px)",
          transform: isEntered ? "translateY(0)" : "translateY(100%)",
        };
    }
  };

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      {/* Full-Canvas Liquid Glass Scrim */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          opacity: isEntered ? 1 : 0,
          transition: "opacity 240ms ease-out",
        }}
      />

      {/* Sheet Panel */}
      <div
        ref={contentRef}
        aria-describedby={descriptionId}
        aria-label={ariaLabel}
        aria-labelledby={titleId}
        tabIndex={-1}
        {...props}
        className={className}
        style={{
          position: "fixed",
          zIndex: 1001,
          backgroundColor: "var(--x-surface)",
          color: "var(--x-text)",
          boxSizing: "border-box",
          padding: side === "bottom" ? "12px 28px 36px" : "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          transition:
            "transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease-out",
          outline: "none",
          ...getSideStyles(),
          ...style,
        }}
      >
        {/* Apple HIG Tactile Grab Handle for Bottom Sheet */}
        {side === "bottom" && hasGrabHandle && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "12px",
              cursor: "grab",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "4px",
                borderRadius: "9999px",
                backgroundColor: "var(--x-border)",
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function SheetHeader({
  children,
  className,
  style,
  ...props
}: WebSheetHeaderProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SheetTitle({
  children,
  className,
  style,
  ...props
}: WebSheetTitleProps) {
  const { titleId } = useSheet();
  return (
    <h2
      id={titleId}
      {...props}
      className={className}
      style={{
        margin: 0,
        fontSize: "1.25rem",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        color: "var(--x-text)",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function SheetDescription({
  children,
  className,
  style,
  ...props
}: WebSheetDescriptionProps) {
  const { descriptionId } = useSheet();
  return (
    <p
      id={descriptionId}
      {...props}
      className={className}
      style={{
        margin: 0,
        fontSize: "0.875rem",
        fontWeight: 300,
        lineHeight: 1.5,
        color: "var(--x-text-muted)",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function SheetFooter({
  children,
  className,
  style,
  ...props
}: WebSheetFooterProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "12px",
        marginTop: "12px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SheetClose({
  asChild,
  children,
  onClick,
  ...props
}: WebSheetCloseProps) {
  const { setOpen } = useSheet();

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
