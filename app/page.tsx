"use client";

import React, { useState, useEffect } from "react";
import { SkyBackground } from "@/components/SkyBackground";
import { Navbar, SectionType } from "@/components/Navbar";
import { HomeSection } from "@/components/sections/HomeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const validSections: SectionType[] = [
  "home",
  "about",
  "skills",
  "projects",
  "contacts",
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState<SectionType>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Sync state to URL and load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as
      | "dark"
      | "light"
      | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
    }

    const path = window.location.pathname.replace("/", "");
    if (path && validSections.includes(path as SectionType)) {
      setCurrentSection(path as SectionType);
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname.replace("/", "");
      if (currentPath && validSections.includes(currentPath as SectionType)) {
        setCurrentSection(currentPath as SectionType);
      } else {
        setCurrentSection("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch {
        // Ignore localStorage quota or access errors
      }
      if (next === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
      return next;
    });
  };

  const handleNavigate = (section: SectionType) => {
    setCurrentSection(section);
    setIsScrolled(false);
    const newPath = section === "home" ? "/" : `/${section}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  };

  return (
    <main
      className={`h-screen w-screen font-sans overflow-hidden relative transition-colors duration-500 ${
        theme === "light"
          ? "text-slate-900 selection:bg-amber-400 selection:text-slate-950"
          : "bg-[#0E131F] text-white selection:bg-yellow-500 selection:text-black"
      }`}
    >
      {/* Dynamic Celestial Sky Engine (Rising Sun & Clouds in Light Mode, Rising Moon & Stars in Dark Mode) */}
      <SkyBackground theme={theme} currentSection={currentSection} />

      {/* Top Navbar with Theme Toggle */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isScrolled={isScrolled}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Section Views with Enter Animations */}
      {currentSection === "home" && (
        <HomeSection
          onNavigateNext={() => handleNavigate("about")}
          theme={theme}
        />
      )}

      {currentSection === "about" && (
        <AboutSection
          onNavigateNext={() => handleNavigate("skills")}
          theme={theme}
        />
      )}

      {currentSection === "skills" && (
        <SkillsSection
          onNavigateNext={() => handleNavigate("projects")}
          theme={theme}
        />
      )}

      {currentSection === "projects" && (
        <ProjectsSection
          onNavigateNext={() => handleNavigate("contacts")}
          onScroll={setIsScrolled}
          theme={theme}
        />
      )}

      {currentSection === "contacts" && <ContactSection theme={theme} />}
    </main>
  );
}
