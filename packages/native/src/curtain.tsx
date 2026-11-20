import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  Animated,
  Text as RNText,
  View,
  useWindowDimensions,
} from "react-native";
import { MOTION_TOKENS, SPACE_SCALE, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { standardEasing, useMotionEnv } from "./use-motion-env";
import type { NativeCurtainProps } from "./native.types";

type CurtainPhase = "idle" | "running";

/**
 * A full-screen wipe for route changes: it rises over the screen, names the destination
 * while covered so the content can swap unseen, then lifts away.
 */
export function Curtain({
  active,
  title,
  onCovered,
  onFinished,
  style,
  ...restProps
}: NativeCurtainProps): ReactElement | null {
  const { tokens, reduced } = useMotionEnv();
  const { height } = useWindowDimensions();
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const travel = useRef(new Animated.Value(0)).current;
  const callbacks = useRef({ onCovered, onFinished });
  callbacks.current = { onCovered, onFinished };

  useEffect(() => {
    if (active && phase === "idle") setPhase("running");
  }, [active, phase]);

  useEffect(() => {
    if (phase !== "running") return undefined;
    const duration = reduced
      ? MOTION_TOKENS.durInstant
      : Math.round(MOTION_TOKENS.durSlow * 1.6);
    const easing = standardEasing();
    travel.setValue(0);
    // 0 = below the screen, 1 = covering, 2 = lifted above it
    const sequence = Animated.sequence([
      Animated.timing(travel, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver: true,
      }),
      Animated.delay(MOTION_TOKENS.durSlow),
      Animated.timing(travel, {
        toValue: 2,
        duration,
        easing,
        useNativeDriver: true,
      }),
    ]);
    const covered = setTimeout(() => callbacks.current.onCovered?.(), duration);
    sequence.start(() => {
      setPhase("idle");
      callbacks.current.onFinished?.();
    });
    return () => {
      clearTimeout(covered);
      sequence.stop();
    };
  }, [phase, reduced, travel]);

  if (phase === "idle") return null;

  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.largeTitle.native;

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 130,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.colors.bg,
        },
        reduced
          ? {
              opacity: travel.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, 1, 0],
              }),
            }
          : {
              transform: [
                {
                  translateY: travel.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [height, 0, -height],
                  }),
                },
              ],
            },
        style,
      ]}
      {...restProps}
    >
      {title ? (
        <RNText
          style={{
            fontSize,
            lineHeight,
            fontWeight: "200",
            color: tokens.colors.text,
            paddingHorizontal: SPACE_SCALE[5],
          }}
        >
          {title}
        </RNText>
      ) : null}
      <View
        style={{
          position: "absolute",
          bottom: SPACE_SCALE[7],
          width: SPACE_SCALE[10],
          height: 1,
          backgroundColor: tokens.colors.accent,
        }}
      />
    </Animated.View>
  );
}
