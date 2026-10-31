"use client";

import React, { type ReactElement } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Footer, Group, Stack, Text } from "@xenon/web";
import { AppRoutes } from "@xenon/core";
import { useXenon } from "@xenon/web";
import { XenonMark } from "./XenonMark";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Docs", href: AppRoutes.docs },
      { label: "Components", href: AppRoutes.components },
      { label: "Guidelines", href: AppRoutes.guidelines },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "For agents",
    links: [
      { label: "llms.txt", href: AppRoutes.llms, external: true },
      { label: "llms-full.txt", href: AppRoutes.llmsFull, external: true },
      { label: "Registry", href: AppRoutes.registry, external: true },
    ],
  },
  {
    title: "Packages",
    links: [
      {
        label: "@xenon-kit/web",
        href: "https://www.npmjs.com/package/@xenon-kit/web",
        external: true,
      },
      {
        label: "@xenon-kit/cli",
        href: "https://www.npmjs.com/package/@xenon-kit/cli",
        external: true,
      },
    ],
  },
] as const;

export function SiteFooter(): ReactElement {
  const { resolvedTheme } = useXenon();

  return (
    <Footer
      brand={
        <Stack gap={12}>
          <Group gap={8} align="center">
            <XenonMark size={20} />
            <Text styleKey="title3" weight={400}>
              Xenon
            </Text>
          </Group>
          <Text styleKey="footnote" tone="muted">
            A quiet UI kit for web and Expo, built on one token source.
          </Text>
        </Stack>
      }
      columns={COLUMNS}
      renderLink={(link, label) =>
        link.external ? (
          <a
            className="x-footer-link"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {label}
          </a>
        ) : (
          <NextLink className="x-footer-link" href={link.href}>
            {label}
          </NextLink>
        )
      }
      legal="© 2026 Xenon. All rights reserved."
      credit={
        <a
          className="x-footer-link"
          href="https://qmatus.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Group gap={8} align="center">
            <Image
              alt=""
              height={18}
              src={`/brand/qmatus-${resolvedTheme}.svg`}
              unoptimized
              width={18}
            />
            <Text styleKey="caption1" as="span" style={{ color: "inherit" }}>
              Built by QMatus
            </Text>
          </Group>
        </a>
      }
    />
  );
}
