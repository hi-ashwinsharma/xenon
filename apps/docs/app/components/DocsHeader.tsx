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
            {(["lime", "pink", "blue", "purple", "green"] as Accent[]).map((acc) => (
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

        {/* Radius Stop Selector */}
        <div style={{ width: "230px" }}>
          <SegmentedControl
            size="sm"
            options={[
              { value: "0", label: "0" },
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
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
      </div>
    </GlassBar>
  );
}
