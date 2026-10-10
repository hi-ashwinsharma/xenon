export type SkeletonVariant = "rect" | "text" | "circle";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  animate?: boolean;
  className?: string;
}
