import { useMemo, type ReactElement } from "react";
import { View, type ViewStyle } from "react-native";
import type { FlexAlign, FlexJustify } from "@xenon/core";
import type { NativeGroupProps } from "./native.types";

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
      return "center";
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

export function Group({
  gap = 8,
  align = "center",
  justify,
  wrap = "nowrap",
  children,
  style,
  ...restProps
}: NativeGroupProps): ReactElement {
  const groupStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      flexWrap: wrap,
      gap,
      alignItems: mapAlign(align),
      justifyContent: mapJustify(justify),
    }),
    [gap, align, justify, wrap],
  );

  return (
    <View style={[groupStyle, style]} {...restProps}>
      {children}
    </View>
  );
}
