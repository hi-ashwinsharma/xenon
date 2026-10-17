# @xenon-kit/web

Xenon is a minimalistic, hairline-crisp React UI kit: flat surfaces, 1px hairlines, thin type, Phosphor Thin icons and spring motion, built on one shared token geometry.

```bash
npx @xenon-kit/cli init
```

or manually:

```bash
npm install @xenon-kit/web @phosphor-icons/react
```

```tsx
import "@xenon-kit/web/styles.css";
import { XenonProvider, Button } from "@xenon-kit/web";

export function App() {
  return (
    <XenonProvider defaultTheme="dark" defaultAccent="lime">
      <Button variant="accent">Continue</Button>
    </XenonProvider>
  );
}
```

## For AI agents

Read [`AGENTS.md`](./AGENTS.md) in this package before writing UI. The design rules ship in `docs/`, and full docs live at https://xenon.hi-ashwin.xyz (agent index: https://xenon.hi-ashwin.xyz/llms.txt, component registry: https://xenon.hi-ashwin.xyz/r).
