import { useEffect, useRef, type ReactElement } from "react";
import { Animated, Easing, View } from "react-native";
import { MOTION_TOKENS, SPACE_SCALE } from "@xenon/tokens";
import { useLoopGuard } from "./use-loop-guard";
import { LoopPause } from "./loop-pause";
import type { NativeFloatProps } from "./native.types";

/**
 * Showcase screens only: lets its child bob gently in place when `autoplay` is on.
 * Guarded: stops in the background and under reduced motion, with a pause control.
 */
export function Float({
  autoplay = false,
  beats = 16,
  offset = 0,
  children,
  style,
  ...restProps
}: NativeFloatProps): ReactElement {
  const guard = useLoopGuard(autoplay);
  const phase = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!guard.running) return undefined;
    const half = (MOTION_TOKENS.durSlow * Math.max(1, Math.round(beats))) / 2;
    const ease = Easing.inOut(Easing.sin);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(phase, {
          toValue: 1,
          duration: half,
          easing: ease,
          useNativeDriver: true,
        }),
        Animated.timing(phase, {
          toValue: 0,
          duration: half,
          easing: ease,
          useNativeDriver: true,
        }),
      ]),
    );
    const start = setTimeout(
      () => loop.start(),
      MOTION_TOKENS.durSlow * Math.max(0, Math.round(offset)),
    );
    return () => {
      clearTimeout(start);
      loop.stop();
    };
  }, [guard.running, beats, offset, phase]);

  return (
    <View style={style} {...restProps}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: phase.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -SPACE_SCALE[2]],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
      {guard.showControl && (
        <View style={{ alignSelf: "flex-end" }}>
          <LoopPause paused={guard.paused} onToggle={guard.togglePaused} />
        </View>
      )}
    </View>
  );
}
