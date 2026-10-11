import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ComponentRef,
  type ReactElement,
} from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
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
import type { NativeInputProps } from "./native.types";

function getArchitecturalRadius(
  size: "sm" | "md" | "lg",
  stop: RadiusStop,
): number {
  if (stop === 0) {
    return 0;
  }
  if (stop === 1) {
    return 4;
  }
  switch (size) {
    case "sm":
      return 6;
    case "lg":
      return 10;
    case "md":
    default:
      return 8;
  }
}

function getHorizontalPadding(size: "sm" | "md" | "lg"): number {
  switch (size) {
    case "sm":
      return 10;
    case "lg":
      return 14;
    case "md":
    default:
      return 12;
  }
}

export function Input({
  value: controlledValue,
  defaultValue = "",
  placeholder,
  disabled = false,
  readOnly = false,
  size = "md",
  variant = "default",
  shortcutKey,
  surface = "subtle",
  prefix,
  suffix,
  invalid = false,
  clearable = false,
  onClear,
  onChangeText,
  style,
  inputStyle,
  ...restProps
}: NativeInputProps): ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    String(defaultValue),
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

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
  const borderRadius =
    variant === "search" ? height / 2 : getArchitecturalRadius(size, radius);
  const baseHorizontalPadding = getHorizontalPadding(size);

  const handleChangeText = useCallback(
    (text: string): void => {
      if (!isControlled) {
        setUncontrolledValue(text);
      }
      onChangeText?.(text);
    },
    [isControlled, onChangeText],
  );

  const handleClear = useCallback((): void => {
    if (!isControlled) {
      setUncontrolledValue("");
    }
    onClear?.();
    onChangeText?.("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isControlled, onClear, onChangeText]);

  const borderColor = invalid
    ? nativeTokens.colors.semantic.danger
    : isFocused
      ? nativeTokens.colors.accent
      : nativeTokens.colors.border;

  const bgColor =
    surface === "surface"
      ? nativeTokens.colors.surface
      : nativeTokens.colors.surface2;

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: "row",
      alignItems: "center",
      height,
      borderRadius,
      backgroundColor: bgColor,
      borderWidth: isFocused ? 1 : StyleSheet.hairlineWidth,
      borderColor,
      paddingLeft: prefix ? 10 : baseHorizontalPadding,
      paddingRight:
        suffix || clearable || shortcutKey ? 8 : baseHorizontalPadding,
      opacity: disabled ? 0.45 : 1,
    };
  }, [
    height,
    borderRadius,
    baseHorizontalPadding,
    bgColor,
    borderColor,
    isFocused,
    prefix,
    suffix,
    clearable,
    shortcutKey,
    disabled,
  ]);

  const resolvedInputStyle: TextStyle = useMemo(() => {
    return {
      flex: 1,
      height: "100%",
      fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14,
      color: nativeTokens.colors.text,
      paddingVertical: 0,
      paddingHorizontal: 4,
    };
  }, [size, nativeTokens]);

  const showClear = clearable && !disabled && !readOnly && Boolean(value);

  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      style={[containerStyle, style]}
    >
      {prefix && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: isFocused ? 1 : 0.6,
          }}
        >
          {prefix}
        </View>
      )}

      <TextInput
        editable={!disabled && !readOnly}
        onBlur={() => setIsFocused(false)}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        placeholderTextColor={nativeTokens.colors.textMuted}
        ref={inputRef}
        style={[resolvedInputStyle, inputStyle]}
        value={value}
        {...restProps}
      />

      {showClear && (
        <Pressable
          accessibilityLabel="Clear input"
          accessibilityRole="button"
          onPress={handleClear}
          style={({ pressed }) => ({
            width: 20,
            height: 20,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: pressed ? 0.88 : 1 }],
          })}
        >
          <View
            style={{
              width: 10,
              height: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                width: 10,
                height: 1,
                backgroundColor: nativeTokens.colors.textMuted,
                transform: [{ rotate: "45deg" }],
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 10,
                height: 1,
                backgroundColor: nativeTokens.colors.textMuted,
                transform: [{ rotate: "-45deg" }],
              }}
            />
          </View>
        </Pressable>
      )}

      {shortcutKey && !isFocused && !value && (
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRadius: 4,
            backgroundColor: nativeTokens.colors.surface,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: nativeTokens.colors.border,
          }}
        >
          <Text
            styleKey="caption2"
            style={{ color: nativeTokens.colors.textMuted, fontSize: 10 }}
          >
            {shortcutKey}
          </Text>
        </View>
      )}

      {suffix && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {suffix}
        </View>
      )}
    </View>
  );
}
