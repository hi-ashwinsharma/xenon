import { type ReactElement } from "react";
import { View } from "react-native";
import type { NativeTiltProps } from "./native.types";

/** Touch has no hovering pointer to tilt toward, so native renders the child flat. */
export function Tilt({
  maxTilt: _maxTilt,
  children,
  style,
  ...restProps
}: NativeTiltProps): ReactElement {
  return (
    <View style={style} {...restProps}>
      {children}
    </View>
  );
}
