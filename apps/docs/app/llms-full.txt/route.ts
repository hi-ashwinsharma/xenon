import { NextResponse } from "next/server";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";

export async function GET() {
  const lines: string[] = [];

  lines.push("# Xenon Full Specification (llms-full.txt)");
  lines.push("");
  lines.push(
    "> Complete technical specification, token geometry, accessibility contracts, and full prop tables for all Xenon components.",
  );
  lines.push("");
  lines.push("## Design Tokens");
  lines.push("- **Themes**: `dark` (default), `light`");
  lines.push(
    "- **AMOLED Mode**: `data-x-amoled='true'` (#000000 pure canvas background)",
  );
  lines.push(
    "- **Accents**: `lime` (#D4FF00 dark / #4D7C0F light), `orange`, `pink`, `blue`, `purple`, `green`",
  );
  lines.push(
    "- **Radius Stops**: R0 (0px), R1 (4px), R2 (8px), R3 (12px), R4 (16px), R5 (20px - default), R6 (9999px pill)",
  );
  lines.push("- **Control Heights**: sm (32px), md (40px), lg (48px)");
  lines.push("- **Touch Target Floor**: 44px minimum hit area");
  lines.push(
    "- **Spring Physics**: springSoft (stiffness 300, damping 30), springSnappy (stiffness 400, damping 28)",
  );
  lines.push("");
  lines.push("## Components Detailed API");
  lines.push("");

  for (const comp of COMPONENTS_REGISTRY) {
    lines.push(`---`);
    lines.push(`### ${comp.name} (\`${comp.id}\`)`);
    lines.push(`**Category**: ${comp.category}`);
    lines.push(`**Description**: ${comp.description}`);
    lines.push(`**Accessibility**: ${comp.a11y}`);
    lines.push(`**Install**: \`${comp.npmInstall}\` | \`${comp.cliInstall}\``);
    lines.push("");
    lines.push("#### Props");
    lines.push("| Name | Type | Default | Required | Description |");
    lines.push("| :--- | :--- | :--- | :--- | :--- |");
    for (const prop of comp.props) {
      lines.push(
        `| \`${prop.name}\` | \`${prop.type}\` | ${prop.defaultValue ? `\`${prop.defaultValue}\`` : "-"} | ${prop.required ? "**Yes**" : "No"} | ${prop.description} |`,
      );
    }
    lines.push("");
    lines.push("#### Web Usage");
    lines.push("```tsx");
    lines.push(comp.webUsage);
    lines.push("```");
    lines.push("");
    lines.push("#### Native Usage");
    lines.push("```tsx");
    lines.push(comp.nativeUsage);
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
