"use client";

import { Children, useEffect, useRef, type ReactElement } from "react";
import { convergeOffset, damp, mix, viewportProgress } from "@xenon/core";
import { SPACE_SCALE } from "@xenon/tokens";
import { addScrollTask } from "./scroll-ticker";
import { useMediaQuery, useReducedMotion } from "./hooks/use-media-query";
import type { WebScrollConvergeProps } from "./web.types";

const DAMPING = 6;

interface ItemFrame {
  readonly x: number;
  readonly y: number;
}

/**
 * A grid whose items start scattered outward and slide together into place as the
 * reader scrolls it into view. The reader's scroll drives every frame.
 */
export function ScrollConverge({
  minItemWidth = 240,
  gap = 16,
  spread = 0.55,
  children,
  className,
  style,
  ...restProps
}: WebScrollConvergeProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 600px)");
  const items = Children.toArray(children);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return undefined;
    const nodes = Array.from(grid.children) as HTMLElement[];
    if (reduced) {
      nodes.forEach((node) => {
        node.style.transform = "";
        node.style.opacity = "";
      });
      return undefined;
    }
    let shown = -1;
    let target = 0;
    let frames: ItemFrame[] = [];
    return addScrollTask({
      read: (delta) => {
        const rect = grid.getBoundingClientRect();
        target = viewportProgress(rect.top, window.innerHeight, 1, 0.22);
        if (shown < 0) shown = target;
        else shown = damp(shown, target, DAMPING, delta);
        if (Math.abs(target - shown) < 0.0005) shown = target;
        // offsetLeft/Top ignore transforms, so these are the items' resting centres
        const centreX = grid.offsetWidth / 2;
        const centreY = grid.offsetHeight / 2;
        frames = nodes.map((node) => ({
          x: wide
            ? convergeOffset(
                node.offsetLeft + node.offsetWidth / 2,
                centreX,
                spread,
                shown,
              )
            : 0,
          y: wide
            ? convergeOffset(
                node.offsetTop + node.offsetHeight / 2,
                centreY,
                spread,
                shown,
              )
            : 0,
        }));
        return shown !== target;
      },
      write: () => {
        const lift = mix(SPACE_SCALE[6] ?? 32, 0, shown);
        const scale = mix(0.86, 1, shown);
        nodes.forEach((node, index) => {
          const frame = frames[index];
          if (!frame) return;
          const turn = (index % 2 ? 2.5 : -2.5) * (1 - shown);
          node.style.transform =
            shown >= 1
              ? ""
              : `translate3d(${frame.x.toFixed(1)}px, ${(frame.y + lift).toFixed(1)}px, 0) rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          node.style.opacity = shown >= 1 ? "" : String(mix(0.1, 1, shown));
        });
      },
    });
  }, [reduced, wide, spread, items.length]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}px, 100%), 1fr))`,
        gap: `${gap}px`,
        ...style,
      }}
      {...restProps}
    >
      {items.map((item, index) => (
        <div key={index} style={{ willChange: "transform" }}>
          {item}
        </div>
      ))}
    </div>
  );
}
