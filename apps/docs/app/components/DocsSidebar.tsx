"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollTop, setCanScrollTop] = useState<boolean>(false);
  const [canScrollBottom, setCanScrollBottom] = useState<boolean>(false);

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

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setCanScrollTop(scrollTop > 4);
    setCanScrollBottom(scrollHeight - clientHeight - scrollTop > 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      checkScroll();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    const ro = new ResizeObserver(() => checkScroll());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      ro.disconnect();
    };
  }, [checkScroll, filteredItems]);

  return (
    <Sidebar
      style={{
        width: "260px",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: "64px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRight: "none",
        border: "none",
        paddingTop: "0px",
        paddingBottom: "0px",
      }}
    >
      {/* Search Input in Sidebar (pinned at top) */}
      <div style={{ padding: "16px 12px 12px 12px", flexShrink: 0 }}>
        <Input
          placeholder="Filter..."
          size="sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          prefix={<MagnifyingGlassIcon size="sm" />}
          clearable
        />
      </div>

      {/* Relative container for scrollable navigation with vertical edge fading scroll shadows */}
      <div
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Fading Scroll Shadow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "28px",
            pointerEvents: "none",
            zIndex: 10,
            opacity: canScrollTop ? 1 : 0,
            transition:
              "opacity var(--x-dur-fast, 160ms) var(--x-ease-standard, cubic-bezier(0.2, 0, 0, 1))",
            background:
              "linear-gradient(to bottom, var(--x-bg) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        {/* Scrollable Navigation List */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: "32px",
            maskImage:
              canScrollTop && canScrollBottom
                ? "linear-gradient(to bottom, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%)"
                : canScrollTop
                  ? "linear-gradient(to bottom, transparent 0%, black 24px, black 100%)"
                  : canScrollBottom
                    ? "linear-gradient(to bottom, black 0%, black calc(100% - 24px), transparent 100%)"
                    : "none",
            WebkitMaskImage:
              canScrollTop && canScrollBottom
                ? "linear-gradient(to bottom, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%)"
                : canScrollTop
                  ? "linear-gradient(to bottom, transparent 0%, black 24px, black 100%)"
                  : canScrollBottom
                    ? "linear-gradient(to bottom, black 0%, black calc(100% - 24px), transparent 100%)"
                    : "none",
            transition: "mask-image 200ms ease, -webkit-mask-image 200ms ease",
          }}
        >
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
        </div>

        {/* Bottom Fading Scroll Shadow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "28px",
            pointerEvents: "none",
            zIndex: 10,
            opacity: canScrollBottom ? 1 : 0,
            transition:
              "opacity var(--x-dur-fast, 160ms) var(--x-ease-standard, cubic-bezier(0.2, 0, 0, 1))",
            background:
              "linear-gradient(to top, var(--x-bg) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
      </div>
    </Sidebar>
  );
}
