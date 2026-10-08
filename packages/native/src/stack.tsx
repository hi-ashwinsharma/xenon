import { useMemo, type ReactElement } from "react";
import { View, type ViewStyle } from "react-native";
import type { FlexAlign, FlexJustify } from "@xenon/core";
import type { NativeStackProps } from "./native.types";

function mapAlign(align?: FlexAlign): ViewStyle["alignItems"] {
  switch (align) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "stretch":
      return "stretch";
    case "baseline":
      return "baseline";
    default:
      return undefined;
  }
}

function mapJustify(justify?: FlexJustify): ViewStyle["justifyContent"] {
  switch (justify) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return undefined;
  }
}

export function Stack({
  direction = "column",
  gap = 16,
  align,
  justify,
  children,
  style,
  ...restProps
}: NativeStackProps): ReactElement {
  const stackStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: direction,
      gap,
      alignItems: mapAlign(align),
      justifyContent: mapJustify(justify),
    }),
    [direction, gap, align, justify],
  );

  return (
    <View style={[stackStyle, style]} {...restProps}>
      {children}
    </View>
  );
}
