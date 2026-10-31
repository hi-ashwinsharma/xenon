"use client";

import { type ReactElement } from "react";
import type { FooterLinkItem } from "@xenon/core";
import { Container } from "./container";
import { Stack } from "./stack";
import { Text } from "./text";
import type { WebFooterProps } from "./web.types";

const FOOTER_CSS = `
.x-footer-link {
  color: var(--x-text-muted);
  text-decoration: none;
  outline: none;
  transition: color var(--x-dur-base) var(--x-ease-standard);
}
.x-footer-link:focus-visible {
  color: var(--x-accent);
}
@media (hover: hover) {
  .x-footer-link:hover {
    color: var(--x-text);
  }
}
`;

function FooterAnchor({ link }: { readonly link: FooterLinkItem }): ReactElement {
  return (
    <a
      className="x-footer-link"
      href={link.href}
      rel={link.external ? "noopener noreferrer" : undefined}
      target={link.external ? "_blank" : undefined}
    >
      {link.label}
    </a>
  );
}

export function Footer({
  brand,
  columns = [],
  legal,
  credit,
  renderLink,
  className,
  style,
  ...restProps
}: WebFooterProps): ReactElement {
  return (
    <footer
      className={className}
      style={{
        width: "100%",
        borderTop: "1px solid var(--x-border)",
        paddingTop: "var(--x-space-8)",
        paddingBottom: "var(--x-space-6)",
        ...style,
      }}
      {...restProps}
    >
      <style href="x-footer" precedence="default">
        {FOOTER_CSS}
      </style>
      <Container>
        <Stack gap={48}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "var(--x-space-7)",
            }}
          >
            {brand && <div style={{ maxWidth: "20rem" }}>{brand}</div>}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--x-space-8)",
              }}
            >
              {columns.map((column) => (
                <Stack key={column.title} gap={12}>
                  <Text styleKey="footnote" weight={400}>
                    {column.title}
                  </Text>
                  {column.links.map((link) => (
                    <Text key={link.href} styleKey="footnote" tone="muted">
                      {renderLink ? (
                        renderLink(link, link.label)
                      ) : (
                        <FooterAnchor link={link} />
                      )}
                    </Text>
                  ))}
                </Stack>
              ))}
            </div>
          </div>
          {(legal || credit) && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--x-space-4)",
              }}
            >
              <Text styleKey="caption1" tone="muted">
                {legal}
              </Text>
              {credit}
            </div>
          )}
        </Stack>
      </Container>
    </footer>
  );
}
