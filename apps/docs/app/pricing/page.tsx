"use client";

import React, { type ReactElement } from "react";
import Link from "next/link";
import {
  Badge,
  Button,
  Divider,
  Heading,
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
import { useDocsTheme } from "../providers/XenonDocsProvider";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { CheckIcon } from "../components/Icons";

export default function PricingPage(): ReactElement {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--x-bg)",
        color: "var(--x-text)",
        display: "flex",
        flexDirection: "column",
        transition:
          "background-color 240ms cubic-bezier(0.2, 0, 0, 1), color 240ms cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      <MarketingNavbar activePath="/pricing" />

        <main
          style={{
            flex: 1,
            width: "100%",
            maxWidth: "1080px",
            margin: "0 auto",
            padding: "64px 24px 96px 24px",
          }}
        >
          <Stack gap={40} align="center">
            {/* Header */}
            <div style={{ textAlign: "center", maxWidth: "680px" }}>
              <Heading
                level={1}
                weight={200}
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                  marginBottom: "16px",
                }}
              >
                Honest pricing for builders everywhere.
              </Heading>
              <Text styleKey="body" tone="muted" weight={300} style={{ fontSize: "18px", lineHeight: "1.6" }}>
                100% free forever for students, open source contributors, and personal builders. $5 a
                month for commercial production apps. Zero hidden fees.
              </Text>
            </div>

            {/* Pricing Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                width: "100%",
                marginTop: "16px",
              }}
            >
              {/* Tier 1: Free */}
              <Surface
                variant="subtle"
                padding={28}
                style={{
                  borderRadius: "var(--x-radius-surface, 16px)",
                  border: "1px solid var(--x-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "var(--x-surface-1)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text styleKey="title3" weight={400} tone="default">
                      Open Source & Students
                    </Text>
                    <Badge tone="neutral">Free Forever</Badge>
                  </div>

                  <div style={{ margin: "24px 0 16px 0" }}>
                    <span style={{ fontSize: "3rem", fontWeight: 200, letterSpacing: "-0.03em" }}>
                      $0
                    </span>
                    <span style={{ color: "var(--x-text-muted)", marginLeft: "8px", fontSize: "14px" }}>
                      / forever
                    </span>
                  </div>

                  <Text styleKey="caption1" tone="muted" style={{ lineHeight: 1.5, marginBottom: "24px" }}>
                    Perfect for open source repositories, students, educational institutions, and
                    curious experimenters.
                  </Text>

                  <Divider style={{ margin: "16px 0" }} />

                  <Stack gap={10}>
                    <FeatureItem text="All 30+ Web & Expo components" />
                    <FeatureItem text="Full source code access" />
                    <FeatureItem text="CLI scaffolding tool (npx xenon)" />
                    <FeatureItem text="Community GitHub discussions" />
                    <FeatureItem text="Permissive use for public repos" />
                  </Stack>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <Link href="/docs" style={{ textDecoration: "none" }}>
                    <Button variant="outline" size="md" fullWidth>
                      Start Free →
                    </Button>
                  </Link>
                </div>
              </Surface>

              {/* Tier 2: Pro ($5) */}
              <Surface
                variant="subtle"
                padding={28}
                style={{
                  borderRadius: "var(--x-radius-surface, 16px)",
                  border: "1px solid var(--x-accent)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "var(--x-surface-1)",
                  position: "relative",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text styleKey="title3" weight={400} tone="default">
                      Pro Builder
                    </Text>
                    <Badge tone="accent">Recommended</Badge>
                  </div>

                  <div style={{ margin: "24px 0 16px 0" }}>
                    <span
                      style={{
                        fontSize: "3rem",
                        fontWeight: 200,
                        letterSpacing: "-0.03em",
                        color: "var(--x-accent)",
                      }}
                    >
                      $5
                    </span>
                    <span style={{ color: "var(--x-text-muted)", marginLeft: "8px", fontSize: "14px" }}>
                      / month
                    </span>
                  </div>

                  <Text styleKey="caption1" tone="muted" style={{ lineHeight: 1.5, marginBottom: "24px" }}>
                    For startups, indie makers, and businesses shipping commercial proprietary
                    software.
                  </Text>

                  <Divider style={{ margin: "16px 0" }} />

                  <Stack gap={10}>
                    <FeatureItem text="Everything in Open Source" highlight />
                    <FeatureItem text="Commercial proprietary license" highlight />
                    <FeatureItem text="Priority bug fixes & patches" highlight />
                    <FeatureItem text="Early access to Phase 8 Blog & Forum" highlight />
                    <FeatureItem text="Experimental component canary access" highlight />
                  </Stack>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <Button variant="filled" size="md" fullWidth>
                    Get Pro ($5) →
                  </Button>
                </div>
              </Surface>

              {/* Tier 3: Enterprise */}
              <Surface
                variant="subtle"
                padding={28}
                style={{
                  borderRadius: "var(--x-radius-surface, 16px)",
                  border: "1px solid var(--x-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "var(--x-surface-1)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text styleKey="title3" weight={400} tone="default">
                      Enterprise
                    </Text>
                    <Badge tone="neutral">Custom</Badge>
                  </div>

                  <div style={{ margin: "24px 0 16px 0" }}>
                    <span style={{ fontSize: "2.75rem", fontWeight: 200, letterSpacing: "-0.03em" }}>
                      Custom
                    </span>
                  </div>

                  <Text styleKey="caption1" tone="muted" style={{ lineHeight: 1.5, marginBottom: "24px" }}>
                    For large engineering organizations requiring custom native bridge targets and
                    compliance SLAs.
                  </Text>

                  <Divider style={{ margin: "16px 0" }} />

                  <Stack gap={10}>
                    <FeatureItem text="Everything in Pro" />
                    <FeatureItem text="Bespoke native bridge engineering" />
                    <FeatureItem text="Custom design token compiler targets" />
                    <FeatureItem text="Design system accessibility audit" />
                    <FeatureItem text="Dedicated architectural SLA" />
                  </Stack>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <Button variant="outline" size="md" fullWidth>
                    Contact Architecture Team
                  </Button>
                </div>
              </Surface>
            </div>

            <Divider style={{ width: "100%", margin: "32px 0 16px 0" }} />

            {/* Feature Comparison Matrix */}
            <div style={{ width: "100%" }}>
              <Heading level={3} weight={300} style={{ marginBottom: "16px" }}>
                Feature Matrix
              </Heading>
              <Table variant="bordered" fullWidth>
                <TableHeader>
                  <TableRow>
                    <TableHead>Capability</TableHead>
                    <TableHead>Open Source ($0)</TableHead>
                    <TableHead>Pro ($5)</TableHead>
                    <TableHead>Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Web React DOM Primitives</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Expo React Native Primitives</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Concentric Math Engine</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Commercial Codebase License</TableCell>
                    <TableCell>Public Repos Only</TableCell>
                    <TableCell style={{ color: "var(--x-accent)" }}>Unlimited Private</TableCell>
                    <TableCell style={{ color: "var(--x-accent)" }}>Unlimited Organization</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Priority Bug Patches</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>✓</TableCell>
                    <TableCell>Dedicated SLA</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Stack>
        </main>
      </div>
  );
}

function FeatureItem({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <CheckIcon size="sm" color={highlight ? "var(--x-accent)" : "var(--x-text-muted)"} />
      <Text styleKey="caption1" tone={highlight ? "default" : "muted"}>
        {text}
      </Text>
    </div>
  );
}
