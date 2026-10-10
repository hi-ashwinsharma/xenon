"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast, type ToastItem, type ToastPlacement } from "@xenon/core";
import { usePresence } from "./hooks/use-presence";
import type { WebToastProps, WebToastProviderProps } from "./web.types";

const toneIcons = {
  success: (
    <svg fill="none" height="16" stroke="#30d158" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
      <circle cx="8" cy="8" r="6.5" />
      <polyline points="5.5 8 7 9.5 10.5 6.5" />
    </svg>
  ),
  danger: (
    <svg fill="none" height="16" stroke="#ff453a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
      <circle cx="8" cy="8" r="6.5" />
      <line x1="8" x2="8" y1="5.5" y2="8.5" />
      <line x1="8" x2="8.01" y1="10.5" y2="10.5" />
    </svg>
  ),
  warning: (
    <svg fill="none" height="16" stroke="#ffd60a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
      <polygon points="8 2 1.5 14 14.5 14" />
      <line x1="8" x2="8" y1="6" y2="9.5" />
      <line x1="8" x2="8.01" y1="12" y2="12" />
    </svg>
  ),
  info: (
    <svg fill="none" height="16" stroke="#64d2ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
      <circle cx="8" cy="8" r="6.5" />
      <line x1="8" x2="8" y1="11" y2="8" />
      <line x1="8" x2="8.01" y1="5.5" y2="5.5" />
    </svg>
  ),
  accent: (
    <svg fill="none" height="16" stroke="var(--x-accent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
      <circle cx="8" cy="8" r="6.5" />
      <polyline points="5.5 8 7 9.5 10.5 6.5" />
    </svg>
  ),
};

export function Toast({
  open = true,
  onOpenChange,
  title,
  description,
  tone = "neutral",
  icon,
  action,
  durationMs = 4000,
  dismissible = true,
  onDismiss,
  children,
  className,
  style,
  ...props
}: WebToastProps) {
  const { isMounted, status } = usePresence({ open, durationMs: 200 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open && durationMs > 0) {
      timerRef.current = setTimeout(() => {
        onOpenChange?.(false);
        onDismiss?.();
      }, durationMs);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open, durationMs, onOpenChange, onDismiss]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    if (open && durationMs > 0) {
      timerRef.current = setTimeout(() => {
        onOpenChange?.(false);
        onDismiss?.();
      }, durationMs);
    }
  };

  const handleDismiss = () => {
    onOpenChange?.(false);
    onDismiss?.();
  };

  if (!isMounted) return null;

  const isEntered = status === "entered";
  const defaultIcon = tone !== "neutral" ? toneIcons[tone as keyof typeof toneIcons] : null;
  const renderedIcon = icon !== undefined ? icon : defaultIcon;

  return (
    <div
      role="status"
      {...props}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "10px 14px",
        minWidth: "280px",
        maxWidth: "420px",
        backgroundColor: "var(--x-glass-regular-tint)",
        backdropFilter: "blur(var(--x-glass-regular-blur))",
        WebkitBackdropFilter: "blur(var(--x-glass-regular-blur))",
        border: "1px solid var(--x-border)",
        borderRadius: "var(--x-radius-control, 12px)",
        color: "var(--x-text)",
        boxSizing: "border-box",
        transform: isEntered ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
        opacity: isEntered ? 1 : 0,
        transition:
          "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
        {renderedIcon && (
          <span style={{ display: "inline-flex", flexShrink: 0 }}>
            {renderedIcon}
          </span>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "var(--x-text)",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>
          )}
          {description && (
            <div
              style={{
                fontSize: "0.8125rem",
                fontWeight: 300,
                color: "var(--x-text-muted)",
                marginTop: "2px",
              }}
            >
              {description}
            </div>
          )}
          {children}
        </div>
      </div>

      {action && (
        <button
          onClick={() => {
            action.onClick();
            handleDismiss();
          }}
          style={{
            background: "var(--x-surface-2)",
            border: "1px solid var(--x-border)",
            borderRadius: "var(--x-radius-joint, 6px)",
            padding: "4px 8px",
            fontSize: "12px",
            fontWeight: 400,
            color: "var(--x-text)",
            cursor: "pointer",
            flexShrink: 0,
            outline: "none",
          }}
          type="button"
        >
          {action.label}
        </button>
      )}

      {dismissible && (
        <button
          aria-label="Dismiss toast"
          onClick={handleDismiss}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--x-text-muted)",
            cursor: "pointer",
            padding: "2px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--x-radius-joint, 4px)",
            opacity: 0.65,
            flexShrink: 0,
            outline: "none",
          }}
          type="button"
        >
          <svg fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="12">
            <line x1="4" x2="12" y1="4" y2="12" />
            <line x1="12" x2="4" y1="4" y2="12" />
          </svg>
        </button>
      )}
    </div>
  );
}

function getPlacementStyles(placement: ToastPlacement): React.CSSProperties {
  switch (placement) {
    case "top-center":
      return { top: "24px", left: "50%", transform: "translateX(-50%)" };
    case "top-end":
      return { top: "24px", right: "24px" };
    case "bottom-end":
      return { bottom: "24px", right: "24px" };
    case "bottom-center":
    default:
      return { bottom: "24px", left: "50%", transform: "translateX(-50%)" };
  }
}

export function ToastProvider({
  placement = "bottom-center",
  maxToasts = 5,
  children,
}: WebToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    toast.setMaxToasts(maxToasts);
    const unsub = toast.subscribe((updated) => {
      setToasts(updated);
    });
    return unsub;
  }, [maxToasts]);

  return (
    <>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            role="region"
            style={{
              position: "fixed",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              pointerEvents: "none",
              ...getPlacementStyles(placement),
            }}
          >
            {toasts.map((t) => (
              <Toast
                action={t.action}
                description={t.description}
                dismissible={t.dismissible ?? true}
                durationMs={t.durationMs ?? 4000}
                icon={t.icon}
                key={t.id}
                onDismiss={() => toast.dismiss(t.id)}
                open={true}
                title={t.title}
                tone={t.tone ?? "neutral"}
              />
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

export { toast };
