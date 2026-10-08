import type { MotionTokenDefinition } from "./tokens.types";

export const MOTION_TOKENS: MotionTokenDefinition = {
  durInstant: 100,
  durFast: 160,
  durBase: 240,
  durSlow: 400,
  easeStandard: "cubic-bezier(0.2, 0, 0, 1)",
  springSoft: {
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  pressScale: 0.98,
} as const;
