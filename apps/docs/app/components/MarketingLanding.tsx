"use client";

import React, { useState, useRef, type ReactElement } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Checkbox,
  CodeBlock,
  Divider,
  Heading,
  IconButton,
  Input,
  SegmentedControl,
  Slider,
  Stack,
  Surface,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Text,
} from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import {
  ClownCarVsAccentIllustration,
  EggVsConcentricIllustration,
  JoltVsButterIllustration,
  MudVsHairlineIllustration,
} from "./LineArtIllustrations";
import {
  CheckIcon,
  CopyIcon,
  SlidersIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  ShieldCheckIcon,
  TerminalIcon,
  CpuIcon,
} from "./Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MarketingLandingProps {
  theme?: Theme;
  accent: Accent;
  radius: RadiusStop;
  amoled?: boolean;
  onThemeChange?: (theme: Theme) => void;
  onAccentChange: (accent: Accent) => void;
  onRadiusChange: (radius: RadiusStop) => void;
  onAmoledChange?: (amoled: boolean) => void;
}

const ACCENT_OPTIONS: Array<{ key: Accent; label: string; color: string }> = [
  { key: "lime", label: "Lime", color: "#D4FF4F" },
  { key: "orange", label: "Orange", color: "#FF7E47" },
  { key: "blue", label: "Blue", color: "#9ED8FF" },
  { key: "pink", label: "Pink", color: "#FFB3D9" },
  { key: "purple", label: "Purple", color: "#CDB4FF" },
  { key: "green", label: "Green", color: "#9BFFB8" },
];

interface ScrollSectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  isHero?: boolean;
}

function ScrollSection({ children, style, isHero = false }: ScrollSectionProps): ReactElement {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (isHero) {
        gsap.fromTo(
          sectionRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
          },
        );
      } else {
        gsap.fromTo(
          sectionRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} style={style}>
      {children}
    </section>
  );
}

export function MarketingLanding({
  theme = "dark",
  accent,
  radius,
  amoled = true,
  onThemeChange,
  onAccentChange,
  onRadiusChange,
  onAmoledChange,
}: MarketingLandingProps): ReactElement {
  const [copiedInit, setCopiedInit] = useState(false);
  const [demoParentRadius, setDemoParentRadius] = useState<number>(28);
  const [demoPadding, setDemoPadding] = useState<number>(10);
  const [springActive, setSpringActive] = useState<boolean>(false);
  const [inspectHairline, setInspectHairline] = useState<boolean>(false);

  // Hero interactive showcase states
  const [workbenchHaptics, setWorkbenchHaptics] = useState<boolean>(true);
  const [heroSearch, setHeroSearch] = useState<string>("");
  const [heroCheckboxA, setHeroCheckboxA] = useState<boolean>(true);
  const [heroCheckboxB, setHeroCheckboxB] = useState<boolean>(false);
  const [heroCheckboxC, setHeroCheckboxC] = useState<boolean>(true);
  const [heroCheckboxD, setHeroCheckboxD] = useState<boolean>(true);
  const [heroInputToken, setHeroInputToken] = useState<string>("npx xenon add button");
  const [heroMotionK, setHeroMotionK] = useState<number>(300);
  const [heroSliderVal, setHeroSliderVal] = useState<number>(64);
  const [heroPlatform, setHeroPlatform] = useState<string>("web");

  const isLight = theme === "light";
  const demoChildRadius = Math.max(0, demoParentRadius - demoPadding);

  // Act I interactive showcase states
  const [guardrailTab, setGuardrailTab] = useState<"xenon" | "hallucination">("xenon");
  const [selectedRegistryItem, setSelectedRegistryItem] = useState<string>("button");
  const [copiedRegistryCmd, setCopiedRegistryCmd] = useState<boolean>(false);

  const handleCopyRegistry = (item: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`npx xenon add ${item}`);
      setCopiedRegistryCmd(true);
      setTimeout(() => setCopiedRegistryCmd(false), 2000);
    }
  };

  const handleCopyInit = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("npx xenon init");
      setCopiedInit(true);
      setTimeout(() => setCopiedInit(false), 2000);
    }
  };

  const tapestryRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!tapestryRef.current) return;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        gsap.to(".hero-col-odd", {
          y: -44,
          ease: "none",
          scrollTrigger: {
            trigger: tapestryRef.current,
            start: "top 420px",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.to(".hero-col-even", {
          y: 36,
          ease: "none",
          scrollTrigger: {
            trigger: tapestryRef.current,
            start: "top 420px",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    },
    { scope: tapestryRef },
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "var(--x-bg)",
        color: "var(--x-text)",
        transition: "background-color var(--x-dur-base) ease, color var(--x-dur-base) ease",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HERO VIEWPORT: IMMERSIVE EXPANSIVE STAGE
          Upper: Centered typographic conviction lead (Foreground, 100% visible CTA)
          Below: Full-bleed living component universe emerging with blur+fade
          Bottom: 1.00px hairline border demarcating Act I
      ────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* 1. Upper Centered Typographic Lead (Clean canvas, 100% visible high-contrast CTA) */}
        <ScrollSection
          isHero
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "960px",
            margin: "0 auto",
            padding: "clamp(80px, 12vh, 110px) 24px 32px 24px",
            boxSizing: "border-box",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          <div style={{ maxWidth: "780px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            {/* Status Overline Chip */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--x-accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                Xenon Design System · v1.0
              </span>
            </div>

            <Heading
              level={1}
              weight={200}
              style={{
                fontSize: "clamp(2.8rem, 5.8vw, 4.6rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              The UI kit your AI can’t break.
            </Heading>

            <Text
              styleKey="body"
              tone="muted"
              weight={300}
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                maxWidth: "620px",
                margin: 0,
              }}
            >
              Strict finite tokens, deterministic types, and zero guesswork for humans and agents.
              Mathematically polished with concentric curves and 1.00px hairlines—customize globally
              with two tokens, install via registry, and ship across Web and Expo.
            </Text>

            {/* Quickstart Command Bar & Primary Action */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap", paddingTop: "8px" }}>
              <div
                onClick={handleCopyInit}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCopyInit();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 20px",
                  borderRadius: "var(--x-radius-control, 10px)",
                  border: "1px solid var(--x-border)",
                  backgroundColor: "var(--x-surface-2)",
                  cursor: "pointer",
                  transition:
                    "border-color var(--x-dur-base) ease, transform 160ms cubic-bezier(0.2, 0, 0, 1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--x-font-family-mono)",
                    fontSize: "14px",
                    color: "var(--x-accent)",
                    fontWeight: 400,
                  }}
                >
                  $ npx xenon init
                </span>
                <span style={{ color: "var(--x-text-muted)", display: "flex", alignItems: "center" }}>
                  {copiedInit ? <CheckIcon size="sm" color="var(--x-accent)" /> : <CopyIcon size="sm" />}
                </span>
              </div>

              <Link href="/docs/components" style={{ textDecoration: "none" }}>
                <Button variant="filled" size="md">
                  Browse Registry →
                </Button>
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* 2. The Full-Bleed Living Component Gallery (In-flow below CTA, emerging with top blur+fade) */}
        <div
          ref={tapestryRef}
          className="hero-tapestry-container"
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            zIndex: 1,
            pointerEvents: "auto",
            marginTop: "12px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 50px, rgba(0,0,0,0.6) 130px, black 220px, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 50px, rgba(0,0,0,0.6) 130px, black 220px, black 100%)",
          }}
        >
          {/* Subtle Top-Edge Progressive Blur Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "220px",
              zIndex: 3,
              pointerEvents: "none",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              maskImage:
                "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.5) 120px, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.5) 120px, transparent 100%)",
            }}
          />

          {/* 6-Column Responsive Tapestry Runway */}
          <div
            className="hero-tapestry-runway"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              width: "100%",
              maxWidth: "1920px",
              padding: "24px 16px 36px 16px",
              boxSizing: "border-box",
            }}
          >
          {/* ─── COLUMN 1: Controls & Navigation ─── */}
          <div className="hero-col hero-col-odd">
            {/* 1. Breadcrumb Navigation */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Xenon</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Primitives</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Controls</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 2. Tabs List */}
            <Tabs defaultValue="tokens" style={{ width: "100%" }}>
              <TabsList style={{ width: "100%" }}>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="geometry">Geometry</TabsTrigger>
                <TabsTrigger value="parity">Parity</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 3. Grouped Capsule Action Buttons */}
            <ButtonGroup size="md" variant="outline" style={{ width: "100%" }}>
              <Button variant="filled">Compile</Button>
              <Button onClick={() => setSpringActive(!springActive)}>Inspect</Button>
              <Button onClick={handleCopyInit}>Export</Button>
            </ButtonGroup>

            {/* 4. Architectural Search Input */}
            <Input
              placeholder="Filter 30+ primitives..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              clearable
              size="sm"
              suffix={<Badge tone="neutral" size="sm">⌘K</Badge>}
            />

            {/* 5. Segmented Control */}
            <SegmentedControl
              options={[
                { value: "0", label: "0 Sharp" },
                { value: "3", label: "3 Arch" },
                { value: "6", label: "6 Pill" },
              ]}
              value={String(radius)}
              onValueChange={(val) => onRadiusChange(Number(val) as RadiusStop)}
              size="sm"
              fullWidth
            />

            {/* 6. Mixed Action Pill Row */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Button variant="subtle" size="sm">Action</Button>
              <IconButton ariaLabel="Adjust Controls" variant="outline" size="sm">
                <SlidersIcon size="sm" />
              </IconButton>
              <Badge tone="accent">Concentric</Badge>
              <Badge tone="neutral">1.00px</Badge>
            </div>

            {/* 7. Stepped Radius Slider */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span style={{ fontFamily: "var(--x-font-family-mono)", textTransform: "uppercase" }}>Radius Stop</span>
                <span style={{ fontFamily: "var(--x-font-family-mono)", color: "var(--x-accent)" }}>
                  {radius === 6 ? "Pill" : `${radius * 4}px`}
                </span>
              </div>
              <Slider
                min={0}
                max={6}
                step={1}
                value={radius}
                onValueChange={(val) => onRadiusChange(val as RadiusStop)}
                size="sm"
                aria-label="Global Radius Scale"
              />
            </div>

            {/* 8. Hardware Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--x-accent)",
                  }}
                />
                <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)" }}>GPU Shaders</span>
              </div>
              <Switch defaultChecked size="sm" aria-label="GPU Shaders" />
            </div>

            {/* 9. Parity Telemetry */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Badge tone="accent" size="sm">Parity 1:1</Badge>
              <Badge tone="neutral" size="sm">Zero Drift</Badge>
              <Badge tone="accent" size="sm">100% TS</Badge>
            </div>

            {/* 10. Secondary Action Duo */}
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>Diff AST</Button>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Snapshot</Button>
            </div>

            {/* 11. Token Filter Input */}
            <Input
              placeholder="Search tokens..."
              size="sm"
              prefix={<MagnifyingGlassIcon size="sm" />}
            />

            {/* 12. Mode Segmented Control */}
            <SegmentedControl
              options={[
                { value: "compact", label: "Compact" },
                { value: "standard", label: "Standard" },
              ]}
              defaultValue="standard"
              size="sm"
              fullWidth
            />

            {/* 13. Telemetry Chip */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Badge tone="accent" size="sm">Concentric R24</Badge>
              <Badge tone="neutral" size="sm">Dirac Stop</Badge>
            </div>

            {/* 14. Sub-pixel Snap Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)" }}>Sub-pixel Snap</span>
              <Switch defaultChecked size="sm" aria-label="Sub-pixel Snap" />
            </div>

            {/* 15. Checkbox Duo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <Checkbox defaultChecked size="sm" label="Auto Prune Dead CSS" />
              <Checkbox defaultChecked size="sm" label="Concentric Radii" />
            </div>

            {/* 16. Action Pill Row */}
            <ButtonGroup size="sm" variant="subtle" style={{ width: "100%", display: "flex" }}>
              <Button style={{ flex: 1 }}>Stage</Button>
              <Button style={{ flex: 1 }}>Diff</Button>
            </ButtonGroup>
          </div>

          {/* ─── COLUMN 2: System Architecture & Tokens ─── */}
          <div className="hero-col hero-col-even">
            {/* 1. Interactive Accent Palette Swatches */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 14px",
                borderRadius: "var(--x-radius-control, 9999px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <span style={{ fontSize: "11px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                Palette
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {ACCENT_OPTIONS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onAccentChange(item.key)}
                    aria-label={`Select ${item.label} accent`}
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      outline: accent === item.key ? "1.5px solid var(--x-accent)" : "none",
                      outlineOffset: "2px",
                      transform: accent === item.key ? "scale(1.2)" : "scale(1)",
                      transition: "transform 140ms ease",
                    }}
                    title={item.label}
                  />
                ))}
              </div>
            </div>

            {/* 2. Input with Prefix Icon */}
            <Input
              placeholder="Concentric curvature..."
              prefix={<MagnifyingGlassIcon size="sm" />}
              size="sm"
              clearable
            />

            {/* 3. Spring Kinematics Tuner Box */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span style={{ fontFamily: "var(--x-font-family-mono)", textTransform: "uppercase" }}>Spring Stiffness</span>
                <span style={{ fontFamily: "var(--x-font-family-mono)", color: "var(--x-accent)" }}>
                  k = {heroMotionK}
                </span>
              </div>
              <Slider
                min={100}
                max={500}
                step={20}
                value={heroMotionK}
                onValueChange={setHeroMotionK}
                size="sm"
                aria-label="Spring Stiffness Tuner"
              />
            </div>

            {/* 4. Tri-State Action Buttons */}
            <ButtonGroup size="sm" variant="filled" style={{ width: "100%" }}>
              <Button>Scaffold</Button>
              <Button variant="outline">Preview</Button>
              <Button variant="subtle">Ship</Button>
            </ButtonGroup>

            {/* 5. Motion & Optics Tabs */}
            <Tabs defaultValue="physics" style={{ width: "100%" }}>
              <TabsList style={{ width: "100%" }}>
                <TabsTrigger value="physics">Physics</TabsTrigger>
                <TabsTrigger value="optics">Optics</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 6. Avatar Group & Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Core" />
                <Avatar name="Kit" />
                <Avatar name="UI" />
              </AvatarGroup>
              <Badge tone="accent" size="sm">Parity 100%</Badge>
              <Badge tone="neutral" size="sm">Zero Drift</Badge>
            </div>

            {/* 7. Curvature Formula Box */}
            <div
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "12px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                color: "var(--x-text)",
                letterSpacing: "-0.01em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>R_outer = R_inner + P</span>
              <span style={{ color: "var(--x-accent)" }}>Concentric</span>
            </div>

            {/* 8. Secondary Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Tokens</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Motion</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>SpringSoft</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 9. Theme Control */}
            <SegmentedControl
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
                { value: "system", label: "Auto" },
              ]}
              value={theme}
              onValueChange={(val) => onThemeChange?.(val as Theme)}
              size="sm"
              fullWidth
            />

            {/* 10. Checkbox Duo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <Checkbox defaultChecked size="sm" label="Deterministic Types" />
              <Checkbox defaultChecked size="sm" label="Zero Any in Core" />
            </div>

            {/* 11. Re-index Action */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Button variant="subtle" size="sm" style={{ flex: 1 }}>Re-index</Button>
              <IconButton ariaLabel="Settings" variant="outline" size="sm">
                <SlidersIcon size="sm" />
              </IconButton>
            </div>

            {/* 12. Tension Slider */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span>Spring Tension</span>
                <span style={{ color: "var(--x-accent)", fontFamily: "var(--x-font-family-mono)" }}>240</span>
              </div>
              <Slider min={100} max={400} step={20} defaultValue={240} size="sm" aria-label="Spring Tension" />
            </div>

            {/* 13. Avatar Group Pill */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Linus" />
                <Avatar name="Ada" />
                <Avatar name="Turing" />
              </AvatarGroup>
              <Badge tone="accent" size="sm">TypeSafe</Badge>
            </div>

            {/* 14. Token File Input */}
            <Input
              prefix={<SlidersIcon size="sm" />}
              placeholder="tokens.json"
              size="sm"
              suffix={<Badge tone="neutral" size="sm">JSON</Badge>}
            />

            {/* 15. Action Button Row */}
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Push AST</Button>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>Revert</Button>
            </div>

            {/* 16. Hairline Caliper Display */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontSize: "11px",
                fontFamily: "var(--x-font-family-mono)",
                color: "var(--x-text-muted)",
              }}
            >
              <span>StyleSheet.hairlineWidth</span>
              <span style={{ color: "var(--x-accent)" }}>1.000px</span>
            </div>
          </div>

          {/* ─── COLUMN 3: Workstations & Living Specs ─── */}
          <div className="hero-col hero-col-odd hero-col-tablet">
            {/* 1. Surface Tone Segmented Control */}
            <SegmentedControl
              options={[
                { value: "flat", label: "Flat 0" },
                { value: "amoled", label: "AMOLED" },
                { value: "glass", label: "Glass" },
              ]}
              defaultValue="amoled"
              size="sm"
              fullWidth
            />

            {/* 2. Input with CLI Suffix */}
            <Input
              value={heroInputToken}
              onChange={(e) => setHeroInputToken(e.target.value)}
              size="sm"
              suffix={<Badge tone="neutral" size="sm">CLI</Badge>}
              style={{ width: "100%" }}
            />

            {/* 3. Action Button Group */}
            <ButtonGroup size="md" variant="filled" style={{ width: "100%", display: "flex" }}>
              <Button style={{ flex: 1 }}>Generate</Button>
              <Button variant="outline" style={{ flex: 1 }}>Inspect</Button>
              <Button variant="subtle" style={{ flex: 1 }}>Diff</Button>
            </ButtonGroup>

            {/* 4. Oscilloscope Metric Box */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "var(--x-text-muted)",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <span>Harmonic Waveform</span>
              <span style={{ color: "var(--x-accent)" }}>e^(-15t) · cos</span>
            </div>

            {/* 5. Breadcrumb in Hairline Box */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Breadcrumb>
                <BreadcrumbList style={{ flexWrap: "nowrap" }}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">System</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Specs</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Invariants</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* 6. Dual Switches in Full-Width Surface */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Switch size="sm" defaultChecked label="Zero Shadows" />
              <Badge tone="neutral" size="sm">Strict</Badge>
            </div>

            {/* 7. Secondary Slider */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span style={{ fontFamily: "var(--x-font-family-mono)", textTransform: "uppercase" }}>Surface Elevation</span>
                <span style={{ fontFamily: "var(--x-font-family-mono)", color: "var(--x-accent)" }}>{heroSliderVal}%</span>
              </div>
              <Slider
                min={0}
                max={100}
                step={5}
                value={heroSliderVal}
                onValueChange={setHeroSliderVal}
                size="sm"
                aria-label="Surface Tone Slider"
              />
            </div>

            {/* 8. Architecture Badges */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Badge tone="accent" size="sm">SSR Clean</Badge>
              <Badge tone="neutral" size="sm">Zero CSS-in-JS</Badge>
              <Badge tone="accent" size="sm">34KB Core</Badge>
            </div>

            {/* 9. Target Selector */}
            <ButtonGroup size="sm" variant="outline" style={{ width: "100%" }}>
              <Button style={{ flex: 1 }}>Web DOM</Button>
              <Button style={{ flex: 1 }}>React Native</Button>
            </ButtonGroup>

            {/* 10. Tactile Cadence */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span>Cadence</span>
                <span style={{ color: "var(--x-accent)", fontFamily: "var(--x-font-family-mono)" }}>160ms</span>
              </div>
              <Slider min={80} max={320} step={20} defaultValue={160} size="sm" aria-label="Cadence" />
            </div>

            {/* 11. Filter Input */}
            <Input placeholder="Filter primitives..." size="sm" clearable />

            {/* 12. Switch with Live Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)" }}>Turbopack SSR</span>
              <Switch defaultChecked size="sm" aria-label="Turbopack SSR" />
            </div>

            {/* 13. Mode Segmented Control */}
            <SegmentedControl
              options={[
                { value: "hairline", label: "Hairline" },
                { value: "fluid", label: "Fluid" },
              ]}
              defaultValue="hairline"
              size="sm"
              fullWidth
            />

            {/* 14. Architecture Tabs */}
            <Tabs defaultValue="ast" style={{ width: "100%" }}>
              <TabsList style={{ width: "100%" }}>
                <TabsTrigger value="ast">AST</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="specs">Specs</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 15. Checkbox Duo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <Checkbox defaultChecked size="sm" label="Strict Invariants" />
              <Checkbox defaultChecked size="sm" label="Zero Emoji Rule" />
            </div>

            {/* 16. Action Pill Row */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Button variant="subtle" size="sm" style={{ flex: 1 }}>Generate</Button>
              <IconButton ariaLabel="Sparkle action" variant="outline" size="sm">
                <SparkleIcon size="sm" />
              </IconButton>
            </div>
          </div>

          {/* ─── COLUMN 4: Tactile Primitives & Live Metrics ─── */}
          <div className="hero-col hero-col-even hero-col-tablet-plus">
            {/* 1. Switch with live status indicator */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <Switch
                size="sm"
                checked={workbenchHaptics}
                onCheckedChange={setWorkbenchHaptics}
                label="Fluid Kinematics"
              />
              <Badge tone={workbenchHaptics ? "accent" : "neutral"} size="sm">
                {workbenchHaptics ? "Damped Soft" : "Rigid"}
              </Badge>
            </div>

            {/* 2. Sub-pixel Platform Group */}
            <ButtonGroup size="sm" variant="subtle" style={{ width: "100%" }}>
              <Button>Web DOM</Button>
              <Button variant="filled">React Native</Button>
              <Button>Expo</Button>
            </ButtonGroup>

            {/* 3. Checkbox Duo */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "4px 2px" }}>
              <Checkbox
                checked={heroCheckboxA}
                onCheckedChange={setHeroCheckboxA}
                label="Concentric Arcs"
                size="sm"
              />
              <Checkbox
                checked={heroCheckboxB}
                onCheckedChange={setHeroCheckboxB}
                label="AMOLED Pitch"
                size="sm"
              />
            </div>

            {/* 4. Avatar Cluster & Parity Badges */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Ashwin" />
                <Avatar name="Elena" />
                <Avatar name="Nova" />
                <Avatar name="Core" />
              </AvatarGroup>
              <Badge tone="neutral" size="sm">30+ Primitives</Badge>
            </div>

            {/* 5. Mathematical Formula Badge */}
            <div
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "12px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
                color: "var(--x-accent)",
                letterSpacing: "-0.01em",
              }}
            >
              r = max(0, R − P)
            </div>

            {/* 6. Dual Action Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Execute</Button>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>Verify</Button>
            </div>

            {/* 7. Sub-pixel Dirac Vector Chip */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontSize: "11px",
                fontFamily: "var(--x-font-family-mono)",
                color: "var(--x-text-muted)",
              }}
            >
              <span>Hairline Caliper</span>
              <span style={{ color: "var(--x-accent)" }}>1.000px</span>
            </div>

            {/* 8. Target Platform Tabs */}
            <Tabs defaultValue="web" style={{ width: "100%" }}>
              <TabsList style={{ width: "100%" }}>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="native">Expo</TabsTrigger>
                <TabsTrigger value="core">Core</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 9. Token Input */}
            <Input
              prefix={<SlidersIcon size="sm" />}
              placeholder="--x-accent override"
              size="sm"
            />

            {/* 10. Commit Row */}
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Commit</Button>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>Revert</Button>
            </div>

            {/* 11. Status Chip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 10px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--x-accent)" }} />
              <span>Hairline Engine · OK</span>
            </div>

            {/* 12. Dual Switches in Surface Box */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <Switch size="sm" defaultChecked label="Zero Box-Shadow" />
              <Badge tone="neutral" size="sm">Pure</Badge>
            </div>

            {/* 13. Friction Slider */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span>Spring Friction</span>
                <span style={{ color: "var(--x-accent)", fontFamily: "var(--x-font-family-mono)" }}>30</span>
              </div>
              <Slider min={10} max={60} step={5} defaultValue={30} size="sm" aria-label="Spring Friction" />
            </div>

            {/* 14. Controls Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Core</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Web</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Button</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 15. Target Button Group */}
            <ButtonGroup size="sm" variant="outline" style={{ width: "100%" }}>
              <Button style={{ flex: 1 }}>Expo</Button>
              <Button style={{ flex: 1 }}>DOM</Button>
            </ButtonGroup>

            {/* 16. Search Primitives Input */}
            <Input placeholder="Search primitives..." size="sm" />
          </div>

          {/* ─── COLUMN 5: Optics, Geometry & Layout ─── */}
          <div className="hero-col hero-col-odd hero-col-desktop">
            {/* 1. Checkbox Pair with Status */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "4px 2px" }}>
              <Checkbox
                checked={heroCheckboxC}
                onCheckedChange={setHeroCheckboxC}
                label="Sub-pixel Align"
                size="sm"
              />
              <Checkbox
                checked={heroCheckboxD}
                onCheckedChange={setHeroCheckboxD}
                label="Touch Targets"
                size="sm"
              />
            </div>

            {/* 2. Quick CLI Chip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <span style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "11px", color: "var(--x-text-muted)" }}>
                CLI Sync
              </span>
              <Badge tone="neutral" size="sm">v1.0.0</Badge>
            </div>

            {/* 3. Hairline Inspect Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <Switch
                size="sm"
                checked={inspectHairline}
                onCheckedChange={setInspectHairline}
                label="Inspect Caliper"
              />
              <Badge tone={inspectHairline ? "accent" : "neutral"} size="sm">
                {inspectHairline ? "1.00px Active" : "Off"}
              </Badge>
            </div>

            {/* 4. Segmented Control Mode */}
            <SegmentedControl
              options={[
                { value: "web", label: "Web DOM" },
                { value: "native", label: "React Native" },
              ]}
              value={heroPlatform}
              onValueChange={setHeroPlatform}
              size="sm"
              fullWidth
            />

            {/* 5. Action Pills & Icon Row */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Commit</Button>
              <IconButton ariaLabel="Sparkle action" variant="outline" size="sm">
                <SparkleIcon size="sm" />
              </IconButton>
              <Badge tone="accent">v1.0</Badge>
            </div>

            {/* 6. Secondary Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Core</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Tokens</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Hairline</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 7. Metric Badges */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Badge tone="accent">Zero Shadows</Badge>
              <Badge tone="neutral">0 Gradients</Badge>
              <Badge tone="neutral">Pure Vector</Badge>
            </div>

            {/* 8. View Mode Group */}
            <ButtonGroup size="sm" variant="subtle" style={{ width: "100%", display: "flex" }}>
              <Button style={{ flex: 1 }}>Design</Button>
              <Button style={{ flex: 1 }}>Code</Button>
              <Button style={{ flex: 1 }}>Tokens</Button>
            </ButtonGroup>

            {/* 9. Tactile Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)" }}>Haptic Feedback</span>
              <Switch defaultChecked size="sm" aria-label="Haptic Feedback" />
            </div>

            {/* 10. Formula Pill */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <Badge tone="accent" size="sm">R_outer = R_inner + P</Badge>
              <Badge tone="neutral" size="sm">Euler Arc</Badge>
            </div>

            {/* 11. Export Action */}
            <Button variant="outline" size="sm" style={{ width: "100%" }}>Export JSON Schema</Button>

            {/* 12. Input with Prefix Icon */}
            <Input
              prefix={<MagnifyingGlassIcon size="sm" />}
              placeholder="Search guidelines..."
              size="sm"
            />

            {/* 13. System Segmented Control */}
            <SegmentedControl
              options={[
                { value: "apple", label: "Apple HIG" },
                { value: "xenon", label: "Xenon v1" },
              ]}
              defaultValue="xenon"
              size="sm"
              fullWidth
            />

            {/* 14. Motion Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)" }}>Haptic Feedback</span>
              <Switch defaultChecked size="sm" aria-label="Haptic Feedback" />
            </div>

            {/* 15. Avatar Cluster */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Kobe" />
                <Avatar name="Shaq" />
                <Avatar name="Phil" />
              </AvatarGroup>
              <Badge tone="accent" size="sm">4 Maintainers</Badge>
            </div>

            {/* 16. Action Duo */}
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Lint Code</Button>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>Fix All</Button>
            </div>
          </div>

          {/* ─── COLUMN 6: Parity & Engine Contracts ─── */}
          <div className="hero-col hero-col-even hero-col-desktop-wide">
            {/* 1. Deploy / Rollback Duo */}
            <div style={{ display: "flex", gap: "8px", width: "100%" }}>
              <Button variant="filled" size="sm" style={{ flex: 1 }}>Deploy</Button>
              <Button variant="subtle" size="sm" style={{ flex: 1 }}>Rollback</Button>
            </div>

            {/* 2. Tabs Cluster */}
            <Tabs defaultValue="web" style={{ width: "100%" }}>
              <TabsList style={{ width: "100%", display: "flex" }}>
                <TabsTrigger value="web" style={{ flex: 1 }}>Web</TabsTrigger>
                <TabsTrigger value="expo" style={{ flex: 1 }}>Expo</TabsTrigger>
                <TabsTrigger value="macos" style={{ flex: 1 }}>macOS</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 3. Strict Types Badges Container */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <Badge tone="accent" size="sm">Strict Types</Badge>
              <Badge tone="neutral" size="sm">0 Any</Badge>
              <Badge tone="neutral" size="sm">101 Tests</Badge>
            </div>

            {/* 4. Sub-pixel Reticle Target Box */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                color: "var(--x-text-muted)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <span>Reticle Target</span>
              <span style={{ color: "var(--x-accent)" }}>[x: 144, y: 88]</span>
            </div>

            {/* 5. Avatar Cluster & Status Box */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
                overflow: "hidden",
              }}
            >
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Alpha" />
                <Avatar name="Beta" />
                <Avatar name="Gamma" />
              </AvatarGroup>
              <Badge tone="accent" size="sm">Synced 100%</Badge>
            </div>

            {/* 6. Monospace Test Suite Chip */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 12px",
                borderRadius: "var(--x-radius-control, 8px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11.5px",
                color: "var(--x-accent)",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <ShieldCheckIcon size="sm" color="var(--x-accent)" />
              <span>101/101 Tests Passing</span>
            </div>

            {/* 7. Button Group Pill */}
            <ButtonGroup size="sm" variant="subtle" style={{ width: "100%", display: "flex" }}>
              <Button style={{ flex: 1 }}>Tokens</Button>
              <Button style={{ flex: 1 }}>Components</Button>
            </ButtonGroup>

            {/* 8. Safe Mode Switch */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)" }}>Strict Rails</span>
              <Switch defaultChecked size="sm" aria-label="Strict Rails" />
            </div>

            {/* 9. Micro Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">AST</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Validator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* 10. Sync Action */}
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="outline" size="sm" style={{ flex: 1 }}>Sync</Button>
              <Button variant="subtle" size="sm" style={{ flex: 1 }}>Audit</Button>
            </div>

            {/* 11. Final Metric */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
                color: "var(--x-accent)",
              }}
            >
              <span>100% Deterministic</span>
            </div>

            {/* 12. Mass Slider */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--x-text-muted)" }}>
                <span>Physics Mass</span>
                <span style={{ color: "var(--x-accent)", fontFamily: "var(--x-font-family-mono)" }}>1.00</span>
              </div>
              <Slider min={0.5} max={3.0} step={0.25} defaultValue={1.0} size="sm" aria-label="Physics Mass" />
            </div>

            {/* 13. Typography Segmented Control */}
            <SegmentedControl
              options={[
                { value: "sans", label: "Sans" },
                { value: "mono", label: "Mono" },
              ]}
              defaultValue="mono"
              size="sm"
              fullWidth
            />

            {/* 14. Strict Type Switch Box */}
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
              }}
            >
              <Switch size="sm" defaultChecked label="Strict Null Checks" />
              <Badge tone="accent" size="sm">No Any</Badge>
            </div>

            {/* 15. Engine Spec Tabs */}
            <Tabs defaultValue="spec" style={{ width: "100%" }}>
              <TabsList style={{ width: "100%" }}>
                <TabsTrigger value="spec">Spec</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="bench">Bench</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 16. Action Pill Row */}
            <ButtonGroup size="sm" variant="subtle" style={{ width: "100%", display: "flex" }}>
              <Button style={{ flex: 1 }}>Lint</Button>
              <Button style={{ flex: 1 }}>Format</Button>
              <Button style={{ flex: 1 }}>Build</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>

    <Divider style={{ width: "100%", maxWidth: "1240px" }} />

      {/* ─────────────────────────────────────────────────────────────
          ACT I: WORKFLOW & ECOSYSTEM
          01. Agent Guardrails (Deterministic Rails for AI)
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "96px 24px 48px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Act I Group Header Banner */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "56px", textAlign: "center", alignItems: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--x-accent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--x-accent)",
              }}
            >
              Act I · Architecture &amp; Agent Ecosystem
            </span>
          </div>
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)", letterSpacing: "-0.035em", margin: 0 }}>
            Deterministic rails for the agent era.
          </Heading>
          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "680px", fontSize: "1.1rem", lineHeight: 1.6, margin: 0 }}>
            AI models write brilliant logic but hallucinate atrocious CSS. Xenon gives models strict architectural
            rails: finite token scales, exhaustive types, and zero mystery blur.
          </Text>
        </div>

        {/* 01: Agent Guardrails Split Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left Narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                01 / Agent Determinism
              </span>
            </div>

            <Heading level={3} weight={300} style={{ fontSize: "1.75rem", letterSpacing: "-0.02em", margin: 0 }}>
              The UI kit your AI can’t break.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Prompting Cursor, Claude, or Copilot for UI usually results in 25 arbitrary Tailwind utility classes,
              hallucinated hex values, and 48px blur mud that breaks in production. Xenon replaces prompt roulette with
              rigid type contracts. The model physically cannot invent unauthorized styles.
            </Text>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckIcon size="sm" color="var(--x-accent)" />
                <span style={{ fontSize: "14px", color: "var(--x-text)" }}>Strict finite token grammar — no rogue hexes or blur</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckIcon size="sm" color="var(--x-accent)" />
                <span style={{ fontSize: "14px", color: "var(--x-text)" }}>Exhaustive TypeScript types in *.types.ts with zero any</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckIcon size="sm" color="var(--x-accent)" />
                <span style={{ fontSize: "14px", color: "var(--x-text)" }}>Mathematical concentricity baked directly into every surface</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Comparison Workbench */}
          <Surface
            variant="subtle"
            padding={24}
            style={{
              borderRadius: "var(--x-radius-surface, 16px)",
              border: "1px solid var(--x-border)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* View Switcher Tabs */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CpuIcon size="sm" color="var(--x-accent)" />
                <span style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--x-text-muted)" }}>
                  Prompt Execution
                </span>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <Button
                  variant={guardrailTab === "xenon" ? "filled" : "subtle"}
                  size="sm"
                  onClick={() => setGuardrailTab("xenon")}
                >
                  With Xenon Rails
                </Button>
                <Button
                  variant={guardrailTab === "hallucination" ? "outline" : "subtle"}
                  size="sm"
                  onClick={() => setGuardrailTab("hallucination")}
                >
                  Unconstrained AI
                </Button>
              </div>
            </div>

            {guardrailTab === "hallucination" ? (
              /* Simulated AI Hallucination */
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "10px",
                    backgroundColor: "#0d0e12",
                    border: "1px solid rgba(255, 90, 90, 0.3)",
                    fontFamily: "var(--x-font-family-mono)",
                    fontSize: "12px",
                    lineHeight: 1.6,
                    color: "#f87171",
                    overflowX: "auto",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                    {"// Prompt: \"Add an action button for confirming transfer\""}
                  </div>
                  <div>
                    &lt;<span style={{ color: "#fb7185" }}>button</span> <span style={{ color: "#cbd5e1" }}>className</span>=
                    <span style={{ color: "#fca5a5" }}>
                      &quot;bg-[#1a1c22] hover:bg-[#252830] text-[#9df2ea] px-[24px] py-[11px] rounded-[19px] shadow-[0_12px_36px_rgba(0,0,0,0.45)] border border-[#2f3542] text-[15px] font-semibold&quot;
                    </span>
                    &gt;
                  </div>
                  <div style={{ paddingLeft: "16px", color: "#f8fafc" }}>Authorize Payment</div>
                  <div>&lt;/<span style={{ color: "#fb7185" }}>button</span>&gt;</div>
                </div>

                {/* Warning flags */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#f87171" }}>
                    <span>× Arbitrary unverified hex (#1a1c22, #9df2ea)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#f87171" }}>
                    <span>× Uncalculated 19px radius (swollen egg modal inside cards)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#f87171" }}>
                    <span>× 36px Gaussian drop-shadow mud (violates flat depth)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#f87171" }}>
                    <span>× 0 compile-time types or design system invariants</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Deterministic Xenon Execution */
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "10px",
                    backgroundColor: "var(--x-surface-2)",
                    border: "1px solid var(--x-border)",
                    fontFamily: "var(--x-font-family-mono)",
                    fontSize: "12.5px",
                    lineHeight: 1.6,
                    color: "var(--x-accent)",
                    overflowX: "auto",
                  }}
                >
                  <div style={{ color: "var(--x-text-muted)", marginBottom: "6px" }}>
                    {"// Prompt: \"Add an action button for confirming transfer\""}
                  </div>
                  <div>
                    &lt;<span style={{ color: "var(--x-accent)" }}>Button</span> <span style={{ color: "var(--x-text)" }}>variant</span>=&quot;filled&quot; <span style={{ color: "var(--x-text)" }}>size</span>=&quot;md&quot;&gt;
                  </div>
                  <div style={{ paddingLeft: "16px", color: "var(--x-text)" }}>Authorize Payment</div>
                  <div>&lt;/<span style={{ color: "var(--x-accent)" }}>Button</span>&gt;</div>
                </div>

                {/* Rendered Live Preview */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "var(--x-radius-control, 10px)",
                    border: "1px solid var(--x-border)",
                    backgroundColor: "var(--x-surface)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "13px", color: "var(--x-text)" }}>Live Output</span>
                    <span style={{ fontSize: "11px", color: "var(--x-text-muted)" }}>Token-bound &amp; type-checked</span>
                  </div>
                  <Button variant="filled" size="md">
                    Authorize Payment
                  </Button>
                </div>

                {/* Success badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <Badge tone="accent">✓ 100% Type-Safe</Badge>
                  <Badge tone="neutral">✓ 1.00px Hairline</Badge>
                  <Badge tone="neutral">✓ Concentric Radius</Badge>
                  <Badge tone="neutral">✓ Zero Hallucinations</Badge>
                </div>
              </div>
            )}
          </Surface>
        </div>
      </ScrollSection>

      {/* ─────────────────────────────────────────────────────────────
          ACT I: WORKFLOW & ECOSYSTEM
          02. Dual Engine: Registry + Headless Core
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "48px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left Narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                02 / Architecture &amp; Distribution
              </span>
            </div>

            <Heading level={3} weight={300} style={{ fontSize: "1.75rem", letterSpacing: "-0.02em", margin: 0 }}>
              Own your code. Keep the foundation.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Traditional UI kits force a painful choice: NPM packages lock your UI in a closed black box where you
              can’t modify internal markup, while raw copy-paste templates rot over time without an upstream engine.
              Xenon solves this with a clean dual architecture.
            </Text>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "8px" }}>
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "var(--x-radius-control, 10px)",
                  border: "1px solid var(--x-border)",
                  backgroundColor: "var(--x-surface-2)",
                }}
              >
                <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "12px", color: "var(--x-accent)", marginBottom: "4px" }}>
                  @xenon/core · The Invariant Engine
                </div>
                <div style={{ fontSize: "13px", color: "var(--x-text-muted)", lineHeight: 1.5 }}>
                  Sub-pixel hairline math, concentric clamp formulas, spring kinematics, and headless logic remain centralized and unshakeable.
                </div>
              </div>

              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "var(--x-radius-control, 10px)",
                  border: "1px solid var(--x-border)",
                  backgroundColor: "var(--x-surface-2)",
                }}
              >
                <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "12px", color: "var(--x-text)", marginBottom: "4px" }}>
                  npx xenon add &lt;primitive&gt; · Registry Ownership
                </div>
                <div style={{ fontSize: "13px", color: "var(--x-text-muted)", lineHeight: 1.5 }}>
                  Drops fully typed, unminified source code directly into your repository. You own every line, customize freely, and never deal with vendor lock-in.
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Registry Terminal */}
          <Surface
            variant="subtle"
            padding={24}
            style={{
              borderRadius: "var(--x-radius-surface, 16px)",
              border: "1px solid var(--x-border)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Component Picker Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "11px", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                Select Registry Primitive
              </span>
              <Badge tone="accent" size="sm">CLI Registry</Badge>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(["button", "segmented-control", "slider", "switch", "tabs"] as const).map((item) => (
                <Button
                  key={item}
                  variant={selectedRegistryItem === item ? "filled" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRegistryItem(item)}
                >
                  {item}
                </Button>
              ))}
            </div>

            {/* Live Copy Command Bar */}
            <div
              onClick={() => handleCopyRegistry(selectedRegistryItem)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCopyRegistry(selectedRegistryItem);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 18px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface)",
                cursor: "pointer",
                transition: "border-color 160ms ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <TerminalIcon size="sm" color="var(--x-accent)" />
                <span style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "13px", color: "var(--x-accent)" }}>
                  $ npx xenon add {selectedRegistryItem}
                </span>
              </div>
              <span style={{ color: "var(--x-text-muted)", display: "flex", alignItems: "center" }}>
                {copiedRegistryCmd ? <CheckIcon size="sm" color="var(--x-accent)" /> : <CopyIcon size="sm" />}
              </span>
            </div>

            {/* Architecture Directory Visualizer */}
            <div
              style={{
                padding: "16px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "12px",
                lineHeight: 1.7,
                color: "var(--x-text)",
              }}
            >
              <div style={{ color: "var(--x-text-muted)", marginBottom: "4px" }}># Your Project Tree:</div>
              <div>├── <span style={{ color: "var(--x-text-muted)" }}>node_modules/</span>@xenon/core <span style={{ color: "var(--x-accent)" }}>(headless physics &amp; math)</span></div>
              <div>└── <span style={{ color: "var(--x-text-muted)" }}>components/ui/</span></div>
              <div style={{ paddingLeft: "16px", color: "var(--x-accent)" }}>
                └── {selectedRegistryItem}.tsx <span style={{ color: "var(--x-text-muted)" }}>(your editable source)</span>
              </div>
              <div style={{ paddingLeft: "16px", color: "var(--x-accent)" }}>
                └── {selectedRegistryItem}.types.ts <span style={{ color: "var(--x-text-muted)" }}>(100% strict types)</span>
              </div>
            </div>
          </Surface>
        </div>
      </ScrollSection>

      {/* ─────────────────────────────────────────────────────────────
          ACT I: WORKFLOW & ECOSYSTEM
          03. Two-Token Global Customization Studio
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "48px 24px 96px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left Narrative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                03 / Instant Customization
              </span>
            </div>

            <Heading level={3} weight={300} style={{ fontSize: "1.75rem", letterSpacing: "-0.02em", margin: 0 }}>
              Two variables. Infinite coherent brands.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              No 300-variable CSS theme files. No sprawling configuration files. Xenon is configured with strictly two
              global knobs: 1 Accent Hue and 1 Radius Stop Scale (0 Sharp to 6 Pill). Every child radius, hairline border,
              and focus state updates coherently across Web and Expo while preserving concentric curvature.
            </Text>

            {/* Accent Palette Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>
                <span>ACCENT COLOR (1 OF 6)</span>
                <span style={{ color: "var(--x-accent)", textTransform: "uppercase" }}>{accent}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {ACCENT_OPTIONS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onAccentChange(item.key)}
                    aria-label={`Select ${item.label} accent`}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      outline: accent === item.key ? "2px solid var(--x-accent)" : "1px solid var(--x-border)",
                      outlineOffset: "2px",
                      transform: accent === item.key ? "scale(1.15)" : "scale(1)",
                      transition: "transform 140ms ease, outline-color 140ms ease",
                    }}
                    title={item.label}
                  />
                ))}
              </div>
            </div>

            {/* Radius Stop Slider Control */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>
                <span>GLOBAL RADIUS STOP</span>
                <span style={{ color: "var(--x-accent)" }}>
                  Stop {radius}: {radius === 0 ? "0 Sharp" : radius === 6 ? "6 Pill" : `${radius * 4}px`}
                </span>
              </div>
              <Slider
                min={0}
                max={6}
                step={1}
                value={radius}
                onValueChange={(val) => onRadiusChange(val as RadiusStop)}
                size="md"
                aria-label="Global Radius Stop Scale"
              />
            </div>
          </div>

          {/* Right Live Morphing Workbench Card */}
          <Surface
            variant="subtle"
            padding={24}
            style={{
              borderRadius: "var(--x-radius-surface, 16px)",
              border: "1px solid var(--x-border)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "11px", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                Live System Morph
              </span>
              <Badge tone="accent">Concentric Locked</Badge>
            </div>

            {/* Segmented Control */}
            <SegmentedControl
              options={[
                { value: "0", label: "Overview" },
                { value: "1", label: "Analytics" },
                { value: "2", label: "Settings" },
              ]}
              defaultValue="0"
              size="sm"
              fullWidth
            />

            {/* Grouped Capsule Action Buttons */}
            <ButtonGroup size="md" variant="outline" style={{ width: "100%", display: "flex" }}>
              <Button variant="filled" style={{ flex: 1 }}>Compile</Button>
              <Button style={{ flex: 1 }}>Inspect</Button>
              <Button style={{ flex: 1 }}>Deploy</Button>
            </ButtonGroup>

            {/* Interactive Form Field */}
            <Input
              placeholder="Instant theme reactive input..."
              clearable
              size="sm"
              suffix={<Badge tone="neutral" size="sm">⌘K</Badge>}
            />

            {/* Switch & Badge Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: "var(--x-radius-control, 10px)",
                border: "1px solid var(--x-border)",
                backgroundColor: "var(--x-surface-2)",
              }}
            >
              <Switch size="sm" defaultChecked label="Concentric Geometry" />
              <Badge tone="accent">r = max(0, R − P)</Badge>
            </div>
          </Surface>
        </div>
      </ScrollSection>

      <Divider style={{ width: "100%", maxWidth: "1240px" }} />

      {/* ─────────────────────────────────────────────────────────────
          ACT II: MATHEMATICAL FOUNDATIONS & OPTICAL INVARIANTS
          Four physical invariants: Curvature, Hairlines, Kinematics, Focus
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "96px 24px 32px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center", alignItems: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--x-accent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--x-accent)",
              }}
            >
              Act II · Mathematical Foundations &amp; Optical Invariants
            </span>
          </div>
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2.2rem, 4.2vw, 3.4rem)", letterSpacing: "-0.035em", margin: 0 }}>
            Four physical invariants. Zero compromises.
          </Heading>
          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "680px", fontSize: "1.1rem", lineHeight: 1.6, margin: 0 }}>
            Every curve, hairline, and motion curve is derived from mathematical first principles.
            No cosmetic gradients, no murky shadows, no visual clutter.
          </Text>
        </div>
      </ScrollSection>

      {/* ─────────────────────────────────────────────────────────────
          3. DEEP-DIVE CHAPTER 01: CONCENTRICITY VS EGG MODE
          50/50 Split Stage: Left narrative + instrument, Right blueprint
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "32px 24px 48px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: Typographic Narrative + Live Instrument */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--x-accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                Act II · 01 / Concentric Geometry
              </span>
            </div>

            <Heading level={2} weight={200} style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", letterSpacing: "-0.03em", margin: 0 }}>
              No bee-stung corners.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.1rem", lineHeight: 1.55, margin: 0 }}>
              When nested radii copy the parent boundary without subtracting inset padding, inner curves
              swell outward into optical eggs. Xenon computes true parallel arcs where the inner and outer
              curves share the exact same geometric center.
            </Text>

            {/* Live Formula Instrument */}
            <Surface
              variant="subtle"
              padding={20}
              style={{
                borderRadius: "var(--x-radius-surface, 14px)",
                border: "1px solid var(--x-border)",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              {/* Formula Readout Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--x-border)",
                }}
              >
                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                    Outer (R)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "22px", fontWeight: 300, color: "var(--x-text)" }}>
                    {demoParentRadius}px
                  </div>
                </div>

                <div style={{ fontSize: "18px", color: "var(--x-text-muted)", userSelect: "none" }}>−</div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                    Padding (P)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "22px", fontWeight: 300, color: "var(--x-text)" }}>
                    {demoPadding}px
                  </div>
                </div>

                <div style={{ fontSize: "18px", color: "var(--x-text-muted)", userSelect: "none" }}>=</div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-accent)", textTransform: "uppercase" }}>
                    Concentric (r)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "22px", fontWeight: 400, color: "var(--x-accent)" }}>
                    {demoChildRadius}px
                  </div>
                </div>
              </div>

              {/* Slider 1: Parent Radius */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--x-text)" }}>
                  <span>Adjust Outer Radius (R)</span>
                  <span style={{ fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>{demoParentRadius}px</span>
                </div>
                <Slider
                  min={12}
                  max={40}
                  step={2}
                  value={demoParentRadius}
                  onValueChange={setDemoParentRadius}
                  size="sm"
                  aria-label="Outer Radius"
                />
              </div>

              {/* Slider 2: Inset Padding */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--x-text)" }}>
                  <span>Adjust Inset Padding (P)</span>
                  <span style={{ fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>{demoPadding}px</span>
                </div>
                <Slider
                  min={4}
                  max={24}
                  step={2}
                  value={demoPadding}
                  onValueChange={setDemoPadding}
                  size="sm"
                  aria-label="Inset Padding"
                />
              </div>
            </Surface>
          </div>

          {/* Right: Technical Blueprint Illustration */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <EggVsConcentricIllustration parentRadius={demoParentRadius} padding={demoPadding} />
          </div>
        </div>
      </ScrollSection>

      {/* ─────────────────────────────────────────────────────────────
          4. DEEP-DIVE CHAPTER 02: FLAT DEPTH VS MUDDY SHADOWS
          50/50 Split Stage: Left narrative + inspector, Right blueprint
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "48px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: Typographic Narrative + Depth Instrument */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--x-accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                Act II · 02 / Flat Depth Architecture
              </span>
            </div>

            <Heading level={2} weight={200} style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", letterSpacing: "-0.03em", margin: 0 }}>
              Flat depth. No muddy shadows.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.1rem", lineHeight: 1.55, margin: 0 }}>
              {isLight
                ? "CSS box-shadow dirties pristine white canvases with smoggy gray stains. Xenon builds depth purely from 1px hairline edges and stepped paper tone contrast."
                : "CSS box-shadow turns AMOLED blacks into murky gray fuzz. Xenon builds depth purely from 1px hairline edges (StyleSheet.hairlineWidth on native) and stepped tone contrast."}
            </Text>

            {/* Depth Readout Spec */}
            <Surface
              variant="subtle"
              padding={20}
              style={{
                borderRadius: "var(--x-radius-surface, 14px)",
                border: "1px solid var(--x-border)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--x-border)",
                }}
              >
                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                    Legacy Blur (σ)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "22px", fontWeight: 300, color: "var(--x-text-muted)" }}>
                    24px
                  </div>
                </div>

                <div style={{ fontSize: "14px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>vs</div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-accent)", textTransform: "uppercase" }}>
                    Hairline Edge
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "22px", fontWeight: 400, color: "var(--x-accent)" }}>
                    1.00px
                  </div>
                </div>

                <div style={{ fontSize: "14px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)" }}>+</div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text)", textTransform: "uppercase" }}>
                    Luminance Delta
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "22px", fontWeight: 400, color: "var(--x-text)" }}>
                    {isLight ? "+4.3%" : "+6.7%"}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--x-text-muted)", fontWeight: 300 }}>
                  {inspectHairline ? "1.00px vector edge highlighted" : "Vector caliper inspection ready"}
                </span>
                <Button
                  variant={inspectHairline ? "filled" : "outline"}
                  size="sm"
                  onClick={() => setInspectHairline(!inspectHairline)}
                >
                  {inspectHairline ? "Edge Highlighted ✓" : "Inspect 1.00px Hairline"}
                </Button>
              </div>
            </Surface>
          </div>

          {/* Right: Technical Blueprint Illustration */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <MudVsHairlineIllustration isLight={isLight} inspectHairline={inspectHairline} />
          </div>
        </div>
      </ScrollSection>

      {/* ─────────────────────────────────────────────────────────────
          5. DEEP-DIVE CHAPTER 03: FLUID KINEMATICS VS STATE SNAPPING
          50/50 Split Stage: Left narrative + spring trigger, Right blueprint
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "48px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: Typographic Narrative + Spring Instrument */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--x-accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                Act II · 03 / Fluid Kinematics
              </span>
            </div>

            <Heading level={2} weight={200} style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", letterSpacing: "-0.03em", margin: 0 }}>
              Fluid physics. Zero snap.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.1rem", lineHeight: 1.55, margin: 0 }}>
              No UI state transition in Xenon is ever abrupt or instantaneous.
              Disclosures, switches, drawers, and active indicators glide through Apple-grade
              damped harmonic spring physics (stiffness 300, damping 30, mass 1).
            </Text>

            <Surface
              variant="subtle"
              padding={20}
              style={{
                borderRadius: "var(--x-radius-surface, 14px)",
                border: "1px solid var(--x-border)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--x-border)",
                }}
              >
                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                    Stiffness (k)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "20px", fontWeight: 400, color: "var(--x-accent)" }}>
                    300
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                    Damping (c)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "20px", fontWeight: 400, color: "var(--x-accent)" }}>
                    30
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                    Mass (m)
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "20px", fontWeight: 400, color: "var(--x-accent)" }}>
                    1.0
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "10px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text)", textTransform: "uppercase" }}>
                    Press Scale
                  </div>
                  <div style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "20px", fontWeight: 400, color: "var(--x-text)" }}>
                    0.98
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--x-text-muted)", fontWeight: 300 }}>
                  Release spring physics trace
                </span>
                <Button
                  variant={springActive ? "filled" : "outline"}
                  size="sm"
                  onClick={() => setSpringActive(!springActive)}
                >
                  {springActive ? "Spring Discharged ✓" : "Trigger Spring Wave"}
                </Button>
              </div>
            </Surface>
          </div>

          {/* Right: Technical Blueprint Illustration */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <JoltVsButterIllustration active={springActive} />
          </div>
        </div>
      </ScrollSection>

      {/* ─────────────────────────────────────────────────────────────
          6. DEEP-DIVE CHAPTER 04: ONE ACCENT VS VISUAL NOISE
          50/50 Split Stage: Left narrative + palette switches, Right blueprint
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "48px 24px 96px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "48px",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: Typographic Narrative + Accent Switchers */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--x-accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--x-font-family-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--x-text-muted)",
                }}
              >
                Act II · 04 / Directed Affordance
              </span>
            </div>

            <Heading level={2} weight={200} style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", letterSpacing: "-0.03em", margin: 0 }}>
              One sharp accent. Calm canvas.
            </Heading>

            <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.1rem", lineHeight: 1.55, margin: 0 }}>
              90% calm neutral architecture, 10% laser focal draw. In accordance with Don Norman&apos;s
              signifier principle, interactive affordances must never compete for ocular saccades.
              One global acid accent draws the eye decisively to the primary task.
            </Text>

            {/* Interactive Color Switcher Bar */}
            <Surface
              variant="subtle"
              padding={20}
              style={{
                borderRadius: "var(--x-radius-surface, 14px)",
                border: "1px solid var(--x-border)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontFamily: "var(--x-font-family-mono)", color: "var(--x-text-muted)", textTransform: "uppercase" }}>
                  Active Accent Swatch
                </span>
                <span style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "12px", color: "var(--x-accent)", textTransform: "capitalize" }}>
                  {accent}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {ACCENT_OPTIONS.map((item) => {
                  const isActive = accent === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onAccentChange(item.key)}
                      aria-label={`Select ${item.label} accent`}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        outline: isActive ? "2px solid var(--x-accent)" : "none",
                        outlineOffset: "3px",
                        transform: isActive ? "scale(1.2)" : "scale(1)",
                        transition: "transform 140ms ease, outline 140ms ease",
                      }}
                      title={item.label}
                    />
                  );
                })}
              </div>

              {onAmoledChange && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--x-border)",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--x-text-muted)" }}>
                    Canvas Depth
                  </span>
                  <Button
                    variant={amoled ? "subtle" : "ghost"}
                    size="sm"
                    onClick={() => onAmoledChange(!amoled)}
                    style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "11px" }}
                  >
                    {amoled ? "AMOLED Pitch Black (#000)" : "Warm Charcoal (#181816)"}
                  </Button>
                </div>
              )}
            </Surface>
          </div>

          {/* Right: Technical Blueprint Illustration */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <ClownCarVsAccentIllustration />
          </div>
        </div>
      </ScrollSection>

      <Divider style={{ width: "100%", maxWidth: "1240px" }} />

      {/* ─────────────────────────────────────────────────────────────
          7. ISOMORPHIC PARITY (WEB + EXPO)
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "96px 24px",
          maxWidth: "1240px",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <Stack gap={20} align="center">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--x-accent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--x-accent)",
              }}
            >
              Act III · Cross-Platform Parity
            </span>
          </div>

          <Heading level={2} weight={200} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            One token core. Identical contracts.
          </Heading>

          <Text
            styleKey="body"
            tone="muted"
            weight={300}
            style={{ maxWidth: "620px", fontSize: "1.1rem", lineHeight: 1.55 }}
          >
            Every component ships with identical prop interfaces across Web React DOM and React Native Expo.
            Shared mathematical formulas live in <code style={{ color: "var(--x-accent)" }}>@xenon/core</code>.
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              width: "100%",
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <Surface variant="subtle" padding={20} style={{ border: "1px solid var(--x-border)" }}>
              <Text styleKey="caption1" tone="muted" style={{ marginBottom: "8px", display: "block" }}>
                Web (React DOM)
              </Text>
              <CodeBlock
                code={`import { Button, ButtonGroup } from "@xenon/web";\n\n<ButtonGroup size="md">\n  <Button variant="outline">Inspect</Button>\n  <Button variant="filled">Launch</Button>\n</ButtonGroup>`}
                language="typescript"
                showLineNumbers={false}
              />
            </Surface>

            <Surface variant="subtle" padding={20} style={{ border: "1px solid var(--x-border)" }}>
              <Text styleKey="caption1" tone="muted" style={{ marginBottom: "8px", display: "block" }}>
                Native (Expo React Native)
              </Text>
              <CodeBlock
                code={`import { Button, ButtonGroup } from "@xenon/native";\n\n<ButtonGroup size="md">\n  <Button variant="outline">Inspect</Button>\n  <Button variant="filled">Launch</Button>\n</ButtonGroup>`}
                language="typescript"
                showLineNumbers={false}
              />
            </Surface>
          </div>
        </Stack>
      </ScrollSection>

      <Divider style={{ width: "100%", maxWidth: "1240px" }} />

      {/* ─────────────────────────────────────────────────────────────
          8. CALM CLOSING CTA
      ────────────────────────────────────────────────────────────── */}
      <ScrollSection
        style={{
          padding: "96px 24px 120px 24px",
          maxWidth: "800px",
          width: "100%",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <Stack gap={24} align="center">
          <Heading level={2} weight={200} style={{ fontSize: "2.75rem", letterSpacing: "-0.03em" }}>
            Ready to get your weekends back?
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
            Free forever for open source contributors, students, and personal builders worldwide.
            $5/month for commercial teams. Zero vendor lock-in.
          </Text>

          <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/docs/components" style={{ textDecoration: "none" }}>
              <Button variant="filled" size="lg">
                Browse 30+ Components →
              </Button>
            </Link>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <Button variant="outline" size="lg">
                View Pricing ($0 / $5)
              </Button>
            </Link>
          </div>
        </Stack>
      </ScrollSection>
    </div>
  );
}
