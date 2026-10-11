"use client";

import React, { type ReactElement } from "react";
import {
  Badge,
  Button,
  Divider,
  Heading,
  Stack,
  Surface,
  Text,
} from "@xenon/web";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";
import { ComponentLivePreview } from "./ComponentLivePreview";

interface AllComponentsGalleryProps {
  onSelectComponent: (id: string) => void;
}

export function AllComponentsGallery({
  onSelectComponent,
}: AllComponentsGalleryProps): ReactElement {
  const categories: Array<
    | "Primitives"
    | "Form Controls"
    | "Navigation"
    | "Overlays"
    | "Feedback & Data Display"
  > = [
    "Primitives",
    "Form Controls",
    "Navigation",
    "Overlays",
    "Feedback & Data Display",
  ];

  return (
    <Stack gap={32} style={{ width: "100%", maxWidth: "1140px" }}>
      <Stack gap={8}>
        <Heading level={1} weight={200}>
          Component Gallery
        </Heading>
        <Text styleKey="body" tone="muted" weight={300}>
          Comprehensive overview of all v1 components. Click any card to inspect
          full props and code snippets.
        </Text>
      </Stack>

      <Divider />

      {categories.map((cat) => {
        const items = COMPONENTS_REGISTRY.filter((i) => i.category === cat);
        return (
          <Stack key={cat} gap={16}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Heading level={3} weight={300}>
                {cat}
              </Heading>
              <Badge tone="neutral">{items.length} components</Badge>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {items.map((item) => (
                <Surface
                  key={item.id}
                  variant="subtle"
                  padding={0}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "var(--x-radius-surface, 16px)",
                    overflow: "hidden",
                    backgroundColor: "var(--x-surface-1)",
                    border: "1px solid var(--x-border)",
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid var(--x-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "var(--x-surface-0)",
                    }}
                  >
                    <div>
                      <Text styleKey="body" weight={400} tone="default">
                        {item.name}
                      </Text>
                    </div>
                    <Button
                      size="sm"
                      variant="subtle"
                      onClick={() => onSelectComponent(item.id)}
                    >
                      Inspect →
                    </Button>
                  </div>

                  {/* Card Live Canvas */}
                  <div
                    style={{
                      padding: "32px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "140px",
                    }}
                  >
                    <ComponentLivePreview
                      componentId={item.id}
                      variant="filled"
                      size="md"
                      disabled={false}
                      loading={false}
                      label={item.name}
                    />
                  </div>

                  {/* Card Description */}
                  <div
                    style={{
                      padding: "10px 16px",
                      borderTop: "1px solid var(--x-border)",
                      backgroundColor: "var(--x-surface-0)",
                    }}
                  >
                    <Text styleKey="caption1" tone="muted">
                      {item.description}
                    </Text>
                  </div>
                </Surface>
              ))}
            </div>
          </Stack>
        );
      })}
    </Stack>
  );
}
