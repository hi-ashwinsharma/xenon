import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
} from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import {
  CONTROL_HEIGHTS,
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { clampControlRadius } from "@xenon/core";
import { useXenon } from "./provider.js";
import type { NativeButtonGroupProps } from "./native.types.js";

export function ButtonGroup({
  size = "md",
  variant = "filled",
  disabled = false,
  children,
  style,
  ...restProps
}: NativeButtonGroupProps): ReactElement {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radius: RadiusStop = DEFAULT_RADIUS_STOP;

  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radius = xenon.radius;
  } catch {
    // Fallback if rendered outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const height = CONTROL_HEIGHTS[size];
  const outerRadius = clampControlRadius(height, radius);

  const containerStyle: ViewStyle = useMemo(() => {
    const base: ViewStyle = {
      flexDirection: "row",
      alignItems: "stretch",
      height,
      borderRadius: outerRadius,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: nativeTokens.colors.border,
      overflow: "hidden",
      opacity: disabled ? 0.4 : 1,
    };

    switch (variant) {
      case "subtle":
        return {
          ...base,
          backgroundColor: nativeTokens.colors.surface2,
        };
      case "outline":
      case "ghost":
        return {
          ...base,
          backgroundColor: "transparent",
        };
      case "filled":
      default:
        return {
          ...base,
          backgroundColor: nativeTokens.colors.surface,
        };
    }
  }, [height, outerRadius, disabled, variant, nativeTokens]);

  const childArray = Children.toArray(children).filter(Boolean);

  return (
    <View
      accessibilityRole="toolbar"
      pointerEvents={disabled ? "none" : "auto"}
      style={[containerStyle, style]}
      {...restProps}
    >
      {childArray.map((child, index) => {
        const isNotLast = index < childArray.length - 1;

        const renderedChild = isValidElement(child)
          ? cloneElement(
              child as ReactElement<{
                style?: ViewStyle;
                size?: typeof size;
                variant?: typeof variant;
              }>,
              {
                size,
                variant: "ghost",
                style: {
                  borderRadius: 0,
                  borderWidth: 0,
                  height: "100%",
                },
              },
            )
          : child;

        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            {renderedChild}
            {isNotLast && (
              <View
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
                style={{
                  width: StyleSheet.hairlineWidth,
                  height: "55%",
                  backgroundColor: nativeTokens.colors.border,
                  alignSelf: "center",
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
