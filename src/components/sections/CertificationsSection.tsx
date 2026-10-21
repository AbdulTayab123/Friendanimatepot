"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative w-full py-[var(--section-pad)] px-[var(--gutter)] bg-white border-y border-[rgba(13,13,13,0.1)]"
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
        {/* Left: Sticky Heading & Count Line */}
        <div className="lg:sticky lg:top-32">
          <div className="section-tag rv" style={{ "--i": 0 } as React.CSSProperties}>
            04 — Certifications &amp; Credentials
          </div>
          <h2 className="section-heading rv mb-4" style={{ "--i": 1 } as React.CSSProperties}>
            Always <span className="heading-serif">learning.</span>
          </h2>
          <p
            className="font-mono text-xs text-[#77756f] uppercase tracking-wider rv"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {CERTIFICATIONS.length} verified technical credentials
          </p>
        </div>

        {/* Right: Ink-Flood Numbered Rows */}
        <div className="flex flex-col border-t border-[rgba(13,13,13,0.1)] divide-y divide-[rgba(13,13,13,0.1)]">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={cert.id}
              tabIndex={0}
              role="article"
              aria-label={`${cert.title} issued by ${cert.issuer}`}
              className="cert-row group relative py-6 px-4 sm:px-6 cursor-pointer overflow-hidden transition-colors duration-400 outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rv"
              style={{ "--i": idx + 3 } as React.CSSProperties}
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="font-mono text-xs sm:text-sm text-[#77756f] group-hover:text-[#a9a6a0] transition-colors duration-300">
                    {cert.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-white transition-colors duration-300 truncate">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-[#77756f] group-hover:text-[#e5e7eb] transition-colors duration-300 mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Arrow that slides in */}
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[rgba(13,13,13,0.12)] group-hover:border-white/30 text-[#0d0d0d] group-hover:text-white transition-all duration-300 translate-x-[-6px] opacity-60 group-hover:translate-x-0 group-hover:opacity-100">
                  <span className="font-mono text-sm leading-none">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cert-row::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .cert-row:hover::before,
        .cert-row:focus-visible::before {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
}
