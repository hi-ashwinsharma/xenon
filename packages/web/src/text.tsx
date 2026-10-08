import {
  createElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
} from "react";
import { TYPOGRAPHY_SCALE, type TextStyleKey } from "@xenon/tokens";
import type { TextTone } from "@xenon/core";
import type { WebTextProps } from "./web.types.js";

function getToneColor(tone: TextTone): string {
  switch (tone) {
    case "muted":
      return "var(--x-text-muted)";
    case "accent":
      return "var(--x-accent)";
    case "danger":
      return "var(--x-danger)";
    case "warning":
      return "var(--x-warning)";
    case "success":
      return "var(--x-success)";
    case "info":
      return "var(--x-info)";
    case "default":
    default:
      return "var(--x-text)";
  }
}

export function Text({
  styleKey = "body",
  weight,
  tone = "default",
  tabular = false,
  align,
  truncate = false,
  as = "p",
  children,
  className,
  style,
  ...restProps
}: WebTextProps): ReactElement {
  const tokenDef = useMemo(() => {
    return TYPOGRAPHY_SCALE[styleKey] ?? TYPOGRAPHY_SCALE.body;
  }, [styleKey]);

  const effectiveWeight = weight ?? tokenDef.weight;

  const textStyle: CSSProperties = useMemo(() => {
    const base: CSSProperties = {
      fontFamily: "var(--x-font-family)",
      fontSize: tokenDef.web.remSize,
      lineHeight: tokenDef.web.remLineHeight,
      letterSpacing: `${tokenDef.web.letterSpacing}px`,
      fontWeight: effectiveWeight,
      color: getToneColor(tone),
      textAlign: align,
      margin: 0,
      padding: 0,
      ...style,
    };

    if (tabular) {
      base.fontVariantNumeric = "tabular-nums";
    }

    if (truncate) {
      base.overflow = "hidden";
      base.textOverflow = "ellipsis";
      base.whiteSpace = "nowrap";
    }

    return base;
  }, [tokenDef, effectiveWeight, tone, tabular, align, truncate, style]);

  return createElement(
    as,
    {
      className,
      style: textStyle,
      ...restProps,
    },
    children,
  );
}
