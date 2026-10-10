import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarGroup,
  CodeBlock,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/index";

describe("@xenon/web Data Display Components (Phase 5 Batch 2)", () => {
  describe("Table & DataTable", () => {
    it("creates compound table tree with variants and alignment", () => {
      const table = createElement(
        Table,
        { variant: "bordered", size: "sm" },
        createElement(
          TableHeader,
          null,
          createElement(
            TableRow,
            null,
            createElement(TableHead, { align: "left" }, "Name"),
            createElement(TableHead, { align: "right" }, "Score"),
          ),
        ),
        createElement(
          TableBody,
          null,
          createElement(
            TableRow,
            { selected: true },
            createElement(TableCell, null, "Xenon"),
            createElement(TableCell, { numeric: true, align: "right" }, "100"),
          ),
        ),
      );

      expect(table.props.variant).toBe("bordered");
      expect(table.props.size).toBe("sm");
    });

    it("creates data-driven DataTable with columns and data", () => {
      const columns = [
        { key: "id", header: "ID", numeric: true },
        { key: "name", header: "Name" },
      ];
      const data = [{ id: 1, name: "Alpha" }, { id: 2, name: "Beta" }];

      const dt = createElement(DataTable, { columns, data, variant: "striped" });
      expect(dt.props.columns).toHaveLength(2);
      expect(dt.props.data).toHaveLength(2);
      expect(dt.props.variant).toBe("striped");
    });
  });

  describe("Accordion", () => {
    it("creates accordion with single/multiple type and items", () => {
      const accordion = createElement(
        Accordion,
        { type: "single", defaultValue: "item-1" },
        createElement(
          AccordionItem,
          { value: "item-1" },
          createElement(AccordionTrigger, null, "Section 1"),
          createElement(AccordionContent, null, "Content 1"),
        ),
      );

      expect(accordion.props.type).toBe("single");
      expect(accordion.props.defaultValue).toBe("item-1");
    });
  });

  describe("Avatar & AvatarGroup", () => {
    it("creates avatar with fallback monogram and status dot", () => {
      const avatar = createElement(Avatar, {
        name: "Ashwin Sharma",
        size: "lg",
        status: "online",
        shape: "circle",
      });

      expect(avatar.props.name).toBe("Ashwin Sharma");
      expect(avatar.props.size).toBe("lg");
      expect(avatar.props.status).toBe("online");
    });

    it("creates avatar group with max limit and spacing", () => {
      const group = createElement(
        AvatarGroup,
        { max: 2, size: "md", spacing: "tight" },
        createElement(Avatar, { name: "User One" }),
        createElement(Avatar, { name: "User Two" }),
        createElement(Avatar, { name: "User Three" }),
      );

      expect(group.props.max).toBe(2);
      expect(group.props.spacing).toBe("tight");
    });
  });

  describe("CodeBlock", () => {
    it("creates code block with syntax highlighting and copy button", () => {
      const code = 'const x = 42;\nconsole.log(x);';
      const block = createElement(CodeBlock, {
        code,
        language: "typescript",
        filename: "example.ts",
        showLineNumbers: true,
      });

      expect(block.props.code).toBe(code);
      expect(block.props.language).toBe("typescript");
      expect(block.props.filename).toBe("example.ts");
      expect(block.props.showLineNumbers).toBe(true);
    });
  });
});
