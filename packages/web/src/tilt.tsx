"use client";

import { useRef, type PointerEvent, type ReactElement } from "react";
import { tiltAngles } from "@xenon/core";
import { useFinePointer, useReducedMotion } from "./hooks/use-media-query";
import type { WebTiltProps } from "./web.types";

const TILT_CSS = `
.x-tilt {
  transform: perspective(calc(var(--x-space-10) * 9)) rotateX(var(--x-tilt-x, 0deg))
    rotateY(var(--x-tilt-y, 0deg));
  transition: transform calc(var(--x-dur-slow) * 1.75) var(--x-ease-standard);
}
`;

/** Turns its child a few degrees toward a mouse or trackpad pointer, as if lit from the cursor. */
export function Tilt({
  maxTilt = 3,
  children,
  className,
  onPointerMove,
  onPointerLeave,
  ...restProps
}: WebTiltProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const handleMove = (event: PointerEvent<HTMLDivElement>): void => {
    onPointerMove?.(event);
    const node = ref.current;
    if (!active || !node) return;
    const rect = node.getBoundingClientRect();
    const angles = tiltAngles(
      (event.clientX - rect.left) / rect.width,
      (event.clientY - rect.top) / rect.height,
      maxTilt,
    );
    node.style.setProperty("--x-tilt-x", `${angles.rotateX.toFixed(2)}deg`);
    node.style.setProperty("--x-tilt-y", `${angles.rotateY.toFixed(2)}deg`);
  };

  const handleLeave = (event: PointerEvent<HTMLDivElement>): void => {
    onPointerLeave?.(event);
    ref.current?.style.removeProperty("--x-tilt-x");
    ref.current?.style.removeProperty("--x-tilt-y");
  };

  return (
    <>
      <style href="x-tilt" precedence="default">
        {TILT_CSS}
      </style>
      <div
        ref={ref}
        className={className ? `x-tilt ${className}` : "x-tilt"}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        {...restProps}
      >
        {children}
      </div>
    </>
  );
}
