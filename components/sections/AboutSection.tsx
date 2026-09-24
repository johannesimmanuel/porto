"use client";

import React from "react";
import { SocialBar } from "@/components/SocialBar";
import { portfolioData } from "@/data/portfolio";

interface AboutSectionProps {
  onNavigateNext: () => void;
  theme?: "dark" | "light";
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateNext,
  theme = "dark",
}) => {
  const { personal } = portfolioData;

  return (
    <section className="h-full flex flex-col justify-center items-center px-6 md:px-20 relative animate-in fade-in slide-in-from-bottom-4 duration-500 z-20">
      <div className="max-w-4xl text-center">
        <h3
          className={`text-2xl md:text-4xl font-bold leading-relaxed tracking-wide transition-colors ${
            theme === "light" ? "text-slate-900 drop-shadow-sm" : "text-gray-200"
          }`}
        >
          {personal.about}
        </h3>
      </div>

      <SocialBar
        nextLabel="Skills"
        onNavigateNext={onNavigateNext}
        theme={theme}
      />
    </section>
  );
};
