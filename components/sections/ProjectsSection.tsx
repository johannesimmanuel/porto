"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SocialIconsRow } from "@/components/SocialBar";
import { ProjectModal } from "@/components/ProjectModal";
import { portfolioData, Project } from "@/data/portfolio";
import { getTechIcon } from "@/components/TechIcons";

interface ProjectsSectionProps {
  onNavigateNext: () => void;
  onScroll?: (isScrolled: boolean) => void;
  theme?: "dark" | "light";
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onNavigateNext,
  onScroll,
  theme = "dark",
}) => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    null
  );

  return (
    <>
      <section
        className="h-full w-full overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500 custom-scrollbar"
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop;
          onScroll?.(scrollTop > 10);
        }}
      >
        <div className="min-h-full flex flex-col items-center px-6 pt-24 pb-10">
          <div className="w-full max-w-6xl flex flex-col items-center">
            <div className="text-center mb-10">
              <h2
                className={`text-3xl md:text-5xl font-bold tracking-tight z-20 transition-colors ${
                  theme === "light" ? "text-slate-900" : "text-gray-200"
                }`}
              >
                Works & Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className={`group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 z-20 border ${
                    theme === "light"
                      ? "bg-white/90 border-slate-200 hover:shadow-xl hover:border-amber-400"
                      : "bg-[#161b22] border-gray-700 hover:shadow-yellow-500/20"
                  }`}
                >
                  {/* Card Header */}
                  <div
                    className={`flex justify-between items-center p-4 border-b transition-colors ${
                      theme === "light"
                        ? "bg-slate-50/95 border-slate-200 text-slate-800"
                        : "bg-[#0d1117] border-gray-700 text-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold transition-colors ${
                        theme === "light"
                          ? "text-slate-900 group-hover:text-amber-600"
                          : "text-gray-200 group-hover:text-yellow-500"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <div className="flex gap-3 text-xl">
                      {project.techs.map((tech, idx) => {
                        const iconColor =
                          tech.name === "Next.js"
                            ? theme === "light"
                              ? "text-slate-950"
                              : "text-white"
                            : tech.color;

                        return (
                          <span key={idx} title={tech.name}>
                            {getTechIcon(tech.iconType, `w-5 h-5 ${iconColor}`)}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Image with Hover/Focus Overlay */}
                  <div
                    className="relative h-48 w-full overflow-hidden bg-zinc-950 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className={`px-6 py-2 text-sm font-semibold rounded-full border transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 min-h-[44px] ${
                          theme === "light"
                            ? "bg-white text-slate-900 border-white hover:bg-amber-500 hover:text-black hover:border-amber-500 shadow-md"
                            : "bg-[#1F2937] text-white border-gray-500 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
                        }`}
                      >
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Next Trigger and Socials */}
          <div className="flex flex-col items-center gap-6 w-full mt-auto pt-20">
            <button
              type="button"
              onClick={onNavigateNext}
              className={`group flex items-center gap-2 text-sm transition-all duration-300 bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded px-2 py-1 min-h-[44px] ${
                theme === "light"
                  ? "text-slate-700 hover:text-slate-950 font-semibold"
                  : "text-gray-400 hover:text-white font-medium"
              }`}
            >
              <span>Contacts</span>
              <span
                className={`${
                  theme === "light" ? "text-amber-600" : "text-yellow-500"
                } group-hover:translate-x-1 transition-transform duration-300 text-lg`}
              >
                &rarr;
              </span>
            </button>
            <SocialIconsRow theme={theme} />
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        theme={theme}
      />
    </>
  );
};
