"use client";

import React, { useEffect, useState, type ReactElement } from "react";
import Link from "next/link";
import {
  AccentPicker,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Chapter,
  CodeBlock,
  ConcentricField,
  Container,
  Grid,
  Group,
  Heading,
  Progress,
  Reveal,
  ScrollScene,
  SegmentedControl,
  Slider,
  Stack,
  Surface,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  toast,
} from "@xenon/web";
import { AppRoutes, computeNestedRadius } from "@xenon/core";
import { RADIUS_STOPS, type RadiusStop } from "@xenon/tokens";
import { useDocsTheme } from "../providers/XenonDocsProvider";
import {
  BookOpenIcon,
  CubeIcon,
  LightningIcon,
  SlidersIcon,
  TerminalIcon,
} from "./Icons";

const INSTALL_COMMAND = "npx @xenon-kit/cli init";

const WEB_SNIPPET = `import { Button, Surface } from "@xenon-kit/web";

<Surface padding={16}>
  <Button variant="accent" size="lg">Ship it</Button>
</Surface>`;

const NATIVE_SNIPPET = `import { Button, Surface } from "@xenon-kit/native";

<Surface padding={16}>
  <Button variant="accent" size="lg">Ship it</Button>
</Surface>`;

const AGENT_SNIPPET = `# Give your agent the rules before it writes a line
curl https://xenon.hi-ashwin.xyz/llms.txt

# Every component is a machine-readable spec
curl https://xenon.hi-ashwin.xyz/r/button.json`;

const RELEASES = [
  { name: "Checkout", owner: "Ada Lovelace", progress: 92, state: "Live" },
  { name: "Search", owner: "Alan Turing", progress: 64, state: "Rolling" },
  { name: "Billing", owner: "Grace Hopper", progress: 38, state: "Rolling" },
] as const;

const STOPS: readonly RadiusStop[] = [0, 1, 2, 3, 4, 5, 6];

function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState<boolean>(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 60rem)");
    const update = (): void => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return narrow;
}

function AppWindow(): ReactElement {
  const narrow = useIsNarrow();
  const { accent, setAccent, radius, setRadius } = useDocsTheme();

  return (
    <div style={{ position: "relative" }}>
      <Surface padding={0} style={{ overflow: "hidden" }}>
        <div
          style={{ display: "flex", minHeight: narrow ? undefined : "32rem" }}
        >
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
              <Button
                variant="subtle"
                size="sm"
                style={{ justifyContent: "flex-start" }}
              >
                <Group gap={8} align="center">
                  <CubeIcon size="sm" />
                  Releases
                </Group>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                style={{ justifyContent: "flex-start" }}
              >
                <Group gap={8} align="center">
                  <LightningIcon size="sm" />
                  Activity
                </Group>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                style={{ justifyContent: "flex-start" }}
              >
                <Group gap={8} align="center">
                  <BookOpenIcon size="sm" />
                  Runbooks
                </Group>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                style={{ justifyContent: "flex-start" }}
              >
                <Group gap={8} align="center">
                  <TerminalIcon size="sm" />
                  Deploys
                </Group>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                style={{ justifyContent: "flex-start" }}
              >
                <Group gap={8} align="center">
                  <SlidersIcon size="sm" />
                  Settings
                </Group>
              </Button>
            </Stack>
          )}
          <Stack
            gap={24}
            style={{ flex: 1, minWidth: 0, padding: "var(--x-space-5)" }}
          >
            <Group justify="between" align="center" gap={12} wrap="wrap">
              <Heading level={2} styleKey="title2" weight={300}>
                Releases
              </Heading>
              <Group gap={8} align="center">
                <AvatarGroup size="sm" max={3}>
                  <Avatar name="Ada Lovelace" />
                  <Avatar name="Alan Turing" />
                  <Avatar name="Grace Hopper" />
                </AvatarGroup>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() =>
                    toast.show({ title: "Release started", tone: "success" })
                  }
                >
                  New release
                </Button>
              </Group>
            </Group>

            <Grid minItemWidth={88} gap={24}>
              {[
                ["Uptime", "99.98%"],
                ["Deploys today", "24"],
                ["Rollbacks", "0"],
              ].map(([label, value]) => (
                <Stack key={label} gap={4}>
                  <Text styleKey="footnote" tone="muted">
                    {label}
                  </Text>
                  <Text styleKey="title1" weight={200}>
                    {value}
                  </Text>
                </Stack>
              ))}
            </Grid>

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
                    <TableCell style={{ width: "40%" }}>
                      <Progress
                        value={release.progress}
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

      {/* Floating Liquid Glass layers: these controls restyle the whole page */}
      <Surface
        variant="glass"
        padding={16}
        style={
          narrow
            ? { marginTop: "var(--x-space-3)" }
            : {
                position: "absolute",
                top: "var(--x-space-8)",
                right: "calc(var(--x-space-7) * -1)",
                width: "16rem",
              }
        }
      >
        <Stack gap={12}>
          <Text styleKey="footnote" weight={400}>
            Make it yours
          </Text>
          <AccentPicker value={accent} onValueChange={setAccent} />
          <Stack gap={4}>
            <Group justify="between" align="center">
              <Text styleKey="caption1" tone="muted">
                Radius
              </Text>
              <Text styleKey="caption1" tone="accent">
                Stop {radius}
              </Text>
            </Group>
            <Slider
              min={0}
              max={6}
              step={1}
              size="sm"
              value={radius}
              onValueChange={(next) => setRadius(next as RadiusStop)}
              aria-label="Global radius stop"
            />
          </Stack>
        </Stack>
      </Surface>
    </div>
  );
}

function RadiusScene(): ReactElement {
  return (
    <ScrollScene length={3}>
      {(progress) => {
        const stop = Math.round(progress * (STOPS.length - 1)) as RadiusStop;
        return (
          <Container size="md">
            <Stack gap={48} align="center">
              <Stack gap={12} align="center">
                <Heading
                  level={2}
                  styleKey="display"
                  weight={200}
                  align="center"
                >
                  Seven shapes, one token.
                </Heading>
                <Text
                  styleKey="title3"
                  weight={300}
                  tone="muted"
                  align="center"
                >
                  Keep scrolling. Every corner in the system moves together.
                </Text>
              </Stack>
              <Surface
                variant="accent"
                radius={RADIUS_STOPS[stop].surface * 2}
                padding={32}
                style={{
                  width: "min(100%, 26rem)",
                  aspectRatio: "1.4",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <Text styleKey="title3" weight={300}>
                  Radius stop
                </Text>
                <Heading level={3} styleKey="display" weight={200}>
                  {stop}
                </Heading>
              </Surface>
            </Stack>
          </Container>
        );
      }}
    </ScrollScene>
  );
}

function ConcentricVisual(): ReactElement {
  const { radius } = useDocsTheme();
  const [padding, setPadding] = useState<number>(16);
  const outer = RADIUS_STOPS[radius].surface;
  const inner = Math.round(computeNestedRadius(outer, padding));

  return (
    <Stack gap={24}>
      <Surface padding={padding} variant="subtle">
        <Surface padding={padding}>
          <Surface
            padding={padding}
            variant="accent"
            style={{
              minHeight: "12rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Text styleKey="footnote">Inner radius</Text>
            <Text styleKey="title1" weight={200}>
              {inner}px
            </Text>
          </Surface>
        </Surface>
      </Surface>
      <Slider
        min={0}
        max={24}
        step={2}
        size="sm"
        value={padding}
        onValueChange={setPadding}
        aria-label="Nested padding"
      />
    </Stack>
  );
}

function AccentChapter(): ReactElement {
  const { accent, setAccent } = useDocsTheme();
  return (
    <Container
      style={{
        paddingTop: "var(--x-space-9)",
        paddingBottom: "var(--x-space-9)",
      }}
    >
      <Reveal>
        <Surface
          variant="accent"
          padding={48}
          style={{
            minHeight: "70svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack gap={32} align="center">
            <Heading level={2} styleKey="display" weight={200} align="center">
              One accent.
            </Heading>
            <Text styleKey="title3" weight={300} align="center">
              One token recolors everything. The rest stays calm.
            </Text>
            <AccentPicker value={accent} onValueChange={setAccent} />
          </Stack>
        </Surface>
      </Reveal>
    </Container>
  );
}

function GroupedVisual(): ReactElement {
  return (
    <Stack gap={24} align="center">
      <ButtonGroup variant="outline" size="lg">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>
      <SegmentedControl
        defaultValue="code"
        options={[
          { value: "preview", label: "Preview" },
          { value: "code", label: "Code" },
          { value: "props", label: "Props" },
        ]}
      />
    </Stack>
  );
}

function MotionVisual(): ReactElement {
  return (
    <Stack gap={24}>
      <Accordion type="single" variant="bordered" defaultValue="caret">
        <AccordionItem value="caret">
          <AccordionTrigger>Open this, then the next one</AccordionTrigger>
          <AccordionContent>
            Height and caret share one curve, so they move as a single gesture.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interrupt">
          <AccordionTrigger>Interrupt it halfway</AccordionTrigger>
          <AccordionContent>
            Motion reverses from where it is and never jumps.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Group gap={12} align="center">
        <Button
          variant="outline"
          onClick={() =>
            toast.show({
              title: "Saved",
              description: "Toasts arrive on the same spring.",
            })
          }
        >
          Show a toast
        </Button>
        <Switch defaultChecked label="Springs" />
      </Group>
    </Stack>
  );
}

function PlatformVisual(): ReactElement {
  return (
    <Tabs defaultValue="web">
      <TabsList>
        <TabsTrigger value="web">Web</TabsTrigger>
        <TabsTrigger value="native">Expo</TabsTrigger>
      </TabsList>
      <TabsContent value="web">
        <CodeBlock language="tsx" code={WEB_SNIPPET} />
      </TabsContent>
      <TabsContent value="native">
        <CodeBlock language="tsx" code={NATIVE_SNIPPET} />
      </TabsContent>
    </Tabs>
  );
}

export function MarketingLanding(): ReactElement {
  return (
    <>
      <Container
        size="md"
        style={{
          minHeight: "calc(100svh - var(--x-space-8))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack gap={32} align="center">
          <Reveal>
            <Heading level={1} weight={200} align="center">
              The UI kit your AI can’t break.
            </Heading>
          </Reveal>
          <Reveal order={1}>
            <Text
              as="p"
              styleKey="title3"
              weight={300}
              tone="muted"
              style={{ maxWidth: "38rem", textAlign: "center", margin: 0 }}
            >
              Finite tokens and exhaustive types, so humans and agents ship the
              same hairline-crisp interface on web and Expo.
            </Text>
          </Reveal>
          <Reveal order={2}>
            <Group gap={12} justify="center" align="center" wrap="wrap">
              <CodeBlock variant="command" code={INSTALL_COMMAND} />
              <Link href={AppRoutes.components}>
                <Button variant="accent" size="lg">
                  Browse components
                </Button>
              </Link>
            </Group>
          </Reveal>
        </Stack>
      </Container>

      <section style={{ overflow: "hidden" }}>
        <Container
          style={{
            paddingTop: "var(--x-space-9)",
            paddingBottom: "var(--x-space-10)",
          }}
        >
          <Reveal>
            <ConcentricField rings={7} gap={44}>
              <AppWindow />
            </ConcentricField>
          </Reveal>
        </Container>
      </section>

      <RadiusScene />

      <Chapter
        title="Corners that nest."
        lead="A child subtracts its parent’s padding from the radius. Drag the slider and every curve stays concentric."
        visual={<ConcentricVisual />}
      />

      <AccentChapter />

      <Chapter
        reverse
        title="Controls that join."
        lead="Buttons and segments become one shape, with pill outer edges and small inner joints."
        visual={<GroupedVisual />}
      />

      <Chapter
        title="Nothing snaps."
        lead="Every state change travels on a spring or a tokenized curve. Try to catch it out."
        visual={<MotionVisual />}
      />

      <Chapter
        reverse
        title="Written for your agent too."
        lead="Banned patterns, exact props and every token ship as plain text, so an agent has nothing to guess."
        visual={
          <Stack gap={16}>
            <CodeBlock language="bash" code={AGENT_SNIPPET} />
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
        }
      />

      <Chapter
        title="One contract, two renderers."
        lead="Web and Expo share tokens, formulas and props. Learn a component once."
        visual={<PlatformVisual />}
      />

      <section style={{ overflow: "hidden" }}>
        <Container
          size="sm"
          style={{
            minHeight: "100svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Reveal>
            <ConcentricField rings={5} gap={48}>
              <Stack
                gap={24}
                align="center"
                style={{ padding: "var(--x-space-7) var(--x-space-5)" }}
              >
                <Heading
                  level={2}
                  styleKey="display"
                  weight={200}
                  align="center"
                >
                  Get your weekends back.
                </Heading>
                <Text styleKey="body" tone="muted" align="center">
                  Free for open source contributors, students and personal
                  projects.
                </Text>
                <Group gap={12} justify="center" align="center" wrap="wrap">
                  <CodeBlock variant="command" code={INSTALL_COMMAND} />
                  <Link href="/pricing">
                    <Button variant="outline" size="lg">
                      See pricing
                    </Button>
                  </Link>
                </Group>
              </Stack>
            </ConcentricField>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
