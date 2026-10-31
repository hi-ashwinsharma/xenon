"use client";

import React, { type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AccentPicker,
  Badge,
  Button,
  Group,
  IconButton,
  Navbar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  Stack,
  Switch,
  Text,
} from "@xenon/web";
import type { RadiusStop } from "@xenon/tokens";
import { AppRoutes } from "@xenon/core";
import { useDocsTheme } from "../providers/XenonDocsProvider";
import { XenonMark } from "./XenonMark";
import { MagnifyingGlassIcon, MoonIcon, SlidersIcon, SunIcon } from "./Icons";

export interface MarketingNavbarProps {
  activePath?: string;
}

const NAV_ITEMS: ReadonlyArray<{ href: string; label: string }> = [
  { href: AppRoutes.docs, label: "Docs" },
  { href: AppRoutes.components, label: "Components" },
  { href: AppRoutes.guidelines, label: "Guidelines" },
  { href: "/pricing", label: "Pricing" },
];

export function MarketingNavbar({
  activePath,
}: MarketingNavbarProps): ReactElement {
  const {
    theme,
    setTheme,
    accent,
    setAccent,
    radius,
    setRadius,
    amoled,
    setAmoled,
    setCommandPaletteOpen,
  } = useDocsTheme();
  const pathname = usePathname();
  const current = activePath ?? pathname ?? "";

  const isActive = (href: string): boolean =>
    href === AppRoutes.docs
      ? current === href
      : current === href || current.startsWith(`${href}/`);

  return (
    <Navbar
      navAlign="start"
      collapsible
      glass={current.startsWith(AppRoutes.docs) ? "always" : "scroll"}
      maxWidth={current.startsWith(AppRoutes.docs) ? 1440 : 1240}
      brand={
        <Link
          href={AppRoutes.home}
          aria-label="Xenon home"
          style={{ display: "inline-flex", color: "inherit", textDecoration: "none" }}
        >
          <Group gap={8} align="center">
            <XenonMark size={20} />
            <Text styleKey="title3" weight={400}>
              Xenon
            </Text>
          </Group>
        </Link>
      }
      nav={NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button variant={isActive(item.href) ? "subtle" : "ghost"} size="sm">
            {item.label}
          </Button>
        </Link>
      ))}
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Search documentation"
          >
            <Group gap={6} align="center">
              <MagnifyingGlassIcon size="sm" />
              Search
              <Badge tone="neutral" size="sm">
                ⌘K
              </Badge>
            </Group>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <IconButton ariaLabel="Appearance" variant="ghost" size="sm">
                <SlidersIcon size="sm" />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent width={252} placement="bottom-end">
              <Stack gap={16}>
                <Stack gap={8}>
                  <Text styleKey="caption1" tone="muted">
                    Accent
                  </Text>
                  <AccentPicker value={accent} onValueChange={setAccent} />
                </Stack>
                <Stack gap={8}>
                  <Group justify="between" align="center">
                    <Text styleKey="caption1" tone="muted">
                      Radius
                    </Text>
                    <Text styleKey="caption1" tone="accent">
                      Stop {radius}
                    </Text>
                  </Group>
                  <Slider
                    min={0}
                    max={6}
                    step={1}
                    size="sm"
                    value={radius}
                    onValueChange={(next) => setRadius(next as RadiusStop)}
                    aria-label="Global radius stop"
                  />
                </Stack>
                {theme !== "light" && (
                  <Switch
                    size="sm"
                    checked={amoled}
                    onCheckedChange={setAmoled}
                    label="Pure black"
                  />
                )}
              </Stack>
            </PopoverContent>
          </Popover>

          <IconButton
            ariaLabel={theme === "dark" ? "Use light theme" : "Use dark theme"}
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon size="sm" /> : <MoonIcon size="sm" />}
          </IconButton>
        </>
      }
    />
  );
}
