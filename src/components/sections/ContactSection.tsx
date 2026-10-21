"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useSmoothScroll } from "@/lib/scroll";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();
  
  // Yahan aapki nayi email add kar di gayi hai
  const NEW_EMAIL = "ameemawaheed89@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(NEW_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section
      id="contact"
      className="relative w-full pt-[var(--section-pad)] pb-12 px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee] overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Tag */}
        <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
          07 — Get in touch
        </div>

        {/* Huge Hopping Heading */}
        <div className="my-8 sm:my-12">
          <h2 className="text-[clamp(2.5rem,7.5vw,7rem)] font-bold tracking-tight text-[#0d0d0d] leading-[1.02]">
            <div className="block">
              {line1.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 ease-out hover:-translate-y-4 hover:text-[#77756f] cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="block">
              {line2.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 ease-out hover:-translate-y-4 hover:text-[#77756f] cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Contact Links & Circular Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center my-12 pt-6 border-t border-[rgba(13,13,13,0.08)]">
          <div className="space-y-8">
            {/* Direct Email with Copy Chip */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-2">
                Direct Email
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${NEW_EMAIL}`}
                  className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0d0d] underline decoration-[rgba(13,13,13,0.3)] hover:decoration-[#0d0d0d] transition-all break-all"
                >
                  {NEW_EMAIL}
                </a>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-full border border-[rgba(13,13,13,0.15)] bg-white text-xs font-mono font-medium text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f4f2ee] transition-all active:scale-95 shadow-sm"
                  aria-live="polite"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>

            {/* Direct Phone & Social Links (Only from résumé) */}
            <div className="flex flex-wrap items-center gap-8 text-sm sm:text-base">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] block mb-1">
                  Phone
                </span>
                <a
                  href={PROFILE.phoneHref}
                  className="font-medium text-[#0d0d0d] hover:underline"
                >
                  {PROFILE.phone}
                </a>
              </div>

              {PROFILE.linkedin && (
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] block mb-1">
                    LinkedIn
                  </span>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#0d0d0d] hover:underline flex items-center gap-1"
                  >
                    <span>ameema-waheed</span>
                    <span className="font-mono text-xs">↗</span>
                  </a>
                </div>
              )}

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] block mb-1">
                  Location
                </span>
                <span className="text-[#3a3a3a]">{PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Circular Spinning "Say Hello" Badge */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center shrink-0 mx-auto lg:mx-0">
            <svg
              className="w-full h-full animate-spin-slow select-none pointer-events-none"
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                />
              </defs>
              <text className="font-mono text-[10px] tracking-[0.22em] uppercase fill-[#0d0d0d]">
                <textPath href="#circlePath" startOffset="0%">
                  SAY HELLO · GET IN TOUCH · LET&apos;S BUILD ·{" "}
                </textPath>
              </text>
            </svg>

            {/* Center Arrow / Initial */}
            <div className="absolute w-12 h-12 rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center font-mono text-sm font-bold shadow-md">
              ↓
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-16 mt-16 border-t border-[rgba(13,13,13,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js</span>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero", { immediate: false });
              }}
              className="text-[#0d0d0d] underline hover:text-[#77756f]"
            >
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}