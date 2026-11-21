import { useEffect, useMemo, useState } from "react";
import { AccessibilityInfo, Easing } from "react-native";
import {
  MOTION_TOKENS,
  compileNativeTokens,
  type Accent,
  type CompiledNativeTokens,
  type ResolvedTheme,
} from "@xenon/tokens";
import { useXenon } from "./provider";

export interface MotionEnv {
  readonly tokens: CompiledNativeTokens;
  /** True when the OS asks for reduced motion */
  readonly reduced: boolean;
}

/** Theme tokens plus the OS reduced-motion setting, shared by the motion components. */
export function useMotionEnv(): MotionEnv {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let amoled = true;
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    amoled = xenon.amoled;
  } catch {
    // Rendered outside a provider: fall back to the default dark lime theme
  }
  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent, amoled),
    [resolvedTheme, accent, amoled],
  );
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (!cancelled) setReduced(value);
    });
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduced,
    );
    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, []);

  return { tokens, reduced };
}

/** The standard ease token as a React Native easing function, parsed from its cubic-bezier string. */
export function standardEasing(): (value: number) => number {
  const points = MOTION_TOKENS.easeStandard.match(/-?\d*\.?\d+/g)?.map(Number);
  if (!points || points.length !== 4) return Easing.out(Easing.cubic);
  const [x1 = 0, y1 = 0, x2 = 0, y2 = 1] = points;
  return Easing.bezier(x1, y1, x2, y2);
}

/** The soft spring token in Animated's spring config shape. */
export const SPRING_SOFT = {
  stiffness: MOTION_TOKENS.springSoft.stiffness,
  damping: MOTION_TOKENS.springSoft.damping,
  mass: MOTION_TOKENS.springSoft.mass,
} as const;
