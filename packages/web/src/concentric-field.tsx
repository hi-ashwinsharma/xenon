"use client";

import { type ReactElement } from "react";
import type { WebConcentricFieldProps } from "./web.types";

const FIELD_CSS = `
.x-concentric-ring {
  position: absolute;
  pointer-events: none;
  border: 1px solid var(--x-border-active);
  animation: x-concentric-in var(--x-dur-slow) var(--x-ease-spring) both;
  transition: border-radius var(--x-dur-base) var(--x-ease-standard);
}
@keyframes x-concentric-in {
  from { opacity: 0; transform: scale(0.97); }
}
@media (prefers-reduced-motion: reduce) {
  .x-concentric-ring { animation: none; }
}
`;

/** Hairline rings radiating from the child, each corner sharing its center. */
export function ConcentricField({
  rings = 6,
  gap = 40,
  children,
  style,
  ...restProps
}: WebConcentricFieldProps): ReactElement {
  return (
    <div style={{ position: "relative", ...style }} {...restProps}>
      <style href="x-concentric-field" precedence="default">
        {FIELD_CSS}
      </style>
      {Array.from({ length: rings }, (_, index) => {
        const step = index + 1;
        return (
          <span
            key={step}
            aria-hidden="true"
            className="x-concentric-ring"
            style={{
              inset: `${-step * gap}px`,
              borderRadius: `calc(var(--x-radius-surface) + ${step * gap}px)`,
              opacity: 1 - index / rings,
              animationDelay: `calc(var(--x-dur-instant) * ${step})`,
            }}
          />
        );
      })}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
