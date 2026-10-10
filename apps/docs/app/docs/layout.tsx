"use client";

import React, { Suspense, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CommandPalette,
  ToastProvider,
  XenonProvider,
} from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";
import { DocsHeader } from "../components/DocsHeader";
import { DocsSidebar } from "../components/DocsSidebar";

function DocsLayoutContent({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();
  const pathname = usePathname();

  // Design system state
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<Accent>("lime");
  const [radius, setRadius] = useState<RadiusStop>(3);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Active item resolution from pathname
  const activeId = useMemo(() => {
    if (pathname.includes("/guidelines")) return "guidelines";
    if (pathname.includes("/components/")) {
      const parts = pathname.split("/components/");
      return parts[1] || "button";
    }
    if (pathname.includes("/components")) return "components";
    return "introduction";
  }, [pathname]);

  const activeTab = useMemo(() => {
    if (pathname.includes("/guidelines")) return "guidelines";
    if (pathname === "/docs/components") return "gallery";
    return "components";
  }, [pathname]);

  // Command palette items
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

  const handleSidebarSelect = (id: string) => {
    if (id === "introduction") {
      router.push("/docs");
    } else if (id === "guidelines") {
      router.push("/docs/guidelines");
    } else {
      router.push(`/docs/components/${id}`);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === "guidelines") {
      router.push("/docs/guidelines");
    } else if (tab === "gallery") {
      router.push("/docs/components");
    } else {
      router.push("/docs");
    }
  };

  return (
    <XenonProvider
      theme={theme}
      onThemeChange={setTheme}
      accent={accent}
      onAccentChange={setAccent}
      radius={radius}
      onRadiusChange={setRadius}
    >
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
          {/* Docs Top Bar */}
          <DocsHeader
            theme={theme}
            onThemeChange={setTheme}
            accent={accent}
            onAccentChange={setAccent}
            radius={radius}
            onRadiusChange={setRadius}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Docs Main Content Shell */}
          <div
            style={{
              display: "flex",
              flex: 1,
              width: "100%",
              maxWidth: "1440px",
              margin: "0 auto",
            }}
          >
            {activeTab === "gallery" ? (
              <main style={{ flex: 1, padding: "40px 32px 80px 32px" }}>{children}</main>
            ) : (
              <>
                <DocsSidebar activeId={activeId} onSelect={handleSidebarSelect} />
                <main
                  style={{
                    flex: 1,
                    padding: "48px 48px 96px 48px",
                    overflowX: "hidden",
                  }}
                >
                  {children}
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

export default function DocsLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#000000" }} />}>
      <DocsLayoutContent>{children}</DocsLayoutContent>
    </Suspense>
  );
}
