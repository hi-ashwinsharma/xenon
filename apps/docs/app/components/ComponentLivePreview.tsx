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
  SidebarDivider,
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
import type {
  AccordionVariant,
  AlertTone,
  AlertVariant,
  AvatarShape,
  AvatarSize,
  AvatarStatus,
  BadgeSize,
  BadgeTone,
  BadgeVariant,
  ButtonSize,
  ButtonVariant,
  CheckboxSize,
  CodeBlockVariant,
  InputSize,
  SegmentedControlSize,
  SelectSize,
  SheetSide,
  SliderSize,
  SurfaceVariant,
  SwitchSize,
  TableSize,
  TableVariant,
  TabsVariant,
  TextTone,
} from "@xenon/core";
import type { FontWeight, TextStyleKey } from "@xenon/tokens";
import { SlidersIcon } from "./Icons";

export interface LivePreviewProps {
  componentId: string;
  variant?: string;
  tone?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  clearable?: boolean;
  invalid?: boolean;
  dot?: boolean;
  dismissible?: boolean;
  sliderVal?: number;
  shape?: string;
  avatarStatus?: string;
  rows?: number;
  padding?: number;
  side?: string;
  styleKey?: string;
  weight?: number;
  label?: string;
  onSliderChange?: (val: number) => void;
  onCheckedChange?: (val: boolean) => void;
}

export function ComponentLivePreview({
  componentId,
  variant = "filled",
  tone = "default",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  checked = true,
  indeterminate = false,
  clearable = false,
  invalid = false,
  dot = false,
  dismissible = true,
  sliderVal = 42,
  shape = "circle",
  avatarStatus = "none",
  rows = 4,
  padding = 4,
  side = "right",
  styleKey = "body",
  weight = 400,
  label = "Xenon Component",
  onSliderChange,
  onCheckedChange,
}: LivePreviewProps): ReactElement {
  // Local state for select dropdown inside preview
  const [selectVal, setSelectVal] = useState<string>("pro");
  const [segmentedVal, setSegmentedVal] = useState<string>("preview");

  switch (componentId) {
    case "button":
      return (
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            width: fullWidth ? "100%" : "auto",
            maxWidth: "600px",
          }}
        >
          <Button
            variant={variant as ButtonVariant}
            size={size as ButtonSize}
            disabled={disabled}
            loading={loading}
            fullWidth={fullWidth}
          >
            {label || "Confirm Action"}
          </Button>
          {!fullWidth && (
            <>
              <Button variant="accent" size={size as ButtonSize} disabled={disabled}>
                Accent
              </Button>
              <Button variant="outline" size={size as ButtonSize} disabled={disabled}>
                Outline
              </Button>
            </>
          )}
        </div>
      );

    case "icon-button":
      return (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <IconButton
            ariaLabel="Custom Controls"
            variant={variant as ButtonVariant}
            size={size as ButtonSize}
            disabled={disabled}
            loading={loading}
          >
            <SlidersIcon size={size === "lg" ? "md" : "sm"} />
          </IconButton>
          <IconButton ariaLabel="Action Accent" variant="accent" size={size as ButtonSize} disabled={disabled}>
            <SlidersIcon size={size === "lg" ? "md" : "sm"} />
          </IconButton>
          <IconButton ariaLabel="Action Ghost" variant="ghost" size={size as ButtonSize} disabled={disabled}>
            <SlidersIcon size={size === "lg" ? "md" : "sm"} />
          </IconButton>
        </div>
      );

    case "button-group":
      return (
        <ButtonGroup variant={variant as ButtonVariant} size={size as ButtonSize} disabled={disabled}>
          <Button>Cut</Button>
          <Button>Copy</Button>
          <Button>Paste</Button>
        </ButtonGroup>
      );

    case "surface":
      return (
        <Surface
          variant={variant as SurfaceVariant}
          padding={padding}
          style={{ width: "100%", maxWidth: "420px", border: "1px solid var(--x-border)" }}
        >
          <Stack gap={12}>
            <Heading level={4} weight={400}>Concentric Surface Level</Heading>
            <Text styleKey="body" tone="muted">
              Inner radius calculates as R_parent - padding = {Math.max(0, 16 - padding)}px.
            </Text>
            <div>
              <Button size="sm" variant="accent">Accent Action</Button>
            </div>
          </Stack>
        </Surface>
      );

    case "typography":
      return (
        <Stack gap={16} style={{ width: "100%", maxWidth: "480px" }}>
          <Heading level={2} weight={weight as FontWeight} tone={tone as TextTone}>
            Geist Minimalist Heading
          </Heading>
          <Text styleKey={styleKey as TextStyleKey} tone={tone as TextTone} weight={weight as FontWeight}>
            Body copy uses strict weights 200, 300, and 400. Font weights of 500 and higher are strictly banned in Xenon.
          </Text>
          <Text styleKey="caption1" tone="muted">
            Caption metadata rendered with tabular figures.
          </Text>
        </Stack>
      );

    case "input":
      return (
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <Input
            placeholder={label || "Type here..."}
            size={size as InputSize}
            disabled={disabled}
            clearable={clearable}
            invalid={invalid}
          />
        </div>
      );

    case "field":
      return (
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <Field
            label="Workspace Identifier"
            helpText="Must be globally unique"
            error={invalid ? "Workspace identifier is already taken" : undefined}
            optional={disabled}
          >
            <Input placeholder="my-team-workspace" size="md" disabled={disabled} />
          </Field>
        </div>
      );

    case "textarea":
      return (
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <Textarea
            placeholder="Enter component architectural notes..."
            minRows={rows}
            maxLength={180}
            invalid={invalid}
            disabled={disabled}
          />
        </div>
      );

    case "checkbox":
      return (
        <Stack gap={12}>
          <Checkbox
            label={label || "Enforce mathematical concentric radii"}
            checked={checked}
            indeterminate={indeterminate}
            onCheckedChange={onCheckedChange}
            size={size as CheckboxSize}
            disabled={disabled}
          />
          <Checkbox
            label="Secondary supporting selection state"
            checked={!checked}
            size={size as CheckboxSize}
            disabled={disabled}
          />
        </Stack>
      );

    case "switch":
      return (
        <Switch
          label={label || "Liquid Glass Floating Layers"}
          checked={checked}
          onCheckedChange={onCheckedChange}
          size={size as SwitchSize}
          disabled={disabled}
        />
      );

    case "slider":
      return (
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <Stack gap={8}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>
              <span>Value</span>
              <span style={{ color: "var(--x-accent)" }}>{sliderVal}</span>
            </div>
            <Slider
              min={0}
              max={6}
              step={1}
              value={sliderVal}
              onValueChange={onSliderChange}
              size={size as SliderSize}
              disabled={disabled}
            />
          </Stack>
        </div>
      );

    case "segmented-control":
      return (
        <SegmentedControl
          size={size as SegmentedControlSize}
          disabled={disabled}
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
              <Button size="sm" variant="accent">Connect</Button>
            </div>
          </Navbar>
        </div>
      );

    case "sidebar":
      return (
        <div style={{ width: "240px" }}>
          <Sidebar variant={variant as "docked" | "floating"} bordered style={{ height: "auto" }}>
            <SidebarGroup label="Documentation">
              <SidebarItem active>Overview</SidebarItem>
              <SidebarItem>Guidelines</SidebarItem>
              <SidebarItem>Components</SidebarItem>
            </SidebarGroup>
            <SidebarDivider />
          </Sidebar>
        </div>
      );

    case "tabs":
      return (
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <Tabs defaultValue="overview" variant={variant as TabsVariant}>
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
            <Button variant="filled">Open Dialog Modal</Button>
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
                <Button size="sm" variant="accent">Acknowledge</Button>
              </div>
            </Stack>
          </DialogContent>
        </Dialog>
      );

    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Slide Drawer ({side})</Button>
          </SheetTrigger>
          <SheetContent side={side as SheetSide}>
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
          <Select value={selectVal} onValueChange={setSelectVal} size={size as SelectSize} disabled={disabled}>
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
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <Badge
            tone={tone as BadgeTone}
            variant={variant as BadgeVariant}
            size={size as BadgeSize}
            dot={dot}
          >
            {tone.toUpperCase()} {variant.toUpperCase()}
          </Badge>
          <Badge tone="accent" variant={variant as BadgeVariant} size={size as BadgeSize} dot={dot}>
            Accent Tag
          </Badge>
          <Badge tone="neutral" variant="outline" size={size as BadgeSize}>
            v1.0.0
          </Badge>
        </div>
      );

    case "alert":
      return (
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <Alert
            tone={tone as AlertTone}
            variant={variant as AlertVariant}
            title={`${tone.charAt(0).toUpperCase() + tone.slice(1)} Notification`}
            dismissible={dismissible}
          >
            All dividers and borders must strictly measure 1px across desktop and mobile.
          </Alert>
        </div>
      );

    case "table":
      return (
        <div style={{ width: "100%", maxWidth: fullWidth ? "100%" : "480px" }}>
          <Table variant={variant as TableVariant} size={size as TableSize} fullWidth={fullWidth}>
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
                <TableCell>240ms</TableCell>
                <TableCell>Motion Spec</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );

    case "accordion":
      return (
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <Accordion type="single" variant={variant as AccordionVariant}>
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
          <Avatar
            name="Dieter Rams"
            size={size as AvatarSize}
            shape={shape as AvatarShape}
            status={avatarStatus !== "none" ? (avatarStatus as AvatarStatus) : undefined}
          />
          <AvatarGroup max={3} size={size as AvatarSize}>
            <Avatar name="Jony Ive" shape={shape as AvatarShape} />
            <Avatar name="Kenya Hara" shape={shape as AvatarShape} />
            <Avatar name="Massimo Vignelli" shape={shape as AvatarShape} />
          </AvatarGroup>
        </div>
      );

    case "codeblock":
      return (
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <CodeBlock
            code={`// Xenon design system configuration\nexport const TOKENS = {\n  border: "1px hairline",\n  accent: "var(--x-accent)",\n  motion: "apple-spring",\n};`}
            language="typescript"
            filename="xenon.config.ts"
            variant={variant as CodeBlockVariant}
            showLineNumbers
            copyable
          />
        </div>
      );

    default:
      return (
        <Button variant={variant as ButtonVariant} size={size as ButtonSize} disabled={disabled}>
          {label || "Interactive Component"}
        </Button>
      );
  }
}
