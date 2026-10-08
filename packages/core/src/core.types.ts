import type { RadiusStop } from "@xenon/tokens";

export interface AppRoutesMap {
  readonly home: string;
  readonly docs: string;
  readonly components: string;
  readonly guidelines: string;
  readonly blog: string;
}

export interface NestedRadiusParams {
  readonly parentRadius: number;
  readonly padding: number;
}

export interface ControlRadiusParams {
  readonly height: number;
  readonly radiusStop: RadiusStop | number;
}
