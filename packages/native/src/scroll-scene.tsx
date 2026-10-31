import { type ReactElement } from "react";
import { View } from "react-native";
import type { NativeScrollSceneProps } from "./native.types";

/** Native has no shared page scroll to read, so the scene shows its final frame. */
export function ScrollScene({
  length: _length,
  children,
  style,
  ...restProps
}: NativeScrollSceneProps): ReactElement {
  return (
    <View style={style} {...restProps}>
      {children(1)}
    </View>
  );
}
