import { type ReactElement } from "react";
import { View } from "react-native";
import { SPACE_SCALE } from "@xenon/tokens";
import type { ContainerSize } from "@xenon/core";
import type { NativeContainerProps } from "./native.types";

const WIDTHS: Readonly<Record<ContainerSize, number>> = {
  sm: 720,
  md: 960,
  lg: 1240,
};

export function Container({
  size = "lg",
  children,
  style,
  ...restProps
}: NativeContainerProps): ReactElement {
  return (
    <View
      style={[
        {
          width: "100%",
          maxWidth: WIDTHS[size],
          alignSelf: "center",
          paddingHorizontal: SPACE_SCALE[4],
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
}
