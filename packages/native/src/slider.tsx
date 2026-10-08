import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import {
  PanResponder,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type PanResponderGestureState,
  type ViewStyle,
} from "react-native";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import {
  clampValue,
  snapToStep,
  valueToPercent,
  percentToValue,
  type SliderSize,
} from "@xenon/core";
import { useXenon } from "./provider";
import type { NativeSliderProps } from "./native.types";

function getSliderDimensions(size: SliderSize = "md"): {
  trackHeight: number;
  thumbSize: number;
  hitHeight: number;
} {
  switch (size) {
    case "sm":
      return { trackHeight: 3, thumbSize: 14, hitHeight: 36 };
    case "lg":
      return { trackHeight: 6, thumbSize: 22, hitHeight: 48 };
    case "md":
    default:
      return { trackHeight: 4, thumbSize: 18, hitHeight: 40 };
  }
}

export function Slider({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = "md",
  onValueChange,
  onValueCommit,
  "aria-label": ariaLabel,
  style,
}: NativeSliderProps): ReactElement {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number>(() =>
    snapToStep(defaultValue, min, max, step),
  );
  const currentValue = isControlled
    ? clampValue(controlledValue, min, max)
    : internalValue;

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const trackWidthRef = useRef<number>(0);
  const startLocationXRef = useRef<number>(0);

  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Fallback if rendered outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const { trackHeight, thumbSize, hitHeight } = getSliderDimensions(size);
  const percent = valueToPercent(currentValue, min, max);

  const handleUpdateX = useCallback(
    (locationX: number): number => {
      const width = trackWidthRef.current;
      if (width <= 0) {
        return currentValue;
      }
      const rawPercent = (locationX / width) * 100;
      const nextValue = percentToValue(rawPercent, min, max, step);
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
      return nextValue;
    },
    [currentValue, isControlled, min, max, step, onValueChange],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          setIsDragging(true);
          startLocationXRef.current = evt.nativeEvent.locationX;
          handleUpdateX(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          const width = trackWidthRef.current;
          if (width <= 0) {
            return;
          }
          const currentX = startLocationXRef.current + gestureState.dx;
          handleUpdateX(currentX);
        },
        onPanResponderRelease: (
          _evt: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          setIsDragging(false);
          const currentX = startLocationXRef.current + gestureState.dx;
          const finalVal = handleUpdateX(currentX);
          onValueCommit?.(finalVal);
        },
        onPanResponderTerminate: () => {
          setIsDragging(false);
        },
      }),
    [disabled, handleUpdateX, onValueCommit],
  );

  const handleLayout = (e: LayoutChangeEvent): void => {
    trackWidthRef.current = e.nativeEvent.layout.width;
  };

  const containerStyle: ViewStyle = {
    height: hitHeight,
    justifyContent: "center",
    opacity: disabled ? 0.45 : 1,
    position: "relative",
  };

  const trackBgStyle: ViewStyle = {
    height: trackHeight,
    width: "100%",
    borderRadius: 9999,
    backgroundColor: nativeTokens.colors.surface2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: nativeTokens.colors.border,
    overflow: "hidden",
  };

  const trackFillStyle: ViewStyle = {
    height: "100%",
    width: `${percent}%`,
    backgroundColor: nativeTokens.colors.accent,
  };

  const leftOffset = (percent / 100) * trackWidthRef.current - thumbSize / 2;

  const thumbStyle: ViewStyle = {
    position: "absolute",
    left: Math.max(0, leftOffset || 0),
    top: (hitHeight - thumbSize) / 2,
    width: thumbSize,
    height: thumbSize,
    borderRadius: 9999,
    backgroundColor: nativeTokens.colors.text,
    borderWidth: StyleSheet.hairlineWidth * 1.5,
    borderColor: nativeTokens.colors.border,
    transform: [{ scale: isDragging ? 1.15 : 1 }],
  };

  return (
    <View
      accessibilityLabel={ariaLabel}
      accessibilityRole="adjustable"
      accessibilityValue={{
        min,
        max,
        now: currentValue,
      }}
      onLayout={handleLayout}
      style={[containerStyle, style]}
      {...panResponder.panHandlers}
    >
      <View style={trackBgStyle}>
        <View style={trackFillStyle} />
      </View>
      <View style={thumbStyle} />
    </View>
  );
}
