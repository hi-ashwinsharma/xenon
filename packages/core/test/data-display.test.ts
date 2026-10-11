import { describe, expect, it } from "vitest";
import {
  getInitials,
  resolveAvatarDimensions,
  tokenizeCode,
  tokenizeLine,
} from "../src/data-display.utils";

describe("Data Display Utilities", () => {
  describe("getInitials", () => {
    it("handles single-word and multi-word names", () => {
      expect(getInitials("Ashwin Sharma")).toBe("AS");
      expect(getInitials("Xenon")).toBe("XE");
      expect(getInitials("John Ronald Reuel Tolkien")).toBe("JR");
      expect(getInitials("   ")).toBe("");
      expect(getInitials(undefined)).toBe("");
    });

    it("respects maxInitials constraint", () => {
      expect(getInitials("John Doe Smith", 1)).toBe("J");
      expect(getInitials("John Doe Smith", 3)).toBe("JDS");
    });
  });

  describe("resolveAvatarDimensions", () => {
    it("resolves sizes accurately per Apple HIG scales", () => {
      expect(resolveAvatarDimensions("xs").size).toBe(20);
      expect(resolveAvatarDimensions("sm").size).toBe(28);
      expect(resolveAvatarDimensions("md").size).toBe(36);
      expect(resolveAvatarDimensions("lg").size).toBe(44);
      expect(resolveAvatarDimensions("xl").size).toBe(56);
    });
  });

  describe("tokenizeCode & tokenizeLine", () => {
    it("tokenizes keywords, strings, and operators", () => {
      const line = 'const name = "xenon";';
      const tokens = tokenizeLine(line);

      expect(
        tokens.some((t) => t.type === "keyword" && t.content === "const"),
      ).toBe(true);
      expect(
        tokens.some((t) => t.type === "string" && t.content === '"xenon"'),
      ).toBe(true);
      expect(
        tokens.some((t) => t.type === "operator" && t.content === "="),
      ).toBe(true);
    });

    it("tokenizes comments accurately", () => {
      const line = "// This is a comment";
      const tokens = tokenizeLine(line);
      expect(tokens[0].type).toBe("comment");
    });

    it("tokenizes multi-line code into lines of tokens", () => {
      const code = "function add(a, b) {\n  return a + b;\n}";
      const lines = tokenizeCode(code, "typescript");
      expect(lines).toHaveLength(3);
      expect(
        lines[0].some((t) => t.type === "keyword" && t.content === "function"),
      ).toBe(true);
      expect(
        lines[1].some((t) => t.type === "keyword" && t.content === "return"),
      ).toBe(true);
    });
  });
});
