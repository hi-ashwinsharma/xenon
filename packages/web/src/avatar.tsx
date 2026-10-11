"use client";

import React, {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useState,
  type CSSProperties,
  type ReactElement,
} from "react";
import {
  getInitials,
  resolveAvatarDimensions,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "@xenon/core";
import type { WebAvatarGroupProps, WebAvatarProps } from "./web.types";

interface AvatarGroupContextValue {
  readonly size?: AvatarSize;
}

const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

const statusColors: Record<AvatarStatus, string> = {
  online: "#30d158",
  busy: "#ff453a",
  away: "#ffd60a",
  offline: "var(--x-text-muted)",
};

function UserIcon({ size }: { readonly size: number }): ReactElement {
  return (
    <svg
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.25"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export const Avatar = forwardRef<HTMLSpanElement, WebAvatarProps>(
  function Avatar(
    {
      src,
      alt,
      name,
      fallback,
      size: explicitSize,
      shape = "circle",
      status,
      statusPlacement = "bottom-right",
      onError,
      style,
      className,
      children,
      ...restProps
    },
    ref,
  ): ReactElement {
    const groupContext = useContext(AvatarGroupContext);
    const size = explicitSize ?? groupContext?.size ?? "md";
    const metrics = resolveAvatarDimensions(size);

    const [imageError, setImageError] = useState(false);

    const borderRadius =
      shape === "circle" ? "9999px" : "calc(var(--x-radius) * 0.75)";

    const containerStyle: CSSProperties = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${metrics.size}px`,
      height: `${metrics.size}px`,
      borderRadius,
      backgroundColor: "var(--x-surface-2)",
      color: "var(--x-text)",
      fontWeight: 400,
      fontSize: `${metrics.fontSize}px`,
      userSelect: "none",
      flexShrink: 0,
      overflow: "visible",
      border: "1px solid var(--x-border)",
      ...style,
    };

    const imgStyle: CSSProperties = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius,
    };

    const statusStyle: CSSProperties = {
      position: "absolute",
      width: `${metrics.statusSize}px`,
      height: `${metrics.statusSize}px`,
      borderRadius: "9999px",
      backgroundColor: status ? statusColors[status] : undefined,
      boxShadow: "0 0 0 2px var(--x-bg-base)",
      zIndex: 1,
      ...(statusPlacement === "bottom-right"
        ? { bottom: "-1px", right: "-1px" }
        : { top: "-1px", right: "-1px" }),
    };

    let content: React.ReactNode = null;

    if (children) {
      content = children;
    } else if (src && !imageError) {
      content = (
        <img
          src={src}
          alt={alt ?? name ?? "avatar"}
          onError={() => {
            setImageError(true);
            onError?.();
          }}
          style={imgStyle}
        />
      );
    } else if (name) {
      content = getInitials(name);
    } else if (fallback) {
      content = fallback;
    } else {
      content = <UserIcon size={Math.round(metrics.size * 0.55)} />;
    }

    return (
      <span
        ref={ref}
        style={containerStyle}
        className={className}
        {...restProps}
      >
        {content}
        {status && (
          <span style={statusStyle} aria-label={`Status: ${status}`} />
        )}
      </span>
    );
  },
);

export const AvatarGroup = forwardRef<HTMLDivElement, WebAvatarGroupProps>(
  function AvatarGroup(
    {
      max,
      size = "md",
      spacing = "normal",
      children,
      style,
      className,
      ...restProps
    },
    ref,
  ): ReactElement {
    const spacingMargin =
      spacing === "tight" ? -12 : spacing === "loose" ? -6 : -9;

    const childList = Children.toArray(children).filter(isValidElement);
    const visibleChildren = max ? childList.slice(0, max) : childList;
    const overflowCount = max ? childList.length - max : 0;
    const metrics = resolveAvatarDimensions(size);

    const groupStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      flexDirection: "row",
      ...style,
    };

    const overflowStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${metrics.size}px`,
      height: `${metrics.size}px`,
      borderRadius: "9999px",
      backgroundColor: "var(--x-surface-2)",
      color: "var(--x-text-secondary)",
      fontSize: `${metrics.fontSize}px`,
      fontWeight: 400,
      border: "1px solid var(--x-border)",
      marginLeft: `${spacingMargin}px`,
      boxShadow: "0 0 0 2px var(--x-bg-base)",
      zIndex: 0,
      userSelect: "none",
    };

    return (
      <AvatarGroupContext.Provider value={{ size }}>
        <div ref={ref} style={groupStyle} className={className} {...restProps}>
          {visibleChildren.map((child, index) => {
            const avatarElement = child as ReactElement<WebAvatarProps>;
            const avatarStyle: CSSProperties = {
              marginLeft: index > 0 ? `${spacingMargin}px` : 0,
              boxShadow: "0 0 0 2px var(--x-bg-base)",
              zIndex: visibleChildren.length - index,
              ...avatarElement.props.style,
            };

            return cloneElement(avatarElement, {
              key: avatarElement.key ?? index,
              style: avatarStyle,
            });
          })}
          {overflowCount > 0 && (
            <span style={overflowStyle}>+{overflowCount}</span>
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  },
);
