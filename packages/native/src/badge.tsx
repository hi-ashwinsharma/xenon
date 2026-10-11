import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { formatBadgeCount } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeBadgeProps } from "./native.types";

const toneColorMap = {
  neutral: {
    text: "#86868b",
    bg: "rgba(255, 255, 255, 0.06)",
    border: "#2c2c2e",
    dot: "#86868b",
  },
  accent: {
    text: "#a6e22e",
    bg: "rgba(166, 226, 46, 0.1)",
    border: "#a6e22e",
    dot: "#a6e22e",
  },
  info: {
    text: "#64d2ff",
    bg: "rgba(100, 210, 255, 0.1)",
    border: "rgba(100, 210, 255, 0.3)",
    dot: "#64d2ff",
  },
  success: {
    text: "#30d158",
    bg: "rgba(48, 209, 88, 0.1)",
    border: "rgba(48, 209, 88, 0.3)",
    dot: "#30d158",
  },
  warning: {
    text: "#ffd60a",
    bg: "rgba(255, 214, 10, 0.1)",
    border: "rgba(255, 214, 10, 0.3)",
    dot: "#ffd60a",
  },
  danger: {
    text: "#ff453a",
    bg: "rgba(255, 69, 58, 0.1)",
    border: "rgba(255, 69, 58, 0.3)",
    dot: "#ff453a",
  },
};

export function Badge({
  variant = "subtle",
  tone = "neutral",
  size = "md",
  count,
  maxCount = 99,
  dot = false,
  icon,
  children,
  style,
  textStyle,
}: NativeBadgeProps) {
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

  const colors = toneColorMap[tone] ?? toneColorMap.neutral;
  const isSm = size === "sm";
  const isDotOnly = dot && children === undefined && count === undefined;

  let backgroundColor = colors.bg;
  let borderColor = "transparent";
  let textColor = colors.text;

  if (variant === "outline") {
    backgroundColor = "transparent";
    borderColor = colors.border;
  } else if (variant === "accent") {
    backgroundColor = tokens.colors.surface;
    borderColor = tokens.colors.accent;
    textColor = tokens.colors.accent;
  } else if (variant === "dot") {
    backgroundColor = "transparent";
    borderColor = "transparent";
  }

  const content =
    count !== undefined ? formatBadgeCount(count, maxCount) : children;

  if (isDotOnly) {
    const dotSize = isSm ? 6 : 8;
    return (
      <View
        style={[
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor:
              tone === "accent" ? tokens.colors.accent : colors.dot,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.badge,
        {
          height: isSm ? 20 : 24,
          paddingHorizontal: isSm ? 8 : 10,
          backgroundColor,
          borderColor,
          borderWidth: variant === "subtle" ? 0 : StyleSheet.hairlineWidth,
        },
        style,
      ]}
    >
      {dot && (
        <View
          style={[
            styles.dot,
            {
              width: isSm ? 5 : 6,
              height: isSm ? 5 : 6,
              borderRadius: isSm ? 2.5 : 3,
              backgroundColor:
                tone === "accent" ? tokens.colors.accent : colors.dot,
            },
          ]}
        />
      )}

      {icon && <View style={styles.iconContainer}>{icon}</View>}

      {typeof content === "string" || typeof content === "number" ? (
        <Text
          styleKey="caption1"
          style={[{ color: textColor, fontSize: isSm ? 11 : 12 }, textStyle]}
          weight={400}
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  dot: {
    marginRight: 5,
  },
  iconContainer: {
    marginRight: 4,
  },
});
