import { NextResponse, type NextRequest } from "next/server";
import { COMPONENTS_REGISTRY } from "../../docs-data/components-registry";

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const item of COMPONENTS_REGISTRY) {
    params.push({ slug: item.id });
    params.push({ slug: `${item.id}.json` });
  }
  params.push({ slug: "index.json" });
  return params;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const cleanSlug = slug.replace(/\.json$/, "");

  if (cleanSlug === "index") {
    const index = {
      $schema: "https://xenon.hi-ashwin.xyz/schema/registry.json",
      name: "xenon",
      title: "Xenon Component Registry",
      description:
        "Minimalistic, hairline-crisp UI kit for React and React Native built from shared token geometry.",
      version: "0.1.0",
      homepage: "https://xenon.hi-ashwin.xyz",
      items: COMPONENTS_REGISTRY.map((item) => ({
        name: item.id,
        type: "registry:ui",
        title: item.name,
        category: item.category,
        description: item.description,
        dependencies: ["@xenon-kit/web", "@phosphor-icons/react"],
        registryDependencies: [],
        url: `/r/${item.id}.json`,
      })),
    };

    return NextResponse.json(index, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const component = COMPONENTS_REGISTRY.find(
    (c) =>
      c.id === cleanSlug || c.name.toLowerCase() === cleanSlug.toLowerCase(),
  );

  if (!component) {
    return NextResponse.json(
      { error: `Component "${cleanSlug}" not found in Xenon registry.` },
      { status: 404 },
    );
  }

  const payload = {
    $schema: "https://xenon.hi-ashwin.xyz/schema/registry-item.json",
    name: component.id,
    type: "registry:ui",
    title: component.name,
    category: component.category,
    description: component.description,
    accessibility: component.a11y,
    dependencies: ["@xenon-kit/web", "@phosphor-icons/react"],
    registryDependencies: [],
    install: {
      cli: component.cliInstall,
      npm: component.npmInstall,
    },
    props: component.props,
    usage: {
      web: component.webUsage,
      native: component.nativeUsage,
    },
    files: [
      {
        path: `ui/${component.id}.tsx`,
        content: component.webUsage,
        type: "registry:ui",
        target: `components/ui/${component.id}.tsx`,
      },
    ],
  };

  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
