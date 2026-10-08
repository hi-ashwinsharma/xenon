import { useMemo, type ReactElement } from "react";
import { Text as RNText, type TextStyle } from "react-native";
import {
  TYPOGRAPHY_SCALE,
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import type { TextTone } from "@xenon/core";
import { useXenon } from "./provider";
import type { NativeTextProps } from "./native.types";

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

export function Text({
  styleKey = "body",
  weight,
  tone = "default",
  tabular = false,
  align,
  truncate = false,
  children,
  style,
  ...restProps
}: NativeTextProps): ReactElement {
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

  const tokenDef = TYPOGRAPHY_SCALE[styleKey] ?? TYPOGRAPHY_SCALE.body;
  const effectiveWeight = weight ?? tokenDef.weight;

  const textStyle: TextStyle = useMemo(() => {
    return {
      fontSize: tokenDef.native.fontSize,
      lineHeight: tokenDef.native.lineHeight,
      letterSpacing: tokenDef.native.letterSpacing,
      fontWeight: String(effectiveWeight) as "200" | "300" | "400",
      color: getToneColor(tone, nativeTokens),
      textAlign: align,
      ...(tabular ? { fontVariant: ["tabular-nums"] } : {}),
    };
  }, [tokenDef, effectiveWeight, tone, nativeTokens, align, tabular]);

  return (
    <RNText
      ellipsizeMode={truncate ? "tail" : undefined}
      numberOfLines={truncate ? 1 : undefined}
      style={[textStyle, style]}
      {...restProps}
    >
      {children}
    </RNText>
  );
}
