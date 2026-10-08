import { useMemo, useState, type ReactElement } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import type { CheckboxSize } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeCheckboxProps } from "./native.types";

function getDimensions(size: CheckboxSize = "md"): {
  boxSize: number;
  radius: number;
  checkWidth: number;
  checkHeight: number;
  lineHeight: number;
  textTone: "sm" | "md" | "lg";
} {
  switch (size) {
    case "sm":
      return {
        boxSize: 16,
        radius: 3,
        checkWidth: 5,
        checkHeight: 8,
        lineHeight: 1.5,
        textTone: "sm",
      };
    case "lg":
      return {
        boxSize: 24,
        radius: 5,
        checkWidth: 7,
        checkHeight: 12,
        lineHeight: 2,
        textTone: "lg",
      };
    case "md":
    default:
      return {
        boxSize: 20,
        radius: 4,
        checkWidth: 6,
        checkHeight: 10,
        lineHeight: 1.5,
        textTone: "md",
      };
  }
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  indeterminate = false,
  disabled = false,
  error = false,
  size = "md",
  label,
  description,
  "aria-label": ariaLabel,
  style,
}: NativeCheckboxProps): ReactElement {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

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

  const {
    boxSize,
    radius: baseCornerRadius,
    checkWidth,
    checkHeight,
    textTone,
  } = getDimensions(size);

  const cornerRadius = Math.min(
    baseCornerRadius,
    radius === 0 ? 0 : baseCornerRadius,
  );

  const handlePress = (): void => {
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

  const boxBorderColor = error
    ? nativeTokens.colors.semantic.danger
    : isChecked || indeterminate
      ? nativeTokens.colors.accent
      : nativeTokens.colors.border;

  const boxBgColor =
    isChecked || indeterminate ? nativeTokens.colors.accent : "transparent";

  const boxStyle: ViewStyle = {
    width: boxSize,
    height: boxSize,
    borderRadius: cornerRadius,
    borderWidth: StyleSheet.hairlineWidth * 1.5,
    borderColor: boxBorderColor,
    backgroundColor: boxBgColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: description ? 2 : 0,
  };

  return (
    <Pressable
      accessibilityLabel={typeof label === "string" ? label : ariaLabel}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? "mixed" : isChecked,
        disabled,
      }}
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        containerStyle,
        { transform: [{ scale: pressed && !disabled ? 0.96 : 1 }] },
        style,
      ]}
    >
      <View style={boxStyle}>
        {indeterminate ? (
          <View
            style={{
              width: checkHeight,
              height: 1.5,
              backgroundColor: nativeTokens.colors.onAccent,
            }}
          />
        ) : isChecked ? (
          <View
            style={{
              width: checkWidth,
              height: checkHeight,
              borderBottomWidth: 1.5,
              borderRightWidth: 1.5,
              borderColor: nativeTokens.colors.onAccent,
              transform: [{ rotate: "45deg" }],
              marginTop: -2,
            }}
          />
        ) : null}
      </View>

      {(label || description) && (
        <View style={{ marginLeft: 8, flexDirection: "column", gap: 2 }}>
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
