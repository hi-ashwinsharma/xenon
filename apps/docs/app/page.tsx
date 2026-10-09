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
  Divider,
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
  Radio,
  RadioGroup,
  SegmentedControl,
  Sidebar,
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
  XenonProvider,
} from "@xenon/web";

function ShowcaseContent() {
  const [theme, setTheme] = useState<ResolvedTheme>("dark");
  const [accent, setAccent] = useState<Accent>("lime");
  const [radius, setRadius] = useState<RadiusStop>(4);

  // Live state for interactive components
  const [toggleActive, setToggleActive] = useState<boolean>(true);
  const [fieldError, setFieldError] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(64);
  const [switchChecked, setSwitchChecked] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [checkboxAccepted, setCheckboxAccepted] = useState<boolean>(true);
  const [checkboxIndeterminate, setCheckboxIndeterminate] =
    useState<boolean>(true);
  const [segmentView, setSegmentView] = useState<string>("preview");
  const [feedbackText, setFeedbackText] = useState<string>("");

  // Navigation interactive state
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [sidebarSolid, setSidebarSolid] = useState<boolean>(false);
  const [sidebarSeparator, setSidebarSeparator] = useState<boolean>(true);
  const [activeNavTab, setActiveNavTab] = useState<string>("components");
  const [tabsVariant, setTabsVariant] = useState<"pill" | "underline">("pill");
  const [tabBarVariant, setTabBarVariant] = useState<"floating" | "docked">("floating");
  const [activePage, setActivePage] = useState<number>(3);
  const [paginationCompact, setPaginationCompact] = useState<boolean>(false);

  const accents: Accent[] = ["lime", "pink", "blue", "purple", "green"];
  const radiusStops: RadiusStop[] = [0, 1, 2, 3, 4, 5, 6];

  return (
    <XenonProvider accent={accent} radius={radius} theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--x-bg)",
          color: "var(--x-text)",
          padding: "48px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <Stack
          gap={48}
          style={{
            width: "100%",
            maxWidth: "960px",
          }}
        >
          {/* Header & Interactive Control Bar */}
          <header
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              borderBottom: "1px solid var(--x-border)",
              paddingBottom: "32px",
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
              <div>
                <Heading level={1} weight={200}>
                  Xenon Component Showcase
                </Heading>
                <Text tone="muted">
                  Minimalistic, hairline-crisp React primitives with Apple HIG
                  precision.
                </Text>
              </div>

              {/* Theme toggle */}
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

            {/* Accent & Radius controllers */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                padding: "16px",
                backgroundColor: "var(--x-surface)",
                borderRadius: "var(--x-radius-control)",
                border: "1px solid var(--x-border)",
              }}
            >
              <Group align="center" gap={12}>
                <Text tone="muted">Accent:</Text>
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
                <Text tone="muted">Radius Stop:</Text>
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
          </header>

          {/* Section 1: Tactile Selection Controls (Phase 3A) */}
          <section
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <Heading level={2} weight={300}>
                Selection & Tactile Controls (Phase 3A)
              </Heading>
              <Text tone="muted">
                Hairline indicators, Apple HIG spring kinematics, squash &
                stretch switches.
              </Text>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Checkboxes */}
              <Surface
                padding={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Heading level={3} weight={400}>
                  Checkboxes
                </Heading>
                <Checkbox
                  checked={checkboxAccepted}
                  description="Required to access the cloud playground"
                  label="Accept terms of service"
                  onCheckedChange={setCheckboxAccepted}
                />
                <Checkbox
                  checked={checkboxIndeterminate}
                  description="Mixed parent selection"
                  indeterminate
                  label="Select all sub-milestones"
                  onCheckedChange={setCheckboxIndeterminate}
                />
                <Checkbox disabled label="Disabled unchecked option" />
              </Surface>

              {/* Switches */}
              <Surface
                padding={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Heading level={3} weight={400}>
                  Switches
                </Heading>
                <Switch
                  checked={switchChecked}
                  description="Real-time blur on overlay elements"
                  label="Liquid Glass"
                  onCheckedChange={setSwitchChecked}
                  size="md"
                />
                <Switch
                  description="Tactile vibration on tap"
                  label="Haptic Feedback (sm)"
                  size="sm"
                />
                <Switch
                  defaultChecked
                  description="56x32 Apple HIG dimension"
                  label="Performance Mode (lg)"
                  size="lg"
                />
              </Surface>

              {/* Radio Group */}
              {/* Radio Group: Aperture & Tile */}
              <Surface
                padding={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Heading level={3} weight={400}>
                    Single Choice
                  </Heading>
                  <Text tone="accent">Aperture & Tile</Text>
                </div>

                <Text tone="muted">Aperture Iris Indicator:</Text>
                <RadioGroup
                  onValueChange={setSelectedPlan}
                  value={selectedPlan}
                >
                  <Radio
                    description="Standard dev environment"
                    label="Hobbyist"
                    value="hobby"
                  />
                  <Radio
                    description="Full multi-package monorepo"
                    label="Pro Developer"
                    value="pro"
                  />
                </RadioGroup>

                <Divider />

                <Text tone="muted">Architectural Selection Tile:</Text>
                <RadioGroup
                  onValueChange={setSelectedPlan}
                  value={selectedPlan}
                  variant="tile"
                >
                  <Radio
                    description="Automated CI with unlimited seats"
                    label="Enterprise Cloud"
                    value="enterprise"
                  />
                </RadioGroup>
              </Surface>

              {/* Slider */}
              <Surface
                padding={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Heading level={3} weight={400}>
                    Slider
                  </Heading>
                  <Text tone="accent">{sliderValue}%</Text>
                </div>
                <Slider
                  max={100}
                  min={0}
                  onValueChange={setSliderValue}
                  step={1}
                  value={sliderValue}
                />
                <Text tone="muted">
                  Interactive drag & keyboard control (Arrows, Home, End,
                  PageUp/Down).
                </Text>
              </Surface>

              {/* Segmented Control */}
              <Surface
                padding={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Heading level={3} weight={400}>
                    Segmented Control
                  </Heading>
                  <Text tone="accent">{segmentView.toUpperCase()}</Text>
                </div>
                <Text tone="muted">
                  Apple HIG sliding capsule with squash-and-stretch kinematics:
                </Text>
                <SegmentedControl
                  onValueChange={setSegmentView}
                  options={[
                    { value: "preview", label: "Preview" },
                    { value: "code", label: "Code" },
                    { value: "tokens", label: "Tokens" },
                  ]}
                  value={segmentView}
                />
                <SegmentedControl
                  defaultValue="week"
                  fullWidth
                  options={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                    { value: "year", label: "Year" },
                  ]}
                  size="sm"
                />
              </Surface>
            </div>
          </section>

          {/* Section 2: Signature Action Controls (Phase 2B) */}
          <section
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <Heading level={2} weight={300}>
                Action Controls & ButtonGroup (Phase 2B)
              </Heading>
              <Text tone="muted">
                Six button variants, Apple-grade capsule toolbars with inset
                hairlines.
              </Text>
            </div>

            <Surface
              padding={24}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Text tone="muted">Button Variants & IconButton:</Text>
              <Group align="center" gap={12} wrap="wrap">
                <Button variant="accent">Accent</Button>
                <Button variant="filled">Filled</Button>
                <Button variant="subtle">Subtle</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="glass">Liquid Glass</Button>
                <IconButton ariaLabel="Settings" size="md" variant="subtle">
                  <Icon size="sm">
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="16"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </Icon>
                </IconButton>
              </Group>

              <Divider />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <Text tone="muted">Signature ButtonGroup:</Text>
                  <ButtonGroup size="md">
                    <Button variant="filled">Preview</Button>
                    <Button variant="filled">Code</Button>
                    <Button variant="filled">Props</Button>
                  </ButtonGroup>
                </div>

                <div>
                  <Text tone="muted">ToggleButton & Link:</Text>
                  <Group align="center" gap={16}>
                    <ToggleButton
                      onPressedChange={setToggleActive}
                      pressed={toggleActive}
                    >
                      Pin Inspector
                    </ToggleButton>
                    <Link href="https://github.com/hi-ashwinsharma/xenon">
                      GitHub Repository
                    </Link>
                  </Group>
                </div>
              </div>
            </Surface>
          </section>

          {/* Section 3: Form Grouping & Field (Phase 2C) */}
          <section
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <Heading level={2} weight={300}>
                Inputs, InputGroup & Field (Phase 2C)
              </Heading>
              <Text tone="muted">
                Capsule group boundaries with flush joint radiuses and
                accessible field messaging.
              </Text>
            </div>

            <Surface
              padding={24}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "8px",
                }}
              >
                <Checkbox
                  checked={fieldError}
                  label="Simulate validation error"
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
                  error={
                    fieldError ? "Please enter a valid organization" : undefined
                  }
                  helpText="Restrained 8px architectural geometry with recessed surface-2"
                  label="Organization Name"
                >
                  <Input
                    clearable
                    defaultValue="HotCrunch Core Labs"
                    invalid={fieldError}
                    placeholder="e.g. Acme Corp"
                  />
                </Field>

                {/* 2. Dedicated Search Input */}
                <Field
                  helpText="Reserved pill geometry with living prefix and ⌘K badge"
                  label="Quick Navigator"
                  optional
                >
                  <Input
                    clearable
                    placeholder="Search documentation, API..."
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
                  label="License Authorization"
                  optional
                >
                  <InputGroup size="md">
                    <Input
                      placeholder="xenon_lic_..."
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

              {/* 4. Architectural Textarea with Auto-growth & Character Count */}
              <Field
                helpText="Architectural 8px radius with dynamic auto-growth and live character metrics"
                label="Release Notes & Engineering Rationale"
                optional
              >
                <Textarea
                  autoGrow
                  maxLength={280}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Deliberate deeply on the semantic role, negative space, and geometry..."
                  showCount
                  value={feedbackText}
                />
              </Field>
            </Surface>
          </section>

          {/* Section 4: Structural Navigation Chrome (Phase 3B) */}
          <section
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <Heading level={2} weight={300}>
                Structural Navigation Chrome (Phase 3B)
              </Heading>
              <Text tone="muted">
                Engineered with Apple-grade micro-interactions, Liquid Glass blur, background-less negative space sidebars, and hairline boundaries.
              </Text>
            </div>

            {/* 1. Navbar & GlassBar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text tone="accent">1. Top Navigation: Adaptive Navbar & Liquid GlassBar</Text>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  border: "1px solid var(--x-border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "var(--x-surface-2)",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Text tone="muted" weight={400}>Adaptive Navbar (Transparent at rest, elevates to Liquid Glass on scroll)</Text>
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
                            width: "20px",
                            height: "20px",
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
                    style={{ position: "relative", borderRadius: "6px" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Text tone="muted" weight={400}>Continuous GlassBar (Permanent Liquid Glass with regular blur)</Text>
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
                    style={{ position: "relative", borderRadius: "6px" }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Background-less & Rail Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <Text tone="accent">2. Sidebar Navigation (Background-less Default, Rail Mode, Hairline Separator)</Text>
                <Group gap={8}>
                  <Button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    size="sm"
                    variant={sidebarCollapsed ? "filled" : "outline"}
                  >
                    {sidebarCollapsed ? "Expand to 240px" : "Collapse to Rail (56px)"}
                  </Button>
                  <Button
                    onClick={() => setSidebarSolid(!sidebarSolid)}
                    size="sm"
                    variant={sidebarSolid ? "filled" : "outline"}
                  >
                    {sidebarSolid ? "Mode: Solid Surface" : "Mode: Background-less Canvas"}
                  </Button>
                  <Button
                    onClick={() => setSidebarSeparator(!sidebarSeparator)}
                    size="sm"
                    variant={sidebarSeparator ? "filled" : "outline"}
                  >
                    {sidebarSeparator ? "Right Hairline: On" : "Right Hairline: Off"}
                  </Button>
                </Group>
              </div>

              <div
                style={{
                  display: "flex",
                  height: "360px",
                  border: "1px solid var(--x-border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "var(--x-bg)",
                }}
              >
                <Sidebar
                  collapsed={sidebarCollapsed}
                  collapsible="rail"
                  hasBackground={sidebarSolid}
                  separator={sidebarSeparator}
                  style={{ minHeight: "100%" }}
                  width={240}
                >
                  <SidebarHeader>
                    <Group align="center" gap={8}>
                      <Icon size="sm">
                        <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                          <polygon points="8 2 14 13 2 13" />
                        </svg>
                      </Icon>
                      {!sidebarCollapsed && <Text weight={400}>Acme Corp</Text>}
                    </Group>
                  </SidebarHeader>

                  <SidebarNav>
                    <SidebarGroup label="Main">
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
                              <polygon points="10 5.5 8.5 8.5 5.5 10.5 7.5 7.5" />
                            </svg>
                          </Icon>
                        }
                        label="Analytics"
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
                        label="Notifications"
                        shortcut="⌘3"
                      />
                    </SidebarGroup>

                    <SidebarGroup label="Settings">
                      <SidebarItem
                        icon={
                          <Icon size="sm">
                            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" viewBox="0 0 16 16" width="16">
                              <circle cx="8" cy="8" r="3" />
                              <path d="M13.2 6.5l-.8-.5a5 5 0 0 0 0-1.8l.8-.5a1 1 0 0 0 .4-1.3l-1-1.7a1 1 0 0 0-1.3-.4l-.8.5a5 5 0 0 0-1.6-.9V-.1" />
                            </svg>
                          </Icon>
                        }
                        label="Security & API"
                      />
                    </SidebarGroup>
                  </SidebarNav>

                  <SidebarFooter>
                    <Group align="center" gap={8}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
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
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Text tone="accent">Main Content Canvas Area</Text>
                  <Text tone="muted">
                    Notice how the sidebar lives on the page canvas without enclosing boxes or cards.
                  </Text>
                </div>
              </div>
            </div>

            {/* 3. Tabs: Pill & Underline Indicators */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <Text tone="accent">3. Tabs (Pill Capsule & Minimalist Underline)</Text>
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

            {/* 4. TabBar (Floating Island vs Docked) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <Text tone="accent">4. Mobile TabBar (Floating Liquid Glass Island & Docked Modes)</Text>
                <Group gap={8}>
                  <Button
                    onClick={() => setTabBarVariant("floating")}
                    size="sm"
                    variant={tabBarVariant === "floating" ? "filled" : "outline"}
                  >
                    Floating Island
                  </Button>
                  <Button
                    onClick={() => setTabBarVariant("docked")}
                    size="sm"
                    variant={tabBarVariant === "docked" ? "filled" : "outline"}
                  >
                    Docked Bottom
                  </Button>
                </Group>
              </div>

              <div
                style={{
                  position: "relative",
                  height: "180px",
                  border: "1px solid var(--x-border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "var(--x-bg)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text tone="muted">Viewport Simulator (Scrollable Content Behind TabBar)</Text>

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
                          <polygon points="10 5.5 8.5 8.5 5.5 10.5 7.5 7.5" />
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

            {/* 5. Breadcrumb & Pagination */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Text tone="accent">5. Breadcrumb Hierarchy & Pagination Controls</Text>
              <Surface
                padding={24}
                style={{
                  backgroundColor: "var(--x-surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Text tone="muted" weight={400}>Semantic Breadcrumb Navigation</Text>
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
                        <BreadcrumbLink href="#navigation">Navigation</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Tabs & Pagination</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <Divider />

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <Text tone="muted" weight={400}>Hairline Pagination (Active: Page {activePage} of 12)</Text>
                    <Button
                      onClick={() => setPaginationCompact(!paginationCompact)}
                      size="sm"
                      variant="outline"
                    >
                      {paginationCompact ? "Mode: Full Numbers" : "Mode: Compact"}
                    </Button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
                    <Pagination
                      compact={paginationCompact}
                      onPageChange={setActivePage}
                      page={activePage}
                      siblingCount={1}
                      totalPages={12}
                    />
                  </div>
                </div>
              </Surface>
            </div>
          </section>

          {/* Section 5: Surfaces & Concentric Radius (Phase 2A) */}
          <section
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <Heading level={2} weight={300}>
                Concentric Surfaces & Nesting (Phase 2A)
              </Heading>
              <Text tone="muted">
                Mathematical concentric corner calculation: inner = max(outer - pad, outer * 0.4).
                Curves share an exact optical center and never collapse into sharp squares.
              </Text>
            </div>

            {/* Subsection A: Multiple Padding Variations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Text tone="muted">
                Sample Grid: Constant Parent Radius (Stop {radius} = {RADIUS_STOPS[radius].surface}px) with 4 Inset Padding Steps
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
                          fontSize: "0.75rem",
                        }}
                      >
                        <Text tone="muted">Padding: {pad}px</Text>
                        <Text tone="accent">Inner R: {childR.toFixed(1)}px</Text>
                      </div>

                      <Surface
                        padding={16}
                        style={{
                          backgroundColor: "var(--x-surface-2)",
                          minHeight: "84px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <Text tone="default">Child Surface</Text>
                        <Text tone="muted">
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
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Text tone="muted">
                Deep Recursive Nesting: 4 Nested Surface Layers Cascading Context Downwards
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
                  <Text tone="default">Level 1 (Root Surface)</Text>
                  <Text tone="accent">
                    R = {RADIUS_STOPS[radius].surface}px · Pad = 28px
                  </Text>
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
                    <Text tone="default">Level 2 (Nested Card)</Text>
                    <Text tone="accent">
                      R = {computeNestedRadius(RADIUS_STOPS[radius].surface, 28).toFixed(1)}px · Pad = 20px
                    </Text>
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
                      <Text tone="default">Level 3 (Grandchild Card)</Text>
                      <Text tone="accent">
                        R = {computeNestedRadius(
                          computeNestedRadius(RADIUS_STOPS[radius].surface, 28),
                          20,
                        ).toFixed(1)}px · Pad = 16px
                      </Text>
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
                      <Text tone="accent">Level 4 (Innermost Core Surface)</Text>
                      <Text tone="muted">
                        R = {computeNestedRadius(
                          computeNestedRadius(
                            computeNestedRadius(RADIUS_STOPS[radius].surface, 28),
                            20,
                          ),
                          16,
                        ).toFixed(1)}px · Perfect Harmony
                      </Text>
                    </Surface>
                  </Surface>
                </Surface>
              </Surface>
            </div>
          </section>
        </Stack>
      </div>
    </XenonProvider>
  );
}

export default function Home() {
  return <ShowcaseContent />;
}
