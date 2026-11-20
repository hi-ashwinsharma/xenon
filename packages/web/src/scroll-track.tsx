"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { damp } from "@xenon/core";
import { addScrollTask } from "./scroll-ticker";
import { useMediaQuery, useReducedMotion } from "./hooks/use-media-query";
import type { WebScrollTrackProps } from "./web.types";

const SCROLL_TRACK_CSS = `
.x-scroll-track__frame {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--x-space-6);
  overflow: hidden;
}
.x-scroll-track__row {
  display: flex;
  gap: var(--x-space-5);
  width: max-content;
  padding-inline: var(--x-space-6);
  will-change: transform;
}
.x-scroll-track__row > * {
  flex: none;
}
.x-scroll-track[data-x-mode="swipe"] .x-scroll-track__frame {
  position: static;
  height: auto;
  overflow: visible;
}
.x-scroll-track[data-x-mode="swipe"] .x-scroll-track__viewport {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.x-scroll-track[data-x-mode="swipe"] .x-scroll-track__viewport::-webkit-scrollbar {
  display: none;
}
.x-scroll-track[data-x-mode="swipe"] .x-scroll-track__row > * {
  scroll-snap-align: center;
}
.x-scroll-track__bar {
  align-self: center;
  width: min(calc(var(--x-space-10) * 2.5), 60vw);
  height: var(--x-border-width);
  background-color: var(--x-border);
  overflow: hidden;
}
.x-scroll-track__bar > i {
  display: block;
  height: 100%;
  background-color: var(--x-accent);
  transform: scaleX(0);
  transform-origin: left;
}
`;

const DAMPING = 9;

/**
 * Turns vertical scroll into sideways travel: the row pins to the viewport and slides
 * across as the reader scrolls. Narrow screens and reduced motion get a native swipe row.
 */
export function ScrollTrack({
  children,
  label = "Scrolling row",
  className,
  style,
  ...restProps
}: WebScrollTrackProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const [travel, setTravel] = useState<number>(0);
  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useReducedMotion();
  const pinned = wide && !reduced;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const measure = (): void =>
      setTravel(Math.max(0, row.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return undefined;
    let shown = -1;
    let target = 0;
    return addScrollTask({
      read: (delta) => {
        const node = ref.current;
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        const range = rect.height - window.innerHeight;
        target = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
        if (shown < 0) shown = target;
        else shown = damp(shown, target, DAMPING, delta);
        if (Math.abs(target - shown) < 0.0005) shown = target;
        return shown !== target;
      },
      write: () => {
        if (rowRef.current) {
          rowRef.current.style.transform = `translate3d(${(-shown * travel).toFixed(1)}px, 0, 0)`;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${shown})`;
        }
      },
    });
  }, [pinned, travel]);

  useEffect(() => {
    if (pinned) {
      return undefined;
    }
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    if (rowRef.current) rowRef.current.style.transform = "";
    const update = (): void => {
      const range = viewport.scrollWidth - viewport.clientWidth;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${range > 0 ? viewport.scrollLeft / range : 0})`;
      }
    };
    update();
    viewport.addEventListener("scroll", update, { passive: true });
    return () => viewport.removeEventListener("scroll", update);
  }, [pinned]);

  return (
    <>
      <style href="x-scroll-track" precedence="default">
        {SCROLL_TRACK_CSS}
      </style>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className={className ? `x-scroll-track ${className}` : "x-scroll-track"}
        data-x-mode={pinned ? "pinned" : "swipe"}
        style={{
          height: pinned ? `calc(100svh + ${travel * 1.1}px)` : undefined,
          ...style,
        }}
        {...restProps}
      >
        <div className="x-scroll-track__frame">
          <div
            ref={viewportRef}
            className="x-scroll-track__viewport"
            tabIndex={pinned ? undefined : 0}
          >
            <div ref={rowRef} className="x-scroll-track__row">
              {children}
            </div>
          </div>
          <span className="x-scroll-track__bar" aria-hidden="true">
            <i ref={barRef} />
          </span>
        </div>
      </div>
    </>
  );
}
