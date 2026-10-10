"use client";

import React, { useState, type ReactElement } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  CodeBlock,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  Heading,
  IconButton,
  Input,
  Navbar,
  SegmentedControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  Slider,
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
  Textarea,
} from "@xenon/web";
import type { ButtonVariant } from "@xenon/core";
import { SlidersIcon } from "./Icons";

interface LivePreviewProps {
  componentId: string;
  variant: string;
  size: string;
  disabled: boolean;
  loading: boolean;
  label: string;
}

export function ComponentLivePreview({
  componentId,
  variant,
  size,
  disabled,
  loading,
  label,
}: LivePreviewProps): ReactElement {
  // Local states for interactive items
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true);
  const [sliderVal, setSliderVal] = useState<number>(4);
  const [segmentedVal, setSegmentedVal] = useState<string>("preview");
  const [selectVal, setSelectVal] = useState<string>("pro");

  switch (componentId) {
    case "button":
      return (
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <Button
            variant={variant as ButtonVariant}
            size={size as any}
            disabled={disabled}
            loading={loading}
          >
            {label || "Confirm Action"}
          </Button>
          <Button variant="outline" size={size as any} disabled={disabled}>
            Outline
          </Button>
          <Button variant="subtle" size={size as any} disabled={disabled}>
            Subtle
          </Button>
        </div>
      );

    case "icon-button":
      return (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <IconButton
            ariaLabel="Custom Controls"
            variant={variant as ButtonVariant}
            size={size as any}
            disabled={disabled}
          >
            <SlidersIcon size={size === "lg" ? "md" : "sm"} />
          </IconButton>
          <IconButton ariaLabel="Action Subtle" variant="subtle" size={size as any}>
            <SlidersIcon size={size === "lg" ? "md" : "sm"} />
          </IconButton>
          <IconButton ariaLabel="Action Ghost" variant="ghost" size={size as any}>
            <SlidersIcon size={size === "lg" ? "md" : "sm"} />
          </IconButton>
        </div>
      );

    case "button-group":
      return (
        <ButtonGroup>
          <Button variant="outline" size={size as any}>Cut</Button>
          <Button variant="outline" size={size as any}>Copy</Button>
          <Button variant="outline" size={size as any}>Paste</Button>
        </ButtonGroup>
      );

    case "surface":
      return (
        <Surface
          variant="subtle"
          padding={20}
          style={{ width: "100%", maxWidth: "420px", border: "1px solid var(--x-border)" }}
        >
          <Stack gap={12}>
            <Heading level={4} weight={400}>Concentric Surface Level</Heading>
            <Text styleKey="body" tone="muted">
              Inner radius calculates as R_parent - padding = 16px.
            </Text>
            <div>
              <Button size="sm" variant="subtle">Inner Action</Button>
            </div>
          </Stack>
        </Surface>
      );

    case "typography":
      return (
        <Stack gap={16} style={{ width: "100%", maxWidth: "480px" }}>
          <Heading level={2} weight={200}>Minimalist Geist Display</Heading>
          <Heading level={4} weight={300}>Subheading with Hairline Weight</Heading>
          <Text styleKey="body" tone="default" weight={300}>
            Body copy uses strict weights 200, 300, and 400. Font weights of 500 and higher are strictly banned in Xenon.
          </Text>
          <Text styleKey="caption1" tone="muted">
            Caption metadata rendered in Geist Mono with tabular figures.
          </Text>
        </Stack>
      );

    case "input":
      return (
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <Input
            placeholder={label || "Type here..."}
            size={size as any}
            disabled={disabled}
            clearable
          />
        </div>
      );

    case "field":
      return (
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <Field
            label="Workspace Identifier"
            helpText="Must be globally unique"
            error={disabled ? "Domain validation is temporarily suspended" : undefined}
          >
            <Input placeholder="my-team-workspace" size="md" />
          </Field>
        </div>
      );

    case "textarea":
      return (
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <Textarea
            placeholder="Enter component architectural notes..."
            rows={3}
            maxLength={180}
            disabled={disabled}
          />
        </div>
      );

    case "checkbox":
      return (
        <Stack gap={12}>
          <Checkbox
            label={label || "Enforce mathematical concentric radii"}
            checked={checkboxChecked}
            onCheckedChange={(checked: boolean) => setCheckboxChecked(checked)}
            disabled={disabled}
          />
          <Checkbox
            label="Indeterminate selection state"
            indeterminate
          />
        </Stack>
      );

    case "switch":
      return (
        <Switch
          label={label || "Liquid Glass Floating Layers"}
          checked={switchChecked}
          onCheckedChange={setSwitchChecked}
          size={size === "lg" ? "md" : "sm"}
          disabled={disabled}
        />
      );

    case "slider":
      return (
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <Stack gap={8}>
            <Text styleKey="caption1" tone="muted">Radius Stop: {sliderVal}</Text>
            <Slider
              min={0}
              max={6}
              step={1}
              value={sliderVal}
              onValueChange={setSliderVal}
              disabled={disabled}
            />
          </Stack>
        </div>
      );

    case "segmented-control":
      return (
        <SegmentedControl
          options={[
            { value: "preview", label: "Preview" },
            { value: "code", label: "Code" },
            { value: "props", label: "Props API" },
          ]}
          value={segmentedVal}
          onValueChange={setSegmentedVal}
        />
      );

    case "navbar":
      return (
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <Navbar bordered style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Text weight={400}>Xenon System</Text>
              <Button size="sm" variant="subtle">Connect</Button>
            </div>
          </Navbar>
        </div>
      );

    case "sidebar":
      return (
        <div style={{ width: "240px" }}>
          <Sidebar bordered style={{ height: "auto" }}>
            <SidebarGroup label="Documentation">
              <SidebarItem active>Overview</SidebarItem>
              <SidebarItem>Guidelines</SidebarItem>
              <SidebarItem>Components</SidebarItem>
            </SidebarGroup>
          </Sidebar>
        </div>
      );

    case "tabs":
      return (
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Text styleKey="body" tone="muted">Zero gradients. Zero drop-shadows.</Text>
            </TabsContent>
            <TabsContent value="architecture">
              <Text styleKey="body" tone="muted">Multi-package monorepo with web and native renderers.</Text>
            </TabsContent>
            <TabsContent value="tokens">
              <Text styleKey="body" tone="muted">Discrete 7-stop radius scale with hairline borders.</Text>
            </TabsContent>
          </Tabs>
        </div>
      );

    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={variant as ButtonVariant}>Open Dialog Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Component Dialog</DialogTitle>
            </DialogHeader>
            <Stack gap={12}>
              <Text styleKey="body">
                Centered overlay with backdrop blur scrim and Apple-grade fluid spring dismissal.
              </Text>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px" }}>
                <Button size="sm" variant="filled">Acknowledge</Button>
              </div>
            </Stack>
          </DialogContent>
        </Dialog>
      );

    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Slide Drawer</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Drawer Specification</SheetTitle>
            </SheetHeader>
            <Text styleKey="body" tone="muted">
              Slide-over drawer on desktop web; gesture-driven drag sheet on Expo React Native.
            </Text>
          </SheetContent>
        </Sheet>
      );

    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent width={200}>
            <DropdownMenuGroup label="Quick Actions">
              <DropdownMenuItem shortcut="⌘S">Save Spec</DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘E">Export Tokens</DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘D">Duplicate</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );

    case "select":
      return (
        <div style={{ width: "240px" }}>
          <Select value={selectVal} onValueChange={setSelectVal}>
            <SelectTrigger />
            <SelectContent>
              <SelectItem value="starter">Starter Architecture</SelectItem>
              <SelectItem value="pro">Pro Architect</SelectItem>
              <SelectItem value="enterprise">Enterprise Tier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );

    case "command-palette":
      return (
        <Button variant="outline" size="md">
          Press ⌘K to open Command Palette
        </Button>
      );

    case "badge":
      return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <Badge tone="accent" dot>Accent Status</Badge>
          <Badge tone="neutral">Neutral Tag</Badge>
          <Badge tone="success">Passed Audit</Badge>
          <Badge tone="warning">Warning</Badge>
        </div>
      );

    case "alert":
      return (
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <Alert tone="info" title="Hairline Invariant">
            All dividers and borders must strictly measure 1px across desktop and mobile.
          </Alert>
        </div>
      );

    case "table":
      return (
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <Table variant="bordered">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Origin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>--x-border</TableCell>
                <TableCell>1px</TableCell>
                <TableCell>Apple HIG</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>--x-dur-base</TableCell>
                <TableCell>200ms</TableCell>
                <TableCell>Motion Spec</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );

    case "accordion":
      return (
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <Accordion type="single" variant="bordered">
            <AccordionItem value="item-1">
              <AccordionTrigger>Why are shadows banned?</AccordionTrigger>
              <AccordionContent>
                Depth in Xenon comes purely from 1px hairline edges and stepped surface tones, avoiding faux skeuomorphic blurring.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is Liquid Glass?</AccordionTrigger>
              <AccordionContent>
                Liquid Glass is reserved exclusively for floating and overlay layers (Navbar, Popover, Dialog, Sheet), preserving background spatial orientation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );

    case "avatar":
      return (
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Avatar fallback="AS" size="lg" />
          <AvatarGroup max={3}>
            <Avatar fallback="XC" />
            <Avatar fallback="HG" />
            <Avatar fallback="DK" />
          </AvatarGroup>
        </div>
      );

    case "codeblock":
      return (
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <CodeBlock
            code={`// Xenon token definition\nexport const TOKENS = {\n  border: "1px hairline",\n  motion: "apple-spring",\n};`}
            language="typescript"
            filename="xenon.config.ts"
            showLineNumbers
          />
        </div>
      );

    default:
      return (
        <Button variant={variant as ButtonVariant} size={size as any} disabled={disabled}>
          {label || "Interactive Component"}
        </Button>
      );
  }
}
