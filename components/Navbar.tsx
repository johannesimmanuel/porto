"use client";

import React from "react";

export type SectionType = "home" | "about" | "skills" | "projects" | "contacts";

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  isScrolled?: boolean;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  isScrolled = false,
  theme = "dark",
  onToggleTheme,
}) => {
  const navItems: { id: SectionType; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contacts", label: "Contacts" },
  ];

  return (
    <nav
      aria-label="Portfolio Navigation"
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300 pointer-events-none ${
        isScrolled
          ? theme === "light"
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60 pointer-events-auto"
            : "bg-[#0E131F]/80 backdrop-blur-md border-b border-gray-800/60 pointer-events-auto"
          : "bg-transparent"
      }`}
    >
      {/* Spacer to center nav links on desktop */}
      <div className="hidden md:block w-11" aria-hidden="true" />

      {/* Navigation Links */}
      <ul
        className={`pointer-events-auto flex items-center gap-4 md:gap-10 font-medium text-sm md:text-base tracking-wide transition-colors ${
          theme === "light" ? "text-slate-700" : "text-gray-300"
        }`}
      >
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`cursor-pointer transition-colors duration-200 bg-transparent border-none p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded min-h-[44px] ${
                  isActive
                    ? theme === "light"
                      ? "text-amber-600 font-bold"
                      : "text-yellow-500 font-bold"
                    : theme === "light"
                    ? "hover:text-slate-950 text-slate-700"
                    : "hover:text-white text-gray-300"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Theme Toggle Button */}
      {onToggleTheme && (
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          className={`pointer-events-auto cursor-pointer transition-all duration-300 rounded-full min-h-[44px] min-w-[44px] p-2.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 border ${
            theme === "light"
              ? "bg-white/90 text-amber-600 border-slate-200 hover:bg-white hover:text-amber-700 shadow-sm"
              : "bg-slate-800/80 text-yellow-400 border-gray-700 hover:bg-slate-700/80 hover:text-yellow-300 shadow-inner"
          }`}
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "light" ? (
            <svg
              className="w-5 h-5 transition-transform duration-300 hover:-rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 transition-transform duration-300 hover:rotate-45"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
          )}
        </button>
      )}
    </nav>
  );
};
