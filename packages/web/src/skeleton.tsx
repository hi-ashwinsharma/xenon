"use client";

import React from "react";
import type { WebSkeletonProps } from "./web.types";

export function Skeleton({
  variant = "rect",
  width,
  height,
  radius,
  animate = true,
  className,
  style,
  ...props
}: WebSkeletonProps) {
  let resolvedHeight = height;
  let resolvedWidth = width;
  let resolvedRadius = radius;

  if (variant === "text") {
    resolvedHeight = height ?? "14px";
    resolvedRadius = radius ?? "var(--x-radius-joint, 4px)";
  } else if (variant === "circle") {
    resolvedHeight = height ?? "36px";
    resolvedWidth = width ?? resolvedHeight;
    resolvedRadius = "9999px";
  } else {
    // rect
    resolvedRadius = radius ?? "var(--x-radius-control, 8px)";
  }

  return (
    <>
      {animate && (
        <style>{`
          @keyframes x-skeleton-pulse {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 0.85; }
          }
        `}</style>
      )}
      <div
        aria-hidden="true"
        {...props}
        className={className}
        style={{
          width: resolvedWidth ?? "100%",
          height: resolvedHeight ?? "20px",
          backgroundColor: "var(--x-surface-2)",
          borderRadius: resolvedRadius,
          animation: animate ? "x-skeleton-pulse 1.8s ease-in-out infinite" : "none",
          boxSizing: "border-box",
          ...style,
        }}
      />
    </>
  );
}
