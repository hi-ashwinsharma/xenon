"use client";

import React, { useState, type ReactElement } from "react";
import {
  Alert,
  Badge,
  CodeBlock,
  Divider,
  Heading,
  Slider,
  Stack,
  Surface,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@xenon/web";

export function GuidelinesViewer(): ReactElement {
  const [parentRadius, setParentRadius] = useState<number>(24);
  const [padding, setPadding] = useState<number>(16);

  const calculatedChildRadius = Math.max(0, parentRadius - padding);

  return (
    <Stack gap={32} style={{ width: "100%", maxWidth: "980px" }}>
      {/* Title */}
      <Stack gap={8}>
        <Heading level={1} weight={200}>
          Design Guidelines & Mathematics
        </Heading>
        <Text
          styleKey="body"
          tone="muted"
          weight={300}
          style={{ fontSize: "16px" }}
        >
          Core geometric invariants, concentric mathematics, and typography
          rules that define Xenon.
        </Text>
      </Stack>

      <Divider />

      {/* 1. Concentric Geometry Visualizer */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          1. Concentric Radius Geometry
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Nested rounded surfaces must never use the same corner radius as their
          container. Doing so makes inner elements look optically alien and
          bloated. Xenon strictly enforces the concentric formula:
        </Text>

        <CodeBlock
          code={`R_child = Math.max(0, R_parent - padding)`}
          language="typescript"
          showLineNumbers={false}
          filename="concentric-formula.ts"
        />

        {/* Live Interactive Concentric Visualizer */}
        <Surface
          variant="subtle"
          padding={24}
          style={{
            borderRadius: "var(--x-radius-surface, 16px)",
            backgroundColor: "var(--x-surface-1)",
            border: "1px solid var(--x-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ minWidth: "200px" }}>
              <Text styleKey="caption1" tone="muted">
                Parent Radius: {parentRadius}px
              </Text>
              <Slider
                min={8}
                max={48}
                step={2}
                value={parentRadius}
                onValueChange={setParentRadius}
              />
            </div>
            <div style={{ minWidth: "200px" }}>
              <Text styleKey="caption1" tone="muted">
                Padding Inset: {padding}px
              </Text>
              <Slider
                min={4}
                max={32}
                step={2}
                value={padding}
                onValueChange={setPadding}
              />
            </div>
            <div>
              <Badge tone="accent">
                Child Radius = {calculatedChildRadius}px
              </Badge>
            </div>
          </div>

          <div
            style={{
              padding: `${padding}px`,
              borderRadius: `${parentRadius}px`,
              border: "1px solid var(--x-border)",
              backgroundColor: "var(--x-surface-0)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "160px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "280px",
                padding: "16px",
                borderRadius: `${calculatedChildRadius}px`,
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                textAlign: "center",
              }}
            >
              <Text styleKey="caption1" weight={400} tone="default">
                Concentric Child (R = {calculatedChildRadius}px)
              </Text>
            </div>
          </div>
        </Surface>
      </Stack>

      {/* 2. 7-Stop Radius Scale */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          2. Discrete 7-Stop Radius Scale
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Radii are not arbitrary numbers. They are bound to a strict 7-stop
          scale where controls and surfaces scale synchronously:
        </Text>

        <Table variant="bordered" fullWidth>
          <TableHeader>
            <TableRow>
              <TableHead>Stop</TableHead>
              <TableHead>Control Radius</TableHead>
              <TableHead>Surface Radius</TableHead>
              <TableHead>Joint Radius</TableHead>
              <TableHead>Feel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Stop 0</TableCell>
              <TableCell>0px</TableCell>
              <TableCell>0px</TableCell>
              <TableCell>0px</TableCell>
              <TableCell>Sharp / Brutalist</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stop 1</TableCell>
              <TableCell>4px</TableCell>
              <TableCell>6px</TableCell>
              <TableCell>2px</TableCell>
              <TableCell>Restrained Architectural</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stop 2</TableCell>
              <TableCell>8px</TableCell>
              <TableCell>10px</TableCell>
              <TableCell>2px</TableCell>
              <TableCell>Subtle Rounding</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stop 3</TableCell>
              <TableCell>12px</TableCell>
              <TableCell>16px</TableCell>
              <TableCell>3px</TableCell>
              <TableCell>Apple Standard</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stop 4</TableCell>
              <TableCell>16px</TableCell>
              <TableCell>20px</TableCell>
              <TableCell>4px</TableCell>
              <TableCell>Smooth Contemporary</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stop 5</TableCell>
              <TableCell>20px</TableCell>
              <TableCell>24px</TableCell>
              <TableCell>5px</TableCell>
              <TableCell>Soft Organic</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stop 6</TableCell>
              <TableCell>9999px (Pill)</TableCell>
              <TableCell>28px</TableCell>
              <TableCell>6px</TableCell>
              <TableCell>Pill Action First</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>

      {/* 3. Typography & Weight Invariant */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          3. Typography & Weight Invariant
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Xenon strictly bans font weights of 500 or higher. Hierarchy is
          conveyed through size scale, tracking, and optical tone, creating a
          refined, calm visual atmosphere.
        </Text>

        <Surface
          variant="subtle"
          padding={16}
          style={{ border: "1px solid var(--x-border)" }}
        >
          <Stack gap={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text styleKey="title3" weight={200}>
                Weight 200: Display Headings
              </Text>
              <Badge tone="neutral">font-weight: 200</Badge>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text styleKey="title3" weight={300}>
                Weight 300: Section Headings & Body
              </Text>
              <Badge tone="neutral">font-weight: 300</Badge>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text styleKey="title3" weight={400}>
                Weight 400: Button Labels & Strong Text
              </Text>
              <Badge tone="neutral">font-weight: 400</Badge>
            </div>
          </Stack>
        </Surface>
      </Stack>

      {/* 4. Motion Invariant */}
      <Alert tone="info" title="Zero Instant/Snappy Transitions">
        Every visual state change in Xenon glides through Apple-grade fluid
        curves (280ms cubic-bezier or physics springs). Instant snapping and
        uncoordinated display: none are strictly banned.
      </Alert>
    </Stack>
  );
}
