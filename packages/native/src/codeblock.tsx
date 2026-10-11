import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  DEFAULT_RADIUS_STOP,
  compileNativeTokens,
  type Accent,
  type RadiusStop,
  type ResolvedTheme,
} from "@xenon/tokens";
import { tokenizeCode, type CodeToken, type CodeTokenType } from "@xenon/core";
import { useXenon } from "./provider";
import { Text } from "./text";
import type { NativeCodeBlockProps } from "./native.types";

function useCodeBlockTokens() {
  let resolvedTheme: ResolvedTheme = "dark";
  let accent: Accent = "lime";
  let radius: RadiusStop = DEFAULT_RADIUS_STOP;
  try {
    const xenon = useXenon();
    resolvedTheme = xenon.resolvedTheme;
    accent = xenon.accent;
    radius = xenon.radius;
  } catch {}

  const tokens = useMemo(
    () => compileNativeTokens(resolvedTheme, accent),
    [resolvedTheme, accent],
  );

  return { tokens, radius };
}

export function CodeBlock({
  code,
  language,
  filename,
  title,
  showLineNumbers = false,
  copyable = true,
  variant = "default",
  maxHeight,
  highlight,
  onCopy,
  style,
}: NativeCodeBlockProps) {
  const { tokens, radius } = useCodeBlockTokens();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenizedLines = useMemo(() => {
    if (highlight) {
      return highlight(code, language);
    }
    return tokenizeCode(code, language);
  }, [code, language, highlight]);

  const headerLabel = filename ?? title;
  const showHeader = Boolean(headerLabel || language || copyable);

  const tokenColorMap: Record<CodeTokenType, string> = {
    keyword: tokens.colors.accent,
    string: tokens.colors.textMuted,
    number: tokens.colors.accent,
    comment: tokens.colors.textMuted,
    function: tokens.colors.text,
    tag: tokens.colors.accent,
    operator: tokens.colors.textMuted,
    punctuation: tokens.colors.textMuted,
    plain: tokens.colors.text,
  };

  const isCustomNode = !Array.isArray(tokenizedLines);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surface,
          borderRadius:
            variant !== "minimal" ? tokens.radius[radius].control : 0,
          borderWidth: variant !== "minimal" ? StyleSheet.hairlineWidth : 0,
          borderColor: tokens.colors.border,
        },
        maxHeight
          ? { maxHeight: typeof maxHeight === "number" ? maxHeight : undefined }
          : undefined,
        style,
      ]}
    >
      {showHeader && (
        <View
          style={[
            styles.header,
            {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: tokens.colors.border,
              backgroundColor: tokens.colors.bg,
            },
          ]}
        >
          <View style={styles.headerTitleGroup}>
            {headerLabel && (
              <Text
                styleKey="footnote"
                weight={400}
                style={{ color: tokens.colors.text }}
              >
                {headerLabel}
              </Text>
            )}
            {language && (
              <View
                style={[
                  styles.languageBadge,
                  {
                    borderColor: tokens.colors.border,
                    backgroundColor: tokens.colors.surface,
                  },
                ]}
              >
                <Text
                  styleKey="caption2"
                  style={{
                    color: tokens.colors.textMuted,
                    textTransform: "uppercase",
                    fontSize: 9,
                  }}
                >
                  {language}
                </Text>
              </View>
            )}
          </View>

          {copyable && (
            <Pressable
              onPress={handleCopy}
              style={[
                styles.copyButton,
                {
                  borderColor: tokens.colors.border,
                },
              ]}
            >
              <Text
                styleKey="caption2"
                style={{
                  color: copied
                    ? tokens.colors.accent
                    : tokens.colors.textMuted,
                  fontSize: 10,
                }}
              >
                {copied ? "Copied" : "Copy"}
              </Text>
            </Pressable>
          )}
        </View>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.codeBody}>
          {isCustomNode
            ? (tokenizedLines as React.ReactNode)
            : (tokenizedLines as readonly (readonly CodeToken[])[]).map(
                (line, lineIndex) => (
                  <View key={lineIndex} style={styles.line}>
                    {showLineNumbers && (
                      <Text
                        styleKey="caption1"
                        style={[
                          styles.lineNumber,
                          { color: tokens.colors.textMuted },
                        ]}
                      >
                        {String(lineIndex + 1)}
                      </Text>
                    )}
                    <View style={styles.tokensRow}>
                      {line.map((token, tokenIndex) => (
                        <Text
                          key={tokenIndex}
                          styleKey="footnote"
                          style={{
                            color:
                              tokenColorMap[token.type] ?? tokens.colors.text,
                            fontFamily: "monospace",
                          }}
                        >
                          {token.content}
                        </Text>
                      ))}
                    </View>
                  </View>
                ),
              )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  headerTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  languageBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  copyButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  scrollContent: {
    padding: 14,
  },
  codeBody: {
    flexDirection: "column",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 20,
  },
  lineNumber: {
    width: 28,
    marginRight: 12,
    textAlign: "right",
  },
  tokensRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
