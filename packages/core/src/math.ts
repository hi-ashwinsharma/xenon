import {
  CONCENTRIC_FLOOR_MULTIPLIER,
  RADIUS_STOPS,
  type RadiusStop,
} from "@xenon/tokens";

/**
 * Computes concentric inner child radius based on parent radius and padding.
 * Enforces concentric floor (40% of parent radius) and parent ceiling.
 * Formula per docs/guidelines/shape.md:
 * inner = max(outer - padding, outer * 0.4), clamped to [0, outer].
 */
export function computeNestedRadius(
  parentRadius: number,
  padding: number,
): number {
  if (parentRadius <= 0) {
    return 0;
  }
  const safePadding = Math.max(0, padding);
  const concentric = parentRadius - safePadding;
  const floor = parentRadius * CONCENTRIC_FLOOR_MULTIPLIER;
  const candidate = Math.max(floor, concentric);
  return Math.min(parentRadius, Math.max(0, candidate));
}

/**
 * Clamps control radius to half its height.
 * Supports discrete RadiusStop (0..6) or raw numeric radius.
 * At stop 6 (pill, 9999px), it cleanly clamps to height / 2.
 */
export function clampControlRadius(
  height: number,
  radiusStop: RadiusStop | number,
): number {
  if (height <= 0) {
    return 0;
  }
  let rawRadius: number;
  if (typeof radiusStop === "number" && radiusStop in RADIUS_STOPS) {
    rawRadius = RADIUS_STOPS[radiusStop as RadiusStop].control;
  } else {
    rawRadius = radiusStop;
  }
  if (rawRadius <= 0) {
    return 0;
  }
  return Math.min(rawRadius, height / 2);
}

/**
 * Returns the exact joint radius for a predefined discrete RadiusStop.
 */
export function getGroupJointRadiusForStop(stop: RadiusStop): number {
  return RADIUS_STOPS[stop].joint;
}

/**
 * Computes group joint radius for contiguous grouped controls.
 * Uses exact table stops when provided, or calculates ~25% outer radius ratio.
 */
export function groupJointRadius(outerRadius: RadiusStop | number): number {
  if (outerRadius <= 0) {
    return 0;
  }
  if (typeof outerRadius === "number" && outerRadius in RADIUS_STOPS) {
    return RADIUS_STOPS[outerRadius as RadiusStop].joint;
  }
  if (outerRadius < 4) {
    return Math.min(outerRadius, 1);
  }
  if (outerRadius <= 8) {
    return 2;
  }
  return Math.min(outerRadius, Math.round(outerRadius * 0.25));
}
