"use client";

import React, { useRef, useState, useEffect } from "react";
import { TIMELINE, TimelineEntry } from "@/lib/data";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress through this section (from entering center to leaving center)
      const start = viewportHeight * 0.75;
      const totalDistance = rect.height;
      const current = start - rect.top;

      const progress = Math.min(Math.max(current / totalDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-[var(--section-pad)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1040px] mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            05 — Career &amp; Academic Timeline
          </div>
          <h2 className="section-heading rv" style={{ "--i": 1 } as React.CSSProperties}>
            One continuous <span className="heading-serif">path.</span>
          </h2>
        </div>

        {/* Timeline Container with Dynamic Spine */}
        <div className="relative pl-6 sm:pl-10">
          {/* Background Grey Spine */}
          <div
            className="absolute left-2 sm:left-4 top-2 bottom-8 w-[2px] bg-[rgba(13,13,13,0.1)] -translate-x-1/2"
            aria-hidden="true"
          />

          {/* Animated Solid Ink Spine Drawing on Scroll */}
          <div
            className="absolute left-2 sm:left-4 top-2 w-[2px] bg-[#0d0d0d] -translate-x-1/2 transition-[height] duration-150 ease-out pointer-events-none"
            style={{
              height: `${scrollProgress * 100}%`,
              maxHeight: "calc(100% - 32px)",
            }}
            aria-hidden="true"
          />

          {/* Timeline Stops */}
          <div className="space-y-12 sm:space-y-16">
            {TIMELINE.map((item, idx) => {
              const itemFraction = (idx + 0.3) / TIMELINE.length;
              const isReached = scrollProgress >= itemFraction;
              const isNextCard = item.type === "next";

              return (
                <div
                  key={item.id}
                  className="relative group transition-all duration-500"
                >
                  {/* Stop Dot Indicator */}
                  <div
                    className={`absolute -left-6 sm:-left-10 top-5 w-4 h-4 rounded-full -translate-x-1/2 border-2 transition-all duration-400 z-10 ${
                      isReached
                        ? "bg-[#0d0d0d] border-[#0d0d0d] ring-4 ring-[#0d0d0d]/10 scale-110"
                        : "bg-white border-[rgba(13,13,13,0.25)] scale-90"
                    }`}
                    aria-hidden="true"
                  />

                  {/* Timeline Card */}
                  {isNextCard ? (
                    // End stop: dashed card
                    <div
                      className={`p-8 sm:p-10 rounded-[28px] border-2 border-dashed transition-all duration-400 ${
                        isReached
                          ? "border-[#0d0d0d] bg-white shadow-md scale-[1.01]"
                          : "border-[rgba(13,13,13,0.2)] bg-white/40"
                      }`}
                    >
                      <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-2">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#77756f] mb-4">
                        {item.place} · {item.period}
                      </p>
                      <p className="text-sm text-[#3a3a3a] leading-relaxed mb-6 font-normal">
                        {item.bullets[0]}
                      </p>
                      <a href="#contact" className="btn-primary">
                        Start a conversation
                      </a>
                    </div>
                  ) : (
                    // Standard Timeline Stop Card
                    <div
                      className={`quiet-card p-6 sm:p-8 transition-all duration-400 ${
                        isReached
                          ? "bg-white border-[rgba(13,13,13,0.18)] shadow-lg"
                          : "bg-white/70 border-[rgba(13,13,13,0.08)]"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-[#f4f2ee] rounded-full text-[#0d0d0d]">
                          {item.year}
                        </span>
                        <span className="font-mono text-xs text-[#77756f]">
                          {item.period}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d]">
                        {item.title}
                      </h3>

                      <p className="text-sm font-medium text-[#77756f] mb-4 mt-0.5">
                        {item.place}
                      </p>

                      <ul className="space-y-2 text-xs sm:text-sm text-[#3a3a3a] leading-relaxed">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="font-mono text-[#0d0d0d] font-bold">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
