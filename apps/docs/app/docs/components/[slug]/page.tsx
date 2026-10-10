import React, { type ReactElement } from "react";
import { COMPONENTS_REGISTRY } from "../../../docs-data/components-registry";
import { ComponentShowcase } from "../../../components/ComponentShowcase";

export function generateStaticParams(): Array<{ slug: string }> {
  return COMPONENTS_REGISTRY.map((c) => ({ slug: c.id }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ComponentDocPage({
  params,
}: PageProps): Promise<ReactElement> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const entry =
    COMPONENTS_REGISTRY.find((c) => c.id === slug) ?? COMPONENTS_REGISTRY[0];

  return <ComponentShowcase entry={entry} />;
}
