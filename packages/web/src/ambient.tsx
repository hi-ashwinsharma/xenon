"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { useFinePointer, useReducedMotion } from "./hooks/use-media-query";
import type { WebAmbientProps } from "./web.types";

const AMBIENT_CSS = `
.x-ambient {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  contain: strict;
}
.x-ambient__shape {
  position: absolute;
  width: var(--x-ambient-size);
  height: var(--x-ambient-size);
  border-radius: 50%;
  background: var(--x-ambient-shape);
  transform: translate3d(var(--x-ambient-x, 0px), var(--x-ambient-y, 0px), 0);
  transition: transform calc(var(--x-dur-slow) * 7) var(--x-ease-standard);
}
.x-ambient[data-x-placement="corners"] .x-ambient__shape[data-x-shape="1"] {
  left: calc(var(--x-ambient-size) * -0.3);
  top: calc(var(--x-ambient-size) * -0.45);
}
.x-ambient[data-x-placement="corners"] .x-ambient__shape[data-x-shape="2"] {
  right: calc(var(--x-ambient-size) * -0.35);
  bottom: calc(var(--x-ambient-size) * -0.45);
}
.x-ambient[data-x-placement="top"] .x-ambient__shape[data-x-shape="1"] {
  left: calc(50% - var(--x-ambient-size) * 0.85);
  top: calc(var(--x-ambient-size) * -0.55);
}
.x-ambient[data-x-placement="top"] .x-ambient__shape[data-x-shape="2"] {
  left: calc(50% - var(--x-ambient-size) * 0.15);
  top: calc(var(--x-ambient-size) * -0.6);
}
@media (prefers-reduced-motion: reduce) {
  .x-ambient__shape {
    transition: none;
    transform: none;
  }
}
@media (prefers-reduced-transparency: reduce) {
  .x-ambient {
    visibility: hidden;
  }
}
`;

/**
 * Showcase pages only: one soft, accent-tinted backdrop behind the whole page, the single
 * gradient Xenon allows. It never animates on a timer; the shapes lean after a mouse or
 * trackpad pointer and rest when it rests. See "Showcase exceptions" in docs/DESIGN.md.
 */
export function Ambient({
  placement = "corners",
  className,
  ...restProps
}: WebAmbientProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !fine || reduced) return undefined;
    let frame: number | null = null;
    let x = 0;
    let y = 0;
    const write = (): void => {
      frame = null;
      const shapes = node.querySelectorAll<HTMLElement>(".x-ambient__shape");
      shapes.forEach((shape, index) => {
        const direction = index === 0 ? 1 : -0.8;
        shape.style.setProperty(
          "--x-ambient-x",
          `calc(var(--x-ambient-drift) * ${(x * direction).toFixed(3)})`,
        );
        shape.style.setProperty(
          "--x-ambient-y",
          `calc(var(--x-ambient-drift) * ${(y * direction * 0.75).toFixed(3)})`,
        );
      });
    };
    const onMove = (event: PointerEvent): void => {
      x = event.clientX / window.innerWidth - 0.5;
      y = event.clientY / window.innerHeight - 0.5;
      if (frame === null) frame = window.requestAnimationFrame(write);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  return (
    <>
      <style href="x-ambient" precedence="default">
        {AMBIENT_CSS}
      </style>
      <div
        ref={ref}
        aria-hidden="true"
        className={className ? `x-ambient ${className}` : "x-ambient"}
        data-x-placement={placement}
        {...restProps}
      >
        <i className="x-ambient__shape" data-x-shape="1" />
        <i className="x-ambient__shape" data-x-shape="2" />
      </div>
    </>
  );
}
