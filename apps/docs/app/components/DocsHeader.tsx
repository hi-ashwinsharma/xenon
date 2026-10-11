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
import { CommandIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "./Icons";

interface DocsHeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  accent: Accent;
  onAccentChange: (accent: Accent) => void;
  radius: RadiusStop;
  onRadiusChange: (radius: RadiusStop) => void;
  onOpenCommandPalette: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DocsHeader({
  theme,
  onThemeChange,
  accent,
  onAccentChange,
  radius,
  onRadiusChange,
  onOpenCommandPalette,
  activeTab,
  onTabChange,
}: DocsHeaderProps): ReactElement {
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
        padding: "0 24px",
        borderBottom: "1px solid var(--x-border)",
      }}
    >
      {/* Brand & Mode Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Text styleKey="title3" weight={400} style={{ letterSpacing: "-0.02em" }}>
            Xenon
          </Text>
          <Badge tone="accent" size="sm">
            v0.1.0
          </Badge>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Button
            variant={activeTab === "components" ? "subtle" : "ghost"}
            size="sm"
            onClick={() => onTabChange("components")}
          >
            Components
          </Button>
          <Button
            variant={activeTab === "guidelines" ? "subtle" : "ghost"}
            size="sm"
            onClick={() => onTabChange("guidelines")}
          >
            Guidelines
          </Button>
          <Button
            variant={activeTab === "gallery" ? "subtle" : "ghost"}
            size="sm"
            onClick={() => onTabChange("gallery")}
          >
            All Gallery
          </Button>
        </div>
      </div>

      {/* Global Controls & Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Command Palette Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenCommandPalette}
          style={{
            minWidth: "180px",
            justifyContent: "space-between",
            color: "var(--x-text-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MagnifyingGlassIcon size="sm" />
            <span>Search</span>
          </div>
          <CommandIcon size="sm" />
        </Button>

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
                }}
              />
              {accent}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={140}>
            {(["lime", "orange", "pink", "blue", "purple", "green"] as Accent[]).map((acc) => (
              <DropdownMenuItem
                key={acc}
                onSelect={() => onAccentChange(acc)}
                onClick={() => onAccentChange(acc)}
              >
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
                Stop {stop}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Switcher */}
        <IconButton
          ariaLabel="Toggle theme"
          variant="subtle"
          size="sm"
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
        </IconButton>
      </div>
    </GlassBar>
  );
}
