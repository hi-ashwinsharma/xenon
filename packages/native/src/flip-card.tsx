import { useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, Pressable } from "react-native";
import {
  BORDER_WIDTH_NATIVE_DP,
  DEFAULT_RADIUS_STOP,
  MOTION_TOKENS,
  SPACE_SCALE,
  type RadiusStop,
} from "@xenon/tokens";
import { SPRING_SOFT, useMotionEnv } from "./use-motion-env";
import { useXenon } from "./provider";
import type { NativeFlipCardProps } from "./native.types";

/** A card that turns over on press to reveal what is behind the headline. */
export function FlipCard({
  front,
  back,
  label,
  flipped,
  defaultFlipped = false,
  onFlippedChange,
  style,
  ...restProps
}: NativeFlipCardProps): ReactElement {
  const { tokens, reduced } = useMotionEnv();
  let radiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    radiusStop = useXenon().radius;
  } catch {
    // Outside a provider: keep the default radius stop
  }
  const radius = tokens.radius[radiusStop].surface;
  const [innerFlipped, setInnerFlipped] = useState<boolean>(defaultFlipped);
  const isFlipped = flipped ?? innerFlipped;
  const turn = useRef(new Animated.Value(isFlipped ? 1 : 0)).current;

  useEffect(() => {
    const animation = reduced
      ? Animated.timing(turn, {
          toValue: isFlipped ? 1 : 0,
          duration: MOTION_TOKENS.durInstant,
          useNativeDriver: true,
        })
      : Animated.spring(turn, {
          toValue: isFlipped ? 1 : 0,
          ...SPRING_SOFT,
          useNativeDriver: true,
        });
    animation.start();
    return () => animation.stop();
  }, [isFlipped, reduced, turn]);

  const toggle = (): void => {
    const next = !isFlipped;
    if (flipped === undefined) setInnerFlipped(next);
    onFlippedChange?.(next);
  };

  const face = {
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: SPACE_SCALE[5],
    gap: SPACE_SCALE[3],
    borderRadius: radius,
    borderWidth: BORDER_WIDTH_NATIVE_DP,
    borderColor: tokens.colors.border,
    backfaceVisibility: "hidden" as const,
  };

  const frontStyle = reduced
    ? { opacity: turn.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }
    : {
        transform: [
          { perspective: SPACE_SCALE[10] * 11 },
          {
            rotateY: turn.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "180deg"],
            }),
          },
        ],
      };
  const backStyle = reduced
    ? { opacity: turn }
    : {
        transform: [
          { perspective: SPACE_SCALE[10] * 11 },
          {
            rotateY: turn.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "360deg"],
            }),
          },
        ],
      };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Turns the card over"
      accessibilityState={{ selected: isFlipped }}
      onPress={toggle}
      style={({ pressed }) => [
        {
          minHeight: SPACE_SCALE[10] * 2,
          transform: [{ scale: pressed ? MOTION_TOKENS.pressScale : 1 }],
        },
        style,
      ]}
      {...restProps}
    >
      <Animated.View
        style={[face, { backgroundColor: tokens.colors.surface }, frontStyle]}
        importantForAccessibility={isFlipped ? "no-hide-descendants" : "auto"}
      >
        {front}
      </Animated.View>
      <Animated.View
        style={[face, { backgroundColor: tokens.colors.surface2 }, backStyle]}
        importantForAccessibility={isFlipped ? "auto" : "no-hide-descendants"}
      >
        {back}
      </Animated.View>
    </Pressable>
  );
}
