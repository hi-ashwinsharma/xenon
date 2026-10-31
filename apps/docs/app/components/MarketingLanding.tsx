"use client";

import React, { type ReactElement } from "react";
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
