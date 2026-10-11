"use client";

import React, { Suspense, type ReactElement } from "react";
import { useDocsTheme } from "./providers/XenonDocsProvider";
import { MarketingNavbar } from "./components/MarketingNavbar";
import { MarketingLanding } from "./components/MarketingLanding";

function LandingPageContent(): ReactElement {
  const {
    theme,
    setTheme,
    accent,
    setAccent,
    radius,
    setRadius,
    amoled,
    setAmoled,
  } = useDocsTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--x-bg)",
        color: "var(--x-text)",
        transition:
          "background-color 240ms cubic-bezier(0.2, 0, 0, 1), color 240ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      <MarketingNavbar activePath="/" />

      <main style={{ flex: 1 }}>
        <MarketingLanding
          theme={theme}
          accent={accent}
          radius={radius}
          amoled={amoled}
          onThemeChange={setTheme}
          onAccentChange={setAccent}
          onRadiusChange={setRadius}
          onAmoledChange={setAmoled}
        />
      </main>
    </div>
  );
}

export default function LandingPage(): ReactElement {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", backgroundColor: "#000000" }} />
      }
    >
      <LandingPageContent />
    </Suspense>
  );
}
