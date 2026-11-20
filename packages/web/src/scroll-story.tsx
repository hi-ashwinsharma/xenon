"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { addScrollTask } from "./scroll-ticker";
import { Heading } from "./heading";
import { SegmentedProgress } from "./segmented-progress";
import { Text } from "./text";
import { TextRoll } from "./text-roll";
import type { WebScrollStoryProps } from "./web.types";

const SCROLL_STORY_CSS = `
.x-scroll-story {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--x-space-8);
}
.x-scroll-story__stage {
  position: sticky;
  top: 0;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--x-space-5);
}
.x-scroll-story__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--x-space-4);
  color: var(--x-text-muted);
  font-size: var(--x-text-footnote-size);
  line-height: var(--x-text-footnote-lh);
  font-variant-numeric: tabular-nums;
}
.x-scroll-story__visuals {
  display: grid;
}
.x-scroll-story__visual {
  grid-area: 1 / 1;
  opacity: 0;
  transform: scale(0.96) translateY(var(--x-space-3));
  transition:
    opacity var(--x-dur-slow) var(--x-ease-standard),
    transform calc(var(--x-dur-slow) * 1.5) var(--x-ease-standard);
  pointer-events: none;
}
.x-scroll-story__visual[data-x-active="true"] {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.x-scroll-story__step {
  min-height: 80svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--x-space-3);
  opacity: 0.35;
  transition: opacity var(--x-dur-slow) var(--x-ease-standard);
}
.x-scroll-story__step[data-x-active="true"] {
  opacity: 1;
}
.x-scroll-story__inline {
  display: none;
}
@media (max-width: 767px) {
  .x-scroll-story {
    grid-template-columns: minmax(0, 1fr);
  }
  .x-scroll-story__stage {
    display: none;
  }
  .x-scroll-story__inline {
    display: block;
    margin-top: var(--x-space-4);
  }
  .x-scroll-story__step {
    min-height: 0;
    padding-block: var(--x-space-7);
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-scroll-story__visual,
  .x-scroll-story__step {
    transform: none;
    transition: opacity var(--x-dur-instant) linear;
  }
}
`;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * A story told in steps: the copy scrolls past while a pinned stage beside it swaps to
 * each step's visual, with a segmented progress line that fills as the reader moves.
 */
export function ScrollStory({
  steps,
  label = "Story",
  className,
  ...restProps
}: WebScrollStoryProps): ReactElement {
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return undefined;
    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>("[data-x-step]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-x-step")));
          }
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  useEffect(() => {
    let value = 0;
    let rendered = -1;
    return addScrollTask({
      read: () => {
        const container = stepsRef.current;
        if (!container) return false;
        const rect = container.getBoundingClientRect();
        const middle = window.innerHeight / 2;
        value =
          rect.height > 0
            ? Math.min(1, Math.max(0, (middle - rect.top) / rect.height))
            : 0;
        return false;
      },
      write: () => {
        const rounded = Math.round(value * 500) / 500;
        if (rounded === rendered) return;
        rendered = rounded;
        setProgress(rounded);
      },
    });
  }, []);

  const current = steps[active];

  return (
    <>
      <style href="x-scroll-story" precedence="default">
        {SCROLL_STORY_CSS}
      </style>
      <section
        aria-label={label}
        className={className ? `x-scroll-story ${className}` : "x-scroll-story"}
        {...restProps}
      >
        <div className="x-scroll-story__stage">
          <div className="x-scroll-story__meta">
            <TextRoll
              value={`Step ${pad(active + 1)} / ${pad(steps.length)}`}
            />
            <SegmentedProgress
              segments={steps.length}
              value={progress}
              label={label}
            />
          </div>
          <div className="x-scroll-story__visuals">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="x-scroll-story__visual"
                data-x-active={index === active ? "true" : "false"}
                aria-hidden={index === active ? undefined : "true"}
              >
                {step.visual}
              </div>
            ))}
          </div>
        </div>
        <div ref={stepsRef}>
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="x-scroll-story__step"
              data-x-step={index}
              data-x-active={index === active ? "true" : "false"}
              aria-current={step === current ? "step" : undefined}
            >
              <Heading level={3} styleKey="title2">
                {step.title}
              </Heading>
              {step.body && (
                <Text styleKey="body" tone="muted">
                  {step.body}
                </Text>
              )}
              <div className="x-scroll-story__inline">{step.visual}</div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
