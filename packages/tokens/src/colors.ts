import type {
  Accent,
  AccentColorPair,
  NeutralColors,
  ResolvedTheme,
  SemanticColors,
} from "./tokens.types";

export const NEUTRAL_COLORS: Readonly<Record<ResolvedTheme, NeutralColors>> = {
  dark: {
    bg: "#000000",
    surface: "#0A0A0A",
    surface2: "#111111",
    text: "#EDEDED",
    textMuted: "#A1A1A1",
    border: "rgba(255, 255, 255, 0.10)",
    borderActive: "rgba(255, 255, 255, 0.20)",
  },
  light: {
    bg: "#FFFFFF",
    surface: "#FAFAFA",
    surface2: "#F4F4F4",
    text: "#0A0A0A",
    textMuted: "#5C5C5C",
    border: "rgba(0, 0, 0, 0.08)",
    borderActive: "rgba(0, 0, 0, 0.16)",
  },
} as const;

export const WARM_DARK_NEUTRALS: NeutralColors = {
  bg: "#181816",
  surface: "#22211F",
  surface2: "#2C2B28",
  text: "#EDE8DF",
  textMuted: "#9E9B91",
  border: "rgba(240, 235, 225, 0.10)",
  borderActive: "rgba(240, 235, 225, 0.20)",
};

export const ACCENT_COLORS: Readonly<Record<Accent, AccentColorPair>> = {
  lime: {
    dark: "#D4FF4F",
    light: "#A8D900",
  },
  orange: {
    dark: "#FF7E47",
    light: "#D9532F",
  },
  pink: {
    dark: "#FFB3D9",
    light: "#F08BBE",
  },
  blue: {
    dark: "#9ED8FF",
    light: "#5FB4F0",
  },
  purple: {
    dark: "#CDB4FF",
    light: "#A78BFA",
  },
  green: {
    dark: "#9BFFB8",
    light: "#4FD683",
  },
} as const;

export const ON_ACCENT_COLOR = "#0A0A0A" as const;

export const SEMANTIC_COLORS: Readonly<Record<ResolvedTheme, SemanticColors>> =
  {
    dark: {
      danger: "#FF8A80",
      warning: "#FFD54F",
      success: "#81C784",
      info: "#64B5F6",
    },
    light: {
      danger: "#E5484D",
      warning: "#F59E0B",
      success: "#2E7D32",
      info: "#1976D2",
    },
  } as const;
