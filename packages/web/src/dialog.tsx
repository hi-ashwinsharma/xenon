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
  WebDialogCloseProps,
  WebDialogContentProps,
  WebDialogDescriptionProps,
  WebDialogFooterProps,
  WebDialogHeaderProps,
  WebDialogProps,
  WebDialogTitleProps,
  WebDialogTriggerProps,
} from "./web.types";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog");
  }
  return context;
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: WebDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
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
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  children,
  onClick,
  ...props
}: WebDialogTriggerProps) {
  const { open, setOpen } = useDialog();

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

export function DialogContent({
  width = 440,
  ariaLabel,
  children,
  className,
  style,
  ...props
}: WebDialogContentProps) {
  const { open, setOpen, titleId, descriptionId } = useDialog();
  const { isMounted, status } = usePresence({ open, durationMs: 200 });
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

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Scrim: Dimmed backdrop, subtle fade */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          opacity: isEntered ? 1 : 0,
          transition: "opacity 200ms ease-out",
        }}
      />

      {/* Modal Dialog Card */}
      <div
        ref={contentRef}
        aria-describedby={descriptionId}
        aria-label={ariaLabel}
        aria-labelledby={titleId}
        tabIndex={-1}
        {...props}
        className={className}
        style={{
          position: "relative",
          zIndex: 1001,
          width: typeof width === "number" ? `${width}px` : width,
          maxWidth: "100%",
          backgroundColor: "var(--x-surface)",
          border: "1px solid var(--x-border)",
          borderRadius: "var(--x-radius-surface, 16px)",
          padding: "28px",
          color: "var(--x-text)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          transformOrigin: "center center",
          transform: isEntered ? "scale(1)" : "scale(0.96)",
          opacity: isEntered ? 1 : 0,
          transition:
            "transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out",
          outline: "none",
          ...style,
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogHeader({
  children,
  className,
  style,
  ...props
}: WebDialogHeaderProps) {
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

export function DialogTitle({
  children,
  className,
  style,
  ...props
}: WebDialogTitleProps) {
  const { titleId } = useDialog();
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

export function DialogDescription({
  children,
  className,
  style,
  ...props
}: WebDialogDescriptionProps) {
  const { descriptionId } = useDialog();
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

export function DialogFooter({
  children,
  className,
  style,
  ...props
}: WebDialogFooterProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "12px",
        marginTop: "8px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function DialogClose({
  asChild,
  children,
  onClick,
  ...props
}: WebDialogCloseProps) {
  const { setOpen } = useDialog();

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
