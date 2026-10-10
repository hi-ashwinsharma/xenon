"use client";

import React, { useState, type ReactElement } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  CodeBlock,
  Divider,
  Heading,
  SegmentedControl,
  Slider,
  Stack,
  Surface,
  Text,
} from "@xenon/web";
import type { Accent, RadiusStop, Theme } from "@xenon/tokens";
import {
  ClownCarVsAccentIllustration,
  EggVsConcentricIllustration,
  JoltVsButterIllustration,
  MudVsHairlineIllustration,
} from "./LineArtIllustrations";
import { CheckIcon, CopyIcon } from "./Icons";

interface MarketingLandingProps {
  theme?: Theme;
  accent: Accent;
  radius: RadiusStop;
  amoled?: boolean;
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

export function MarketingLanding({
  theme = "dark",
  accent,
  radius,
  amoled = true,
  onAccentChange,
  onRadiusChange,
  onAmoledChange,
}: MarketingLandingProps): ReactElement {
  const [copiedInit, setCopiedInit] = useState(false);
  const [demoParentRadius, setDemoParentRadius] = useState<number>(28);
  const [demoPadding, setDemoPadding] = useState<number>(16);
  const [springActive, setSpringActive] = useState<boolean>(false);

  const demoChildRadius = Math.max(0, demoParentRadius - demoPadding);

  const handleCopyInit = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("npx xenon init");
      setCopiedInit(true);
      setTimeout(() => setCopiedInit(false), 2000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "var(--x-bg)",
        color: "var(--x-text)",
        transition:
          "background-color var(--x-dur-base) ease, color var(--x-dur-base) ease",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 1: HERO
          Clean, majestic, open developer truth.
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px 96px 24px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Stack gap={28} align="center">
          <Heading
            level={1}
            weight={200}
            style={{
              fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              maxWidth: "920px",
            }}
          >
            Your Friday night shouldn't be spent nudging a modal that looks like an egg.
          </Heading>

          <Text
            styleKey="body"
            tone="muted"
            weight={300}
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.35rem)",
              lineHeight: 1.5,
              maxWidth: "680px",
            }}
          >
            The hairline-crisp, zero-gradient UI kit engineered for humans and AI.
            Mathematical concentric curves, pure flat depth, and zero abrupt state snaps.
          </Text>

          {/* Quickstart snippet */}
          <div
            onClick={handleCopyInit}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "var(--x-radius-control, 12px)",
              border: "1px solid var(--x-border)",
              backgroundColor: "var(--x-surface-2)",
              cursor: "pointer",
              transition:
                "border-color var(--x-dur-base) ease, transform 180ms cubic-bezier(0.2, 0, 0, 1), border-radius var(--x-dur-base) ease",
            }}
          >
            <span
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "14px",
                color: "var(--x-accent)",
              }}
            >
              $ npx xenon init
            </span>
            <span style={{ color: "var(--x-text-muted)", display: "flex", alignItems: "center" }}>
              {copiedInit ? <CheckIcon size="sm" color="var(--x-accent)" /> : <CopyIcon size="sm" />}
            </span>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "14px", marginTop: "8px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/docs/components" style={{ textDecoration: "none" }}>
              <Button variant="filled" size="lg">
                Explore 30+ Components →
              </Button>
            </Link>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <Button variant="outline" size="lg">
                View Pricing ($0 / $5)
              </Button>
            </Link>
          </div>
        </Stack>
      </section>

      <Divider style={{ width: "100%", maxWidth: "1040px" }} />

      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 2: CONCENTRICITY VS EGG CORNER
          Unboxed, spacious, visual-first Apple-grade stage.
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 24px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Stack gap={16} align="center" style={{ marginBottom: "40px" }}>
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            Nested math. No optical eggs.
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "640px", fontSize: "1.125rem", lineHeight: 1.55 }}>
            When an inner button copies its parent card's radius, the corners warp into awkward egg bulges.
            Xenon computes concentric radii automatically across both web and native.
          </Text>
        </Stack>

        {/* Expansive Unboxed Architectural Blueprint Stage */}
        <div style={{ width: "100%", maxWidth: "800px", marginBottom: "36px" }}>
          <EggVsConcentricIllustration />
        </div>

        {/* Live Interactive Concentricity Math Controller */}
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            padding: "20px 24px",
            borderRadius: "var(--x-radius-surface, 16px)",
            border: "1px solid var(--x-border)",
            backgroundColor: "var(--x-surface-2)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            textAlign: "left",
            transition: "border-radius var(--x-dur-base) ease, border-color var(--x-dur-base) ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--x-font-family-mono)",
                fontSize: "13px",
                color: "var(--x-accent)",
              }}
            >
              R_child = Math.max(0, R_parent − padding)
            </span>
            <Badge tone="accent" size="sm">
              Concentric: {demoChildRadius}px
            </Badge>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <Text styleKey="caption1" tone="muted">Parent Radius: {demoParentRadius}px</Text>
              </div>
              <Slider min={12} max={40} step={2} value={demoParentRadius} onValueChange={setDemoParentRadius} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <Text styleKey="caption1" tone="muted">Padding: {demoPadding}px</Text>
              </div>
              <Slider min={4} max={24} step={2} value={demoPadding} onValueChange={setDemoPadding} />
            </div>
          </div>

          {/* Realtime Global Platform Radius Selector */}
          <div style={{ borderTop: "1px solid var(--x-border)", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <Text styleKey="caption1" tone="muted">
              Global Platform Curvature: Stop {radius}
            </Text>
            <div style={{ width: "240px" }}>
              <SegmentedControl
                size="sm"
                options={[
                  { value: "0", label: "0" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                ]}
                value={String(radius)}
                onValueChange={(val: string) => onRadiusChange(Number(val) as RadiusStop)}
              />
            </div>
          </div>
        </div>
      </section>

      <Divider style={{ width: "100%", maxWidth: "1040px" }} />

      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 3: FLAT DEPTH VS MUDDY SHADOWS
          Unboxed, razor-sharp architectural clarity.
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 24px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Stack gap={16} align="center" style={{ marginBottom: "40px" }}>
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            Flat depth. No muddy shadows.
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "640px", fontSize: "1.125rem", lineHeight: 1.55 }}>
            CSS box-shadow turns AMOLED blacks into murky gray fuzz.
            Xenon builds depth purely from 1px hairline edges (StyleSheet.hairlineWidth on native)
            and stepped neutral tone contrast.
          </Text>

          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <Badge tone="neutral">0 Gradients</Badge>
            <Badge tone="neutral">0 Box-Shadows</Badge>
            <Badge tone="accent">1.00px Precision Hairline</Badge>
          </div>
        </Stack>

        {/* Expansive Unboxed Architectural Blueprint */}
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <MudVsHairlineIllustration />
        </div>
      </section>

      <Divider style={{ width: "100%", maxWidth: "1040px" }} />

      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 4: FLUID KINEMATICS VS JARRING SNAPPING
          Continuous physics wave, zero abrupt cuts.
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 24px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Stack gap={16} align="center" style={{ marginBottom: "40px" }}>
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            Fluid physics. Zero snap.
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "640px", fontSize: "1.125rem", lineHeight: 1.55 }}>
            No UI state transition in Xenon is ever snappy or instantaneous.
            Every expansion, drawer slide, and active indicator glides through Apple-grade
            damped harmonic spring physics.
          </Text>
        </Stack>

        {/* Expansive Unboxed Spring Waveform Blueprint */}
        <div style={{ width: "100%", maxWidth: "800px", marginBottom: "32px" }}>
          <JoltVsButterIllustration />
        </div>

        {/* Interactive Kinetic Trigger */}
        <div>
          <Button
            variant={springActive ? "filled" : "outline"}
            size="lg"
            onClick={() => setSpringActive(!springActive)}
          >
            {springActive ? "Damped Spring Release ✓" : "Trigger Fluid Spring Motion"}
          </Button>
        </div>
      </section>

      <Divider style={{ width: "100%", maxWidth: "1040px" }} />

      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 5: SINGLE ACCENT ISOLATION & AMOLED / WARM CANVAS
          90% calm neutral architecture, 10% purposeful focal draw.
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 24px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <Stack gap={16} align="center" style={{ marginBottom: "40px" }}>
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            One sharp accent. Calm canvas.
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "640px", fontSize: "1.125rem", lineHeight: 1.55 }}>
            90% calm neutral architecture, 10% laser focal draw.
            Choose between pure AMOLED pitch black and warm Anthropic charcoal,
            paired with your signature accent.
          </Text>
        </Stack>

        {/* Expansive Unboxed Blueprint */}
        <div style={{ width: "100%", maxWidth: "800px", marginBottom: "36px" }}>
          <ClownCarVsAccentIllustration />
        </div>

        {/* Realtime Accent & AMOLED Control Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            padding: "16px 24px",
            borderRadius: "var(--x-radius-control, 9999px)",
            backgroundColor: "var(--x-surface-2)",
            border: "1px solid var(--x-border)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Accent Color Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {ACCENT_OPTIONS.map((item) => {
              const isActive = accent === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onAccentChange(item.key)}
                  aria-label={`Select ${item.label} accent`}
                  style={{
                    width: "22px",
                    height: "22px",
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

          {/* AMOLED Mode Switcher Toggle */}
          {onAmoledChange && (
            <div style={{ borderLeft: "1px solid var(--x-border)", paddingLeft: "16px" }}>
              <Button
                variant={amoled ? "subtle" : "ghost"}
                size="sm"
                onClick={() => onAmoledChange(!amoled)}
                style={{ fontFamily: "var(--x-font-family-mono)", fontSize: "12px" }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: amoled ? "var(--x-accent)" : "var(--x-text-muted)",
                    marginRight: "6px",
                    display: "inline-block",
                  }}
                />
                {amoled ? "AMOLED Pitch Black (#000000)" : "Claude Warm Charcoal (#181816)"}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Divider style={{ width: "100%", maxWidth: "1040px" }} />

      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 6: ISOMORPHIC PARITY (WEB + EXPO)
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "96px 24px",
          width: "100%",
          maxWidth: "1000px",
          textAlign: "center",
        }}
      >
        <Stack gap={20} align="center">
          <Heading level={2} weight={200} style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}>
            One token core. Zero platform drift.
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ maxWidth: "640px", fontSize: "1.125rem", lineHeight: 1.55 }}>
            Every component ships with identical prop contracts across Web React DOM and React Native Expo.
            Shared formulas live in <code style={{ color: "var(--x-accent)" }}>@xenon/core</code>.
          </Text>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "24px",
              width: "100%",
              marginTop: "24px",
              textAlign: "left",
            }}
          >
            <Surface variant="subtle" padding={20} style={{ border: "1px solid var(--x-border)" }}>
              <Text styleKey="caption1" tone="muted" style={{ marginBottom: "8px", display: "block" }}>
                Web (React DOM)
              </Text>
              <CodeBlock
                code={`import { Button } from "@xenon/web";\n\n<Button variant="filled" size="md">\n  Launch Rocket\n</Button>`}
                language="typescript"
                showLineNumbers={false}
              />
            </Surface>

            <Surface variant="subtle" padding={20} style={{ border: "1px solid var(--x-border)" }}>
              <Text styleKey="caption1" tone="muted" style={{ marginBottom: "8px", display: "block" }}>
                Native (Expo React Native)
              </Text>
              <CodeBlock
                code={`import { Button } from "@xenon/native";\n\n<Button variant="filled" size="md">\n  Launch Rocket\n</Button>`}
                language="typescript"
                showLineNumbers={false}
              />
            </Surface>
          </div>
        </Stack>
      </section>

      <Divider style={{ width: "100%", maxWidth: "1040px" }} />

      {/* ─────────────────────────────────────────────────────────────
          VIEWPORT 7: PEACEFUL CLOSING CTA
      ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 24px 120px 24px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Stack gap={24} align="center">
          <Heading level={2} weight={200} style={{ fontSize: "2.75rem", letterSpacing: "-0.03em" }}>
            Ready to get your weekends back?
          </Heading>

          <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "18px", lineHeight: 1.6 }}>
            Free forever for open source contributors, students, and personal projects. $5/month for
            commercial builders. Zero vendor lock-in.
          </Text>

          <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/docs/components" style={{ textDecoration: "none" }}>
              <Button variant="filled" size="lg">
                Browse Components →
              </Button>
            </Link>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <Button variant="outline" size="lg">
                View Pricing ($0 / $5)
              </Button>
            </Link>
          </div>
        </Stack>
      </section>
    </div>
  );
}
