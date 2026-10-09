import type { CSSProperties, ReactElement } from "react";
import type {
  WebBreadcrumbItemProps,
  WebBreadcrumbLinkProps,
  WebBreadcrumbListProps,
  WebBreadcrumbPageProps,
  WebBreadcrumbProps,
  WebBreadcrumbSeparatorProps,
} from "./web.types";

export function Breadcrumb({
  ariaLabel = "Breadcrumb",
  children,
  className,
  style,
  ...restProps
}: WebBreadcrumbProps): ReactElement {
  return (
    <nav
      aria-label={ariaLabel}
      className={className}
      data-x-breadcrumb=""
      style={{
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        ...style,
      }}
      {...restProps}
    >
      {children}
    </nav>
  );
}

export function BreadcrumbList({
  children,
  className,
  style,
  ...restProps
}: WebBreadcrumbListProps): ReactElement {
  const listStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "var(--x-space-2, 8px)",
    listStyle: "none",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    ...style,
  };

  return (
    <ol className={className} data-x-breadcrumb-list="" style={listStyle} {...restProps}>
      {children}
    </ol>
  );
}

export function BreadcrumbItem({
  children,
  className,
  style,
  ...restProps
}: WebBreadcrumbItemProps): ReactElement {
  const itemStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--x-space-2, 8px)",
    fontSize: "0.8125rem", // 13px
    lineHeight: 1,
    boxSizing: "border-box",
    ...style,
  };

  return (
    <li className={className} data-x-breadcrumb-item="" style={itemStyle} {...restProps}>
      {children}
    </li>
  );
}

export function BreadcrumbLink({
  href,
  onClick,
  children,
  className,
  style,
  ...restProps
}: WebBreadcrumbLinkProps): ReactElement {
  const linkStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--x-text-muted)",
    textDecoration: "none",
    fontWeight: 300,
    transition: "color var(--x-dur-instant) ease",
    cursor: "pointer",
    ...style,
  };

  return (
    <a
      className={className}
      data-x-breadcrumb-link=""
      href={href}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--x-text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--x-text-muted)";
      }}
      style={linkStyle}
      {...restProps}
    >
      {children}
    </a>
  );
}

export function BreadcrumbPage({
  children,
  className,
  style,
  ...restProps
}: WebBreadcrumbPageProps): ReactElement {
  const pageStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--x-text)",
    fontWeight: 400,
    ...style,
  };

  return (
    <span
      aria-current="page"
      className={className}
      data-x-breadcrumb-page=""
      style={pageStyle}
      {...restProps}
    >
      {children}
    </span>
  );
}

export function BreadcrumbSeparator({
  children,
  className,
  style,
  ...restProps
}: WebBreadcrumbSeparatorProps): ReactElement {
  const separatorStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--x-text-muted)",
    opacity: 0.6,
    userSelect: "none",
    ...style,
  };

  return (
    <li
      aria-hidden="true"
      className={className}
      data-x-breadcrumb-separator=""
      role="presentation"
      style={separatorStyle}
      {...restProps}
    >
      {children ?? (
        <svg
          aria-hidden="true"
          fill="none"
          height="12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          viewBox="0 0 16 16"
          width="12"
        >
          <polyline points="6 3 11 8 6 13" />
        </svg>
      )}
    </li>
  );
}
