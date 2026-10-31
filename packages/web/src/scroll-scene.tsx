"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { WebScrollSceneProps } from "./web.types";

/** Pins a frame to the viewport and drives it from scroll, so motion stays user-controlled. */
export function ScrollScene({
  length = 3,
  restingProgress = 1,
  children,
  style,
  ...restProps
}: WebScrollSceneProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [reduced, setReduced] = useState<boolean>(false);
  const scrubsByRender = typeof children === "function";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (): void => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    let frame: number | null = null;
    const measure = (): void => {
      frame = null;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      // Offscreen scenes hold their last frame, so long pages stay smooth
      if (
        rect.bottom < -window.innerHeight ||
        rect.top > window.innerHeight * 2
      )
        return;
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const next = Math.min(1, Math.max(0, -rect.top / travel));
      const rounded = Math.round(next * 1000) / 1000;
      frameRef.current?.style.setProperty("--x-scroll", String(rounded));
      if (scrubsByRender) setProgress(rounded);
    };
    const schedule = (): void => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced, scrubsByRender]);

  const shown = reduced ? restingProgress : progress;

  return (
    <div
      ref={ref}
      style={{ height: reduced ? "100svh" : `${length * 100}svh`, ...style }}
      {...restProps}
    >
      <div
        ref={frameRef}
        style={
          {
            "--x-scroll": shown,
            position: "sticky",
            top: 0,
            height: "100svh",
            overflow: "hidden",
          } as CSSProperties
        }
      >
        {typeof children === "function" ? children(shown) : children}
      </div>
    </div>
  );
}
