"use client";

import { useState } from "react";
import type { Accent, RadiusStop, ResolvedTheme } from "@xenon/tokens";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Field,
  Group,
  Heading,
  IconButton,
  Icon,
  Input,
  InputGroup,
  Link,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Surface,
  Switch,
  Text,
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
              <Surface
                padding={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Heading level={3} weight={400}>
                  Radio Group
                </Heading>
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
                  <Radio
                    description="Multi-seat enterprise workspace"
                    disabled
                    label="Enterprise"
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
                <IconButton aria-label="Settings" size="md" variant="subtle">
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
                <Field
                  error={
                    fieldError ? "Please enter a valid organization" : undefined
                  }
                  helpText="Displayed on your invoices and team profile"
                  label="Organization Name"
                >
                  <Input
                    defaultValue="HotCrunch Core Labs"
                    invalid={fieldError}
                    placeholder="e.g. Acme Corp"
                  />
                </Field>

                <Field
                  helpText="Search packages across the workspace"
                  label="Attached Search Group"
                  optional
                >
                  <InputGroup size="md">
                    <Input
                      placeholder="Find component..."
                      prefix={<span style={{ opacity: 0.5 }}>⌘</span>}
                    />
                    <Button variant="filled">Search</Button>
                  </InputGroup>
                </Field>
              </div>
            </Surface>
          </section>

          {/* Section 4: Surfaces & Concentric Radius (Phase 2A) */}
          <section
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <Heading level={2} weight={300}>
                Concentric Surfaces & Nesting (Phase 2A)
              </Heading>
              <Text tone="muted">
                Mathematical concentric corner calculation: inner = max(outer -
                pad, outer * 0.4).
              </Text>
            </div>

            <Surface
              padding={32}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <Text tone="default">
                Parent Surface with outer radius token (Stop {radius})
              </Text>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                <Surface
                  padding={20}
                  style={{ backgroundColor: "var(--x-surface-2)" }}
                >
                  <Text tone="accent">Nested Surface A</Text>
                  <Text tone="muted">Calculated inner corner radius</Text>
                </Surface>

                <Surface
                  padding={20}
                  style={{ backgroundColor: "var(--x-surface-2)" }}
                >
                  <Text tone="accent">Nested Surface B</Text>
                  <Text tone="muted">Perfect concentric harmony</Text>
                </Surface>
              </div>
            </Surface>
          </section>
        </Stack>
      </div>
    </XenonProvider>
  );
}

export default function Home() {
  return <ShowcaseContent />;
}
