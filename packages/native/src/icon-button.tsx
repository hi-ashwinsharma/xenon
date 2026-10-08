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
import type { NativeIconButtonProps } from "./native.types.js";

export function IconButton({
  variant = "filled",
  size = "md",
  loading = false,
  disabled = false,
  ariaLabel,
  children,
  style,
  onPress,
  ...restProps
}: NativeIconButtonProps): ReactElement {
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

  const dimension = CONTROL_HEIGHTS[size];
  const borderRadius = clampControlRadius(dimension, radius);

  const getVariantStyle = (isPressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      width: dimension,
      height: dimension,
      borderRadius,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.4 : 1,
      transform: [{ scale: isPressed && !disabled && !loading ? 0.98 : 1 }],
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
      accessibilityLabel={ariaLabel}
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
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {children}
        </View>
      )}
    </Pressable>
  );
}
