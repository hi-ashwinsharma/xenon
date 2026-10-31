"use client";

import React, { type ReactElement } from "react";
import { ScrollProgress } from "@xenon/web";
import { SmoothScroll } from "./journey/SmoothScroll";
import {
  AccentScene,
  ConcentricScene,
  HairlineScene,
  HeroScene,
  RadiusScene,
  WallScene,
} from "./journey/ScenesFoundation";
import {
  AgentScene,
  ClosingScene,
  DataScene,
  FormScene,
  GlassScene,
  GroupsScene,
  MotionScene,
  OverlayScene,
  PlatformScene,
  TypeScene,
} from "./journey/ScenesInteraction";

export function MarketingLanding(): ReactElement {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <HeroScene />
      <WallScene />
      <RadiusScene />
      <ConcentricScene />
      <AccentScene />
      <HairlineScene />
      <GroupsScene />
      <TypeScene />
      <MotionScene />
      <GlassScene />
      <OverlayScene />
      <FormScene />
      <DataScene />
      <AgentScene />
      <PlatformScene />
      <ClosingScene />
    </>
  );
}
