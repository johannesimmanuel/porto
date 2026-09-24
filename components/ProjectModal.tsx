"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Project } from "@/data/portfolio";
import { getTechIcon } from "./TechIcons";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  theme?: "dark" | "light";
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  theme = "dark",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 transition-colors ${
          theme === "light"
            ? "bg-white border border-slate-200 text-slate-800"
            : "bg-[#2a3241] border border-slate-700/60 text-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 pb-4 relative">
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-6 right-6 p-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              theme === "light"
                ? "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                : "text-gray-400 hover:text-white hover:bg-slate-700/50"
            }`}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <h2
            id="modal-project-title"
            className={`text-2xl md:text-3xl font-bold tracking-tight pr-10 transition-colors ${
              theme === "light" ? "text-slate-950" : "text-white"
            }`}
          >
            {project.title}
          </h2>
          {project.subtitle && (
            <p
              className={`text-base md:text-lg font-medium mt-1 transition-colors ${
                theme === "light" ? "text-slate-600" : "text-gray-300"
              }`}
            >
              {project.subtitle}
            </p>
          )}
          <hr
            className={`mt-4 ${
              theme === "light" ? "border-slate-200" : "border-slate-600/70"
            }`}
          />
        </div>

        <div className="px-6 md:px-8 pb-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {project.techs && project.techs.length > 0 && (
            <div className="flex items-center gap-3">
              <span
                className={`text-xs uppercase tracking-wider font-semibold ${
                  theme === "light" ? "text-slate-500" : "text-gray-400"
                }`}
              >
                Tech Stack:
              </span>
              <div className="flex items-center gap-2">
                {project.techs.map((tech, idx) => {
                  const iconColor =
                    tech.name === "Next.js"
                      ? theme === "light"
                        ? "text-slate-950"
                        : "text-white"
                      : tech.color;

                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg flex items-center justify-center ${
                        theme === "light"
                          ? "bg-slate-100 border border-slate-200"
                          : "bg-[#1e2533] border border-slate-700"
                      }`}
                      title={tech.name}
                    >
                      {getTechIcon(tech.iconType, `text-xl ${iconColor} w-5 h-5`)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {project.details && project.details.length > 0 && (
            <ul
              className={`list-disc pl-5 space-y-3 leading-relaxed font-normal text-sm md:text-base ${
                theme === "light" ? "text-slate-700" : "text-gray-200"
              }`}
            >
              {project.details.map((detail, idx) => (
                <li key={idx} className="pl-1">
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
