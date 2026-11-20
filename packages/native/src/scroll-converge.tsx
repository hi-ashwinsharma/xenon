import { Children, type ReactElement } from "react";
import { View } from "react-native";
import { Reveal } from "./reveal";
import type { NativeScrollConvergeProps } from "./native.types";

/**
 * Native has no shared page scroll to drive the convergence, so items land with the
 * Reveal entrance in a wrapping grid instead.
 */
export function ScrollConverge({
  minItemWidth = 240,
  gap = 16,
  spread: _spread,
  children,
  style,
  ...restProps
}: NativeScrollConvergeProps): ReactElement {
  return (
    <View
      style={[{ flexDirection: "row", flexWrap: "wrap", gap }, style]}
      {...restProps}
    >
      {Children.toArray(children).map((child, index) => (
        <View key={index} style={{ flexGrow: 1, flexBasis: minItemWidth }}>
          <Reveal order={Math.min(index, 5)}>{child}</Reveal>
        </View>
      ))}
    </View>
  );
}
