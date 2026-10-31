"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { List, X } from "@phosphor-icons/react";
import { Icon } from "./icon";
import { IconButton } from "./icon-button";
import type { WebNavbarProps } from "./web.types";

const NAVBAR_CSS = `
.x-navbar-menu-button, .x-navbar-panel { display: none; }
@media (max-width: 60rem) {
  .x-navbar-collapsible .x-navbar-slot { display: none !important; }
  .x-navbar-collapsible .x-navbar-menu-button { display: inline-flex; }
  .x-navbar-collapsible .x-navbar-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--x-dur-slow) var(--x-ease-spring);
  }
  .x-navbar-collapsible .x-navbar-panel[data-x-open="true"] {
    grid-template-rows: 1fr;
  }
}
`;

export function Navbar({
  brand,
  nav,
  actions,
  children,
  sticky = true,
  threshold = 10,
  bordered = true,
  maxWidth = 1280,
  navAlign = "center",
  glass = "scroll",
  collapsible = false,
  className,
  style,
  ...restProps
}: WebNavbarProps): ReactElement {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrolled = window.scrollY > threshold;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const maxW = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const engaged = glass === "always" || isScrolled || menuOpen;

  const headerStyle: CSSProperties = {
    position: sticky ? "sticky" : "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: engaged ? "var(--x-glass-regular-bg)" : "transparent",
    backdropFilter: engaged ? "blur(var(--x-glass-regular-blur))" : "none",
    WebkitBackdropFilter: engaged
      ? "blur(var(--x-glass-regular-blur))"
      : "none",
    borderBottom:
      bordered && engaged
        ? "1px solid var(--x-border)"
        : "1px solid transparent",
    transition:
      "background-color var(--x-dur-base) var(--x-ease-standard), border-color var(--x-dur-base) var(--x-ease-standard), backdrop-filter var(--x-dur-base) var(--x-ease-standard), -webkit-backdrop-filter var(--x-dur-base) var(--x-ease-standard)",
    ...style,
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: maxW,
    height: "56px",
    margin: "0 auto",
    paddingLeft: "var(--x-space-5, 24px)",
    paddingRight: "var(--x-space-5, 24px)",
    boxSizing: "border-box",
  };

  const headerClass = [collapsible ? "x-navbar-collapsible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={headerClass || undefined}
      data-x-navbar=""
      data-x-scrolled={isScrolled ? "true" : "false"}
      style={headerStyle}
      {...restProps}
    >
      {collapsible && (
        <style href="x-navbar" precedence="default">
          {NAVBAR_CSS}
        </style>
      )}
      <div style={containerStyle}>
        {children ?? (
          <>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--x-space-3, 12px)",
                flexShrink: 0,
              }}
            >
              {brand}
            </div>

            {nav && (
              <nav
                aria-label="Main Navigation"
                className="x-navbar-slot"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--x-space-1, 4px)",
                  marginLeft:
                    navAlign === "start" ? "var(--x-space-6, 32px)" : "auto",
                  marginRight: "auto",
                }}
              >
                {nav}
              </nav>
            )}

            <div
              className="x-navbar-slot"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--x-space-2, 8px)",
                flexShrink: 0,
              }}
            >
              {actions}
            </div>

            {collapsible && (
              <span className="x-navbar-menu-button">
                <IconButton
                  ariaLabel={menuOpen ? "Close menu" : "Open menu"}
                  variant="ghost"
                  size="sm"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <Icon size="sm">{menuOpen ? <X /> : <List />}</Icon>
                </IconButton>
              </span>
            )}
          </>
        )}
      </div>

      {collapsible && !children && (
        <div
          className="x-navbar-panel"
          data-x-open={menuOpen ? "true" : "false"}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <div style={{ overflow: "hidden", minHeight: 0 }}>
            <div
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) {
                  setMenuOpen(false);
                }
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "var(--x-space-3, 12px)",
                padding:
                  "var(--x-space-2, 8px) var(--x-space-5, 24px) var(--x-space-4, 16px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--x-space-1, 4px)",
                }}
              >
                {nav}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "var(--x-space-2, 8px)",
                }}
              >
                {actions}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
