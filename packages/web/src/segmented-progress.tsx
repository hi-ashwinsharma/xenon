"use client";

import { type ReactElement } from "react";
import { activeSegment, segmentFills } from "@xenon/core";
import type { WebSegmentedProgressProps } from "./web.types";

const SEGMENTED_PROGRESS_CSS = `
.x-segmented-progress {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: var(--x-space-1);
  min-width: calc(var(--x-space-10) * 1.5);
}
.x-segmented-progress__segment {
  height: var(--x-space-1);
  border-radius: var(--x-radius-joint);
  background-color: var(--x-border-active);
  overflow: hidden;
}
.x-segmented-progress__fill {
  display: block;
  height: 100%;
  background-color: var(--x-accent);
  transform-origin: left;
  transition: transform var(--x-dur-fast) var(--x-ease-standard);
}
@media (prefers-reduced-motion: reduce) {
  .x-segmented-progress__fill {
    transition: none;
  }
}
`;

/** A row of short tracks that fill one after another, for chapters, steps or story beats. */
export function SegmentedProgress({
  segments = 6,
  value,
  label = "Progress",
  className,
  ...restProps
}: WebSegmentedProgressProps): ReactElement {
  const fills = segmentFills(value, segments);
  const current = activeSegment(value, segments) + 1;

  return (
    <>
      <style href="x-segmented-progress" precedence="default">
        {SEGMENTED_PROGRESS_CSS}
      </style>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={fills.length}
        aria-valuenow={current}
        aria-valuetext={`${current} of ${fills.length}`}
        className={
          className
            ? `x-segmented-progress ${className}`
            : "x-segmented-progress"
        }
        {...restProps}
      >
        {fills.map((fill, index) => (
          <span key={index} className="x-segmented-progress__segment">
            <span
              className="x-segmented-progress__fill"
              style={{ transform: `scaleX(${fill})` }}
            />
          </span>
        ))}
      </div>
    </>
  );
}
