import { useMemo, type ReactElement } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useSurface } from "./surface.js";
import { useXenon } from "./provider.js";
import type { NativeDividerProps } from "./native.types.js";

export function Divider({
  orientation = "horizontal",
  inset = false,
  decorative = true,
  style,
  ...restProps
}: NativeDividerProps): ReactElement {
  const surface = useSurface();

  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback if outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const insetDp: number = useMemo(() => {
    if (typeof inset === "number") {
      return inset;
    }
    if (inset === true) {
      return surface ? surface.padding : 24;
    }
    return 0;
  }, [inset, surface]);

  const dividerStyle: ViewStyle = useMemo(() => {
    const isHorizontal = orientation === "horizontal";

    if (isHorizontal) {
      return {
        height: StyleSheet.hairlineWidth,
        backgroundColor: nativeTokens.colors.border,
        marginLeft: insetDp > 0 ? insetDp : undefined,
        marginRight: insetDp > 0 ? insetDp : undefined,
      };
    }

    return {
      width: StyleSheet.hairlineWidth,
      backgroundColor: nativeTokens.colors.border,
      marginTop: insetDp > 0 ? insetDp : undefined,
      marginBottom: insetDp > 0 ? insetDp : undefined,
    };
  }, [orientation, insetDp, nativeTokens]);

  return (
    <View
      accessibilityElementsHidden={decorative}
      accessibilityRole={decorative ? "none" : "separator"}
      importantForAccessibility={decorative ? "no" : "yes"}
      style={[dividerStyle, style]}
      {...restProps}
    />
  );
}
