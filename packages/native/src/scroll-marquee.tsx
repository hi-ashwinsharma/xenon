import { Fragment, type ReactElement } from "react";
import { ScrollView, Text as RNText, View } from "react-native";
import { SPACE_SCALE, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { useMotionEnv } from "./use-motion-env";
import type { NativeScrollMarqueeProps } from "./native.types";

/**
 * Native screens own their scroll, so the line is a horizontal swipe the reader drives
 * directly. It never moves on its own.
 */
export function ScrollMarquee({
  items,
  speed: _speed,
  label = "Highlights",
  style,
  ...restProps
}: NativeScrollMarqueeProps): ReactElement {
  const { tokens } = useMotionEnv();
  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.title1.native;

  return (
    <View accessibilityLabel={label} style={style} {...restProps}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: SPACE_SCALE[6],
          paddingHorizontal: SPACE_SCALE[5],
          paddingVertical: SPACE_SCALE[5],
        }}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <View
                style={{
                  width: SPACE_SCALE[1],
                  height: SPACE_SCALE[1],
                  borderRadius: SPACE_SCALE[1] / 2,
                  backgroundColor: tokens.colors.accent,
                }}
              />
            )}
            {typeof item === "string" ? (
              <RNText
                style={{
                  fontSize,
                  lineHeight,
                  fontWeight: "200",
                  color: tokens.colors.textMuted,
                }}
              >
                {item}
              </RNText>
            ) : (
              item
            )}
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}
