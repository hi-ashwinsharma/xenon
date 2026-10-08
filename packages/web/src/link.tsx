import { useMemo, type CSSProperties, type ReactElement } from "react";
import type { WebLinkProps } from "./web.types";

export function Link({
  href,
  external = false,
  children,
  className,
  style,
  ...restProps
}: WebLinkProps): ReactElement {
  const linkStyle: CSSProperties = useMemo(
    () => ({
      fontFamily: "var(--x-font-family)",
      color: "var(--x-text)",
      textDecorationLine: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "1px",
      textDecorationColor: "var(--x-border)",
      outline: "none",
      cursor: "pointer",
      transition: "text-decoration-color 160ms ease, color 160ms ease",
      ...style,
    }),
    [style],
  );

  return (
    <a
      className={className}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      style={linkStyle}
      target={external ? "_blank" : undefined}
      {...restProps}
    >
      {children}
    </a>
  );
}
