import { useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, Text as RNText, View } from "react-native";
import { MOTION_TOKENS, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { standardEasing, useMotionEnv } from "./use-motion-env";
import type { NativeLiquidTextProps } from "./native.types";

/**
 * A wordmark that fills with the accent from the bottom up. Native text has no
 * outline stroke or masks, so the empty word is muted and the fill rises as a flat level.
 */
export function LiquidText({
  children,
  progress = 1,
  style,
  textStyle,
  ...restProps
}: NativeLiquidTextProps): ReactElement {
  const { tokens, reduced } = useMotionEnv();
  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.display.native;
  const [boxHeight, setBoxHeight] = useState<number>(lineHeight);
  const level = useRef(new Animated.Value(0)).current;
  const clamped = Math.min(1, Math.max(0, progress));

  useEffect(() => {
    const animation = Animated.timing(level, {
      toValue: clamped,
      duration: reduced ? 0 : MOTION_TOKENS.durSlow * 2,
      easing: standardEasing(),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [clamped, level, reduced]);

  const glyph = [
    { fontSize, lineHeight, fontWeight: "200" as const },
    textStyle,
  ];

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={children}
      style={[{ alignSelf: "flex-start" }, style]}
      onLayout={(event) => setBoxHeight(event.nativeEvent.layout.height)}
      {...restProps}
    >
      <RNText style={[glyph, { color: tokens.colors.borderActive }]}>
        {children}
      </RNText>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          height: level.interpolate({
            inputRange: [0, 1],
            outputRange: [0, boxHeight],
          }),
        }}
      >
        <RNText
          style={[
            glyph,
            {
              color: tokens.colors.accent,
              position: "absolute",
              bottom: 0,
              left: 0,
            },
          ]}
        >
          {children}
        </RNText>
      </Animated.View>
    </View>
  );
}
