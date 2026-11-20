import { type ReactElement } from "react";
import { View } from "react-native";
import type { NativeMagneticProps } from "./native.types";

/** Touch has no hovering pointer to follow, so native renders the child as is. */
export function Magnetic({
  strength: _strength,
  children,
  style,
  ...restProps
}: NativeMagneticProps): ReactElement {
  return (
    <View style={[{ alignSelf: "flex-start" }, style]} {...restProps}>
      {children}
    </View>
  );
}
