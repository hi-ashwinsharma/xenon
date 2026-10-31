"use client";

import { type KeyboardEvent, type ReactElement } from "react";
import {
  ACCENT_COLORS,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type { WebAccentPickerProps } from "./web.types";

const ACCENTS = Object.keys(ACCENT_COLORS) as Accent[];

const PICKER_CSS = `
.x-accent-swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  outline: none;
  transition: border-color var(--x-dur-base) var(--x-ease-standard);
}
.x-accent-swatch[aria-checked="true"],
.x-accent-swatch:focus-visible {
  border-color: var(--x-text-muted);
}
.x-accent-swatch > span {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transition: transform var(--x-dur-base) var(--x-ease-spring);
}
.x-accent-swatch:active > span {
  transform: scale(0.85);
}
@media (hover: hover) {
  .x-accent-swatch:hover > span {
    transform: scale(1.15);
  }
}
`;

export function AccentPicker({
  value,
  onValueChange,
  label = "Accent",
  style,
  ...restProps
}: WebAccentPickerProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  try {
    resolvedTheme = useXenon().resolvedTheme;
  } catch {
    // Falls back to dark swatches outside XenonProvider
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (step === 0) return;
    event.preventDefault();
    const next =
      ACCENTS[(ACCENTS.indexOf(value) + step + ACCENTS.length) % ACCENTS.length];
    if (!next) return;
    onValueChange(next);
    const swatch = event.currentTarget.querySelector<HTMLButtonElement>(
      `[data-x-accent-swatch="${next}"]`,
    );
    swatch?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      style={{ display: "inline-flex", alignItems: "center", gap: "2px", ...style }}
      {...restProps}
    >
      <style href="x-accent-picker" precedence="default">
        {PICKER_CSS}
      </style>
      {ACCENTS.map((accent) => (
        <button
          key={accent}
          type="button"
          role="radio"
          className="x-accent-swatch"
          data-x-accent-swatch={accent}
          aria-checked={accent === value}
          aria-label={accent}
          tabIndex={accent === value ? 0 : -1}
          onClick={() => onValueChange(accent)}
        >
          <span style={{ backgroundColor: ACCENT_COLORS[accent][resolvedTheme] }} />
        </button>
      ))}
    </div>
  );
}
