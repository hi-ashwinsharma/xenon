"use client";

import React, { type ReactElement } from "react";

interface LineArtProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * 1. Concentricity vs Egg Mode
 * Expansive 760x320 Blueprint Stage.
 * LEFT: Mismatched R1=R2 creates bloated deformed egg corners.
 * RIGHT: Mathematically concentric arcs (R_child = R_parent - padding) sharing identical radial center.
 */
export function EggVsConcentricIllustration({
  width = "100%",
  height = "auto",
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 760 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* Blueprint Grid Lines (Precision drafting canvas) */}
      <line x1="40" y1="40" x2="720" y2="40" stroke="var(--x-border)" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4" />
      <line x1="40" y1="280" x2="720" y2="280" stroke="var(--x-border)" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.4" />
      <line x1="380" y1="20" x2="380" y2="300" stroke="var(--x-border)" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />

      {/* ─────────────────── LEFT: OPTICAL EGG DEFORMITY ─────────────────── */}
      <g opacity="0.55">
        {/* Outer Surface Box (R = 36px) */}
        <rect x="70" y="55" width="250" height="210" rx="36" stroke="var(--x-border)" strokeWidth="1" />
        {/* Inner Child Box with same R = 36px (Optical Bulge / Pinched corner) */}
        <rect x="94" y="79" width="202" height="162" rx="36" stroke="var(--x-text-muted)" strokeWidth="1.2" strokeDasharray="6 3" />

        {/* Deformity Callout Arcs */}
        <path d="M 94 130 A 36 36 0 0 1 145 79" stroke="#FF453A" strokeWidth="1.5" />
        <circle cx="140" cy="125" r="14" stroke="#FF453A" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <line x1="130" y1="135" x2="150" y2="115" stroke="#FF453A" strokeWidth="1.25" />
        <line x1="130" y1="115" x2="150" y2="135" stroke="#FF453A" strokeWidth="1.25" />

        {/* Discordant center marks */}
        <circle cx="106" cy="91" r="2.5" fill="var(--x-text-muted)" />
        <circle cx="130" cy="115" r="2.5" fill="#FF453A" />
        <line x1="106" y1="91" x2="130" y2="115" stroke="#FF453A" strokeWidth="0.75" strokeDasharray="2 2" />

        <text x="195" y="292" fill="var(--x-text-muted)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          R_inner = R_outer (Discordant Egg Corner)
        </text>
      </g>

      {/* ─────────────────── RIGHT: XENON CONCENTRIC HARMONY ─────────────────── */}
      <g>
        {/* Outer Surface Box (R = 36px) */}
        <rect x="440" y="55" width="250" height="210" rx="36" stroke="var(--x-border)" strokeWidth="1.2" />

        {/* Inset Concentric Child (R = 36 - 24 = 12px) */}
        <rect x="464" y="79" width="202" height="162" rx="12" stroke="var(--x-accent)" strokeWidth="1.5" />

        {/* Concentric Shared Radial Arc Compass Lines */}
        <circle cx="476" cy="91" r="3" fill="var(--x-accent)" />
        {/* Outer concentric arc sweep */}
        <path d="M 476 55 A 36 36 0 0 0 440 91" stroke="var(--x-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Inner concentric arc sweep */}
        <path d="M 476 79 A 12 12 0 0 0 464 91" stroke="var(--x-accent)" strokeWidth="1.8" />

        {/* Radial Guideline Vectors radiating from shared center */}
        <line x1="476" y1="91" x2="445" y2="60" stroke="var(--x-accent)" strokeWidth="0.75" />
        <line x1="476" y1="91" x2="520" y2="91" stroke="var(--x-accent)" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Caliper Guideline: Padding Delta = 24px */}
        <line x1="440" y1="36" x2="464" y2="36" stroke="var(--x-accent)" strokeWidth="1" />
        <line x1="440" y1="31" x2="440" y2="41" stroke="var(--x-accent)" strokeWidth="1" />
        <line x1="464" y1="31" x2="464" y2="41" stroke="var(--x-accent)" strokeWidth="1" />
        <text x="452" y="27" fill="var(--x-accent)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          Δp = 24px
        </text>

        <text x="565" y="292" fill="var(--x-text)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          R_inner = R_outer − Δp (Pure Concentric Arc)
        </text>
      </g>
    </svg>
  );
}

/**
 * 2. Flat Depth vs Muddy Shadows
 * Expansive 760x320 Architectural Comparison.
 * LEFT: Fuzzy, dirty 2005 box-shadow spreading muddy fuzz over dark mode.
 * RIGHT: 1.00px crisp neutral hairline with stepped tonal surface contrast.
 */
export function MudVsHairlineIllustration({
  width = "100%",
  height = "auto",
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 760 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* Center Dividing Hairline */}
      <line x1="380" y1="20" x2="380" y2="300" stroke="var(--x-border)" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />

      {/* ─────────────────── LEFT: DIRTY 2005 BOX-SHADOW ─────────────────── */}
      <g opacity="0.65">
        {/* Concentric murky shadow rings simulating blurred halo */}
        <rect x="60" y="45" width="270" height="210" rx="28" stroke="rgba(255,255,255,0.02)" strokeWidth="24" />
        <rect x="70" y="55" width="250" height="190" rx="22" stroke="rgba(255,255,255,0.04)" strokeWidth="16" />
        <rect x="80" y="65" width="230" height="170" rx="18" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />

        {/* Muddy Card Surface */}
        <rect x="85" y="70" width="220" height="160" rx="16" fill="rgba(255,255,255,0.04)" />

        {/* Crossed Out Shadow Indicator */}
        <circle cx="195" cy="150" r="22" stroke="#FF453A" strokeWidth="1.25" fill="none" />
        <line x1="179" y1="166" x2="211" y2="134" stroke="#FF453A" strokeWidth="1.25" />

        <text x="195" y="292" fill="var(--x-text-muted)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          CSS box-shadow: blur(24px) (Murky Dark Noise)
        </text>
      </g>

      {/* ─────────────────── RIGHT: CRISP 1PX HAIRLINE + TONAL DEPTH ─────────────────── */}
      <g>
        {/* Base Background Floor Representation */}
        <rect x="440" y="60" width="260" height="180" rx="20" fill="var(--x-surface)" stroke="var(--x-border)" strokeWidth="1" />

        {/* Elevated Surface 2 Card with 1px Hairline */}
        <rect x="470" y="90" width="200" height="120" rx="14" fill="var(--x-surface-2)" stroke="var(--x-border)" strokeWidth="1" />

        {/* Hairline Precision Dimension Caliper */}
        <line x1="670" y1="90" x2="695" y2="90" stroke="var(--x-accent)" strokeWidth="0.75" />
        <line x1="670" y1="91" x2="695" y2="91" stroke="var(--x-accent)" strokeWidth="0.75" />
        <line x1="695" y1="84" x2="695" y2="97" stroke="var(--x-accent)" strokeWidth="1" />
        <text x="702" y="94" fill="var(--x-accent)" fontSize="10" fontFamily="var(--x-font-family-mono)">
          1.00px
        </text>

        {/* Internal architectural content hairlines */}
        <line x1="490" y1="120" x2="570" y2="120" stroke="var(--x-border)" strokeWidth="1" />
        <line x1="490" y1="135" x2="630" y2="135" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="3 3" />
        <rect x="490" y="155" width="60" height="28" rx="6" stroke="var(--x-accent)" strokeWidth="1" />

        <text x="570" y="292" fill="var(--x-text)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          1px Hairline Depth · Stepped Neutral Contrast
        </text>
      </g>
    </svg>
  );
}

/**
 * 3. Fluid Kinematics vs Jarring Snap
 * Expansive 760x320 Motion Dynamics.
 * LEFT: Instantaneous square cliff / abrupt cut (display: none / snap).
 * RIGHT: Continuous Apple damped harmonic spring waveform with organic physical mass.
 */
export function JoltVsButterIllustration({
  width = "100%",
  height = "auto",
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 760 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* Center Dividing Hairline */}
      <line x1="380" y1="20" x2="380" y2="300" stroke="var(--x-border)" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />

      {/* ─────────────────── LEFT: ABRUPT INSTANT CLIFF ─────────────────── */}
      <g opacity="0.55">
        {/* Baseline coordinate guide */}
        <line x1="60" y1="220" x2="330" y2="220" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="4 4" />
        <line x1="60" y1="80" x2="330" y2="80" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="4 4" />

        {/* Abrupt Step Function Path (Instant Jolt) */}
        <path
          d="M 60 220 L 195 220 L 195 80 L 330 80"
          stroke="var(--x-text-muted)"
          strokeWidth="2"
          fill="none"
        />

        {/* Sudden Impact Point Indicator */}
        <circle cx="195" cy="80" r="4" fill="#FF453A" />
        <circle cx="195" cy="220" r="4" fill="#FF453A" />
        <line x1="195" y1="80" x2="195" y2="220" stroke="#FF453A" strokeWidth="1.25" strokeDasharray="2 3" />

        <text x="195" y="292" fill="var(--x-text-muted)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          Instant State Snap (Jarring Cliff Transition)
        </text>
      </g>

      {/* ─────────────────── RIGHT: APPLE FLUID SPRING WAVE ─────────────────── */}
      <g>
        {/* Target rest line and amplitude boundaries */}
        <line x1="430" y1="150" x2="700" y2="150" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.5" />
        <path d="M 430 70 Q 565 130 700 150" stroke="var(--x-border)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
        <path d="M 430 230 Q 565 170 700 150" stroke="var(--x-border)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />

        {/* Damped Harmonic Spring Oscillation Waveform */}
        <path
          d="M 430 230 Q 460 230 475 70 Q 495 -10 520 190 Q 545 270 575 130 Q 600 90 635 155 Q 660 160 700 150"
          stroke="var(--x-accent)"
          strokeWidth="2.25"
          fill="none"
        />

        {/* Kinetic Phase Tracking Markers */}
        <circle cx="475" cy="70" r="4" fill="var(--x-accent)" />
        <circle cx="520" cy="190" r="3.5" fill="var(--x-accent)" />
        <circle cx="575" cy="130" r="3" fill="var(--x-accent)" />
        <circle cx="700" cy="150" r="4" fill="var(--x-accent)" />

        {/* Tangent velocity guide */}
        <line x1="450" y1="170" x2="490" y2="30" stroke="var(--x-accent)" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.7" />

        <text x="565" y="292" fill="var(--x-text)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          Apple Damped Spring Physics (Continuous Mass & Fluid Rest)
        </text>
      </g>
    </svg>
  );
}

/**
 * 4. Single Accent Isolation vs Clown Car
 * Expansive 760x320 Chromatic Discipline.
 * LEFT: Rainbow gradient confetti chaos (competing noisy primaries).
 * RIGHT: 90% monolithic neutral architecture + 10% laser acid focal point.
 */
export function ClownCarVsAccentIllustration({
  width = "100%",
  height = "auto",
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 760 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* Center Dividing Hairline */}
      <line x1="380" y1="20" x2="380" y2="300" stroke="var(--x-border)" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />

      {/* ─────────────────── LEFT: CLOWN CAR RAINBOW CHAOS ─────────────────── */}
      <g opacity="0.6">
        {/* Chaotic multi-colored competing UI elements */}
        <rect x="70" y="70" width="250" height="160" rx="18" stroke="var(--x-border)" strokeWidth="1" />

        <rect x="90" y="95" width="45" height="24" rx="12" stroke="#FF3B30" strokeWidth="1.5" />
        <rect x="145" y="95" width="55" height="24" rx="12" stroke="#FF9500" strokeWidth="1.5" />
        <rect x="210" y="95" width="45" height="24" rx="12" stroke="#34C759" strokeWidth="1.5" />
        <rect x="265" y="95" width="35" height="24" rx="12" stroke="#AF52DE" strokeWidth="1.5" />

        <rect x="90" y="140" width="120" height="40" rx="8" stroke="#007AFF" strokeWidth="1.5" />
        <rect x="220" y="140" width="80" height="40" rx="8" stroke="#FF2D55" strokeWidth="1.5" />

        {/* Crossed out clown car diagonal */}
        <line x1="60" y1="60" x2="330" y2="240" stroke="#FF453A" strokeWidth="1.5" />

        <text x="195" y="292" fill="var(--x-text-muted)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          Gradient Confetti Chaos (High Cognitive Noise)
        </text>
      </g>

      {/* ─────────────────── RIGHT: MONOLITHIC NEUTRAL + 1 ACID ACCENT ─────────────────── */}
      <g>
        {/* Calm Monolithic Surface Window */}
        <rect x="440" y="70" width="250" height="160" rx="18" fill="var(--x-surface)" stroke="var(--x-border)" strokeWidth="1" />

        {/* Quiet Structural Navigation chrome */}
        <line x1="460" y1="105" x2="670" y2="105" stroke="var(--x-border)" strokeWidth="0.75" />
        <circle cx="475" cy="88" r="3.5" fill="var(--x-text-muted)" opacity="0.4" />
        <circle cx="488" cy="88" r="3.5" fill="var(--x-text-muted)" opacity="0.4" />

        {/* Calm neutral wireframe content */}
        <line x1="465" y1="135" x2="575" y2="135" stroke="var(--x-border)" strokeWidth="1.5" />
        <line x1="465" y1="155" x2="540" y2="155" stroke="var(--x-border)" strokeWidth="1" strokeDasharray="3 3" />

        {/* The Singular Focused Laser Focal Point Button */}
        <rect x="465" y="180" width="130" height="32" rx="16" fill="var(--x-accent)" />
        <circle cx="485" cy="196" r="3" fill="var(--x-on-accent)" />
        <line x1="497" y1="196" x2="565" y2="196" stroke="var(--x-on-accent)" strokeWidth="1.5" />

        <text x="565" y="292" fill="var(--x-text)" fontSize="11" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          90% Calm Neutral · 10% Singular Focal Draw
        </text>
      </g>
    </svg>
  );
}
