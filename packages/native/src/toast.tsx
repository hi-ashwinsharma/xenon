import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { toast, type ToastItem } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type {
  NativeToastProps,
  NativeToastProviderProps,
} from "./native.types";

const toneColors = {
  success: "#30d158",
  danger: "#ff453a",
  warning: "#ffd60a",
  info: "#64d2ff",
  accent: "#a6e22e",
  neutral: "#86868b",
};

export function Toast({
  open = true,
  onOpenChange,
  title,
  description,
  tone = "neutral",
  icon,
  action,
  durationMs = 4000,
  dismissible = true,
  onDismiss,
  children,
  style,
}: NativeToastProps) {
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

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(14)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();

      if (durationMs > 0) {
        timerRef.current = setTimeout(() => {
          handleDismiss();
        }, durationMs);
      }
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 14,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [open, durationMs]);

  const handleDismiss = () => {
    onOpenChange?.(false);
    onDismiss?.();
  };

  const indicatorColor =
    tone === "accent" ? tokens.colors.accent : toneColors[tone];

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.border,
          borderRadius: tokens.radius[radius].control,
          opacity: opacityAnim,
          transform: [{ translateY: translateYAnim }],
        },
        style,
      ]}
    >
      <View style={styles.contentRow}>
        {/* Semantic indicator dot if no custom icon */}
        {icon ? (
          <View style={styles.iconContainer}>{icon}</View>
        ) : (
          <View
            style={[styles.indicatorDot, { backgroundColor: indicatorColor }]}
          />
        )}

        <View style={styles.textContent}>
          {title && (
            <Text
              styleKey="headline"
              style={{ color: tokens.colors.text }}
              weight={400}
            >
              {title}
            </Text>
          )}

          {description && (
            <Text
              styleKey="footnote"
              style={{ color: tokens.colors.textMuted, marginTop: 2 }}
              weight={300}
            >
              {description}
            </Text>
          )}

          {children}
        </View>
      </View>

      {action && (
        <Pressable
          onPress={() => {
            action.onClick();
            handleDismiss();
          }}
          style={[styles.actionButton, { borderColor: tokens.colors.border }]}
        >
          <Text
            styleKey="caption1"
            style={{ color: tokens.colors.text }}
            weight={400}
          >
            {action.label}
          </Text>
        </Pressable>
      )}

      {dismissible && (
        <Pressable onPress={handleDismiss} style={styles.dismissButton}>
          <View style={styles.closeIcon}>
            <View style={[styles.closeLine, styles.closeLine1]} />
            <View style={[styles.closeLine, styles.closeLine2]} />
          </View>
        </Pressable>
      )}
    </Animated.View>
  );
}

export function ToastProvider({
  maxToasts = 5,
  children,
}: NativeToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    toast.setMaxToasts(maxToasts);
    const unsub = toast.subscribe((updated) => {
      setToasts(updated);
    });
    return unsub;
  }, [maxToasts]);

  return (
    <View style={styles.providerContainer}>
      {children}

      <View pointerEvents="box-none" style={styles.toastStack}>
        {toasts.map((t) => (
          <Toast
            action={t.action}
            description={t.description}
            dismissible={t.dismissible ?? true}
            durationMs={t.durationMs ?? 4000}
            icon={t.icon}
            key={t.id}
            onDismiss={() => toast.dismiss(t.id)}
            open={true}
            title={t.title}
            tone={t.tone ?? "neutral"}
          />
        ))}
      </View>
    </View>
  );
}

export { toast };

const styles = StyleSheet.create({
  providerContainer: {
    flex: 1,
    position: "relative",
  },
  toastStack: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
    gap: 8,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    width: "100%",
    maxWidth: 420,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContent: {
    flex: 1,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginLeft: 8,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeIcon: {
    width: 10,
    height: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeLine: {
    position: "absolute",
    width: 10,
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
