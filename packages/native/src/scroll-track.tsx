import { useRef, useState, type ReactElement } from "react";
import { Animated, ScrollView, View } from "react-native";
import { SPACE_SCALE } from "@xenon/tokens";
import { useMotionEnv } from "./use-motion-env";
import type { NativeScrollTrackProps } from "./native.types";

/** On touch the row is a native swipe, with a hairline that tracks how far along it is. */
export function ScrollTrack({
  children,
  label = "Scrolling row",
  style,
  ...restProps
}: NativeScrollTrackProps): ReactElement {
  const { tokens } = useMotionEnv();
  const offset = useRef(new Animated.Value(0)).current;
  const [range, setRange] = useState<number>(1);
  const [viewport, setViewport] = useState<number>(0);

  return (
    <View
      accessibilityLabel={label}
      style={[{ gap: SPACE_SCALE[5] }, style]}
      {...restProps}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onLayout={(event) => setViewport(event.nativeEvent.layout.width)}
        onContentSizeChange={(width) => setRange(Math.max(1, width - viewport))}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: offset } } }],
          { useNativeDriver: false },
        )}
        contentContainerStyle={{
          gap: SPACE_SCALE[5],
          paddingHorizontal: SPACE_SCALE[5],
        }}
      >
        {children}
      </ScrollView>
      <View
        style={{
          alignSelf: "center",
          width: SPACE_SCALE[10] * 1.5,
          height: 1,
          backgroundColor: tokens.colors.border,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            backgroundColor: tokens.colors.accent,
            width: offset.interpolate({
              inputRange: [0, range],
              outputRange: ["0%", "100%"],
              extrapolate: "clamp",
            }),
          }}
        />
      </View>
    </View>
  );
}
