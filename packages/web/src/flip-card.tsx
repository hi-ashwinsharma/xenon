"use client";

import {
  useState,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { ArrowsCounterClockwise } from "@phosphor-icons/react";
import { Icon } from "./icon";
import type { WebFlipCardProps } from "./web.types";

const FLIP_CARD_CSS = `
.x-flip-card {
  position: relative;
  perspective: calc(var(--x-space-10) * 11);
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
.x-flip-card__inner {
  position: relative;
  display: grid;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform calc(var(--x-dur-slow) * 2) var(--x-ease-spring);
}
.x-flip-card[data-x-flipped="true"] .x-flip-card__inner {
  transform: rotateY(180deg);
}
.x-flip-card__face {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: var(--x-space-3);
  padding: var(--x-space-5);
  border: var(--x-border-width) solid var(--x-border);
  border-radius: var(--x-radius-surface);
  background-color: var(--x-surface);
  color: var(--x-text);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: border-color var(--x-dur-base) var(--x-ease-standard);
}
.x-flip-card__face[data-x-face="back"] {
  transform: rotateY(180deg);
  background-color: var(--x-surface-2);
}
.x-flip-card__hint {
  position: absolute;
  top: var(--x-space-4);
  right: var(--x-space-4);
  color: var(--x-text-muted);
  transition: transform var(--x-dur-slow) var(--x-ease-spring);
}
.x-flip-card[data-x-flipped="true"] .x-flip-card__hint {
  transform: rotate(-180deg);
}
.x-flip-card:focus-visible .x-flip-card__face {
  border-color: var(--x-accent);
}
@media (hover: hover) {
  .x-flip-card:hover .x-flip-card__face {
    border-color: var(--x-border-active);
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-flip-card__inner,
  .x-flip-card[data-x-flipped="true"] .x-flip-card__inner {
    transform: none;
    transition: none;
  }
  .x-flip-card__face {
    transition: opacity var(--x-dur-instant) linear;
  }
  .x-flip-card__face[data-x-face="back"] {
    transform: none;
    opacity: 0;
  }
  .x-flip-card[data-x-flipped="true"] .x-flip-card__face[data-x-face="back"] {
    opacity: 1;
  }
  .x-flip-card[data-x-flipped="true"] .x-flip-card__face[data-x-face="front"] {
    opacity: 0;
  }
}
`;

/** A card that turns over on press or keyboard to reveal what is behind the headline. */
export function FlipCard({
  front,
  back,
  label,
  flipped,
  defaultFlipped = false,
  onFlippedChange,
  className,
  onClick,
  onKeyDown,
  ...restProps
}: WebFlipCardProps): ReactElement {
  const [innerFlipped, setInnerFlipped] = useState<boolean>(defaultFlipped);
  const isControlled = flipped !== undefined;
  const isFlipped = isControlled ? flipped : innerFlipped;

  const toggle = (): void => {
    const next = !isFlipped;
    if (!isControlled) setInnerFlipped(next);
    onFlippedChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <>
      <style href="x-flip-card" precedence="default">
        {FLIP_CARD_CSS}
      </style>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={label}
        className={className ? `x-flip-card ${className}` : "x-flip-card"}
        data-x-flipped={isFlipped ? "true" : "false"}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        <div className="x-flip-card__inner">
          <div
            className="x-flip-card__face"
            data-x-face="front"
            aria-hidden={isFlipped}
          >
            {front}
          </div>
          <div
            className="x-flip-card__face"
            data-x-face="back"
            aria-hidden={!isFlipped}
          >
            {back}
          </div>
        </div>
        <span className="x-flip-card__hint">
          <Icon size="sm">
            <ArrowsCounterClockwise />
          </Icon>
        </span>
      </div>
    </>
  );
}
