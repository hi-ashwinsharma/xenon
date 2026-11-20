"use client";

import { useEffect, useRef, type CSSProperties, type ReactElement } from "react";
import { damp, liquidSurface, viewportProgress } from "@xenon/core";
import { addScrollTask } from "./scroll-ticker";
import { useReducedMotion } from "./hooks/use-media-query";
import type { WebLiquidTextProps } from "./web.types";

/** A single wave tile: the liquid surface repeats along x and fills everything under it. */
const WAVE_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='1200' viewBox='0 0 600 1200' preserveAspectRatio='none'%3E%3Cpath d='M0 40 C75 10 150 10 225 40 S375 70 450 40 S560 10 600 40 V1200 H0Z' fill='%23000'/%3E%3C/svg%3E\")";

const LIQUID_TEXT_CSS = `
.x-liquid-text {
  position: relative;
  display: inline-block;
  max-width: 100%;
  font-size: clamp(
    var(--x-text-display-size),
    12vw,
    calc(var(--x-text-display-size) * 3.5)
  );
  line-height: 0.9;
  letter-spacing: -0.05em;
  font-weight: 200;
  white-space: nowrap;
  user-select: none;
}
.x-liquid-text__outline {
  display: block;
  color: transparent;
  -webkit-text-stroke: var(--x-border-width) var(--x-border-active);
}
.x-liquid-text__fill {
  position: absolute;
  inset: 0;
  display: block;
  color: var(--x-accent);
  -webkit-mask: ${WAVE_MASK} var(--x-liquid-x, 0px) var(--x-liquid-y, 1em) / 600px 220% repeat-x;
  mask: ${WAVE_MASK} var(--x-liquid-x, 0px) var(--x-liquid-y, 1em) / 600px 220% repeat-x;
}
.x-liquid-text[data-x-controlled="true"] .x-liquid-text__fill {
  transition:
    -webkit-mask-position calc(var(--x-dur-slow) * 2) var(--x-ease-standard),
    mask-position calc(var(--x-dur-slow) * 2) var(--x-ease-standard);
}
`;

/** The fill box is one line tall at line-height 0.9, so the surface sits in em. */
function surfaceOffset(level: number): string {
  return `${(liquidSurface(level) * 0.9).toFixed(4)}em`;
}

/** Higher settles faster. Matches ScrollScene so the liquid never jumps on a fast scroll. */
const DAMPING = 7;

/** A wordmark drawn as a hairline outline that fills with the accent like a rising liquid. */
export function LiquidText({
  children,
  progress,
  className,
  style,
  ...restProps
}: WebLiquidTextProps): ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const controlled = progress !== undefined;

  useEffect(() => {
    if (controlled) return undefined;
    let shown = -1;
    let target = 0;
    let wave = 0;
    return addScrollTask({
      read: (delta) => {
        const node = ref.current;
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        target = viewportProgress(rect.top, window.innerHeight, 0.95, 0.3);
        if (reduced) target = target > 0.5 ? 1 : 0;
        // The wave drifts with the reader's scroll, so it rests when they rest
        wave = -window.scrollY * 0.35;
        if (shown < 0 || reduced) shown = target;
        else shown = damp(shown, target, DAMPING, delta);
        if (Math.abs(target - shown) < 0.0005) shown = target;
        return shown !== target;
      },
      write: () => {
        const fill = fillRef.current;
        if (!fill) return;
        fill.style.setProperty(
          "--x-liquid-y",
          surfaceOffset(shown),
        );
        fill.style.setProperty("--x-liquid-x", `${wave.toFixed(1)}px`);
      },
    });
  }, [controlled, reduced]);

  const fillStyle = controlled
    ? ({
        "--x-liquid-y": surfaceOffset(progress),
      } as CSSProperties)
    : undefined;

  return (
    <>
      <style href="x-liquid-text" precedence="default">
        {LIQUID_TEXT_CSS}
      </style>
      <span
        ref={ref}
        className={className ? `x-liquid-text ${className}` : "x-liquid-text"}
        data-x-controlled={controlled ? "true" : "false"}
        style={style}
        {...restProps}
      >
        <span className="x-liquid-text__outline">{children}</span>
        <span
          ref={fillRef}
          className="x-liquid-text__fill"
          aria-hidden="true"
          style={fillStyle}
        >
          {children}
        </span>
      </span>
    </>
  );
}
