"use client";

import React, { useMemo, useState, type ReactElement } from "react";
import Link from "next/link";
import {
  Grid,
  Group,
  Heading,
  Input,
  Reveal,
  SegmentedControl,
  Stack,
  Surface,
  Text,
} from "@xenon/web";
import { AppRoutes } from "@xenon/core";
import {
  COMPONENTS_REGISTRY,
  type ComponentDocEntry,
} from "../docs-data/components-registry";
import { ComponentLivePreview } from "./ComponentLivePreview";
import { CaretRightIcon, MagnifyingGlassIcon } from "./Icons";

type GalleryCategory = "All" | ComponentDocEntry["category"];

const CATEGORIES: ReadonlyArray<{ value: GalleryCategory; label: string }> = [
  { value: "All", label: "All" },
  { value: "Primitives", label: "Primitives" },
  { value: "Form Controls", label: "Forms" },
  { value: "Navigation", label: "Navigation" },
  { value: "Overlays", label: "Overlays" },
  { value: "Feedback & Data Display", label: "Feedback" },
];

function GalleryCard({ item }: { item: ComponentDocEntry }): ReactElement {
  return (
    <Surface
      interactive
      padding={0}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* The preview stays hands-on; the caption row opens the component page */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "14rem",
          padding: "var(--x-space-4)",
          overflow: "hidden",
        }}
      >
        <div style={{ zoom: 0.8, width: "100%", display: "flex", justifyContent: "center" }}>
          <ComponentLivePreview
            componentId={item.id}
            variant="filled"
            size="md"
            disabled={false}
            loading={false}
            label={item.name}
          />
        </div>
      </div>
      <Link
        href={`${AppRoutes.components}/${item.id}`}
        style={{
          display: "block",
          padding: "var(--x-space-3) var(--x-space-4) var(--x-space-4)",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <Stack gap={4}>
          <Group justify="between" align="center">
            <Text styleKey="callout" weight={400}>
              {item.name}
            </Text>
            <CaretRightIcon size="sm" color="var(--x-text-muted)" />
          </Group>
          <Text styleKey="footnote" tone="muted">
            {item.description}
          </Text>
        </Stack>
      </Link>
    </Surface>
  );
}

export function AllComponentsGallery(): ReactElement {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [query, setQuery] = useState<string>("");

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return COMPONENTS_REGISTRY.filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (needle === "" || item.name.toLowerCase().includes(needle)),
    );
  }, [category, query]);

  return (
    <Stack gap={40} style={{ width: "100%" }}>
      <Reveal>
        <Stack gap={12} style={{ maxWidth: "40rem" }}>
          <Heading level={1} styleKey="largeTitle" weight={200}>
            Components
          </Heading>
          <Text styleKey="body" tone="muted">
            {COMPONENTS_REGISTRY.length} components with one contract on web and
            Expo. Every card below is the real thing, so try it.
          </Text>
        </Stack>
      </Reveal>

      <Reveal order={1}>
        <Group justify="between" align="center" gap={16} wrap="wrap">
          <SegmentedControl
            size="sm"
            value={category}
            onValueChange={(next) => setCategory(next as GalleryCategory)}
            options={CATEGORIES.map(({ value, label }) => ({ value, label }))}
          />
          <div style={{ width: "16rem", maxWidth: "100%" }}>
            <Input
              size="sm"
              clearable
              placeholder="Filter by name"
              aria-label="Filter components by name"
              prefix={<MagnifyingGlassIcon size="sm" />}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </Group>
      </Reveal>

      {items.length === 0 ? (
        <Text styleKey="body" tone="muted">
          No components match that name.
        </Text>
      ) : (
        <Grid minItemWidth={320} gap={16}>
          {items.map((item, index) => (
            <Reveal key={item.id} order={index % 3}>
              <GalleryCard item={item} />
            </Reveal>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
