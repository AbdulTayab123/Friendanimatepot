"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ACHIEVEMENTS, Achievement } from "@/lib/data";

export function AchievementsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [hasStartedCount, setHasStartedCount] = useState(false);

  // Trigger count-up when section intersects viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStartedCount(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Infinite loop ke liye data ko duplicate kar rahe hain
  const duplicatedAchievements = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative w-full py-[var(--section-pad)] overflow-hidden bg-[#f4f2ee] border-t border-[rgba(13,13,13,0.08)]"
    >
      {/* Header Container */}
      <div className="max-w-[1320px] w-full mx-auto px-[clamp(18px,4vw,64px)] mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="section-tag mb-1">
              06 — Achievements &amp; Impact
            </div>
            <h2 className="section-heading text-[clamp(2rem,4.5vw,3.5rem)]">
              Recognised <span className="heading-serif">impact.</span>
            </h2>
          </div>

          {/* Index Counter (Optional, abhi static hai) */}
          <div className="font-mono text-xs text-[#77756f]">
            <span className="text-[#0d0d0d] font-bold">06</span> / 06
          </div>
        </div>

        {/* Thin Divider */}
        <div className="w-full h-[1.5px] bg-[rgba(13,13,13,0.1)] rounded-full" />
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full">
        {/* Fade Gradients (Left & Right for premium look) */}
        <div className="absolute left-0 top-0 bottom-0 w-[10%] md:w-[15%] bg-gradient-to-r from-[#f4f2ee] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[10%] md:w-[15%] bg-gradient-to-l from-[#f4f2ee] to-transparent z-10 pointer-events-none" />

        {/* The Moving Track */}
        <div className="flex w-max animate-marquee hover:pause-animation py-8">
          
          {/* Hum items ko 2 groups mein divide kar rahe hain taake loop perfect rahe */}
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
            {ACHIEVEMENTS.map((item) => (
              <CardItem key={`group1-${item.id}`} item={item} start={hasStartedCount} />
            ))}
          </div>
          
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
            {ACHIEVEMENTS.map((item) => (
              <CardItem key={`group2-${item.id}`} item={item} start={hasStartedCount} />
            ))}
          </div>

        </div>
      </div>

      {/* Footer Hint */}
      <div className="max-w-[1320px] w-full mx-auto px-[clamp(18px,4vw,64px)] mt-8 flex items-center justify-between text-[11px] font-mono text-[#77756f]">
        <span>Continuous motion (Hover to pause)</span>
        <span>Only verified metrics from résumé</span>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            /* 
              Kyunke items duplicate hain, hum exactly aadha (50%) move karte hain.
              Isse ek perfect seamless infinite loop banta hai.
            */
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Separate Card Component
function CardItem({ item, start }: { item: Achievement; start: boolean }) {
  return (
    <div
      className="achievement-card quiet-card shrink-0 flex flex-col justify-between p-6 sm:p-8 rounded-[28px] bg-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]"
      style={{
        width: "clamp(320px, 35vw, 480px)", // Responsive width
        height: "clamp(260px, 36vh, 310px)",
      }}
    >
      {/* Top Row: Logo Tile + Index */}
      <div className="flex items-center justify-between">
        <div className="relative w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] p-3 flex items-center justify-center overflow-visible">
          {/* Brand Glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-xl pointer-events-none opacity-50"
            style={{
              backgroundColor: item.brandColor,
              transform: "scale(1.3)",
            }}
          />
          <Image
            src={item.logo}
            alt={`${item.platform} logo`}
            width={48}
            height={48}
            className="relative z-10 w-full h-full object-contain"
          />
        </div>

        <span className="font-mono text-xs text-[#77756f]">{item.index}</span>
      </div>

      {/* Bottom Row: Left Info & Right Count-up Number */}
      <div className="flex items-end justify-between gap-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
        <div className="min-w-0 pr-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#77756f] block">
            {item.caption}
          </span>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0d0d0d] truncate">
            {item.label}
          </h3>
          <p className="text-xs text-[#3a3a3a] mt-1 line-clamp-2">
            {item.detail}
          </p>
        </div>

        {/* Big Count-up Number */}
        <div className="shrink-0 text-right">
          <CountUpMetric
            targetNumber={item.metricNumber}
            prefix={item.metricPrefix}
            suffix={item.metricSuffix}
            start={start}
          />
        </div>
      </div>
    </div>
  );
}

// Count-up helper component
function CountUpMetric({
  targetNumber,
  prefix = "",
  suffix = "",
  start,
}: {
  targetNumber: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setCurrent(targetNumber);
      return;
    }

    let startTime: number | null = null;
    const duration = 1400; // 1.4s

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setCurrent(Math.round(eased * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, targetNumber]);

  return (
    <div className="font-extrabold text-3xl sm:text-4xl text-[#0d0d0d] tracking-tighter">
      {prefix}
      {current}
      <span className="text-xl sm:text-2xl font-bold ml-0.5">{suffix}</span>
    </div>
  );
}