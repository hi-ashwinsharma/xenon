import {
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
} from "react";
import { View, type ViewStyle } from "react-native";
import type { IconSize } from "@xenon/core";
import {
  compileNativeTokens,
  type Accent,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";
import type { NativeIconProps } from "./native.types";

function resolveIconSize(size?: IconSize): number {
  if (typeof size === "number") {
    return size;
  }
  switch (size) {
    case "sm":
      return 16;
    case "lg":
      return 24;
    case "md":
    default:
      return 20;
  }
}

export function Icon({
  size = "md",
  color,
  weight = "thin",
  ariaLabel,
  ariaHidden,
  children,
  style,
  ...restProps
}: NativeIconProps): ReactElement {
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

  const pixelSize = resolveIconSize(size);
  const effectiveColor = color ?? nativeTokens.colors.text;
  const isHidden = ariaHidden ?? !ariaLabel;

  const iconStyle: ViewStyle = useMemo(
    () => ({
      width: pixelSize,
      height: pixelSize,
      alignItems: "center",
      justifyContent: "center",
    }),
    [pixelSize],
  );

  const renderedChild = useMemo(() => {
    if (isValidElement(children)) {
      return cloneElement(
        children as ReactElement<{
          size?: number;
          weight?: string;
          color?: string;
        }>,
        {
          size: pixelSize,
          weight: "thin", // Enforce Thin weight strictly
          color: effectiveColor,
        },
      );
    }
    return children;
  }, [children, pixelSize, effectiveColor]);

  return (
    <View
      accessibilityElementsHidden={isHidden}
      accessibilityLabel={ariaLabel}
      accessibilityRole={ariaLabel ? "image" : "none"}
      importantForAccessibility={isHidden ? "no" : "yes"}
      style={[iconStyle, style]}
      {...restProps}
    >
      {renderedChild}
    </View>
  );
}
