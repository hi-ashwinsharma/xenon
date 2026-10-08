import { type ReactElement } from "react";
import { View, type ViewStyle } from "react-native";
import type { NativeVisuallyHiddenProps } from "./native.types.js";

const visuallyHiddenStyle: ViewStyle = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  opacity: 0,
};

export function VisuallyHidden({
  children,
  style,
  ...restProps
}: NativeVisuallyHiddenProps): ReactElement {
  return (
    <View
      accessibilityElementsHidden={false}
      importantForAccessibility="yes"
      style={[visuallyHiddenStyle, style]}
      {...restProps}
    >
      {children}
    </View>
  );
}
