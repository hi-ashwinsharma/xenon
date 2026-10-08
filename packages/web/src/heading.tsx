import {
  createElement,
  useMemo,
  type CSSProperties,
  type ReactElement,
} from "react";
import { TYPOGRAPHY_SCALE, type TextStyleKey } from "@xenon/tokens";
import type { HeadingLevel, HeadingStyleKey, TextTone } from "@xenon/core";
import type { WebHeadingProps } from "./web.types";

function defaultStyleForLevel(level: HeadingLevel): HeadingStyleKey {
  switch (level) {
    case 1:
      return "display";
    case 2:
      return "largeTitle";
    case 3:
      return "title1";
    case 4:
      return "title2";
    case 5:
    case 6:
      return "title3";
    default:
      return "display";
  }
}

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

export function Heading({
  level = 1,
  styleKey,
  weight,
  tone = "default",
  align,
  children,
  className,
  style,
  ...restProps
}: WebHeadingProps): ReactElement {
  const effectiveKey: TextStyleKey = styleKey ?? defaultStyleForLevel(level);

  const tokenDef = useMemo(() => {
    return TYPOGRAPHY_SCALE[effectiveKey] ?? TYPOGRAPHY_SCALE.display;
  }, [effectiveKey]);

  const effectiveWeight = weight ?? tokenDef.weight;
  const tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const headingStyle: CSSProperties = useMemo(
    () => ({
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
    }),
    [tokenDef, effectiveWeight, tone, align, style],
  );

  return createElement(
    tag,
    {
      className,
      style: headingStyle,
      ...restProps,
    },
    children,
  );
}
