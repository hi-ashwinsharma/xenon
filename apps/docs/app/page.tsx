"use client";

import React, { useMemo, useState, type ReactElement } from "react";
import {
  CommandPalette,
  ToastProvider,
  XenonProvider,
} from "@xenon/web";
import type { Accent, RadiusStop, ResolvedTheme } from "@xenon/tokens";
import { COMPONENTS_REGISTRY } from "./docs-data/components-registry";
import { DocsHeader } from "./components/DocsHeader";
import { DocsSidebar } from "./components/DocsSidebar";
import { ComponentShowcase } from "./components/ComponentShowcase";
import { GuidelinesViewer } from "./components/GuidelinesViewer";
import { IntroductionDoc } from "./components/IntroductionDoc";
import { AllComponentsGallery } from "./components/AllComponentsGallery";

export default function DocsPage(): ReactElement {
  // Global design system state
  const [theme, setTheme] = useState<ResolvedTheme>("dark");
  const [accent, setAccent] = useState<Accent>("lime");
  const [radius, setRadius] = useState<RadiusStop>(3);

  // App navigation state
  const [activeTab, setActiveTab] = useState<string>("components");
  const [activeComponentId, setActiveComponentId] = useState<string>("button");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Map registry into CommandPalette items
  const commandPaletteItems = useMemo(() => {
    const list = [
      {
        id: "intro-cmd",
        label: "Introduction & Architecture",
        group: "Getting Started",
        onSelect: () => {
          setActiveTab("components");
          setActiveComponentId("introduction");
          setCommandPaletteOpen(false);
        },
      },
      {
        id: "guidelines-cmd",
        label: "Design Guidelines & Math",
        group: "Getting Started",
        onSelect: () => {
          setActiveTab("guidelines");
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
          setActiveTab("components");
          setActiveComponentId(comp.id);
          setCommandPaletteOpen(false);
        },
      });
    }

    return list;
  }, []);

  const selectedEntry = useMemo(() => {
    return COMPONENTS_REGISTRY.find((c) => c.id === activeComponentId) ?? COMPONENTS_REGISTRY[0];
  }, [activeComponentId]);

  const handleSidebarSelect = (id: string) => {
    if (id === "guidelines") {
      setActiveTab("guidelines");
      setActiveComponentId("guidelines");
    } else {
      setActiveTab("components");
      setActiveComponentId(id);
    }
  };

  return (
    <XenonProvider theme={theme} accent={accent} radius={radius}>
      <ToastProvider>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "var(--x-bg)",
            color: "var(--x-text)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top Sticky Glass Navigation */}
          <DocsHeader
            theme={theme}
            onThemeChange={setTheme}
            accent={accent}
            onAccentChange={setAccent}
            radius={radius}
            onRadiusChange={setRadius}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Main Layout Container */}
          <div style={{ display: "flex", flex: 1, width: "100%", maxWidth: "1440px", margin: "0 auto" }}>
            {activeTab === "gallery" ? (
              <main style={{ flex: 1, padding: "40px 32px 80px 32px" }}>
                <AllComponentsGallery
                  onSelectComponent={(id) => {
                    setActiveTab("components");
                    setActiveComponentId(id);
                  }}
                />
              </main>
            ) : (
              <>
                {/* Left Categorized Sidebar */}
                <DocsSidebar
                  activeId={activeTab === "guidelines" ? "guidelines" : activeComponentId}
                  onSelect={handleSidebarSelect}
                />

                {/* Right / Center Documentation Content */}
                <main
                  style={{
                    flex: 1,
                    padding: "48px 48px 96px 48px",
                    overflowX: "hidden",
                  }}
                >
                  {activeTab === "guidelines" || activeComponentId === "guidelines" ? (
                    <GuidelinesViewer />
                  ) : activeComponentId === "introduction" ? (
                    <IntroductionDoc />
                  ) : (
                    <ComponentShowcase entry={selectedEntry} />
                  )}
                </main>
              </>
            )}
          </div>

          {/* Global ⌘K Command Palette */}
          <CommandPalette
            open={commandPaletteOpen}
            onOpenChange={setCommandPaletteOpen}
            items={commandPaletteItems}
            placeholder="Search components, tokens, or guidelines..."
          />
        </div>
      </ToastProvider>
    </XenonProvider>
  );
}
