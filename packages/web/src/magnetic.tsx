"use client";

import { useRef, type PointerEvent, type ReactElement } from "react";
import { magneticOffset } from "@xenon/core";
import { useFinePointer, useReducedMotion } from "./hooks/use-media-query";
import type { WebMagneticProps } from "./web.types";

const MAGNETIC_CSS = `
.x-magnetic {
  display: inline-block;
  transition: transform calc(var(--x-dur-slow) * 1.5) var(--x-ease-spring);
}
`;

/**
 * Leans its child toward a mouse or trackpad pointer and springs back on leave. Touch
 * and reduced motion get the child unchanged.
 */
export function Magnetic({
  strength = 0.22,
  children,
  className,
  onPointerMove,
  onPointerLeave,
  ...restProps
}: WebMagneticProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const handleMove = (event: PointerEvent<HTMLDivElement>): void => {
    onPointerMove?.(event);
    const node = ref.current;
    if (!active || !node) return;
    const rect = node.getBoundingClientRect();
    const offset = magneticOffset(
      event.clientX - rect.left,
      event.clientY - rect.top,
      rect.width,
      rect.height,
      strength,
    );
    node.style.transform = `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0)`;
  };

  const handleLeave = (event: PointerEvent<HTMLDivElement>): void => {
    onPointerLeave?.(event);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <>
      <style href="x-magnetic" precedence="default">
        {MAGNETIC_CSS}
      </style>
      <div
        ref={ref}
        className={className ? `x-magnetic ${className}` : "x-magnetic"}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        {...restProps}
      >
        {children}
      </div>
    </>
  );
}
