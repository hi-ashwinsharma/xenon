"use client";

import React, { useState, useMemo, type ReactElement } from "react";
import {
  Alert,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  CodeBlock,
  Divider,
  Heading,
  SegmentedControl,
  Stack,
  Surface,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@xenon/web";
import type { ComponentDocEntry } from "../docs-data/components-registry";
import { ComponentLivePreview } from "./ComponentLivePreview";

interface ComponentShowcaseProps {
  entry: ComponentDocEntry;
}

export function ComponentShowcase({ entry }: ComponentShowcaseProps): ReactElement {
  // Playground interactive props
  const [variant, setVariant] = useState<string>("filled");
  const [size, setSize] = useState<string>("md");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cliPm, setCliPm] = useState<string>("pnpm");

  // Dynamic code snippet generation based on active playground state
  const dynamicWebSnippet = useMemo(() => {
    const propsList: string[] = [];
    if (variant !== "filled") propsList.push(`variant="${variant}"`);
    if (size !== "md") propsList.push(`size="${size}"`);
    if (disabled) propsList.push("disabled");
    if (loading) propsList.push("loading");

    const propsString = propsList.length > 0 ? " " + propsList.join(" ") : "";
    return `<${entry.name}${propsString}>\n  Action\n</${entry.name}>`;
  }, [entry.name, variant, size, disabled, loading]);

  const installCommand = useMemo(() => {
    switch (cliPm) {
      case "npm":
        return `npm install @xenon/web @xenon/core`;
      case "yarn":
        return `yarn add @xenon/web @xenon/core`;
      case "bun":
        return `bun add @xenon/web @xenon/core`;
      case "cli":
        return entry.cliInstall;
      case "pnpm":
      default:
        return entry.npmInstall;
    }
  }, [cliPm, entry.cliInstall, entry.npmInstall]);

  return (
    <Stack gap={32} style={{ width: "100%", maxWidth: "980px" }}>
      {/* 1. Header & Metadata */}
      <Stack gap={8}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`#${entry.category.toLowerCase().replace(/ /g, "-")}`}>
                {entry.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{entry.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Heading level={1} weight={200}>
          {entry.name}
        </Heading>

        <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "16px", lineHeight: "1.6" }}>
          {entry.description}
        </Text>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px", flexWrap: "wrap" }}>
          <Badge tone="accent">v1.0.0</Badge>
          <Badge tone="neutral">Web: React DOM</Badge>
          <Badge tone="neutral">Native: Expo</Badge>
          <Badge tone="success">Zero Shadows</Badge>
        </div>
      </Stack>

      <Divider />

      {/* 2. CLI & Installation */}
      <Stack gap={12}>
        <Heading level={3} weight={300}>
          Installation
        </Heading>
        <Text styleKey="caption1" tone="muted">
          Install using your package manager or scaffold directly via the Xenon CLI.
        </Text>

        <div style={{ width: "280px", marginBottom: "8px" }}>
          <SegmentedControl
            options={[
              { value: "pnpm", label: "pnpm" },
              { value: "npm", label: "npm" },
              { value: "bun", label: "bun" },
              { value: "cli", label: "cli" },
            ]}
            value={cliPm}
            onValueChange={setCliPm}
          />
        </div>

        <CodeBlock
          code={installCommand}
          language="bash"
          showLineNumbers={false}
          copyable
        />
      </Stack>

      {/* 3. Interactive Playground (Preview & Controls) */}
      <Stack gap={12}>
        <div>
          <Heading level={3} weight={300}>
            Interactive Playground
          </Heading>
          <Text styleKey="caption1" tone="muted">
            Test props live with Apple-grade fluid transitions and concentric geometry.
          </Text>
        </div>

        <Surface
          variant="subtle"
          padding={0}
          style={{
            overflow: "hidden",
            borderRadius: "var(--x-radius-surface, 16px)",
            backgroundColor: "var(--x-surface-1)",
            border: "1px solid var(--x-border)",
          }}
        >
          {/* Playground Top Controls Toolbar */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--x-border)",
              backgroundColor: "var(--x-surface-0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ width: "240px" }}>
                <SegmentedControl
                  options={[
                    { value: "filled", label: "Filled" },
                    { value: "secondary", label: "Secondary" },
                    { value: "subtle", label: "Subtle" },
                    { value: "outline", label: "Outline" },
                  ]}
                  value={variant}
                  onValueChange={setVariant}
                />
              </div>

              <div style={{ width: "160px" }}>
                <SegmentedControl
                  options={[
                    { value: "sm", label: "sm" },
                    { value: "md", label: "md" },
                    { value: "lg", label: "lg" },
                  ]}
                  value={size}
                  onValueChange={setSize}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Switch
                label="Disabled"
                checked={disabled}
                onCheckedChange={setDisabled}
                size="sm"
              />
              {entry.id === "button" && (
                <Switch
                  label="Loading"
                  checked={loading}
                  onCheckedChange={setLoading}
                  size="sm"
                />
              )}
            </div>
          </div>

          {/* Playground Live Canvas */}
          <div
            style={{
              padding: "40px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "180px",
              backgroundColor: "var(--x-surface-1)",
            }}
          >
            <ComponentLivePreview
              componentId={entry.id}
              variant={variant}
              size={size}
              disabled={disabled}
              loading={loading}
              label={entry.name}
            />
          </div>

          {/* Dynamic Code Preview Bar */}
          <div
            style={{
              padding: "10px 16px",
              borderTop: "1px solid var(--x-border)",
              backgroundColor: "var(--x-surface-0)",
            }}
          >
            <Text styleKey="caption1" tone="muted" style={{ fontFamily: "var(--x-font-family-mono)" }}>
              Active JSX: {dynamicWebSnippet.replace(/\n\s*/g, " ")}
            </Text>
          </div>
        </Surface>
      </Stack>

      {/* 4. Code Usage Snippets */}
      <Stack gap={12}>
        <Heading level={3} weight={300}>
          Usage
        </Heading>
        <Text styleKey="caption1" tone="muted">
          Identical props contracts across Web React DOM and React Native Expo.
        </Text>

        <Tabs defaultValue="web">
          <TabsList>
            <TabsTrigger value="web">Web (React DOM)</TabsTrigger>
            <TabsTrigger value="native">Native (Expo)</TabsTrigger>
          </TabsList>
          <TabsContent value="web">
            <CodeBlock
              code={entry.webUsage}
              language="typescript"
              filename={`${entry.name}.web.tsx`}
              showLineNumbers
              copyable
            />
          </TabsContent>
          <TabsContent value="native">
            <CodeBlock
              code={entry.nativeUsage}
              language="typescript"
              filename={`${entry.name}.native.tsx`}
              showLineNumbers
              copyable
            />
          </TabsContent>
        </Tabs>
      </Stack>

      {/* 5. Props API Specification */}
      <Stack gap={12}>
        <Heading level={3} weight={300}>
          Props Specification
        </Heading>
        <Text styleKey="caption1" tone="muted">
          Exhaustive TypeScript properties contract for {entry.name}.
        </Text>

        <Table variant="bordered" fullWidth>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "160px" }}>Prop</TableHead>
              <TableHead style={{ width: "220px" }}>Type</TableHead>
              <TableHead style={{ width: "120px" }}>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entry.props.map((p) => (
              <TableRow key={p.name}>
                <TableCell>
                  <span
                    style={{
                      fontFamily: "var(--x-font-family-mono)",
                      color: "var(--x-accent)",
                      fontWeight: 400,
                    }}
                  >
                    {p.name}
                  </span>
                  {p.required && (
                    <Badge tone="accent" size="sm" style={{ marginLeft: "6px" }}>
                      req
                    </Badge>
                  )}
                </TableCell>
                <TableCell style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "12px", color: "var(--x-text-muted)" }}>
                  {p.type}
                </TableCell>
                <TableCell style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "12px" }}>
                  {p.defaultValue ?? "—"}
                </TableCell>
                <TableCell style={{ fontSize: "13px", color: "var(--x-text)" }}>
                  {p.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>

      {/* 6. Accessibility Notes */}
      <Alert tone="info" title="Accessibility Standards">
        {entry.a11y}
      </Alert>
    </Stack>
  );
}
