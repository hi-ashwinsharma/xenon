import { useMemo, type ReactElement } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import {
  CONTROL_HEIGHTS,
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { clampControlRadius } from "@xenon/core";
import { useXenon } from "./provider.js";
import { Text } from "./text.js";
import type { NativeButtonProps } from "./native.types.js";

export function Button({
  variant = "filled",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  style,
  onPress,
  ...restProps
}: NativeButtonProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radius: RadiusStop = DEFAULT_RADIUS_STOP;

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radius = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const height = CONTROL_HEIGHTS[size];
  const horizontalPadding = height / 2; // Optical padding rule
  const borderRadius = clampControlRadius(height, radius);

  const getVariantStyle = (isPressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      height,
      paddingHorizontal: horizontalPadding,
      borderRadius,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      opacity: disabled ? 0.4 : 1,
      transform: [{ scale: isPressed && !disabled && !loading ? 0.98 : 1 }],
      width: fullWidth ? "100%" : undefined,
    };

    switch (variant) {
      case "accent":
        return {
          ...base,
          backgroundColor: nativeTokens.colors.accent,
          borderWidth: 0,
        };
      case "subtle":
        return {
          ...base,
          backgroundColor: nativeTokens.colors.surface2,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: nativeTokens.colors.border,
        };
      case "outline":
        return {
          ...base,
          backgroundColor: "transparent",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: nativeTokens.colors.border,
        };
      case "ghost":
        return {
          ...base,
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      case "glass":
      case "filled":
      default:
        return {
          ...base,
          backgroundColor: nativeTokens.colors.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: nativeTokens.colors.border,
        };
    }
  };

  const textColor =
    variant === "accent"
      ? nativeTokens.colors.onAccent
      : nativeTokens.colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        disabled: Boolean(disabled),
        busy: Boolean(loading),
      }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [getVariantStyle(pressed), style]}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : typeof children === "string" ? (
        <Text
          styleKey={size === "sm" ? "callout" : "body"}
          style={{ color: textColor }}
        >
          {children}
        </Text>
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {children}
        </View>
      )}
    </Pressable>
  );
}
