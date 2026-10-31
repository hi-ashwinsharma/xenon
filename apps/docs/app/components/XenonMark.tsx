import React, { type ReactElement } from "react";

interface XenonMarkProps {
  size?: number;
}

/** Two crossing hairline arcs that form an X inside the concentric square. */
export function XenonMark({ size = 20 }: XenonMarkProps): ReactElement {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
    >
      <rect
        height="31"
        rx="9"
        stroke="var(--x-border-active)"
        width="31"
        x="0.5"
        y="0.5"
      />
      <path
        d="M8 8c5 2 11 14 16 16"
        stroke="var(--x-accent)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M24 8C19 10 13 22 8 24"
        stroke="var(--x-text)"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
