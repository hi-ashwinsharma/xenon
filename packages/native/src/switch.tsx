import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import type { SwitchSize } from "@xenon/core";
import { useXenon } from "./provider.js";
import { Text } from "./text.js";
import type { NativeSwitchProps } from "./native.types.js";

function getSwitchDimensions(size: SwitchSize = "md"): {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  inset: number;
  travel: number;
  textTone: "sm" | "md" | "lg";
} {
  switch (size) {
    case "sm":
      return {
        trackWidth: 36,
        trackHeight: 20,
        thumbSize: 16,
        inset: 2,
        travel: 16,
        textTone: "sm",
      };
    case "lg":
      return {
        trackWidth: 56,
        trackHeight: 32,
        thumbSize: 26,
        inset: 3,
        travel: 24,
        textTone: "lg",
      };
    case "md":
    default:
      return {
        trackWidth: 46,
        trackHeight: 26,
        thumbSize: 22,
        inset: 2,
        travel: 20,
        textTone: "md",
      };
  }
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label,
  description,
  "aria-label": ariaLabel,
  style,
}: NativeSwitchProps): ReactElement {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback if rendered outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const { trackWidth, trackHeight, thumbSize, inset, travel, textTone } =
    getSwitchDimensions(size);

  const animX = useRef(new Animated.Value(isChecked ? travel : 0)).current;

  useEffect(() => {
    Animated.spring(animX, {
      toValue: isChecked ? travel : 0,
      stiffness: nativeTokens.motion.springSoft.stiffness,
      damping: nativeTokens.motion.springSoft.damping,
      mass: nativeTokens.motion.springSoft.mass,
      useNativeDriver: true,
    }).start();
  }, [isChecked, travel, nativeTokens]);

  const handleToggle = (): void => {
    if (disabled) {
      return;
    }
    const nextChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onCheckedChange?.(nextChecked);
  };

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: description ? "flex-start" : "center",
    opacity: disabled ? 0.45 : 1,
  };

  const trackStyle: ViewStyle = {
    position: "relative",
    width: trackWidth,
    height: trackHeight,
    borderRadius: 9999,
    borderWidth: StyleSheet.hairlineWidth * 1.5,
    borderColor: isChecked
      ? nativeTokens.colors.accent
      : nativeTokens.colors.border,
    backgroundColor: isChecked
      ? nativeTokens.colors.accent
      : nativeTokens.colors.surface2,
    padding: inset,
    justifyContent: "center",
    marginTop: description ? 2 : 0,
  };

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: 9999,
    backgroundColor: isChecked
      ? nativeTokens.colors.onAccent
      : nativeTokens.colors.text,
    transform: [{ translateX: animX }],
  };

  return (
    <Pressable
      accessibilityLabel={typeof label === "string" ? label : ariaLabel}
      accessibilityRole="switch"
      accessibilityState={{
        checked: isChecked,
        disabled,
      }}
      disabled={disabled}
      onPress={handleToggle}
      style={[containerStyle, style]}
    >
      <View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </View>

      {(label || description) && (
        <View style={{ marginLeft: 10, flexDirection: "column", gap: 2 }}>
          {label && (
            <Text
              style={
                {
                  color: nativeTokens.colors.text,
                } as TextStyle
              }
              styleKey={
                textTone === "lg"
                  ? "headline"
                  : textTone === "sm"
                    ? "footnote"
                    : "body"
              }
              tone="default"
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              style={
                {
                  color: nativeTokens.colors.textMuted,
                } as TextStyle
              }
              styleKey="caption1"
              tone="muted"
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
