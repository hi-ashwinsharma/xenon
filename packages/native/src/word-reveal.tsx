import { useEffect, useMemo, useRef, type ReactElement } from "react";
import { Animated, View } from "react-native";
import { MOTION_TOKENS, SPACE_SCALE, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { standardEasing, useMotionEnv } from "./use-motion-env";
import type { NativeWordRevealProps } from "./native.types";

const WORD_STEP = 0.4;
const MAX_STAGGERED = 6;

/** Splits a headline into words that rise and turn upright one after another on mount. */
export function WordReveal({
  text,
  order = 0,
  style,
  textStyle,
  ...restProps
}: NativeWordRevealProps): ReactElement {
  const { tokens, reduced } = useMotionEnv();
  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.title1.native;
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const values = useRef<Animated.Value[]>([]);
  values.current = words.map(
    (_, index) => values.current[index] ?? new Animated.Value(0),
  );

  useEffect(() => {
    const easing = standardEasing();
    const animations = values.current.map((value, index) =>
      Animated.timing(value, {
        toValue: 1,
        duration: reduced ? MOTION_TOKENS.durInstant : MOTION_TOKENS.durSlow * 3,
        delay: reduced
          ? 0
          : MOTION_TOKENS.durInstant *
            (order + Math.min(index, MAX_STAGGERED - 1) * WORD_STEP),
        easing,
        useNativeDriver: true,
      }),
    );
    const group = Animated.parallel(animations);
    group.start();
    return () => group.stop();
  }, [words, order, reduced]);

  return (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={text}
      style={[{ flexDirection: "row", flexWrap: "wrap", columnGap: SPACE_SCALE[2] }, style]}
      {...restProps}
    >
      {words.map((word, index) => {
        const value = values.current[index] ?? new Animated.Value(1);
        return (
          <Animated.Text
            key={index}
            style={[
              {
                fontSize,
                lineHeight,
                fontWeight: "200",
                color: tokens.colors.text,
                opacity: value,
                transform: reduced
                  ? []
                  : [
                      { perspective: SPACE_SCALE[10] * 6 },
                      {
                        translateY: value.interpolate({
                          inputRange: [0, 1],
                          outputRange: [lineHeight * 0.7, 0],
                        }),
                      },
                      {
                        rotateX: value.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["-40deg", "0deg"],
                        }),
                      },
                    ],
              },
              textStyle,
            ]}
          >
            {word}
          </Animated.Text>
        );
      })}
    </View>
  );
}
