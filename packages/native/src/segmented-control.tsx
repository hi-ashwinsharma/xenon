import {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type TextStyle,
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
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeSegmentedControlProps } from "./native.types";

export function SegmentedControl<T extends string = string>({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = "md",
  disabled = false,
  fullWidth = false,
  "aria-label": ariaLabel,
  style,
}: NativeSegmentedControlProps<T>): ReactElement {
  const isControlled = controlledValue !== undefined;
  const initialValue = defaultValue ?? options[0]?.value;
  const [internalValue, setInternalValue] = useState<T | undefined>(initialValue);
  const selectedValue = isControlled ? controlledValue : internalValue;

  const [itemLayouts, setItemLayouts] = useState<
    Record<string, { x: number; width: number }>
  >({});

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
  const outerRadius = clampControlRadius(height, radius);
  const innerRadius = Math.max(0, outerRadius - 3);

  const handleSelect = (val: T): void => {
    if (disabled) {
      return;
    }
    if (!isControlled) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  const handleItemLayout = (val: string, e: LayoutChangeEvent): void => {
    const { x, width } = e.nativeEvent.layout;
    setItemLayouts((prev) => ({
      ...prev,
      [val]: { x, width },
    }));
  };

  const activeLayout = selectedValue ? itemLayouts[selectedValue] : undefined;

  const trackStyle: ViewStyle = {
    position: "relative",
    flexDirection: "row",
    alignItems: "stretch",
    height,
    padding: 3,
    borderRadius: outerRadius,
    backgroundColor: nativeTokens.colors.surface2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: nativeTokens.colors.border,
    opacity: disabled ? 0.45 : 1,
    alignSelf: fullWidth ? "stretch" : "flex-start",
  };

  return (
    <View
      accessibilityLabel={ariaLabel}
      accessibilityRole="tablist"
      style={[trackStyle, style]}
    >
      {/* Sliding Active Pill Background */}
      {activeLayout && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 3,
            bottom: 3,
            left: activeLayout.x,
            width: activeLayout.width,
            borderRadius: innerRadius,
            backgroundColor: nativeTokens.colors.surface,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: nativeTokens.colors.border,
          }}
        />
      )}

      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        const isItemDisabled = disabled || Boolean(option.disabled);

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected, disabled: isItemDisabled }}
            disabled={isItemDisabled}
            key={option.value}
            onLayout={(e) => handleItemLayout(option.value, e)}
            onPress={() => handleSelect(option.value)}
            style={({ pressed }) => ({
              flex: fullWidth ? 1 : undefined,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 14,
              height: "100%",
              borderRadius: innerRadius,
              transform: [{ scale: pressed && !isItemDisabled ? 0.98 : 1 }],
            })}
          >
            {option.icon && (
              <View style={{ marginRight: 6, opacity: isSelected ? 1 : 0.6 }}>
                {option.icon}
              </View>
            )}
            <Text
              style={
                {
                  color: isSelected
                    ? nativeTokens.colors.text
                    : nativeTokens.colors.textMuted,
                  fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
                } as TextStyle
              }
              tone={isSelected ? "default" : "muted"}
            >
              {typeof option.label === "string" ? option.label : ""}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
