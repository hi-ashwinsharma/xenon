import type { AvatarSize } from "./avatar.types";
import type { CodeToken, CodeTokenType } from "./codeblock.types";

export function getInitials(name?: string, maxInitials = 2): string {
  if (!name || typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) {
    const word = parts[0];
    return word.slice(0, Math.min(maxInitials, word.length)).toUpperCase();
  }
  return parts
    .slice(0, maxInitials)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export interface ResolvedAvatarMetrics {
  readonly size: number;
  readonly fontSize: number;
  readonly statusSize: number;
}

export function resolveAvatarDimensions(
  size: AvatarSize = "md",
): ResolvedAvatarMetrics {
  switch (size) {
    case "xs":
      return { size: 20, fontSize: 9, statusSize: 6 };
    case "sm":
      return { size: 28, fontSize: 11, statusSize: 7 };
    case "lg":
      return { size: 44, fontSize: 16, statusSize: 11 };
    case "xl":
      return { size: 56, fontSize: 20, statusSize: 13 };
    case "md":
    default:
      return { size: 36, fontSize: 13, statusSize: 9 };
  }
}

const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "def",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "is",
  "keyof",
  "let",
  "new",
  "null",
  "of",
  "private",
  "protected",
  "public",
  "readonly",
  "return",
  "self",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
]);

const TOKEN_REGEX =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(<\/?(?:[a-zA-Z0-9_-]+)>?)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|(\b[a-zA-Z_$][a-zA-Z0-9_$]*\b)|(===|!==|=>|<=|>=|\+\+|--|&&|\|\||[{}()[\].,:;=+\-*/%&|^!<>?])|(\s+)|([^\s\w{}()[\].,:;=+\-*/%&|^!<>?"'`]+)/g;

export function tokenizeLine(line: string): CodeToken[] {
  if (!line) return [{ type: "plain", content: "" }];
  const tokens: CodeToken[] = [];
  TOKEN_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [
      full,
      comment,
      str,
      num,
      tag,
      fn,
      word,
      punct,
      whitespace,
      other,
    ] = match;

    if (comment) {
      tokens.push({ type: "comment", content: comment });
    } else if (str) {
      tokens.push({ type: "string", content: str });
    } else if (num) {
      tokens.push({ type: "number", content: num });
    } else if (tag) {
      tokens.push({ type: "tag", content: tag });
    } else if (fn) {
      if (KEYWORDS.has(fn)) {
        tokens.push({ type: "keyword", content: fn });
      } else {
        tokens.push({ type: "function", content: fn });
      }
    } else if (word) {
      if (KEYWORDS.has(word)) {
        tokens.push({ type: "keyword", content: word });
      } else {
        tokens.push({ type: "plain", content: word });
      }
    } else if (punct) {
      const isOperator = /[=+\-*/%&|^!<>?]/.test(punct);
      tokens.push({
        type: isOperator ? "operator" : "punctuation",
        content: punct,
      });
    } else if (whitespace || other) {
      tokens.push({ type: "plain", content: full });
    } else {
      tokens.push({ type: "plain", content: full });
    }
  }

  if (tokens.length === 0) {
    return [{ type: "plain", content: line }];
  }

  return tokens;
}

export function tokenizeCode(
  code: string,
  _language?: string,
): CodeToken[][] {
  const lines = code.split("\n");
  return lines.map((line) => tokenizeLine(line));
}
