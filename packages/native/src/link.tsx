import { useCallback, useMemo, type ReactElement } from "react";
import { Linking, Pressable, type TextStyle } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeLinkProps } from "./native.types";

export function Link({
  href,
  children,
  style,
  onPress,
  ...restProps
}: NativeLinkProps): ReactElement {
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

  const handlePress = useCallback(async (): Promise<void> => {
    if (onPress) {
      onPress();
      return;
    }
    const supported = await Linking.canOpenURL(href);
    if (supported) {
      await Linking.openURL(href);
    }
  }, [href, onPress]);

  const linkTextStyle: TextStyle = useMemo(
    () => ({
      color: nativeTokens.colors.text,
      textDecorationLine: "underline",
    }),
    [nativeTokens],
  );

  return (
    <Pressable accessibilityRole="link" onPress={handlePress} {...restProps}>
      {typeof children === "string" ? (
        <Text style={[linkTextStyle, style]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
