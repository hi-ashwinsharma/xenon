import { useMemo, type ReactElement } from "react";
import { Text as RNText, type TextStyle } from "react-native";
import {
  TYPOGRAPHY_SCALE,
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
  type TextStyleKey,
} from "@xenon/tokens";
import type { HeadingLevel, HeadingStyleKey, TextTone } from "@xenon/core";
import { useXenon } from "./provider";
import type { NativeHeadingProps } from "./native.types";

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

function getToneColor(
  tone: TextTone,
  tokens: ReturnType<typeof compileNativeTokens>,
): string {
  switch (tone) {
    case "muted":
      return tokens.colors.textMuted;
    case "accent":
      return tokens.colors.accent;
    case "danger":
      return tokens.colors.semantic.danger;
    case "warning":
      return tokens.colors.semantic.warning;
    case "success":
      return tokens.colors.semantic.success;
    case "info":
      return tokens.colors.semantic.info;
    case "default":
    default:
      return tokens.colors.text;
  }
}

export function Heading({
  level = 1,
  styleKey,
  weight,
  tone = "default",
  align,
  children,
  style,
  ...restProps
}: NativeHeadingProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback if rendered outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const effectiveKey: TextStyleKey = styleKey ?? defaultStyleForLevel(level);
  const tokenDef = TYPOGRAPHY_SCALE[effectiveKey] ?? TYPOGRAPHY_SCALE.display;
  const effectiveWeight = weight ?? tokenDef.weight;

  const headingStyle: TextStyle = useMemo(
    () => ({
      fontSize: tokenDef.native.fontSize,
      lineHeight: tokenDef.native.lineHeight,
      letterSpacing: tokenDef.native.letterSpacing,
      fontWeight: String(effectiveWeight) as "200" | "300" | "400",
      color: getToneColor(tone, nativeTokens),
      textAlign: align,
    }),
    [tokenDef, effectiveWeight, tone, nativeTokens, align],
  );

  return (
    <RNText
      accessibilityRole="header"
      style={[headingStyle, style]}
      {...restProps}
    >
      {children}
    </RNText>
  );
}
