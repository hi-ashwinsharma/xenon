import { useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, View } from "react-native";
import { MOTION_TOKENS, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { standardEasing, useMotionEnv } from "./use-motion-env";
import type { NativeTextRollProps } from "./native.types";

/** A word that rolls up and out as its replacement rolls in from below whenever `value` changes. */
export function TextRoll({
  value,
  style,
  textStyle,
  ...restProps
}: NativeTextRollProps): ReactElement {
  const { tokens, reduced } = useMotionEnv();
  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.body.native;
  const [current, setCurrent] = useState<string>(value);
  const [previous, setPrevious] = useState<string | null>(null);
  const progress = useRef(new Animated.Value(1)).current;

  if (current !== value) {
    setPrevious(current);
    setCurrent(value);
  }

  useEffect(() => {
    if (previous === null) return undefined;
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: reduced ? MOTION_TOKENS.durInstant : MOTION_TOKENS.durSlow * 2,
      easing: standardEasing(),
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished) setPrevious(null);
    });
    return () => animation.stop();
  }, [current, previous, progress, reduced]);

  const travel = lineHeight * 1.1;
  const textBase = [
    { fontSize, lineHeight, color: tokens.colors.text, fontWeight: "300" as const },
    textStyle,
  ];

  return (
    <View
      accessibilityLiveRegion="polite"
      style={[{ height: lineHeight, overflow: "hidden" }, style]}
      {...restProps}
    >
      {previous !== null && (
        <Animated.Text
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[
            textBase,
            {
              position: "absolute",
              opacity: progress.interpolate({
                inputRange: [0, 0.5],
                outputRange: [1, 0],
                extrapolate: "clamp",
              }),
              transform: reduced
                ? []
                : [
                    {
                      translateY: progress.interpolate({
                        inputRange: [0, 0.5],
                        outputRange: [0, -travel],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
            },
          ]}
        >
          {previous}
        </Animated.Text>
      )}
      <Animated.Text
        style={[
          textBase,
          previous === null
            ? null
            : {
                opacity: progress.interpolate({
                  inputRange: [0, 0.3, 1],
                  outputRange: [0, 0, 1],
                }),
                transform: reduced
                  ? []
                  : [
                      {
                        translateY: progress.interpolate({
                          inputRange: [0, 0.3, 1],
                          outputRange: [travel, travel, 0],
                        }),
                      },
                    ],
              },
        ]}
      >
        {current}
      </Animated.Text>
    </View>
  );
}
