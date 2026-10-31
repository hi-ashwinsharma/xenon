import { type ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  ACCENT_COLORS,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type { NativeAccentPickerProps } from "./native.types";

const ACCENTS = Object.keys(ACCENT_COLORS) as Accent[];

export function AccentPicker({
  value,
  onValueChange,
  label = "Accent",
  style,
  ...restProps
}: NativeAccentPickerProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  try {
    resolvedTheme = useXenon().resolvedTheme;
  } catch {
    // Falls back to dark swatches outside XenonProvider
  }

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={[{ flexDirection: "row", alignItems: "center", gap: 4 }, style]}
      {...restProps}
    >
      {ACCENTS.map((accent) => {
        const selected = accent === value;
        return (
          <Pressable
            key={accent}
            accessibilityRole="radio"
            accessibilityLabel={accent}
            accessibilityState={{ checked: selected }}
            hitSlop={8}
            onPress={() => onValueChange(accent)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: selected
                ? ACCENT_COLORS[accent][resolvedTheme]
                : "transparent",
            }}
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: ACCENT_COLORS[accent][resolvedTheme],
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
