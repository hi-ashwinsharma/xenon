"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  CommandPalette,
  ToastProvider,
  XenonProvider,
} from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";

export interface XenonDocsContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
  radius: RadiusStop;
  setRadius: (radius: RadiusStop) => void;
  amoled: boolean;
  setAmoled: (amoled: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const XenonDocsContext = createContext<XenonDocsContextValue | null>(null);

export function useDocsTheme(): XenonDocsContextValue {
  const context = useContext(XenonDocsContext);
  if (!context) {
    throw new Error("useDocsTheme must be used within a XenonDocsProvider");
  }
  return context;
}

const VALID_ACCENTS: Accent[] = ["lime", "orange", "blue", "pink", "purple", "green"];

export function XenonDocsProvider({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();

  const [theme, setThemeState] = useState<Theme>("dark");
  const [accent, setAccentState] = useState<Accent>("lime");
  const [radius, setRadiusState] = useState<RadiusStop>(5);
  const [amoled, setAmoledState] = useState<boolean>(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Hydrate from localStorage or URL query parameters on initial mount
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (typeof window === "undefined") return;

    try {
      const url = new URL(window.location.href);
      const urlTheme = url.searchParams.get("theme");
      const urlAccent = url.searchParams.get("accent");
      const urlRadius = url.searchParams.get("radius");
      const urlAmoled = url.searchParams.get("amoled");

      const savedTheme = localStorage.getItem("xenon-theme") as Theme | null;
      const savedAccent = localStorage.getItem("xenon-accent") as Accent | null;
      const savedRadius = localStorage.getItem("xenon-radius");
      const savedAmoled = localStorage.getItem("xenon-amoled");

      // Theme
      if (urlTheme === "light" || urlTheme === "dark" || urlTheme === "system") {
        setThemeState(urlTheme);
      } else if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
        setThemeState(savedTheme);
      }

      // Accent
      if (urlAccent && VALID_ACCENTS.includes(urlAccent as Accent)) {
        setAccentState(urlAccent as Accent);
      } else if (savedAccent && VALID_ACCENTS.includes(savedAccent)) {
        setAccentState(savedAccent);
      }

      // Radius
      if (urlRadius !== null) {
        const num = Number(urlRadius);
        if (!isNaN(num) && num >= 0 && num <= 6) {
          setRadiusState(num as RadiusStop);
        }
      } else if (savedRadius !== null) {
        const num = Number(savedRadius);
        if (!isNaN(num) && num >= 0 && num <= 6) {
          setRadiusState(num as RadiusStop);
        }
      }

      // Amoled
      if (urlAmoled !== null) {
        setAmoledState(urlAmoled !== "false");
      } else if (savedAmoled !== null) {
        setAmoledState(savedAmoled !== "false");
      }
    } catch {
      // Fallback gracefully if localStorage is unavailable
    }
  }, []);

  // Update localStorage and document attributes whenever values change
  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem("xenon-theme", nextTheme);
    } catch {
      // ignore
    }
  }, []);

  const setAccent = useCallback((nextAccent: Accent) => {
    setAccentState(nextAccent);
    try {
      localStorage.setItem("xenon-accent", nextAccent);
    } catch {
      // ignore
    }
  }, []);

  const setRadius = useCallback((nextRadius: RadiusStop) => {
    setRadiusState(nextRadius);
    try {
      localStorage.setItem("xenon-radius", String(nextRadius));
    } catch {
      // ignore
    }
  }, []);

  const setAmoled = useCallback((nextAmoled: boolean) => {
    setAmoledState(nextAmoled);
    try {
      localStorage.setItem("xenon-amoled", String(nextAmoled));
    } catch {
      // ignore
    }
  }, []);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Command palette items list
  const commandPaletteItems = useMemo(() => {
    const list = [
      {
        id: "intro-cmd",
        label: "Introduction & Philosophy",
        group: "Getting Started",
        onSelect: () => {
          router.push("/docs");
          setCommandPaletteOpen(false);
        },
      },
      {
        id: "guidelines-cmd",
        label: "Design Guidelines & Math",
        group: "Getting Started",
        onSelect: () => {
          router.push("/docs/guidelines");
          setCommandPaletteOpen(false);
        },
      },
      {
        id: "gallery-cmd",
        label: "All Components Gallery",
        group: "Getting Started",
        onSelect: () => {
          router.push("/docs/components");
          setCommandPaletteOpen(false);
        },
      },
    ];

    for (const comp of COMPONENTS_REGISTRY) {
      list.push({
        id: comp.id,
        label: comp.name,
        group: comp.category,
        onSelect: () => {
          router.push(`/docs/components/${comp.id}`);
          setCommandPaletteOpen(false);
        },
      });
    }

    return list;
  }, [router]);

  const contextValue: XenonDocsContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      accent,
      setAccent,
      radius,
      setRadius,
      amoled,
      setAmoled,
      commandPaletteOpen,
      setCommandPaletteOpen,
    }),
    [theme, setTheme, accent, setAccent, radius, setRadius, amoled, setAmoled, commandPaletteOpen],
  );

  return (
    <XenonProvider
      theme={theme}
      onThemeChange={setTheme}
      accent={accent}
      onAccentChange={setAccent}
      radius={radius}
      onRadiusChange={setRadius}
      amoled={amoled}
      onAmoledChange={setAmoled}
    >
      <ToastProvider>
        <XenonDocsContext.Provider value={contextValue}>
          {children}
          <CommandPalette
            open={commandPaletteOpen}
            onOpenChange={setCommandPaletteOpen}
            items={commandPaletteItems}
            placeholder="Search components, tokens, or guidelines..."
          />
        </XenonDocsContext.Provider>
      </ToastProvider>
    </XenonProvider>
  );
}
