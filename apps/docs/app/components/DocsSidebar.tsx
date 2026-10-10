"use client";

import React, { useMemo, useState, type ReactElement } from "react";
import {
  Input,
  Sidebar,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
} from "@xenon/web";
import { COMPONENTS_REGISTRY } from "../docs-data/components-registry";
import { MagnifyingGlassIcon } from "./Icons";

interface DocsSidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export function DocsSidebar({ activeId, onSelect }: DocsSidebarProps): ReactElement {
  const [filter, setFilter] = useState<string>("");

  const categories = useMemo(() => {
    const list: Array<"Primitives" | "Form Controls" | "Navigation" | "Overlays" | "Feedback & Data Display"> = [
      "Primitives",
      "Form Controls",
      "Navigation",
      "Overlays",
      "Feedback & Data Display",
    ];
    return list;
  }, []);

  const filteredItems = useMemo(() => {
    if (!filter.trim()) return COMPONENTS_REGISTRY;
    const q = filter.toLowerCase();
    return COMPONENTS_REGISTRY.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q),
    );
  }, [filter]);

  return (
    <Sidebar
      style={{
        width: "260px",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: "64px",
        overflowY: "auto",
        borderRight: "1px solid var(--x-border)",
        paddingTop: "16px",
        paddingBottom: "32px",
      }}
    >
      {/* Search Input in Sidebar */}
      <div style={{ padding: "0 12px 16px 12px" }}>
        <Input
          placeholder="Filter..."
          size="sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          prefix={<MagnifyingGlassIcon size="sm" />}
          clearable
        />
      </div>

      {/* Getting Started Guide */}
      <SidebarGroup label="Getting Started">
        <SidebarItem
          active={activeId === "introduction"}
          onClick={() => onSelect("introduction")}
        >
          Introduction
        </SidebarItem>
        <SidebarItem
          active={activeId === "guidelines"}
          onClick={() => onSelect("guidelines")}
        >
          Design Guidelines
        </SidebarItem>
      </SidebarGroup>

      <SidebarDivider />

      {/* Component Categories */}
      {categories.map((category) => {
        const items = filteredItems.filter((item) => item.category === category);
        if (items.length === 0) return null;

        return (
          <React.Fragment key={category}>
            <SidebarGroup label={category}>
              {items.map((item) => (
                <SidebarItem
                  key={item.id}
                  active={activeId === item.id}
                  onClick={() => onSelect(item.id)}
                >
                  {item.name}
                </SidebarItem>
              ))}
            </SidebarGroup>
            <SidebarDivider />
          </React.Fragment>
        );
      })}
    </Sidebar>
  );
}
