import type { ReactNode } from "react";
import type { LiquidGlassVariant, RadiusStop } from "@xenon/tokens";

export interface SurfaceContextValue {
  readonly parentRadius: number;
  readonly padding: number;
}

export type SurfaceVariant = "default" | "subtle" | "glass" | "accent";

export interface SurfaceProps {
  readonly variant?: SurfaceVariant;
  readonly glassType?: LiquidGlassVariant;
  readonly radius?: RadiusStop | number;
  readonly padding?: number;
  /** Responds to hover and press, for surfaces that act as a single target */
  readonly interactive?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
}
