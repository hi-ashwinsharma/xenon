import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { clampProgress } from "@xenon/core";
import { useXenon } from "./provider";
import type { NativeProgressProps } from "./native.types";

const toneColors = {
  accent: "#a6e22e",
  neutral: "#f5f5f7",
  success: "#30d158",
  warning: "#ffd60a",
  danger: "#ff453a",
};

export function Progress({
  value = 0,
  indeterminate = false,
  size = "md",
  tone = "accent",
  style,
}: NativeProgressProps) {
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

  const height = size === "sm" ? 2 : 4;
  const fillColor = tone === "accent" ? tokens.colors.accent : toneColors[tone];
  const clampedValue = clampProgress(value);

  // Animated value for progress width
  const animValue = useRef(new Animated.Value(clampedValue)).current;
  const indetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!indeterminate) {
      Animated.timing(animValue, {
        toValue: clampedValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [clampedValue, indeterminate, animValue]);

  useEffect(() => {
    if (indeterminate) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(indetAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: false,
          }),
          Animated.timing(indetAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
  }, [indeterminate, indetAnim]);

  const widthInterpolation = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const indetLeft = indetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-30%", "100%"],
  });

  return (
    <View
      style={[
        styles.track,
        {
          height,
          backgroundColor: tokens.colors.surface,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: fillColor,
            width: indeterminate ? "35%" : widthInterpolation,
            left: indeterminate ? indetLeft : 0,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 9999,
    overflow: "hidden",
    position: "relative",
  },
  fill: {
    height: "100%",
    borderRadius: 9999,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
