"use client";

import React from "react";
import { clampProgress } from "@xenon/core";
import type { WebProgressProps } from "./web.types";

const toneColors = {
  accent: "var(--x-accent)",
  neutral: "var(--x-text)",
  success: "#30d158",
  warning: "#ffd60a",
  danger: "#ff453a",
};

export function Progress({
  value = 0,
  indeterminate = false,
  size = "md",
  tone = "accent",
  ariaLabel = "Progress",
  className,
  style,
  ...props
}: WebProgressProps) {
  const height = size === "sm" ? "2px" : "4px";
  const fillColor = toneColors[tone] ?? toneColors.accent;
  const clampedValue = clampProgress(value);

  return (
    <>
      {indeterminate && (
        <style>{`
          @keyframes x-progress-indeterminate {
            0% { left: -35%; width: 35%; }
            50% { left: 35%; width: 50%; }
            100% { left: 100%; width: 35%; }
          }
        `}</style>
      )}

      <div
        aria-label={ariaLabel}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        role="progressbar"
        {...props}
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height,
          backgroundColor: "var(--x-surface-2)",
          borderRadius: "9999px",
          overflow: "hidden",
          boxSizing: "border-box",
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: indeterminate ? undefined : 0,
            width: indeterminate ? undefined : `${clampedValue}%`,
            backgroundColor: fillColor,
            borderRadius: "9999px",
            transition: indeterminate
              ? "none"
              : "width 240ms cubic-bezier(0.16, 1, 0.3, 1)",
            animation: indeterminate
              ? "x-progress-indeterminate 1.4s ease-in-out infinite"
              : "none",
          }}
        />
      </div>
    </>
  );
}
