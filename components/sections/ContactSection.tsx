"use client";

import React, { useState } from "react";
import { SocialIconsRow } from "@/components/SocialBar";
import { portfolioData } from "@/data/portfolio";

interface ContactSectionProps {
  theme?: "dark" | "light";
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  theme = "dark",
}) => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="h-full w-full relative flex flex-col justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-500 px-6 z-20">
      <div className="flex flex-col items-center gap-6 md:gap-8 -mt-12 text-center">
        <h2
          className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight transition-colors ${
            theme === "light" ? "text-slate-900" : "text-gray-200"
          }`}
        >
          Hit me up, let&apos;s work together!
        </h2>

        <button
          type="button"
          onClick={handleCopyEmail}
          className={`group flex flex-col md:flex-row items-center gap-3 text-lg md:text-2xl font-semibold transition-all duration-300 bg-transparent border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-xl p-3 min-h-[44px] ${
            theme === "light" ? "hover:bg-white/50" : "hover:bg-slate-800/30"
          }`}
          aria-label="Copy email address to clipboard"
        >
          <div className="relative flex items-center justify-center w-12 h-12">
            {copied ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                className="text-emerald-500 text-4xl md:text-5xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                className={`${
                  theme === "light" ? "text-amber-500" : "text-yellow-500"
                } text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
              </svg>
            )}
          </div>
          <span
            className={`${
              copied
                ? "text-emerald-500 font-bold"
                : theme === "light"
                ? "text-slate-800 group-hover:text-amber-600"
                : "text-gray-300 group-hover:text-white"
            } transition-colors duration-300`}
          >
            {copied ? "Email Copied to Clipboard!" : personal.email}
          </span>
        </button>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-6 w-full">
        <SocialIconsRow theme={theme} />
      </div>
    </section>
  );
};
