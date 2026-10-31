"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { addScrollTask } from "./scroll-ticker";
import type { WebScrollProgressProps } from "./web.types";

/** A one-pixel accent line showing how far through the page the reader is. */
export function ScrollProgress({
  label: _label,
  style,
  ...restProps
}: WebScrollProgressProps): ReactElement {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let value = 0;
    return addScrollTask({
      read: () => {
        const root = document.documentElement;
        const range = root.scrollHeight - window.innerHeight;
        value = range > 0 ? Math.min(1, window.scrollY / range) : 0;
        return false;
      },
      write: () => {
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${value})`;
        }
      },
    });
  }, []);

  return (
    <div
      ref={barRef}
      role="presentation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        height: "1px",
        backgroundColor: "var(--x-accent)",
        transform: "scaleX(0)",
        transformOrigin: "left",
        pointerEvents: "none",
        ...style,
      }}
      {...restProps}
    />
  );
}
