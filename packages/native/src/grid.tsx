import { Children, type ReactElement } from "react";
import { View } from "react-native";
import type { NativeGridProps } from "./native.types";

export function Grid({
  minItemWidth = 280,
  gap = 16,
  children,
  style,
  ...restProps
}: NativeGridProps): ReactElement {
  return (
    <View
      style={[{ flexDirection: "row", flexWrap: "wrap", gap }, style]}
      {...restProps}
    >
      {Children.map(children, (child) => (
        <View style={{ flexGrow: 1, flexBasis: minItemWidth }}>{child}</View>
      ))}
    </View>
  );
}
