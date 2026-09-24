"use client";

import React from "react";
import { TypewriterText } from "@/components/TypewriterText";
import { SocialBar } from "@/components/SocialBar";
import { portfolioData } from "@/data/portfolio";

interface HomeSectionProps {
  onNavigateNext: () => void;
  theme?: "dark" | "light";
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateNext,
  theme = "dark",
}) => {
  const { personal } = portfolioData;

  return (
    <section className="h-full flex flex-col justify-center items-center px-6 relative pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center gap-3 md:gap-4 flex flex-col -mt-10 z-20">
        <h1
          className={`text-4xl md:text-6xl font-bold tracking-tight transition-colors ${
            theme === "light" ? "text-slate-900" : "text-white"
          }`}
        >
          {personal.greeting}
        </h1>
        <h2
          className={`text-xl md:text-3xl font-semibold min-h-10 z-20 transition-colors ${
            theme === "light" ? "text-slate-700" : "text-gray-300"
          }`}
        >
          <TypewriterText words={personal.typewriterWords} theme={theme} />
        </h2>
      </div>

      <SocialBar
        nextLabel="Discover"
        onNavigateNext={onNavigateNext}
        theme={theme}
      />
    </section>
  );
};
