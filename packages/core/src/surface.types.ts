import type { ReactNode } from "react";
import type { LiquidGlassVariant, RadiusStop } from "@xenon/tokens";

export interface SurfaceContextValue {
  readonly parentRadius: number;
  readonly padding: number;
}

export type SurfaceVariant = "default" | "subtle" | "glass";

export interface SurfaceProps {
  readonly variant?: SurfaceVariant;
  readonly glassType?: LiquidGlassVariant;
  readonly radius?: RadiusStop | number;
  readonly padding?: number;
  readonly children?: ReactNode;
  readonly className?: string;
}
