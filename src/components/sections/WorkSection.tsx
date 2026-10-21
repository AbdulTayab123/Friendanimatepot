"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

export function WorkSection() {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      className="relative w-full py-[var(--section-pad)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            03 — Selected work
          </div>
          <h2 className="section-heading rv" style={{ "--i": 1 } as React.CSSProperties}>
            Things I&apos;ve <span className="heading-serif">built.</span>
          </h2>
        </div>

        {/* Desktop Expanding Horizontal Accordion */}
        <div className="hidden lg:flex w-full h-[min(78svh,620px)] gap-3 items-stretch">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                onClick={() => setActiveProjectId(project.id)}
                tabIndex={0}
                role="region"
                aria-expanded={isOpen}
                aria-label={project.title}
                className={`quiet-card relative overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(.16,1,.3,1)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                  isOpen ? "flex-[8] bg-white cursor-default" : "flex-[1] bg-white/70 hover:bg-white"
                }`}
              >
                {/* Collapsed Spine View */}
                {!isOpen && (
                  <div className="w-full h-full flex flex-col items-center justify-between py-8 px-2 select-none">
                    <span className="font-mono text-xs font-semibold text-[#77756f]">
                      {project.index}
                    </span>

                    <div className="writing-vertical rotate-180 text-sm font-semibold tracking-tight text-[#0d0d0d] whitespace-nowrap">
                      {project.title}
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-[#0d0d0d] transition-transform duration-300 group-hover:rotate-45">
                      <span className="font-mono text-sm leading-none">+</span>
                    </div>
                  </div>
                )}

                {/* Expanded Panel View */}
                {isOpen && (
                  <div className="w-full h-full p-6 lg:p-8 xl:p-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-stretch animate-fade-in">
                    
                    {/* Left: Project Details */}
                    <div className="flex flex-col justify-between h-full py-2 overflow-y-auto hide-scrollbar">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs text-[#77756f]">
                            {project.index}
                          </span>
                          <span className="text-[#a9a6a0]">/</span>
                          <span className="font-mono text-xs uppercase tracking-wider text-[#77756f]">
                            {project.kicker}
                          </span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                          {project.title}
                        </h3>

                        <p className="text-sm xl:text-base text-[#3a3a3a] leading-relaxed mb-6 font-normal">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {project.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-[#3a3a3a] font-normal"
                            >
                              <span className="font-mono text-[#0d0d0d] font-bold">›</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Chips */}
                      <div className="mt-auto pt-4">
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[#77756f] mb-2">
                          Technologies Used
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <div
                              key={t}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4f2ee] rounded-full text-xs font-medium text-[#0d0d0d] border border-[rgba(13,13,13,0.06)]"
                            >
                              <TechLogo name={t} size={14} />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: ACTUAL PROJECT IMAGE (Side by Side) */}
                    <div className="relative w-full h-full min-h-[250px] rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.1)] overflow-hidden shadow-sm flex flex-col">
                      
                      {/* Browser Header Bar */}
                      <div className="flex items-center px-4 py-3 bg-[#e8e6e1] border-b border-[rgba(13,13,13,0.08)] z-10 shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#a9a6a0]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#d1d5db]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#e5e7eb]" />
                        </div>
                        <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-[#77756f]">
                          {project.title} Preview
                        </span>
                      </div>
                      
                      {/* Image Container */}
                      <div className="relative flex-1 w-full bg-gray-200">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion (visible on < lg screens) */}
        <div className="lg:hidden flex flex-col gap-4">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                className="quiet-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveProjectId(isOpen ? "" : project.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#77756f]">
                      {project.index}
                    </span>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[#77756f]">
                        {project.kicker}
                      </span>
                      <h3 className="text-xl font-bold text-[#0d0d0d]">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-lg transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[rgba(13,13,13,0.06)]">
                    <p className="text-sm text-[#3a3a3a] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {project.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#77756f]">
                          <span className="font-mono font-bold text-[#0d0d0d]">›</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-[#f4f2ee] rounded-md font-mono text-[11px] text-[#0d0d0d]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Image */}
                    <div className="w-full pt-2">
                      <div className="relative w-full aspect-video rounded-xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.1)] overflow-hidden shadow-sm">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}