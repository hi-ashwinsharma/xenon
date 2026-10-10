import React, { type ReactElement } from "react";
import { Icon } from "@xenon/web";

interface IconWrapperProps {
  size?: "sm" | "md" | "lg" | number;
  className?: string;
}

export function MagnifyingGlassIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </Icon>
  );
}

export function CommandIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
      </svg>
    </Icon>
  );
}

export function SunIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    </Icon>
  );
}

export function MoonIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </Icon>
  );
}

export function CubeIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    </Icon>
  );
}

export function SlidersIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    </Icon>
  );
}

export function TerminalIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    </Icon>
  );
}

export function CheckIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </Icon>
  );
}

export function CaretRightIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </Icon>
  );
}

export function BookOpenIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    </Icon>
  );
}

export function SparkleIcon({ size = "sm" }: IconWrapperProps): ReactElement {
  return (
    <Icon size={size}>
      <svg
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="16"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </Icon>
  );
}
