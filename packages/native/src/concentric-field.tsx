import { type ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { RADIUS_STOPS, compileNativeTokens } from "@xenon/tokens";
import { useXenon } from "./provider";
import type { NativeConcentricFieldProps } from "./native.types";

export function ConcentricField({
  rings = 6,
  gap = 40,
  children,
  style,
  ...restProps
}: NativeConcentricFieldProps): ReactElement {
  const { radius, resolvedTheme, accent } = useXenon();
  const tokens = compileNativeTokens(resolvedTheme, accent);
  return (
    <View style={style} {...restProps}>
      {Array.from({ length: rings }, (_, index) => {
        const step = index + 1;
        return (
          <View
            key={step}
            pointerEvents="none"
            style={{
              position: "absolute",
              top: -step * gap,
              bottom: -step * gap,
              left: -step * gap,
              right: -step * gap,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: tokens.colors.border,
              borderRadius: RADIUS_STOPS[radius].surface + step * gap,
              opacity: 1 - index / rings,
            }}
          />
        );
      })}
      {children}
    </View>
  );
}
