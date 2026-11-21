import { useEffect, useRef, useState, type ReactElement } from "react";
import { Animated, Pressable, Text as RNText, View } from "react-native";
import { SPACE_SCALE, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { SPRING_SOFT, useMotionEnv } from "./use-motion-env";
import type { NativeNavLensProps } from "./native.types";

interface LinkFrame {
  readonly x: number;
  readonly width: number;
}

/**
 * Section links with a lens that glides under the current section. The screen reports
 * the current section through `activeSectionId`, since native views own their scroll.
 */
export function NavLens({
  items,
  label = "Sections",
  activeSectionId,
  onNavigate,
  style,
  ...restProps
}: NativeNavLensProps): ReactElement {
  const { tokens, reduced } = useMotionEnv();
  const [frames, setFrames] = useState<Record<string, LinkFrame>>({});
  const x = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;
  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.subhead.native;
  const frame = activeSectionId ? frames[activeSectionId] : undefined;

  useEffect(() => {
    if (!frame) return undefined;
    if (reduced) {
      x.setValue(frame.x);
      width.setValue(frame.width);
      return undefined;
    }
    const animation = Animated.parallel([
      Animated.spring(x, {
        toValue: frame.x,
        ...SPRING_SOFT,
        useNativeDriver: false,
      }),
      Animated.spring(width, {
        toValue: frame.width,
        ...SPRING_SOFT,
        useNativeDriver: false,
      }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [frame, reduced, width, x]);

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={label}
      style={[{ flexDirection: "row", gap: SPACE_SCALE[1] }, style]}
      {...restProps}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: x,
          width,
          opacity: frame ? 1 : 0,
          borderWidth: 1,
          borderColor: tokens.colors.border,
          borderRadius: SPACE_SCALE[3],
          backgroundColor: tokens.colors.surface2,
        }}
      />
      {items.map((item) => {
        const current = item.sectionId === activeSectionId;
        return (
          <Pressable
            key={item.sectionId}
            accessibilityRole="tab"
            accessibilityState={{ selected: current }}
            hitSlop={SPACE_SCALE[2]}
            onPress={() => onNavigate?.(item.sectionId)}
            onLayout={(event) => {
              const { x: left, width: linkWidth } = event.nativeEvent.layout;
              setFrames((previous) => ({
                ...previous,
                [item.sectionId]: { x: left, width: linkWidth },
              }));
            }}
            style={{
              paddingVertical: SPACE_SCALE[2],
              paddingHorizontal: SPACE_SCALE[3],
            }}
          >
            <RNText
              style={{
                fontSize,
                lineHeight,
                fontWeight: "300",
                color: current ? tokens.colors.text : tokens.colors.textMuted,
              }}
            >
              {item.label}
            </RNText>
          </Pressable>
        );
      })}
    </View>
  );
}
