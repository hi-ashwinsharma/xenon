"use client";

import { type ReactElement } from "react";
import { Container } from "./container";
import { Grid, GridItem } from "./grid";
import { Heading } from "./heading";
import { Reveal } from "./reveal";
import { Stack } from "./stack";
import { Text } from "./text";
import type { WebChapterProps } from "./web.types";

const CHAPTER_CSS = `
.x-chapter {
  display: flex;
  align-items: center;
  min-height: 100svh;
  padding-top: var(--x-space-9);
  padding-bottom: var(--x-space-9);
}
@media (min-width: 60.0625rem) {
  .x-chapter[data-x-reverse="true"] .x-chapter-copy { order: 2; }
}
@media (max-width: 60rem) {
  .x-chapter { min-height: 0; }
}
`;

/** One idea per viewport: a large headline beside a single visual. */
export function Chapter({
  title,
  lead,
  visual,
  reverse = false,
  className,
  ...restProps
}: WebChapterProps): ReactElement {
  return (
    <section
      className={className ? `x-chapter ${className}` : "x-chapter"}
      data-x-reverse={reverse ? "true" : "false"}
      {...restProps}
    >
      <style href="x-chapter" precedence="default">
        {CHAPTER_CSS}
      </style>
      <Container>
        <Grid columns={2} gap={64} style={{ alignItems: "center" }}>
          <GridItem className="x-chapter-copy">
            <Reveal>
              <Stack gap={16}>
                <Heading level={2} styleKey="display" weight={200}>
                  {title}
                </Heading>
                {lead && (
                  <Text styleKey="title3" weight={300} tone="muted">
                    {lead}
                  </Text>
                )}
              </Stack>
            </Reveal>
          </GridItem>
          <GridItem>
            <Reveal order={1}>{visual}</Reveal>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
}
