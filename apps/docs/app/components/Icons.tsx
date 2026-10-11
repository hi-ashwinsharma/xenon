"use client";

import React, { type ReactElement } from "react";
import {
  MagnifyingGlass,
  Command,
  Sun,
  Moon,
  Cube,
  Sliders,
  Terminal,
  Check,
  CaretRight,
  CaretDown,
  BookOpen,
  Sparkle,
  ArrowRight,
  Copy,
  ShieldCheck,
  Cpu,
  Lightning,
} from "@phosphor-icons/react";
import { Icon } from "@xenon/web";

interface IconWrapperProps {
  size?: "sm" | "md" | "lg" | number;
  className?: string;
  color?: string;
}

export function MagnifyingGlassIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <MagnifyingGlass />
    </Icon>
  );
}

export function CommandIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Command />
    </Icon>
  );
}

export function SunIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Sun />
    </Icon>
  );
}

export function MoonIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Moon />
    </Icon>
  );
}

export function CubeIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Cube />
    </Icon>
  );
}

export function SlidersIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Sliders />
    </Icon>
  );
}

export function TerminalIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Terminal />
    </Icon>
  );
}

export function CheckIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Check />
    </Icon>
  );
}

export function CaretRightIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <CaretRight />
    </Icon>
  );
}

export function CaretDownIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <CaretDown />
    </Icon>
  );
}

export function BookOpenIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <BookOpen />
    </Icon>
  );
}

export function SparkleIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Sparkle />
    </Icon>
  );
}

export function ArrowRightIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <ArrowRight />
    </Icon>
  );
}

export function CopyIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Copy />
    </Icon>
  );
}

export function ShieldCheckIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <ShieldCheck />
    </Icon>
  );
}

export function CpuIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Cpu />
    </Icon>
  );
}

export function LightningIcon({
  size = "sm",
  color,
}: IconWrapperProps): ReactElement {
  return (
    <Icon size={size} color={color} weight="thin">
      <Lightning />
    </Icon>
  );
}
