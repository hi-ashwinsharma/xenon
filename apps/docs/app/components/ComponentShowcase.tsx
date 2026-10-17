"use client";

import React, {
  useState,
  useMemo,
  type ReactElement,
  type CSSProperties,
} from "react";
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

export function ComponentShowcase({
  entry,
}: ComponentShowcaseProps): ReactElement {
  // Tailored interactive property states initialized based on component type
  const [variant, setVariant] = useState<string>(() => {
    if (entry.id === "badge" || entry.id === "alert") return "subtle";
    if (entry.id === "tabs") return "pill";
    if (entry.id === "accordion" || entry.id === "table") return "bordered";
    if (entry.id === "button-group") return "outline";
    if (entry.id === "sidebar") return "docked";
    if (entry.id === "surface") return "subtle";
    return "filled";
  });
  const [tone, setTone] = useState<string>(
    entry.id === "alert" ? "info" : "accent",
  );
  const [size, setSize] = useState<string>("md");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [clearable, setClearable] = useState<boolean>(true);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [dot, setDot] = useState<boolean>(true);
  const [dismissible, setDismissible] = useState<boolean>(true);
  const [sliderVal, setSliderVal] = useState<number>(3);
  const [shape, setShape] = useState<string>("circle");
  const [avatarStatus, setAvatarStatus] = useState<string>("online");
  const [rows, setRows] = useState<number>(3);
  const [padding, setPadding] = useState<number>(24);
  const [side, setSide] = useState<string>("right");
  const [styleKey, setStyleKey] = useState<string>("body");
  const [weight, setWeight] = useState<number>(300);
  const [lineNumbers, setLineNumbers] = useState<boolean>(true);
  const [copyable, setCopyable] = useState<boolean>(true);
  const [borderedNav, setBorderedNav] = useState<boolean>(true);
  const [cliPm, setCliPm] = useState<string>("pnpm");

  // Dynamic code snippet generation reflecting the exact properties active in the playground
  const dynamicWebSnippet = useMemo(() => {
    switch (entry.id) {
      case "button": {
        const props: string[] = [];
        if (variant !== "filled") props.push(`variant="${variant}"`);
        if (size !== "md") props.push(`size="${size}"`);
        if (disabled) props.push("disabled");
        if (loading) props.push("loading");
        if (fullWidth) props.push("fullWidth");
        const pStr = props.length > 0 ? " " + props.join(" ") : "";
        return `<Button${pStr}>\n  Confirm Action\n</Button>`;
      }
      case "icon-button": {
        const props: string[] = [`ariaLabel="Custom Controls"`];
        if (variant !== "subtle") props.push(`variant="${variant}"`);
        if (size !== "md") props.push(`size="${size}"`);
        if (disabled) props.push("disabled");
        if (loading) props.push("loading");
        return `<IconButton ${props.join(" ")}>\n  <SlidersIcon size="${size === "lg" ? "md" : "sm"}" />\n</IconButton>`;
      }
      case "button-group": {
        const props: string[] = [];
        if (variant !== "outline") props.push(`variant="${variant}"`);
        if (size !== "md") props.push(`size="${size}"`);
        if (disabled) props.push("disabled");
        const pStr = props.length > 0 ? " " + props.join(" ") : "";
        return `<ButtonGroup${pStr}>\n  <Button>Cut</Button>\n  <Button>Copy</Button>\n  <Button>Paste</Button>\n</ButtonGroup>`;
      }
      case "badge": {
        const props: string[] = [];
        if (tone !== "neutral") props.push(`tone="${tone}"`);
        if (variant !== "subtle") props.push(`variant="${variant}"`);
        if (size !== "md") props.push(`size="${size}"`);
        if (dot) props.push("dot");
        const pStr = props.length > 0 ? " " + props.join(" ") : "";
        return `<Badge${pStr}>\n  Status Tag\n</Badge>`;
      }
      case "alert": {
        const props: string[] = [];
        if (tone !== "info") props.push(`tone="${tone}"`);
        if (variant !== "subtle") props.push(`variant="${variant}"`);
        props.push(`title="Notice"`);
        if (dismissible) props.push("dismissible");
        return `<Alert ${props.join(" ")}>\n  All dividers and borders must strictly measure 1px.\n</Alert>`;
      }
      case "switch": {
        const props: string[] = [`label="Liquid Glass Blur"`];
        if (size !== "md") props.push(`size="${size}"`);
        props.push(`checked={${checked}}`);
        if (disabled) props.push("disabled");
        return `<Switch ${props.join(" ")} />`;
      }
      case "checkbox": {
        const props: string[] = [
          `label="Enforce mathematical concentric radii"`,
        ];
        if (size !== "md") props.push(`size="${size}"`);
        if (indeterminate) props.push("indeterminate");
        else props.push(`checked={${checked}}`);
        if (disabled) props.push("disabled");
        return `<Checkbox ${props.join(" ")} />`;
      }
      case "slider": {
        const props: string[] = [
          `min={0}`,
          `max={6}`,
          `step={1}`,
          `value={${sliderVal}}`,
        ];
        if (size !== "md") props.push(`size="${size}"`);
        if (disabled) props.push("disabled");
        return `<Slider ${props.join(" ")} />`;
      }
      case "input": {
        const props: string[] = [`placeholder="Project name..."`];
        if (size !== "md") props.push(`size="${size}"`);
        if (clearable) props.push("clearable");
        if (invalid) props.push("invalid");
        if (disabled) props.push("disabled");
        return `<Input ${props.join(" ")} />`;
      }
      case "textarea": {
        const props: string[] = [
          `placeholder="Architectural notes..."`,
          `rows={${rows}}`,
        ];
        if (size !== "md") props.push(`size="${size}"`);
        if (invalid) props.push("invalid");
        if (disabled) props.push("disabled");
        return `<Textarea ${props.join(" ")} />`;
      }
      case "field": {
        const props: string[] = [
          `label="Workspace ID"`,
          `helpText="Must be globally unique"`,
        ];
        if (invalid) props.push(`error="Identifier is already taken"`);
        return `<Field ${props.join(" ")}>\n  <Input placeholder="my-team" size="md"${disabled ? " disabled" : ""} />\n</Field>`;
      }
      case "surface": {
        const props: string[] = [];
        if (variant !== "default") props.push(`variant="${variant}"`);
        props.push(`padding={${padding}}`);
        return `<Surface ${props.join(" ")}>\n  <Text>Concentric surface layer</Text>\n</Surface>`;
      }
      case "typography": {
        return `<Text styleKey="${styleKey}" tone="${tone}" weight={${weight}}>\n  Minimalist architecture with light weights.\n</Text>`;
      }
      case "avatar": {
        const props: string[] = [`name="Dieter Rams"`];
        if (size !== "md") props.push(`size="${size}"`);
        if (shape !== "circle") props.push(`shape="${shape}"`);
        if (avatarStatus !== "none") props.push(`status="${avatarStatus}"`);
        return `<Avatar ${props.join(" ")} />`;
      }
      case "table": {
        const props: string[] = [];
        if (variant !== "default") props.push(`variant="${variant}"`);
        if (size !== "md") props.push(`size="${size}"`);
        if (fullWidth) props.push("fullWidth");
        const pStr = props.length > 0 ? " " + props.join(" ") : "";
        return `<Table${pStr}>\n  <TableHeader>...</TableHeader>\n  <TableBody>...</TableBody>\n</Table>`;
      }
      case "tabs": {
        return `<Tabs defaultValue="overview" variant="${variant}">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="tokens">Tokens</TabsTrigger>\n  </TabsList>\n</Tabs>`;
      }
      case "accordion": {
        return `<Accordion type="single" variant="${variant}">\n  <AccordionItem value="1">\n    <AccordionTrigger>Why are shadows banned?</AccordionTrigger>\n    <AccordionContent>Depth comes from 1px hairlines and surface tone.</AccordionContent>\n  </AccordionItem>\n</Accordion>`;
      }
      case "codeblock": {
        const props: string[] = [
          `code="const xenon = true;"`,
          `language="typescript"`,
        ];
        if (variant !== "default") props.push(`variant="${variant}"`);
        if (lineNumbers) props.push("showLineNumbers");
        if (copyable) props.push("copyable");
        return `<CodeBlock ${props.join(" ")} />`;
      }
      case "segmented-control": {
        return `<SegmentedControl size="${size}" value="preview" options={options}${disabled ? " disabled" : ""} />`;
      }
      case "select": {
        return `<Select defaultValue="pro" size="${size}"${disabled ? " disabled" : ""}>\n  <SelectTrigger />\n  <SelectContent>...</SelectContent>\n</Select>`;
      }
      case "dialog": {
        return `<Dialog>\n  <DialogTrigger asChild>\n    <Button>Open Modal</Button>\n  </DialogTrigger>\n  <DialogContent size="${size}">...</DialogContent>\n</Dialog>`;
      }
      case "sheet": {
        return `<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outline">Open Sheet</Button>\n  </SheetTrigger>\n  <SheetContent side="${side}">...</SheetContent>\n</Sheet>`;
      }
      case "sidebar": {
        return `<Sidebar variant="${variant}">\n  <SidebarGroup label="Components">...</SidebarGroup>\n</Sidebar>`;
      }
      case "navbar": {
        return `<Navbar${borderedNav ? " bordered" : ""}>\n  <Text>Xenon System</Text>\n</Navbar>`;
      }
      default: {
        return `<${entry.name}>\n  Interactive Action\n</${entry.name}>`;
      }
    }
  }, [
    entry.id,
    entry.name,
    variant,
    tone,
    size,
    disabled,
    loading,
    fullWidth,
    checked,
    indeterminate,
    clearable,
    invalid,
    dot,
    dismissible,
    sliderVal,
    shape,
    avatarStatus,
    rows,
    padding,
    side,
    styleKey,
    weight,
    lineNumbers,
    copyable,
    borderedNav,
  ]);

  const installCommand = useMemo(() => {
    switch (cliPm) {
      case "npm":
        return `npm install @xenon-kit/web @phosphor-icons/react`;
      case "yarn":
        return `yarn add @xenon-kit/web @phosphor-icons/react`;
      case "bun":
        return `bun add @xenon-kit/web @phosphor-icons/react`;
      case "cli":
        return entry.cliInstall;
      case "pnpm":
      default:
        return entry.npmInstall;
    }
  }, [cliPm, entry.cliInstall, entry.npmInstall]);

  const labelStyle: CSSProperties = {
    fontSize: "11px",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "var(--x-text-muted)",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  return (
    <Stack gap={32} style={{ width: "100%", maxWidth: "980px" }}>
      {/* 1. Header & Metadata */}
      <Stack gap={8}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/docs/components`}>
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

        <Text
          styleKey="body"
          tone="muted"
          weight={300}
          style={{ fontSize: "16px", lineHeight: "1.6" }}
        >
          {entry.description}
        </Text>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginTop: "4px",
            flexWrap: "wrap",
          }}
        >
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
          Install using your package manager or scaffold directly via the Xenon
          CLI.
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

      {/* 3. Interactive Playground (Preview & Component-Specific Controls) */}
      <Stack gap={12}>
        <div>
          <Heading level={3} weight={300}>
            Interactive Playground
          </Heading>
          <Text styleKey="caption1" tone="muted">
            Configure {entry.name} properties live with Apple-grade fluid
            transitions and concentric geometry.
          </Text>
        </div>

        <Surface
          variant="subtle"
          padding={0}
          style={{
            overflow: "hidden",
            borderRadius: "var(--x-radius-surface, 16px)",
            backgroundColor: "var(--x-surface-2)",
            border: "1px solid var(--x-border)",
          }}
        >
          {/* Playground Top Controls Toolbar - Component-Specific */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--x-border)",
              backgroundColor: "var(--x-surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Primary Segmented Pickers */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                rowGap: "12px",
                flexWrap: "wrap",
              }}
            >
              {/* Button Variant Picker */}
              {entry.id === "button" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "filled", label: "Filled" },
                      { value: "accent", label: "Accent" },
                      { value: "subtle", label: "Subtle" },
                      { value: "outline", label: "Outline" },
                      { value: "ghost", label: "Ghost" },
                      { value: "glass", label: "Glass" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* IconButton Variant Picker */}
              {entry.id === "icon-button" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "subtle", label: "Subtle" },
                      { value: "accent", label: "Accent" },
                      { value: "filled", label: "Filled" },
                      { value: "outline", label: "Outline" },
                      { value: "ghost", label: "Ghost" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* ButtonGroup Variant Picker */}
              {entry.id === "button-group" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "outline", label: "Outline" },
                      { value: "subtle", label: "Subtle" },
                      { value: "filled", label: "Filled" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* Badge Tone & Variant Pickers */}
              {entry.id === "badge" && (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Tone</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "accent", label: "Accent" },
                        { value: "neutral", label: "Neutral" },
                        { value: "success", label: "Success" },
                        { value: "warning", label: "Warning" },
                        { value: "danger", label: "Danger" },
                        { value: "info", label: "Info" },
                      ]}
                      value={tone}
                      onValueChange={setTone}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Variant</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "subtle", label: "Subtle" },
                        { value: "outline", label: "Outline" },
                        { value: "dot", label: "Dot" },
                      ]}
                      value={variant}
                      onValueChange={setVariant}
                    />
                  </div>
                </>
              )}

              {/* Alert Tone & Variant Pickers */}
              {entry.id === "alert" && (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Tone</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "info", label: "Info" },
                        { value: "success", label: "Success" },
                        { value: "warning", label: "Warning" },
                        { value: "danger", label: "Danger" },
                        { value: "neutral", label: "Neutral" },
                      ]}
                      value={tone}
                      onValueChange={setTone}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Variant</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "subtle", label: "Subtle" },
                        { value: "surface", label: "Surface" },
                        { value: "outline", label: "Outline" },
                      ]}
                      value={variant}
                      onValueChange={setVariant}
                    />
                  </div>
                </>
              )}

              {/* Tabs Variant Picker */}
              {entry.id === "tabs" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "pill", label: "Pill" },
                      { value: "underline", label: "Underline" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* Accordion Variant Picker */}
              {entry.id === "accordion" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "bordered", label: "Bordered" },
                      { value: "default", label: "Default" },
                      { value: "separated", label: "Separated" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* Surface Variant & Padding Pickers */}
              {entry.id === "surface" && (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Variant</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "subtle", label: "Subtle" },
                        { value: "default", label: "Default" },
                        { value: "glass", label: "Glass" },
                      ]}
                      value={variant}
                      onValueChange={setVariant}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Padding</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "16", label: "16px" },
                        { value: "24", label: "24px" },
                        { value: "32", label: "32px" },
                      ]}
                      value={String(padding)}
                      onValueChange={(val) => setPadding(Number(val))}
                    />
                  </div>
                </>
              )}

              {/* Table Variant Picker */}
              {entry.id === "table" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "bordered", label: "Bordered" },
                      { value: "subtle", label: "Subtle" },
                      { value: "default", label: "Default" },
                      { value: "striped", label: "Striped" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* Avatar Shape & Status Pickers */}
              {entry.id === "avatar" && (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Shape</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "circle", label: "Circle" },
                        { value: "rounded", label: "Rounded" },
                      ]}
                      value={shape}
                      onValueChange={setShape}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Status</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "online", label: "Online" },
                        { value: "busy", label: "Busy" },
                        { value: "away", label: "Away" },
                        { value: "none", label: "None" },
                      ]}
                      value={avatarStatus}
                      onValueChange={setAvatarStatus}
                    />
                  </div>
                </>
              )}

              {/* CodeBlock Variant Picker */}
              {entry.id === "codeblock" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "default", label: "Default" },
                      { value: "minimal", label: "Minimal" },
                      { value: "bordered", label: "Bordered" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* Sheet Side Picker */}
              {entry.id === "sheet" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Side</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "right", label: "Right" },
                      { value: "bottom", label: "Bottom" },
                      { value: "left", label: "Left" },
                      { value: "top", label: "Top" },
                    ]}
                    value={side}
                    onValueChange={setSide}
                  />
                </div>
              )}

              {/* Sidebar Variant Picker */}
              {entry.id === "sidebar" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Variant</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "docked", label: "Docked" },
                      { value: "floating", label: "Floating" },
                    ]}
                    value={variant}
                    onValueChange={setVariant}
                  />
                </div>
              )}

              {/* Typography Scale & Tone Pickers */}
              {entry.id === "typography" && (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Scale</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "headline", label: "Headline" },
                        { value: "body", label: "Body" },
                        { value: "callout", label: "Callout" },
                        { value: "caption1", label: "Caption" },
                      ]}
                      value={styleKey}
                      onValueChange={setStyleKey}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Tone</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "default", label: "Default" },
                        { value: "muted", label: "Muted" },
                        { value: "accent", label: "Accent" },
                        { value: "danger", label: "Danger" },
                      ]}
                      value={tone}
                      onValueChange={setTone}
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={labelStyle}>Weight</span>
                    <SegmentedControl
                      size="sm"
                      options={[
                        { value: "200", label: "200" },
                        { value: "300", label: "300" },
                        { value: "400", label: "400" },
                      ]}
                      value={String(weight)}
                      onValueChange={(val) => setWeight(Number(val))}
                    />
                  </div>
                </>
              )}

              {/* Size Scale Picker (for components that support size) */}
              {[
                "button",
                "icon-button",
                "button-group",
                "input",
                "textarea",
                "checkbox",
                "switch",
                "slider",
                "segmented-control",
                "select",
                "badge",
                "table",
                "avatar",
                "dialog",
              ].includes(entry.id) && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Size</span>
                  <SegmentedControl
                    size="sm"
                    options={
                      entry.id === "badge"
                        ? [
                            { value: "sm", label: "sm" },
                            { value: "md", label: "md" },
                          ]
                        : entry.id === "avatar"
                          ? [
                              { value: "sm", label: "sm" },
                              { value: "md", label: "md" },
                              { value: "lg", label: "lg" },
                              { value: "xl", label: "xl" },
                            ]
                          : [
                              { value: "sm", label: "sm" },
                              { value: "md", label: "md" },
                              { value: "lg", label: "lg" },
                            ]
                    }
                    value={size}
                    onValueChange={setSize}
                  />
                </div>
              )}

              {/* Textarea Rows Picker */}
              {entry.id === "textarea" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={labelStyle}>Rows</span>
                  <SegmentedControl
                    size="sm"
                    options={[
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "5", label: "5" },
                    ]}
                    value={String(rows)}
                    onValueChange={(val) => setRows(Number(val))}
                  />
                </div>
              )}
            </div>

            {/* Toggle Switches */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {/* Disabled Switch */}
              {[
                "button",
                "icon-button",
                "button-group",
                "input",
                "textarea",
                "checkbox",
                "switch",
                "slider",
                "segmented-control",
                "select",
              ].includes(entry.id) && (
                <Switch
                  label="Disabled"
                  checked={disabled}
                  onCheckedChange={setDisabled}
                  size="sm"
                />
              )}

              {/* Button Loading Switch */}
              {entry.id === "button" && (
                <Switch
                  label="Loading"
                  checked={loading}
                  onCheckedChange={setLoading}
                  size="sm"
                />
              )}

              {/* FullWidth Switch */}
              {["button", "table"].includes(entry.id) && (
                <Switch
                  label="Full Width"
                  checked={fullWidth}
                  onCheckedChange={setFullWidth}
                  size="sm"
                />
              )}

              {/* Switch & Checkbox Checked Toggle */}
              {["switch", "checkbox"].includes(entry.id) && (
                <Switch
                  label="Checked"
                  checked={checked}
                  onCheckedChange={setChecked}
                  size="sm"
                />
              )}

              {/* Checkbox Indeterminate Toggle */}
              {entry.id === "checkbox" && (
                <Switch
                  label="Indeterminate"
                  checked={indeterminate}
                  onCheckedChange={setIndeterminate}
                  size="sm"
                />
              )}

              {/* Input Clearable Toggle */}
              {entry.id === "input" && (
                <Switch
                  label="Clearable"
                  checked={clearable}
                  onCheckedChange={setClearable}
                  size="sm"
                />
              )}

              {/* Invalid Error State Toggle */}
              {["input", "textarea", "field"].includes(entry.id) && (
                <Switch
                  label="Error / Invalid"
                  checked={invalid}
                  onCheckedChange={setInvalid}
                  size="sm"
                />
              )}

              {/* Badge Dot Toggle */}
              {entry.id === "badge" && (
                <Switch
                  label="Status Dot"
                  checked={dot}
                  onCheckedChange={setDot}
                  size="sm"
                />
              )}

              {/* Alert Dismissible Toggle */}
              {entry.id === "alert" && (
                <Switch
                  label="Dismissible"
                  checked={dismissible}
                  onCheckedChange={setDismissible}
                  size="sm"
                />
              )}

              {/* CodeBlock LineNumbers Toggle */}
              {entry.id === "codeblock" && (
                <>
                  <Switch
                    label="Line Numbers"
                    checked={lineNumbers}
                    onCheckedChange={setLineNumbers}
                    size="sm"
                  />
                  <Switch
                    label="Copyable"
                    checked={copyable}
                    onCheckedChange={setCopyable}
                    size="sm"
                  />
                </>
              )}

              {/* Navbar Bordered Toggle */}
              {entry.id === "navbar" && (
                <Switch
                  label="Bordered"
                  checked={borderedNav}
                  onCheckedChange={setBorderedNav}
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
              minHeight: "200px",
              backgroundColor: "var(--x-surface-2)",
            }}
          >
            <ComponentLivePreview
              componentId={entry.id}
              variant={variant}
              tone={tone}
              size={size}
              disabled={disabled}
              loading={loading}
              fullWidth={fullWidth}
              checked={checked}
              indeterminate={indeterminate}
              clearable={clearable}
              invalid={invalid}
              dot={dot}
              dismissible={dismissible}
              sliderVal={sliderVal}
              shape={shape}
              avatarStatus={avatarStatus}
              rows={rows}
              padding={padding}
              side={side}
              styleKey={styleKey}
              weight={weight}
              label={entry.name}
              onSliderChange={setSliderVal}
              onCheckedChange={setChecked}
            />
          </div>

          {/* Dynamic Code Preview Bar */}
          <div
            style={{
              padding: "10px 16px",
              borderTop: "1px solid var(--x-border)",
              backgroundColor: "var(--x-surface)",
            }}
          >
            <Text
              styleKey="caption1"
              tone="muted"
              style={{ fontFamily: "var(--x-font-family-mono)" }}
            >
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
          Pre-built copy-paste patterns for Web and React Native.
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
              <TableHead style={{ width: "240px" }}>Type</TableHead>
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
                    <Badge
                      tone="accent"
                      size="sm"
                      style={{ marginLeft: "6px" }}
                    >
                      req
                    </Badge>
                  )}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "var(--x-font-family-mono)",
                    fontSize: "12px",
                    color: "var(--x-text-muted)",
                  }}
                >
                  {p.type}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "var(--x-font-family-mono)",
                    fontSize: "12px",
                  }}
                >
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
