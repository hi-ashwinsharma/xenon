"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { MOTION_TOKENS } from "@xenon/tokens";
import { useLoopGuard } from "./hooks/use-loop-guard";
import { LoopPause } from "./loop-pause";
import type { WebTextRollProps } from "./web.types";

const TEXT_ROLL_CSS = `
.x-text-roll {
  display: inline-grid;
  overflow: hidden;
  vertical-align: bottom;
}
.x-text-roll__word {
  grid-area: 1 / 1;
  white-space: nowrap;
}
.x-text-roll__word[data-x-phase="in"] {
  animation: x-text-roll-in calc(var(--x-dur-slow) * 2) var(--x-ease-standard)
    var(--x-dur-fast) both;
}
.x-text-roll__word[data-x-phase="out"] {
  animation: x-text-roll-out var(--x-dur-slow) var(--x-ease-standard) forwards;
}
@keyframes x-text-roll-in {
  from {
    opacity: 0;
    transform: translateY(110%);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes x-text-roll-out {
  to {
    opacity: 0;
    transform: translateY(-110%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-text-roll__word[data-x-phase="in"] {
    animation: x-text-roll-fade var(--x-dur-instant) linear both;
  }
  .x-text-roll__word[data-x-phase="out"] {
    animation: none;
    opacity: 0;
  }
  @keyframes x-text-roll-fade {
    from {
      opacity: 0;
    }
  }
}
`;

interface RollState {
  readonly current: string;
  readonly previous: string | null;
  readonly generation: number;
}

/** A word that rolls up and out as its replacement rolls in from below whenever `value` changes. */
export function TextRoll({
  value,
  autoplayWords,
  beats = 6,
  className,
  ...restProps
}: WebTextRollProps): ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  const autoplay = (autoplayWords?.length ?? 0) > 0;
  const guard = useLoopGuard(ref, autoplay);
  const [tick, setTick] = useState<number>(0);
  const sequence = autoplay ? [value, ...(autoplayWords ?? [])] : [value];
  const shown = sequence[tick % sequence.length] ?? value;

  useEffect(() => {
    if (!guard.running) return undefined;
    const timer = window.setInterval(
      () => setTick((count) => count + 1),
      MOTION_TOKENS.durSlow * Math.max(1, Math.round(beats)),
    );
    return () => window.clearInterval(timer);
  }, [guard.running, beats]);

  const [roll, setRoll] = useState<RollState>({
    current: shown,
    previous: null,
    generation: 0,
  });

  // Derive the transition during render so the outgoing word never flashes away
  if (roll.current !== shown) {
    setRoll({
      current: shown,
      previous: roll.current,
      generation: roll.generation + 1,
    });
  }

  return (
    <>
      <style href="x-text-roll" precedence="default">
        {TEXT_ROLL_CSS}
      </style>
      <span
        ref={ref}
        className={className ? `x-text-roll ${className}` : "x-text-roll"}
        // An autoplay cycle would announce forever, so only value-driven rolls are live
        aria-live={autoplay ? "off" : "polite"}
        {...restProps}
      >
        {roll.previous !== null && (
          <span
            key={`out-${roll.generation}`}
            className="x-text-roll__word"
            data-x-phase="out"
            aria-hidden="true"
            onAnimationEnd={() =>
              setRoll((state) =>
                state.generation === roll.generation
                  ? { ...state, previous: null }
                  : state,
              )
            }
          >
            {roll.previous}
          </span>
        )}
        <span
          key={`in-${roll.generation}`}
          className="x-text-roll__word"
          data-x-phase={roll.generation === 0 ? "rest" : "in"}
        >
          {roll.current}
        </span>
      </span>
      {guard.showControl && (
        <LoopPause paused={guard.paused} onToggle={guard.togglePaused} />
      )}
    </>
  );
}
