"use client";

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import { tokenizeCode, type CodeToken, type CodeTokenType } from "@xenon/core";
import type { WebCodeBlockProps } from "./web.types";

function CopyIcon({ style }: { readonly style?: CSSProperties }): ReactElement {
  return (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      viewBox="0 0 24 24"
      width="14"
      style={style}
    >
      <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({
  style,
}: {
  readonly style?: CSSProperties;
}): ReactElement {
  return (
    <svg
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      viewBox="0 0 24 24"
      width="14"
      style={style}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const tokenColors: Record<CodeTokenType, CSSProperties> = {
  keyword: { color: "var(--x-accent)" },
  string: { color: "var(--x-text-secondary)" },
  number: { color: "var(--x-accent)" },
  comment: { color: "var(--x-text-muted)", fontStyle: "italic" },
  function: { color: "var(--x-text)" },
  tag: { color: "var(--x-accent)" },
  operator: { color: "var(--x-text-secondary)" },
  punctuation: { color: "var(--x-text-muted)" },
  plain: { color: "var(--x-text)" },
};

export const CodeBlock = forwardRef<HTMLDivElement, WebCodeBlockProps>(
  function CodeBlock(
    {
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
      className,
      ...restProps
    },
    ref,
  ): ReactElement {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          onCopy?.(code);
          setTimeout(() => setCopied(false), 2000);
        });
      }
    }, [code, onCopy]);

    const tokenizedLines = useMemo(() => {
      if (highlight) {
        return highlight(code, language);
      }
      return tokenizeCode(code, language);
    }, [code, language, highlight]);

    const headerLabel = filename ?? title;
    const showHeader = Boolean(headerLabel || language || copyable);

    const containerStyle: CSSProperties = {
      position: "relative",
      backgroundColor: "var(--x-surface-1)",
      border: variant !== "minimal" ? "1px solid var(--x-border)" : undefined,
      borderRadius: variant !== "minimal" ? "var(--x-radius)" : undefined,
      overflow: "hidden",
      fontFamily:
        "var(--x-font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
      fontSize: "13px",
      lineHeight: 1.6,
      ...style,
    };

    const headerStyle: CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 14px",
      borderBottom: "1px solid var(--x-border)",
      backgroundColor: "var(--x-surface-2)",
      fontSize: "12px",
      color: "var(--x-text-secondary)",
    };

    const copyButtonStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 8px",
      fontSize: "11px",
      borderRadius: "calc(var(--x-radius) * 0.5)",
      border: "1px solid var(--x-border)",
      backgroundColor: "transparent",
      color: copied ? "var(--x-accent)" : "var(--x-text-muted)",
      cursor: "pointer",
      transition:
        "color var(--x-motion-duration-fast) var(--x-motion-ease-out)",
    };

    const codeWrapperStyle: CSSProperties = {
      overflowX: "auto",
      maxHeight,
      padding: "14px 16px",
      margin: 0,
    };

    const isCustomNode = !Array.isArray(tokenizedLines);

    if (variant === "command") {
      return (
        <div
          ref={ref}
          className={className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--x-space-3)",
            maxWidth: "100%",
            minHeight: "44px",
            paddingLeft: "var(--x-space-4)",
            paddingRight: "var(--x-space-1)",
            backgroundColor: "var(--x-surface-2)",
            border: "1px solid var(--x-border)",
            borderRadius: "var(--x-radius-control)",
            fontFamily: "var(--x-font-family-mono)",
            fontSize: "var(--x-text-subhead-size)",
            color: "var(--x-text)",
            ...style,
          }}
          {...restProps}
        >
          <code style={{ overflowX: "auto", whiteSpace: "pre" }}>{code}</code>
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy command"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                width: "32px",
                height: "32px",
                padding: 0,
                border: "none",
                borderRadius: "var(--x-radius-control)",
                backgroundColor: "transparent",
                color: copied ? "var(--x-accent)" : "var(--x-text-muted)",
                cursor: "pointer",
                transition:
                  "color var(--x-dur-base) var(--x-ease-standard), transform var(--x-dur-base) var(--x-ease-spring)",
                transform: copied ? "scale(1.1)" : "scale(1)",
              }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        {...restProps}
      >
        {showHeader && (
          <div style={headerStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {headerLabel && (
                <span style={{ color: "var(--x-text)", fontWeight: 400 }}>
                  {headerLabel}
                </span>
              )}
              {language && (
                <span
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--x-text-muted)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: "var(--x-surface-1)",
                    border: "1px solid var(--x-border)",
                  }}
                >
                  {language}
                </span>
              )}
            </div>

            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                style={copyButtonStyle}
                aria-label={copied ? "Copied" : "Copy code"}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>
        )}

        <pre style={codeWrapperStyle}>
          <code>
            {isCustomNode
              ? (tokenizedLines as React.ReactNode)
              : (tokenizedLines as readonly (readonly CodeToken[])[]).map(
                  (line, lineIndex) => (
                    <div
                      key={lineIndex}
                      style={{
                        display: "flex",
                        minHeight: "1.6em",
                      }}
                    >
                      {showLineNumbers && (
                        <span
                          style={{
                            width: "32px",
                            textAlign: "right",
                            marginRight: "16px",
                            color: "var(--x-text-muted)",
                            userSelect: "none",
                            fontVariantNumeric: "tabular-nums",
                            flexShrink: 0,
                          }}
                        >
                          {lineIndex + 1}
                        </span>
                      )}
                      <span style={{ flex: 1, whiteSpace: "pre" }}>
                        {line.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            style={tokenColors[token.type] ?? tokenColors.plain}
                          >
                            {token.content}
                          </span>
                        ))}
                      </span>
                    </div>
                  ),
                )}
          </code>
        </pre>
      </div>
    );
  },
);
