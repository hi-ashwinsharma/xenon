import type { ReactNode } from "react";
import type { Accent, RadiusStop, ResolvedTheme, Theme } from "@xenon/tokens";

export interface XenonContextValue {
  readonly theme: Theme;
  readonly resolvedTheme: ResolvedTheme;
  readonly accent: Accent;
  readonly radius: RadiusStop;
  readonly amoled: boolean;
  readonly setTheme: (theme: Theme) => void;
  readonly setAccent: (accent: Accent) => void;
  readonly setRadius: (radius: RadiusStop) => void;
  readonly setAmoled: (amoled: boolean) => void;
}

export interface XenonProviderProps {
  readonly theme?: Theme;
  readonly defaultTheme?: Theme;
  readonly onThemeChange?: (theme: Theme) => void;
  readonly accent?: Accent;
  readonly defaultAccent?: Accent;
  readonly onAccentChange?: (accent: Accent) => void;
  readonly radius?: RadiusStop;
  readonly defaultRadius?: RadiusStop;
  readonly onRadiusChange?: (radius: RadiusStop) => void;
  readonly amoled?: boolean;
  readonly defaultAmoled?: boolean;
  readonly onAmoledChange?: (amoled: boolean) => void;
  readonly children: ReactNode;
}

