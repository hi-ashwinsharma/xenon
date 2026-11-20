import type {
  CircleRevealOrigin,
  MagneticOffset,
  OdometerGlyph,
  TiltAngles,
} from "./motion.types";

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/** Splits a formatted number into rolling digit columns and static characters. */
export function odometerGlyphs(
  value: number,
  locale: string = "en-US",
): readonly OdometerGlyph[] {
  const formatted = Number.isFinite(value)
    ? Math.round(value).toLocaleString(locale)
    : "0";
  return Array.from(formatted).map((char): OdometerGlyph => {
    const digit = Number(char);
    return /\d/.test(char)
      ? { kind: "digit", digit }
      : { kind: "char", char };
  });
}

/**
 * Rows a digit column travels: every column spins through one full lap of 0 to 9
 * before landing, so small and large digits arrive together.
 */
export function odometerTravel(digit: number): number {
  return 10 + Math.min(9, Math.max(0, Math.round(digit)));
}

/** Where a magnetic child sits for a pointer at (px, py) inside a box of width by height. */
export function magneticOffset(
  pointerX: number,
  pointerY: number,
  width: number,
  height: number,
  strength: number,
): MagneticOffset {
  const pull = clamp01(strength);
  return {
    x: (pointerX - width / 2) * pull,
    // Vertical pull is a touch stronger so short, wide buttons still feel alive
    y: (pointerY - height / 2) * pull * 1.45,
  };
}

/** Tilt for a pointer at fractional position (fx, fy) in 0..1 over the element. */
export function tiltAngles(
  fractionX: number,
  fractionY: number,
  maxTilt: number,
): TiltAngles {
  const max = Math.max(0, maxTilt);
  return {
    rotateX: (0.5 - clamp01(fractionY)) * 2 * max,
    rotateY: (clamp01(fractionX) - 0.5) * 2 * max,
  };
}

/** Fill of each segment for an overall progress: segments fill strictly in order. */
export function segmentFills(
  progress: number,
  segments: number,
): readonly number[] {
  const count = Math.max(1, Math.floor(segments));
  const filled = clamp01(progress) * count;
  return Array.from({ length: count }, (_, index) =>
    clamp01(filled - index),
  );
}

/** Index of the segment that is currently filling, from 0. */
export function activeSegment(progress: number, segments: number): number {
  const count = Math.max(1, Math.floor(segments));
  return Math.min(count - 1, Math.floor(clamp01(progress) * count));
}

/**
 * Start offset of a converging item: it begins pushed away from the group's centre
 * by `spread` of its distance, and slides home as `t` goes from 0 to 1.
 */
export function convergeOffset(
  itemCentre: number,
  groupCentre: number,
  spread: number,
  t: number,
): number {
  return (itemCentre - groupCentre) * Math.max(0, spread) * (1 - clamp01(t));
}

/**
 * Top of the liquid surface as a share of the word's height, for a fill level.
 * The surface overshoots the glyph box slightly so 1 reads as completely full.
 */
export function liquidSurface(progress: number): number {
  return 1 - clamp01(progress) * 1.16 - 0.0733;
}

/** Moves `current` toward `target` with frame-rate independent exponential damping. */
export function damp(
  current: number,
  target: number,
  damping: number,
  deltaSeconds: number,
): number {
  return current + (target - current) * (1 - Math.exp(-damping * deltaSeconds));
}

/** Wraps an offset into [0, period) so a repeated line can scroll forever. */
export function wrapOffset(offset: number, period: number): number {
  if (period <= 0) return 0;
  return ((offset % period) + period) % period;
}

/** Radius a circle centred at `origin` needs to cover a width by height viewport. */
export function circleRevealRadius(
  origin: CircleRevealOrigin,
  width: number,
  height: number,
): number {
  return Math.hypot(
    Math.max(origin.x, width - origin.x),
    Math.max(origin.y, height - origin.y),
  );
}

/** Progress of a tall element through the viewport: 0 as its top reaches `start`, 1 at `end`. */
export function viewportProgress(
  elementTop: number,
  viewportHeight: number,
  start: number,
  end: number,
): number {
  const from = viewportHeight * start;
  const to = viewportHeight * end;
  if (from === to) return elementTop <= to ? 1 : 0;
  return clamp01((from - elementTop) / (from - to));
}
