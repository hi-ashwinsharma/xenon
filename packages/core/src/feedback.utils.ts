export function formatBadgeCount(count: number, maxCount = 99): string {
  if (count <= 0) return "0";
  if (count > maxCount) return `${maxCount}+`;
  return String(count);
}

export function clampProgress(value: number, min = 0, max = 100): number {
  if (Number.isNaN(value)) return 0;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
