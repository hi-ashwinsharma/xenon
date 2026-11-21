"use client";

import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { WebWordRevealProps } from "./web.types";

const WORD_REVEAL_CSS = `
.x-word-reveal__word {
  display: inline-block;
  transform-origin: 50% 100%;
  transition:
    opacity calc(var(--x-dur-slow) * 2) var(--x-ease-standard),
    transform calc(var(--x-dur-slow) * 3) var(--x-ease-standard);
  transition-delay: calc(var(--x-dur-instant) * var(--x-word-step, 0));
}
.x-word-reveal[data-x-revealed="false"] .x-word-reveal__word {
  opacity: 0;
  transform: perspective(calc(var(--x-space-10) * 6)) translateY(70%)
    rotateX(-40deg);
}
.x-word-reveal[data-x-armed="false"] .x-word-reveal__word {
  animation: x-word-reveal-failsafe var(--x-dur-slow) var(--x-ease-standard) 3s
    forwards;
}
@keyframes x-word-reveal-failsafe {
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-word-reveal[data-x-revealed="false"] .x-word-reveal__word {
    opacity: 1;
    transform: none;
  }
}
`;

/** Stagger step between words, in instants (40ms), capped at six steps per the motion guideline. */
const WORD_STEP = 0.4;
const MAX_STAGGERED = 6;

/** Splits a headline into words that rise and turn upright one after another on first view. */
export function WordReveal({
  text,
  order = 0,
  className,
  ...restProps
}: WebWordRevealProps): ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [armed, setArmed] = useState<boolean>(false);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -14% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style href="x-word-reveal" precedence="default">
        {WORD_REVEAL_CSS}
      </style>
      <span
        ref={ref}
        className={className ? `x-word-reveal ${className}` : "x-word-reveal"}
        data-x-armed={armed ? "true" : "false"}
        data-x-revealed={revealed ? "true" : "false"}
        {...restProps}
      >
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && " "}
            <span
              className="x-word-reveal__word"
              style={
                {
                  "--x-word-step":
                    order + Math.min(index, MAX_STAGGERED - 1) * WORD_STEP,
                } as CSSProperties
              }
            >
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
