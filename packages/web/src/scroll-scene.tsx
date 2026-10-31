"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { addScrollTask } from "./scroll-ticker";
import type { WebScrollSceneProps } from "./web.types";

/** Higher settles faster. Damps progress so rapid scrolling never reaches a scene as a jump. */
const DAMPING = 11;
const SETTLED = 0.0004;

/** Pins a frame to the viewport and drives it from scroll, so motion stays user-controlled. */
export function ScrollScene({
  length = 3,
  restingProgress = 1,
  fade = "both",
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
    let current = -1;
    let rendered = -1;
    let visible = false;
    let opacity = 1;
    let scale = 1;
    return addScrollTask({
      read: (delta) => {
        const node = ref.current;
        if (!node) return false;
        const rect = node.getBoundingClientRect();
        const viewport = window.innerHeight;
        const travel = rect.height - viewport;
        if (travel <= 0) return false;
        const target = Math.min(1, Math.max(0, -rect.top / travel));
        visible = rect.bottom > -viewport && rect.top < viewport * 2;
        // Offscreen, first read, or a page jump: land exactly instead of replaying the scene
        const pinned = rect.top <= 0 && rect.bottom >= viewport;
        const jumped = !pinned && Math.abs(target - current) > 0.5;
        if (current < 0 || !visible || jumped) {
          current = target;
        } else {
          current += (target - current) * (1 - Math.exp(-DAMPING * delta));
          if (Math.abs(target - current) < SETTLED) current = target;
        }
        const entering = Math.min(1, Math.max(0, rect.top / (viewport * 0.7)));
        const leaving = Math.min(
          1,
          Math.max(0, (viewport - rect.bottom) / (viewport * 0.7)),
        );
        const fadesIn = fade === "both" || fade === "in";
        const fadesOut = fade === "both" || fade === "out";
        opacity = (fadesIn ? 1 - entering : 1) * (fadesOut ? 1 - leaving : 1);
        scale =
          1 - (fadesIn ? entering * 0.04 : 0) - (fadesOut ? leaving * 0.04 : 0);
        return current !== target;
      },
      write: () => {
        const frameNode = frameRef.current;
        if (!frameNode || !visible) return;
        frameNode.style.opacity = String(opacity);
        frameNode.style.transform = scale === 1 ? "none" : `scale(${scale})`;
        const rounded = Math.round(current * 2000) / 2000;
        if (rounded === rendered) return;
        rendered = rounded;
        frameNode.style.setProperty("--x-scroll", String(rounded));
        if (scrubsByRender) setProgress(rounded);
      },
    });
  }, [reduced, scrubsByRender, fade]);

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
            contain: "paint",
          } as CSSProperties
        }
      >
        {typeof children === "function" ? children(shown) : children}
      </div>
    </div>
  );
}
