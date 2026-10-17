"use client";

import React, { type ReactElement } from "react";
import {
  Badge,
  CodeBlock,
  Divider,
  Heading,
  Link,
  Stack,
  Surface,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@xenon/web";
import { AppRoutes } from "@xenon/core";

export function IntroductionDoc(): ReactElement {
  return (
    <Stack gap={32} style={{ width: "100%", maxWidth: "980px" }}>
      {/* Hero */}
      <Stack gap={8}>
        <Heading level={1} weight={200}>
          Xenon UI Architecture
        </Heading>
        <Text
          styleKey="body"
          tone="muted"
          weight={300}
          style={{ fontSize: "16px", lineHeight: "1.6" }}
        >
          A minimalistic, closed-source UI kit engineered for web (React DOM)
          and React Native (Expo) from a single token core and two bespoke
          renderers.
        </Text>
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <Badge tone="accent">v1.0.0 Architecture</Badge>
          <Badge tone="neutral">Apple HIG Standards</Badge>
          <Badge tone="neutral">Hairline Precision</Badge>
        </div>
      </Stack>

      <Divider />

      {/* Philosophy */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          Core Philosophy
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Xenon is a quiet design system. It earns trust through geometry,
          negative space, and mathematical restraint instead of decoration.
          Depth is achieved purely through 1px hairlines and subtle surface tone
          steps.
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          <Surface
            variant="subtle"
            padding={16}
            style={{ border: "1px solid var(--x-border)" }}
          >
            <Stack gap={8}>
              <Heading level={5} weight={400}>
                1. Hairline Clarity
              </Heading>
              <Text styleKey="caption1" tone="muted">
                Every border and divider is strictly 1px. Focus states hug the
                1px perimeter smoothly without detached outlines.
              </Text>
            </Stack>
          </Surface>

          <Surface
            variant="subtle"
            padding={16}
            style={{ border: "1px solid var(--x-border)" }}
          >
            <Stack gap={8}>
              <Heading level={5} weight={400}>
                2. Flat Depth
              </Heading>
              <Text styleKey="caption1" tone="muted">
                Zero shadows. Zero gradients. No cards inside cards. Surfaces
                step up gracefully from AMOLED black.
              </Text>
            </Stack>
          </Surface>

          <Surface
            variant="subtle"
            padding={16}
            style={{ border: "1px solid var(--x-border)" }}
          >
            <Stack gap={8}>
              <Heading level={5} weight={400}>
                3. Concentric Geometry
              </Heading>
              <Text styleKey="caption1" tone="muted">
                Shapes nest with mathematically derived radii: R_child = max(0,
                R_parent - padding).
              </Text>
            </Stack>
          </Surface>

          <Surface
            variant="subtle"
            padding={16}
            style={{ border: "1px solid var(--x-border)" }}
          >
            <Stack gap={8}>
              <Heading level={5} weight={400}>
                4. Apple-Grade Motion
              </Heading>
              <Text styleKey="caption1" tone="muted">
                Zero snappy changes. Every state disclosure glides through 280ms
                cubic-bezier and physics spring curves.
              </Text>
            </Stack>
          </Surface>
        </div>
      </Stack>

      {/* Banned Patterns */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          Banned Invariants
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Xenon enforces non-negotiable architectural constraints across all
          components:
        </Text>

        <Table variant="bordered" fullWidth>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "240px" }}>Banned Pattern</TableHead>
              <TableHead>Required Alternative</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell style={{ color: "var(--x-danger)" }}>
                box-shadow, drop-shadow
              </TableCell>
              <TableCell>1px hairline border, stepped surface tones</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: "var(--x-danger)" }}>
                linear-gradient, mesh blobs
              </TableCell>
              <TableCell>
                Flat surface tone hierarchy (--x-surface-0 to 2)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: "var(--x-danger)" }}>
                Emoji or raw ASCII chrome
              </TableCell>
              <TableCell>Phosphor Thin icons via Xenon Icon wrapper</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: "var(--x-danger)" }}>
                Card nested inside card
              </TableCell>
              <TableCell>
                Hairline dividers and optical negative space
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: "var(--x-danger)" }}>
                Font weights &gt;= 500
              </TableCell>
              <TableCell>Light typography (200, 300, 400 only)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ color: "var(--x-danger)" }}>
                Instant snappy transitions
              </TableCell>
              <TableCell>
                Apple-grade 280ms fluid ease and spring dynamics
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>

      {/* Quick Setup */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          Quickstart
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Run the initializer inside any React 19 app (Vite or Next.js App
          Router). It installs the kit, imports the stylesheet, wraps your root
          in XenonProvider, and writes AGENTS.md so coding agents follow the
          design rules.
        </Text>
        <CodeBlock code="npx @xenon-kit/cli init" language="bash" />
        <Text styleKey="body" tone="default" weight={300}>
          Or set it up by hand:
        </Text>
        <CodeBlock
          code={`npm install @xenon-kit/web @phosphor-icons/react`}
          language="bash"
        />
        <CodeBlock
          code={`import "@xenon-kit/web/styles.css";
import { XenonProvider } from "@xenon-kit/web";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <XenonProvider defaultTheme="dark" defaultAccent="lime" defaultRadius={5}>
      {children}
    </XenonProvider>
  );
}`}
          language="typescript"
          filename="app/layout.tsx"
          showLineNumbers
        />
      </Stack>

      {/* Agent resources */}
      <Stack gap={16}>
        <Heading level={3} weight={300}>
          For AI Agents
        </Heading>
        <Text styleKey="body" tone="default" weight={300}>
          Point your coding agent at these machine-readable endpoints. The
          design rules are as binding as the components, so agents should read
          them before writing UI.
        </Text>
        <Table variant="bordered" fullWidth>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "240px" }}>
                <Link href={AppRoutes.llms}>
                  <span className="x-agent-link x-agent-link-accent">
                    llms.txt
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                Index: setup, hard rules, and every component at a glance.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href={AppRoutes.llmsFull}>
                  <span className="x-agent-link x-agent-link-accent">
                    llms-full.txt
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                Full specification with the design guidelines and complete prop
                tables.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href={AppRoutes.registry}>
                  <span className="x-agent-link x-agent-link-accent">/r</span>
                </Link>
              </TableCell>
              <TableCell>
                JSON registry. Each component at /r/&lt;name&gt;.json with
                props, accessibility, and usage.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CodeBlock
          code={`Use the Xenon UI kit to build a settings page.
Start by reading https://xenon.hi-ashwin.xyz/llms.txt`}
          language="text"
          filename="Example prompt"
        />
      </Stack>
    </Stack>
  );
}
