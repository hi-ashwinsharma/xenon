"use client";

import React, { useMemo, type ReactElement } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  CodeBlock,
  Field,
  Grid,
  Group,
  Heading,
  Input,
  Progress,
  ScrollScene,
  SegmentedControl,
  Skeleton,
  Slider,
  Stack,
  Surface,
  Switch,
  Text,
  Textarea,
} from "@xenon/web";
import { AppRoutes, mix, scrollRange } from "@xenon/core";
import { TYPOGRAPHY_SCALE, type TextStyleKey } from "@xenon/tokens";
import { MagnifyingGlassIcon } from "../Icons";
import { CENTER, CrossFade, FILL, SceneCopy, useIsNarrow } from "./shared";

const GROUPS: readonly (readonly string[])[] = [
  ["Day", "Week", "Month", "Year"],
  ["Cut", "Copy", "Paste"],
  ["Publish", "Save draft", "Discard"],
  ["Left", "Center", "Right", "Justify"],
];

/** Separate pills drift together and fuse into one grouped shape. */
export function GroupsScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={3}>
      {(p) => (
        <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
          <Stack gap={48} align="center">
            <SceneCopy
              title="Controls that join."
              lead="Pill outer edges. Small inner joints. One shape."
            />
            <Stack gap={24} align="center">
              {GROUPS.map((group, groupIndex) => {
                const fuse = scrollRange(
                  p,
                  0.1 + groupIndex * 0.1,
                  0.5 + groupIndex * 0.1,
                );
                return (
                  <div
                    key={group.join()}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {group.map((label, index) => {
                      const first = index === 0;
                      const last = index === group.length - 1;
                      const inner = mix(24, 5, fuse);
                      return (
                        <Button
                          key={label}
                          variant={
                            groupIndex === 2 && first ? "accent" : "outline"
                          }
                          size="lg"
                          style={{
                            marginLeft: first
                              ? 0
                              : `${mix(narrow ? 6 : 36, -1, fuse)}px`,
                            borderTopLeftRadius: first ? "24px" : `${inner}px`,
                            borderBottomLeftRadius: first
                              ? "24px"
                              : `${inner}px`,
                            borderTopRightRadius: last ? "24px" : `${inner}px`,
                            borderBottomRightRadius: last
                              ? "24px"
                              : `${inner}px`,
                            transition: "none",
                          }}
                        >
                          {label}
                        </Button>
                      );
                    })}
                  </div>
                );
              })}
            </Stack>
          </Stack>
        </div>
      )}
    </ScrollScene>
  );
}

const TYPE_ROWS: readonly TextStyleKey[] = [
  "largeTitle",
  "title1",
  "title2",
  "title3",
  "body",
  "footnote",
  "caption2",
];

/** One word swells across the viewport, moving through the three allowed weights. */
export function TypeScene(): ReactElement {
  return (
    <ScrollScene length={3}>
      {(p) => {
        const weight = Math.round(mix(200, 400, scrollRange(p, 0.15, 0.85)));
        const size = mix(10, 27, scrollRange(p, 0, 0.8));
        return (
          <>
            <div style={{ ...FILL, ...CENTER }}>
              <span
                style={{
                  fontFamily: "var(--x-font-family)",
                  fontWeight: weight,
                  fontSize: `${size}vw`,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "var(--x-text)",
                  whiteSpace: "nowrap",
                }}
              >
                Xenon
              </span>
            </div>
            <Group
              justify="between"
              align="end"
              gap={24}
              style={{
                position: "absolute",
                left: "var(--x-space-5)",
                right: "var(--x-space-5)",
                bottom: "var(--x-space-6)",
              }}
            >
              <Stack gap={4}>
                {TYPE_ROWS.map((key, index) => (
                  <Text
                    key={key}
                    styleKey={key}
                    tone="muted"
                    style={{
                      opacity: scrollRange(
                        p,
                        0.3 + index * 0.06,
                        0.45 + index * 0.06,
                      ),
                      whiteSpace: "nowrap",
                    }}
                  >
                    {TYPOGRAPHY_SCALE[key].name}
                  </Text>
                ))}
              </Stack>
              <Stack gap={4} align="end">
                <Text styleKey="title1" weight={200} tone="accent" tabular>
                  {weight}
                </Text>
                <Text styleKey="callout" tone="muted" align="right">
                  Thin type, sized larger when lighter. Never above 400.
                </Text>
              </Stack>
            </Group>
          </>
        );
      }}
    </ScrollScene>
  );
}

const SPRING_POINTS = Array.from({ length: 121 }, (_, index) => {
  const t = index / 120;
  const y = 1 - Math.exp(-6 * t) * Math.cos(16 * t);
  return `${index === 0 ? "M" : "L"}${(t * 1000).toFixed(1)} ${(320 - y * 200).toFixed(1)}`;
}).join(" ");

/** Scrolling traces a real spring curve while controls respond along it. */
export function MotionScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={4}>
      {(p) => {
        const trace = scrollRange(p, 0, 0.9);
        return (
          <>
            <svg
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 1000 400"
              style={{ ...FILL, width: "100%", height: "70%" }}
            >
              <path
                d={SPRING_POINTS}
                stroke="var(--x-border)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={SPRING_POINTS}
                pathLength={1}
                stroke="var(--x-accent)"
                strokeDasharray={1}
                strokeDashoffset={1 - trace}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                left: "var(--x-space-5)",
                right: "var(--x-space-5)",
                bottom: "var(--x-space-6)",
              }}
            >
              <Grid
                minItemWidth={narrow ? 240 : 320}
                gap={32}
                style={{ alignItems: "end" }}
              >
                <SceneCopy align="start" title="Nothing snaps." />
                <Accordion
                  type="single"
                  variant="bordered"
                  value={p > 0.55 ? "b" : p > 0.2 ? "a" : ""}
                >
                  <AccordionItem value="a">
                    <AccordionTrigger>
                      Height and caret, one curve
                    </AccordionTrigger>
                    <AccordionContent>
                      They move as a single gesture.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Always interruptible</AccordionTrigger>
                    <AccordionContent>
                      It reverses from where it is.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Stack gap={16}>
                  <Switch checked={p > 0.25} label="Spring on release" />
                  <Checkbox checked={p > 0.45} label="Reduced motion safe" />
                  <SegmentedControl
                    value={p > 0.7 ? "c" : p > 0.35 ? "b" : "a"}
                    options={[
                      { value: "a", label: "Fast" },
                      { value: "b", label: "Base" },
                      { value: "c", label: "Slow" },
                    ]}
                  />
                  <Progress value={trace * 100} aria-label="Spring progress" />
                </Stack>
              </Grid>
            </div>
          </>
        );
      }}
    </ScrollScene>
  );
}

const GLASS_BACKDROP = [
  "Tokens",
  "Radius",
  "Accent",
  "Motion",
  "Hairline",
  "Glass",
  "Springs",
  "Parity",
];

/** Content scrolls beneath a floating pane, and only that pane is glass. */
export function GlassScene(): ReactElement {
  const narrow = useIsNarrow();
  const backdrop = useMemo(
    () => (
      <div
        style={{
          ...FILL,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "var(--x-space-3)",
          padding: "var(--x-space-3)",
          height: "220%",
          transform: "translateY(calc(var(--x-scroll, 0) * -50%))",
        }}
      >
        {Array.from({ length: 32 }, (_, index) => (
          <Surface
            key={index}
            variant={index % 5 === 1 ? "accent" : "subtle"}
            padding={16}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <Text styleKey="title2" weight={200}>
              {GLASS_BACKDROP[index % GLASS_BACKDROP.length]}
            </Text>
          </Surface>
        ))}
      </div>
    ),
    [],
  );
  return (
    <ScrollScene length={3}>
      {(p) => (
        <>
          {backdrop}
          <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
            <Surface
              variant="glass"
              padding={32}
              style={{
                width: `min(100%, ${mix(24, narrow ? 24 : 44, scrollRange(p, 0, 0.6))}rem)`,
                transition: "none",
              }}
            >
              <Stack gap={12}>
                <Heading level={2} styleKey="largeTitle" weight={200}>
                  Glass, only where it floats.
                </Heading>
                <Text styleKey="callout" tone="muted">
                  Navigation and overlays get Liquid Glass. Content stays
                  opaque, so the hierarchy never blurs.
                </Text>
              </Stack>
            </Surface>
          </div>
        </>
      )}
    </ScrollScene>
  );
}

const PALETTE_ITEMS = [
  "Button",
  "Surface",
  "Popover",
  "Command palette",
  "Slider",
];

/** One trigger grows into a popover, a dialog, then a command palette. */
export function OverlayScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={5}>
      {(p) => {
        const toPopover = scrollRange(p, 0.08, 0.3);
        const toDialog = scrollRange(p, 0.38, 0.6);
        const toPalette = scrollRange(p, 0.68, 0.9);
        const maxWidth = narrow ? 320 : 640;
        const width = mix(
          mix(mix(112, 260, toPopover), narrow ? 300 : 440, toDialog),
          maxWidth,
          toPalette,
        );
        const height = mix(
          mix(mix(48, 216, toPopover), 224, toDialog),
          narrow ? 380 : 420,
          toPalette,
        );
        const stageProps = (visible: number) => ({
          inert: visible < 0.5,
          style: {
            ...FILL,
            padding: "var(--x-space-4)",
            opacity: visible,
          } as React.CSSProperties,
        });
        return (
          <>
            <Stack
              gap={12}
              justify="center"
              style={{ ...FILL, padding: "var(--x-space-5)", opacity: 0.6 }}
            >
              {Array.from({ length: 9 }, (_, index) => (
                <Skeleton
                  key={index}
                  variant="text"
                  animate={false}
                  width={`${90 - (index % 4) * 15}%`}
                  height="1.5rem"
                />
              ))}
            </Stack>
            <div style={{ ...FILL, ...CENTER }}>
              <Surface
                variant="glass"
                padding={0}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: `${width}px`,
                  height: `${height}px`,
                  borderRadius: `${mix(24, 28, toPopover)}px`,
                  transition: "none",
                }}
              >
                <div style={{ ...FILL, ...CENTER, opacity: 1 - toPopover }}>
                  <Text styleKey="callout">Open</Text>
                </div>
                <div
                  {...stageProps(toPopover * (1 - scrollRange(p, 0.36, 0.44)))}
                >
                  <Stack gap={4}>
                    {["Duplicate", "Rename", "Share", "Archive"].map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        size="sm"
                        style={{ justifyContent: "flex-start" }}
                      >
                        {item}
                      </Button>
                    ))}
                  </Stack>
                </div>
                <div
                  {...stageProps(
                    scrollRange(p, 0.44, 0.56) *
                      (1 - scrollRange(p, 0.66, 0.74)),
                  )}
                >
                  <Stack gap={12}>
                    <Text styleKey="title3" weight={400}>
                      Archive this release?
                    </Text>
                    <Text styleKey="footnote" tone="muted">
                      Contexts stay crisp behind the surface, so you never lose
                      your place.
                    </Text>
                    <Group gap={8} justify="end">
                      <Button variant="ghost" size="sm">
                        Cancel
                      </Button>
                      <Button variant="accent" size="sm">
                        Archive
                      </Button>
                    </Group>
                  </Stack>
                </div>
                <div {...stageProps(scrollRange(p, 0.74, 0.86))}>
                  <Stack gap={12}>
                    <Input
                      value="Search components"
                      readOnly
                      prefix={<MagnifyingGlassIcon size="sm" />}
                    />
                    {PALETTE_ITEMS.map((item, index) => (
                      <Button
                        key={item}
                        variant={index === 0 ? "subtle" : "ghost"}
                        size="sm"
                        style={{ justifyContent: "flex-start" }}
                      >
                        {item}
                      </Button>
                    ))}
                  </Stack>
                </div>
              </Surface>
            </div>
            <div
              style={{
                position: "absolute",
                left: "var(--x-space-5)",
                right: "var(--x-space-5)",
                bottom: "var(--x-space-6)",
              }}
            >
              <SceneCopy
                title={
                  <CrossFade
                    items={[
                      {
                        label: "It grows from the trigger.",
                        visible: 1 - scrollRange(p, 0.3, 0.38),
                      },
                      {
                        label: "It stays in context.",
                        visible:
                          scrollRange(p, 0.38, 0.46) *
                          (1 - scrollRange(p, 0.62, 0.7)),
                      },
                      {
                        label: "It searches everything.",
                        visible: scrollRange(p, 0.7, 0.78),
                      },
                    ]}
                  />
                }
              />
            </div>
          </>
        );
      }}
    </ScrollScene>
  );
}

const typed = (text: string, t: number): string =>
  text.slice(0, Math.round(text.length * t));

/** The form completes itself as you scroll, every control on its own transition. */
export function FormScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={4}>
      {(p) => {
        const done = scrollRange(p, 0.88, 0.96);
        return (
          <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: narrow
                  ? "minmax(0, 1fr)"
                  : "minmax(0, 1fr) minmax(0, 1.2fr)",
                gap: "var(--x-space-7)",
                alignItems: "center",
                width: "min(100%, 77.5rem)",
              }}
            >
              <SceneCopy
                align="start"
                title="Forms that feel finished."
                lead={
                  narrow
                    ? undefined
                    : "Labels, help and errors built in. Inputs keep their architecture, and buttons stay pills."
                }
              />
              <Surface padding={narrow ? 16 : 32}>
                <Stack gap={narrow ? 12 : 20}>
                  <Field label="Workspace">
                    <Input
                      readOnly
                      value={typed("xenon-launch", scrollRange(p, 0, 0.2))}
                      placeholder="your-team"
                    />
                  </Field>
                  <Field
                    label="Owner email"
                    helpText="We only email about releases."
                  >
                    <Input
                      readOnly
                      value={typed(
                        "ada@studio.com",
                        scrollRange(p, 0.18, 0.38),
                      )}
                      placeholder="you@studio.com"
                    />
                  </Field>
                  {!narrow && (
                    <Field label="Release note">
                      <Textarea
                        readOnly
                        value={typed(
                          "Hairlines everywhere. Nothing snaps.",
                          scrollRange(p, 0.36, 0.56),
                        )}
                      />
                    </Field>
                  )}
                  <SegmentedControl
                    fullWidth
                    value={p > 0.62 ? "team" : "solo"}
                    options={[
                      { value: "solo", label: "Solo" },
                      { value: "team", label: "Team" },
                      { value: "org", label: "Org" },
                    ]}
                  />
                  <Slider
                    value={scrollRange(p, 0.58, 0.8) * 100}
                    aria-label="Rollout percentage"
                  />
                  <Group justify="between" align="center" gap={12} wrap="wrap">
                    <Switch checked={p > 0.68} label="Auto-deploy" />
                    <Checkbox checked={p > 0.74} label="Accept terms" />
                  </Group>
                  <div style={{ display: "grid" }}>
                    <div
                      inert={done > 0.5}
                      style={{
                        gridArea: "1 / 1",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        opacity: 1 - done,
                      }}
                    >
                      <Button variant="accent" loading={p > 0.8}>
                        Create workspace
                      </Button>
                    </div>
                    <div
                      style={{
                        gridArea: "1 / 1",
                        opacity: done,
                        transform: `translateY(${mix(12, 0, done)}px)`,
                      }}
                    >
                      <Alert
                        tone="success"
                        variant="subtle"
                        title="Workspace created"
                      >
                        Ready for your first release.
                      </Alert>
                    </div>
                  </div>
                </Stack>
              </Surface>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

const PEOPLE = [
  { name: "Ada Lovelace", role: "Reviewing tokens", value: 82 },
  { name: "Alan Turing", role: "Shipping parity", value: 64 },
  { name: "Grace Hopper", role: "Debugging motion", value: 47 },
  { name: "Linus Pauling", role: "Writing guidelines", value: 91 },
  { name: "Mae Jemison", role: "Testing on Expo", value: 73 },
  { name: "Katherine Johnson", role: "Checking radii", value: 58 },
];

/** A loading screen resolves card by card into real data. */
export function DataScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={3}>
      {(p) => (
        <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
          <Stack gap={32} style={{ width: "min(100%, 77.5rem)" }}>
            <SceneCopy title="From skeleton to substance." />
            <Grid minItemWidth={300} gap={16}>
              {PEOPLE.slice(0, narrow ? 4 : 6).map((person, index) => {
                const loaded = scrollRange(
                  p,
                  0.1 + index * 0.1,
                  0.25 + index * 0.1,
                );
                return (
                  <Surface
                    key={person.name}
                    padding={20}
                    style={{ position: "relative", minHeight: "7.5rem" }}
                  >
                    <Stack
                      gap={12}
                      style={{
                        position: "absolute",
                        inset: "var(--x-space-4)",
                        opacity: 1 - loaded,
                      }}
                    >
                      <Group gap={12} align="center">
                        <Skeleton variant="circle" />
                        <Stack gap={6} style={{ flex: 1 }}>
                          <Skeleton variant="text" width="60%" />
                          <Skeleton variant="text" width="40%" />
                        </Stack>
                      </Group>
                      <Skeleton variant="text" width="100%" />
                    </Stack>
                    <Stack gap={12} style={{ opacity: loaded }}>
                      <Group gap={12} align="center" justify="between">
                        <Group gap={12} align="center">
                          <Avatar name={person.name} />
                          <Stack gap={0}>
                            <Text styleKey="callout" weight={400}>
                              {person.name}
                            </Text>
                            <Text styleKey="footnote" tone="muted">
                              {person.role}
                            </Text>
                          </Stack>
                        </Group>
                        <Badge
                          tone={index % 3 === 0 ? "accent" : "neutral"}
                          size="sm"
                        >
                          {person.value}%
                        </Badge>
                      </Group>
                      <Progress
                        value={person.value * loaded}
                        aria-label={`${person.name} progress`}
                      />
                    </Stack>
                  </Surface>
                );
              })}
            </Grid>
          </Stack>
        </div>
      )}
    </ScrollScene>
  );
}

const BANNED = [
  { bad: "box-shadow: 0 8px 24px", good: "border: var(--x-border)" },
  { bad: "background: linear-gradient", good: "background: var(--x-surface)" },
  { bad: "font-weight: 600", good: "weight={300}" },
  { bad: "color: #7c3aed", good: "color: var(--x-accent)" },
  { bad: "transition: none", good: "var(--x-ease-spring)" },
];

const AGENT_PROMPT = `curl https://xenon.hi-ashwin.xyz/llms.txt

# Build a settings page with Xenon
<Surface>
  <Field label="Email"><Input /></Field>
  <Button variant="accent">Save</Button>
</Surface>`;

/** Generated slop is struck out line by line and replaced with tokens. */
export function AgentScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={4}>
      {(p) => (
        <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
          <Stack gap={narrow ? 24 : 40} style={{ width: "min(100%, 77.5rem)" }}>
            <SceneCopy title="Your agent has nothing to guess." />
            <Grid minItemWidth={340} gap={32}>
              <Stack gap={narrow ? 8 : 16}>
                {BANNED.map((line, index) => {
                  const fix = scrollRange(
                    p,
                    0.08 + index * 0.13,
                    0.2 + index * 0.13,
                  );
                  return (
                    <div
                      key={line.bad}
                      style={{
                        position: "relative",
                        height: narrow ? "1.75rem" : "2.25rem",
                      }}
                    >
                      <Text
                        as="span"
                        styleKey={narrow ? "footnote" : "title3"}
                        tone="danger"
                        style={{
                          position: "absolute",
                          fontFamily: "var(--x-font-family-mono)",
                          opacity: 1 - fix,
                          textDecorationLine:
                            fix > 0.05 ? "line-through" : "none",
                        }}
                      >
                        {line.bad}
                      </Text>
                      <Text
                        as="span"
                        styleKey={narrow ? "footnote" : "title3"}
                        tone="accent"
                        style={{
                          position: "absolute",
                          fontFamily: "var(--x-font-family-mono)",
                          opacity: fix,
                          transform: `translateX(${mix(24, 0, fix)}px)`,
                        }}
                      >
                        {line.good}
                      </Text>
                    </div>
                  );
                })}
              </Stack>
              <Stack gap={16}>
                <CodeBlock
                  language="tsx"
                  code={AGENT_PROMPT.slice(
                    0,
                    Math.max(
                      1,
                      Math.round(
                        AGENT_PROMPT.length * scrollRange(p, 0.15, 0.85),
                      ),
                    ),
                  )}
                  style={{ minHeight: narrow ? "11rem" : "15rem" }}
                />
                <Group gap={8} wrap="wrap">
                  <a href={AppRoutes.llms}>
                    <Button variant="outline" size="sm">
                      llms.txt
                    </Button>
                  </a>
                  <a href={AppRoutes.llmsFull}>
                    <Button variant="outline" size="sm">
                      llms-full.txt
                    </Button>
                  </a>
                  <a href={AppRoutes.registry}>
                    <Button variant="outline" size="sm">
                      Registry
                    </Button>
                  </a>
                </Group>
              </Stack>
            </Grid>
          </Stack>
        </div>
      )}
    </ScrollScene>
  );
}

/** A browser window narrows into a phone. The content never changes its props. */
export function PlatformScene(): ReactElement {
  const narrow = useIsNarrow();
  return (
    <ScrollScene length={4}>
      {(p) => {
        const toPhone = scrollRange(p, 0.15, 0.8);
        return (
          <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
            <Stack gap={32} align="center" style={{ width: "100%" }}>
              <SceneCopy
                title={
                  <CrossFade
                    items={[
                      { label: "Web.", visible: 1 - scrollRange(p, 0.4, 0.5) },
                      { label: "Expo.", visible: scrollRange(p, 0.5, 0.6) },
                    ]}
                  />
                }
                lead="One contract, two renderers. The same props on both."
              />
              <Surface
                padding={0}
                style={{
                  overflow: "hidden",
                  width: `min(100%, ${mix(narrow ? 22 : 60, 20, toPhone)}rem)`,
                  borderRadius: `${mix(16, 44, toPhone)}px`,
                  transition: "none",
                }}
              >
                <Group
                  justify="between"
                  align="center"
                  style={{
                    padding: "var(--x-space-3) var(--x-space-4)",
                    borderBottom: "1px solid var(--x-border)",
                  }}
                >
                  <Text styleKey="callout" weight={400}>
                    Settings
                  </Text>
                  <Badge tone="accent" size="sm">
                    <CrossFade
                      items={[
                        {
                          label: "@xenon-kit/web",
                          visible: 1 - scrollRange(p, 0.4, 0.5),
                        },
                        {
                          label: "@xenon-kit/native",
                          visible: scrollRange(p, 0.5, 0.6),
                        },
                      ]}
                    />
                  </Badge>
                </Group>
                <Stack gap={16} style={{ padding: "var(--x-space-4)" }}>
                  <Switch defaultChecked label="Notifications" />
                  <Field label="Name">
                    <Input defaultValue="Ada Lovelace" />
                  </Field>
                  <SegmentedControl
                    fullWidth
                    defaultValue="b"
                    options={[
                      { value: "a", label: "Light" },
                      { value: "b", label: "Dark" },
                    ]}
                  />
                  <Button variant="accent">Save</Button>
                </Stack>
              </Surface>
              <CodeBlock
                variant="command"
                copyable={false}
                code={`<Button variant="accent">Save</Button>`}
              />
            </Stack>
          </div>
        );
      }}
    </ScrollScene>
  );
}

/** One final flood of accent carries the closing call to action. */
export function ClosingScene(): ReactElement {
  return (
    <ScrollScene length={2.5} fade="in">
      {(p) => {
        const grow = scrollRange(p, 0.05, 0.75);
        const settle = scrollRange(p, 0.45, 0.85);
        return (
          <>
            <div style={{ ...FILL, ...CENTER }}>
              <SceneCopy
                title="That was one page."
                lead="Now imagine your product."
              />
            </div>
            <Surface
              variant="accent"
              radius={0}
              padding={24}
              style={{
                ...FILL,
                ...CENTER,
                border: "none",
                transition: "none",
                clipPath: `circle(${grow * 120}vmax at 50% 50%)`,
              }}
            >
              <Stack
                gap={32}
                align="center"
                style={{
                  opacity: settle,
                  transform: `translateY(${mix(48, 0, settle)}px)`,
                }}
              >
                <Heading
                  level={2}
                  styleKey="display"
                  weight={200}
                  align="center"
                  style={{
                    fontSize: "clamp(3rem, 9vw, 8rem)",
                    lineHeight: 1.02,
                  }}
                >
                  Get your weekends back.
                </Heading>
                <Text styleKey="title3" weight={300} align="center">
                  Free for open source contributors, students and personal
                  projects.
                </Text>
                <Group gap={12} justify="center" align="center" wrap="wrap">
                  <CodeBlock variant="command" code="npx @xenon-kit/cli init" />
                  <Link href="/pricing">
                    <Button variant="outline" size="lg">
                      See pricing
                    </Button>
                  </Link>
                </Group>
              </Stack>
            </Surface>
          </>
        );
      }}
    </ScrollScene>
  );
}
