"use client";

import React, {
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { Heading, Stack, Text } from "@xenon/web";

export function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState<boolean>(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 60rem)");
    const update = (): void => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return narrow;
}

export const FILL: CSSProperties = { position: "absolute", inset: 0 };

export const CENTER: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

/** The scene headline: one idea, sized to hold the viewport. */
export function SceneCopy({
  title,
  lead,
  align = "center",
  style,
}: {
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  style?: CSSProperties;
}): ReactElement {
  return (
    <Stack gap={12} align={align} style={style}>
      <Heading
        level={2}
        styleKey="display"
        weight={200}
        align={align === "center" ? "center" : undefined}
      >
        {title}
      </Heading>
      {lead && (
        <Text
          styleKey="title3"
          weight={300}
          tone="muted"
          align={align === "center" ? "center" : undefined}
          style={{ maxWidth: "36rem" }}
        >
          {lead}
        </Text>
      )}
    </Stack>
  );
}
