import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type { NativeSkeletonProps } from "./native.types";

export function Skeleton({
  variant = "rect",
  width,
  height,
  radius,
  animate = true,
  style,
}: NativeSkeletonProps) {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radiusStop = xenon.radius;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const opacityAnim = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    if (animate) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.85,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.45,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
  }, [animate, opacityAnim]);

  let resolvedHeight: any = height;
  let resolvedWidth: any = width;
  let resolvedRadius: number = tokens.radius[radiusStop].control;

  if (variant === "text") {
    resolvedHeight = height ?? 14;
    resolvedRadius =
      typeof radius === "number" ? radius : tokens.radius[radiusStop].joint;
  } else if (variant === "circle") {
    resolvedHeight = height ?? 36;
    resolvedWidth = width ?? resolvedHeight;
    resolvedRadius = 9999;
  } else if (typeof radius === "number") {
    resolvedRadius = radius;
  }

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: resolvedWidth ?? "100%",
          height: resolvedHeight ?? 20,
          borderRadius: resolvedRadius,
          backgroundColor: tokens.colors.surface,
          opacity: animate ? opacityAnim : 0.6,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
  },
});
