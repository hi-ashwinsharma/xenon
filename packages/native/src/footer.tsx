import { type ReactElement } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { SPACE_SCALE } from "@xenon/tokens";
import { Container } from "./container";
import { Stack } from "./stack";
import { Text } from "./text";
import type { NativeFooterProps } from "./native.types";

export function Footer({
  brand,
  columns = [],
  legal,
  credit,
  renderLink,
  style,
  ...restProps
}: NativeFooterProps): ReactElement {
  return (
    <View
      style={[
        {
          width: "100%",
          borderTopWidth: StyleSheet.hairlineWidth,
          paddingVertical: SPACE_SCALE[5],
        },
        style,
      ]}
      {...restProps}
    >
      <Container>
        <Stack gap={SPACE_SCALE[6]}>
          {brand}
          {columns.map((column) => (
            <Stack key={column.title} gap={SPACE_SCALE[2]}>
              <Text styleKey="footnote" weight={400}>
                {column.title}
              </Text>
              {column.links.map((link) =>
                renderLink ? (
                  renderLink(link, link.label)
                ) : (
                  <Pressable
                    key={link.href}
                    accessibilityRole="link"
                    onPress={() => void Linking.openURL(link.href)}
                  >
                    <Text styleKey="footnote" tone="muted">
                      {link.label}
                    </Text>
                  </Pressable>
                ),
              )}
            </Stack>
          ))}
          {legal && (
            <Text styleKey="caption1" tone="muted">
              {legal}
            </Text>
          )}
          {credit}
        </Stack>
      </Container>
    </View>
  );
}
