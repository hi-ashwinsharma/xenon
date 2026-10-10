"use client";

import React, { Suspense, useState, type ReactElement } from "react";
import { useSearchParams } from "next/navigation";
import { XenonProvider } from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import { MarketingNavbar } from "./components/MarketingNavbar";
import { MarketingLanding } from "./components/MarketingLanding";

function LandingPageContent(): ReactElement {
  const searchParams = useSearchParams();

  // Initialize from searchParams if present
  const [theme, setTheme] = useState<Theme>(() => {
    const t = searchParams.get("theme");
    return t === "light" || t === "dark" || t === "system" ? t : "dark";
  });

  const [accent, setAccent] = useState<Accent>(() => {
    const a = searchParams.get("accent");
    return a === "lime" || a === "pink" || a === "blue" || a === "purple" || a === "green"
      ? (a as Accent)
      : "lime";
  });

  const [radius, setRadius] = useState<RadiusStop>(() => {
    const r = searchParams.get("radius");
    const num = Number(r);
    return !isNaN(num) && num >= 0 && num <= 6 ? (num as RadiusStop) : 3;
  });

  // Keep URL query string synchronized in real time
  const handleAccentChange = (nextAccent: Accent) => {
    setAccent(nextAccent);
    updateUrlParams({ accent: nextAccent });
  };

  const handleRadiusChange = (nextRadius: RadiusStop) => {
    setRadius(nextRadius);
    updateUrlParams({ radius: String(nextRadius) });
  };

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    updateUrlParams({ theme: nextTheme });
  };

  const updateUrlParams = (newParams: Record<string, string>) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    Object.entries(newParams).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <XenonProvider
      theme={theme}
      onThemeChange={handleThemeChange}
      accent={accent}
      onAccentChange={handleAccentChange}
      radius={radius}
      onRadiusChange={handleRadiusChange}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--x-bg)",
          color: "var(--x-text)",
          transition: "background-color 240ms cubic-bezier(0.2, 0, 0, 1), color 240ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <MarketingNavbar
          theme={theme}
          onThemeChange={handleThemeChange}
          accent={accent}
          onAccentChange={handleAccentChange}
          radius={radius}
          onRadiusChange={handleRadiusChange}
          activePath="/"
        />

        <main style={{ flex: 1 }}>
          <MarketingLanding
            theme={theme}
            accent={accent}
            radius={radius}
            onAccentChange={handleAccentChange}
            onRadiusChange={handleRadiusChange}
          />
        </main>
      </div>
    </XenonProvider>
  );
}

export default function RootLandingPage(): ReactElement {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#000000" }} />}>
      <LandingPageContent />
    </Suspense>
  );
}
