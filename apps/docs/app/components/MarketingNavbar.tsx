"use client";

import React, { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Badge,
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  Text,
} from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import { useDocsTheme } from "../providers/XenonDocsProvider";
import { CaretDownIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "./Icons";

export interface MarketingNavbarProps {
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  accent?: Accent;
  onAccentChange?: (accent: Accent) => void;
  radius?: RadiusStop;
  onRadiusChange?: (radius: RadiusStop) => void;
  amoled?: boolean;
  onAmoledChange?: (amoled: boolean) => void;
  activePath?: string;
  onOpenCommandPalette?: () => void;
}

const ACCENT_LIST: Array<{ key: Accent; label: string; color: string }> = [
  { key: "lime", label: "Lime", color: "#D4FF4F" },
  { key: "orange", label: "Orange", color: "#FF7E47" },
  { key: "blue", label: "Blue", color: "#9ED8FF" },
  { key: "pink", label: "Pink", color: "#FFB3D9" },
  { key: "purple", label: "Purple", color: "#CDB4FF" },
  { key: "green", label: "Green", color: "#9BFFB8" },
];

const RADIUS_SHORT_LABELS: Record<RadiusStop, string> = {
  0: "Sharp · 0px",
  1: "Subtle · 4px",
  2: "Compact · 8px",
  3: "Standard · 12px",
  4: "Soft · 16px",
  5: "Rounded · 20px",
  6: "Pill · Capsule",
};

export function MarketingNavbar(props: MarketingNavbarProps): ReactElement {
  const docsTheme = useDocsTheme();

  const pathname = usePathname();

  const theme = props.theme ?? docsTheme.theme;
  const onThemeChange = props.onThemeChange ?? docsTheme.setTheme;
  const accent = props.accent ?? docsTheme.accent;
  const onAccentChange = props.onAccentChange ?? docsTheme.setAccent;
  const radius = props.radius ?? docsTheme.radius;
  const onRadiusChange = props.onRadiusChange ?? docsTheme.setRadius;
  const amoled = props.amoled ?? docsTheme.amoled;
  const onAmoledChange = props.onAmoledChange ?? docsTheme.setAmoled;
  const activePath = props.activePath || pathname || "";
  const onOpenCommandPalette =
    props.onOpenCommandPalette ?? (() => docsTheme.setCommandPaletteOpen(true));

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [radiusOpen, setRadiusOpen] = useState<boolean>(false);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setIsScrolled((prev) => {
          if (!prev && currentY > 12) return true;
          if (prev && currentY < 4) return false;
          return prev;
        });
        rafId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // In docs routes, the bar is permanently demarcated; on marketing pages it engages on scroll
  const isDocs =
    activePath.startsWith("/docs") ||
    (typeof window !== "undefined" &&
      window.location.pathname.startsWith("/docs"));

  return (
    <header
      data-x-scrolled={isScrolled ? "true" : "false"}
      data-x-docs={isDocs ? "true" : "false"}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        marginTop: 0,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        backgroundColor:
          isDocs || isScrolled
            ? "var(--x-glass-regular-bg)"
            : "rgba(0, 0, 0, 0)",
        backdropFilter:
          isDocs || isScrolled
            ? "blur(var(--x-glass-regular-blur, 20px))"
            : "blur(0px)",
        WebkitBackdropFilter:
          isDocs || isScrolled
            ? "blur(var(--x-glass-regular-blur, 20px))"
            : "blur(0px)",
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: isDocs || isScrolled ? "var(--x-border)" : "transparent",
        boxSizing: "border-box",
        transition:
          "background-color 380ms ease, border-color 380ms ease, backdrop-filter 380ms ease, -webkit-backdrop-filter 380ms ease",
      }}
    >
      {/* Inner Content Wrapper: 1440px in docs to match docs grid, 1240px in marketing */}
      <div
        style={{
          width: "100%",
          maxWidth: isDocs ? "1440px" : "1240px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Brand & Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "inherit",
            }}
          >
            <Text
              styleKey="title3"
              weight={400}
              tone="default"
              style={{ letterSpacing: "-0.02em" }}
            >
              Xenon
            </Text>
            <Badge tone="accent" size="sm">
              v1.0
            </Badge>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Link href="/docs/components" style={{ textDecoration: "none" }}>
              <Button
                variant={
                  activePath.includes("/components") ? "subtle" : "ghost"
                }
                size="sm"
              >
                Components
              </Button>
            </Link>
            <Link href="/docs/guidelines" style={{ textDecoration: "none" }}>
              <Button
                variant={
                  activePath.includes("/guidelines") ? "subtle" : "ghost"
                }
                size="sm"
              >
                Guidelines
              </Button>
            </Link>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <Button
                variant={activePath === "/pricing" ? "subtle" : "ghost"}
                size="sm"
              >
                Pricing
              </Button>
            </Link>
            <Link href="/docs" style={{ textDecoration: "none" }}>
              <Button
                variant={activePath === "/docs" ? "subtle" : "ghost"}
                size="sm"
              >
                Docs
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Realtime Appearance Controls (Non-overlapping, Apple-grade UX) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "nowrap",
          }}
        >
          {/* Shared Pill: Tactile Accent Swatches + Hairline Separator + Anchored Radius Dropdown */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: "32px",
              borderRadius: "9999px",
              backgroundColor: "var(--x-surface-2)",
              border: "1px solid var(--x-border)",
              padding: "0 4px 0 10px",
              boxSizing: "border-box",
              transition: "border-color var(--x-dur-fast) ease",
            }}
            title="Theme accent and curvature controls"
          >
            {/* Accent Swatches */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              {ACCENT_LIST.map((item) => {
                const isActive = accent === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onAccentChange(item.key)}
                    aria-label={`Select ${item.label} accent`}
                    title={`${item.label} accent`}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      outline: isActive ? "2px solid var(--x-accent)" : "none",
                      outlineOffset: "2px",
                      transform: isActive ? "scale(1.15)" : "scale(1)",
                      transition:
                        "transform 140ms cubic-bezier(0.2, 0, 0, 1), outline 140ms ease",
                      display: "block",
                    }}
                  />
                );
              })}
            </div>

            {/* Hairline Separator */}
            <div
              aria-hidden="true"
              style={{
                width: "1px",
                height: "16px",
                backgroundColor: "var(--x-border)",
                margin: "0 8px",
                flexShrink: 0,
              }}
            />

            {/* Anchored Stepped Radius Slider Popover */}
            <Popover open={radiusOpen} onOpenChange={setRadiusOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  title="Global curvature radius"
                  aria-label="Adjust global curvature radius"
                  style={{
                    height: "24px",
                    padding: "0 6px 0 8px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: radiusOpen
                      ? "var(--x-surface)"
                      : "transparent",
                    color: "var(--x-text)",
                    fontFamily: "var(--x-font-family-mono)",
                    fontSize: "12px",
                    fontWeight: 400,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    letterSpacing: "-0.01em",
                    transition:
                      "background-color var(--x-dur-fast) ease, color var(--x-dur-fast) ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!radiusOpen)
                      e.currentTarget.style.backgroundColor =
                        "var(--x-surface)";
                  }}
                  onMouseLeave={(e) => {
                    if (!radiusOpen)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <span>R{radius}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: radiusOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
                      color: "var(--x-text-muted)",
                    }}
                  >
                    <CaretDownIcon size={12} />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                width={210}
                placement="bottom-end"
                style={{ padding: "12px 14px" }}
              >
                {/* Minimal Header Row: Label & Active Metric */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Text
                    styleKey="caption1"
                    tone="muted"
                    weight={400}
                    style={{ fontSize: "11px", letterSpacing: "0.02em" }}
                  >
                    Radius
                  </Text>
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "var(--x-font-family-mono)",
                      color: "var(--x-accent)",
                    }}
                  >
                    {RADIUS_SHORT_LABELS[radius]}
                  </span>
                </div>

                {/* Stepped Slider with Tick Notches */}
                <div style={{ position: "relative" }}>
                  <Slider
                    min={0}
                    max={6}
                    step={1}
                    size="sm"
                    value={radius}
                    onValueChange={(val) => onRadiusChange(val as RadiusStop)}
                    aria-label="Adjust global radius stop"
                  />

                  {/* Discrete Stop Ticks */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      transform: "translateY(-50%)",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 6px",
                      pointerEvents: "none",
                    }}
                  >
                    {([0, 1, 2, 3, 4, 5, 6] as RadiusStop[]).map((stop) => (
                      <div
                        key={stop}
                        style={{
                          width: "2px",
                          height: "6px",
                          borderRadius: "1px",
                          backgroundColor:
                            stop <= radius
                              ? "var(--x-accent)"
                              : "var(--x-border)",
                          opacity: stop === radius ? 1 : 0.6,
                          transition: "background-color 140ms ease",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Minimal Boundary Guides */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "6px",
                    fontSize: "10px",
                    fontFamily: "var(--x-font-family-mono)",
                    color: "var(--x-text-muted)",
                    padding: "0 2px",
                    userSelect: "none",
                  }}
                >
                  <span>0 · Sharp</span>
                  <span>6 · Pill</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* AMOLED / Claude Warm Dark Mode Switcher (Visible in dark mode) */}
          {theme !== "light" && onAmoledChange && (
            <Button
              variant={amoled ? "subtle" : "ghost"}
              size="sm"
              onClick={() => onAmoledChange(!amoled)}
              title={
                amoled
                  ? "AMOLED Pitch Black (Active) · Click for Claude Warm Charcoal"
                  : "Claude Warm Charcoal (Active) · Click for AMOLED Pitch Black"
              }
              style={{
                fontSize: "12px",
                fontFamily: "var(--x-font-family-mono)",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: amoled
                    ? "var(--x-accent)"
                    : "var(--x-text-muted)",
                  marginRight: "6px",
                  display: "inline-block",
                }}
              />
              {amoled ? "OLED" : "Warm"}
            </Button>
          )}

          {/* Global ⌘K Command Palette Search Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCommandPalette}
            style={{
              height: "32px",
              padding: "0 10px",
              borderRadius: "9999px",
              borderColor: "var(--x-border)",
              backgroundColor: "var(--x-surface-2)",
              color: "var(--x-text-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
            title="Search documentation and components (⌘K)"
            aria-label="Search documentation"
          >
            <MagnifyingGlassIcon size="sm" />
            <span style={{ fontSize: "12px", fontWeight: 400 }}>Search</span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--x-font-family-mono)",
                padding: "1px 5px",
                borderRadius: "4px",
                backgroundColor: "var(--x-surface)",
                border: "1px solid var(--x-border)",
                color: "var(--x-text-muted)",
              }}
            >
              ⌘K
            </span>
          </Button>

          {/* Theme Switcher */}
          <IconButton
            ariaLabel="Toggle theme"
            variant="subtle"
            size="sm"
            onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
          </IconButton>

          {/* Launch Docs CTA (only on marketing pages, omitted on docs to prevent redundancy) */}
          {!isDocs && (
            <Link href="/docs" style={{ textDecoration: "none" }}>
              <Button variant="filled" size="sm">
                Docs →
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
