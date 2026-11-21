import { useEffect, useMemo, useRef, type ReactElement } from "react";
import { Animated, Text as RNText, View } from "react-native";
import { MOTION_TOKENS, TYPOGRAPHY_SCALE } from "@xenon/tokens";
import { odometerGlyphs, odometerTravel } from "@xenon/core";
import { standardEasing, useMotionEnv } from "./use-motion-env";
import type { NativeOdometerProps } from "./native.types";

const ROWS: readonly number[] = Array.from({ length: 20 }, (_, i) => i % 10);

interface DigitColumnProps {
  readonly digit: number;
  readonly step: number;
  readonly lineHeight: number;
  readonly reduced: boolean;
  readonly textStyle: NativeOdometerProps["textStyle"];
  readonly color: string;
  readonly fontSize: number;
}

function DigitColumn({
  digit,
  step,
  lineHeight,
  reduced,
  textStyle,
  color,
  fontSize,
}: DigitColumnProps): ReactElement {
  const offset = useRef(new Animated.Value(0)).current;
  const travel = odometerTravel(digit);

  useEffect(() => {
    if (reduced) {
      offset.setValue(travel);
      return undefined;
    }
    const animation = Animated.timing(offset, {
      toValue: travel,
      duration: MOTION_TOKENS.durSlow * 4,
      delay: MOTION_TOKENS.durInstant * step,
      easing: standardEasing(),
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [offset, travel, step, reduced]);

  return (
    <View style={{ height: lineHeight, overflow: "hidden" }}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: Animated.multiply(offset, -lineHeight),
            },
          ],
        }}
      >
        {ROWS.map((row, index) => (
          <RNText
            key={index}
            allowFontScaling={false}
            style={[
              {
                height: lineHeight,
                lineHeight,
                fontSize,
                color,
                fontWeight: "200",
                fontVariant: ["tabular-nums"],
                textAlign: "center",
              },
              textStyle,
            ]}
          >
            {row}
          </RNText>
        ))}
      </Animated.View>
    </View>
  );
}

/** A number whose digits roll into place like a mechanical counter when it mounts. */
export function Odometer({
  value,
  prefix,
  locale = "en-US",
  order = 0,
  style,
  textStyle,
  ...restProps
}: NativeOdometerProps): ReactElement {
  const { tokens, reduced } = useMotionEnv();
  const glyphs = useMemo(() => odometerGlyphs(value, locale), [value, locale]);
  const { fontSize, lineHeight } = TYPOGRAPHY_SCALE.title1.native;
  const spoken = `${prefix ?? ""}${glyphs
    .map((glyph) => (glyph.kind === "digit" ? String(glyph.digit) : glyph.char))
    .join("")}`;
  const staticText = [
    {
      fontSize,
      lineHeight,
      color: tokens.colors.text,
      fontWeight: "200" as const,
    },
    textStyle,
  ];
  let column = 0;

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={spoken}
      style={[{ flexDirection: "row", alignItems: "flex-end" }, style]}
      {...restProps}
    >
      {prefix ? (
        <RNText allowFontScaling={false} style={staticText}>
          {prefix}
        </RNText>
      ) : null}
      {glyphs.map((glyph, index) => {
        if (glyph.kind === "char") {
          return (
            <RNText
              key={`c${index}`}
              allowFontScaling={false}
              style={staticText}
            >
              {glyph.char}
            </RNText>
          );
        }
        const step = order + column * 0.8;
        column += 1;
        return (
          <DigitColumn
            key={`d${index}`}
            digit={glyph.digit}
            step={step}
            lineHeight={lineHeight}
            reduced={reduced}
            textStyle={textStyle}
            color={tokens.colors.text}
            fontSize={fontSize}
          />
        );
      })}
    </View>
  );
}
