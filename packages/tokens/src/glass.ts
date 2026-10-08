import type {
  GlassVariantDefinition,
  LiquidGlassVariant,
} from "./tokens.types.js";

export const LIQUID_GLASS_TOKENS: Readonly<
  Record<LiquidGlassVariant, GlassVariantDefinition>
> = {
  regular: {
    webBlurPx: 20,
    nativeBlurIntensity: 50,
    darkTint: "rgba(0, 0, 0, 0.72)",
    lightTint: "rgba(255, 255, 255, 0.80)",
    fallbackDark: "#000000",
    fallbackLight: "#FFFFFF",
  },
  clear: {
    webBlurPx: 10,
    nativeBlurIntensity: 25,
    darkTint: "rgba(0, 0, 0, 0.40)",
    lightTint: "rgba(255, 255, 255, 0.50)",
    dimmingLayer: "rgba(0, 0, 0, 0.35)",
    fallbackDark: "#111111",
    fallbackLight: "#F4F4F4",
  },
} as const;
