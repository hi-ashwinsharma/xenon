import { type ReactElement } from "react";
import { View } from "react-native";
import { SPACE_SCALE } from "@xenon/tokens";
import { Container } from "./container";
import { Heading } from "./heading";
import { Reveal } from "./reveal";
import { Stack } from "./stack";
import { Text } from "./text";
import type { NativeChapterProps } from "./native.types";

export function Chapter({
  title,
  lead,
  visual,
  reverse: _reverse,
  style,
  ...restProps
}: NativeChapterProps): ReactElement {
  return (
    <View style={[{ paddingVertical: SPACE_SCALE[7] }, style]} {...restProps}>
      <Container>
        <Stack gap={SPACE_SCALE[5]}>
          <Reveal>
            <Stack gap={SPACE_SCALE[3]}>
              <Heading level={2} styleKey="title1" weight={200}>
                {title}
              </Heading>
              {lead && (
                <Text styleKey="body" tone="muted">
                  {lead}
                </Text>
              )}
            </Stack>
          </Reveal>
          <Reveal order={1}>{visual}</Reveal>
        </Stack>
      </Container>
    </View>
  );
}
