import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { useColorScheme } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
  type Theme,
} from "@xenon/tokens";
import type {
  NativeXenonContextValue,
  NativeXenonProviderProps,
} from "./native.types.js";

const XenonContext = createContext<NativeXenonContextValue | null>(null);

export function XenonProvider({
  theme: controlledTheme,
  defaultTheme = "system",
  accent: initialAccent = "lime",
  radius: initialRadius = DEFAULT_RADIUS_STOP,
  children,
}: NativeXenonProviderProps): ReactElement {
  const [uncontrolledTheme, setUncontrolledTheme] =
    useState<Theme>(defaultTheme);
  const [accent, setAccentState] = useState<Accent>(initialAccent);
  const [radius, setRadiusState] = useState<RadiusStop>(initialRadius);

  const systemScheme = useColorScheme();
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

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? (systemScheme === "dark" ? "dark" : "light") : theme;

  const contextValue: NativeXenonContextValue = useMemo(
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

export function useXenon(): NativeXenonContextValue {
  const context = useContext(XenonContext);
  if (!context) {
    throw new Error("useXenon must be used within a XenonProvider");
  }
  return context;
}
