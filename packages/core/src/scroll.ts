/** Maps overall scroll progress to 0..1 inside the [start, end] window, eased so motion settles softly. */
export function scrollRange(
  progress: number,
  start: number,
  end: number,
): number {
  if (end <= start) return progress >= end ? 1 : 0;
  const t = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

export function mix(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}
