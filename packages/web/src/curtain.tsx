"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { MOTION_TOKENS } from "@xenon/tokens";
import type { WebCurtainProps } from "./web.types";

const CURTAIN_CSS = `
.x-curtain {
  position: fixed;
  inset: 0;
  z-index: 130;
  display: grid;
  place-items: center;
  background-color: var(--x-bg);
  color: var(--x-text);
  visibility: hidden;
  pointer-events: none;
  clip-path: inset(100% 0 0 0);
}
.x-curtain[data-x-phase="covering"],
.x-curtain[data-x-phase="covered"],
.x-curtain[data-x-phase="leaving"] {
  visibility: visible;
  pointer-events: auto;
  transition: clip-path calc(var(--x-dur-slow) * 1.6) var(--x-ease-standard);
}
.x-curtain[data-x-phase="covering"],
.x-curtain[data-x-phase="covered"] {
  clip-path: inset(0 0 0 0);
}
.x-curtain[data-x-phase="leaving"] {
  clip-path: inset(0 0 100% 0);
}
.x-curtain__title {
  margin: 0;
  padding: 0 var(--x-space-5);
  font-size: var(--x-text-display-size);
  line-height: var(--x-text-display-lh);
  letter-spacing: var(--x-text-display-tracking);
  font-weight: 200;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(70%);
  transition:
    opacity var(--x-dur-slow) var(--x-ease-standard),
    transform var(--x-dur-slow) var(--x-ease-standard);
}
.x-curtain[data-x-phase="covering"] .x-curtain__title,
.x-curtain[data-x-phase="covered"] .x-curtain__title {
  opacity: 1;
  transform: none;
  transition-delay: var(--x-dur-base);
}
.x-curtain[data-x-phase="leaving"] .x-curtain__title {
  opacity: 0;
  transform: translateY(-50%);
}
.x-curtain__bar {
  position: absolute;
  left: 50%;
  bottom: calc(var(--x-space-7) + env(safe-area-inset-bottom, 0px));
  width: var(--x-space-10);
  height: var(--x-border-width);
  transform: translateX(-50%);
  background-color: var(--x-border);
  overflow: hidden;
}
.x-curtain__bar > i {
  display: block;
  height: 100%;
  background-color: var(--x-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--x-dur-slow) var(--x-ease-standard);
}
.x-curtain[data-x-phase="covered"] .x-curtain__bar > i,
.x-curtain[data-x-phase="leaving"] .x-curtain__bar > i {
  transform: scaleX(1);
}
@media (prefers-reduced-motion: reduce) {
  .x-curtain,
  .x-curtain[data-x-phase] {
    clip-path: none;
    opacity: 0;
    transition: opacity var(--x-dur-instant) linear;
  }
  .x-curtain[data-x-phase="covering"],
  .x-curtain[data-x-phase="covered"] {
    opacity: 1;
  }
  .x-curtain__title,
  .x-curtain__bar > i {
    transition: none;
    transform: none;
  }
}
`;

type CurtainPhase = "idle" | "covering" | "covered" | "leaving";

/**
 * A full-screen wipe for route changes: it rises over the page, names the destination
 * while covered so the content can swap unseen, then lifts away.
 */
export function Curtain({
  active,
  title,
  onCovered,
  onFinished,
  className,
  ...restProps
}: WebCurtainProps): ReactElement {
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const callbacks = useRef({ onCovered, onFinished });
  callbacks.current = { onCovered, onFinished };

  useEffect(() => {
    if (active && phase === "idle") setPhase("covering");
  }, [active, phase]);

  useEffect(() => {
    if (phase !== "covered") return undefined;
    callbacks.current.onCovered?.();
    // Hold the cover long enough for the new screen to paint underneath
    const hold = window.setTimeout(
      () => setPhase("leaving"),
      MOTION_TOKENS.durSlow,
    );
    return () => window.clearTimeout(hold);
  }, [phase]);

  useEffect(() => {
    if (phase !== "covering" && phase !== "leaving") return undefined;
    // Failsafe: a tab switch can swallow transitionend, so never strand the page covered
    const failsafe = window.setTimeout(
      () => {
        if (phase === "covering") setPhase("covered");
        else {
          setPhase("idle");
          callbacks.current.onFinished?.();
        }
      },
      MOTION_TOKENS.durSlow * 4,
    );
    return () => window.clearTimeout(failsafe);
  }, [phase]);

  const handleTransitionEnd = (propertyName: string): void => {
    if (propertyName !== "clip-path" && propertyName !== "opacity") return;
    if (phase === "covering") setPhase("covered");
    else if (phase === "leaving") {
      setPhase("idle");
      callbacks.current.onFinished?.();
    }
  };

  return (
    <>
      <style href="x-curtain" precedence="default">
        {CURTAIN_CSS}
      </style>
      <div
        aria-hidden="true"
        className={className ? `x-curtain ${className}` : "x-curtain"}
        data-x-phase={phase}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget) {
            handleTransitionEnd(event.propertyName);
          }
        }}
        {...restProps}
      >
        {title && <p className="x-curtain__title">{title}</p>}
        <span className="x-curtain__bar">
          <i />
        </span>
      </div>
    </>
  );
}
