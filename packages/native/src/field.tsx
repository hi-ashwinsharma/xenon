import { useMemo, type ReactElement } from "react";
import { View, type ViewStyle } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider.js";
import { Text } from "./text.js";
import type { NativeFieldProps } from "./native.types.js";

export function Field({
  label,
  helpText,
  error,
  optional = false,
  children,
  style,
  ...restProps
}: NativeFieldProps): ReactElement {
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

  const containerStyle: ViewStyle = {
    flexDirection: "column",
    gap: 6,
    width: "100%",
  };

  return (
    <View style={[containerStyle, style]} {...restProps}>
      {label && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text styleKey="callout" style={{ color: nativeTokens.colors.text }}>
            {label}
          </Text>
          {optional && (
            <Text
              styleKey="caption1"
              style={{ color: nativeTokens.colors.textMuted }}
            >
              Optional
            </Text>
          )}
        </View>
      )}

      {children}

      {(error || helpText) && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {error && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: nativeTokens.colors.semantic.danger,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: nativeTokens.colors.bg,
                  fontSize: 9,
                  fontWeight: "400",
                  lineHeight: 10,
                }}
              >
                !
              </Text>
            </View>
          )}
          <Text
            styleKey="caption1"
            style={{
              color: error
                ? nativeTokens.colors.semantic.danger
                : nativeTokens.colors.textMuted,
            }}
          >
            {error ?? helpText}
          </Text>
        </View>
      )}
    </View>
  );
}
