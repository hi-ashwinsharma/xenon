"use client";

import React, { useMemo, type ReactElement } from "react";
import Link from "next/link";
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
  ConcentricField,
  Group,
  Heading,
  Input,
  Progress,
  ScrollScene,
  SegmentedControl,
  Slider,
  Spinner,
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
  TabsList,
  TabsTrigger,
  Text,
  useXenon,
} from "@xenon/web";
import { AppRoutes, computeNestedRadius, mix, scrollRange } from "@xenon/core";
import { ACCENT_COLORS, RADIUS_STOPS, type Accent } from "@xenon/tokens";
import {
  BookOpenIcon,
  CubeIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  SlidersIcon,
  TerminalIcon,
} from "../Icons";
import { CENTER, FILL, SceneCopy, useIsNarrow } from "./shared";

const INSTALL_COMMAND = "npx @xenon-kit/cli init";

const RELEASES = [
  { name: "Checkout", owner: "Ada Lovelace", target: 92, state: "Live" },
  { name: "Search", owner: "Alan Turing", target: 64, state: "Rolling" },
  { name: "Billing", owner: "Grace Hopper", target: 38, state: "Rolling" },
  { name: "Onboarding", owner: "Linus Pauling", target: 18, state: "Queued" },
] as const;

const SIDEBAR = [
  { label: "Releases", icon: <CubeIcon size="sm" /> },
  { label: "Activity", icon: <LightningIcon size="sm" /> },
  { label: "Runbooks", icon: <BookOpenIcon size="sm" /> },
  { label: "Deploys", icon: <TerminalIcon size="sm" /> },
  { label: "Settings", icon: <SlidersIcon size="sm" /> },
];

function AppWindow({ fill }: { fill: number }): ReactElement {
  const narrow = useIsNarrow();
  return (
    <Surface padding={0} style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", minHeight: narrow ? "26rem" : "34rem" }}>
        {!narrow && (
          <Stack
            gap={4}
            style={{
              width: "13rem",
              flexShrink: 0,
              padding: "var(--x-space-4) var(--x-space-3)",
              borderRight: "1px solid var(--x-border)",
            }}
          >
            {SIDEBAR.map((item, index) => (
              <Button
                key={item.label}
                variant={index === 0 ? "subtle" : "ghost"}
                size="sm"
                style={{ justifyContent: "flex-start" }}
              >
                <Group gap={8} align="center">
                  {item.icon}
                  {item.label}
                </Group>
              </Button>
            ))}
          </Stack>
        )}
        <Stack
          gap={24}
          style={{ flex: 1, minWidth: 0, padding: "var(--x-space-5)" }}
        >
          <Group justify="between" align="center" gap={12}>
            <Heading level={3} styleKey="title2" weight={300}>
              Releases
            </Heading>
            <Group gap={8} align="center">
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Ada Lovelace" />
                <Avatar name="Alan Turing" />
                <Avatar name="Grace Hopper" />
              </AvatarGroup>
              {!narrow && (
                <Button variant="accent" size="sm">
                  New release
                </Button>
              )}
            </Group>
          </Group>
          <Group gap={40} wrap="wrap">
            {[
              ["Uptime", `${(99 + fill * 0.98).toFixed(2)}%`],
              ["Deploys today", String(Math.round(fill * 24))],
              ["Rollbacks", "0"],
            ].map(([label, value]) => (
              <Stack key={label} gap={4}>
                <Text styleKey="footnote" tone="muted">
                  {label}
                </Text>
                <Text styleKey="title1" weight={200} tabular>
                  {value}
                </Text>
              </Stack>
            ))}
          </Group>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Rollout</TableHead>
                {!narrow && <TableHead>State</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {RELEASES.map((release) => (
                <TableRow key={release.name}>
                  <TableCell>
                    <Group gap={8} align="center" wrap="nowrap">
                      <Avatar size="sm" name={release.owner} />
                      {release.name}
                    </Group>
                  </TableCell>
                  <TableCell style={{ width: "45%" }}>
                    <Progress
                      value={release.target * fill}
                      aria-label={`${release.name} rollout`}
                    />
                  </TableCell>
                  {!narrow && (
                    <TableCell>
                      <Badge
                        tone={release.state === "Live" ? "accent" : "neutral"}
                        size="sm"
                      >
                        {release.state}
                      </Badge>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </div>
    </Surface>
  );
}

/** The window rises from under the headline and takes over the viewport. */
export function HeroScene(): ReactElement {
  return (
    <ScrollScene length={3} restingProgress={0}>
      {(p) => {
        const away = scrollRange(p, 0.05, 0.45);
        const rise = scrollRange(p, 0, 0.6);
        return (
          <>
            <div
              style={{
                ...FILL,
                ...CENTER,
                alignItems: "flex-start",
                paddingTop: "calc(var(--x-space-8) + 3svh)",
                paddingLeft: "var(--x-space-5)",
                paddingRight: "var(--x-space-5)",
                opacity: 1 - away,
                transform: `translateY(${mix(0, -140, away)}px)`,
              }}
            >
              <Stack gap={24} align="center">
                <Heading level={1} weight={200} align="center">
                  The UI kit your AI can’t break.
                </Heading>
                <Text
                  as="p"
                  styleKey="title3"
                  weight={300}
                  tone="muted"
                  align="center"
                  style={{ maxWidth: "38rem", margin: 0 }}
                >
                  Finite tokens and exhaustive types, so humans and agents ship
                  the same hairline-crisp interface on web and Expo.
                </Text>
                <Group gap={12} justify="center" align="center" wrap="wrap">
                  <CodeBlock variant="command" code={INSTALL_COMMAND} />
                  <Link href={AppRoutes.components}>
                    <Button variant="accent" size="lg">
                      Browse components
                    </Button>
                  </Link>
                </Group>
              </Stack>
            </div>
            <div
              style={{
                ...FILL,
                ...CENTER,
                padding: "var(--x-space-5)",
                pointerEvents: away > 0.5 ? "auto" : "none",
                transform: `translateY(${mix(58, 3, rise)}svh) scale(${mix(0.78, 1, rise)})`,
              }}
            >
              <ConcentricField
                rings={7}
                gap={mix(70, 40, rise)}
                style={{ width: "min(100%, 70rem)" }}
              >
                <AppWindow fill={scrollRange(p, 0.45, 0.95)} />
              </ConcentricField>
            </div>
          </>
        );
      }}
    </ScrollScene>
  );
}

function WallRows(): ReactElement {
  const rows: ReactElement[][] = [
    [
      <ButtonGroup key="g" variant="outline">
        <Button>Cut</Button>
        <Button>Copy</Button>
        <Button>Paste</Button>
      </ButtonGroup>,
      <SegmentedControl
        key="s"
        defaultValue="b"
        options={[
          { value: "a", label: "Day" },
          { value: "b", label: "Week" },
          { value: "c", label: "Month" },
        ]}
      />,
      <Button key="a" variant="accent" size="lg">
        Ship it
      </Button>,
      <Switch key="w" defaultChecked label="Auto-deploy" />,
      <Badge key="ba" tone="accent">
        Live
      </Badge>,
      <div key="i" style={{ width: "15rem" }}>
        <Input
          placeholder="Search tokens"
          prefix={<MagnifyingGlassIcon size="sm" />}
        />
      </div>,
      <Checkbox key="c" defaultChecked label="Reviewed" />,
    ],
    [
      <Tabs key="t" defaultValue="o">
        <TabsList>
          <TabsTrigger value="o">Overview</TabsTrigger>
          <TabsTrigger value="a">Activity</TabsTrigger>
          <TabsTrigger value="s">Settings</TabsTrigger>
        </TabsList>
      </Tabs>,
      <AvatarGroup key="v" max={4}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" />
        <Avatar name="Grace Hopper" />
        <Avatar name="Linus Pauling" />
      </AvatarGroup>,
      <div key="sl" style={{ width: "14rem" }}>
        <Slider defaultValue={62} aria-label="Volume" />
      </div>,
      <Button key="f" variant="filled">
        Publish
      </Button>,
      <Spinner key="sp" tone="accent" />,
      <Breadcrumb key="bc">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    ],
    [
      <Surface key="n" padding={16}>
        <Stack gap={8}>
          <Text styleKey="footnote" tone="muted">
            Rollout
          </Text>
          <div style={{ width: "13rem" }}>
            <Progress value={72} aria-label="Rollout" />
          </div>
        </Stack>
      </Surface>,
      <Button key="o" variant="outline" size="lg">
        Invite
      </Button>,
      <Surface key="u" padding={16} variant="accent">
        <Text styleKey="title3" weight={300}>
          One accent
        </Text>
      </Surface>,
      <div key="ii" style={{ width: "14rem" }}>
        <Input defaultValue="ada@studio.com" />
      </div>,
      <Switch key="sw" label="Digest" />,
      <Badge key="n2" tone="neutral">
        Draft
      </Badge>,
      <ButtonGroup key="g2" variant="subtle">
        <Button variant="accent">Merge</Button>
        <Button>Rebase</Button>
      </ButtonGroup>,
    ],
    [
      <CodeBlock key="cc" variant="command" code={INSTALL_COMMAND} />,
      <Checkbox key="c2" label="Include tests" />,
      <SegmentedControl
        key="s2"
        defaultValue="w"
        options={[
          { value: "w", label: "Web" },
          { value: "e", label: "Expo" },
        ]}
      />,
      <Button key="g" variant="ghost">
        Dismiss
      </Button>,
      <Surface key="st" padding={16}>
        <Group gap={12} align="center">
          <Avatar name="Grace Hopper" />
          <Stack gap={0}>
            <Text styleKey="footnote">Grace Hopper</Text>
            <Text styleKey="caption1" tone="muted">
              Reviewing
            </Text>
          </Stack>
        </Group>
      </Surface>,
      <Badge key="b3" tone="success">
        Passing
      </Badge>,
    ],
  ];

  return (
    <Stack gap={32} justify="center" style={{ ...FILL }}>
      {rows.map((row, rowIndex) => {
        const direction = rowIndex % 2 === 0 ? -1 : 1;
        return (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--x-space-6)",
              width: "max-content",
              transform: `translateX(calc(${direction === -1 ? "-10vw" : "-70vw"} + (var(--x-scroll, 0) * ${direction} * 60vw)))`,
            }}
          >
            {[0, 1, 2].flatMap((copy) =>
              row.map((item) => (
                <div key={`${copy}-${item.key}`} style={{ flexShrink: 0 }}>
                  {item}
                </div>
              )),
            )}
          </div>
        );
      })}
    </Stack>
  );
}

/** Real components drift past in opposite directions, driven only by the reader. */
export function WallScene(): ReactElement {
  const wall = useMemo(() => <WallRows />, []);
  return (
    <ScrollScene length={2.5}>
      {wall}
      <div
        style={{
          ...FILL,
          ...CENTER,
          pointerEvents: "none",
          padding: "var(--x-space-5)",
        }}
      >
        <Surface variant="glass" padding={32}>
          <Stack gap={8} align="center">
            <Heading
              level={2}
              styleKey="largeTitle"
              weight={200}
              align="center"
            >
              Every piece is real.
            </Heading>
            <Text styleKey="callout" tone="muted" align="center">
              Live components, not a screenshot. Stop and touch one.
            </Text>
          </Stack>
        </Surface>
      </div>
    </ScrollScene>
  );
}

const STOP_RADII = [0, 1, 2, 3, 4, 5, 6].map((stop) => {
  const key = stop as keyof typeof RADIUS_STOPS;
  return stop === 6 ? 9999 : RADIUS_STOPS[key].surface * 2;
});

/** A field of tiles morphs from sharp to pill, rippling out from the center. */
export function RadiusScene(): ReactElement {
  const narrow = useIsNarrow();
  const columns = narrow ? 4 : 9;
  const rows = narrow ? 8 : 5;
  return (
    <ScrollScene length={4}>
      {(p) => {
        const stopFloat = p * 6;
        const shownStop = Math.round(stopFloat);
        const cells = Array.from({ length: columns * rows }, (_, index) => {
          const x = index % columns;
          const y = Math.floor(index / columns);
          const distance = Math.hypot(
            x - (columns - 1) / 2,
            y - (rows - 1) / 2,
          );
          const local = Math.max(
            0,
            Math.min(6, stopFloat * 1.3 - distance * 0.25),
          );
          const low = Math.floor(local);
          const radius = Math.min(
            mix(
              STOP_RADII[low] ?? 0,
              Math.min(STOP_RADII[Math.min(6, low + 1)] ?? 0, 140),
              local - low,
            ),
            140,
          );
          return { index, radius, distance };
        });
        return (
          <div
            style={{
              ...FILL,
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: "var(--x-space-2)",
              padding: "var(--x-space-2)",
            }}
          >
            {cells.map((cell) => (
              <Surface
                key={cell.index}
                padding={0}
                variant={cell.distance < 1.2 ? "accent" : "subtle"}
                style={{ borderRadius: `${cell.radius}px`, transition: "none" }}
              />
            ))}
            <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
              <Surface variant="glass" padding={32}>
                <Stack gap={8} align="center">
                  <Text styleKey="footnote" tone="muted">
                    Radius stop
                  </Text>
                  <Heading
                    level={2}
                    styleKey="display"
                    weight={200}
                    align="center"
                  >
                    {shownStop}
                  </Heading>
                  <Text styleKey="title3" weight={300} align="center">
                    Seven shapes, one token.
                  </Text>
                </Stack>
              </Surface>
            </div>
          </div>
        );
      }}
    </ScrollScene>
  );
}

/** The camera flies through nested surfaces whose corners share one center. */
export function ConcentricScene(): ReactElement {
  return (
    <ScrollScene length={4}>
      {(p) => {
        const zoom = mix(1, 7, scrollRange(p, 0.1, 0.92) ** 2);
        const padding = 36;
        const outer = 180;
        const layers = 6;
        const nest = (depth: number, radius: number): ReactElement => (
          <Surface
            padding={padding}
            variant={
              depth === layers - 1
                ? "accent"
                : depth % 2 === 0
                  ? "subtle"
                  : "default"
            }
            style={{
              flex: 1,
              display: "flex",
              minWidth: 0,
              borderRadius: `${radius}px`,
              transition: "none",
            }}
          >
            {depth < layers - 1 ? (
              nest(depth + 1, computeNestedRadius(radius, padding))
            ) : (
              <div style={{ ...CENTER, flex: 1 }}>
                <Text styleKey="caption2" align="center">
                  outer minus padding
                </Text>
              </div>
            )}
          </Surface>
        );
        return (
          <>
            <div
              style={{
                ...FILL,
                display: "flex",
                padding: "var(--x-space-5)",
                transform: `scale(${zoom})`,
              }}
            >
              {nest(0, outer)}
            </div>
            <div
              style={{
                position: "absolute",
                left: "var(--x-space-5)",
                right: "var(--x-space-5)",
                bottom: "var(--x-space-7)",
                ...CENTER,
                opacity: 1 - scrollRange(p, 0.8, 0.95),
              }}
            >
              <Surface variant="glass" padding={24}>
                <Stack gap={4} align="center">
                  <Heading
                    level={2}
                    styleKey="largeTitle"
                    weight={200}
                    align="center"
                  >
                    Corners that nest.
                  </Heading>
                  <Text styleKey="callout" tone="muted" align="center">
                    Every child radius is computed, never guessed. Fall through
                    six layers.
                  </Text>
                </Stack>
              </Surface>
            </div>
          </>
        );
      }}
    </ScrollScene>
  );
}

const ACCENTS: readonly { key: Accent; label: string }[] = [
  { key: "lime", label: "Lime" },
  { key: "orange", label: "Orange" },
  { key: "pink", label: "Pink" },
  { key: "blue", label: "Blue" },
  { key: "purple", label: "Purple" },
  { key: "green", label: "Green" },
];

/** Each accent floods the viewport from one point, recoloring real components. */
export function AccentScene(): ReactElement {
  const { resolvedTheme } = useXenon();
  return (
    <ScrollScene length={6}>
      {(p) => (
        <>
          <div style={{ ...FILL, ...CENTER }}>
            <SceneCopy
              title="One accent."
              lead="Scroll to pour a new one over the whole system."
            />
          </div>
          {ACCENTS.map((accent, index) => {
            const start = index / ACCENTS.length;
            const grow = scrollRange(p, start, start + 1 / ACCENTS.length);
            return (
              <Surface
                key={accent.key}
                variant="accent"
                radius={0}
                padding={24}
                style={
                  {
                    "--x-accent": ACCENT_COLORS[accent.key][resolvedTheme],
                    ...FILL,
                    ...CENTER,
                    border: "none",
                    transition: "none",
                    clipPath: `circle(${grow * 120}vmax at 50% 62%)`,
                    visibility: grow > 0 ? "visible" : "hidden",
                  } as React.CSSProperties
                }
              >
                <Stack gap={32} align="center">
                  <Heading
                    level={3}
                    styleKey="display"
                    weight={200}
                    align="center"
                    style={{
                      fontSize: "clamp(4rem, 17vw, 15rem)",
                      lineHeight: 1,
                    }}
                  >
                    {accent.label}
                  </Heading>
                  <Group gap={16} justify="center" align="center" wrap="wrap">
                    <Button variant="outline" size="lg">
                      Publish
                    </Button>
                    <Switch defaultChecked label="One token" />
                  </Group>
                </Stack>
              </Surface>
            );
          })}
        </>
      )}
    </ScrollScene>
  );
}

/** Lines draw across the viewport and stay exactly one pixel at any zoom. */
export function HairlineScene(): ReactElement {
  const lines = useMemo(
    () => Array.from({ length: 25 }, (_, index) => index * 4),
    [],
  );
  return (
    <ScrollScene length={3}>
      {(p) => {
        const draw = scrollRange(p, 0, 0.5);
        const zoom = mix(1, 5, scrollRange(p, 0.4, 1));
        return (
          <>
            <svg
              aria-hidden="true"
              preserveAspectRatio="none"
              viewBox="0 0 96 96"
              style={{
                ...FILL,
                width: "100%",
                height: "100%",
                transform: `scale(${zoom})`,
              }}
            >
              {lines.map((at, index) => (
                <g
                  key={at}
                  stroke={
                    index % 6 === 0
                      ? "var(--x-accent)"
                      : "var(--x-border-active)"
                  }
                >
                  <line
                    x1={at}
                    x2={at}
                    y1={0}
                    y2={96 * draw}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1={0}
                    x2={96 * draw}
                    y1={at}
                    y2={at}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>
            <div style={{ ...FILL, ...CENTER, padding: "var(--x-space-5)" }}>
              <Surface padding={32} style={{ backgroundColor: "var(--x-bg)" }}>
                <Stack gap={8} align="center">
                  <Heading
                    level={2}
                    styleKey="largeTitle"
                    weight={200}
                    align="center"
                  >
                    One pixel holds it all.
                  </Heading>
                  <Text styleKey="callout" tone="muted" align="center">
                    No shadows and no gradients. Depth comes from hairlines and
                    surface tone, at {zoom.toFixed(1)}x zoom and every other.
                  </Text>
                </Stack>
              </Surface>
            </div>
          </>
        );
      }}
    </ScrollScene>
  );
}
