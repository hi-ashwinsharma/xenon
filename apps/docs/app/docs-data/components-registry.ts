export interface ComponentPropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentDocEntry {
  id: string;
  name: string;
  category:
    | "Primitives"
    | "Form Controls"
    | "Navigation"
    | "Overlays"
    | "Feedback & Data Display";
  description: string;
  a11y: string;
  cliInstall: string;
  npmInstall: string;
  props: ComponentPropDoc[];
  webUsage: string;
  nativeUsage: string;
}

export const COMPONENTS_REGISTRY: ComponentDocEntry[] = [
  {
    id: "concentric-field",
    name: "ConcentricField",
    category: "Primitives",
    description:
      "Hairline rings radiating from a child, each corner sharing its center. Follows the global radius stop.",
    a11y: "Rings are aria-hidden and ignore pointer events. Their entrance is disabled under reduced motion.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "rings",
        type: "number",
        defaultValue: "6",
        description: "Number of hairline rings.",
      },
      {
        name: "gap",
        type: "number",
        defaultValue: "40",
        description: "Distance between rings in px.",
      },
    ],
    webUsage: `import { ConcentricField, Surface } from "@xenon-kit/web";

export function Example() {
  return <ConcentricField rings={4} gap={32}><Surface>Content</Surface></ConcentricField>;
}`,
    nativeUsage: `import { ConcentricField, Surface } from "@xenon-kit/native";

export function Example() {
  return <ConcentricField rings={4} gap={32}><Surface>Content</Surface></ConcentricField>;
}`,
  },
  {
    id: "container",
    name: "Container",
    category: "Primitives",
    description:
      "Centers page content at a finite width with the system gutter.",
    a11y: "Renders a neutral block element with no landmark role.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'lg'",
        description: "Maximum content width.",
      },
    ],
    webUsage: `import { Container } from "@xenon-kit/web";

export function Example() {
  return <Container size="md">Content</Container>;
}`,
    nativeUsage: `import { Container } from "@xenon-kit/native";

export function Example() {
  return <Container size="md">Content</Container>;
}`,
  },
  {
    id: "grid",
    name: "Grid",
    category: "Primitives",
    description:
      "Responsive grid that wraps by item width, so it needs no breakpoints.",
    a11y: "Keeps DOM order equal to visual order.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "minItemWidth",
        type: "number",
        defaultValue: "280",
        description: "Smallest item width in px before wrapping.",
      },
      {
        name: "gap",
        type: "number",
        defaultValue: "16",
        description: "Gap between items in px.",
      },
      {
        name: "columns",
        type: "number",
        description:
          "Fixed tracks for bento layouts, used with GridItem span. Collapses to one column on narrow web viewports.",
      },
    ],
    webUsage: `import { Grid } from "@xenon-kit/web";

export function Example() {
  return <Grid minItemWidth={300}><Item /><Item /></Grid>;
}`,
    nativeUsage: `import { Grid } from "@xenon-kit/native";

export function Example() {
  return <Grid minItemWidth={300}><Item /><Item /></Grid>;
}`,
  },
  {
    id: "reveal",
    name: "Reveal",
    category: "Primitives",
    description:
      "Entrance transition on first view, on tokenized motion. Staggers with order and respects reduced motion.",
    a11y: "Content stays in the DOM and in the accessibility tree while hidden. Disabled under reduced motion.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "order",
        type: "number",
        defaultValue: "0",
        description:
          "Position in a stagger; each step waits one instant duration.",
      },
    ],
    webUsage: `import { Reveal } from "@xenon-kit/web";

export function Example() {
  return <Reveal order={1}>Content</Reveal>;
}`,
    nativeUsage: `import { Reveal } from "@xenon-kit/native";

export function Example() {
  return <Reveal order={1}>Content</Reveal>;
}`,
  },
  {
    id: "footer",
    name: "Footer",
    category: "Navigation",
    description:
      "Page footer with a brand slot, link columns, and a legal and credit row, separated by one hairline.",
    a11y: "Web renders the footer landmark; external links carry rel noopener.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      { name: "brand", type: "ReactNode", description: "Leading slot." },
      {
        name: "columns",
        type: "FooterColumnItem[]",
        description: "Titled groups of links.",
      },
      { name: "legal", type: "ReactNode", description: "Bottom row start." },
      { name: "credit", type: "ReactNode", description: "Bottom row end." },
      {
        name: "renderLink",
        type: "(link, label) => ReactNode",
        description: "Wraps links for client-side routers.",
      },
    ],
    webUsage: `import { Footer } from "@xenon-kit/web";

export function Example() {
  return <Footer columns={[{ title: "Product", links: [{ label: "Docs", href: "/docs" }] }]} legal="Copyright" />;
}`,
    nativeUsage: `import { Footer } from "@xenon-kit/native";

export function Example() {
  return <Footer columns={[{ title: "Product", links: [{ label: "Docs", href: "/docs" }] }]} legal="Copyright" />;
}`,
  },
  {
    id: "accent-picker",
    name: "AccentPicker",
    category: "Form Controls",
    description:
      "Radio group of the six accent swatches. The selected swatch is ringed by a hairline.",
    a11y: "Radiogroup with arrow-key navigation and roving focus; each swatch is named.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "value",
        type: "Accent",
        description: "Selected accent.",
        required: true,
      },
      {
        name: "onValueChange",
        type: "(accent: Accent) => void",
        description: "Called on selection.",
        required: true,
      },
      {
        name: "label",
        type: "string",
        defaultValue: "'Accent'",
        description: "Accessible group name.",
      },
    ],
    webUsage: `import { AccentPicker } from "@xenon-kit/web";

export function Example() {
  return <AccentPicker value={accent} onValueChange={setAccent} />;
}`,
    nativeUsage: `import { AccentPicker } from "@xenon-kit/native";

export function Example() {
  return <AccentPicker value={accent} onValueChange={setAccent} />;
}`,
  },
  // Primitives
  {
    id: "button",
    name: "Button",
    category: "Primitives",
    description:
      "Signature pill-first action control with physics-based spring squash interaction (0.98 scale on press).",
    a11y: "Rendered as native button element with role='button', supports Space and Enter keys, manages disabled and aria-busy states.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'accent' | 'filled' | 'subtle' | 'outline' | 'ghost' | 'glass'",
        defaultValue: "'filled'",
        description: "Visual hierarchy and surface style.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Touch target and padding scale.",
      },
      {
        name: "glassType",
        type: "'regular' | 'clear'",
        defaultValue: "'regular'",
        description: "Liquid Glass material type when variant='glass'.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction with 40% opacity.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "Displays loading spinner and sets aria-busy.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        defaultValue: "false",
        description: "Expands button width to 100% of container.",
      },
      {
        name: "onClick",
        type: "(event: MouseEvent<HTMLButtonElement>) => void",
        description: "Click event handler.",
      },
      { name: "children", type: "ReactNode", description: "Button content." },
    ],
    webUsage: `import { Button } from "@xenon-kit/web";

export function Example() {
  return (
    <Button variant="accent" size="md">
      Confirm Action
    </Button>
  );
}`,
    nativeUsage: `import { Button } from "@xenon/native";

export function Example() {
  return (
    <Button variant="accent" size="md">
      Confirm Action
    </Button>
  );
}`,
  },
  {
    id: "icon-button",
    name: "IconButton",
    category: "Primitives",
    description:
      "Concentric circular action button strictly optimized for Phosphor Thin icons with mandatory accessible labeling.",
    a11y: "Enforces non-empty ariaLabel prop, rendered with role='button' and accessible screen reader name.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "ariaLabel",
        type: "string",
        required: true,
        description: "Mandatory accessible description for screen readers.",
      },
      {
        name: "variant",
        type: "'accent' | 'filled' | 'subtle' | 'outline' | 'ghost' | 'glass'",
        defaultValue: "'subtle'",
        description: "Surface styling.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Icon and target dimension.",
      },
      {
        name: "glassType",
        type: "'regular' | 'clear'",
        defaultValue: "'regular'",
        description: "Liquid Glass material type when variant='glass'.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables button interactions.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "Displays loading spinner.",
      },
      {
        name: "onClick",
        type: "(event: MouseEvent<HTMLButtonElement>) => void",
        description: "Click event handler.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Phosphor Thin icon element.",
      },
    ],
    webUsage: `import { IconButton, Icon } from "@xenon-kit/web";
import { Gear } from "@phosphor-icons/react";

export function Example() {
  return (
    <IconButton ariaLabel="Settings" variant="subtle" size="md">
      <Icon size="sm">
        <Gear />
      </Icon>
    </IconButton>
  );
}`,
    nativeUsage: `import { IconButton, Icon } from "@xenon/native";

export function Example() {
  return (
    <IconButton ariaLabel="Settings" variant="subtle" size="md">
      <Icon size="sm">
        <GearIcon />
      </Icon>
    </IconButton>
  );
}`,
  },
  {
    id: "button-group",
    name: "ButtonGroup",
    category: "Primitives",
    description:
      "Grouped capsule action bar where child buttons share outer bounds and internal 1px hairline dividers.",
    a11y: "Wraps buttons in a role='group' container with optional aria-label.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'accent' | 'filled' | 'subtle' | 'outline' | 'ghost' | 'glass'",
        defaultValue: "'outline'",
        description: "Default variant passed to children.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Default button size.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables all child buttons.",
      },
      { name: "children", type: "ReactNode", description: "Button elements." },
    ],
    webUsage: `import { ButtonGroup, Button } from "@xenon-kit/web";

export function Example() {
  return (
    <ButtonGroup variant="outline" size="sm">
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button>Paste</Button>
    </ButtonGroup>
  );
}`,
    nativeUsage: `import { ButtonGroup, Button } from "@xenon/native";

export function Example() {
  return (
    <ButtonGroup variant="outline" size="sm">
      <Button>Cut</Button>
      <Button>Copy</Button>
      <Button>Paste</Button>
    </ButtonGroup>
  );
}`,
  },
  {
    id: "surface",
    name: "Surface",
    category: "Primitives",
    description:
      "Base structural container supporting concentric radius inheritance and Apple HIG Liquid Glass floating layers.",
    a11y: "Semantic generic container, transparent to screen readers.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'default' | 'subtle' | 'glass'",
        defaultValue: "'default'",
        description: "Background surface tone and treatment.",
      },
      {
        name: "glassType",
        type: "'regular' | 'clear'",
        defaultValue: "'regular'",
        description: "Liquid Glass material for floating layers.",
      },
      {
        name: "radius",
        type: "RadiusStop | number",
        defaultValue: "inherit",
        description: "Explicit corner radius override (clamped).",
      },
      {
        name: "padding",
        type: "number",
        defaultValue: "24",
        description: "Internal content inset in pixels.",
      },
      { name: "children", type: "ReactNode", description: "Surface content." },
    ],
    webUsage: `import { Surface, Text } from "@xenon-kit/web";

export function Example() {
  return (
    <Surface variant="subtle" padding={24}>
      <Text>Concentric surface layer</Text>
    </Surface>
  );
}`,
    nativeUsage: `import { Surface, Text } from "@xenon/native";

export function Example() {
  return (
    <Surface variant="subtle" padding={24}>
      <Text>Concentric surface layer</Text>
    </Surface>
  );
}`,
  },
  {
    id: "typography",
    name: "Typography (Text & Heading)",
    category: "Primitives",
    description:
      "Apple HIG calibrated Geist Sans typography system restricted strictly to light weights (200, 300, 400).",
    a11y: "Emits semantic h1-h6 headings and p/span elements with appropriate text hierarchy.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "styleKey",
        type: "'display' | 'largeTitle' | 'title1' | 'title2' | 'title3' | 'headline' | 'body' | 'callout' | 'subhead' | 'footnote' | 'caption1' | 'caption2'",
        defaultValue: "'body'",
        description: "Apple HIG typography scale tier.",
      },
      {
        name: "weight",
        type: "200 | 300 | 400",
        defaultValue: "300",
        description: "Font weight (weights >= 500 are banned in Xenon).",
      },
      {
        name: "tone",
        type: "'default' | 'muted' | 'accent' | 'danger' | 'warning' | 'success' | 'info'",
        defaultValue: "'default'",
        description: "Color token tone.",
      },
      {
        name: "align",
        type: "'left' | 'center' | 'right'",
        defaultValue: "'left'",
        description: "Text alignment.",
      },
      {
        name: "tabular",
        type: "boolean",
        defaultValue: "false",
        description: "Enables tabular mono digits for numbers.",
      },
      {
        name: "truncate",
        type: "boolean",
        defaultValue: "false",
        description: "Truncates overflow with ellipsis.",
      },
      {
        name: "as",
        type: "'p' | 'span' | 'div' | 'label'",
        defaultValue: "'p'",
        description: "Underlying HTML element tag for Text.",
      },
    ],
    webUsage: `import { Heading, Text } from "@xenon-kit/web";

export function Example() {
  return (
    <>
      <Heading level={1} weight={200}>Minimalist Architecture</Heading>
      <Text styleKey="body" tone="muted" weight={300}>Geist typography with negative space.</Text>
    </>
  );
}`,
    nativeUsage: `import { Heading, Text } from "@xenon/native";

export function Example() {
  return (
    <>
      <Heading level={1} weight={200}>Minimalist Architecture</Heading>
      <Text styleKey="body" tone="muted" weight={300}>Geist typography with negative space.</Text>
    </>
  );
}`,
  },

  // Form Controls
  {
    id: "input",
    name: "Input",
    category: "Form Controls",
    description:
      "Restrained architectural text field (6-8px radius, 12px optical padding) avoiding stadium pill shapes.",
    a11y: "Accessible input element supporting ARIA descriptions, errors, and clear triggers.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Height and typography scale.",
      },
      {
        name: "variant",
        type: "'default' | 'search'",
        defaultValue: "'default'",
        description: "Field variant style.",
      },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "''",
        description: "Subtle ghost prompt text.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction.",
      },
      {
        name: "clearable",
        type: "boolean",
        defaultValue: "false",
        description: "Shows clear trigger on text presence.",
      },
      {
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Highlights 1px boundary in danger tone.",
      },
      {
        name: "surface",
        type: "'surface' | 'subtle'",
        defaultValue: "'subtle'",
        description: "Background surface tone.",
      },
      {
        name: "prefix",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Icon or badge inside left boundary.",
      },
      {
        name: "suffix",
        type: "ReactNode",
        defaultValue: "undefined",
        description: "Icon or shortcut badge inside right boundary.",
      },
      {
        name: "shortcutKey",
        type: "string",
        description: "Keyboard shortcut hint badge displayed on right.",
      },
    ],
    webUsage: `import { Input } from "@xenon-kit/web";

export function Example() {
  return <Input placeholder="Project identifier..." size="md" clearable />;
}`,
    nativeUsage: `import { Input } from "@xenon/native";

export function Example() {
  return <Input placeholder="Project identifier..." size="md" clearable />;
}`,
  },
  {
    id: "field",
    name: "Field",
    category: "Form Controls",
    description:
      "Persistent structural wrapper binding labels, helper annotations, and error callouts to input controls.",
    a11y: "Connects label and input via htmlFor/id, injects aria-describedby for errors and helper texts.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "label",
        type: "string",
        required: true,
        description: "Persistent top label text.",
      },
      {
        name: "helpText",
        type: "string",
        description: "Supporting helper guidance text.",
      },
      {
        name: "error",
        type: "string",
        description: "Error message displayed in danger tone.",
      },
      {
        name: "optional",
        type: "boolean",
        defaultValue: "false",
        description: "Displays subtle optional indicator tag.",
      },
      {
        name: "htmlFor",
        type: "string",
        description: "Associated control ID for accessible binding.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Form control element.",
      },
    ],
    webUsage: `import { Field, Input } from "@xenon-kit/web";

export function Example() {
  return (
    <Field label="Domain Name" helpText="Enter your custom subdomain">
      <Input placeholder="workspace.xenon.design" size="md" />
    </Field>
  );
}`,
    nativeUsage: `import { Field, Input } from "@xenon/native";

export function Example() {
  return (
    <Field label="Domain Name" helpText="Enter your custom subdomain">
      <Input placeholder="workspace.xenon.design" size="md" />
    </Field>
  );
}`,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Form Controls",
    description:
      "Architectural multi-line text input with smooth auto-expansion, character limit tracking, and hairline borders.",
    a11y: "Standard textarea element with full keyboard and screen reader accessibility.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Dimension and typography scale.",
      },
      {
        name: "rows",
        type: "number",
        defaultValue: "3",
        description: "Initial visible line count.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Ghost prompt text.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction.",
      },
      {
        name: "invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Danger error state.",
      },
      {
        name: "maxLength",
        type: "number",
        description: "Enforces max character limit with live counter.",
      },
    ],
    webUsage: `import { Textarea } from "@xenon-kit/web";

export function Example() {
  return <Textarea placeholder="Provide design specifications..." rows={4} maxLength={500} />;
}`,
    nativeUsage: `import { Textarea } from "@xenon/native";

export function Example() {
  return <Textarea placeholder="Provide design specifications..." rows={4} maxLength={500} />;
}`,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Form Controls",
    description:
      "Restrained geometric square checkbox with crisp Phosphor Thin checkmark and indeterminate state support.",
    a11y: "Native role='checkbox', supports aria-checked='mixed', toggled via Space bar.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "false",
        description: "Current checked state.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        defaultValue: "false",
        description: "Indeterminate visual state (renders horizontal line).",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Callback fired when checked state toggles.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Box dimension: sm (16px), md (20px), lg (24px).",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction.",
      },
      {
        name: "error",
        type: "boolean",
        defaultValue: "false",
        description: "Invalid / error state.",
      },
      {
        name: "label",
        type: "ReactNode",
        description: "Accessible text label placed adjacent to indicator.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Secondary supporting text placed beneath label.",
      },
    ],
    webUsage: `import { Checkbox } from "@xenon-kit/web";

export function Example() {
  return <Checkbox label="Accept terms and specifications" defaultChecked />;
}`,
    nativeUsage: `import { Checkbox } from "@xenon/native";

export function Example() {
  return <Checkbox label="Accept terms and specifications" defaultChecked />;
}`,
  },
  {
    id: "switch",
    name: "Switch",
    category: "Form Controls",
    description:
      "Apple HIG calibrated sliding toggle with physics spring release and native haptic click feedback.",
    a11y: "Role='switch', announces aria-checked state, operated with Space and Enter keys.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "false",
        description: "Controlled on/off state.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Callback fired when toggle state changes.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Size tier: sm (36x20), md (46x26), lg (56x32).",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disabled interaction state.",
      },
      {
        name: "label",
        type: "ReactNode",
        description: "Accessible text label placed adjacent to switch.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Supporting subtext.",
      },
    ],
    webUsage: `import { Switch } from "@xenon-kit/web";

export function Example() {
  return <Switch label="Liquid Glass Blur" defaultChecked />;
}`,
    nativeUsage: `import { Switch } from "@xenon/native";

export function Example() {
  return <Switch label="Liquid Glass Blur" defaultChecked />;
}`,
  },
  {
    id: "slider",
    name: "Slider",
    category: "Form Controls",
    description:
      "Precision track slider with Apple spring thumb response, live value tooltip, and discrete stop ticks.",
    a11y: "Role='slider', exposes aria-valuemin, aria-valuemax, and aria-valuenow, controllable via arrow keys.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "value",
        type: "number",
        defaultValue: "0",
        description: "Controlled current numeric value.",
      },
      {
        name: "min",
        type: "number",
        defaultValue: "0",
        description: "Minimum permitted value.",
      },
      {
        name: "max",
        type: "number",
        defaultValue: "100",
        description: "Maximum permitted value.",
      },
      {
        name: "step",
        type: "number",
        defaultValue: "1",
        description: "Discrete snap interval step.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Track thickness and thumb scale.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction.",
      },
      {
        name: "onValueChange",
        type: "(value: number) => void",
        description: "Fired during live drag or keyboard interaction.",
      },
      {
        name: "onValueCommit",
        type: "(value: number) => void",
        description: "Fired when interaction commits (release).",
      },
    ],
    webUsage: `import { Slider } from "@xenon-kit/web";

export function Example() {
  return <Slider min={0} max={6} step={1} defaultValue={3} size="md" />;
}`,
    nativeUsage: `import { Slider } from "@xenon/native";

export function Example() {
  return <Slider min={0} max={6} step={1} defaultValue={3} size="md" />;
}`,
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    category: "Form Controls",
    description:
      "Sliding pill segmented group with animated indicator and spring squash transition across items.",
    a11y: "Role='radiogroup' or 'tablist' with roving focus and arrow key navigation.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "options",
        type: "Array<{ value: string; label: ReactNode; disabled?: boolean }>",
        required: true,
        description: "Array of segment options.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled selected option value.",
      },
      {
        name: "onValueChange",
        type: "(val: string) => void",
        description: "Selection change handler.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Control height and typography scale.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables entire segmented group.",
      },
    ],
    webUsage: `import { SegmentedControl } from "@xenon-kit/web";

export function Example() {
  return (
    <SegmentedControl
      options={[
        { value: "preview", label: "Preview" },
        { value: "code", label: "Code" },
      ]}
      defaultValue="preview"
      size="md"
    />
  );
}`,
    nativeUsage: `import { SegmentedControl } from "@xenon/native";

export function Example() {
  return (
    <SegmentedControl
      options={[
        { value: "preview", label: "Preview" },
        { value: "code", label: "Code" },
      ]}
      defaultValue="preview"
      size="md"
    />
  );
}`,
  },

  // Navigation
  {
    id: "navbar",
    name: "Navbar & GlassBar",
    category: "Navigation",
    description:
      "Top navigation chrome featuring adaptive scroll elevation for Navbar and permanent Liquid Glass for GlassBar.",
    a11y: "Semantic <nav> element with role='navigation' and landmark identification.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "bordered",
        type: "boolean",
        defaultValue: "true",
        description: "1px bottom hairline boundary.",
      },
      {
        name: "fixed",
        type: "boolean",
        defaultValue: "false",
        description: "Pinned to top viewport.",
      },
      {
        name: "glass",
        type: "boolean",
        defaultValue: "false",
        description: "Liquid Glass background material.",
      },
      {
        name: "glassType",
        type: "'regular' | 'clear'",
        defaultValue: "'regular'",
        description: "Material blur and opacity variant.",
      },
      { name: "children", type: "ReactNode", description: "Navbar content." },
    ],
    webUsage: `import { GlassBar, Text } from "@xenon-kit/web";

export function Example() {
  return (
    <GlassBar bordered>
      <Text weight={400}>Xenon System</Text>
    </GlassBar>
  );
}`,
    nativeUsage: `import { GlassBar, Text } from "@xenon/native";

export function Example() {
  return (
    <GlassBar bordered>
      <Text weight={400}>Xenon System</Text>
    </GlassBar>
  );
}`,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "Navigation",
    description:
      "Background-less architectural sidebar navigation with collapsible rail mode, groups, and soft dividers.",
    a11y: "Semantic landmark <nav aria-label='Sidebar'> with accessible expandable groups.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'floating' | 'docked'",
        defaultValue: "'docked'",
        description: "Display style and layout pinning.",
      },
      {
        name: "bordered",
        type: "boolean",
        defaultValue: "true",
        description: "1px perimeter hairline boundary.",
      },
      {
        name: "collapsible",
        type: "'rail' | 'offcanvas' | 'none'",
        defaultValue: "'rail'",
        description: "Collapse behavior mode.",
      },
      {
        name: "collapsed",
        type: "boolean",
        defaultValue: "false",
        description: "Narrow icon rail state.",
      },
      {
        name: "onCollapsedChange",
        type: "(collapsed: boolean) => void",
        description: "Collapse state change callback.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Sidebar items and groups.",
      },
    ],
    webUsage: `import { Sidebar, SidebarGroup, SidebarItem, SidebarDivider } from "@xenon-kit/web";

export function Example() {
  return (
    <Sidebar variant="docked">
      <SidebarGroup label="Components">
        <SidebarItem active>Button</SidebarItem>
        <SidebarItem>Input</SidebarItem>
      </SidebarGroup>
      <SidebarDivider />
    </Sidebar>
  );
}`,
    nativeUsage: `import { Sidebar, SidebarGroup, SidebarItem } from "@xenon/native";

export function Example() {
  return (
    <Sidebar variant="docked">
      <SidebarGroup label="Components">
        <SidebarItem active>Button</SidebarItem>
        <SidebarItem>Input</SidebarItem>
      </SidebarGroup>
    </Sidebar>
  );
}`,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description:
      "Accessible view switcher supporting pill capsule and sliding hairline underline modes with roving keyboard focus.",
    a11y: "Strict WAI-ARIA Tabs pattern (role='tablist', role='tab', role='tabpanel') with Home, End, and Arrow navigation.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'pill' | 'underline'",
        defaultValue: "'pill'",
        description:
          "Active indicator style: 'pill' capsule or 'underline' 1px hairline.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Uncontrolled initial active tab value.",
      },
      {
        name: "value",
        type: "string",
        description: "Controlled active tab value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Callback fired when active tab changes.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "TabsList and TabsContent elements.",
      },
    ],
    webUsage: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@xenon-kit/web";

export function Example() {
  return (
    <Tabs defaultValue="account" variant="pill">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account configuration</TabsContent>
    </Tabs>
  );
}`,
    nativeUsage: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@xenon/native";

export function Example() {
  return (
    <Tabs defaultValue="account" variant="pill">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account configuration</TabsContent>
    </Tabs>
  );
}`,
  },

  // Overlays
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlays",
    description:
      "Centered modal surface with background scrim, focus restoration, focus trapping, and Apple spring dismissal.",
    a11y: "Role='dialog', aria-modal='true', trap focus inside dialog, dismisses on Escape key.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "open",
        type: "boolean",
        description: "Controlled visibility state.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Default visibility for uncontrolled usage.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Open state change handler.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "DialogTrigger and DialogContent elements.",
      },
    ],
    webUsage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@xenon-kit/web";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="filled">Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <p>Proceed with the requested workspace deployment?</p>
      </DialogContent>
    </Dialog>
  );
}`,
    nativeUsage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@xenon/native";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="filled">Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
  },
  {
    id: "sheet",
    name: "Sheet",
    category: "Overlays",
    description:
      "Slide-over drawer on web and gesture-driven bottom sheet with tactile drag handle on React Native.",
    a11y: "Accessible drawer dialog with focus trapping and ESC dismissal.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "side",
        type: "'bottom' | 'right' | 'left' | 'top'",
        defaultValue: "'right'",
        description: "Drawer slide direction.",
      },
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Initial open state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Open state change callback.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "SheetTrigger and SheetContent elements.",
      },
    ],
    webUsage: `import { Sheet, SheetTrigger, SheetContent, Button } from "@xenon-kit/web";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <h3>Workspace Details</h3>
      </SheetContent>
    </Sheet>
  );
}`,
    nativeUsage: `import { Sheet, SheetTrigger, SheetContent, Button } from "@xenon/native";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <Text>Native Drag Sheet</Text>
      </SheetContent>
    </Sheet>
  );
}`,
  },
  {
    id: "dropdown-menu",
    name: "DropdownMenu",
    category: "Overlays",
    description:
      "Hairline contextual action menu with openOnHover option, keyboard navigation, groups, and shortcuts.",
    a11y: "Strict WAI-ARIA Menu pattern (role='menu', role='menuitem') with roving tabIndex.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      { name: "open", type: "boolean", description: "Controlled open state." },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Initial open state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Open change handler.",
      },
      {
        name: "openOnHover",
        type: "boolean",
        defaultValue: "false",
        description: "Opens dropdown on pointer hover.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "DropdownMenuTrigger and DropdownMenuContent elements.",
      },
    ],
    webUsage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "@xenon-kit/web";

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem shortcut="⌘S">Save</DropdownMenuItem>
        <DropdownMenuItem shortcut="⌘E">Export</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    nativeUsage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "@xenon/native";

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Save</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
  },
  {
    id: "select",
    name: "Select",
    category: "Overlays",
    description:
      "Architectural custom listbox on web and native picker sheet on Expo with dynamic radius matching global tokens.",
    a11y: "Role='combobox' / role='listbox' with ARIA expanded and active-descendant management.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "value",
        type: "string",
        description: "Controlled active selected option value.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Initial selected option value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Callback fired when option is chosen.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Trigger height and typography scale.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction.",
      },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "'Select option...'",
        description: "Prompt label when nothing selected.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "SelectTrigger and SelectContent elements.",
      },
    ],
    webUsage: `import { Select, SelectTrigger, SelectContent, SelectItem } from "@xenon-kit/web";

export function Example() {
  return (
    <Select defaultValue="pro" size="md">
      <SelectTrigger />
      <SelectContent>
        <SelectItem value="starter">Starter Plan</SelectItem>
        <SelectItem value="pro">Pro Architect</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
    nativeUsage: `import { Select, SelectTrigger, SelectContent, SelectItem } from "@xenon/native";

export function Example() {
  return (
    <Select defaultValue="pro" size="md">
      <SelectTrigger />
      <SelectContent>
        <SelectItem value="starter">Starter Plan</SelectItem>
        <SelectItem value="pro">Pro Architect</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
  },
  {
    id: "command-palette",
    name: "CommandPalette",
    category: "Overlays",
    description:
      "Global quick-launcher overlay triggered by ⌘K with keyboard arrow navigation and categorized action groups.",
    a11y: "ARIA combobox with full keyboard roving focus, live filtered search announcements.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        description: "Controlled visibility state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        required: true,
        description: "Open state change handler.",
      },
      {
        name: "items",
        type: "CommandPaletteItem[]",
        required: true,
        description: "Searchable action items list.",
      },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "'Search...'",
        description: "Input placeholder prompt.",
      },
    ],
    webUsage: `import { CommandPalette } from "@xenon-kit/web";

export function Example() {
  return (
    <CommandPalette
      open={isOpen}
      onOpenChange={setOpen}
      items={[
        { id: "1", label: "Button", group: "Primitives" },
        { id: "2", label: "Select", group: "Overlays" },
      ]}
    />
  );
}`,
    nativeUsage: `import { CommandPalette } from "@xenon/native";

export function Example() {
  return (
    <CommandPalette
      open={isOpen}
      onOpenChange={setOpen}
      items={[
        { id: "1", label: "Button", group: "Primitives" },
      ]}
    />
  );
}`,
  },

  // Feedback & Data Display
  {
    id: "badge",
    name: "Badge",
    category: "Feedback & Data Display",
    description:
      "Compact status indicator with acid accent tones, subtle neutral styles, and optional live pulse dot.",
    a11y: "Screen-reader readable status tag, aria-hidden dot indicator.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "tone",
        type: "'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger'",
        defaultValue: "'neutral'",
        description: "Semantic color status tone.",
      },
      {
        name: "variant",
        type: "'subtle' | 'outline' | 'accent' | 'dot'",
        defaultValue: "'subtle'",
        description: "Visual border and background style.",
      },
      {
        name: "size",
        type: "'sm' | 'md'",
        defaultValue: "'md'",
        description: "Scale and typography.",
      },
      {
        name: "dot",
        type: "boolean",
        defaultValue: "false",
        description: "Displays leading status indicator dot.",
      },
      { name: "count", type: "number", description: "Numeric badge counter." },
      {
        name: "maxCount",
        type: "number",
        defaultValue: "99",
        description: "Maximum value before capping at +.",
      },
      { name: "children", type: "ReactNode", description: "Badge label text." },
    ],
    webUsage: `import { Badge } from "@xenon-kit/web";

export function Example() {
  return <Badge tone="accent" variant="subtle" dot>Online</Badge>;
}`,
    nativeUsage: `import { Badge } from "@xenon/native";

export function Example() {
  return <Badge tone="accent" variant="subtle" dot>Online</Badge>;
}`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback & Data Display",
    description:
      "Inline semantic status callout with Phosphor Thin icons, crisp 1px perimeter border, and restrained fill.",
    a11y: "Role='alert' or role='status' depending on severity tone.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "tone",
        type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'",
        defaultValue: "'info'",
        description: "Semantic severity tone.",
      },
      {
        name: "variant",
        type: "'subtle' | 'surface' | 'outline'",
        defaultValue: "'subtle'",
        description: "Surface background style.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Optional headline text.",
      },
      {
        name: "dismissible",
        type: "boolean",
        defaultValue: "false",
        description: "Enables close dismiss trigger.",
      },
      {
        name: "onDismiss",
        type: "() => void",
        description: "Fired when dismiss action is triggered.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Alert body message.",
      },
    ],
    webUsage: `import { Alert } from "@xenon-kit/web";

export function Example() {
  return <Alert tone="warning" variant="subtle" title="Token Deprecation">Use compiled motion tokens.</Alert>;
}`,
    nativeUsage: `import { Alert } from "@xenon/native";

export function Example() {
  return <Alert tone="warning" variant="subtle" title="Token Deprecation">Use compiled motion tokens.</Alert>;
}`,
  },
  {
    id: "table",
    name: "Table & DataTable",
    category: "Feedback & Data Display",
    description:
      "Outer-rounded hairline bordered table with tabular numbers, clean row highlighting, and horizontal containment.",
    a11y: "Full HTML table semantics (caption, thead, tbody, th with scope='col', td).",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'default' | 'subtle' | 'bordered' | 'striped'",
        defaultValue: "'default'",
        description: "Border and divider treatment.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        defaultValue: "'md'",
        description: "Cell padding scale.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        defaultValue: "false",
        description: "Spans 100% width of parent.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "TableHeader, TableBody, TableRow elements.",
      },
    ],
    webUsage: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@xenon-kit/web";

export function Example() {
  return (
    <Table variant="bordered" fullWidth>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>variant</TableCell>
          <TableCell>string</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    nativeUsage: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@xenon/native";

export function Example() {
  return (
    <Table variant="bordered" fullWidth>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>variant</TableCell>
          <TableCell>string</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Feedback & Data Display",
    description:
      "Apple-grade fluid grid disclosure (zero instant snappy jumps) with 280ms cubic-bezier transitions and spring caret rotation.",
    a11y: "Strict WAI-ARIA Accordion pattern with aria-expanded and aria-controls.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "variant",
        type: "'default' | 'bordered' | 'separated'",
        defaultValue: "'default'",
        description: "Container visual treatment and borders.",
      },
      {
        name: "type",
        type: "'single' | 'multiple'",
        defaultValue: "'single'",
        description: "Expansion mode: one item at a time or multi-open.",
      },
      {
        name: "collapsible",
        type: "boolean",
        defaultValue: "true",
        description: "Allows closing active item in single mode.",
      },
      {
        name: "value",
        type: "string | string[]",
        description: "Controlled expanded item value(s).",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        description: "Initial expanded item value(s).",
      },
      {
        name: "onValueChange",
        type: "(value: string | string[]) => void",
        description: "Expanded state change callback.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "AccordionItem elements.",
      },
    ],
    webUsage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@xenon-kit/web";

export function Example() {
  return (
    <Accordion type="single" variant="bordered">
      <AccordionItem value="item-1">
        <AccordionTrigger>What makes Xenon different?</AccordionTrigger>
        <AccordionContent>Xenon enforces mathematical concentric radii and zero shadows.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    nativeUsage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@xenon/native";

export function Example() {
  return (
    <Accordion type="single" variant="bordered">
      <AccordionItem value="item-1">
        <AccordionTrigger>What makes Xenon different?</AccordionTrigger>
        <AccordionContent>Xenon enforces mathematical concentric radii and zero shadows.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  },
  {
    id: "avatar",
    name: "Avatar & AvatarGroup",
    category: "Feedback & Data Display",
    description:
      "Circular avatar with graceful image loading, typographic initial fallbacks, and overlapping grouped clustering.",
    a11y: "Alt text fallback on image, aria-label describing user initials.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "size",
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        defaultValue: "'md'",
        description:
          "Dimension scale: xs (24), sm (32), md (40), lg (48), xl (64).",
      },
      {
        name: "shape",
        type: "'circle' | 'rounded'",
        defaultValue: "'circle'",
        description: "Geometric shape profile.",
      },
      {
        name: "name",
        type: "string",
        description: "User name for automatic initials generation.",
      },
      { name: "src", type: "string", description: "Image source URL." },
      {
        name: "fallback",
        type: "ReactNode",
        description: "Explicit custom fallback if image fails.",
      },
      {
        name: "status",
        type: "'online' | 'offline' | 'busy' | 'away'",
        description: "Presence indicator status.",
      },
      {
        name: "statusPlacement",
        type: "'bottom-right' | 'top-right'",
        defaultValue: "'bottom-right'",
        description: "Placement of status dot indicator.",
      },
    ],
    webUsage: `import { Avatar, AvatarGroup } from "@xenon-kit/web";

export function Example() {
  return (
    <AvatarGroup max={3}>
      <Avatar name="Dieter Rams" size="md" status="online" />
      <Avatar name="Jony Ive" size="md" />
    </AvatarGroup>
  );
}`,
    nativeUsage: `import { Avatar, AvatarGroup } from "@xenon/native";

export function Example() {
  return (
    <AvatarGroup max={3}>
      <Avatar name="Dieter Rams" size="md" status="online" />
      <Avatar name="Jony Ive" size="md" />
    </AvatarGroup>
  );
}`,
  },
  {
    id: "codeblock",
    name: "CodeBlock",
    category: "Feedback & Data Display",
    description:
      "Zero-dependency isomorphic syntax highlighted code block in Geist Mono with copy micro-action and line numbering.",
    a11y: "Accessible pre/code elements, copy button with aria-label.",
    cliInstall: "npx @xenon-kit/cli init",
    npmInstall: "npm install @xenon-kit/web @phosphor-icons/react",
    props: [
      {
        name: "code",
        type: "string",
        required: true,
        description: "Raw code string to display.",
      },
      {
        name: "language",
        type: "string",
        defaultValue: "'typescript'",
        description: "Language for syntax highlighting.",
      },
      {
        name: "variant",
        type: "'default' | 'minimal' | 'bordered'",
        defaultValue: "'default'",
        description: "Container visual treatment.",
      },
      {
        name: "filename",
        type: "string",
        description: "Optional title bar filename.",
      },
      {
        name: "showLineNumbers",
        type: "boolean",
        defaultValue: "true",
        description: "Shows line numbers in gutter.",
      },
      {
        name: "copyable",
        type: "boolean",
        defaultValue: "true",
        description: "Enables copy to clipboard action button.",
      },
    ],
    webUsage: `import { CodeBlock } from "@xenon-kit/web";

export function Example() {
  return <CodeBlock code="const xenon = true;" language="typescript" filename="index.ts" showLineNumbers copyable />;
}`,
    nativeUsage: `import { CodeBlock } from "@xenon/native";

export function Example() {
  return <CodeBlock code="const xenon = true;" language="typescript" filename="index.ts" showLineNumbers copyable />;
}`,
  },
];
