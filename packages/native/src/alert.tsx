import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeAlertProps } from "./native.types";

const toneStyles = {
  neutral: {
    border: "#2c2c2e",
    bg: "rgba(255, 255, 255, 0.05)",
    iconColor: "#86868b",
  },
  info: {
    border: "rgba(100, 210, 255, 0.25)",
    bg: "rgba(100, 210, 255, 0.05)",
    iconColor: "#64d2ff",
  },
  success: {
    border: "rgba(48, 209, 88, 0.25)",
    bg: "rgba(48, 209, 88, 0.05)",
    iconColor: "#30d158",
  },
  warning: {
    border: "rgba(255, 214, 10, 0.25)",
    bg: "rgba(255, 214, 10, 0.05)",
    iconColor: "#ffd60a",
  },
  danger: {
    border: "rgba(255, 69, 58, 0.25)",
    bg: "rgba(255, 69, 58, 0.05)",
    iconColor: "#ff453a",
  },
};

export function Alert({
  tone = "info",
  variant = "subtle",
  title,
  icon,
  action,
  onDismiss,
  dismissible = false,
  children,
  style,
}: NativeAlertProps) {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radius: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radius = xenon.radius;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const cfg = toneStyles[tone] ?? toneStyles.info;

  let backgroundColor = cfg.bg;
  let borderColor = cfg.border;

  if (variant === "outline") {
    backgroundColor = "transparent";
  } else if (variant === "surface") {
    backgroundColor = tokens.colors.surface;
    borderColor = tokens.colors.border;
  }

  return (
    <View
      style={[
        styles.alert,
        {
          backgroundColor,
          borderColor,
          borderRadius: tokens.radius[radius].control,
        },
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.content}>
        {title && (
          <Text
            styleKey="headline"
            style={[styles.title, { color: tokens.colors.text }]}
            weight={400}
          >
            {title}
          </Text>
        )}

        {typeof children === "string" ? (
          <Text
            styleKey="footnote"
            style={[styles.description, { color: tokens.colors.textMuted }]}
            weight={300}
          >
            {children}
          </Text>
        ) : (
          children
        )}

        {action && <View style={styles.action}>{action}</View>}
      </View>

      {(dismissible || onDismiss) && (
        <Pressable onPress={onDismiss} style={styles.dismissButton}>
          <View style={styles.closeIcon}>
            <View style={[styles.closeLine, styles.closeLine1]} />
            <View style={[styles.closeLine, styles.closeLine2]} />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
  iconContainer: {
    marginRight: 10,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    lineHeight: 18,
  },
  action: {
    marginTop: 8,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeIcon: {
    width: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  closeLine: {
    position: "absolute",
    width: 12,
    height: 1.25,
    backgroundColor: "#86868b",
  },
  closeLine1: {
    transform: [{ rotate: "45deg" }],
  },
  closeLine2: {
    transform: [{ rotate: "-45deg" }],
  },
});
