"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { SectionType } from "@/components/Navbar";

interface SkyBackgroundProps {
  theme: "dark" | "light";
  currentSection?: SectionType;
}

type MoonPhase = "full" | "half" | "crescent";

export const SkyBackground: React.FC<SkyBackgroundProps> = ({
  theme,
  currentSection,
}) => {
  const isProjects = currentSection === "projects";
  // Moon phase state: full -> half -> crescent -> full loop
  const [moonPhase, setMoonPhase] = useState<MoonPhase>("full");

  // Sun clicks counter & 10-second storm easter egg state
  const [sunClicks, setSunClicks] = useState(0);
  const [isStorming, setIsStorming] = useState(false);

  // Storm countdown timer: 10 seconds
  useEffect(() => {
    if (!isStorming) return;
    const timer = setTimeout(() => {
      setIsStorming(false);
      setSunClicks(0);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isStorming]);

  // Handle clicking the Moon (Dark mode easter egg)
  const handleMoonClick = () => {
    setMoonPhase((prev) => {
      if (prev === "full") return "half";
      if (prev === "half") return "crescent";
      return "full";
    });
  };

  // Handle clicking the Sun (Light mode easter egg: 5 clicks -> 10s storm)
  const handleSunClick = () => {
    if (isStorming) return;
    const nextCount = sunClicks + 1;
    if (nextCount >= 5) {
      setIsStorming(true);
      setSunClicks(0);
    } else {
      setSunClicks(nextCount);
    }
  };

  // Precompute 45 deterministic stars for the night sky
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => {
      const top = ((i * 17 + 23) % 92) + 2;
      const left = ((i * 31 + 47) % 96) + 2;
      const size = i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5;
      const duration = 2.2 + ((i * 7) % 25) / 10;
      const delay = ((i * 11) % 35) / 10;
      const isSparkle = i % 9 === 0;

      return { top, left, size, duration, delay, isSparkle };
    });
  }, []);

  // Precompute 65 raindrops for the storm animation
  const raindrops = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      left: ((i * 19 + 7) % 98) + 1,
      duration: 0.6 + ((i * 3) % 5) / 10,
      delay: ((i * 7) % 20) / 10,
      height: 18 + ((i * 5) % 18),
    }));
  }, []);

  return (
    <>
      {/* ================= LAYER 1: ATMOSPHERIC CANVAS (Z-0) ================= */}
      <div
        className={`fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-1000 z-0 ${
          theme === "light"
            ? isStorming
              ? "bg-gradient-to-b from-[#253041] via-[#334155] to-[#475569]"
              : "bg-gradient-to-b from-[#38bdf8] via-[#bae6fd] to-[#fef3c7]"
            : "bg-gradient-to-b from-[#060913] via-[#0E131F] to-[#12192b]"
        }`}
        aria-hidden="true"
      >
        {/* LIGHT MODE ATMOSPHERE (Clouds, Rain & Passing-Cloud Lightning) */}
        {theme === "light" && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Cloud Layer 1: High & Slow */}
            <div
              className={`absolute top-6 left-0 transition-opacity duration-1000 ${
                isStorming ? "opacity-95" : "opacity-85"
              }`}
              style={{
                animation: "cloudDriftSlow 42s linear infinite",
              }}
            >
              <svg
                width="240"
                height="80"
                viewBox="0 0 240 80"
                className={`drop-shadow-md transition-colors duration-1000 ${
                  isStorming
                    ? "fill-slate-600 text-slate-600"
                    : "fill-white text-white/95"
                }`}
              >
                <path d="M 25 65 A 25 25 0 0 1 65 30 A 35 35 0 0 1 125 20 A 30 30 0 0 1 175 35 A 25 25 0 0 1 215 65 Z" />
              </svg>

              {/* Lightning Bolt 1: Emanates directly from Cloud 1 as it passes across */}
              {isStorming && (
                <div className="absolute top-[62px] left-[105px] pointer-events-none animate-lightning-bolt-a z-15">
                  <svg
                    width="100"
                    height="240"
                    viewBox="0 0 100 240"
                    className="overflow-visible"
                  >
                    <path
                      d="M 45 0 L 38 45 L 58 52 L 28 120 L 44 128 L 14 210"
                      stroke="#f0f9ff"
                      strokeWidth="2.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 38 45 L 16 75"
                      stroke="#67e8f9"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 28 120 L 8 142"
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Cloud Layer 2: Mid Altitude */}
            <div
              className={`absolute top-28 left-0 transition-opacity duration-1000 ${
                isStorming ? "opacity-100" : "opacity-90"
              }`}
              style={{
                animation: "cloudDriftMedium 32s linear -14s infinite",
              }}
            >
              <svg
                width="310"
                height="100"
                viewBox="0 0 310 100"
                className={`drop-shadow-lg transition-colors duration-1000 ${
                  isStorming
                    ? "fill-slate-700 text-slate-700"
                    : "fill-white text-white"
                }`}
              >
                <path d="M 30 85 A 30 30 0 0 1 80 40 A 45 45 0 0 1 160 25 A 40 40 0 0 1 230 45 A 35 35 0 0 1 285 85 Z" />
              </svg>

              {/* Lightning Bolt 2: Emanates directly from Cloud 2 as it passes across */}
              {isStorming && (
                <div className="absolute top-[82px] left-[145px] pointer-events-none animate-lightning-bolt-b z-15">
                  <svg
                    width="90"
                    height="210"
                    viewBox="0 0 90 210"
                    className="overflow-visible"
                  >
                    <path
                      d="M 42 0 L 52 42 L 34 48 L 56 108 L 38 116 L 48 185"
                      stroke="#f0f9ff"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 34 48 L 12 70"
                      stroke="#67e8f9"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Cloud Layer 3: Lower, Fluffy */}
            <div
              className={`absolute top-52 left-0 transition-opacity duration-1000 ${
                isStorming ? "opacity-90" : "opacity-80"
              }`}
              style={{
                animation: "cloudDriftSlow 48s linear -26s infinite",
              }}
            >
              <svg
                width="280"
                height="90"
                viewBox="0 0 280 90"
                className={`drop-shadow-md transition-colors duration-1000 ${
                  isStorming
                    ? "fill-slate-650 text-slate-600"
                    : "fill-white text-white/90"
                }`}
              >
                <path d="M 25 75 A 25 25 0 0 1 70 35 A 40 40 0 0 1 145 22 A 35 35 0 0 1 210 40 A 30 30 0 0 1 255 75 Z" />
              </svg>

              {/* Lightning Bolt 3: Emanates directly from Cloud 3 as it passes across */}
              {isStorming && (
                <div className="absolute top-[72px] left-[135px] pointer-events-none animate-lightning-bolt-a z-15">
                  <svg
                    width="85"
                    height="190"
                    viewBox="0 0 85 190"
                    className="overflow-visible"
                  >
                    <path
                      d="M 40 0 L 32 38 L 48 44 L 22 100 L 36 106 L 12 175"
                      stroke="#f0f9ff"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 32 38 L 14 60"
                      stroke="#67e8f9"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Cloud Layer 4: Fast Drift */}
            <div
              className={`absolute top-16 left-0 transition-opacity duration-1000 ${
                isStorming ? "opacity-85" : "opacity-75"
              }`}
              style={{
                animation: "cloudDriftFast 24s linear -7s infinite",
              }}
            >
              <svg
                width="190"
                height="65"
                viewBox="0 0 190 65"
                className={`drop-shadow-sm transition-colors duration-1000 ${
                  isStorming
                    ? "fill-slate-600 text-slate-600"
                    : "fill-white text-white/80"
                }`}
              >
                <path d="M 20 55 A 20 20 0 0 1 55 25 A 30 30 0 0 1 105 18 A 25 25 0 0 1 150 30 A 20 20 0 0 1 175 55 Z" />
              </svg>
            </div>

            {/* Rain Streaks in Storm Mode (Lasts 10s) */}
            {isStorming && (
              <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden animate-in fade-in duration-500">
                {raindrops.map((drop, idx) => (
                  <span
                    key={`rain-${idx}`}
                    className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-cyan-200/80 to-white/90 rounded-full"
                    style={{
                      left: `${drop.left}%`,
                      top: 0,
                      height: `${drop.height}px`,
                      animation: `rainFall ${drop.duration}s linear ${drop.delay}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Soft Horizon Gradient */}
            <div
              className={`absolute bottom-0 inset-x-0 h-40 pointer-events-none transition-colors duration-1000 ${
                isStorming
                  ? "bg-gradient-to-t from-slate-800/80 via-slate-700/30 to-transparent"
                  : "bg-gradient-to-t from-amber-100/60 via-amber-50/20 to-transparent"
              }`}
            />
          </div>
        )}

        {/* DARK MODE ATMOSPHERE (Twinkling Stars & Shifting Shooting Stars) */}
        {theme === "dark" && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Shifting Shooting Star 1: Upper-right heading down-left */}
            <div
              className="absolute top-[8%] left-[78%] h-0.5 w-0.5 rounded-full bg-cyan-100 shadow-[0_0_8px_2px_#67e8f9] before:absolute before:top-1/2 before:h-[1.5px] before:w-[130px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-cyan-300 before:via-white/80 before:to-transparent before:content-[''] animate-shooting-star-1 pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Shifting Shooting Star 2: Upper-left heading down-right */}
            <div
              className="absolute top-[14%] left-[10%] h-0.5 w-0.5 rounded-full bg-cyan-100 shadow-[0_0_8px_2px_#67e8f9] before:absolute before:top-1/2 before:h-[1.5px] before:w-[120px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-cyan-300 before:via-white/80 before:to-transparent before:content-[''] animate-shooting-star-2 pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Shifting Shooting Star 3: Mid-sky right heading steep down-left */}
            <div
              className="absolute top-[26%] left-[62%] h-0.5 w-0.5 rounded-full bg-cyan-100 shadow-[0_0_8px_2px_#67e8f9] before:absolute before:top-1/2 before:h-[1.5px] before:w-[135px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-cyan-300 before:via-white/80 before:to-transparent before:content-[''] animate-shooting-star-3 pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Shifting Shooting Star 4: High center heading gentle down-right */}
            <div
              className="absolute top-[5%] left-[34%] h-0.5 w-0.5 rounded-full bg-cyan-100 shadow-[0_0_8px_2px_#67e8f9] before:absolute before:top-1/2 before:h-[1.5px] before:w-[125px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-cyan-300 before:via-white/80 before:to-transparent before:content-[''] animate-shooting-star-4 pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Twinkling Stars */}
            {stars.map((star, idx) => (
              <span
                key={`star-${idx}`}
                className="absolute rounded-full bg-white block pointer-events-none"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                  boxShadow:
                    star.size > 2
                      ? "0 0 6px 1px rgba(255, 255, 255, 0.85)"
                      : "0 0 3px 0.5px rgba(255, 255, 255, 0.6)",
                }}
              >
                {star.isSparkle && (
                  <span className="absolute -inset-1.5 flex items-center justify-center text-[7px] text-white/80 pointer-events-none">
                    ✦
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ================= SCREEN LIGHTNING FLASH OVERLAY (Z-30) ================= */}
      {/* Flashes the entire screen with dramatic lightning flashes during storm easter egg */}
      {theme === "light" && isStorming && (
        <div
          className="fixed inset-0 pointer-events-none z-30 animate-lightning-flash bg-gradient-to-b from-cyan-100/35 via-white/45 to-slate-300/20"
          aria-hidden="true"
        />
      )}

      {/* ================= LAYER 2: INTERACTIVE CELESTIAL OBJECTS (Z-40) ================= */}
      {/* Positioned above content sections (z-20) and beneath navbar controls (z-50) */}
      {/* Pure easter egg: Zero hover tooltips, zero notification badges */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {/* INTERACTIVE SUN (Light Mode Easter Egg) */}
        {theme === "light" && (
          <div
            className={`absolute top-20 right-6 md:right-24 w-24 h-24 md:w-32 md:h-32 transition-all duration-1000 ease-in-out ${
              isProjects
                ? "translate-y-[120vh] opacity-0 pointer-events-none scale-75"
                : "translate-y-0 opacity-100 scale-100"
            }`}
          >
            <div
              key={isStorming ? "sun-storming" : "sun-normal"}
              onClick={handleSunClick}
              className={`select-none ${
                isStorming
                  ? "animate-sun-set pointer-events-none"
                  : "animate-sun-rise cursor-pointer pointer-events-auto hover:scale-105 active:scale-95 transition-transform duration-200"
              }`}
              role="button"
              tabIndex={isProjects ? -1 : 0}
              aria-label="Celestial interaction"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSunClick();
                }
              }}
            >
              {/* Sun Halo Outer Ring */}
              <div
                className={`absolute -inset-10 rounded-full blur-2xl pointer-events-none transition-colors duration-500 ${
                  isStorming
                    ? "bg-slate-400/10"
                    : sunClicks > 0
                    ? "bg-amber-400/40"
                    : "bg-amber-300/20 animate-pulse"
                }`}
              />
              <div
                className={`absolute -inset-4 rounded-full blur-xl pointer-events-none transition-colors duration-500 ${
                  isStorming ? "bg-slate-300/10" : "bg-yellow-400/30"
                }`}
              />

              {/* Sun Sphere with Radial Glow */}
              <div
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full relative shadow-2xl flex items-center justify-center transition-all duration-500 ${
                  isStorming
                    ? "bg-gradient-to-tr from-amber-600 via-orange-400 to-amber-200 opacity-60"
                    : "bg-gradient-to-tr from-amber-400 via-yellow-300 to-yellow-100 animate-sun-pulse"
                }`}
              >
                <div className="w-full h-full rounded-full bg-radial from-white/60 via-yellow-200/20 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE MOON (Dark Mode Easter Egg - Exact Same Size as Sun & Pure Circular Aura) */}
        {theme === "dark" && (
          <div
            className={`absolute top-20 right-6 md:right-24 w-24 h-24 md:w-32 md:h-32 transition-all duration-1000 ease-in-out ${
              isProjects
                ? "translate-y-[120vh] opacity-0 pointer-events-none scale-75"
                : "translate-y-0 opacity-100 scale-100"
            }`}
          >
            <div
              key="moon-body"
              onClick={handleMoonClick}
              className="animate-moon-rise cursor-pointer pointer-events-auto hover:scale-105 active:scale-95 transition-transform duration-200 select-none w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
              role="button"
              tabIndex={isProjects ? -1 : 0}
              aria-label="Celestial interaction"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMoonClick();
                }
              }}
            >
            {/* Directional Lunar Halo Aura: Glow radiates ONLY from the illuminated portion */}
            <div
              className="absolute -inset-8 pointer-events-none transition-all duration-500 overflow-visible rounded-full"
              style={{
                clipPath:
                  moonPhase === "half"
                    ? "polygon(50% -50%, 200% -50%, 200% 150%, 50% 150%)"
                    : moonPhase === "crescent"
                    ? "polygon(62% -50%, 200% -50%, 200% 150%, 62% 150%)"
                    : "none",
              }}
            >
              <div
                className={`w-full h-full rounded-full bg-indigo-200/25 blur-xl transition-all duration-500 ${
                  moonPhase === "crescent"
                    ? "opacity-60 scale-105"
                    : moonPhase === "half"
                    ? "opacity-75 scale-100"
                    : "opacity-100 scale-100"
                }`}
              />
              <div
                className={`absolute inset-2 rounded-full bg-slate-100/30 blur-md transition-all duration-500 ${
                  moonPhase === "crescent"
                    ? "opacity-70"
                    : moonPhase === "half"
                    ? "opacity-85"
                    : "opacity-100"
                }`}
              />
            </div>

            {/* Precision Lunar Geometry (SVG with mathematically smooth crescent and half curves) */}
            {/* Pure circular container: zero square background, zero square box shadow */}
            <div className="w-full h-full rounded-full relative flex items-center justify-center overflow-visible">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full rounded-full overflow-visible"
              >
                <defs>
                  {/* Subtle earthshine gradient for dark side */}
                  <radialGradient
                    id="darkSideGrad"
                    cx="40%"
                    cy="40%"
                    r="60%"
                  >
                    <stop offset="0%" stopColor="#111827" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#080c18" stopOpacity="0.95" />
                  </radialGradient>

                  {/* Luminous moon surface gradient */}
                  <linearGradient
                    id="lunarSurfaceGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="60%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>

                  {/* Smooth Half-Moon Clip Path (Right 50%) */}
                  <clipPath id="halfMoonClip">
                    <rect x="50" y="0" width="50" height="100" />
                  </clipPath>

                  {/* Subtractive Circle Mask for a Mathematically Smooth, Flawless Crescent */}
                  {/* Outer circle radius 42, subtractive circle radius 40 centered at x=34 */}
                  <mask id="crescentMoonMask">
                    <rect width="100" height="100" fill="black" />
                    <circle cx="50" cy="50" r="42" fill="white" />
                    <circle cx="34" cy="50" r="40" fill="black" />
                  </mask>
                </defs>

                {/* 1. Base Dark Silhouette (Faint Earthshine disk) */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="url(#darkSideGrad)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />

                {/* Faint craters on dark side for authentic astronomical depth */}
                <circle cx="36" cy="38" r="4" fill="rgba(255,255,255,0.03)" />
                <circle cx="32" cy="58" r="5" fill="rgba(255,255,255,0.025)" />
                <circle cx="44" cy="68" r="3" fill="rgba(255,255,255,0.02)" />

                {/* 2. Illuminated Lunar Surface by Phase */}
                {/* --- FULL MOON --- */}
                {moonPhase === "full" && (
                  <g className="transition-all duration-500">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="url(#lunarSurfaceGrad)"
                    />
                    {/* Realistic surface craters */}
                    <circle cx="38" cy="36" r="4.5" fill="#94a3b8" opacity="0.3" />
                    <circle cx="46" cy="50" r="6" fill="#94a3b8" opacity="0.35" />
                    <circle cx="62" cy="40" r="5" fill="#94a3b8" opacity="0.3" />
                    <circle cx="58" cy="64" r="7" fill="#94a3b8" opacity="0.35" />
                    <circle cx="72" cy="54" r="4" fill="#94a3b8" opacity="0.25" />
                    <circle cx="68" cy="28" r="3" fill="#94a3b8" opacity="0.25" />
                  </g>
                )}

                {/* --- HALF MOON (Right 50% Illuminated) --- */}
                {moonPhase === "half" && (
                  <g className="transition-all duration-500">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="url(#lunarSurfaceGrad)"
                      clipPath="url(#halfMoonClip)"
                    />
                    {/* Craters on illuminated half */}
                    <circle
                      cx="62"
                      cy="40"
                      r="5"
                      fill="#94a3b8"
                      opacity="0.3"
                      clipPath="url(#halfMoonClip)"
                    />
                    <circle
                      cx="58"
                      cy="64"
                      r="7"
                      fill="#94a3b8"
                      opacity="0.35"
                      clipPath="url(#halfMoonClip)"
                    />
                    <circle
                      cx="72"
                      cy="54"
                      r="4"
                      fill="#94a3b8"
                      opacity="0.25"
                      clipPath="url(#halfMoonClip)"
                    />
                    <circle
                      cx="68"
                      cy="28"
                      r="3"
                      fill="#94a3b8"
                      opacity="0.25"
                      clipPath="url(#halfMoonClip)"
                    />
                    {/* Soft terminator line shading */}
                    <line
                      x1="50"
                      y1="8"
                      x2="50"
                      y2="92"
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* --- CRESCENT MOON (Flawlessly Curved, Subtractive Geometry) --- */}
                {moonPhase === "crescent" && (
                  <g className="transition-all duration-500">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="url(#lunarSurfaceGrad)"
                      mask="url(#crescentMoonMask)"
                    />
                    {/* Craters visible within the crescent sliver */}
                    <circle
                      cx="74"
                      cy="44"
                      r="3"
                      fill="#94a3b8"
                      opacity="0.3"
                      mask="url(#crescentMoonMask)"
                    />
                    <circle
                      cx="72"
                      cy="58"
                      r="3.5"
                      fill="#94a3b8"
                      opacity="0.3"
                      mask="url(#crescentMoonMask)"
                    />
                    {/* Luminous rim highlight */}
                    <circle
                      cx="50"
                      cy="50"
                      r="41.5"
                      fill="none"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="1"
                      mask="url(#crescentMoonMask)"
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
};
