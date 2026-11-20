"use client";

import { useState, type ReactElement } from "react";
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
  className,
  ...restProps
}: WebTextRollProps): ReactElement {
  const [roll, setRoll] = useState<RollState>({
    current: value,
    previous: null,
    generation: 0,
  });

  // Derive the transition during render so the outgoing word never flashes away
  if (roll.current !== value) {
    setRoll({
      current: value,
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
        className={className ? `x-text-roll ${className}` : "x-text-roll"}
        aria-live="polite"
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
    </>
  );
}
