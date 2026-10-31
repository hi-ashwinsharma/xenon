"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import type { WebRevealProps } from "./web.types";

const REVEAL_CSS = `
.x-reveal {
  transition:
    opacity var(--x-dur-slow) var(--x-ease-standard),
    transform var(--x-dur-slow) var(--x-ease-spring);
}
.x-reveal[data-x-revealed="false"] {
  opacity: 0;
  transform: translateY(var(--x-space-4));
}
/* Content must never stay hidden if script fails to load before hydration */
.x-reveal[data-x-armed="false"] {
  animation: x-reveal-failsafe var(--x-dur-slow) var(--x-ease-standard) 3s forwards;
}
@keyframes x-reveal-failsafe {
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-reveal[data-x-revealed="false"] {
    opacity: 1;
    transform: none;
  }
}
`;

export function Reveal({
  order = 0,
  children,
  className,
  style,
  ...restProps
}: WebRevealProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [armed, setArmed] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    setArmed(true);
    // Already on screen at mount: do not wait for the observer's first frame
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style href="x-reveal" precedence="default">
        {REVEAL_CSS}
      </style>
      <div
        ref={ref}
        className={className ? `x-reveal ${className}` : "x-reveal"}
        data-x-armed={armed ? "true" : "false"}
        data-x-revealed={revealed ? "true" : "false"}
        style={{
          transitionDelay: `calc(var(--x-dur-instant) * ${order})`,
          ...style,
        }}
        {...restProps}
      >
        {children}
      </div>
    </>
  );
}
