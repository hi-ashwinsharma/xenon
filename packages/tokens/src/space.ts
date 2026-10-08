import type { ControlSize } from "./tokens.types";

export const SPACE_SCALE: Readonly<Record<number, number>> = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 48,
  8: 64,
  9: 96,
  10: 128,
} as const;

export const CONTROL_HEIGHTS: Readonly<Record<ControlSize, number>> = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

export const TOUCH_HIT_MIN = 44 as const;

export const BORDER_WIDTH_WEB_PX = 1 as const;
export const BORDER_WIDTH_NATIVE_DP = 1 as const;
