import type { RadiusStop, RadiusStopValues } from "./tokens.types.js";

export const SURFACE_RADIUS_CAP = 28 as const;
export const CONCENTRIC_FLOOR_MULTIPLIER = 0.4 as const;

export const RADIUS_STOPS: Readonly<Record<RadiusStop, RadiusStopValues>> = {
  0: { stop: 0, control: 0, surface: 0, joint: 0 },
  1: { stop: 1, control: 4, surface: 6, joint: 2 },
  2: { stop: 2, control: 8, surface: 10, joint: 2 },
  3: { stop: 3, control: 12, surface: 16, joint: 3 },
  4: { stop: 4, control: 16, surface: 20, joint: 4 },
  5: { stop: 5, control: 20, surface: 24, joint: 5 },
  6: { stop: 6, control: 9999, surface: 28, joint: 6 },
} as const;

export const DEFAULT_RADIUS_STOP: RadiusStop = 4;
