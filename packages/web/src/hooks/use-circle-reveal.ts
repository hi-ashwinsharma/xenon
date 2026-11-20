"use client";

import { useCallback } from "react";
import { MOTION_TOKENS } from "@xenon/tokens";
import { circleRevealRadius } from "@xenon/core";
import type { CircleRevealOrigin, CircleRevealRun } from "@xenon/core";

interface ViewTransitionLike {
  readonly ready: Promise<void>;
}

type StartViewTransition = (update: () => void) => ViewTransitionLike;

/**
 * Runs a theme, accent or content change behind a circle that grows from a point,
 * usually the control the person pressed. Falls back to an instant swap (with the
 * regular colour crossfade) where View Transitions or motion are unavailable.
 */
export function useCircleReveal(): CircleRevealRun {
  return useCallback((update: () => void, origin?: CircleRevealOrigin) => {
    const start = (
      document as Document & { startViewTransition?: StartViewTransition }
    ).startViewTransition;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!start || reduced) {
      update();
      return;
    }
    const centre = origin ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const radius = circleRevealRadius(
      centre,
      window.innerWidth,
      window.innerHeight,
    );
    const transition = start.call(document, update);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${centre.x}px ${centre.y}px)`,
              `circle(${radius}px at ${centre.x}px ${centre.y}px)`,
            ],
          },
          {
            duration: MOTION_TOKENS.durSlow * 2.4,
            easing: MOTION_TOKENS.easeStandard,
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => undefined);
  }, []);
}
