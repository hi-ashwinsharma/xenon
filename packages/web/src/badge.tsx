"use client";

import React from "react";
import { formatBadgeCount } from "@xenon/core";
import type { WebBadgeProps } from "./web.types";

const toneColorMap = {
  neutral: {
    text: "var(--x-text-muted)",
    bg: "var(--x-surface-2)",
    border: "var(--x-border)",
    dot: "var(--x-text-muted)",
  },
  accent: {
    text: "var(--x-accent)",
    bg: "var(--x-surface-2)",
    border: "var(--x-accent)",
    dot: "var(--x-accent)",
  },
  info: {
    text: "#64d2ff",
    bg: "rgba(100, 210, 255, 0.1)",
    border: "rgba(100, 210, 255, 0.3)",
    dot: "#64d2ff",
  },
  success: {
    text: "#30d158",
    bg: "rgba(48, 209, 88, 0.1)",
    border: "rgba(48, 209, 88, 0.3)",
    dot: "#30d158",
  },
  warning: {
    text: "#ffd60a",
    bg: "rgba(255, 214, 10, 0.1)",
    border: "rgba(255, 214, 10, 0.3)",
    dot: "#ffd60a",
  },
  danger: {
    text: "#ff453a",
    bg: "rgba(255, 69, 58, 0.1)",
    border: "rgba(255, 69, 58, 0.3)",
    dot: "#ff453a",
  },
};

export function Badge({
  variant = "subtle",
  tone = "neutral",
  size = "md",
  count,
  maxCount = 99,
  dot = false,
  icon,
  children,
  className,
  style,
  ...props
}: WebBadgeProps) {
  const isDotOnly = dot && children === undefined && count === undefined;
  const colors = toneColorMap[tone] ?? toneColorMap.neutral;

  const isSm = size === "sm";
  const height = isDotOnly ? (isSm ? "6px" : "8px") : isSm ? "20px" : "24px";
  const minWidth = isDotOnly ? (isSm ? "6px" : "8px") : height;
  const padding = isDotOnly ? "0" : isSm ? "0 8px" : "0 10px";
  const fontSize = isSm ? "11px" : "12px";

  let background = colors.bg;
  let borderColor = "transparent";
  let textColor = colors.text;

  if (variant === "outline") {
    background = "transparent";
    borderColor = colors.border;
  } else if (variant === "accent") {
    background = "var(--x-surface-2)";
    borderColor = "var(--x-accent)";
    textColor = "var(--x-accent)";
  } else if (variant === "dot") {
    background = "transparent";
    borderColor = "transparent";
  }

  const content =
    count !== undefined ? formatBadgeCount(count, maxCount) : children;

  return (
    <span
      {...props}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        height,
        minWidth,
        padding,
        borderRadius: "9999px",
        backgroundColor: background,
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontSize,
        fontWeight: 400,
        fontFamily: count !== undefined ? "var(--x-font-family-mono, monospace)" : "inherit",
        letterSpacing: count !== undefined ? "0.02em" : "-0.01em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        boxSizing: "border-box",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Status Dot */}
      {dot && !isDotOnly && (
        <span
          style={{
            display: "inline-block",
            width: isSm ? "5px" : "6px",
            height: isSm ? "5px" : "6px",
            borderRadius: "9999px",
            backgroundColor: colors.dot,
            flexShrink: 0,
          }}
        />
      )}

      {icon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{icon}</span>}

      {content && <span>{content}</span>}
    </span>
  );
}
