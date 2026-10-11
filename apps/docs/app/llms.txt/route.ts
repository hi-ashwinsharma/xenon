import { NextResponse } from "next/server";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";

export async function GET() {
  const lines: string[] = [];

  lines.push("# Xenon Design System (llms.txt)");
  lines.push("");
  lines.push(
    "> Xenon is a minimalistic, hairline-crisp UI kit for web (React DOM) and React Native (Expo), built from one shared token geometry and two renderers.",
  );
  lines.push("");
  lines.push("## Core Principles & Hard Design Rules");
  lines.push(
    "- **Pure Canvas**: No gradients. No shadows of any kind (CSS box-shadow, iOS shadow*, Android elevation). Depth comes solely from hairlines (1px borders) and tonal layering.",
  );
  lines.push(
    "- **1px Hairline Precision**: All borders, separators, and dividers are strictly 1px (StyleSheet.hairlineWidth on native). Never use detached browser focus outlines (no outline-offset: 2px).",
  );
  lines.push(
    "- **Fluid Spring Kinematics**: Zero instant/snappy transitions. All disclosures, active states, expansions, and dismissals use physics springs (springSoft / springSnappy) or cubic-bezier(0.2, 0, 0, 1).",
  );
  lines.push(
    "- **No Emoji & Strict Iconography**: No emoji or raw ASCII/unicode characters for UI chrome (+, -, x, !, >). Icons are strictly Phosphor Thin (weight 200/thin).",
  );
  lines.push(
    "- **Typographic Restraint**: Font weights are strictly 200, 300, or 400. Never 500 or above.",
  );
  lines.push(
    "- **Don Norman Invariant**: Every component strictly embodies the 7 Norman principles: Affordances, Signifiers, Mapping, Feedback (<100ms), Conceptual Models, Architectural Constraints, and Discoverability.",
  );
  lines.push(
    "- **Radius Scale**: Discrete radius stops R0 (0px), R1 (4px), R2 (8px), R3 (12px), R4 (16px), R5 (20px - default), R6 (9999px pill). Form inputs maintain architectural geometry (R1-R2 / 6-8px), pills are reserved for buttons and search bars.",
  );
  lines.push("");
  lines.push("## Package Installation & Setup");
  lines.push("```bash");
  lines.push("pnpm add @xenon/web @xenon/core");
  lines.push("# or install single components via CLI / registry:");
  lines.push("npx xenon add button");
  lines.push("```");
  lines.push("");
  lines.push("### Root Provider Setup");
  lines.push("```tsx");
  lines.push('import { XenonProvider } from "@xenon/web";');
  lines.push('import "@xenon/web/styles.css";');
  lines.push("");
  lines.push(
    "export default function RootLayout({ children }: { children: React.ReactNode }) {",
  );
  lines.push("  return (");
  lines.push('    <html lang="en">');
  lines.push("      <body>");
  lines.push('        <XenonProvider theme="dark" accent="lime" radius={5}>');
  lines.push("          {children}");
  lines.push("        </XenonProvider>");
  lines.push("      </body>");
  lines.push("    </html>");
  lines.push("  );");
  lines.push("}");
  lines.push("```");
  lines.push("");
  lines.push("## Component Registry (26 Components)");
  lines.push("");

  for (const comp of COMPONENTS_REGISTRY) {
    lines.push(`### ${comp.name} (\`${comp.id}\`)`);
    lines.push(`- **Category**: ${comp.category}`);
    lines.push(`- **Description**: ${comp.description}`);
    lines.push(`- **Accessibility**: ${comp.a11y}`);
    lines.push(`- **Registry JSON**: https://xenon.design/r/${comp.id}.json`);
    lines.push(`- **CLI Command**: \`${comp.cliInstall}\``);
    lines.push("");
    lines.push("```tsx");
    lines.push(comp.webUsage);
    lines.push("```");
    lines.push("");
  }

  const content = lines.join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
