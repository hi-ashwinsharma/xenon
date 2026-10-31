import { Children, type ReactElement } from "react";
import { View } from "react-native";
import type { NativeGridItemProps, NativeGridProps } from "./native.types";

export function Grid({
  minItemWidth = 280,
  columns: _columns,
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

/** Phones lay out one column, so `span` has no effect on native. */
export function GridItem({
  span: _span,
  children,
  style,
  ...restProps
}: NativeGridItemProps): ReactElement {
  return (
    <View style={style} {...restProps}>
      {children}
    </View>
  );
}
