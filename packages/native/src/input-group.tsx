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
import { useXenon } from "./provider";
import type { NativeInputGroupProps } from "./native.types";

export function InputGroup({
  size = "md",
  invalid = false,
  disabled = false,
  children,
  style,
  ...restProps
}: NativeInputGroupProps): ReactElement {
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
    return {
      flexDirection: "row",
      alignItems: "stretch",
      width: "100%",
      height,
      borderRadius: outerRadius,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: invalid
        ? nativeTokens.colors.semantic.danger
        : nativeTokens.colors.border,
      backgroundColor: nativeTokens.colors.surface,
      overflow: "hidden",
      opacity: disabled ? 0.4 : 1,
    };
  }, [height, outerRadius, invalid, disabled, nativeTokens]);

  const childArray = Children.toArray(children).filter(Boolean);

  return (
    <View
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
              }>,
              {
                size,
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
              flex: index === 0 ? 1 : undefined,
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
