"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export function AboutSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  // Pendulum physics state
  const physicsRef = useRef({
    angle: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    isInteracting: false,
  });

  useEffect(() => {
    // Check reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let rafId: number;
    let startTime = performance.now();

    const loop = (currentTime: number) => {
      const p = physicsRef.current;
      const dt = Math.min((currentTime - (p.lastTime || currentTime)) / 1000, 0.1);
      p.lastTime = currentTime;

      if (!p.isInteracting) {
        // Idle sway + spring damping
        const springK = 18;
        const damping = 4.5;
        const idleSway = Math.sin((currentTime - startTime) * 0.002) * 1.8;

        const force = -springK * (p.angle - idleSway);
        p.velocity += force * dt;
        p.velocity *= Math.exp(-damping * dt);
        p.angle += p.velocity * dt;
      } else {
        // Damping when dragging/moving
        p.velocity *= 0.92;
        p.angle += p.velocity * dt;
      }

      setAngle(p.angle);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    const onPointerMove = (e: PointerEvent) => {
      const p = physicsRef.current;
      if (p.lastX !== 0) {
        const dx = e.clientX - p.lastX;
        // Inject velocity proportional to pointer movement
        p.velocity += dx * 0.18;
        // Limit max velocity
        p.velocity = Math.max(Math.min(p.velocity, 45), -45);
      }
      p.lastX = e.clientX;
    };

    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section
      id="about"
      className="relative w-full py-[var(--section-pad)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Tag & Heading */}
        <div className="mb-14">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            01 — About
          </div>
          <h2 className="section-heading rv" style={{ "--i": 1 } as React.CSSProperties}>
            Full stack craftsmanship,{" "}
            <span className="heading-serif">personified.</span>
          </h2>
        </div>

        {/* 3-Column Grid: Left, Centre (ID Card), Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-10 items-stretch">
          
          {/* Left Column: Summary & Links */}
          <div
            className="quiet-card p-8 sm:p-10 flex flex-col justify-between rv"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <div>
              <p className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-3">
                Bio & Background
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-6">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#3a3a3a] mb-6 font-normal">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-[#77756f] border-l-2 border-[#0d0d0d] pl-4">
                {PROFILE.additionalSummary}
              </p>
            </div>

            {/* Action buttons: Only links that exist in résumé */}
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-[rgba(13,13,13,0.08)] mt-8">
              <a
                href={PROFILE.resumePath}
                download="Ameema_Waheed_Resume.pdf"
                className="btn-primary"
              >
                <span>Download Résumé</span>
                <span className="font-mono text-xs">↓</span>
              </a>
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <span className="w-4 h-4 inline-block">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                  <span className="font-mono text-xs">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div
            className="flex flex-col items-center justify-start relative rv py-2"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {/* Lanyard Strap & Clip */}
            <div className="flex flex-col items-center z-20 pointer-events-none select-none">
              {/* Strap: 30x56 px with scrolling text */}
              <div className="w-[30px] h-[56px] bg-[#1a1a1a] rounded-t-sm shadow-md overflow-hidden flex flex-col justify-center items-center relative border border-[rgba(255,255,255,0.15)]">
                <div className="absolute inset-0 flex flex-col items-center justify-around py-1 animate-marquee-vertical">
                  <span className="font-mono text-[7px] text-[#e9e6e0] uppercase tracking-tighter rotate-90 whitespace-nowrap">
                    AMEEMA
                  </span>
                  <span className="font-mono text-[7px] text-[#a9a6a0] uppercase tracking-tighter rotate-90 whitespace-nowrap">
                    DEV
                  </span>
                </div>
              </div>
              {/* Metallic Ring & Clip */}
              <div className="w-5 h-3 bg-gradient-to-b from-[#d1d5db] to-[#6b7280] rounded-sm shadow-sm" />
              <div className="w-3 h-5 bg-gradient-to-r from-[#9ca3af] via-[#f3f4f6] to-[#9ca3af] rounded-b-md shadow-md" />
            </div>

            {/* Damped Pendulum Anchor */}
            <div
              ref={lanyardRef}
              className="relative w-[300px] h-[404px] cursor-pointer"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "top center",
                perspective: "1000px",
                transition: "transform 0.05s linear",
              }}
              tabIndex={0}
              role="button"
              aria-label="Developer ID badge. Click or press Enter to flip."
              onClick={() => setIsFlipped(!isFlipped)}
              onKeyDown={handleCardKeyDown}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
            >
              {/* Flipping Card Container */}
              <div
                className="w-full h-full relative duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* --- FRONT OF CARD --- */}
                <div
                  className="absolute inset-0 bg-white rounded-[24px] border border-[rgba(13,13,13,0.12)] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.12)] p-5 flex flex-col justify-between overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Top Black Header Band */}
                  <div className="-mx-5 -mt-5 bg-[#0d0d0d] text-[#f4f2ee] px-5 py-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest font-semibold uppercase text-white">
                      DEVELOPER ID
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Highlighted Portrait Photo */}
                  <div className="flex flex-col items-center mt-3">
                    <div className="relative w-[128px] h-[156px] rounded-[16px] overflow-hidden p-1 bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] shadow-md group">
                      <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-white">
                        <Image
                          src="/portrait-bust.webp"
                          alt="Ameema Waheed portrait"
                          fill
                          sizes="128px"
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                          priority
                        />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-[#0d0d0d] tracking-tight mt-2.5">
                      {PROFILE.name}
                    </h4>
                    <p className="font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
                      {PROFILE.role}
                    </p>
                  </div>

                  {/* ID Details Table */}
                  <div className="space-y-1.5 font-mono text-[10px] border-t border-b border-[rgba(13,13,13,0.08)] py-2 my-1">
                    <div className="flex justify-between">
                      <span className="text-[#77756f]">ID NO:</span>
                      <span className="font-semibold text-[#0d0d0d]">{PROFILE.idCard.idNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77756f]">DEPT:</span>
                      <span className="font-semibold text-[#0d0d0d]">{PROFILE.idCard.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77756f]">VALID TILL:</span>
                      <span className="font-semibold text-[#0d0d0d]">{PROFILE.idCard.validTill}</span>
                    </div>
                  </div>

                  {/* Barcode & Hologram Footer */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Simulated grayscale barcode */}
                    <div className="flex gap-[2px] items-end h-6 opacity-75">
                      {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3].map((w, i) => (
                        <div
                          key={i}
                          className="bg-[#0d0d0d]"
                          style={{ width: `${w}px`, height: `${16 + (i % 3) * 3}px` }}
                        />
                      ))}
                    </div>
                    {/* Holographic sticker simulation (in calm grays) */}
                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.2)] bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-300 flex items-center justify-center shadow-inner">
                      <span className="font-mono text-[8px] font-bold text-[#3a3a3a]">
                        SECURE
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- BACK OF CARD --- */}
                <div
                  className="absolute inset-0 bg-[#0d0d0d] text-[#f4f2ee] rounded-[24px] border border-[#262626] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#262626] pb-3 mb-4">
                      <span className="font-mono text-[10px] tracking-widest text-[#a9a6a0] uppercase">
                        CREDENTIAL DOSSIER
                      </span>
                      <span className="font-mono text-[10px] text-[#77756f]">VERIFIED</span>
                    </div>

                    <h4 className="font-serif italic text-xl text-white mb-3">
                      What I am:
                    </h4>

                    <div className="space-y-2.5 text-xs text-[#e5e7eb] font-normal leading-relaxed">
                      <p>
                        <strong className="text-white font-medium">Role:</strong> {PROFILE.role}
                      </p>
                      <p>
                        <strong className="text-white font-medium">Degree:</strong> {PROFILE.idCard.degree}
                      </p>
                      <p>
                        <strong className="text-white font-medium">Key Focus:</strong> {PROFILE.idCard.keyFocus}
                      </p>
                      <p>
                        <strong className="text-white font-medium">Key Projects:</strong> {PROFILE.idCard.keyProjects}
                      </p>
                      <p>
                        <strong className="text-white font-medium">Honours:</strong> {PROFILE.idCard.honours}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#262626] pt-3">
                    <p className="font-serif italic text-sm text-[#d1d5db] mb-1">
                      {PROFILE.name}
                    </p>
                    <p className="font-mono text-[9px] text-[#77756f] uppercase tracking-wider">
                      If found, say hello · {PROFILE.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-mono text-[11px] text-[#77756f] mt-4 select-none">
              Hover or click badge to flip
            </p>
          </div>

          {/* Right Column: Quick Facts & Quoted Word */}
          <div
            className="quiet-card p-8 sm:p-10 flex flex-col justify-between rv"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <div>
              <p className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-6">
                Quick Facts
              </p>

              <div className="space-y-5 text-sm">
                <div className="border-b border-[rgba(13,13,13,0.08)] pb-3">
                  <span className="block font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
                    Location
                  </span>
                  <span className="font-medium text-[#0d0d0d]">{PROFILE.location}</span>
                </div>

                <div className="border-b border-[rgba(13,13,13,0.08)] pb-3">
                  <span className="block font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
                    Education
                  </span>
                  <span className="font-medium text-[#0d0d0d]">
                    BS, Computer Science — Jinnah University for Women
                  </span>
                </div>

                <div className="border-b border-[rgba(13,13,13,0.08)] pb-3">
                  <span className="block font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
                    Current Engagement
                  </span>
                  <span className="font-medium text-[#0d0d0d]">
                    Admin Lead, DevQuest PK / Frontend Dev, Internee.pk
                  </span>
                </div>

                <div className="border-b border-[rgba(13,13,13,0.08)] pb-3">
                  <span className="block font-mono text-[11px] text-[#77756f] uppercase tracking-wider">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-medium text-[#0d0d0d] underline hover:text-[#77756f]"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quoted philosophy from résumé */}
            <blockquote className="border-l-2 border-[#0d0d0d] pl-4 italic text-sm text-[#3a3a3a] mt-8 font-serif leading-relaxed">
              &ldquo;{PROFILE.quote}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
