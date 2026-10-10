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
  SegmentedControl,
  Text,
} from "@xenon/web";
import type { Accent, RadiusStop, ResolvedTheme } from "@xenon/tokens";
import { MoonIcon, SunIcon } from "./Icons";

interface MarketingNavbarProps {
  theme: ResolvedTheme;
  onThemeChange: (theme: ResolvedTheme) => void;
  accent: Accent;
  onAccentChange: (accent: Accent) => void;
  radius: RadiusStop;
  onRadiusChange: (radius: RadiusStop) => void;
  activePath?: string;
}

export function MarketingNavbar({
  theme,
  onThemeChange,
  accent,
  onAccentChange,
  radius,
  onRadiusChange,
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
        padding: "0 32px",
        borderBottom: "1px solid var(--x-border)",
        transition: "border-color var(--x-dur-base) ease, background-color var(--x-dur-base) ease",
      }}
    >
      {/* Brand & Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <Text styleKey="title3" weight={400} tone="default" style={{ letterSpacing: "-0.02em" }}>
            Xenon
          </Text>
          <Badge tone="accent" size="sm">
            v1.0
          </Badge>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

      {/* Global Realtime Design System Controls & CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Accent Color Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="subtle" size="sm">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "var(--x-accent)",
                  marginRight: "6px",
                  transition: "background-color 240ms cubic-bezier(0.2, 0, 0, 1)",
                }}
              />
              {accent}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={140}>
            {(["lime", "pink", "blue", "purple", "green"] as Accent[]).map((acc) => (
              <DropdownMenuItem key={acc} onClick={() => onAccentChange(acc)}>
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: `var(--x-accent-${acc}, var(--x-accent))`,
                    marginRight: "8px",
                  }}
                />
                {acc}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Radius Stop Selector */}
        <div style={{ width: "160px" }}>
          <SegmentedControl
            options={[
              { value: "0", label: "0" },
              { value: "2", label: "2" },
              { value: "4", label: "4" },
              { value: "6", label: "6" },
            ]}
            value={radius.toString()}
            onValueChange={(val: string) => onRadiusChange(Number(val) as RadiusStop)}
          />
        </div>

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
            Launch Docs →
          </Button>
        </Link>
      </div>
    </GlassBar>
  );
}
