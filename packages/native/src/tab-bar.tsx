import { useMemo, type ReactElement } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeTabBarItemProps, NativeTabBarProps } from "./native.types";

export function TabBar({
  variant = "floating",
  children,
  style,
  ...restProps
}: NativeTabBarProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const isFloating = variant === "floating";

  const barStyle: ViewStyle = isFloating
    ? {
        position: "absolute",
        bottom: 24,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9999,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: nativeTokens.colors.border,
        backgroundColor:
          resolvedTheme === "dark"
            ? nativeTokens.glass.regular.darkTint
            : nativeTokens.glass.regular.lightTint,
        paddingVertical: 6,
        paddingHorizontal: nativeTokens.space[4],
        gap: nativeTokens.space[4],
      }
    : {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: nativeTokens.colors.border,
        backgroundColor:
          resolvedTheme === "dark"
            ? nativeTokens.glass.regular.darkTint
            : nativeTokens.glass.regular.lightTint,
        paddingVertical: nativeTokens.space[2],
        paddingHorizontal: nativeTokens.space[4],
      };

  return (
    <View style={[barStyle, style]} {...restProps}>
      {children}
    </View>
  );
}

export function TabBarItem({
  icon,
  label,
  active = false,
  badge,
  disabled = false,
  onPress,
  children,
  style,
  ...restProps
}: NativeTabBarItemProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 4,
          paddingHorizontal: 8,
          opacity: disabled ? 0.38 : 1,
          transform: [{ scale: pressed && !disabled ? 0.92 : 1 }],
        },
        style,
      ]}
      {...restProps}
    >
      <View style={{ position: "relative" }}>
        {icon}
        {badge && (
          <View
            style={{
              position: "absolute",
              top: -2,
              right: -6,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: nativeTokens.colors.accent,
            }}
          />
        )}
      </View>

      {(label || children) && (
        <Text
          style={{
            fontSize: 11,
            color: active
              ? nativeTokens.colors.text
              : nativeTokens.colors.textMuted,
            fontWeight: active ? "400" : "300",
            marginTop: 2,
          }}
        >
          {label ?? children}
        </Text>
      )}
    </Pressable>
  );
}
