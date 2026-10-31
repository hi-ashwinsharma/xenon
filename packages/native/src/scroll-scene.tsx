import { type ReactElement } from "react";
import { View } from "react-native";
import type { NativeScrollSceneProps } from "./native.types";

/** Native has no shared page scroll to read, so the scene shows its resting frame. */
export function ScrollScene({
  length: _length,
  restingProgress = 1,
  children,
  style,
  ...restProps
}: NativeScrollSceneProps): ReactElement {
  return (
    <View style={style} {...restProps}>
      {typeof children === "function" ? children(restingProgress) : children}
    </View>
  );
}
