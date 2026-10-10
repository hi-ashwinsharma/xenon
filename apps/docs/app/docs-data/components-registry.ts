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
  category: "Primitives" | "Form Controls" | "Navigation" | "Overlays" | "Feedback & Data Display";
  description: string;
  a11y: string;
  cliInstall: string;
  npmInstall: string;
  props: ComponentPropDoc[];
  webUsage: string;
  nativeUsage: string;
}

export const COMPONENTS_REGISTRY: ComponentDocEntry[] = [
  // Primitives
  {
    id: "button",
    name: "Button",
    category: "Primitives",
    description: "Signature pill-first action control with physics-based spring squash interaction (0.98 scale on press).",
    a11y: "Rendered as native button element with role='button', supports Space and Enter keys, manages disabled and aria-busy states.",
    cliInstall: "npx xenon add button",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'glass'", defaultValue: "'primary'", description: "Visual hierarchy and surface style." },
      { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Touch target and padding scale." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction with 40% opacity." },
      { name: "loading", type: "boolean", defaultValue: "false", description: "Displays loading spinner and sets aria-busy." },
      { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Expands button width to 100% of container." },
      { name: "leftIcon", type: "ReactNode", defaultValue: "undefined", description: "Phosphor Thin icon placed before text." },
      { name: "rightIcon", type: "ReactNode", defaultValue: "undefined", description: "Phosphor Thin icon placed after text." },
    ],
    webUsage: `import { Button } from "@xenon/web";

export function Example() {
  return (
    <Button variant="primary" size="md">
      Confirm Action
    </Button>
  );
}`,
    nativeUsage: `import { Button } from "@xenon/native";

export function Example() {
  return (
    <Button variant="primary" size="md">
      Confirm Action
    </Button>
  );
}`,
  },
  {
    id: "icon-button",
    name: "IconButton",
    category: "Primitives",
    description: "Concentric circular action button strictly optimized for Phosphor Thin icons with mandatory accessible labeling.",
    a11y: "Enforces non-empty ariaLabel prop, rendered with role='button' and accessible screen reader name.",
    cliInstall: "npx xenon add icon-button",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "ariaLabel", type: "string", required: true, description: "Mandatory accessible description for screen readers." },
      { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'glass'", defaultValue: "'subtle'", description: "Surface styling." },
      { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Icon and target dimension." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables button interactions." },
    ],
    webUsage: `import { IconButton, Icon } from "@xenon/web";

export function Example() {
  return (
    <IconButton ariaLabel="Settings" variant="subtle" size="md">
      <Icon size="sm">
        <GearIcon />
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
    description: "Grouped capsule action bar where child buttons share outer bounds and internal 1px hairline dividers.",
    a11y: "Wraps buttons in a role='group' container with optional aria-label.",
    cliInstall: "npx xenon add button-group",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "orientation", type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: "Layout alignment." },
      { name: "attached", type: "boolean", defaultValue: "true", description: "Whether borders merge with internal dividers." },
      { name: "variant", type: "ButtonVariant", defaultValue: "'outline'", description: "Default variant passed to children." },
    ],
    webUsage: `import { ButtonGroup, Button } from "@xenon/web";

export function Example() {
  return (
    <ButtonGroup orientation="horizontal">
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Cut</Button>
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  );
}`,
    nativeUsage: `import { ButtonGroup, Button } from "@xenon/native";

export function Example() {
  return (
    <ButtonGroup orientation="horizontal">
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Cut</Button>
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  );
}`,
  },
  {
    id: "surface",
    name: "Surface",
    category: "Primitives",
    description: "Base structural container supporting concentric radius inheritance and Apple HIG Liquid Glass floating layers.",
    a11y: "Semantic generic container, transparent to screen readers.",
    cliInstall: "npx xenon add surface",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "level", type: "0 | 1 | 2", defaultValue: "0", description: "Background surface tone step." },
      { name: "glass", type: "'regular' | 'clear' | boolean", defaultValue: "false", description: "Liquid Glass material for floating layers." },
      { name: "bordered", type: "boolean", defaultValue: "true", description: "1px crisp hairline perimeter border." },
      { name: "padding", type: "SpaceToken | number", defaultValue: "'md'", description: "Internal content inset." },
    ],
    webUsage: `import { Surface, Text } from "@xenon/web";

export function Example() {
  return (
    <Surface level={1} padding="lg">
      <Text>Concentric surface layer</Text>
    </Surface>
  );
}`,
    nativeUsage: `import { Surface, Text } from "@xenon/native";

export function Example() {
  return (
    <Surface level={1} padding="lg">
      <Text>Concentric surface layer</Text>
    </Surface>
  );
}`,
  },
  {
    id: "typography",
    name: "Typography (Text & Heading)",
    category: "Primitives",
    description: "Apple HIG calibrated Geist Sans typography system restricted strictly to light weights (200, 300, 400).",
    a11y: "Emits semantic h1-h6 headings and p/span elements with appropriate text hierarchy.",
    cliInstall: "npx xenon add typography",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "level", type: "1 | 2 | 3 | 4 | 5 | 6", defaultValue: "1", description: "Heading visual and semantic scale level." },
      { name: "size", type: "TypeScaleToken", defaultValue: "'body'", description: "Text size token (caption, body, callout, title)." },
      { name: "weight", type: "200 | 300 | 400", defaultValue: "300", description: "Font weight (weights >= 500 are banned)." },
      { name: "color", type: "'default' | 'muted' | 'accent'", defaultValue: "'default'", description: "Color token tone." },
    ],
    webUsage: `import { Heading, Text } from "@xenon/web";

export function Example() {
  return (
    <>
      <Heading level={1} weight={200}>Minimalist Architecture</Heading>
      <Text size="body" color="muted">Geist typography with negative space.</Text>
    </>
  );
}`,
    nativeUsage: `import { Heading, Text } from "@xenon/native";

export function Example() {
  return (
    <>
      <Heading level={1} weight={200}>Minimalist Architecture</Heading>
      <Text size="body" color="muted">Geist typography with negative space.</Text>
    </>
  );
}`,
  },

  // Form Controls
  {
    id: "input",
    name: "Input",
    category: "Form Controls",
    description: "Restrained architectural text field (6-8px radius, 12px optical padding) avoiding stadium pill shapes.",
    a11y: "Accessible input element supporting ARIA descriptions, errors, and clear triggers.",
    cliInstall: "npx xenon add input",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "placeholder", type: "string", defaultValue: "''", description: "Subtle ghost prompt text." },
      { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Height and typography scale." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." },
      { name: "clearable", type: "boolean", defaultValue: "false", description: "Shows clear trigger on text presence." },
      { name: "prefix", type: "ReactNode", defaultValue: "undefined", description: "Icon or badge inside left boundary." },
      { name: "suffix", type: "ReactNode", defaultValue: "undefined", description: "Icon or shortcut badge inside right boundary." },
    ],
    webUsage: `import { Input } from "@xenon/web";

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
    description: "Persistent structural wrapper binding labels, helper annotations, and error callouts to input controls.",
    a11y: "Connects label and input via htmlFor/id, injects aria-describedby for errors and helper texts.",
    cliInstall: "npx xenon add field",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "label", type: "string", required: true, description: "Persistent top label." },
      { name: "description", type: "string", defaultValue: "undefined", description: "Supporting helper guidance text." },
      { name: "error", type: "string", defaultValue: "undefined", description: "Error message with Phosphor WarningCircle indicator." },
      { name: "required", type: "boolean", defaultValue: "false", description: "Displays subtle required tag." },
    ],
    webUsage: `import { Field, Input } from "@xenon/web";

export function Example() {
  return (
    <Field label="Domain Name" description="Enter your custom subdomain">
      <Input placeholder="workspace.xenon.design" />
    </Field>
  );
}`,
    nativeUsage: `import { Field, Input } from "@xenon/native";

export function Example() {
  return (
    <Field label="Domain Name" description="Enter your custom subdomain">
      <Input placeholder="workspace.xenon.design" />
    </Field>
  );
}`,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Form Controls",
    description: "Architectural multi-line text input with smooth auto-expansion, character limit tracking, and hairline borders.",
    a11y: "Standard textarea element with full keyboard and screen reader accessibility.",
    cliInstall: "npx xenon add textarea",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "rows", type: "number", defaultValue: "3", description: "Initial visible line count." },
      { name: "maxLength", type: "number", defaultValue: "undefined", description: "Enforces max character limit with live counter." },
      { name: "resize", type: "'none' | 'vertical'", defaultValue: "'vertical'", description: "Resize direction constraints." },
    ],
    webUsage: `import { Textarea } from "@xenon/web";

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
    description: "Restrained geometric square checkbox with crisp Phosphor Thin checkmark and indeterminate state support.",
    a11y: "Native role='checkbox', supports aria-checked='mixed', toggled via Space bar.",
    cliInstall: "npx xenon add checkbox",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "checked", type: "boolean | 'indeterminate'", defaultValue: "false", description: "Current checked state." },
      { name: "label", type: "string", defaultValue: "undefined", description: "Optional attached label text." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction." },
    ],
    webUsage: `import { Checkbox } from "@xenon/web";

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
    description: "Apple HIG calibrated sliding toggle with physics spring release and native haptic click feedback.",
    a11y: "Role='switch', announces aria-checked state, operated with Space and Enter keys.",
    cliInstall: "npx xenon add switch",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "checked", type: "boolean", defaultValue: "false", description: "Toggle state." },
      { name: "onChange", type: "(checked: boolean) => void", description: "State change callback." },
      { name: "label", type: "string", defaultValue: "undefined", description: "Associated label text." },
      { name: "size", type: "'sm' | 'md'", defaultValue: "'md'", description: "Toggle dimension scale." },
    ],
    webUsage: `import { Switch } from "@xenon/web";

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
    description: "Precision track slider with Apple spring thumb response, live value tooltip, and discrete stop ticks.",
    a11y: "Role='slider', exposes aria-valuemin, aria-valuemax, and aria-valuenow, controllable via arrow keys.",
    cliInstall: "npx xenon add slider",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "value", type: "number", defaultValue: "0", description: "Controlled current value." },
      { name: "min", type: "number", defaultValue: "0", description: "Minimum bounds." },
      { name: "max", type: "number", defaultValue: "100", description: "Maximum bounds." },
      { name: "step", type: "number", defaultValue: "1", description: "Discrete snap interval." },
    ],
    webUsage: `import { Slider } from "@xenon/web";

export function Example() {
  return <Slider min={0} max={6} step={1} defaultValue={4} />;
}`,
    nativeUsage: `import { Slider } from "@xenon/native";

export function Example() {
  return <Slider min={0} max={6} step={1} defaultValue={4} />;
}`,
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    category: "Form Controls",
    description: "Sliding pill segmented group with animated indicator and spring squash transition across items.",
    a11y: "Role='radiogroup' or 'tablist' with roving focus and arrow key navigation.",
    cliInstall: "npx xenon add segmented-control",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "items", type: "Array<{ value: string; label: string }>", required: true, description: "Option segments list." },
      { name: "value", type: "string", description: "Active selected segment value." },
      { name: "onChange", type: "(val: string) => void", description: "Selection change handler." },
    ],
    webUsage: `import { SegmentedControl } from "@xenon/web";

export function Example() {
  return (
    <SegmentedControl
      items={[
        { value: "preview", label: "Preview" },
        { value: "code", label: "Code" },
      ]}
      defaultValue="preview"
    />
  );
}`,
    nativeUsage: `import { SegmentedControl } from "@xenon/native";

export function Example() {
  return (
    <SegmentedControl
      items={[
        { value: "preview", label: "Preview" },
        { value: "code", label: "Code" },
      ]}
      defaultValue="preview"
    />
  );
}`,
  },

  // Navigation
  {
    id: "navbar",
    name: "Navbar & GlassBar",
    category: "Navigation",
    description: "Top navigation chrome featuring adaptive scroll elevation for Navbar and permanent Liquid Glass for GlassBar.",
    a11y: "Semantic <nav> element with role='navigation' and landmark identification.",
    cliInstall: "npx xenon add navbar",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "fixed", type: "boolean", defaultValue: "true", description: "Pinned to top viewport." },
      { name: "bordered", type: "boolean", defaultValue: "true", description: "1px bottom hairline boundary." },
      { name: "glass", type: "boolean", defaultValue: "true", description: "Liquid Glass background material." },
    ],
    webUsage: `import { GlassBar, Text } from "@xenon/web";

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
    description: "Background-less architectural sidebar navigation with collapsible rail mode, groups, and soft dividers.",
    a11y: "Semantic landmark <nav aria-label='Sidebar'> with accessible expandable groups.",
    cliInstall: "npx xenon add sidebar",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "variant", type: "'floating' | 'docked'", defaultValue: "'docked'", description: "Display style." },
      { name: "collapsed", type: "boolean", defaultValue: "false", description: "Narrow icon rail state." },
      { name: "bordered", type: "boolean", defaultValue: "false", description: "Outer border toggle (disabled by default)." },
    ],
    webUsage: `import { Sidebar, SidebarGroup, SidebarItem, SidebarDivider } from "@xenon/web";

export function Example() {
  return (
    <Sidebar>
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
    <Sidebar>
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
    description: "Accessible view switcher supporting pill capsule and sliding hairline underline modes with roving keyboard focus.",
    a11y: "Strict WAI-ARIA Tabs pattern (role='tablist', role='tab', role='tabpanel') with Home, End, and Arrow navigation.",
    cliInstall: "npx xenon add tabs",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "defaultValue", type: "string", required: true, description: "Initial active tab value." },
      { name: "variant", type: "'capsule' | 'underline'", defaultValue: "'capsule'", description: "Indicator aesthetic." },
    ],
    webUsage: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@xenon/web";

export function Example() {
  return (
    <Tabs defaultValue="account">
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
    <Tabs defaultValue="account">
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
    description: "Centered modal surface with background scrim, focus restoration, focus trapping, and Apple spring dismissal.",
    a11y: "Role='dialog', aria-modal='true', trap focus inside dialog, dismisses on Escape key.",
    cliInstall: "npx xenon add dialog",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "open", type: "boolean", description: "Controlled visibility state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Open state change handler." },
    ],
    webUsage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@xenon/web";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
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
        <Button>Open Modal</Button>
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
    description: "Slide-over drawer on web and gesture-driven bottom sheet with tactile drag handle on React Native.",
    a11y: "Accessible drawer dialog with focus trapping and ESC dismissal.",
    cliInstall: "npx xenon add sheet",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "side", type: "'left' | 'right' | 'top' | 'bottom'", defaultValue: "'right'", description: "Drawer slide direction." },
    ],
    webUsage: `import { Sheet, SheetTrigger, SheetContent, Button } from "@xenon/web";

export function Example() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
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
        <Button>Open Sheet</Button>
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
    description: "Hairline contextual action menu with openOnHover option, keyboard navigation, groups, and shortcuts.",
    a11y: "Strict WAI-ARIA Menu pattern (role='menu', role='menuitem') with roving tabIndex.",
    cliInstall: "npx xenon add dropdown-menu",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "openOnHover", type: "boolean", defaultValue: "false", description: "Opens dropdown on pointer hover." },
    ],
    webUsage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "@xenon/web";

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
    description: "Architectural custom listbox on web and native picker sheet on Expo with dynamic radius matching global tokens.",
    a11y: "Role='combobox' / role='listbox' with ARIA expanded and active-descendant management.",
    cliInstall: "npx xenon add select",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "placeholder", type: "string", defaultValue: "'Select option...'", description: "Default prompt label." },
      { name: "defaultValue", type: "string", description: "Initial selected option value." },
    ],
    webUsage: `import { Select, SelectTrigger, SelectContent, SelectItem } from "@xenon/web";

export function Example() {
  return (
    <Select defaultValue="pro">
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
    <Select defaultValue="pro">
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
    description: "Global quick-launcher overlay triggered by ⌘K with keyboard arrow navigation and categorized action groups.",
    a11y: "ARIA combobox with full keyboard roving focus, live filtered search announcements.",
    cliInstall: "npx xenon add command-palette",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "open", type: "boolean", required: true, description: "Controlled visibility state." },
      { name: "onClose", type: "() => void", required: true, description: "Dismissal handler." },
      { name: "items", type: "CommandPaletteItem[]", required: true, description: "Searchable action items list." },
    ],
    webUsage: `import { CommandPalette } from "@xenon/web";

export function Example() {
  return (
    <CommandPalette
      open={isOpen}
      onClose={() => setOpen(false)}
      items={[
        { id: "1", title: "Button", category: "Primitives" },
        { id: "2", title: "Select", category: "Overlays" },
      ]}
    />
  );
}`,
    nativeUsage: `import { CommandPalette } from "@xenon/native";

export function Example() {
  return (
    <CommandPalette
      open={isOpen}
      onClose={() => setOpen(false)}
      items={[
        { id: "1", title: "Button", category: "Primitives" },
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
    description: "Compact status indicator with acid accent tones, subtle neutral styles, and optional live pulse dot.",
    a11y: "Screen-reader readable status tag, aria-hidden dot indicator.",
    cliInstall: "npx xenon add badge",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "variant", type: "'accent' | 'neutral' | 'success' | 'warning' | 'danger'", defaultValue: "'neutral'", description: "Semantic color style." },
      { name: "size", type: "'sm' | 'md'", defaultValue: "'md'", description: "Scale and padding." },
      { name: "dot", type: "boolean", defaultValue: "false", description: "Displays leading status dot." },
    ],
    webUsage: `import { Badge } from "@xenon/web";

export function Example() {
  return <Badge variant="accent" dot>Online</Badge>;
}`,
    nativeUsage: `import { Badge } from "@xenon/native";

export function Example() {
  return <Badge variant="accent" dot>Online</Badge>;
}`,
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback & Data Display",
    description: "Inline semantic status callout with Phosphor Thin icons, crisp 1px perimeter border, and restrained fill.",
    a11y: "Role='alert' or role='status' depending on severity variant.",
    cliInstall: "npx xenon add alert",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "variant", type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: "Severity tone." },
      { name: "title", type: "string", description: "Optional bold headline." },
      { name: "children", type: "ReactNode", description: "Body message." },
    ],
    webUsage: `import { Alert } from "@xenon/web";

export function Example() {
  return <Alert variant="warning" title="Token Deprecation">Use compiled motion tokens.</Alert>;
}`,
    nativeUsage: `import { Alert } from "@xenon/native";

export function Example() {
  return <Alert variant="warning" title="Token Deprecation">Use compiled motion tokens.</Alert>;
}`,
  },
  {
    id: "table",
    name: "Table & DataTable",
    category: "Feedback & Data Display",
    description: "Outer-rounded hairline bordered table with tabular numbers, clean row highlighting, and horizontal containment.",
    a11y: "Full HTML table semantics (caption, thead, tbody, th with scope='col', td).",
    cliInstall: "npx xenon add table",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "variant", type: "'default' | 'bordered' | 'minimal'", defaultValue: "'bordered'", description: "Border and divider treatment." },
      { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Cell padding scale." },
      { name: "fullWidth", type: "boolean", defaultValue: "true", description: "Spans 100% width." },
    ],
    webUsage: `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@xenon/web";

export function Example() {
  return (
    <Table variant="bordered">
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
    <Table variant="bordered">
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
    description: "Apple-grade fluid grid disclosure (zero instant snappy jumps) with 280ms cubic-bezier transitions and spring caret rotation.",
    a11y: "Strict WAI-ARIA Accordion pattern with aria-expanded and aria-controls.",
    cliInstall: "npx xenon add accordion",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "type", type: "'single' | 'multiple'", defaultValue: "'single'", description: "Expansion mode." },
      { name: "variant", type: "'default' | 'bordered' | 'separated'", defaultValue: "'default'", description: "Container visual treatment." },
    ],
    webUsage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@xenon/web";

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
    description: "Circular avatar with graceful image loading, typographic initial fallbacks, and overlapping grouped clustering.",
    a11y: "Alt text fallback on image, aria-label describing user initials.",
    cliInstall: "npx xenon add avatar",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "src", type: "string", description: "Image source URL." },
      { name: "fallback", type: "string", description: "Text initials when image is unavailable." },
      { name: "size", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Dimension scale." },
    ],
    webUsage: `import { Avatar, AvatarGroup } from "@xenon/web";

export function Example() {
  return (
    <AvatarGroup max={3}>
      <Avatar fallback="AS" />
      <Avatar fallback="DK" />
      <Avatar fallback="XC" />
    </AvatarGroup>
  );
}`,
    nativeUsage: `import { Avatar, AvatarGroup } from "@xenon/native";

export function Example() {
  return (
    <AvatarGroup max={3}>
      <Avatar fallback="AS" />
      <Avatar fallback="DK" />
    </AvatarGroup>
  );
}`,
  },
  {
    id: "codeblock",
    name: "CodeBlock",
    category: "Feedback & Data Display",
    description: "Zero-dependency isomorphic syntax highlighted code block in Geist Mono with copy micro-action and line numbering.",
    a11y: "Accessible pre/code elements, copy button with aria-label.",
    cliInstall: "npx xenon add codeblock",
    npmInstall: "pnpm add @xenon/web @xenon/core",
    props: [
      { name: "code", type: "string", required: true, description: "Raw code string to display." },
      { name: "language", type: "string", defaultValue: "'typescript'", description: "Language for syntax highlighting." },
      { name: "filename", type: "string", description: "Optional title bar filename." },
      { name: "lineNumbers", type: "boolean", defaultValue: "true", description: "Shows line numbers in gutter." },
      { name: "copyable", type: "boolean", defaultValue: "true", description: "Enables copy to clipboard button." },
    ],
    webUsage: `import { CodeBlock } from "@xenon/web";

export function Example() {
  return <CodeBlock code="const xenon = true;" language="typescript" filename="index.ts" />;
}`,
    nativeUsage: `import { CodeBlock } from "@xenon/native";

export function Example() {
  return <CodeBlock code="const xenon = true;" language="typescript" filename="index.ts" />;
}`,
  },
];
