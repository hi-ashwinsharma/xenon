import { useCallback } from "react";
import type { CircleRevealOrigin, CircleRevealRun } from "@xenon/core";

/**
 * React Native has no View Transitions, so the change applies directly and relies on
 * the provider's colour crossfade. Same signature as the web hook.
 */
export function useCircleReveal(): CircleRevealRun {
  return useCallback((update: () => void, _origin?: CircleRevealOrigin) => {
    update();
  }, []);
}
