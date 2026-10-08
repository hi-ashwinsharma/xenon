import type { ReactNode } from "react";
import type { Accent, RadiusStop, ResolvedTheme, Theme } from "@xenon/tokens";

export interface XenonContextValue {
  readonly theme: Theme;
  readonly resolvedTheme: ResolvedTheme;
  readonly accent: Accent;
  readonly radius: RadiusStop;
  readonly setTheme: (theme: Theme) => void;
  readonly setAccent: (accent: Accent) => void;
  readonly setRadius: (radius: RadiusStop) => void;
}

export interface XenonProviderProps {
  readonly theme?: Theme;
  readonly defaultTheme?: Theme;
  readonly accent?: Accent;
  readonly radius?: RadiusStop;
  readonly children: ReactNode;
}
