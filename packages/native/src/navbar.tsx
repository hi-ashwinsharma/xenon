import { useMemo, type ReactElement } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type { NativeNavbarProps } from "./native.types";

export function Navbar({
  brand,
  nav,
  actions,
  children,
  bordered = true,
  sticky: _sticky,
  threshold: _threshold,
  maxWidth: _maxWidth,
  navAlign: _navAlign,
  glass: _glass,
  collapsible: _collapsible,
  style,
  ...restProps
}: NativeNavbarProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback if rendered outside XenonProvider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const containerStyle: ViewStyle = useMemo(
    () => ({
      width: "100%",
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: nativeTokens.space[4], // 16dp
      borderBottomWidth: bordered ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: nativeTokens.colors.border,
      backgroundColor: "transparent",
    }),
    [bordered, nativeTokens],
  );

  return (
    <View style={[containerStyle, style]} {...restProps}>
      {children ?? (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: nativeTokens.space[3],
            }}
          >
            {brand}
          </View>

          {nav && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: nativeTokens.space[4],
              }}
            >
              {nav}
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: nativeTokens.space[3],
            }}
          >
            {actions}
          </View>
        </>
      )}
    </View>
  );
}
