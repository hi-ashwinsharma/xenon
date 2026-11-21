import { type ReactElement } from "react";
import { View } from "react-native";
import { SPACE_SCALE } from "@xenon/tokens";
import { Heading } from "./heading";
import { Reveal } from "./reveal";
import { Text } from "./text";
import type { NativeScrollStoryProps } from "./native.types";

/** On native each step stacks its copy over its visual, the form the web version takes on phones. */
export function ScrollStory({
  steps,
  label = "Story",
  style,
  ...restProps
}: NativeScrollStoryProps): ReactElement {
  return (
    <View accessibilityLabel={label} style={style} {...restProps}>
      {steps.map((step) => (
        <View
          key={step.id}
          style={{ paddingVertical: SPACE_SCALE[7], gap: SPACE_SCALE[4] }}
        >
          <Reveal>
            <View style={{ gap: SPACE_SCALE[3] }}>
              <Heading level={3} styleKey="title2">
                {step.title}
              </Heading>
              {step.body ? (
                <Text styleKey="body" tone="muted">
                  {step.body}
                </Text>
              ) : null}
            </View>
          </Reveal>
          <Reveal order={1}>{step.visual}</Reveal>
        </View>
      ))}
    </View>
  );
}
