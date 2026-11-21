import { useCallback, useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "./use-media-query";

export interface LoopGuard {
  /** True only while every guard passes: on screen, page visible, motion allowed, not paused */
  readonly running: boolean;
  readonly paused: boolean;
  readonly togglePaused: () => void;
  /** Whether the pause control should be shown at all */
  readonly showControl: boolean;
}

/**
 * The guards every showcase autoplay loop must pass (docs/DESIGN.md, Showcase
 * exceptions): pause offscreen and on hidden tabs, stay off under reduced motion, and
 * let the person pause it.
 */
export function useLoopGuard(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
): LoopGuard {
  const reduced = useReducedMotion();
  const [inView, setInView] = useState<boolean>(false);
  const [pageVisible, setPageVisible] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry?.isIntersecting ?? false),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, ref]);

  useEffect(() => {
    if (!enabled) return undefined;
    const update = (): void => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [enabled]);

  const togglePaused = useCallback(() => setPaused((value) => !value), []);

  return {
    running: enabled && !reduced && inView && pageVisible && !paused,
    paused,
    togglePaused,
    showControl: enabled && !reduced,
  };
}
