export type Theme = "dark" | "light" | "system";

export type Accent = "lime" | "pink" | "blue" | "purple" | "green";

export type RadiusStop = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ControlSize = "sm" | "md" | "lg";

export type LiquidGlassVariant = "regular" | "clear";

export type FontWeight = 200 | 300 | 400;

export interface TokenMetadata {
  readonly version: string;
  readonly defaultTheme: Theme;
  readonly defaultAccent: Accent;
  readonly defaultRadius: RadiusStop;
}
