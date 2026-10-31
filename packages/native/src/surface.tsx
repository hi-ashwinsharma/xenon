import { createContext, useContext, useMemo, type ReactElement } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  RADIUS_STOPS,
  SPACE_SCALE,
  SURFACE_RADIUS_CAP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { computeNestedRadius } from "@xenon/core";
import { useXenon } from "./provider";
import type {
  NativeSurfaceContextValue,
  NativeSurfaceProps,
} from "./native.types";

const SurfaceContext = createContext<NativeSurfaceContextValue | null>(null);

export function useSurface(): NativeSurfaceContextValue | null {
  return useContext(SurfaceContext);
}

export function Surface({
  variant = "default",
  radius: explicitRadius,
  padding: explicitPadding,
  interactive: _interactive,
  children,
  style,
  ...restProps
}: NativeSurfaceProps): ReactElement {
  let xenonRadiusStop: RadiusStop = DEFAULT_RADIUS_STOP;
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";

  try {
    const xenon = useXenon();
    xenonRadiusStop = xenon.radius;
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
  } catch {
    // Falls back if rendered outside provider
  }

  const nativeTokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  const parentSurface = useSurface();
  const padding =
    typeof explicitPadding === "number" ? explicitPadding : SPACE_SCALE[4]; // 24dp

  let surfaceRadius: number;
  if (typeof explicitRadius === "number") {
    surfaceRadius = Math.min(explicitRadius, SURFACE_RADIUS_CAP);
  } else {
    const stop = explicitRadius ?? xenonRadiusStop;
    surfaceRadius = RADIUS_STOPS[stop].surface;
  }

  const effectiveRadius = parentSurface
    ? computeNestedRadius(parentSurface.parentRadius, parentSurface.padding)
    : surfaceRadius;

  const surfaceStyle: ViewStyle = useMemo(() => {
    const bg =
      variant === "accent"
        ? nativeTokens.colors.accent
        : variant === "subtle"
          ? nativeTokens.colors.surface2
          : nativeTokens.colors.surface;

    return {
      padding,
      borderRadius: effectiveRadius,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: nativeTokens.colors.border,
      backgroundColor: bg,
    };
  }, [padding, effectiveRadius, variant, nativeTokens]);

  const contextValue: NativeSurfaceContextValue = useMemo(
    () => ({
      parentRadius: effectiveRadius,
      padding,
    }),
    [effectiveRadius, padding],
  );

  return (
    <SurfaceContext.Provider value={contextValue}>
      <View style={[surfaceStyle, style]} {...restProps}>
        {children}
      </View>
    </SurfaceContext.Provider>
  );
}
