import { NextResponse } from "next/server";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";

export async function GET() {
  const index = {
    $schema: "https://xenon.design/schema/registry.json",
    name: "xenon",
    title: "Xenon Component Registry",
    description:
      "Minimalistic, hairline-crisp UI kit for React and React Native built from shared token geometry.",
    version: "0.1.0",
    homepage: "https://xenon.design",
    items: COMPONENTS_REGISTRY.map((item) => ({
      name: item.id,
      type: "registry:ui",
      title: item.name,
      category: item.category,
      description: item.description,
      dependencies: ["@phosphor-icons/react"],
      registryDependencies: ["@xenon/core", "@xenon/tokens"],
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
