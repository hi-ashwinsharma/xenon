import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";
import { useMotionEnv } from "./use-motion-env";

export interface LoopGuard {
  /** True only while the app is active, motion is allowed and the loop is not paused */
  readonly running: boolean;
  readonly paused: boolean;
  readonly togglePaused: () => void;
  readonly showControl: boolean;
}

/**
 * Native form of the showcase autoplay guards (docs/DESIGN.md, Showcase exceptions):
 * stop in the background and under reduced motion, and let the person pause it.
 */
export function useLoopGuard(enabled: boolean): LoopGuard {
  const { reduced } = useMotionEnv();
  const [active, setActive] = useState<boolean>(
    AppState.currentState === "active",
  );
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const subscription = AppState.addEventListener("change", (state) =>
      setActive(state === "active"),
    );
    return () => subscription.remove();
  }, [enabled]);

  const togglePaused = useCallback(() => setPaused((value) => !value), []);

  return {
    running: enabled && !reduced && active && !paused,
    paused,
    togglePaused,
    showControl: enabled && !reduced,
  };
}
