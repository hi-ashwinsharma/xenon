import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import {
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
import type { RadioContextValue, RadioSize } from "@xenon/core";
import { useXenon } from "./provider.js";
import { Text } from "./text.js";
import type {
  NativeRadioGroupProps,
  NativeRadioProps,
} from "./native.types.js";

const RadioContext = createContext<RadioContextValue | null>(null);

function getRadioDimensions(size: RadioSize = "md"): {
  outerSize: number;
  innerSize: number;
  textTone: "sm" | "md" | "lg";
} {
  switch (size) {
    case "sm":
      return { outerSize: 16, innerSize: 6, textTone: "sm" };
    case "lg":
      return { outerSize: 24, innerSize: 10, textTone: "lg" };
    case "md":
    default:
      return { outerSize: 20, innerSize: 8, textTone: "md" };
  }
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  name,
  orientation = "vertical",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  children,
  style,
}: NativeRadioGroupProps): ReactElement {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const selectedValue = isControlled ? controlledValue : internalValue;

  const handleSelect = (nextValue: string): void => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const groupStyle: ViewStyle = {
    flexDirection: orientation === "horizontal" ? "row" : "column",
    gap: orientation === "horizontal" ? 20 : 12,
  };

  return (
    <RadioContext.Provider
      value={{
        name,
        value: selectedValue,
        onValueChange: handleSelect,
        disabled,
        size,
      }}
    >
      <View
        accessibilityLabel={ariaLabel}
        accessibilityRole="radiogroup"
        style={[groupStyle, style]}
      >
        {children}
      </View>
    </RadioContext.Provider>
  );
}

export function Radio({
  value,
  label,
  description,
  disabled: itemDisabled,
  size: itemSize,
  "aria-label": ariaLabel,
  style,
}: NativeRadioProps): ReactElement {
  const context = useContext(RadioContext);
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

  const isSelected = context?.value === value;
  const isDisabled = itemDisabled ?? context?.disabled ?? false;
  const effectiveSize = itemSize ?? context?.size ?? "md";

  const { outerSize, innerSize, textTone } = getRadioDimensions(effectiveSize);

  const handlePress = (): void => {
    if (isDisabled) {
      return;
    }
    context?.onValueChange?.(value);
  };

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: description ? "flex-start" : "center",
    opacity: isDisabled ? 0.45 : 1,
  };

  const ringStyle: ViewStyle = {
    width: outerSize,
    height: outerSize,
    borderRadius: 9999,
    borderWidth: StyleSheet.hairlineWidth * 1.5,
    borderColor: isSelected
      ? nativeTokens.colors.accent
      : nativeTokens.colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: description ? 2 : 0,
  };

  const dotStyle: ViewStyle = {
    width: innerSize,
    height: innerSize,
    borderRadius: 9999,
    backgroundColor: nativeTokens.colors.accent,
  };

  return (
    <Pressable
      accessibilityLabel={typeof label === "string" ? label : ariaLabel}
      accessibilityRole="radio"
      accessibilityState={{
        selected: isSelected,
        disabled: isDisabled,
      }}
      disabled={isDisabled}
      onPress={handlePress}
      style={({ pressed }) => [
        containerStyle,
        { transform: [{ scale: pressed && !isDisabled ? 0.96 : 1 }] },
        style,
      ]}
    >
      <View style={ringStyle}>{isSelected && <View style={dotStyle} />}</View>

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
