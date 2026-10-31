"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Eases wheel input for the landing journey. Overlays keep their own native scrolling. */
export function SmoothScroll(): null {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      prevent: (node) => Boolean(node.closest('[role="dialog"]')),
    });
    let frame = window.requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = window.requestAnimationFrame(loop);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
