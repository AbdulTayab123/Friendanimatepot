"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_FAMILIES, Skill, SkillFamily } from "@/lib/data";
import { TechLogo, isBrand } from "@/components/ui/TechLogo";

export function SkillsSection() {
  const [activeFamily, setActiveFamily] = useState<SkillFamily>("All");
  const [inspectedSkill, setInspectedSkill] = useState<Skill>(SKILLS[0]);

  return (
    <section
      id="skills"
      className="relative w-full py-[var(--section-pad)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            02 — The periodic table of my stack
          </div>
          <h2 className="section-heading rv" style={{ "--i": 1 } as React.CSSProperties}>
            Technical elements,{" "}
            <span className="heading-serif">categorised.</span>
          </h2>
        </div>

        {/* Filter Chips */}
        <div
          className="flex flex-wrap items-center gap-2 mb-10 rv"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {SKILL_FAMILIES.map((family) => {
            const isActive = activeFamily === family;
            return (
              <button
                key={family}
                onClick={() => setActiveFamily(family)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#0d0d0d] text-[#f4f2ee] shadow-sm"
                    : "bg-white/60 text-[#77756f] border border-[rgba(13,13,13,0.08)] hover:border-[#0d0d0d] hover:text-[#0d0d0d]"
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Layout: Periodic Table Grid + Sticky Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Grid (8 columns desktop, 4 columns mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3">
            {SKILLS.map((skill, idx) => {
              const col = idx % 8;
              const row = Math.floor(idx / 8);
              const waveDelay = (col + row) * 40;
              const isDimmed = activeFamily !== "All" && skill.family !== activeFamily;
              const isSelected = inspectedSkill.name === skill.name;

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setInspectedSkill(skill)}
                  onFocus={() => setInspectedSkill(skill)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.name}, ${skill.family}`}
                  className={`quiet-card relative flex flex-col justify-between p-2.5 sm:p-3 aspect-square rounded-[18px] cursor-pointer transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0d0d0d] outline-none select-none ${
                    isDimmed
                      ? "opacity-25 grayscale scale-[0.96]"
                      : "opacity-100 scale-100 hover:scale-105"
                  } ${
                    isSelected
                      ? "ring-2 ring-[#0d0d0d] bg-white shadow-md z-10"
                      : "hover:bg-white"
                  }`}
                  style={{
                    animationDelay: `${waveDelay}ms`,
                  }}
                >
                  {/* Atomic Number + Category Dot */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] text-[#77756f]">
                      {skill.atomicNumber < 10 ? `0${skill.atomicNumber}` : skill.atomicNumber}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isBrand(skill.name) ? "bg-[#0d0d0d]" : "border border-[#77756f]"
                      }`}
                    />
                  </div>

                  {/* 2-Letter Symbol */}
                  <div className="text-center my-auto">
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0d0d0d]">
                      {skill.symbol}
                    </span>
                  </div>

                  {/* Element Name */}
                  <div className="text-center overflow-hidden">
                    <span className="block text-[10px] text-[#3a3a3a] font-medium truncate">
                      {skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <aside className="lg:sticky lg:top-28 quiet-card p-6 sm:p-8 flex flex-col items-center text-center w-full">
            <span className="font-mono text-[10px] tracking-widest text-[#77756f] uppercase mb-4 self-start">
              ELEMENT INSPECTOR
            </span>

            {/* 150px Brand Logo with Pop Animation */}
            <div className="relative w-[150px] h-[150px] flex items-center justify-center my-4">
              <div
                key={inspectedSkill.name}
                className="animate-pop transition-all duration-400 flex items-center justify-center"
              >
                <TechLogo
                  name={inspectedSkill.name}
                  conceptIcon={inspectedSkill.conceptIcon}
                  size={120}
                  showGlow={true}
                />
              </div>
            </div>

            {/* Title & Metadata */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] mt-2 mb-1">
              {inspectedSkill.name}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
                {inspectedSkill.family}
              </span>
              <span className="text-[#a9a6a0]">·</span>
              <span className="font-mono text-xs font-semibold text-[#0d0d0d]">
                Symbol: {inspectedSkill.symbol}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#3a3a3a] leading-relaxed mb-6 font-normal">
              {inspectedSkill.description}
            </p>

            {/* Projects Using This Skill */}
            <div className="w-full text-left border-t border-[rgba(13,13,13,0.08)] pt-4 mt-auto">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#77756f] mb-2">
                Applied In Projects
              </span>
              <div className="flex flex-wrap gap-1.5">
                {inspectedSkill.projects.map((proj) => (
                  <span
                    key={proj}
                    className="inline-block px-2.5 py-1 bg-[#e9e6e0] text-[#0d0d0d] font-mono text-[10px] rounded-md"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          70% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-pop {
          animation: pop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
