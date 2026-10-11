"use client";

import React, { useRef, type ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Shared prop interface — all illustrations accept className only; text lives in HTML below */
interface LineArtProps {
  className?: string;
}

/** Smooth easing token for CSS transitions on SVG geometry attributes */
const EASE = "280ms cubic-bezier(0.2, 0, 0, 1)";

/** Renders two bottom captions aligned to each half of the 720px canvas */
function PanelCaptions({
  left,
  right,
}: {
  left: string;
  right: string;
}): ReactElement {
  const baseStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "13px",
    fontWeight: 300,
    fontFamily: "var(--x-font-family)",
    lineHeight: 1.55,
    textAlign: "center",
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        marginTop: "22px",
        gap: "0",
      }}
    >
      <p style={{ ...baseStyle, color: "var(--x-text-muted)" }}>{left}</p>
      <p style={{ ...baseStyle, color: "var(--x-text)", fontWeight: 400 }}>
        {right}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ILLUSTRATION 1  ·  CONCENTRICITY VS EGG CORNER
   Live interactive: parentRadius + padding props drive real geometry.
   Left  — inner card copies outer rx → displaced arc centers → optical egg.
   Right — inner card uses rx = max(0, outer rx − padding) → shared arc center.
   Zero text inside SVG. Captions rendered as HTML below.
───────────────────────────────────────────────────────────────────────────── */
export function EggVsConcentricIllustration({
  parentRadius = 28,
  padding = 10,
  className,
}: LineArtProps & { parentRadius?: number; padding?: number }): ReactElement {
  const svgRef = useRef<SVGSVGElement | null>(null);

  /* Clamped geometry values */
  const R = Math.min(Math.max(parentRadius, 8), 44);
  const P = Math.min(Math.max(padding, 2), R - 2);
  const Rchild_wrong = R; /* copies parent — this is the bug */
  const Rchild_right = Math.max(0, R - P); /* concentric — this is Xenon */

  /* Card geometry — panels are 260 × 185 inside a 720 × 270 canvas */
  const LO = { x: 45, y: 42, w: 260, h: 185 }; /* left outer */
  const LI = {
    x: LO.x + P,
    y: LO.y + P,
    w: LO.w - 2 * P,
    h: LO.h - 2 * P,
  }; /* left inner */
  const RO = { x: 415, y: 42, w: 260, h: 185 }; /* right outer */
  const RI = {
    x: RO.x + P,
    y: RO.y + P,
    w: RO.w - 2 * P,
    h: RO.h - 2 * P,
  }; /* right inner */

  /* Corner centres — the emotional core of the illustration */
  const LOc = { cx: LO.x + R, cy: LO.y + R }; /* left outer corner centre */
  const LIc = {
    cx: LI.x + Rchild_wrong,
    cy: LI.y + Rchild_wrong,
  }; /* left inner centre (displaced) */
  const ROc = {
    cx: RO.x + R,
    cy: RO.y + R,
  }; /* right outer corner centre = right inner centre (shared!) */

  /* Outer corner arc endpoints (top-left arc: from top-edge to left-edge) */
  const LOarcStart = { x: LO.x + R, y: LO.y };
  const LOarcEnd = { x: LO.x, y: LO.y + R };
  const LIarcStart = { x: LI.x + Rchild_wrong, y: LI.y };
  const LIarcEnd = { x: LI.x, y: LI.y + Rchild_wrong };
  const ROarcStart = { x: RO.x + R, y: RO.y };
  const ROarcEnd = { x: RO.x, y: RO.y + R };
  const RIarcStart = { x: RI.x + Rchild_right, y: RI.y };
  const RIarcEnd = { x: RI.x, y: RI.y + Rchild_right };

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      /* Outer card frames draw in */
      tl.fromTo(
        ".e1-outer",
        { strokeDashoffset: 950, opacity: 0.2 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power2.out",
        },
        0,
      )
        /* Inner cards appear after frames */
        .fromTo(
          ".e1-inner",
          { strokeDashoffset: 850, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.25,
        )
        /* Corner arc highlights */
        .fromTo(
          ".e1-arc",
          { strokeDashoffset: 180, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.5,
        )
        /* Centre dots pop in */
        .fromTo(
          ".e1-dot",
          { scale: 0, transformBox: "fill-box", transformOrigin: "center" },
          { scale: 1, stagger: 0.08, duration: 0.4, ease: "back.out(2.2)" },
          0.65,
        )
        /* Displacement vector traces */
        .fromTo(
          ".e1-vec",
          { strokeDashoffset: 60, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power1.out",
          },
          0.75,
        );

      /* Living pulse on shared concentric centre */
      gsap.to(".e1-pulse", {
        scale: 2.8,
        opacity: 0,
        transformBox: "fill-box",
        transformOrigin: "center",
        duration: 3.2,
        repeat: -1,
        ease: "power2.out",
      });
    },
    { scope: svgRef },
  );

  return (
    <div style={{ width: "100%", userSelect: "none" }} className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="auto"
        viewBox="0 0 720 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* Soft centre divider */}
        <line
          x1="360"
          y1="18"
          x2="360"
          y2="252"
          stroke="var(--x-border)"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.35"
        />

        {/* ── LEFT: WRONG — same radius copied ── */}

        {/* Outer card */}
        <rect
          x={LO.x}
          y={LO.y}
          width={LO.w}
          height={LO.h}
          rx={R}
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="950"
          className="e1-outer"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Inner card — wrong (copies R) */}
        <rect
          x={LI.x}
          y={LI.y}
          width={LI.w}
          height={LI.h}
          rx={Rchild_wrong}
          stroke="var(--x-text-muted)"
          strokeWidth="1.2"
          strokeDasharray="2 4"
          fill="none"
          strokeDashoffset="0"
          className="e1-inner"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Wrong corner arc — outer */}
        <path
          d={`M ${LOarcStart.x} ${LOarcStart.y} A ${R} ${R} 0 0 0 ${LOarcEnd.x} ${LOarcEnd.y}`}
          stroke="#FF453A"
          strokeWidth="1.8"
          fill="none"
          opacity="0.45"
          strokeDasharray="180"
          className="e1-arc"
        />

        {/* Wrong corner arc — inner (displaced, shows the egg) */}
        <path
          d={`M ${LIarcStart.x} ${LIarcStart.y} A ${Rchild_wrong} ${Rchild_wrong} 0 0 0 ${LIarcEnd.x} ${LIarcEnd.y}`}
          stroke="#FF453A"
          strokeWidth="2"
          fill="none"
          strokeDasharray="180"
          className="e1-arc"
        />

        {/* Outer corner centre dot */}
        <circle
          cx={LOc.cx}
          cy={LOc.cy}
          r="3.5"
          fill="var(--x-text-muted)"
          className="e1-dot"
          style={{ transition: `cx ${EASE}, cy ${EASE}` }}
        />
        {/* Inner corner centre dot — displaced from outer (this is the problem) */}
        <circle
          cx={LIc.cx}
          cy={LIc.cy}
          r="4"
          fill="#FF453A"
          className="e1-dot"
          style={{ transition: `cx ${EASE}, cy ${EASE}` }}
        />

        {/* Displacement vector — shows the misalignment distance */}
        <line
          x1={LOc.cx}
          y1={LOc.cy}
          x2={LIc.cx}
          y2={LIc.cy}
          stroke="#FF453A"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.8"
          className="e1-vec"
          style={{ transition: `all ${EASE}` }}
        />

        {/* ── RIGHT: CORRECT — concentric nesting ── */}

        {/* Outer card */}
        <rect
          x={RO.x}
          y={RO.y}
          width={RO.w}
          height={RO.h}
          rx={R}
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="950"
          className="e1-outer"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Inner card — correct (R − P) */}
        <rect
          x={RI.x}
          y={RI.y}
          width={RI.w}
          height={RI.h}
          rx={Rchild_right}
          stroke="var(--x-accent)"
          strokeWidth="1.8"
          fill="none"
          strokeDasharray="850"
          className="e1-inner"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Correct outer corner arc */}
        <path
          d={`M ${ROarcStart.x} ${ROarcStart.y} A ${R} ${R} 0 0 0 ${ROarcEnd.x} ${ROarcEnd.y}`}
          stroke="var(--x-accent)"
          strokeWidth="1.8"
          fill="none"
          opacity="0.45"
          strokeDasharray="180"
          className="e1-arc"
        />

        {/* Correct inner corner arc — from shared centre, perfectly parallel */}
        {Rchild_right > 0 && (
          <path
            d={`M ${RIarcStart.x} ${RIarcStart.y} A ${Rchild_right} ${Rchild_right} 0 0 0 ${RIarcEnd.x} ${RIarcEnd.y}`}
            stroke="var(--x-accent)"
            strokeWidth="2.2"
            fill="none"
            strokeDasharray="180"
            className="e1-arc"
          />
        )}

        {/* Radial guide rays from shared centre to each arc's tangent points */}
        <line
          x1={ROc.cx}
          y1={ROc.cy}
          x2={ROarcStart.x}
          y2={ROarcStart.y}
          stroke="var(--x-accent)"
          strokeWidth="0.85"
          strokeDasharray="3 4"
          opacity="0.55"
          className="e1-vec"
          style={{ transition: `all ${EASE}` }}
        />
        <line
          x1={ROc.cx}
          y1={ROc.cy}
          x2={ROarcEnd.x}
          y2={ROarcEnd.y}
          stroke="var(--x-accent)"
          strokeWidth="0.85"
          strokeDasharray="3 4"
          opacity="0.55"
          className="e1-vec"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Shared centre pulse ring */}
        <circle
          cx={ROc.cx}
          cy={ROc.cy}
          r="8"
          fill="none"
          stroke="var(--x-accent)"
          strokeWidth="1"
          opacity="0.35"
          className="e1-pulse"
          style={{ transition: `cx ${EASE}, cy ${EASE}` }}
        />
        {/* Shared centre dot — ONE dot for both arcs (the harmony proof) */}
        <circle
          cx={ROc.cx}
          cy={ROc.cy}
          r="4"
          fill="var(--x-accent)"
          className="e1-dot"
          style={{ transition: `cx ${EASE}, cy ${EASE}` }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ILLUSTRATION 2  ·  SUB-PIXEL PROFILOMETRY: MUDDY SHADOW VS 1.00PX HAIRLINE
   Left  — Gaussian blur dispersion profile (σ = 24px): murky falloff bell curve
           dirtying surrounding AMOLED pixels with diffuse raster smear.
   Right — Dirac-delta 1.00px vector step: mathematical edge containment,
           calibrated dimensional calipers, zero blur compositing overhead.
   Zero text inside SVG. Captions rendered in HTML below.
───────────────────────────────────────────────────────────────────────────── */
interface MudVsHairlineProps extends LineArtProps {
  isLight?: boolean;
  inspectHairline?: boolean;
}

export function MudVsHairlineIllustration({
  className,
  isLight = false,
  inspectHairline = false,
}: MudVsHairlineProps): ReactElement {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      /* Left: Gaussian dispersion curves spread outward */
      tl.fromTo(
        ".m2-frame",
        { opacity: 0, strokeDashoffset: 800 },
        { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
        0,
      )
        .fromTo(
          ".m2-contour",
          { opacity: 0, strokeDashoffset: 350 },
          {
            opacity: 1,
            strokeDashoffset: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power1.out",
          },
          0.15,
        )
        .fromTo(
          ".m2-bleed",
          {
            opacity: 0,
            scale: 0.9,
            transformBox: "fill-box",
            transformOrigin: "center",
          },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
          },
          0.3,
        )
        .fromTo(
          ".m2-dot",
          { scale: 0, transformBox: "fill-box", transformOrigin: "center" },
          { scale: 1, stagger: 0.08, duration: 0.4, ease: "back.out(2)" },
          0.45,
        )
        /* Right: Crisp 1.00px hairline step & calipers snap into alignment */
        .fromTo(
          ".m2-step",
          { strokeDashoffset: 400, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
          },
          0.2,
        )
        .fromTo(
          ".m2-caliper",
          { strokeDashoffset: 80, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.45,
            ease: "power1.out",
          },
          0.5,
        );

      /* Living pulse at the 1.00px hairline step junction */
      gsap.to(".m2-pulse", {
        scale: 2.6,
        opacity: 0,
        transformBox: "fill-box",
        transformOrigin: "center",
        duration: 3.2,
        repeat: -1,
        ease: "power2.out",
      });
    },
    { scope: svgRef },
  );

  return (
    <div style={{ width: "100%", userSelect: "none" }} className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="auto"
        viewBox="0 0 720 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* Soft centre divider */}
        <line
          x1="360"
          y1="18"
          x2="360"
          y2="252"
          stroke="var(--x-border)"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.35"
        />

        {/* ── LEFT: GAUSSIAN DISPERSION SMEAR (σ = 24px) ── */}

        {/* Outer blueprint frame */}
        <rect
          x="45"
          y="36"
          width="270"
          height="190"
          rx="12"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="800"
          className="m2-frame"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Horizontal reference baseline */}
        <line
          x1="65"
          y1="165"
          x2="295"
          y2="165"
          stroke="var(--x-border)"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.5"
        />

        {/* Wide diffuse blur halo bleed (faint shadow bands) */}
        <path
          d="M 65 165 C 110 165 135 60 180 60 C 225 60 250 165 295 165"
          stroke="#FF453A"
          strokeWidth="0.85"
          strokeDasharray="2 6"
          opacity="0.22"
          fill="none"
          className="m2-bleed"
        />
        <path
          d="M 95 165 C 130 165 150 95 180 95 C 210 95 230 165 265 165"
          stroke="#FF453A"
          strokeWidth="1.1"
          strokeDasharray="3 5"
          opacity="0.4"
          fill="none"
          className="m2-bleed"
        />

        {/* Primary Gaussian bell curve falloff */}
        <path
          d="M 80 165 C 125 165 145 72 180 72 C 215 72 235 165 280 165"
          stroke="#FF453A"
          strokeWidth="1.8"
          fill="none"
          strokeDasharray="350"
          className="m2-contour"
        />

        {/* Quantization stair-step jitter (sub-pixel raster discretization) */}
        <path
          d="M 120 165 L 120 161 L 132 161 L 132 154 L 144 154 L 144 142 L 156 142 L 156 122 L 168 122 L 168 96 L 180 96 L 192 96 L 192 122 L 204 122 L 204 142 L 216 142 L 216 154 L 228 154 L 228 161 L 240 161 L 240 165"
          stroke="#FF453A"
          strokeWidth="0.75"
          strokeDasharray="2 3"
          opacity="0.3"
          fill="none"
          className="m2-bleed"
        />

        {/* Center apex dot and dispersion axis */}
        <line
          x1="180"
          y1="72"
          x2="180"
          y2="165"
          stroke="#FF453A"
          strokeWidth="0.85"
          strokeDasharray="3 4"
          opacity="0.5"
          className="m2-bleed"
        />
        <circle cx="180" cy="72" r="3.5" fill="#FF453A" className="m2-dot" />

        {/* Horizontal dispersion caliper span (measuring width σ) */}
        <line
          x1="135"
          y1="118"
          x2="225"
          y2="118"
          stroke="#FF453A"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.7"
          className="m2-bleed"
        />
        <line
          x1="135"
          y1="112"
          x2="135"
          y2="124"
          stroke="#FF453A"
          strokeWidth="1"
          className="m2-bleed"
        />
        <line
          x1="225"
          y1="112"
          x2="225"
          y2="124"
          stroke="#FF453A"
          strokeWidth="1"
          className="m2-bleed"
        />

        {/* ── RIGHT: 1.00PX DIRAC VECTOR STEP & CALIPER ── */}

        {/* Outer blueprint frame */}
        <rect
          x="405"
          y="36"
          width="270"
          height="190"
          rx="12"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="800"
          className="m2-frame"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Lower surface baseline (L0 - Page Canvas) */}
        <line
          x1="425"
          y1="165"
          x2="540"
          y2="165"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          className="m2-step"
          strokeDasharray="400"
        />

        {/* Pure vertical 1.00px Dirac step boundary */}
        <line
          x1="540"
          y1="165"
          x2="540"
          y2="75"
          stroke={inspectHairline ? "var(--x-accent)" : "var(--x-text)"}
          strokeWidth={inspectHairline ? "2" : "1.2"}
          className="m2-step"
          strokeDasharray="400"
          style={{ transition: `stroke ${EASE}, stroke-width ${EASE}` }}
        />

        {/* Upper surface baseline (L1 - Stepped Tone Surface) */}
        <line
          x1="540"
          y1="75"
          x2="655"
          y2="75"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          className="m2-step"
          strokeDasharray="400"
        />

        {/* Tone contrast hatch fill on elevated tier (pure geometric pattern) */}
        <rect
          x="541"
          y="76"
          width="114"
          height="88"
          fill={isLight ? "var(--x-surface-2)" : "var(--x-surface)"}
          stroke="none"
          opacity="0.4"
        />

        {/* Caliper extension witness projection */}
        <line
          x1="540"
          y1="75"
          x2="540"
          y2="46"
          stroke="var(--x-accent)"
          strokeWidth="0.85"
          strokeDasharray="2 3"
          className="m2-caliper"
        />

        {/* Caliper dimensional measurement arrows */}
        <line
          x1="528"
          y1="52"
          x2="552"
          y2="52"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="m2-caliper"
        />
        <line
          x1="531"
          y1="48"
          x2="527"
          y2="52"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="m2-caliper"
        />
        <line
          x1="531"
          y1="56"
          x2="527"
          y2="52"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="m2-caliper"
        />
        <line
          x1="549"
          y1="48"
          x2="553"
          y2="52"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="m2-caliper"
        />
        <line
          x1="549"
          y1="56"
          x2="553"
          y2="52"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="m2-caliper"
        />

        {/* Caliper 45° witness tick mark */}
        <line
          x1="536"
          y1="56"
          x2="544"
          y2="48"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="m2-caliper"
        />

        {/* Vertex beacon and living pulse ring */}
        <circle
          cx="540"
          cy="75"
          r="8"
          fill="none"
          stroke="var(--x-accent)"
          strokeWidth="1"
          opacity="0.35"
          className="m2-pulse"
        />
        <circle
          cx="540"
          cy="75"
          r="3.5"
          fill="var(--x-accent)"
          className="m2-dot"
        />
        <circle
          cx="540"
          cy="165"
          r="3.5"
          fill="var(--x-text-muted)"
          className="m2-dot"
        />
      </svg>

      <PanelCaptions
        left="Diffuse Gaussian blur · σ = 24px · Muddy halo bleed"
        right="1.00px Dirac vector step · StyleSheet.hairlineWidth · Zero GPU overhead"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ILLUSTRATION 3  ·  KINEMATIC OSCILLOSCOPE: 0MS CLIFF VS DAMPED SPRING
   Left  — Discontinuous binary step cliff: Δt = 0ms, unbuffered jerk (j → ∞),
           infinite acceleration tearing UI fabric.
   Right — Damped harmonic oscillation (k = 300, c = 30, m = 1):
           exponential decay envelope bounds, organic kinetic settling.
   Zero text inside SVG. Captions rendered in HTML below.
───────────────────────────────────────────────────────────────────────────── */
export function JoltVsButterIllustration({
  className,
  active,
}: LineArtProps & { active?: boolean }): ReactElement {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* External button replay */
  React.useEffect(() => {
    if (active !== undefined && tlRef.current) {
      tlRef.current.restart();
    }
  }, [active]);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
      tlRef.current = tl;

      /* Blueprint frames draw */
      tl.fromTo(
        ".j3-frame",
        { strokeDashoffset: 800, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0,
      )
        /* Left: Discontinuous cliff draws */
        .fromTo(
          ".j3-cliff",
          { strokeDashoffset: 350, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power1.inOut",
          },
          0.2,
        )
        /* Fracture shear marks appear */
        .fromTo(
          ".j3-fracture",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.35,
            ease: "power2.out",
          },
          0.4,
        )
        /* Shockwave pulse at fracture point */
        .fromTo(
          ".j3-shock",
          {
            scale: 0.5,
            opacity: 1,
            transformBox: "fill-box",
            transformOrigin: "center",
          },
          { scale: 2.4, opacity: 0, duration: 0.5, ease: "power2.out" },
          0.45,
        )
        /* Right: Exponential envelope rails trace */
        .fromTo(
          ".j3-envelope",
          { strokeDashoffset: 300, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.35,
            duration: 0.6,
            ease: "power1.out",
          },
          0.2,
        )
        /* Spring waveform draws across time */
        .fromTo(
          ".j3-wave",
          { strokeDashoffset: 650 },
          { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
          0.25,
        )
        /* Equilibrium puck rides spring to rest */
        .fromTo(
          ".j3-puck",
          {
            x: -160,
            y: 50,
            scale: 0.5,
            transformBox: "fill-box",
            transformOrigin: "center",
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "elastic.out(1, 0.45)",
          },
          0.35,
        );

      /* Living float at resting equilibrium */
      gsap.to(".j3-puck", {
        y: "+=3",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: svgRef },
  );

  return (
    <div style={{ width: "100%", userSelect: "none" }} className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="auto"
        viewBox="0 0 720 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* Soft centre divider */}
        <line
          x1="360"
          y1="18"
          x2="360"
          y2="252"
          stroke="var(--x-border)"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.35"
        />

        {/* ── LEFT: 0MS DISCONTINUOUS STEP CLIFF ── */}

        {/* Blueprint frame */}
        <rect
          x="45"
          y="36"
          width="270"
          height="190"
          rx="12"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="800"
          className="j3-frame"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Horizontal time guide axis */}
        <line
          x1="65"
          y1="170"
          x2="295"
          y2="170"
          stroke="var(--x-border)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.4"
        />
        <line
          x1="65"
          y1="70"
          x2="295"
          y2="70"
          stroke="var(--x-border)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.4"
        />

        {/* Discontinuous cliff path (instant vertical jump) */}
        <path
          d="M 65 170 L 175 170 L 175 70 L 295 70"
          stroke="#FF453A"
          strokeWidth="2.2"
          fill="none"
          strokeDasharray="350"
          className="j3-cliff"
        />

        {/* Shear fracture tick marks along the instantaneous vertical cut */}
        <line
          x1="168"
          y1="145"
          x2="182"
          y2="135"
          stroke="#FF453A"
          strokeWidth="1.2"
          className="j3-fracture"
        />
        <line
          x1="168"
          y1="120"
          x2="182"
          y2="110"
          stroke="#FF453A"
          strokeWidth="1.2"
          className="j3-fracture"
        />
        <line
          x1="168"
          y1="95"
          x2="182"
          y2="85"
          stroke="#FF453A"
          strokeWidth="1.2"
          className="j3-fracture"
        />

        {/* Impact corner vertex and shockwave ring */}
        <circle cx="175" cy="70" r="4.5" fill="#FF453A" className="j3-cliff" />
        <circle
          cx="175"
          cy="170"
          r="3.5"
          fill="#FF453A"
          opacity="0.6"
          className="j3-cliff"
        />
        <circle
          cx="175"
          cy="70"
          r="12"
          stroke="#FF453A"
          strokeWidth="1"
          fill="none"
          className="j3-shock"
        />

        {/* ── RIGHT: APPLE DAMPED HARMONIC OSCILLOSCOPE ── */}

        {/* Blueprint frame */}
        <rect
          x="405"
          y="36"
          width="270"
          height="190"
          rx="12"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="800"
          className="j3-frame"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Equilibrium axis line */}
        <line
          x1="425"
          y1="135"
          x2="655"
          y2="135"
          stroke="var(--x-border)"
          strokeWidth="0.85"
          strokeDasharray="3 5"
          opacity="0.5"
        />

        {/* Exponential decay envelope guide rails (± e^-ζt) */}
        <path
          d="M 430 65 Q 485 95 545 118 Q 595 130 650 135"
          stroke="var(--x-accent)"
          strokeWidth="0.85"
          strokeDasharray="3 4"
          className="j3-envelope"
          fill="none"
        />
        <path
          d="M 430 205 Q 485 175 545 152 Q 595 140 650 135"
          stroke="var(--x-accent)"
          strokeWidth="0.85"
          strokeDasharray="3 4"
          className="j3-envelope"
          fill="none"
        />

        {/* Analytically calculated damped harmonic spring curve */}
        <path
          d="M 430 195 C 445 195 455 65 475 65 C 495 65 505 185 525 185 C 545 185 555 105 575 105 C 595 105 605 152 625 152 C 640 152 645 135 655 135"
          stroke="var(--x-accent)"
          strokeWidth="2.2"
          fill="none"
          strokeDasharray="650"
          className="j3-wave"
        />

        {/* Tangent guide ticks showing smooth, continuous acceleration */}
        <line
          x1="475"
          y1="58"
          x2="475"
          y2="72"
          stroke="var(--x-accent)"
          strokeWidth="0.75"
          opacity="0.4"
        />
        <line
          x1="525"
          y1="178"
          x2="525"
          y2="192"
          stroke="var(--x-accent)"
          strokeWidth="0.75"
          opacity="0.4"
        />
        <line
          x1="575"
          y1="98"
          x2="575"
          y2="112"
          stroke="var(--x-accent)"
          strokeWidth="0.75"
          opacity="0.4"
        />

        {/* Settling kinetic puck at resting equilibrium */}
        <g className="j3-puck" transform="translate(650, 135)">
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke="var(--x-accent)"
            strokeWidth="0.85"
            opacity="0.35"
          />
          <circle cx="0" cy="0" r="5" fill="var(--x-accent)" />
        </g>
      </svg>

      <PanelCaptions
        left="0ms binary cliff · Δt = 0 · Infinite jerk (j → ∞)"
        right="Damped harmonic spring · k = 300, c = 30 · Exponential envelope decay"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ILLUSTRATION 4  ·  ATTENTIONAL RADAR: SACCADIC ENTROPY VS FOCAL VECTOR
   Left  — Saccadic entropy / multi-polar cognitive noise: 6 divergent vectors
           pulling ocular focus into conflicting quadrants.
   Right — Directed coherent affordance: 90% calm neutral architecture with
           one calibrated concentric target reticle and laser vector lock.
   Zero text inside SVG. Captions rendered in HTML below.
───────────────────────────────────────────────────────────────────────────── */
export function ClownCarVsAccentIllustration({
  className,
}: LineArtProps): ReactElement {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      /* Blueprint frames draw */
      tl.fromTo(
        ".c4-frame",
        { strokeDashoffset: 800, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0,
      )
        /* Left: Polar rings & divergent vectors trace */
        .fromTo(
          ".c4-polar",
          {
            opacity: 0,
            scale: 0.7,
            transformBox: "fill-box",
            transformOrigin: "center",
          },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
          },
          0.15,
        )
        .fromTo(
          ".c4-scatter",
          { strokeDashoffset: 120, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.85,
            stagger: 0.05,
            duration: 0.45,
            ease: "power1.out",
          },
          0.3,
        )
        .fromTo(
          ".c4-saccade",
          { strokeDashoffset: 350, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.6,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0.45,
        )
        /* Right: Calm grid & singular target reticle lock in */
        .fromTo(
          ".c4-grid",
          { opacity: 0 },
          { opacity: 0.35, duration: 0.6, ease: "power1.out" },
          0.15,
        )
        .fromTo(
          ".c4-laser",
          { strokeDashoffset: 200, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
          },
          0.35,
        )
        .fromTo(
          ".c4-target",
          {
            scale: 0,
            opacity: 0,
            transformBox: "fill-box",
            transformOrigin: "center",
          },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.08,
            duration: 0.45,
            ease: "back.out(2)",
          },
          0.5,
        );

      /* Living laser target-lock pulse */
      gsap.to(".c4-ping", {
        scale: 2.2,
        opacity: 0,
        transformBox: "fill-box",
        transformOrigin: "center",
        duration: 3.2,
        repeat: -1,
        ease: "power2.out",
      });
    },
    { scope: svgRef },
  );

  return (
    <div style={{ width: "100%", userSelect: "none" }} className={className}>
      <svg
        ref={svgRef}
        width="100%"
        height="auto"
        viewBox="0 0 720 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* Soft centre divider */}
        <line
          x1="360"
          y1="18"
          x2="360"
          y2="252"
          stroke="var(--x-border)"
          strokeWidth="1"
          strokeDasharray="3 7"
          opacity="0.35"
        />

        {/* ── LEFT: SACCADIC ATTENTION ENTROPY (FRAGMENTED EYE-TRACK) ── */}

        {/* Blueprint frame */}
        <rect
          x="45"
          y="36"
          width="270"
          height="190"
          rx="12"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="800"
          className="c4-frame"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Polar radar concentric range rings */}
        <circle
          cx="180"
          cy="130"
          r="26"
          stroke="var(--x-border)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          className="c4-polar"
          fill="none"
        />
        <circle
          cx="180"
          cy="130"
          r="56"
          stroke="var(--x-border)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          className="c4-polar"
          fill="none"
        />
        <circle
          cx="180"
          cy="130"
          r="82"
          stroke="var(--x-border)"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          className="c4-polar"
          fill="none"
        />

        {/* Crosshair reference axes */}
        <line
          x1="98"
          y1="130"
          x2="262"
          y2="130"
          stroke="var(--x-border)"
          strokeWidth="0.75"
          opacity="0.4"
        />
        <line
          x1="180"
          y1="48"
          x2="180"
          y2="212"
          stroke="var(--x-border)"
          strokeWidth="0.75"
          opacity="0.4"
        />

        {/* 6 divergent conflicting attention vectors */}
        <line
          x1="180"
          y1="130"
          x2="245"
          y2="85"
          stroke="#FF453A"
          strokeWidth="1.4"
          strokeDasharray="120"
          className="c4-scatter"
        />
        <line
          x1="180"
          y1="130"
          x2="235"
          y2="175"
          stroke="#FF453A"
          strokeWidth="1.4"
          strokeDasharray="120"
          className="c4-scatter"
        />
        <line
          x1="180"
          y1="130"
          x2="125"
          y2="185"
          stroke="#FF453A"
          strokeWidth="1.4"
          strokeDasharray="120"
          className="c4-scatter"
        />
        <line
          x1="180"
          y1="130"
          x2="105"
          y2="105"
          stroke="#FF453A"
          strokeWidth="1.4"
          strokeDasharray="120"
          className="c4-scatter"
        />
        <line
          x1="180"
          y1="130"
          x2="155"
          y2="55"
          stroke="#FF453A"
          strokeWidth="1.4"
          strokeDasharray="120"
          className="c4-scatter"
        />
        <line
          x1="180"
          y1="130"
          x2="215"
          y2="50"
          stroke="#FF453A"
          strokeWidth="1.4"
          strokeDasharray="120"
          className="c4-scatter"
        />

        {/* Divergent focal endpoints */}
        <circle cx="245" cy="85" r="3.5" fill="#FF453A" className="c4-polar" />
        <circle cx="235" cy="175" r="3.5" fill="#FF453A" className="c4-polar" />
        <circle cx="125" cy="185" r="3.5" fill="#FF453A" className="c4-polar" />
        <circle cx="105" cy="105" r="3.5" fill="#FF453A" className="c4-polar" />
        <circle cx="155" cy="55" r="3.5" fill="#FF453A" className="c4-polar" />
        <circle cx="215" cy="50" r="3.5" fill="#FF453A" className="c4-polar" />

        {/* Erratic saccadic wandering scan-path connecting endpoints */}
        <path
          d="M 245 85 L 155 55 L 215 50 L 105 105 L 125 185 L 235 175 Z"
          stroke="#FF453A"
          strokeWidth="0.85"
          strokeDasharray="3 4"
          opacity="0.35"
          fill="none"
          className="c4-saccade"
        />

        {/* Center ocular confusion dot */}
        <circle
          cx="180"
          cy="130"
          r="3"
          fill="var(--x-text-muted)"
          opacity="0.6"
        />

        {/* ── RIGHT: COHERENT FOCAL VECTOR & CONCENTRIC RETICLE ── */}

        {/* Blueprint frame */}
        <rect
          x="405"
          y="36"
          width="270"
          height="190"
          rx="12"
          stroke="var(--x-border)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="800"
          className="c4-frame"
          style={{ transition: `all ${EASE}` }}
        />

        {/* Calm orthogonal engineering grid (90% neutral architecture) */}
        <g className="c4-grid">
          <line
            x1="435"
            y1="70"
            x2="645"
            y2="70"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="435"
            y1="100"
            x2="645"
            y2="100"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="435"
            y1="130"
            x2="645"
            y2="130"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="435"
            y1="160"
            x2="645"
            y2="160"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="435"
            y1="190"
            x2="645"
            y2="190"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />

          <line
            x1="465"
            y1="50"
            x2="465"
            y2="210"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="510"
            y1="50"
            x2="510"
            y2="210"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="555"
            y1="50"
            x2="555"
            y2="210"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
          <line
            x1="600"
            y1="50"
            x2="600"
            y2="210"
            stroke="var(--x-border)"
            strokeWidth="0.65"
            opacity="0.4"
          />
        </g>

        {/* Directed linear focal vector */}
        <line
          x1="440"
          y1="130"
          x2="585"
          y2="130"
          stroke="var(--x-accent)"
          strokeWidth="2"
          strokeDasharray="200"
          className="c4-laser"
        />

        {/* Collimated parallel focus ray bounds */}
        <line
          x1="455"
          y1="122"
          x2="570"
          y2="122"
          stroke="var(--x-accent)"
          strokeWidth="0.75"
          strokeDasharray="3 4"
          opacity="0.4"
          className="c4-laser"
        />
        <line
          x1="455"
          y1="138"
          x2="570"
          y2="138"
          stroke="var(--x-accent)"
          strokeWidth="0.75"
          strokeDasharray="3 4"
          opacity="0.4"
          className="c4-laser"
        />

        {/* Calibrated concentric optical target lock at (585, 130) */}
        <circle
          cx="585"
          cy="130"
          r="34"
          fill="none"
          stroke="var(--x-accent)"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          opacity="0.4"
          className="c4-target"
        />
        <circle
          cx="585"
          cy="130"
          r="18"
          fill="none"
          stroke="var(--x-accent)"
          strokeWidth="1.2"
          className="c4-target"
        />

        {/* Target crosshair tick marks */}
        <line
          x1="585"
          y1="88"
          x2="585"
          y2="98"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="c4-target"
        />
        <line
          x1="585"
          y1="162"
          x2="585"
          y2="172"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="c4-target"
        />
        <line
          x1="543"
          y1="130"
          x2="553"
          y2="130"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="c4-target"
        />
        <line
          x1="617"
          y1="130"
          x2="627"
          y2="130"
          stroke="var(--x-accent)"
          strokeWidth="1"
          className="c4-target"
        />

        {/* Living laser target-lock pulse wave */}
        <circle
          cx="585"
          cy="130"
          r="18"
          fill="none"
          stroke="var(--x-accent)"
          strokeWidth="1"
          opacity="0.35"
          className="c4-ping"
        />

        {/* Singular laser focal beacon */}
        <circle
          cx="585"
          cy="130"
          r="4.5"
          fill="var(--x-accent)"
          className="c4-target"
        />
        <circle
          cx="440"
          cy="130"
          r="3"
          fill="var(--x-text-muted)"
          className="c4-target"
        />
      </svg>

      <PanelCaptions
        left="Attentional entropy · 6 competing ocular vectors · High cognitive load"
        right="Coherent focal vector · 90% neutral architecture · Directed affordance"
      />
    </div>
  );
}
