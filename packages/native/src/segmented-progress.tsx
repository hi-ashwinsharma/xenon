import { type ReactElement } from "react";
import { View } from "react-native";
import { SPACE_SCALE } from "@xenon/tokens";
import { activeSegment, segmentFills } from "@xenon/core";
import { useMotionEnv } from "./use-motion-env";
import type { NativeSegmentedProgressProps } from "./native.types";

/** A row of short tracks that fill one after another, for chapters, steps or story beats. */
export function SegmentedProgress({
  segments = 6,
  value,
  label = "Progress",
  style,
  ...restProps
}: NativeSegmentedProgressProps): ReactElement {
  const { tokens } = useMotionEnv();
  const fills = segmentFills(value, segments);
  const current = activeSegment(value, segments) + 1;

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 1, max: fills.length, now: current }}
      style={[{ flexDirection: "row", gap: SPACE_SCALE[1] }, style]}
      {...restProps}
    >
      {fills.map((fill, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            height: SPACE_SCALE[1],
            borderRadius: SPACE_SCALE[1] / 2,
            backgroundColor: tokens.colors.borderActive,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${fill * 100}%`,
              height: "100%",
              backgroundColor: tokens.colors.accent,
            }}
          />
        </View>
      ))}
    </View>
  );
}
