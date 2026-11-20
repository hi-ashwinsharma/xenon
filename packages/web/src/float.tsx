"use client";

import { useRef, type CSSProperties, type ReactElement } from "react";
import { useLoopGuard } from "./hooks/use-loop-guard";
import { LoopPause } from "./loop-pause";
import type { WebFloatProps } from "./web.types";

const FLOAT_CSS = `
.x-float {
  position: relative;
}
.x-float__body[data-x-autoplay="true"] {
  animation: x-float-bob calc(var(--x-dur-slow) * var(--x-float-beats, 16))
    var(--x-ease-standard) calc(var(--x-dur-slow) * var(--x-float-offset, 0) * -1)
    infinite;
  animation-play-state: paused;
}
.x-float__body[data-x-running="true"] {
  animation-play-state: running;
}
.x-float__control {
  position: absolute;
  right: 0;
  bottom: 0;
}
@keyframes x-float-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(calc(var(--x-space-2) * -1));
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-float__body[data-x-autoplay="true"] {
    animation: none;
  }
}
`;

/**
 * Showcase pages only: lets its child bob gently in place when `autoplay` is on. Guarded:
 * pauses offscreen and on hidden tabs, off under reduced motion, with a pause control.
 */
export function Float({
  autoplay = false,
  beats = 16,
  offset = 0,
  children,
  className,
  style,
  ...restProps
}: WebFloatProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const guard = useLoopGuard(ref, autoplay);

  return (
    <>
      <style href="x-float" precedence="default">
        {FLOAT_CSS}
      </style>
      <div
        ref={ref}
        className={className ? `x-float ${className}` : "x-float"}
        style={
          {
            "--x-float-beats": Math.max(1, Math.round(beats)),
            "--x-float-offset": Math.max(0, Math.round(offset)),
            ...style,
          } as CSSProperties
        }
        {...restProps}
      >
        <div
          className="x-float__body"
          data-x-autoplay={autoplay ? "true" : "false"}
          data-x-running={guard.running ? "true" : "false"}
        >
          {children}
        </div>
        {guard.showControl && (
          <span className="x-float__control">
            <LoopPause paused={guard.paused} onToggle={guard.togglePaused} />
          </span>
        )}
      </div>
    </>
  );
}
