"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { odometerGlyphs, odometerTravel } from "@xenon/core";
import type { WebOdometerProps } from "./web.types";

const ODOMETER_CSS = `
.x-odometer {
  display: inline-flex;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  vertical-align: bottom;
}
.x-odometer__digit {
  display: inline-block;
  height: 1em;
  overflow: hidden;
}
.x-odometer__column {
  display: block;
  transform: translateY(0);
  transition: transform calc(var(--x-dur-slow) * 4) var(--x-ease-standard);
  transition-delay: calc(var(--x-dur-instant) * var(--x-odometer-step, 0));
}
.x-odometer[data-x-rolled="true"] .x-odometer__column {
  transform: translateY(calc(var(--x-odometer-travel) * -1em));
}
.x-odometer__row {
  display: block;
  height: 1em;
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  .x-odometer__column {
    transition: none;
  }
}
`;

const ROWS: readonly number[] = Array.from({ length: 20 }, (_, i) => i % 10);

/** A number whose digits roll into place like a mechanical counter when it comes into view. */
export function Odometer({
  value,
  prefix,
  locale = "en-US",
  order = 0,
  className,
  ...restProps
}: WebOdometerProps): ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [rolled, setRolled] = useState<boolean>(false);
  const glyphs = useMemo(() => odometerGlyphs(value, locale), [value, locale]);
  const spoken = `${prefix ?? ""}${glyphs
    .map((glyph) => (glyph.kind === "digit" ? String(glyph.digit) : glyph.char))
    .join("")}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRolled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let column = 0;

  return (
    <>
      <style href="x-odometer" precedence="default">
        {ODOMETER_CSS}
      </style>
      <span
        ref={ref}
        role="img"
        aria-label={spoken}
        className={className ? `x-odometer ${className}` : "x-odometer"}
        data-x-rolled={rolled ? "true" : "false"}
        {...restProps}
      >
        {prefix && <span aria-hidden="true">{prefix}</span>}
        {glyphs.map((glyph, index) => {
          if (glyph.kind === "char") {
            return (
              <span key={`c${index}`} aria-hidden="true">
                {glyph.char}
              </span>
            );
          }
          const step = order + column * 0.8;
          column += 1;
          return (
            <span
              key={`d${index}`}
              className="x-odometer__digit"
              aria-hidden="true"
            >
              <span
                className="x-odometer__column"
                style={
                  {
                    "--x-odometer-travel": odometerTravel(glyph.digit),
                    "--x-odometer-step": step,
                  } as CSSProperties
                }
              >
                {ROWS.map((row, rowIndex) => (
                  <span key={rowIndex} className="x-odometer__row">
                    {row}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
}
