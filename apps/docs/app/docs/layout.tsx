"use client";

import React, {
  Suspense,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { DocsSidebar } from "../components/DocsSidebar";
import { SiteFooter } from "../components/SiteFooter";

function DocsLayoutContent({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const router = useRouter();
  const pathname = usePathname();

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

  const isGallery = pathname === "/docs/components";

  const handleSidebarSelect = (id: string) => {
    if (id === "introduction") {
      router.push("/docs");
    } else if (id === "guidelines") {
      router.push("/docs/guidelines");
    } else {
      router.push(`/docs/components/${id}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--x-bg)",
        color: "var(--x-text)",
        display: "flex",
        flexDirection: "column",
        transition:
          "background-color 240ms cubic-bezier(0.2, 0, 0, 1), color 240ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      {/* Unified Floating Navbar identical to Landing Page */}
      <MarketingNavbar activePath={pathname} />

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
        {isGallery ? (
          <main style={{ flex: 1, minWidth: 0, padding: "var(--x-space-8) var(--x-space-5) var(--x-space-9)" }}>
            {children}
          </main>
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
      <SiteFooter />
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", backgroundColor: "var(--x-bg)" }} />
      }
    >
      <DocsLayoutContent>{children}</DocsLayoutContent>
    </Suspense>
  );
}
