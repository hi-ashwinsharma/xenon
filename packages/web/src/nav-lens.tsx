"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import type { WebNavLensProps } from "./web.types";

const NAV_LENS_CSS = `
.x-nav-lens {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--x-space-1);
}
.x-nav-lens__lens {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border: var(--x-border-width) solid var(--x-border);
  border-radius: var(--x-radius-control);
  background-color: var(--x-surface-2);
  pointer-events: none;
  opacity: 0;
  transition:
    transform var(--x-dur-slow) var(--x-ease-spring),
    width var(--x-dur-slow) var(--x-ease-spring),
    opacity var(--x-dur-base) var(--x-ease-standard);
}
.x-nav-lens__link {
  position: relative;
  padding: var(--x-space-2) var(--x-space-3);
  border-radius: var(--x-radius-control);
  color: var(--x-text-muted);
  font-size: var(--x-text-subhead-size);
  line-height: var(--x-text-subhead-lh);
  font-weight: 300;
  text-decoration: none;
  outline: none;
  transition: color var(--x-dur-base) var(--x-ease-standard);
}
.x-nav-lens__link[aria-current="location"] {
  color: var(--x-text);
}
.x-nav-lens__link:focus-visible {
  color: var(--x-accent);
}
@media (hover: hover) {
  .x-nav-lens__link:hover {
    color: var(--x-text);
  }
}
@media (prefers-reduced-motion: reduce) {
  .x-nav-lens__lens {
    transition: opacity var(--x-dur-instant) linear;
  }
}
`;

/**
 * Section links with a lens that glides under whichever section is in the middle of
 * the viewport, so the reader always sees where they are on a long page.
 */
export function NavLens({
  items,
  label = "Sections",
  className,
  ...restProps
}: WebNavLensProps): ReactElement {
  const listRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [activeId, setActiveId] = useState<string | null>(null);

  const placeLens = useCallback((): void => {
    const lens = lensRef.current;
    const list = listRef.current;
    if (!lens || !list) return;
    const link = activeId ? linkRefs.current.get(activeId) : undefined;
    if (!link) {
      lens.style.opacity = "0";
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    lens.style.opacity = "1";
    lens.style.width = `${rect.width}px`;
    lens.style.transform = `translateX(${rect.left - listRect.left}px)`;
  }, [activeId]);

  useLayoutEffect(() => {
    placeLens();
  }, [placeLens]);

  useEffect(() => {
    window.addEventListener("resize", placeLens);
    return () => window.removeEventListener("resize", placeLens);
  }, [placeLens]);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.sectionId))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return undefined;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Keep document order so the lens never skips backwards between sections
        const next = items.find((item) => visible.has(item.sectionId));
        setActiveId(next ? next.sectionId : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <style href="x-nav-lens" precedence="default">
        {NAV_LENS_CSS}
      </style>
      <nav aria-label={label} className={className} {...restProps}>
        <div ref={listRef} className="x-nav-lens">
          <span ref={lensRef} className="x-nav-lens__lens" aria-hidden="true" />
          {items.map((item) => (
            <a
              key={item.sectionId}
              ref={(node) => {
                if (node) linkRefs.current.set(item.sectionId, node);
                else linkRefs.current.delete(item.sectionId);
              }}
              href={item.href}
              className="x-nav-lens__link"
              aria-current={
                item.sectionId === activeId ? "location" : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
