import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { WebNavbarProps } from "./web.types";

export function Navbar({
  brand,
  nav,
  actions,
  children,
  sticky = true,
  threshold = 10,
  bordered = true,
  maxWidth = 1280,
  className,
  style,
  ...restProps
}: WebNavbarProps): ReactElement {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrolled = window.scrollY > threshold;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const maxW = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

  const headerStyle: CSSProperties = {
    position: sticky ? "sticky" : "relative",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: isScrolled
      ? "var(--x-glass-regular-bg)"
      : "transparent",
    backdropFilter: isScrolled
      ? "blur(var(--x-glass-regular-blur))"
      : "none",
    WebkitBackdropFilter: isScrolled
      ? "blur(var(--x-glass-regular-blur))"
      : "none",
    borderBottom:
      bordered && isScrolled
        ? "1px solid var(--x-border)"
        : "1px solid transparent",
    transition:
      "background-color var(--x-dur-fast) var(--x-ease-standard), border-color var(--x-dur-fast) var(--x-ease-standard), backdrop-filter var(--x-dur-fast) var(--x-ease-standard), -webkit-backdrop-filter var(--x-dur-fast) var(--x-ease-standard)",
    ...style,
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: maxW,
    height: "56px",
    margin: "0 auto",
    paddingLeft: "var(--x-space-5, 24px)",
    paddingRight: "var(--x-space-5, 24px)",
    boxSizing: "border-box",
  };

  return (
    <header
      className={className}
      data-x-navbar=""
      data-x-scrolled={isScrolled ? "true" : "false"}
      style={headerStyle}
      {...restProps}
    >
      <div style={containerStyle}>
        {children ?? (
          <>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--x-space-3, 12px)",
                flexShrink: 0,
              }}
            >
              {brand}
            </div>

            {nav && (
              <nav
                aria-label="Main Navigation"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--x-space-4, 16px)",
                  margin: "0 auto",
                }}
              >
                {nav}
              </nav>
            )}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--x-space-3, 12px)",
                flexShrink: 0,
              }}
            >
              {actions}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
