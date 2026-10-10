export type Theme = "dark" | "light" | "system";

export type ResolvedTheme = "dark" | "light";

export type Accent =
  | "lime"
  | "orange"
  | "pink"
  | "blue"
  | "purple"
  | "green";

export type RadiusStop = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ControlSize = "sm" | "md" | "lg";

export type LiquidGlassVariant = "regular" | "clear";

export type FontWeight = 200 | 300 | 400;

export type TextStyleKey =
  | "display"
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2";

export interface PlatformTypographyStyle {
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly letterSpacing: number;
}

export interface TypographyTokenDefinition {
  readonly name: TextStyleKey;
  readonly weight: FontWeight;
  readonly native: PlatformTypographyStyle;
  readonly web: PlatformTypographyStyle & {
    readonly remSize: string;
    readonly remLineHeight: string;
  };
}

export interface NeutralColors {
  readonly bg: string;
  readonly surface: string;
  readonly surface2: string;
  readonly text: string;
  readonly textMuted: string;
  readonly border: string;
  readonly borderActive: string;
}

export interface AccentColorPair {
  readonly dark: string;
  readonly light: string;
}

export interface SemanticColors {
  readonly danger: string;
  readonly warning: string;
  readonly success: string;
  readonly info: string;
}

export interface SpringParameters {
  readonly stiffness: number;
  readonly damping: number;
  readonly mass: number;
}

export interface MotionTokenDefinition {
  readonly durInstant: number;
  readonly durFast: number;
  readonly durBase: number;
  readonly durSlow: number;
  readonly easeStandard: string;
  readonly springSoft: SpringParameters;
  readonly pressScale: number;
}

export interface GlassVariantDefinition {
  readonly webBlurPx: number;
  readonly nativeBlurIntensity: number;
  readonly darkTint: string;
  readonly lightTint: string;
  readonly dimmingLayer?: string;
  readonly fallbackDark: string;
  readonly fallbackLight: string;
}

export interface RadiusStopValues {
  readonly stop: RadiusStop;
  readonly control: number;
  readonly surface: number;
  readonly joint: number;
}

export interface CompiledNativeTokens {
  readonly theme: ResolvedTheme;
  readonly accent: Accent;
  readonly colors: NeutralColors & {
    readonly accent: string;
    readonly onAccent: string;
    readonly semantic: SemanticColors;
  };
  readonly space: Readonly<Record<number, number>>;
  readonly control: {
    readonly sm: number;
    readonly md: number;
    readonly lg: number;
    readonly hitMin: number;
  };
  readonly radius: Readonly<Record<RadiusStop, RadiusStopValues>>;
  readonly typography: Readonly<
    Record<TextStyleKey, TypographyTokenDefinition>
  >;
  readonly motion: MotionTokenDefinition;
  readonly glass: Readonly<Record<LiquidGlassVariant, GlassVariantDefinition>>;
}
