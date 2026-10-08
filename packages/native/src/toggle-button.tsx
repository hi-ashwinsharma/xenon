import { useCallback, useMemo, useState, type ReactElement } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import {
  CONTROL_HEIGHTS,
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { clampControlRadius } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeToggleButtonProps } from "./native.types";

export function ToggleButton({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant = "subtle",
  size = "md",
  disabled = false,
  ariaLabel,
  children,
  style,
  onPress,
  ...restProps
}: NativeToggleButtonProps): ReactElement {
  const [uncontrolledPressed, setUncontrolledPressed] =
    useState<boolean>(defaultPressed);

  const isPressed = controlledPressed ?? uncontrolledPressed;

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
  const horizontalPadding = height / 2;
  const borderRadius = clampControlRadius(height, radius);

  const handlePress = useCallback((): void => {
    if (disabled) return;
    const nextPressed = !isPressed;
    setUncontrolledPressed(nextPressed);
    onPressedChange?.(nextPressed);
    onPress?.();
  }, [disabled, isPressed, onPressedChange, onPress]);

  const buttonStyle: ViewStyle = useMemo(() => {
    const base: ViewStyle = {
      height,
      paddingHorizontal: horizontalPadding,
      borderRadius,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      opacity: disabled ? 0.4 : 1,
    };

    if (isPressed) {
      return {
        ...base,
        backgroundColor: nativeTokens.colors.surface2,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: nativeTokens.colors.accent,
      };
    }

    switch (variant) {
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
      case "subtle":
      default:
        return {
          ...base,
          backgroundColor: nativeTokens.colors.surface,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: nativeTokens.colors.border,
        };
    }
  }, [
    height,
    horizontalPadding,
    borderRadius,
    disabled,
    isPressed,
    variant,
    nativeTokens,
  ]);

  return (
    <Pressable
      accessibilityLabel={ariaLabel}
      accessibilityRole="button"
      accessibilityState={{ selected: isPressed, disabled: Boolean(disabled) }}
      disabled={disabled}
      onPress={handlePress}
      style={[buttonStyle, style]}
      {...restProps}
    >
      {typeof children === "string" ? (
        <Text
          styleKey={size === "sm" ? "callout" : "body"}
          style={{ color: nativeTokens.colors.text }}
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
