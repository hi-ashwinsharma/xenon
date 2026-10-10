"use client";

import React, { type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { AllComponentsGallery } from "../../components/AllComponentsGallery";

export default function ComponentsGalleryPage(): ReactElement {
  const router = useRouter();

  return (
    <AllComponentsGallery
      onSelectComponent={(id) => {
        router.push(`/docs/components/${id}`);
      }}
    />
  );
}
