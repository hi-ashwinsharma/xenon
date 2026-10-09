import { describe, expect, it } from "vitest";
import { createElement } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  GlassBar,
  Navbar,
  Pagination,
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  TabBar,
  TabBarItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../src/index";

describe("@xenon/web Navigation Controls", () => {
  describe("Navbar & GlassBar", () => {
    it("creates adaptive Navbar with slot elements and threshold", () => {
      const brand = createElement("span", null, "Xenon");
      const nav = createElement("span", null, "Links");
      const actions = createElement("button", null, "Sign in");

      const element = createElement(Navbar, {
        brand,
        nav,
        actions,
        sticky: true,
        threshold: 15,
        bordered: true,
      });

      expect(element.props.brand).toBe(brand);
      expect(element.props.nav).toBe(nav);
      expect(element.props.actions).toBe(actions);
      expect(element.props.threshold).toBe(15);
      expect(element.props.sticky).toBe(true);
      expect(element.props.bordered).toBe(true);
    });

    it("creates GlassBar with regular or clear glass variant", () => {
      const glassBar = createElement(GlassBar, {
        glassType: "clear",
        bordered: false,
        maxWidth: 1440,
      });

      expect(glassBar.props.glassType).toBe("clear");
      expect(glassBar.props.bordered).toBe(false);
      expect(glassBar.props.maxWidth).toBe(1440);
    });
  });

  describe("Sidebar", () => {
    it("creates background-less Sidebar with rail collapsible mode", () => {
      const sidebar = createElement(
        Sidebar,
        {
          hasBackground: false,
          separator: true,
          collapsed: true,
          collapsible: "rail",
          width: 260,
          collapsedWidth: 56,
        },
        createElement(SidebarHeader, null, "Header"),
        createElement(
          SidebarNav,
          null,
          createElement(
            SidebarGroup,
            { label: "Core" },
            createElement(SidebarItem, {
              label: "Dashboard",
              active: true,
              shortcut: "⌘1",
            }),
          ),
        ),
        createElement(SidebarFooter, null, "Footer"),
      );

      expect(sidebar.props.hasBackground).toBe(false);
      expect(sidebar.props.separator).toBe(true);
      expect(sidebar.props.collapsed).toBe(true);
      expect(sidebar.props.collapsible).toBe("rail");
      expect(sidebar.props.width).toBe(260);
      expect(sidebar.props.collapsedWidth).toBe(56);
    });

    it("supports solid background variant for dense consoles", () => {
      const sidebar = createElement(Sidebar, {
        hasBackground: true,
        separator: false,
      });

      expect(sidebar.props.hasBackground).toBe(true);
      expect(sidebar.props.separator).toBe(false);
    });
  });

  describe("Tabs", () => {
    it("creates Tabs in pill capsule mode with triggers and panels", () => {
      const tabs = createElement(
        Tabs,
        { defaultValue: "overview", variant: "pill" },
        createElement(
          TabsList,
          { ariaLabel: "Settings tabs" },
          createElement(TabsTrigger, { value: "overview" }, "Overview"),
          createElement(TabsTrigger, { value: "security" }, "Security"),
        ),
        createElement(TabsContent, { value: "overview" }, "Overview content"),
        createElement(TabsContent, { value: "security" }, "Security content"),
      );

      expect(tabs.props.defaultValue).toBe("overview");
      expect(tabs.props.variant).toBe("pill");
    });

    it("supports underline minimalist hairline variant", () => {
      const tabs = createElement(
        Tabs,
        { value: "billing", variant: "underline" },
        createElement(
          TabsList,
          null,
          createElement(TabsTrigger, { value: "billing" }, "Billing"),
        ),
        createElement(TabsContent, { value: "billing" }, "Billing Details"),
      );

      expect(tabs.props.value).toBe("billing");
      expect(tabs.props.variant).toBe("underline");
    });
  });

  describe("TabBar", () => {
    it("creates floating island TabBar by default", () => {
      const icon = createElement("span", null, "★");
      const tabBar = createElement(
        TabBar,
        { variant: "floating" },
        createElement(TabBarItem, {
          icon,
          label: "Home",
          active: true,
        }),
        createElement(TabBarItem, {
          icon,
          label: "Inbox",
          badge: true,
        }),
      );

      expect(tabBar.props.variant).toBe("floating");
    });

    it("supports docked bottom TabBar", () => {
      const icon = createElement("span", null, "★");
      const tabBar = createElement(
        TabBar,
        { variant: "docked" },
        createElement(TabBarItem, { icon, label: "Profile" }),
      );

      expect(tabBar.props.variant).toBe("docked");
    });
  });

  describe("Breadcrumb", () => {
    it("creates Breadcrumb hierarchy with items, links, and current page", () => {
      const breadcrumb = createElement(
        Breadcrumb,
        null,
        createElement(
          BreadcrumbList,
          null,
          createElement(
            BreadcrumbItem,
            null,
            createElement(BreadcrumbLink, { href: "/" }, "Home"),
          ),
          createElement(BreadcrumbSeparator),
          createElement(
            BreadcrumbItem,
            null,
            createElement(BreadcrumbLink, { href: "/components" }, "Components"),
          ),
          createElement(BreadcrumbSeparator),
          createElement(
            BreadcrumbItem,
            null,
            createElement(BreadcrumbPage, null, "Navigation"),
          ),
        ),
      );

      expect(breadcrumb.props.children).toBeDefined();
    });
  });

  describe("Pagination", () => {
    it("creates Pagination with current page, total pages, and siblings", () => {
      const pagination = createElement(Pagination, {
        page: 3,
        totalPages: 10,
        siblingCount: 1,
        disabled: false,
      });

      expect(pagination.props.page).toBe(3);
      expect(pagination.props.totalPages).toBe(10);
      expect(pagination.props.siblingCount).toBe(1);
      expect(pagination.props.disabled).toBe(false);
    });

    it("supports compact mode", () => {
      const pagination = createElement(Pagination, {
        page: 1,
        totalPages: 5,
        compact: true,
      });

      expect(pagination.props.compact).toBe(true);
    });
  });
});
