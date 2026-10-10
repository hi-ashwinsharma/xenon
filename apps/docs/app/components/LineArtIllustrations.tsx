"use client";

import React, { type ReactElement } from "react";

interface LineArtProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * 1. Concentricity vs Egg Mode
 * Illustrates awkward inner egg-corner versus mathematically nested concentric arc
 */
export function EggVsConcentricIllustration({
  width = 380,
  height = 200,
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* Background Grid Lines (Subtle blueprint guides) */}
      <line x1="20" y1="20" x2="360" y2="20" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="20" y1="180" x2="360" y2="180" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="190" y1="10" x2="190" y2="190" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="2 4" />

      {/* LEFT: Broken / Alien Egg Mode */}
      <g opacity="0.6">
        {/* Outer Box R=24 */}
        <rect x="30" y="35" width="130" height="130" rx="24" stroke="var(--x-border)" strokeWidth="1" />
        {/* Inset Inner Box also R=24 (Wrong! Looks like an egg/bulge) */}
        <rect x="46" y="51" width="98" height="98" rx="24" stroke="var(--x-text-muted)" strokeWidth="1" strokeDasharray="4 2" />
        
        {/* Error Crosshair / Note */}
        <text x="95" y="104" fill="var(--x-text-muted)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          R1 = R2 (optical bulge)
        </text>
        <circle cx="58" cy="63" r="6" stroke="#ff453a" strokeWidth="1" fill="none" />
        <line x1="55" y1="60" x2="61" y2="66" stroke="#ff453a" strokeWidth="1" />
        <line x1="61" y1="60" x2="55" y2="66" stroke="#ff453a" strokeWidth="1" />
      </g>

      {/* RIGHT: Xenon Concentric Formula (R_child = R_parent - padding) */}
      <g>
        {/* Outer Box R=28 */}
        <rect x="220" y="35" width="130" height="130" rx="28" stroke="var(--x-border)" strokeWidth="1" />
        {/* Inset Child R = 28 - 16 = 12 */}
        <rect x="236" y="51" width="98" height="98" rx="12" stroke="var(--x-accent)" strokeWidth="1.25" />
        
        {/* Dimension Caliper Guideline */}
        <line x1="220" y1="14" x2="236" y2="14" stroke="var(--x-accent)" strokeWidth="1" />
        <line x1="220" y1="10" x2="220" y2="18" stroke="var(--x-accent)" strokeWidth="1" />
        <line x1="236" y1="10" x2="236" y2="18" stroke="var(--x-accent)" strokeWidth="1" />
        <text x="228" y="8" fill="var(--x-accent)" fontSize="9" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          Δp = 16
        </text>

        {/* Concentric Center Radial Arc */}
        <path d="M 248 51 A 12 12 0 0 0 236 63" stroke="var(--x-accent)" strokeWidth="1.5" />
        <circle cx="248" cy="63" r="2" fill="var(--x-accent)" />
        <line x1="248" y1="63" x2="240" y2="55" stroke="var(--x-accent)" strokeWidth="0.75" />

        <text x="285" y="104" fill="var(--x-text)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          R2 = R1 - Δp (concentric)
        </text>
      </g>
    </svg>
  );
}

/**
 * 2. Hairline Precision vs Muddy Shadows
 * Illustrates dirty fuzzy multi-layer blur cloud vs crisp 1.00px razor edge
 */
export function MudVsHairlineIllustration({
  width = 380,
  height = 200,
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* Center Divider */}
      <line x1="190" y1="15" x2="190" y2="185" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="2 4" />

      {/* LEFT: Muddy Blur Shadow Halo (Banned) */}
      <g opacity="0.6">
        {/* Fake multi-stroke shadow rings to mimic dirty blur */}
        <rect x="22" y="32" width="146" height="136" rx="20" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
        <rect x="26" y="36" width="138" height="128" rx="16" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <rect x="30" y="40" width="130" height="120" rx="12" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
        <rect x="35" y="45" width="120" height="110" rx="10" stroke="var(--x-border)" strokeWidth="1" />

        <text x="95" y="104" fill="var(--x-text-muted)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          box-shadow blur (mud)
        </text>
      </g>

      {/* RIGHT: Xenon Razor 1px Hairline */}
      <g>
        <rect x="225" y="45" width="120" height="110" rx="14" stroke="var(--x-accent)" strokeWidth="1" fill="none" />
        
        {/* Caliper Measuring 1px Exact */}
        <line x1="345" y1="100" x2="368" y2="100" stroke="var(--x-accent)" strokeWidth="0.75" />
        <line x1="346" y1="94" x2="346" y2="106" stroke="var(--x-accent)" strokeWidth="1" />
        <line x1="345" y1="94" x2="345" y2="106" stroke="var(--x-accent)" strokeWidth="1" />
        <text x="372" y="103" fill="var(--x-accent)" fontSize="9" fontFamily="var(--x-font-family-mono)">
          1.00px
        </text>

        <text x="285" y="104" fill="var(--x-text)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          hairline tone depth
        </text>
      </g>
    </svg>
  );
}

/**
 * 3. Fluid Kinematics vs Snapping
 * Illustrates harsh discontinuous square jump vs Apple physics spring wave
 */
export function JoltVsButterIllustration({
  width = 380,
  height = 200,
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <line x1="190" y1="15" x2="190" y2="185" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="2 4" />

      {/* LEFT: Harsh Snappy Jump (0ms step) */}
      <g opacity="0.6">
        <path
          d="M 35 150 L 80 150 L 80 50 L 155 50"
          stroke="var(--x-text-muted)"
          strokeWidth="1.25"
          fill="none"
        />
        <circle cx="80" cy="50" r="3" fill="#ff453a" />
        <text x="95" y="170" fill="var(--x-text-muted)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          display: none (instant snap)
        </text>
      </g>

      {/* RIGHT: Apple Damped Harmonic Spring Wave */}
      <g>
        <path
          d="M 215 150 Q 235 150 245 42 Q 255 18 268 56 Q 280 88 295 50 Q 308 42 335 50"
          stroke="var(--x-accent)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="268" cy="56" r="3" fill="var(--x-accent)" />
        <circle cx="335" cy="50" r="3" fill="var(--x-accent)" />

        <text x="285" y="170" fill="var(--x-text)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          springSoft (280ms fluid)
        </text>
      </g>
    </svg>
  );
}

/**
 * 4. Single Accent Isolation vs Clown Car
 * Illustrates rainbow clutter crossed out vs 90% neutral canvas with 1 sharp acid focal point
 */
export function ClownCarVsAccentIllustration({
  width = 380,
  height = 200,
}: LineArtProps): ReactElement {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 380 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <line x1="190" y1="15" x2="190" y2="185" stroke="var(--x-border)" strokeWidth="0.75" strokeDasharray="2 4" />

      {/* LEFT: Clown Car 6 Colors */}
      <g opacity="0.6">
        <rect x="35" y="55" width="24" height="24" rx="4" stroke="#ff3b30" strokeWidth="1" />
        <rect x="65" y="55" width="24" height="24" rx="4" stroke="#ff9500" strokeWidth="1" />
        <rect x="95" y="55" width="24" height="24" rx="4" stroke="#34c759" strokeWidth="1" />
        <rect x="125" y="55" width="24" height="24" rx="4" stroke="#af52de" strokeWidth="1" />

        <line x1="30" y1="45" x2="155" y2="85" stroke="#ff453a" strokeWidth="1" />
        <text x="95" y="130" fill="var(--x-text-muted)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          gradient confetti (noise)
        </text>
      </g>

      {/* RIGHT: 90% Neutral + 1 Acid Accent */}
      <g>
        <rect x="225" y="50" width="120" height="40" rx="20" stroke="var(--x-border)" strokeWidth="1" />
        <circle cx="245" cy="70" r="4" fill="var(--x-accent)" />
        <line x1="258" y1="70" x2="325" y2="70" stroke="var(--x-text-muted)" strokeWidth="1" />

        <text x="285" y="130" fill="var(--x-text)" fontSize="10" fontFamily="var(--x-font-family-mono)" textAnchor="middle">
          10% accent (pure focus)
        </text>
      </g>
    </svg>
  );
}
