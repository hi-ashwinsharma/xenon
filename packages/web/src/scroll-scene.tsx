"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import type { WebScrollSceneProps } from "./web.types";

/** Pins a frame to the viewport and drives it from scroll, so motion stays user-controlled. */
export function ScrollScene({
  length = 3,
  children,
  style,
  ...restProps
}: WebScrollSceneProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let frame: number | null = null;
    const measure = (): void => {
      frame = null;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
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
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: `${length * 100}svh`, ...style }}
      {...restProps}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children(progress)}
      </div>
    </div>
  );
}
