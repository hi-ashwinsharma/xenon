"use client";

import React from "react";
import type { WebAlertProps } from "./web.types";

const toneStyles = {
  neutral: {
    border: "var(--x-border)",
    bg: "var(--x-surface-2)",
    iconColor: "var(--x-text-muted)",
    titleColor: "var(--x-text)",
  },
  info: {
    border: "rgba(100, 210, 255, 0.25)",
    bg: "rgba(100, 210, 255, 0.05)",
    iconColor: "#64d2ff",
    titleColor: "var(--x-text)",
  },
  success: {
    border: "rgba(48, 209, 88, 0.25)",
    bg: "rgba(48, 209, 88, 0.05)",
    iconColor: "#30d158",
    titleColor: "var(--x-text)",
  },
  warning: {
    border: "rgba(255, 214, 10, 0.25)",
    bg: "rgba(255, 214, 10, 0.05)",
    iconColor: "#ffd60a",
    titleColor: "var(--x-text)",
  },
  danger: {
    border: "rgba(255, 69, 58, 0.25)",
    bg: "rgba(255, 69, 58, 0.05)",
    iconColor: "#ff453a",
    titleColor: "var(--x-text)",
  },
};

function renderDefaultIcon(tone: string) {
  switch (tone) {
    case "success":
      return (
        <svg
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case "warning":
      return (
        <svg
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" x2="12" y1="9" y2="13" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      );
    case "danger":
      return (
        <svg
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      );
    case "info":
    default:
      return (
        <svg
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="16" y2="12" />
          <line x1="12" x2="12.01" y1="8" y2="8" />
        </svg>
      );
  }
}

export function Alert({
  tone = "info",
  variant = "subtle",
  title,
  icon,
  action,
  onDismiss,
  dismissible = false,
  children,
  className,
  style,
  ...props
}: WebAlertProps) {
  const cfg = toneStyles[tone] ?? toneStyles.info;

  let backgroundColor = cfg.bg;
  let borderColor = cfg.border;

  if (variant === "outline") {
    backgroundColor = "transparent";
  } else if (variant === "surface") {
    backgroundColor = "var(--x-surface)";
    borderColor = "var(--x-border)";
  }

  const renderedIcon = icon !== undefined ? icon : renderDefaultIcon(tone);

  return (
    <div
      role="alert"
      {...props}
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        width: "100%",
        padding: "14px 16px",
        borderRadius: "var(--x-radius-control, 12px)",
        backgroundColor,
        border: `1px solid ${borderColor}`,
        color: "var(--x-text)",
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
    >
      {/* Semantic Icon */}
      {renderedIcon && (
        <span
          style={{
            display: "inline-flex",
            color: cfg.iconColor,
            flexShrink: 0,
            marginTop: "1px",
          }}
        >
          {renderedIcon}
        </span>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: 400,
              color: cfg.titleColor,
              letterSpacing: "-0.01em",
              marginBottom: children ? "4px" : "0",
            }}
          >
            {title}
          </div>
        )}

        {children && (
          <div
            style={{
              fontSize: "0.8125rem",
              fontWeight: 300,
              color: "var(--x-text-muted)",
              lineHeight: 1.5,
            }}
          >
            {children}
          </div>
        )}

        {action && <div style={{ marginTop: "10px" }}>{action}</div>}
      </div>

      {/* Dismiss Trigger */}
      {(dismissible || onDismiss) && (
        <button
          aria-label="Dismiss alert"
          onClick={onDismiss}
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
            opacity: 0.7,
            transition: "opacity 120ms ease",
            outline: "none",
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
    </div>
  );
}
