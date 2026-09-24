"use client";

import React from "react";
import { SocialBar } from "@/components/SocialBar";
import { portfolioData } from "@/data/portfolio";
import { getTechIcon } from "@/components/TechIcons";

interface SkillsSectionProps {
  onNavigateNext: () => void;
  theme?: "dark" | "light";
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onNavigateNext,
  theme = "dark",
}) => {
  const { skills } = portfolioData;
  const topSkills = skills.slice(0, 6);
  const bottomSkills = skills.slice(6, 11);

  const renderSkill = (skill: (typeof skills)[number]) => {
    const iconColor =
      skill.name === "Next.js"
        ? theme === "light"
          ? "text-slate-950"
          : "text-white"
        : skill.color;

    return (
      <div
        key={skill.name}
        className="group relative flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
      >
        {getTechIcon(
          skill.iconType,
          `w-12 h-12 md:w-16 md:h-16 ${iconColor} drop-shadow-lg`
        )}
        <span
          className={`absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold tracking-wide whitespace-nowrap px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-30 ${
            theme === "light"
              ? "bg-slate-900/90 text-white shadow-md"
              : "bg-black/60 text-gray-200"
          }`}
        >
          {skill.name}
        </span>
      </div>
    );
  };

  return (
    <section className="h-full flex flex-col justify-center items-center px-6 relative animate-in fade-in slide-in-from-bottom-4 duration-500 z-20">
      <div className="text-center mb-12 md:mb-16 -mt-8">
        <h2
          className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors ${
            theme === "light" ? "text-slate-900" : "text-gray-200"
          }`}
        >
          Tech Stack
        </h2>
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12">
        {/* Top Row: 6 Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-14">
          {topSkills.map(renderSkill)}
        </div>

        {/* Bottom Row: 5 Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-14">
          {bottomSkills.map(renderSkill)}
        </div>
      </div>

      <SocialBar
        nextLabel="Projects"
        onNavigateNext={onNavigateNext}
        theme={theme}
      />
    </section>
  );
};
