"use client";

import React from "react";
import type { WebSpinnerProps } from "./web.types";

const sizeMap = {
  sm: 14,
  md: 18,
  lg: 24,
};

const toneColors = {
  current: "currentColor",
  accent: "var(--x-accent)",
  muted: "var(--x-text-muted)",
};

export function Spinner({
  size = "md",
  tone = "current",
  label = "Loading",
  className,
  style,
  ...props
}: WebSpinnerProps) {
  const dimension = sizeMap[size] ?? sizeMap.md;
  const color = toneColors[tone] ?? toneColors.current;

  return (
    <>
      <style>{`
        @keyframes x-spinner-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span
        aria-label={label}
        role="status"
        {...props}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: `${dimension}px`,
          height: `${dimension}px`,
          color,
          animation: "x-spinner-spin 800ms linear infinite",
          verticalAlign: "middle",
          flexShrink: 0,
          ...style,
        }}
      >
        <svg
          fill="none"
          height={dimension}
          viewBox="0 0 24 24"
          width={dimension}
        >
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1.75"
          />
          <path
            d="M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75"
          />
        </svg>
      </span>
    </>
  );
}
