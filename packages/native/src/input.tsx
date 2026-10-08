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

export function Input({
  value: controlledValue,
  defaultValue = "",
  placeholder,
  disabled = false,
  readOnly = false,
  size = "md",
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
  const borderRadius = clampControlRadius(height, radius);
  const baseHorizontalPadding = height / 2;

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

  const containerStyle: ViewStyle = useMemo(() => {
    return {
      flexDirection: "row",
      alignItems: "center",
      height,
      borderRadius,
      backgroundColor: nativeTokens.colors.surface,
      borderWidth: isFocused ? 1.5 : StyleSheet.hairlineWidth,
      borderColor,
      paddingLeft: prefix ? 12 : baseHorizontalPadding,
      paddingRight: suffix || clearable ? 12 : baseHorizontalPadding,
      opacity: disabled ? 0.4 : 1,
    };
  }, [
    height,
    borderRadius,
    baseHorizontalPadding,
    borderColor,
    isFocused,
    prefix,
    suffix,
    clearable,
    disabled,
    nativeTokens,
  ]);

  const resolvedInputStyle: TextStyle = useMemo(() => {
    return {
      flex: 1,
      height: "100%",
      fontSize: size === "sm" ? 14 : size === "lg" ? 17 : 16,
      color: nativeTokens.colors.text,
      paddingVertical: 0,
      paddingHorizontal: 6,
    };
  }, [size, nativeTokens]);

  const showClear = clearable && !disabled && !readOnly && Boolean(value);

  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      style={[containerStyle, style]}
    >
      {prefix && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
          style={{
            width: 20,
            height: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: nativeTokens.colors.textMuted, fontSize: 16 }}>
            ×
          </Text>
        </Pressable>
      )}

      {suffix && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {suffix}
        </View>
      )}
    </View>
  );
}
