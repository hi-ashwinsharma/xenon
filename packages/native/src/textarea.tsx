import {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import {
  StyleSheet,
  TextInput,
  View,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeTextareaProps } from "./native.types";

export function Textarea({
  value: controlledValue,
  defaultValue = "",
  placeholder,
  disabled = false,
  readOnly = false,
  invalid = false,
  minRows = 3,
  maxLength,
  showCount = false,
  onChangeText,
  style,
  inputStyle,
  ...restProps
}: NativeTextareaProps): ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    String(defaultValue),
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const currentLength = String(value || "").length;

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

  const handleChangeText = useCallback(
    (text: string): void => {
      if (!isControlled) {
        setUncontrolledValue(text);
      }
      onChangeText?.(text);
    },
    [isControlled, onChangeText],
  );

  const borderColor = invalid
    ? nativeTokens.colors.semantic.danger
    : isFocused
      ? nativeTokens.colors.accent
      : nativeTokens.colors.border;

  const minHeight = minRows * 20 + 24;

  const containerStyle: ViewStyle = {
    position: "relative",
    width: "100%",
    borderRadius: 8,
    backgroundColor: nativeTokens.colors.surface2,
    borderWidth: isFocused ? 1 : StyleSheet.hairlineWidth,
    borderColor,
    opacity: disabled ? 0.45 : 1,
  };

  const resolvedInputStyle: TextStyle = {
    width: "100%",
    minHeight,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: showCount ? 4 : 12,
    fontSize: 14,
    lineHeight: 20,
    color: nativeTokens.colors.text,
    textAlignVertical: "top",
  };

  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      style={[containerStyle, style]}
    >
      <TextInput
        editable={!disabled && !readOnly}
        maxLength={maxLength}
        multiline
        onBlur={() => setIsFocused(false)}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        placeholderTextColor={nativeTokens.colors.textMuted}
        style={[resolvedInputStyle, inputStyle]}
        value={value}
        {...restProps}
      />

      {showCount && (
        <View
          style={{
            alignItems: "flex-end",
            paddingHorizontal: 12,
            paddingBottom: 8,
          }}
        >
          <Text
            styleKey="caption2"
            style={{
              color: nativeTokens.colors.textMuted,
              fontSize: 11,
            }}
          >
            {maxLength ? `${currentLength} / ${maxLength}` : String(currentLength)}
          </Text>
        </View>
      )}
    </View>
  );
}
