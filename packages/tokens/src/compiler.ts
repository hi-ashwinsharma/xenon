import {
  ACCENT_COLORS,
  NEUTRAL_COLORS,
  ON_ACCENT_COLOR,
  SEMANTIC_COLORS,
} from "./colors";
import { LIQUID_GLASS_TOKENS } from "./glass";
import { MOTION_TOKENS } from "./motion";
import { RADIUS_STOPS } from "./radius";
import {
  BORDER_WIDTH_WEB_PX,
  CONTROL_HEIGHTS,
  SPACE_SCALE,
  TOUCH_HIT_MIN,
} from "./space";
import type {
  Accent,
  CompiledNativeTokens,
  RadiusStop,
  ResolvedTheme,
} from "./tokens.types";
import { TYPOGRAPHY_SCALE } from "./typography";

export function compileCssVariables(): string {
  const lines: string[] = [":root {"];

  for (const [key, val] of Object.entries(SPACE_SCALE)) {
    lines.push(`  --x-space-${key}: ${val}px;`);
  }

  for (const [key, val] of Object.entries(CONTROL_HEIGHTS)) {
    lines.push(`  --x-control-${key}: ${val}px;`);
  }
  lines.push(`  --x-hit-min: ${TOUCH_HIT_MIN}px;`);
  lines.push(`  --x-border-width: ${BORDER_WIDTH_WEB_PX}px;`);
  lines.push(`  --x-on-accent: ${ON_ACCENT_COLOR};`);

  lines.push(`  --x-dur-instant: ${MOTION_TOKENS.durInstant}ms;`);
  lines.push(`  --x-dur-fast: ${MOTION_TOKENS.durFast}ms;`);
  lines.push(`  --x-dur-base: ${MOTION_TOKENS.durBase}ms;`);
  lines.push(`  --x-dur-slow: ${MOTION_TOKENS.durSlow}ms;`);
  lines.push(`  --x-ease-standard: ${MOTION_TOKENS.easeStandard};`);
  lines.push(`  --x-scale-press: ${MOTION_TOKENS.pressScale};`);

  for (const [, token] of Object.entries(TYPOGRAPHY_SCALE)) {
    lines.push(`  --x-text-${token.name}-size: ${token.web.remSize};`);
    lines.push(`  --x-text-${token.name}-lh: ${token.web.remLineHeight};`);
    lines.push(
      `  --x-text-${token.name}-tracking: ${token.web.letterSpacing}em;`,
    );
    lines.push(`  --x-text-${token.name}-weight: ${token.weight};`);
  }

  lines.push(`  --x-glass-regular-blur: ${LIQUID_GLASS_TOKENS.regular.webBlurPx}px;`);
  lines.push(`  --x-glass-clear-blur: ${LIQUID_GLASS_TOKENS.clear.webBlurPx}px;`);

  lines.push("}");

  for (const theme of ["dark", "light"] as const) {
    const neutrals = NEUTRAL_COLORS[theme];
    const semantics = SEMANTIC_COLORS[theme];
    const glassTheme = LIQUID_GLASS_TOKENS;
    lines.push(`\n:root[data-x-theme="${theme}"] {`);
    lines.push(`  --x-bg: ${neutrals.bg};`);
    lines.push(`  --x-surface: ${neutrals.surface};`);
    lines.push(`  --x-surface-2: ${neutrals.surface2};`);
    lines.push(`  --x-glass-regular-bg: ${theme === "dark" ? glassTheme.regular.darkTint : glassTheme.regular.lightTint};`);
    lines.push(`  --x-glass-clear-bg: ${theme === "dark" ? glassTheme.clear.darkTint : glassTheme.clear.lightTint};`);
    lines.push(`  --x-text: ${neutrals.text};`);
    lines.push(`  --x-text-muted: ${neutrals.textMuted};`);
    lines.push(`  --x-border: ${neutrals.border};`);
    lines.push(`  --x-border-active: ${neutrals.borderActive};`);
    lines.push(`  --x-danger: ${semantics.danger};`);
    lines.push(`  --x-warning: ${semantics.warning};`);
    lines.push(`  --x-success: ${semantics.success};`);
    lines.push(`  --x-info: ${semantics.info};`);
    lines.push("}");
  }

  for (const [accent, pair] of Object.entries(ACCENT_COLORS)) {
    lines.push(`\n:root[data-x-accent="${accent}"][data-x-theme="dark"] {`);
    lines.push(`  --x-accent: ${pair.dark};`);
    lines.push("}");
    lines.push(`:root[data-x-accent="${accent}"][data-x-theme="light"] {`);
    lines.push(`  --x-accent: ${pair.light};`);
    lines.push("}");
  }

  for (const [stopStr, val] of Object.entries(RADIUS_STOPS)) {
    const stop = Number(stopStr) as RadiusStop;
    lines.push(`\n:root[data-x-radius="${stop}"] {`);
    lines.push(
      `  --x-radius-control: ${val.control === 9999 ? "9999px" : `${val.control}px`};`,
    );
    lines.push(`  --x-radius-surface: ${val.surface}px;`);
    lines.push(`  --x-radius-joint: ${val.joint}px;`);
    lines.push("}");
  }

  return lines.join("\n");
}

export function compileNativeTokens(
  theme: ResolvedTheme = "dark",
  accent: Accent = "lime",
): CompiledNativeTokens {
  const neutrals = NEUTRAL_COLORS[theme];
  const semantics = SEMANTIC_COLORS[theme];
  const accentPair = ACCENT_COLORS[accent];

  return {
    theme,
    accent,
    colors: {
      ...neutrals,
      accent: theme === "dark" ? accentPair.dark : accentPair.light,
      onAccent: ON_ACCENT_COLOR,
      semantic: semantics,
    },
    space: SPACE_SCALE,
    control: {
      sm: CONTROL_HEIGHTS.sm,
      md: CONTROL_HEIGHTS.md,
      lg: CONTROL_HEIGHTS.lg,
      hitMin: TOUCH_HIT_MIN,
    },
    radius: RADIUS_STOPS,
    typography: TYPOGRAPHY_SCALE,
    motion: MOTION_TOKENS,
    glass: LIQUID_GLASS_TOKENS,
  };
}
