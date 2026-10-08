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
import type {
  WebXenonContextValue,
  WebXenonProviderProps,
} from "./web.types.js";

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
  accent: initialAccent = "lime",
  radius: initialRadius = DEFAULT_RADIUS_STOP,
  children,
}: WebXenonProviderProps): ReactElement {
  const [uncontrolledTheme, setUncontrolledTheme] =
    useState<Theme>(defaultTheme);
  const [systemResolved, setSystemResolved] =
    useState<ResolvedTheme>(resolveSystemTheme);
  const [accent, setAccentState] = useState<Accent>(initialAccent);
  const [radius, setRadiusState] = useState<RadiusStop>(initialRadius);

  const theme = controlledTheme ?? uncontrolledTheme;

  const setTheme = useCallback((nextTheme: Theme): void => {
    setUncontrolledTheme(nextTheme);
  }, []);

  const setAccent = useCallback((nextAccent: Accent): void => {
    setAccentState(nextAccent);
  }, []);

  const setRadius = useCallback((nextRadius: RadiusStop): void => {
    setRadiusState(nextRadius);
  }, []);

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
  }, [resolvedTheme, accent, radius]);

  const contextValue: WebXenonContextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      accent,
      radius,
      setTheme,
      setAccent,
      setRadius,
    }),
    [theme, resolvedTheme, accent, radius, setTheme, setAccent, setRadius],
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
