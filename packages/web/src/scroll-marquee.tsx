"use client";

import { Fragment, useEffect, useRef, type ReactElement } from "react";
import { damp, wrapOffset } from "@xenon/core";
import { addScrollTask } from "./scroll-ticker";
import { useReducedMotion } from "./hooks/use-media-query";
import type { WebScrollMarqueeProps } from "./web.types";

const SCROLL_MARQUEE_CSS = `
.x-scroll-marquee {
  overflow: hidden;
  white-space: nowrap;
  padding-block: var(--x-space-5);
}
.x-scroll-marquee__track {
  display: inline-flex;
  will-change: transform;
}
.x-scroll-marquee__lap {
  display: inline-flex;
  align-items: center;
  gap: var(--x-space-6);
  padding-right: var(--x-space-6);
  font-size: var(--x-text-title1-size);
  line-height: var(--x-text-title1-lh);
  letter-spacing: var(--x-text-title1-tracking);
  font-weight: 200;
  color: var(--x-text-muted);
}
.x-scroll-marquee__dot {
  width: var(--x-space-1);
  height: var(--x-space-1);
  border-radius: 50%;
  background-color: var(--x-accent);
  flex: none;
}
`;

/** Skew per unit of scroll velocity (px/s), and the most it may lean, in degrees. */
const SKEW_PER_VELOCITY = 1 / 260;
const MAX_SKEW = 8;
const DAMPING = 8;

/**
 * A line of words that slides sideways only while the page scrolls, and leans with the
 * reader's speed. It never moves on its own, so it rests when the reader rests.
 */
export function ScrollMarquee({
  items,
  speed = 0.6,
  label = "Highlights",
  className,
  ...restProps
}: WebScrollMarqueeProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lapRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (trackRef.current) trackRef.current.style.transform = "";
      return undefined;
    }
    let lastY = window.scrollY;
    let offset = 0;
    let skew = 0;
    let visible = false;
    return addScrollTask({
      read: (delta) => {
        const node = ref.current;
        const lap = lapRef.current;
        if (!node || !lap) return false;
        const rect = node.getBoundingClientRect();
        visible = rect.bottom > 0 && rect.top < window.innerHeight;
        const y = window.scrollY;
        const moved = y - lastY;
        lastY = y;
        offset = wrapOffset(offset + moved * speed, lap.offsetWidth);
        const velocity = delta > 0 ? moved / delta : 0;
        const lean = Math.max(
          -MAX_SKEW,
          Math.min(MAX_SKEW, -velocity * SKEW_PER_VELOCITY),
        );
        skew = moved === 0 ? damp(skew, 0, DAMPING, delta) : lean;
        if (Math.abs(skew) < 0.01) skew = 0;
        return skew !== 0;
      },
      write: () => {
        if (!visible || !trackRef.current) return;
        trackRef.current.style.transform = `translate3d(${(-offset).toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      },
    });
  }, [reduced, speed]);

  const lap = (hidden: boolean): ReactElement => (
    <div
      ref={hidden ? undefined : lapRef}
      className="x-scroll-marquee__lap"
      aria-hidden={hidden ? "true" : undefined}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <span>{item}</span>
          <span className="x-scroll-marquee__dot" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <>
      <style href="x-scroll-marquee" precedence="default">
        {SCROLL_MARQUEE_CSS}
      </style>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className={
          className ? `x-scroll-marquee ${className}` : "x-scroll-marquee"
        }
        {...restProps}
      >
        <div ref={trackRef} className="x-scroll-marquee__track">
          {lap(false)}
          {lap(true)}
          {lap(true)}
        </div>
      </div>
    </>
  );
}
