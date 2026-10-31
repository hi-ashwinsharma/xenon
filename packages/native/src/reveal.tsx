import { useEffect, useRef, type ReactElement } from "react";
import { AccessibilityInfo, Animated } from "react-native";
import { MOTION_TOKENS, SPACE_SCALE } from "@xenon/tokens";
import type { NativeRevealProps } from "./native.types";

export function Reveal({
  order = 0,
  children,
  style,
  ...restProps
}: NativeRevealProps): ReactElement {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (cancelled) return;
      if (reduced) {
        progress.setValue(1);
        return;
      }
      Animated.spring(progress, {
        toValue: 1,
        delay: order * MOTION_TOKENS.durInstant,
        stiffness: MOTION_TOKENS.springSoft.stiffness,
        damping: MOTION_TOKENS.springSoft.damping,
        mass: MOTION_TOKENS.springSoft.mass,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      cancelled = true;
    };
  }, [order, progress]);

  return (
    <Animated.View
      style={[
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [SPACE_SCALE[3], 0],
              }),
            },
          ],
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </Animated.View>
  );
}
