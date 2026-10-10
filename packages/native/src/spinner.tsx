import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type { NativeSpinnerProps } from "./native.types";

export function Spinner({
  size = "md",
  tone = "current",
  style,
}: NativeSpinnerProps) {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  let color = tokens.colors.text;
  if (tone === "accent") {
    color = tokens.colors.accent;
  } else if (tone === "muted") {
    color = tokens.colors.textMuted;
  }

  const indicatorSize = size === "lg" ? "large" : "small";

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={color} size={indicatorSize} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
