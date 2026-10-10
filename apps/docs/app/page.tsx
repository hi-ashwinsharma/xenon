"use client";

import { useState } from "react";
import { RADIUS_STOPS, type Accent, type RadiusStop, type ResolvedTheme } from "@xenon/tokens";
import { computeNestedRadius } from "@xenon/core";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Checkbox,
  Combobox,
  CommandPalette,
  type CommandPaletteItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  GlassBar,
  Group,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Link,
  Navbar,
  Pagination,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  SegmentedControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarDivider,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  Slider,
  Stack,
  Surface,
  Switch,
  TabBar,
  TabBarItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  ToggleButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  XenonProvider,
} from "@xenon/web";

type ShowcaseDomain = "all" | "actions" | "forms" | "navigation" | "overlays" | "surfaces";

function ShowcaseContent() {
  const [theme, setTheme] = useState<ResolvedTheme>("dark");
  const [accent, setAccent] = useState<Accent>("lime");
  const [radius, setRadius] = useState<RadiusStop>(4);
  const [activeDomain, setActiveDomain] = useState<ShowcaseDomain>("all");

  // Live state for interactive components
  const [toggleActive, setToggleActive] = useState<boolean>(true);
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(64);
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [checkboxAccepted, setCheckboxAccepted] = useState<boolean>(true);
  const [checkboxIndeterminate, setCheckboxIndeterminate] = useState<boolean>(true);
  const [segmentView, setSegmentView] = useState<string>("preview");
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Navigation interactive state
  const [sidebarVariant, setSidebarVariant] = useState<"floating" | "docked">("floating");
  const [sidebarBordered, setSidebarBordered] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [sidebarSolid, setSidebarSolid] = useState<boolean>(true);
  const [activeNavTab, setActiveNavTab] = useState<string>("components");
  const [tabsVariant, setTabsVariant] = useState<"pill" | "underline">("pill");
  const [tabBarVariant, setTabBarVariant] = useState<"floating" | "docked">("floating");
  const [activePage, setActivePage] = useState<number>(3);
  const [paginationCompact, setPaginationCompact] = useState<boolean>(false);

  // Overlay batch 2 interactive state
  const [selectedSelectVal, setSelectedSelectVal] = useState<string>("hig");
  const [selectedComboboxVal, setSelectedComboboxVal] = useState<string>("next");
  const [commandOpen, setCommandOpen] = useState<boolean>(false);

  const paletteCommands: CommandPaletteItem[] = [
    {
      id: "toggle-theme",
      label: "Toggle Theme (Dark / Light)",
      group: "Preferences",
      shortcut: "⌘T",
      onSelect: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    },
    {
      id: "accent-lime",
      label: "Set Accent to Lime",
      group: "Accents",
      onSelect: () => setAccent("lime"),
    },
    {
      id: "accent-pink",
      label: "Set Accent to Pink",
      group: "Accents",
      onSelect: () => setAccent("pink"),
    },
    {
      id: "accent-blue",
      label: "Set Accent to Blue",
      group: "Accents",
      onSelect: () => setAccent("blue"),
    },
    {
      id: "radius-pill",
      label: "Switch Radius Stop to 6 (Pill)",
      group: "Geometry",
      shortcut: "⌘6",
      onSelect: () => setRadius(6),
    },
    {
      id: "radius-arch",
      label: "Switch Radius Stop to 2 (Architectural)",
      group: "Geometry",
      shortcut: "⌘2",
      onSelect: () => setRadius(2),
    },
    {
      id: "filter-all",
      label: "Show All Component Modules",
      group: "Navigation",
      onSelect: () => setActiveDomain("all"),
    },
    {
      id: "filter-overlays",
      label: "Focus on Overlays & Anchors",
      group: "Navigation",
      onSelect: () => setActiveDomain("overlays"),
    },
  ];

  const accents: Accent[] = ["lime", "pink", "blue", "purple", "green"];
  const radiusStops: RadiusStop[] = [0, 1, 2, 3, 4, 5, 6];

  const showActions = activeDomain === "all" || activeDomain === "actions";
  const showForms = activeDomain === "all" || activeDomain === "forms";
  const showNav = activeDomain === "all" || activeDomain === "navigation";
  const showOverlays = activeDomain === "all" || activeDomain === "overlays";
  const showSurfaces = activeDomain === "all" || activeDomain === "surfaces";

  return (
    <XenonProvider accent={accent} radius={radius} theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--x-bg)",
          color: "var(--x-text)",
          padding: "72px 32px 140px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Stack
          gap={88}
          style={{
            width: "100%",
            maxWidth: "1040px",
          }}
        >
          {/* Header & Global Environment Controls */}
          <header
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              borderBottom: "1px solid var(--x-border)",
              paddingBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--x-accent)",
                    fontFamily: "var(--x-font-family-mono, monospace)",
                  }}
                >
                  Xenon Design System · v1.0 Core
                </span>
                <Heading level={1} weight={300}>
                  Component Showcase
                </Heading>
                <Text
                  style={{
                    lineHeight: 1.6,
                    maxWidth: "560px",
                  }}
                  tone="muted"
                >
                  Minimalistic, hairline-crisp primitives engineered for Web & Native
                  from a single mathematical token foundation.
                </Text>
              </div>

              {/* Theme toggle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                <Text style={{ fontSize: "12px" }} tone="muted" weight={400}>
                  Theme
                </Text>
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => setTheme("dark")}
                    variant={theme === "dark" ? "filled" : "ghost"}
                  >
                    Dark
                  </Button>
                  <Button
                    onClick={() => setTheme("light")}
                    variant={theme === "light" ? "filled" : "ghost"}
                  >
                    Light
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            {/* Accent, Radius & Domain Filter Bar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "20px",
                backgroundColor: "var(--x-surface)",
                borderRadius: "var(--x-radius-control)",
                border: "1px solid var(--x-border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <Group align="center" gap={12}>
                  <Text style={{ fontSize: "13px" }} tone="muted" weight={400}>
                    Accent Tone:
                  </Text>
                  {accents.map((acc) => (
                    <Button
                      key={acc}
                      onClick={() => setAccent(acc)}
                      size="sm"
                      variant={accent === acc ? "accent" : "ghost"}
                    >
                      {acc.charAt(0).toUpperCase() + acc.slice(1)}
                    </Button>
                  ))}
                </Group>

                <Group align="center" gap={8}>
                  <Text style={{ fontSize: "13px" }} tone="muted" weight={400}>
                    Corner Stop:
                  </Text>
                  {radiusStops.map((stop) => (
                    <Button
                      key={stop}
                      onClick={() => setRadius(stop)}
                      size="sm"
                      variant={radius === stop ? "filled" : "ghost"}
                    >
                      {stop === 6 ? "6 (Pill)" : String(stop)}
                    </Button>
                  ))}
                </Group>
              </div>

              <Divider />

              {/* Domain Switcher */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <Text style={{ fontSize: "13px" }} tone="muted" weight={400}>
                  Filter Modules:
                </Text>
                <SegmentedControl
                  onValueChange={(val) => setActiveDomain(val as ShowcaseDomain)}
                  options={[
                    { value: "all", label: "All Modules" },
                    { value: "actions", label: "Actions & Buttons" },
                    { value: "forms", label: "Forms & Controls" },
                    { value: "navigation", label: "Navigation Chrome" },
                    { value: "overlays", label: "Overlays & Anchors" },
                    { value: "surfaces", label: "Surfaces & Math" },
                  ]}
                  value={activeDomain}
                />
              </div>
            </div>
          </header>

          {/* Section 1: Signature Action Controls (Phase 2B) */}
          {showActions && (
            <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--x-accent)",
                    fontFamily: "var(--x-font-family-mono, monospace)",
                  }}
                >
                  Phase 2B · Action Primitives
                </span>
                <Heading level={2} weight={400}>
                  Signature Buttons & Micro-Interactions
                </Heading>
                <Text style={{ lineHeight: 1.6, maxWidth: "720px" }} tone="muted">
                  Tactile pill geometry with Apple-calibrated font weight 400.
                  Filled buttons render as solid high-contrast primary pills, sharply
                  distinguished from transparent hairline outline buttons.
                </Text>
              </div>

              {/* Part A: On Canvas Background */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text tone="default" weight={400}>
                    1. Rendered on Canvas Background (var(--x-bg))
                  </Text>
                  <Text style={{ fontSize: "12px" }} tone="muted">
                    Notice the contrast between solid Filled and wireframe Outline
                  </Text>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    padding: "24px",
                    border: "1px dashed var(--x-border)",
                    borderRadius: "var(--x-radius-control)",
                  }}
                >
                  <Button variant="filled">Filled (Solid Primary)</Button>
                  <Button variant="outline">Outline (Hairline)</Button>
                  <Button variant="subtle">Subtle Tone</Button>
                  <Button variant="accent">Accent Electric</Button>
                  <Button variant="glass">Liquid Glass</Button>
                  <Button variant="ghost">Ghost Plain</Button>
                  <IconButton ariaLabel="Settings" size="md" variant="subtle">
                    <Icon size="sm">
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </Icon>
                  </IconButton>
                </div>
              </div>

              {/* Part B: On Raised Surface Card */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text tone="default" weight={400}>
                    2. Rendered Inside Raised Surface Card (var(--x-surface))
                  </Text>
                  <Text style={{ fontSize: "12px" }} tone="muted">
                    Filled maintains solid authority over surface cards without blending in
                  </Text>
                </div>

                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <Group align="center" gap={12} wrap="wrap">
                    <Button variant="filled">Filled (Solid Primary)</Button>
                    <Button variant="outline">Outline (Hairline)</Button>
                    <Button variant="subtle">Subtle Tone</Button>
                    <Button variant="accent">Accent Electric</Button>
                    <Button variant="glass">Liquid Glass</Button>
                    <Button variant="ghost">Ghost Plain</Button>
                  </Group>

                  <Divider />

                  {/* Part C: Sizes, Toolbars & ToggleButton */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "24px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <Text tone="muted" weight={400}>
                        Size Scale & States
                      </Text>
                      <Group align="center" gap={8} wrap="wrap">
                        <Button size="sm" variant="filled">Small (32px)</Button>
                        <Button size="md" variant="filled">Medium (40px)</Button>
                        <Button size="lg" variant="filled">Large (48px)</Button>
                        <Button loading size="sm" variant="outline">Loading</Button>
                        <Button disabled size="sm" variant="outline">Disabled</Button>
                      </Group>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <Text tone="muted" weight={400}>
                        Connected ButtonGroup & Toggle
                      </Text>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                        <ButtonGroup size="md">
                          <Button variant="filled">Design</Button>
                          <Button variant="filled">Inspect</Button>
                          <Button variant="filled">Tokens</Button>
                        </ButtonGroup>

                        <ToggleButton
                          onPressedChange={setToggleActive}
                          pressed={toggleActive}
                        >
                          Pin Inspector
                        </ToggleButton>
                      </div>
                    </div>
                  </div>
                </Surface>
              </div>
            </section>
          )}

          {/* Section 2: Forms, Inputs & Selection Controls (Phase 2C & 3A) */}
          {showForms && (
            <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--x-accent)",
                    fontFamily: "var(--x-font-family-mono, monospace)",
                  }}
                >
                  Phase 2C & 3A · Forms & Selection
                </span>
                <Heading level={2} weight={400}>
                  Architectural Inputs & Kinematic Controls
                </Heading>
                <Text style={{ lineHeight: 1.6, maxWidth: "720px" }} tone="muted">
                  Standard form fields maintain restrained architectural corners
                  (Stop 1–2 / 6–8px) with optical horizontal padding. Full pills are reserved
                  strictly for dedicated search bars and action chips.
                </Text>
              </div>

              {/* Subsection A: Inputs & Field Grouping */}
              <Surface
                padding={28}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                  backgroundColor: "var(--x-surface)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <Heading level={3} weight={400}>
                    Architectural Data Fields & InputGroup
                  </Heading>
                  <Checkbox
                    checked={fieldError}
                    label="Toggle simulated validation state"
                    onCheckedChange={setFieldError}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {/* 1. Architectural Data Input */}
                  <Field
                    error={fieldError ? "Please enter a valid organization identifier" : undefined}
                    helpText="Restrained 8px architectural geometry on recessed surface-2"
                    label="Organization Domain"
                  >
                    <Input
                      clearable
                      defaultValue="hotcrunch.labs"
                      invalid={fieldError}
                      placeholder="e.g. acme.io"
                    />
                  </Field>

                  {/* 2. Dedicated Search Pill */}
                  <Field
                    helpText="Reserved pill geometry with living prefix and ⌘K badge"
                    label="Quick Search"
                    optional
                  >
                    <Input
                      clearable
                      placeholder="Search components, APIs, tokens..."
                      prefix={
                        <Icon size="sm">
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.25"
                            viewBox="0 0 16 16"
                            width="16"
                          >
                            <circle cx="7" cy="7" r="4.5" />
                            <line x1="10.5" x2="14" y1="10.5" y2="14" />
                          </svg>
                        </Icon>
                      }
                      shortcutKey="⌘K"
                      variant="search"
                    />
                  </Field>

                  {/* 3. Flush Attached InputGroup */}
                  <Field
                    helpText="Continuous group with flush joint boundaries"
                    label="Enterprise License"
                    optional
                  >
                    <InputGroup size="md">
                      <Input
                        placeholder="xenon_core_live_..."
                        prefix={
                          <Icon size="sm">
                            <svg
                              fill="none"
                              height="16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.25"
                              viewBox="0 0 16 16"
                              width="16"
                            >
                              <circle cx="8" cy="8" r="4" />
                              <path d="M12 8h2" />
                            </svg>
                          </Icon>
                        }
                      />
                      <Button variant="accent">Verify</Button>
                    </InputGroup>
                  </Field>
                </div>

                {/* 4. Architectural Textarea */}
                <Field
                  helpText="Auto-grow expansion with live character metrics"
                  label="Architectural Specification & Decisions"
                  optional
                >
                  <Textarea
                    autoGrow
                    maxLength={280}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Document structural rationale, negative space requirements, and motion kinematics..."
                    showCount
                    value={feedbackText}
                  />
                </Field>
              </Surface>

              {/* Subsection B: Kinematic Selection Controls */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "24px",
                }}
              >
                {/* Switches */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <Heading level={3} weight={400}>
                    Tactile Switches
                  </Heading>
                  <Text tone="muted">Squash-and-stretch kinematics:</Text>
                  <Switch
                    checked={switchChecked}
                    description="Real-time blur on overlay elements"
                    label="Liquid Glass"
                    onCheckedChange={setSwitchChecked}
                    size="md"
                  />
                  <Switch
                    description="Tactile vibration on tap"
                    label="Haptic Engine (sm)"
                    size="sm"
                  />
                  <Switch
                    defaultChecked
                    description="56x32 Apple HIG dimension"
                    label="Display 120Hz (lg)"
                    size="lg"
                  />
                </Surface>

                {/* Checkboxes */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <Heading level={3} weight={400}>
                    Checkboxes
                  </Heading>
                  <Text tone="muted">Hairline indicator precision:</Text>
                  <Checkbox
                    checked={checkboxAccepted}
                    description="Required for production sync"
                    label="Accept Terms of Service"
                    onCheckedChange={setCheckboxAccepted}
                  />
                  <Checkbox
                    checked={checkboxIndeterminate}
                    description="Mixed parent selection"
                    indeterminate
                    label="Select Sub-Packages"
                    onCheckedChange={setCheckboxIndeterminate}
                  />
                  <Checkbox disabled label="Restricted Permission" />
                </Surface>

                {/* Single Choice Radios */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <Heading level={3} weight={400}>
                    Single Choice
                  </Heading>
                  <Text tone="muted">Aperture Iris Indicator:</Text>
                  <RadioGroup
                    onValueChange={setSelectedPlan}
                    value={selectedPlan}
                  >
                    <Radio
                      description="Single workspace sandbox"
                      label="Community"
                      value="community"
                    />
                    <Radio
                      description="Full multi-package monorepo"
                      label="Pro Developer"
                      value="pro"
                    />
                  </RadioGroup>

                  <Divider />

                  <Text tone="muted">Selection Tile:</Text>
                  <RadioGroup
                    onValueChange={setSelectedPlan}
                    value={selectedPlan}
                    variant="tile"
                  >
                    <Radio
                      description="Enterprise-grade scale"
                      label="Enterprise Cloud"
                      value="enterprise"
                    />
                  </RadioGroup>
                </Surface>

                {/* Continuous Slider & Segmented Control */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Slider & Segment
                    </Heading>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      {sliderValue}%
                    </span>
                  </div>

                  <Slider
                    max={100}
                    min={0}
                    onValueChange={setSliderValue}
                    step={1}
                    value={sliderValue}
                  />

                  <Divider />

                  <Text tone="muted">Segmented Sliding Capsule:</Text>
                  <SegmentedControl
                    onValueChange={setSegmentView}
                    options={[
                      { value: "preview", label: "Preview" },
                      { value: "code", label: "Code" },
                      { value: "tokens", label: "Tokens" },
                    ]}
                    value={segmentView}
                  />
                </Surface>
              </div>
            </section>
          )}

          {/* Section 3: Structural Navigation Chrome (Phase 3B) */}
          {showNav && (
            <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--x-accent)",
                    fontFamily: "var(--x-font-family-mono, monospace)",
                  }}
                >
                  Phase 3B · Navigation Chrome
                </span>
                <Heading level={2} weight={400}>
                  Structural Navigation Chrome
                </Heading>
                <Text style={{ lineHeight: 1.6, maxWidth: "720px" }} tone="muted">
                  Floating island geometry with negative space sidebars, zero outer borders,
                  soft inset vertical dividers, and real-time Liquid Glass blur.
                </Text>
              </div>

              {/* 1. Adaptive Navbar & Liquid GlassBar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Text tone="default" weight={400}>
                  1. Top Navigation: Adaptive Navbar & Liquid GlassBar
                </Text>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    border: "1px solid var(--x-border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "var(--x-surface-2)",
                    padding: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text style={{ fontSize: "12px" }} tone="muted" weight={400}>
                      Adaptive Navbar (Transparent at rest, elevates to Liquid Glass on scroll)
                    </Text>
                    <Navbar
                      actions={
                        <Group gap={8}>
                          <Button size="sm" variant="subtle">Docs</Button>
                          <Button size="sm" variant="filled">Sign in</Button>
                        </Group>
                      }
                      bordered
                      brand={
                        <Group align="center" gap={8}>
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "4px",
                              backgroundColor: "var(--x-accent)",
                            }}
                          />
                          <Text weight={400}>Xenon UI</Text>
                        </Group>
                      }
                      nav={
                        <Group gap={16}>
                          <Link href="#components">Components</Link>
                          <Link href="#foundations">Tokens</Link>
                          <Link href="#guidelines">HIG Spec</Link>
                        </Group>
                      }
                      sticky={false}
                      style={{ position: "relative", borderRadius: "8px" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text style={{ fontSize: "12px" }} tone="muted" weight={400}>
                      Continuous GlassBar (Permanent Liquid Glass with regular blur)
                    </Text>
                    <GlassBar
                      actions={
                        <Button size="sm" variant="glass">⌘K Search</Button>
                      }
                      bordered
                      brand={
                        <Text tone="accent" weight={400}>Floating Glass Console</Text>
                      }
                      glassType="regular"
                      nav={
                        <Group gap={16}>
                          <Text tone="default">v0.1.0-alpha</Text>
                          <Text tone="muted">Apple HIG Engine</Text>
                        </Group>
                      }
                      sticky={false}
                      style={{ position: "relative", borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Floating Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <Text tone="default" weight={400}>
                      2. Floating Sidebar Island (No Outer Border, Soft Inset Dividers)
                    </Text>
                    <Text style={{ fontSize: "12px" }} tone="muted">
                      Floats detached in the canvas. Outer border is off by default per architectural spec.
                    </Text>
                  </div>
                  <Group gap={8} wrap="wrap">
                    <Button
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      size="sm"
                      variant={sidebarCollapsed ? "filled" : "outline"}
                    >
                      {sidebarCollapsed ? "Expand (240px)" : "Rail Mode (56px)"}
                    </Button>
                    <Button
                      onClick={() => setSidebarVariant(sidebarVariant === "floating" ? "docked" : "floating")}
                      size="sm"
                      variant={sidebarVariant === "floating" ? "filled" : "outline"}
                    >
                      {sidebarVariant === "floating" ? "Variant: Floating" : "Variant: Docked"}
                    </Button>
                    <Button
                      onClick={() => setSidebarBordered(!sidebarBordered)}
                      size="sm"
                      variant={sidebarBordered ? "filled" : "outline"}
                    >
                      {sidebarBordered ? "Border: On" : "Border: Off"}
                    </Button>
                    <Button
                      onClick={() => setSidebarSolid(!sidebarSolid)}
                      size="sm"
                      variant={sidebarSolid ? "filled" : "outline"}
                    >
                      {sidebarSolid ? "Surface Tone" : "Transparent"}
                    </Button>
                  </Group>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    height: "360px",
                    border: "1px solid var(--x-border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "var(--x-bg)",
                    position: "relative",
                  }}
                >
                  <Sidebar
                    bordered={sidebarBordered}
                    collapsed={sidebarCollapsed}
                    collapsible="rail"
                    hasBackground={sidebarSolid}
                    variant={sidebarVariant}
                    width={240}
                  >
                    <SidebarHeader>
                      <Group align="center" gap={8}>
                        <Icon size="sm">
                          <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                            <polygon points="8 2 14 13 2 13" />
                          </svg>
                        </Icon>
                        {!sidebarCollapsed && <Text weight={400}>Xenon Studio</Text>}
                      </Group>
                    </SidebarHeader>

                    <SidebarDivider inset={12} />

                    <SidebarNav>
                      <SidebarGroup label="Workspace">
                        <SidebarItem
                          active
                          icon={
                            <Icon size="sm">
                              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                                <path d="M2 6.5L8 2l6 4.5V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5z" />
                              </svg>
                            </Icon>
                          }
                          label="Overview"
                          shortcut="⌘1"
                        />
                        <SidebarItem
                          icon={
                            <Icon size="sm">
                              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                                <circle cx="8" cy="8" r="6" />
                                <polygon points="10 5.5 8.5 8.5 5.5 10.5 7.5" />
                              </svg>
                            </Icon>
                          }
                          label="Insights"
                          shortcut="⌘2"
                        />
                        <SidebarItem
                          badge={
                            <span
                              style={{
                                fontSize: "10px",
                                backgroundColor: "var(--x-accent)",
                                color: "var(--x-on-accent)",
                                padding: "1px 6px",
                                borderRadius: "9999px",
                                fontWeight: 400,
                              }}
                            >
                              New
                            </span>
                          }
                          icon={
                            <Icon size="sm">
                              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                                <path d="M12 5.5a4 4 0 0 0-8 0c0 3-1.5 4.5-1.5 4.5h11s-1.5-1.5-1.5-4.5" />
                                <path d="M6.8 12.5a1.5 1.5 0 0 0 2.4 0" />
                              </svg>
                            </Icon>
                          }
                          label="Activity"
                          shortcut="⌘3"
                        />
                      </SidebarGroup>

                      <SidebarDivider inset={12} />

                      <SidebarGroup label="Configuration">
                        <SidebarItem
                          icon={
                            <Icon size="sm">
                              <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                                <circle cx="8" cy="8" r="3" />
                                <path d="M13.2 6.5l-.8-.5a5 5 0 0 0 0-1.8l.8-.5a1 1 0 0 0 .4-1.3l-1-1.7a1 1 0 0 0-1.3-.4l-.8.5a5 5 0 0 0-1.6-.9V-.1" />
                              </svg>
                            </Icon>
                          }
                          label="Tokens & Rules"
                        />
                      </SidebarGroup>
                    </SidebarNav>

                    <SidebarDivider inset={12} />

                    <SidebarFooter>
                      <Group align="center" gap={8}>
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "9999px",
                            backgroundColor: "var(--x-surface-2)",
                            border: "1px solid var(--x-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                          }}
                        >
                          A
                        </div>
                        {!sidebarCollapsed && <Text tone="muted">ashwin@domain</Text>}
                      </Group>
                    </SidebarFooter>
                  </Sidebar>

                  <div
                    style={{
                      flex: 1,
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      textAlign: "center",
                    }}
                  >
                    <Text tone="accent" weight={400}>Main Workspace Canvas</Text>
                    <Text style={{ maxWidth: "360px", lineHeight: 1.5 }} tone="muted">
                      Notice how the floating sidebar sits comfortably without edge pinning,
                      maintaining calm negative space.
                    </Text>
                  </div>
                </div>
              </div>

              {/* 3. Tabs: Pill & Underline */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <Text tone="default" weight={400}>
                    3. Tabs (Pill Capsule & Hairline Underline)
                  </Text>
                  <Group gap={8}>
                    <Button
                      onClick={() => setTabsVariant("pill")}
                      size="sm"
                      variant={tabsVariant === "pill" ? "filled" : "outline"}
                    >
                      Pill Capsule
                    </Button>
                    <Button
                      onClick={() => setTabsVariant("underline")}
                      size="sm"
                      variant={tabsVariant === "underline" ? "filled" : "outline"}
                    >
                      Hairline Underline
                    </Button>
                  </Group>
                </div>

                <Surface
                  padding={24}
                  style={{
                    backgroundColor: "var(--x-surface)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <Tabs onValueChange={setActiveNavTab} value={activeNavTab} variant={tabsVariant}>
                    <TabsList ariaLabel="Project Settings">
                      <TabsTrigger
                        icon={
                          <Icon size="sm">
                            <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="14">
                              <rect height="12" rx="2" width="12" x="2" y="2" />
                              <line x1="2" x2="14" y1="6" y2="6" />
                            </svg>
                          </Icon>
                        }
                        value="components"
                      >
                        Components
                      </TabsTrigger>
                      <TabsTrigger
                        icon={
                          <Icon size="sm">
                            <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="14">
                              <polygon points="8 2 14 13 2 13" />
                            </svg>
                          </Icon>
                        }
                        value="architecture"
                      >
                        Architecture
                      </TabsTrigger>
                      <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
                      <TabsTrigger disabled value="experimental">Experimental (Locked)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="components">
                      <Surface padding={16} style={{ backgroundColor: "var(--x-surface-2)" }}>
                        <Text tone="default" weight={400}>V1 Component System</Text>
                        <Text tone="muted">
                          30+ components engineered with identical props across React DOM and React Native (Expo).
                        </Text>
                      </Surface>
                    </TabsContent>

                    <TabsContent value="architecture">
                      <Surface padding={16} style={{ backgroundColor: "var(--x-surface-2)" }}>
                        <Text tone="default" weight={400}>Single Source of Truth</Text>
                        <Text tone="muted">
                          Zero token duplication. Core mathematical formulas compute concentric radius and joint geometries at runtime.
                        </Text>
                      </Surface>
                    </TabsContent>

                    <TabsContent value="tokens">
                      <Surface padding={16} style={{ backgroundColor: "var(--x-surface-2)" }}>
                        <Text tone="default" weight={400}>Discrete 7-Stop Radius & Acid Accents</Text>
                        <Text tone="muted">
                          Apple HIG-calibrated typography tracking, 1px hairline precision, and pure Liquid Glass blurs.
                        </Text>
                      </Surface>
                    </TabsContent>
                  </Tabs>
                </Surface>
              </div>

              {/* 4. TabBar & Breadcrumb / Pagination */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "24px",
                }}
              >
                {/* Mobile TabBar */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text tone="default" weight={400}>
                      4. Mobile TabBar
                    </Text>
                    <Group gap={8}>
                      <Button
                        onClick={() => setTabBarVariant("floating")}
                        size="sm"
                        variant={tabBarVariant === "floating" ? "filled" : "outline"}
                      >
                        Floating
                      </Button>
                      <Button
                        onClick={() => setTabBarVariant("docked")}
                        size="sm"
                        variant={tabBarVariant === "docked" ? "filled" : "outline"}
                      >
                        Docked
                      </Button>
                    </Group>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      height: "170px",
                      border: "1px solid var(--x-border)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      backgroundColor: "var(--x-surface)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: "12px" }} tone="muted">Viewport Simulator</Text>
                    <TabBar
                      style={{ position: "absolute" }}
                      variant={tabBarVariant}
                    >
                      <TabBarItem
                        active
                        icon={
                          <Icon size="md">
                            <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="18">
                              <path d="M2 6.5L8 2l6 4.5V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6.5z" />
                            </svg>
                          </Icon>
                        }
                        label="Home"
                      />
                      <TabBarItem
                        icon={
                          <Icon size="md">
                            <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="18">
                              <circle cx="8" cy="8" r="6" />
                              <polygon points="10 5.5 8.5 8.5 5.5 10.5 7.5" />
                            </svg>
                          </Icon>
                        }
                        label="Search"
                      />
                      <TabBarItem
                        badge
                        icon={
                          <Icon size="md">
                            <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="18">
                              <path d="M12 5.5a4 4 0 0 0-8 0c0 3-1.5 4.5-1.5 4.5h11s-1.5-1.5-1.5-4.5" />
                              <path d="M6.8 12.5a1.5 1.5 0 0 0 2.4 0" />
                            </svg>
                          </Icon>
                        }
                        label="Activity"
                      />
                      <TabBarItem
                        icon={
                          <Icon size="md">
                            <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="18">
                              <circle cx="8" cy="5" r="3" />
                              <path d="M3 14c0-2.5 2.5-4 5-4s5 1.5 5 4" />
                            </svg>
                          </Icon>
                        }
                        label="Profile"
                      />
                    </TabBar>
                  </div>
                </div>

                {/* Breadcrumbs & Pagination */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Text tone="default" weight={400}>
                    5. Breadcrumb & Pagination
                  </Text>

                  <Surface
                    padding={20}
                    style={{
                      backgroundColor: "var(--x-surface)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      height: "170px",
                      justifyContent: "space-between",
                      boxSizing: "border-box",
                    }}
                  >
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#home">Xenon</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#components">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Navigation</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Pagination
                        compact={paginationCompact}
                        onPageChange={setActivePage}
                        page={activePage}
                        siblingCount={1}
                        totalPages={12}
                      />
                      <Button
                        onClick={() => setPaginationCompact(!paginationCompact)}
                        size="sm"
                        variant="ghost"
                      >
                        {paginationCompact ? "Full" : "Compact"}
                      </Button>
                    </div>
                  </Surface>
                </div>
              </div>
            </section>
          )}

          {/* Section 4: Overlays & Hero Kinematics (Phase 4) */}
          {showOverlays && (
            <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--x-accent)",
                    fontFamily: "var(--x-font-family-mono, monospace)",
                  }}
                >
                  Phase 4 · Overlays & Hero Kinematics
                </span>
                <Heading level={2} weight={400}>
                  Anchored Pop-Overs, Tooltips, Sheets & Modals
                </Heading>
                <Text style={{ lineHeight: 1.6, maxWidth: "720px" }} tone="muted">
                  Xenon departs from legacy desktop UI libraries by abolishing disruptive, view-blocking
                  dialogs for common contextual actions. Contextual tasks open as anchored pop-overs
                  with hero container transforms that smoothly bloom from and collapse back into the trigger,
                  crafted with Liquid Glass and zero background obstruction.
                </Text>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {/* 1. Anchored Popover with Hero Container Transform */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Anchored Pop-Over
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Hero Kinematics
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Notice how the Liquid Glass card blooms directly from the trigger button and
                    collapses back into it on close. The rest of the UI is NOT blurred or obstructed!
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="filled">Inspect Kinematics</Button>
                      </PopoverTrigger>
                      <PopoverContent placement="bottom" width={300}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Text tone="default" weight={400}>Liquid Glass Inspector</Text>
                            <span
                              style={{
                                fontSize: "10px",
                                backgroundColor: "var(--x-accent)",
                                color: "var(--x-on-accent)",
                                padding: "1px 6px",
                                borderRadius: "9999px",
                                fontWeight: 400,
                              }}
                            >
                              Live
                            </span>
                          </div>
                          <Text style={{ fontSize: "12px", lineHeight: 1.5 }} tone="muted">
                            Anchored directly to the trigger bounds. Notice that the background behind this popover
                            remains sharp and crystal clear.
                          </Text>
                          <Divider />
                          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                            <PopoverClose asChild>
                              <Button size="sm" variant="outline">Dismiss</Button>
                            </PopoverClose>
                            <Button size="sm" variant="filled">Confirm</Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </Surface>

                {/* 2. Tooltip Micro-Pills */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Delayed Tooltips
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Micro-Pill
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Instant hover response gated by `@media (hover: hover)` with Apple-grade
                    spring fade and hairline border.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "8px" }}>
                    <Tooltip delayMs={200}>
                      <TooltipTrigger asChild>
                        <Button size="sm" variant="subtle">Hover for Token Spec</Button>
                      </TooltipTrigger>
                      <TooltipContent placement="top">
                        --x-spring-soft: cubic-bezier(0.16, 1, 0.3, 1)
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip delayMs={200}>
                      <TooltipTrigger asChild>
                        <IconButton ariaLabel="Help" size="sm" variant="outline">
                          <Icon size="sm">
                            <svg fill="none" height="14" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 16 16" width="14">
                              <circle cx="8" cy="8" r="7" />
                              <path d="M6 6a2 2 0 1 1 2.5 1.9c-.5.3-.5.8-.5 1.1" />
                              <circle cx="8" cy="11.5" r="0.5" />
                            </svg>
                          </Icon>
                        </IconButton>
                      </TooltipTrigger>
                      <TooltipContent placement="bottom">
                        Concentric Corner Radius
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </Surface>

                {/* 3. Modal Dialog */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Modal Dialog
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Focus Trap
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Centered accessible dialog with keyboard focus containment, Escape dismissal,
                    and subtle dim scrim.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Open Modal Dialog</Button>
                      </DialogTrigger>
                      <DialogContent width={420}>
                        <DialogHeader>
                          <DialogTitle>Deploy Production Build</DialogTitle>
                          <DialogDescription>
                            This operation will compile all 7 monorepo packages and publish artifacts
                            to the edge network.
                          </DialogDescription>
                        </DialogHeader>

                        <div
                          style={{
                            padding: "12px",
                            backgroundColor: "var(--x-surface-2)",
                            borderRadius: "8px",
                            fontSize: "12px",
                            color: "var(--x-text-muted)",
                          }}
                        >
                          Target Branch: <span style={{ color: "var(--x-accent)" }}>main</span> · Commit: <span style={{ color: "var(--x-accent)" }}>v1.0.0-rc</span>
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="filled">Confirm Deploy</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Surface>

                {/* 4. Apple-Grade Sheet (Bottom & Side) */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Liquid Glass Sheet
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Full Blur Scrim
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Apple-grade bottom drawer with tactile grab handle pill and full-canvas
                    Liquid Glass blur scrim (blur: 16px).
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="accent">Bottom Drawer</Button>
                      </SheetTrigger>
                      <SheetContent hasGrabHandle side="bottom">
                        <SheetHeader>
                          <SheetTitle>Filter Workspace Assets</SheetTitle>
                          <SheetDescription>
                            Configure visual tags, search parameters, and platform filters.
                          </SheetDescription>
                        </SheetHeader>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "12px 0" }}>
                          <Text tone="default" weight={400}>Platform Filter</Text>
                          <ButtonGroup size="sm">
                            <Button variant="filled">All</Button>
                            <Button variant="ghost">React DOM</Button>
                            <Button variant="ghost">Expo Native</Button>
                          </ButtonGroup>
                        </div>

                        <SheetFooter>
                          <SheetClose asChild>
                            <Button variant="filled">Apply Preferences</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost">Side Drawer</Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Sidebar Inspector</SheetTitle>
                          <SheetDescription>
                            Real-time debug telemetry and accessibility audits.
                          </SheetDescription>
                        </SheetHeader>
                        <div style={{ flex: 1, padding: "16px 0" }}>
                          <Text tone="muted">Zero accessibility violations detected across all active viewports.</Text>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button variant="filled">Close</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>
                </Surface>

                {/* 5. Liquid Glass DropdownMenu with Keyboard Roving Focus */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Dropdown Menu
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Roving Focus
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Anchored Liquid Glass menu with keyboard navigation (↑ ↓, Home, End, Enter),
                    shortcut badges, and destructive items.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Options Menu</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent width={220}>
                        <DropdownMenuGroup label="Design Spec">
                          <DropdownMenuItem shortcut="⌘S">Save Spec</DropdownMenuItem>
                          <DropdownMenuItem shortcut="⌘E">Export Tokens</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup label="Settings">
                          <DropdownMenuItem shortcut="⌘P">Preferences</DropdownMenuItem>
                          <DropdownMenuItem disabled shortcut="⌘L">Sync Cloud (Pro)</DropdownMenuItem>
                          <DropdownMenuItem destructive shortcut="⌘Q">Sign Out</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Surface>

                {/* 6. Architectural Select */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Architectural Select
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Stop {radius} Dynamic
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Architectural trigger dynamically matching the global radius stop token
                    with anchored Liquid Glass listbox and Phosphor check indicators.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <Select onValueChange={setSelectedSelectVal} value={selectedSelectVal}>
                      <SelectTrigger placeholder="Choose preset..." style={{ minWidth: "220px" }} />
                      <SelectContent>
                        <SelectItem value="hig">Apple HIG Baseline</SelectItem>
                        <SelectItem value="concentric">Concentric Radii</SelectItem>
                        <SelectItem value="glass">Liquid Glass Blur</SelectItem>
                        <SelectItem disabled value="shadows">Drop Shadows (Banned)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </Surface>

                {/* 7. Searchable Combobox */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Filterable Combobox
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Instant Search
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Inline searchable input with Phosphor MagnifyingGlass icon, live clear trigger,
                    and empty result states.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <Combobox
                      onValueChange={setSelectedComboboxVal}
                      options={[
                        { value: "next", label: "Next.js App Router" },
                        { value: "expo", label: "Expo React Native" },
                        { value: "vitest", label: "Vitest Test Runner" },
                        { value: "turbopack", label: "Turbopack Engine" },
                      ]}
                      placeholder="Select target framework..."
                      value={selectedComboboxVal}
                    />
                  </div>
                </Surface>

                {/* 8. Spotlight Command Palette */}
                <Surface
                  padding={24}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Heading level={3} weight={400}>
                      Spotlight Console
                    </Heading>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                      }}
                    >
                      Global ⌘K
                    </span>
                  </div>
                  <Text style={{ fontSize: "13px" }} tone="muted">
                    Full-canvas Liquid Glass blur scrim with centered floating search card,
                    command groups, and global ⌘K keyboard shortcut.
                  </Text>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
                    <Button onClick={() => setCommandOpen(true)} variant="glass">
                      Open Command Palette (⌘K)
                    </Button>
                    <CommandPalette
                      items={paletteCommands}
                      onOpenChange={setCommandOpen}
                      open={commandOpen}
                    />
                  </div>
                </Surface>
              </div>
            </section>
          )}

          {/* Section 5: Surfaces & Concentric Geometry (Phase 2A) */}
          {showSurfaces && (
            <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--x-accent)",
                    fontFamily: "var(--x-font-family-mono, monospace)",
                  }}
                >
                  Phase 2A · Surface Geometry
                </span>
                <Heading level={2} weight={400}>
                  Concentric Surfaces & Mathematical Insets
                </Heading>
                <Text style={{ lineHeight: 1.6, maxWidth: "720px" }} tone="muted">
                  Mathematical concentric corner calculation: inner = max(outer - pad, outer * 0.4).
                  Concentric curves share an exact optical center and never collapse into sharp squares.
                </Text>
              </div>

              {/* Subsection A: Multiple Inset Padding Variations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Text tone="default" weight={400}>
                  1. Concentric Padding Matrix (Outer Radius: Stop {radius} = {RADIUS_STOPS[radius].surface}px)
                </Text>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {[8, 16, 24, 32].map((pad) => {
                    const parentR = RADIUS_STOPS[radius].surface;
                    const childR = computeNestedRadius(parentR, pad);
                    const isFloored = parentR > 0 && parentR - pad < parentR * 0.4;

                    return (
                      <Surface
                        key={pad}
                        padding={pad}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          backgroundColor: "var(--x-surface)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "12px",
                          }}
                        >
                          <Text tone="muted">Pad: {pad}px</Text>
                          <span
                            style={{
                              color: "var(--x-accent)",
                              fontFamily: "var(--x-font-family-mono, monospace)",
                              fontSize: "12px",
                            }}
                          >
                            R: {childR.toFixed(1)}px
                          </span>
                        </div>

                        <Surface
                          padding={16}
                          style={{
                            backgroundColor: "var(--x-surface-2)",
                            minHeight: "76px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <Text tone="default" weight={400}>Child Surface</Text>
                          <Text style={{ fontSize: "11px" }} tone="muted">
                            {isFloored
                              ? `Floor (40%): ${childR.toFixed(1)}px`
                              : `${parentR} - ${pad} = ${childR.toFixed(1)}px`}
                          </Text>
                        </Surface>
                      </Surface>
                    );
                  })}
                </div>
              </div>

              {/* Subsection B: Deep Multi-Level Nesting (Russian Doll) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Text tone="default" weight={400}>
                  2. Deep Recursive Nesting: 4 Surface Layers Preserving Optical Center
                </Text>

                <Surface
                  padding={28}
                  style={{
                    backgroundColor: "var(--x-surface)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text tone="default" weight={400}>Level 1 (Root Card)</Text>
                    <span
                      style={{
                        color: "var(--x-accent)",
                        fontFamily: "var(--x-font-family-mono, monospace)",
                        fontSize: "12px",
                      }}
                    >
                      R = {RADIUS_STOPS[radius].surface}px · Pad = 28px
                    </span>
                  </div>

                  <Surface
                    padding={20}
                    style={{
                      backgroundColor: "var(--x-surface-2)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Text tone="default" weight={400}>Level 2 (Nested Card)</Text>
                      <span
                        style={{
                          color: "var(--x-accent)",
                          fontFamily: "var(--x-font-family-mono, monospace)",
                          fontSize: "12px",
                        }}
                      >
                        R = {computeNestedRadius(RADIUS_STOPS[radius].surface, 28).toFixed(1)}px · Pad = 20px
                      </span>
                    </div>

                    <Surface
                      padding={16}
                      style={{
                        backgroundColor: "var(--x-surface)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Text tone="default" weight={400}>Level 3 (Grandchild Card)</Text>
                        <span
                          style={{
                            color: "var(--x-accent)",
                            fontFamily: "var(--x-font-family-mono, monospace)",
                            fontSize: "12px",
                          }}
                        >
                          R = {computeNestedRadius(
                            computeNestedRadius(RADIUS_STOPS[radius].surface, 28),
                            20,
                          ).toFixed(1)}px · Pad = 16px
                        </span>
                      </div>

                      <Surface
                        padding={12}
                        style={{
                          backgroundColor: "var(--x-surface-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        <Text tone="accent" weight={400}>Level 4 (Innermost Core)</Text>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "var(--x-text-muted)",
                            fontFamily: "var(--x-font-family-mono, monospace)",
                          }}
                        >
                          R = {computeNestedRadius(
                            computeNestedRadius(
                              computeNestedRadius(RADIUS_STOPS[radius].surface, 28),
                              20,
                            ),
                            16,
                          ).toFixed(1)}px · Concentric Harmony
                        </span>
                      </Surface>
                    </Surface>
                  </Surface>
                </Surface>
              </div>
            </section>
          )}
        </Stack>
      </div>
    </XenonProvider>
  );
}

export default function Home() {
  return <ShowcaseContent />;
}
