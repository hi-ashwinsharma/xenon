"use client";

import React, { Suspense, type ReactElement } from "react";
import { MarketingNavbar } from "./components/MarketingNavbar";
import { MarketingLanding } from "./components/MarketingLanding";
import { SiteFooter } from "./components/SiteFooter";

function LandingPageContent(): ReactElement {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--x-bg)",
        color: "var(--x-text)",
      }}
    >
      <MarketingNavbar activePath="/" />
      <main style={{ flex: 1 }}>
        <MarketingLanding />
      </main>
      <SiteFooter />
    </div>
  );
}

export default function LandingPage(): ReactElement {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", backgroundColor: "var(--x-bg)" }} />
      }
    >
      <LandingPageContent />
    </Suspense>
  );
}
