import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import {
  DEFAULT_RADIUS_STOP,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
  type Theme,
} from "@xenon/tokens";
import type { WebXenonContextValue, WebXenonProviderProps } from "./web.types";

const XenonContext = createContext<WebXenonContextValue | null>(null);

function resolveSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function XenonProvider({
  theme: controlledTheme,
  defaultTheme = "system",
  onThemeChange,
  accent: controlledAccent,
  defaultAccent = "lime",
  onAccentChange,
  radius: controlledRadius,
  defaultRadius = DEFAULT_RADIUS_STOP,
  onRadiusChange,
  amoled: controlledAmoled,
  defaultAmoled = true,
  onAmoledChange,
  children,
}: WebXenonProviderProps): ReactElement {
  const [uncontrolledTheme, setUncontrolledTheme] =
    useState<Theme>(defaultTheme);
  const [systemResolved, setSystemResolved] =
    useState<ResolvedTheme>(resolveSystemTheme);
  const [uncontrolledAccent, setUncontrolledAccent] = useState<Accent>(
    defaultAccent ?? "lime",
  );
  const [uncontrolledRadius, setUncontrolledRadius] = useState<RadiusStop>(
    defaultRadius ?? DEFAULT_RADIUS_STOP,
  );
  const [uncontrolledAmoled, setUncontrolledAmoled] = useState<boolean>(
    defaultAmoled ?? true,
  );

  const theme = controlledTheme ?? uncontrolledTheme;
  const accent = controlledAccent ?? uncontrolledAccent;
  const radius = controlledRadius ?? uncontrolledRadius;
  const amoled = controlledAmoled ?? uncontrolledAmoled;

  const setTheme = useCallback(
    (nextTheme: Theme): void => {
      if (controlledTheme === undefined) {
        setUncontrolledTheme(nextTheme);
      }
      onThemeChange?.(nextTheme);
    },
    [controlledTheme, onThemeChange],
  );

  const setAccent = useCallback(
    (nextAccent: Accent): void => {
      if (controlledAccent === undefined) {
        setUncontrolledAccent(nextAccent);
      }
      onAccentChange?.(nextAccent);
    },
    [controlledAccent, onAccentChange],
  );

  const setRadius = useCallback(
    (nextRadius: RadiusStop): void => {
      if (controlledRadius === undefined) {
        setUncontrolledRadius(nextRadius);
      }
      onRadiusChange?.(nextRadius);
    },
    [controlledRadius, onRadiusChange],
  );

  const setAmoled = useCallback(
    (nextAmoled: boolean): void => {
      if (controlledAmoled === undefined) {
        setUncontrolledAmoled(nextAmoled);
      }
      onAmoledChange?.(nextAmoled);
    },
    [controlledAmoled, onAmoledChange],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent): void => {
      setSystemResolved(event.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    setSystemResolved(mediaQuery.matches ? "dark" : "light");
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemResolved : theme;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    root.setAttribute("data-x-theme", resolvedTheme);
    root.setAttribute("data-x-accent", accent);
    root.setAttribute("data-x-radius", String(radius));
    root.setAttribute("data-x-amoled", String(amoled));
  }, [resolvedTheme, accent, radius, amoled]);

  const contextValue: WebXenonContextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      accent,
      radius,
      amoled,
      setTheme,
      setAccent,
      setRadius,
      setAmoled,
    }),
    [
      theme,
      resolvedTheme,
      accent,
      radius,
      amoled,
      setTheme,
      setAccent,
      setRadius,
      setAmoled,
    ],
  );

  return (
    <XenonContext.Provider value={contextValue}>
      {children}
    </XenonContext.Provider>
  );
}

export function useXenon(): WebXenonContextValue {
  const context = useContext(XenonContext);
  if (!context) {
    throw new Error("useXenon must be used within a XenonProvider");
  }
  return context;
}
