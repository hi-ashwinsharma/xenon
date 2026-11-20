import type { AmbientTokenDefinition } from "./tokens.types";

/**
 * The showcase-only Ambient backdrop: the single gradient Xenon allows, kept here so
 * components can never author their own. See "Showcase exceptions" in docs/DESIGN.md.
 */
export const AMBIENT_TOKENS: AmbientTokenDefinition = {
  alphaDark: 0.14,
  alphaLight: 0.2,
  sizeVmax: 80,
  pointerDriftPx: 120,
} as const;
