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
} from "./native.types";

const XenonContext = createContext<NativeXenonContextValue | null>(null);

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
  children,
}: NativeXenonProviderProps): ReactElement {
  const [uncontrolledTheme, setUncontrolledTheme] =
    useState<Theme>(defaultTheme);
  const [uncontrolledAccent, setUncontrolledAccent] = useState<Accent>(
    defaultAccent ?? "lime",
  );
  const [uncontrolledRadius, setUncontrolledRadius] = useState<RadiusStop>(
    defaultRadius ?? DEFAULT_RADIUS_STOP,
  );

  const systemScheme = useColorScheme();
  const theme = controlledTheme ?? uncontrolledTheme;
  const accent = controlledAccent ?? uncontrolledAccent;
  const radius = controlledRadius ?? uncontrolledRadius;

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
