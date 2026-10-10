"use client";

import React, { type ReactElement } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  GlassBar,
  IconButton,
  Text,
} from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import { MoonIcon, SunIcon } from "./Icons";

interface MarketingNavbarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  accent: Accent;
  onAccentChange: (accent: Accent) => void;
  radius: RadiusStop;
  onRadiusChange: (radius: RadiusStop) => void;
  amoled?: boolean;
  onAmoledChange?: (amoled: boolean) => void;
  activePath?: string;
}

const ACCENT_LIST: Array<{ key: Accent; label: string; color: string }> = [
  { key: "lime", label: "Lime", color: "#D4FF4F" },
  { key: "orange", label: "Orange", color: "#FF7E47" },
  { key: "blue", label: "Blue", color: "#9ED8FF" },
  { key: "pink", label: "Pink", color: "#FFB3D9" },
  { key: "purple", label: "Purple", color: "#CDB4FF" },
  { key: "green", label: "Green", color: "#9BFFB8" },
];

const RADIUS_LABELS: Record<RadiusStop, string> = {
  0: "Stop 0 · Sharp (0px)",
  1: "Stop 1 · Subtle (4px)",
  2: "Stop 2 · Compact (8px)",
  3: "Stop 3 · Apple Standard (12px)",
  4: "Stop 4 · Soft (16px)",
  5: "Stop 5 · Rounded (20px)",
  6: "Stop 6 · Pill (Capsule)",
};

export function MarketingNavbar({
  theme,
  onThemeChange,
  accent,
  onAccentChange,
  radius,
  onRadiusChange,
  amoled = true,
  onAmoledChange,
  activePath = "/",
}: MarketingNavbarProps): ReactElement {
  return (
    <GlassBar
      bordered
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        borderBottom: "1px solid var(--x-border)",
        transition:
          "border-color var(--x-dur-base) ease, background-color var(--x-dur-base) ease",
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
          <Text styleKey="title3" weight={400} tone="default" style={{ letterSpacing: "-0.02em" }}>
            Xenon
          </Text>
          <Badge tone="accent" size="sm">
            v1.0
          </Badge>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Link href="/docs/components" style={{ textDecoration: "none" }}>
            <Button variant={activePath.includes("/components") ? "subtle" : "ghost"} size="sm">
              Components
            </Button>
          </Link>
          <Link href="/docs/guidelines" style={{ textDecoration: "none" }}>
            <Button variant={activePath.includes("/guidelines") ? "subtle" : "ghost"} size="sm">
              Guidelines
            </Button>
          </Link>
          <Link href="/pricing" style={{ textDecoration: "none" }}>
            <Button variant={activePath === "/pricing" ? "subtle" : "ghost"} size="sm">
              Pricing
            </Button>
          </Link>
          <Link href="/docs" style={{ textDecoration: "none" }}>
            <Button variant={activePath === "/docs" ? "subtle" : "ghost"} size="sm">
              Docs
            </Button>
          </Link>
        </div>
      </div>

      {/* Global Realtime Appearance Controls (Non-overlapping, Apple-grade UX) */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "nowrap" }}>
        {/* Tactile Accent Swatches (Single-click macOS style) */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            borderRadius: "var(--x-radius-control, 9999px)",
            backgroundColor: "var(--x-surface-2)",
            border: "1px solid var(--x-border)",
          }}
          title="Select accent color"
        >
          {ACCENT_LIST.map((item) => {
            const isActive = accent === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onAccentChange(item.key)}
                aria-label={`Select ${item.label} accent`}
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
                  transition: "transform 140ms ease, outline 140ms ease",
                }}
              />
            );
          })}
        </div>

        {/* Compact Radius Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="subtle"
              size="sm"
              title="Global curvature radius"
              style={{ fontFamily: "var(--x-font-family-mono)", minWidth: "64px" }}
            >
              R{radius}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={200}>
            {([0, 1, 2, 3, 4, 5, 6] as RadiusStop[]).map((stop) => (
              <DropdownMenuItem
                key={stop}
                onSelect={() => onRadiusChange(stop)}
                onClick={() => onRadiusChange(stop)}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: stop === 0 ? "0px" : stop === 6 ? "50%" : "2px",
                    backgroundColor: radius === stop ? "var(--x-accent)" : "var(--x-border)",
                    marginRight: "8px",
                  }}
                />
                {RADIUS_LABELS[stop]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* AMOLED / Claude Warm Dark Mode Switcher (Visible in dark mode) */}
        {theme !== "light" && onAmoledChange && (
          <Button
            variant={amoled ? "subtle" : "ghost"}
            size="sm"
            onClick={() => onAmoledChange(!amoled)}
            title={amoled ? "AMOLED Pitch Black (Active) · Click for Claude Warm Charcoal" : "Claude Warm Charcoal (Active) · Click for AMOLED Pitch Black"}
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
                backgroundColor: amoled ? "var(--x-accent)" : "var(--x-text-muted)",
                marginRight: "6px",
                display: "inline-block",
              }}
            />
            {amoled ? "OLED" : "Warm"}
          </Button>
        )}

        {/* Theme Switcher */}
        <IconButton
          ariaLabel="Toggle theme"
          variant="subtle"
          size="sm"
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
        </IconButton>

        {/* Launch Docs CTA */}
        <Link href="/docs" style={{ textDecoration: "none" }}>
          <Button variant="filled" size="sm">
            Docs →
          </Button>
        </Link>
      </div>
    </GlassBar>
  );
}
