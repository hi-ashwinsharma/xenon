import type { ReactNode } from "react";

export type CodeBlockVariant = "default" | "minimal" | "command" | "bordered";

export type CodeTokenType =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "tag"
  | "punctuation"
  | "operator"
  | "plain";

export interface CodeToken {
  readonly type: CodeTokenType;
  readonly content: string;
}

export interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly filename?: string;
  readonly title?: string;
  readonly showLineNumbers?: boolean;
  readonly copyable?: boolean;
  readonly variant?: CodeBlockVariant;
  readonly maxHeight?: number | string;
  readonly highlight?: (
    code: string,
    language?: string,
  ) => readonly (readonly CodeToken[])[] | ReactNode;
  readonly onCopy?: (code: string) => void;
  readonly className?: string;
}
