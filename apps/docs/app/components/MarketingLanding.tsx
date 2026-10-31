"use client";

import React, { useState, type ReactElement, type ReactNode } from "react";
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
  Checkbox,
  CodeBlock,
  Container,
  Divider,
  Field,
  Grid,
  Group,
  Heading,
  Input,
  Progress,
  Reveal,
  SegmentedControl,
  Slider,
  Stack,
  Surface,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  toast,
} from "@xenon/web";
import { AppRoutes, computeNestedRadius } from "@xenon/core";
import { RADIUS_STOPS, type RadiusStop } from "@xenon/tokens";
import { useDocsTheme } from "../providers/XenonDocsProvider";

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

function Act({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section>
      <Divider />
      <Container
        style={{
          paddingTop: "var(--x-space-10)",
          paddingBottom: "var(--x-space-10)",
        }}
      >
        <Stack gap={48}>
          <Reveal>
            <Stack gap={12} style={{ maxWidth: "40rem" }}>
              <Heading level={2} styleKey="largeTitle" weight={200}>
                {title}
              </Heading>
              <Text styleKey="body" tone="muted">
                {lead}
              </Text>
            </Stack>
          </Reveal>
          <Reveal order={1}>{children}</Reveal>
        </Stack>
      </Container>
    </section>
  );
}

function Stage(): ReactElement {
  const { accent, setAccent, radius, setRadius } = useDocsTheme();
  const [role, setRole] = useState<string>("editor");
  const [digest, setDigest] = useState<boolean>(true);
  const [mentions, setMentions] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(64);

  return (
    <Stack gap={16}>
      <Group justify="center" align="center" gap={24} wrap="wrap">
        <AccentPicker value={accent} onValueChange={setAccent} />
        <Group gap={12} align="center" style={{ width: "15rem" }}>
          <Text styleKey="caption1" tone="muted">
            Radius
          </Text>
          <div style={{ flex: 1 }}>
            <Slider
              min={0}
              max={6}
              step={1}
              size="sm"
              value={radius}
              onValueChange={(next) => setRadius(next as RadiusStop)}
              aria-label="Global radius stop"
            />
          </div>
        </Group>
      </Group>

      <Grid minItemWidth={300} gap={16}>
        <Surface>
          <Stack gap={16}>
            <Text styleKey="headline" weight={400}>
              Invite a teammate
            </Text>
            <Field label="Email">
              <Input placeholder="ada@studio.com" />
            </Field>
            <SegmentedControl
              fullWidth
              size="sm"
              value={role}
              onValueChange={setRole}
              options={[
                { value: "viewer", label: "Viewer" },
                { value: "editor", label: "Editor" },
                { value: "admin", label: "Admin" },
              ]}
            />
            <Button
              variant="accent"
              onClick={() =>
                toast.show({ title: "Invite sent", tone: "success" })
              }
            >
              Send invite
            </Button>
          </Stack>
        </Surface>

        <Surface>
          <Stack gap={16}>
            <Text styleKey="headline" weight={400}>
              Notifications
            </Text>
            <Switch
              checked={digest}
              onCheckedChange={setDigest}
              label="Weekly digest"
            />
            <Switch
              checked={mentions}
              onCheckedChange={setMentions}
              label="Mentions"
            />
            <Checkbox defaultChecked label="Also send by email" />
            <Stack gap={8}>
              <Group justify="between" align="center">
                <Text styleKey="footnote" tone="muted">
                  Alert volume
                </Text>
                <Text styleKey="footnote" tone="accent">
                  {volume}%
                </Text>
              </Group>
              <Slider
                size="sm"
                value={volume}
                onValueChange={setVolume}
                aria-label="Alert volume"
              />
            </Stack>
          </Stack>
        </Surface>

        <Surface>
          <Stack gap={16}>
            <Group justify="between" align="center">
              <Text styleKey="headline" weight={400}>
                Release 1.0
              </Text>
              <Badge tone="accent" size="sm">
                Rolling out
              </Badge>
            </Group>
            <Progress value={72} aria-label="Rollout progress" />
            <Group justify="between" align="center">
              <AvatarGroup size="sm" max={3}>
                <Avatar name="Ada Lovelace" />
                <Avatar name="Alan Turing" />
                <Avatar name="Grace Hopper" />
              </AvatarGroup>
              <Text styleKey="footnote" tone="muted">
                72% of traffic
              </Text>
            </Group>
            <ButtonGroup variant="outline" size="sm">
              <Button>Pause</Button>
              <Button>Roll back</Button>
              <Button>Finish</Button>
            </ButtonGroup>
          </Stack>
        </Surface>
      </Grid>
    </Stack>
  );
}

function ConcentricDemo(): ReactElement {
  const { radius } = useDocsTheme();
  const [padding, setPadding] = useState<number>(12);
  const outer = RADIUS_STOPS[radius].surface;
  const inner = Math.round(computeNestedRadius(outer, padding));
  const innermost = Math.round(computeNestedRadius(inner, padding));

  return (
    <Grid minItemWidth={320} gap={48} style={{ alignItems: "start" }}>
      <Surface padding={padding}>
        <Surface padding={padding} variant="subtle">
          <Surface padding={24}>
            <Text styleKey="footnote" tone="muted">
              Every corner shares one center.
            </Text>
          </Surface>
        </Surface>
      </Surface>
      <Stack gap={24} justify="center">
        <Stack gap={8}>
          <Group justify="between" align="center">
            <Text styleKey="footnote" tone="muted">
              Padding
            </Text>
            <Text styleKey="footnote" tone="accent">
              {padding}px
            </Text>
          </Group>
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
        <Stack gap={8}>
          {[
            ["Outer", outer],
            ["Middle", inner],
            ["Inner", innermost],
          ].map(([name, value]) => (
            <Group key={name} justify="between" align="center">
              <Text styleKey="footnote" tone="muted">
                {name}
              </Text>
              <Text styleKey="footnote">{value}px</Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
}

function GroupedDemo(): ReactElement {
  return (
    <Grid minItemWidth={300} gap={32}>
      <Stack gap={12} align="start">
        <ButtonGroup variant="outline">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
        <Text styleKey="footnote" tone="muted">
          Pill outer edges, small inner joints.
        </Text>
      </Stack>
      <Stack gap={12} align="start">
        <SegmentedControl
          defaultValue="code"
          options={[
            { value: "preview", label: "Preview" },
            { value: "code", label: "Code" },
            { value: "props", label: "Props" },
          ]}
        />
        <Text styleKey="footnote" tone="muted">
          The thumb glides between stops.
        </Text>
      </Stack>
      <Stack gap={12} align="start">
        <ButtonGroup variant="subtle">
          <Button variant="accent">Publish</Button>
          <Button>Save draft</Button>
        </ButtonGroup>
        <Text styleKey="footnote" tone="muted">
          One joint radius, whatever the variant.
        </Text>
      </Stack>
    </Grid>
  );
}

function MotionDemo(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Grid minItemWidth={320} gap={48}>
      <Accordion type="single" variant="bordered" defaultValue="caret">
        <AccordionItem value="caret">
          <AccordionTrigger>Open this, then the next one</AccordionTrigger>
          <AccordionContent>
            Height and caret share one curve, so the two move as a single
            gesture.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interrupt">
          <AccordionTrigger>Interrupt it halfway</AccordionTrigger>
          <AccordionContent>
            Motion stays cancelable. It reverses from where it is and never
            jumps.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="reduced">
          <AccordionTrigger>Reduced motion</AccordionTrigger>
          <AccordionContent>
            Respected everywhere, including this page.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Stack gap={16} align="start">
        <Switch defaultChecked label="Springs on press and release" />
        <Group gap={8} wrap="wrap">
          <Button
            variant="filled"
            loading={loading}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 1600);
            }}
          >
            Save changes
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.show({
                title: "Copied to clipboard",
                description: "Toasts stack and dismiss on the same spring.",
              })
            }
          >
            Show a toast
          </Button>
        </Group>
      </Stack>
    </Grid>
  );
}

export function MarketingLanding(): ReactElement {
  return (
    <>
      <Container
        style={{
          paddingTop: "var(--x-space-9)",
          paddingBottom: "var(--x-space-10)",
        }}
      >
        <Stack gap={64}>
          <Stack gap={24} align="center">
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
                Finite tokens and exhaustive types, so humans and agents ship
                the same hairline-crisp interface on web and Expo.
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
          <Reveal order={3}>
            <Stage />
          </Reveal>
        </Stack>
      </Container>

      <Act
        title="Corners that nest."
        lead="A child surface subtracts its parent’s padding from the radius, automatically. Change the padding and watch every curve stay concentric."
      >
        <ConcentricDemo />
      </Act>

      <Act
        title="Controls that belong together."
        lead="Buttons, inputs and segments join into one shape. Grouping is a signature of the system, not an afterthought."
      >
        <GroupedDemo />
      </Act>

      <Act
        title="Nothing snaps."
        lead="Every state change travels on a tokenized spring or curve. No instant toggles, no display none in the middle of a transition."
      >
        <MotionDemo />
      </Act>

      <Act
        title="Written for your agent too."
        lead="Banned patterns, exact props and every token ship as plain text. An agent reads the contract first, then has nothing to guess."
      >
        <Grid minItemWidth={320} gap={48}>
          <CodeBlock language="bash" code={AGENT_SNIPPET} />
          <Stack gap={12}>
            <Text styleKey="footnote" tone="muted">
              Agent entry points
            </Text>
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
      </Act>

      <Act
        title="One contract, two renderers."
        lead="Web and React Native share tokens, formulas and props. Learn a component once."
      >
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
      </Act>

      <section>
        <Divider />
        <Container
          size="sm"
          style={{
            paddingTop: "var(--x-space-10)",
            paddingBottom: "var(--x-space-10)",
          }}
        >
          <Reveal>
            <Stack gap={24} align="center">
              <Heading
                level={2}
                styleKey="largeTitle"
                weight={200}
                align="center"
              >
                Ready to get your weekends back?
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
