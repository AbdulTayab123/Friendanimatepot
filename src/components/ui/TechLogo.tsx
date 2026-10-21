import React from "react";
import Image from "next/image";

export const BRAND_MAP: Record<string, { logo: string; glow: string }> = {
  javascript: { logo: "/logos/javascript.svg", glow: "rgba(247, 223, 30, 0.25)" },
  react: { logo: "/logos/react.svg", glow: "rgba(97, 218, 251, 0.25)" },
  python: { logo: "/logos/python.svg", glow: "rgba(56, 126, 184, 0.25)" },
  html5: { logo: "/logos/html5.svg", glow: "rgba(227, 79, 38, 0.25)" },
  css3: { logo: "/logos/css3.svg", glow: "rgba(21, 114, 182, 0.25)" },
  bootstrap: { logo: "/logos/bootstrap.svg", glow: "rgba(121, 82, 179, 0.25)" },
  jquery: { logo: "/logos/jquery.svg", glow: "rgba(7, 105, 173, 0.25)" },
  photoshop: { logo: "/logos/photoshop.svg", glow: "rgba(49, 168, 255, 0.25)" },
  illustrator: { logo: "/logos/illustrator.svg", glow: "rgba(255, 154, 0, 0.25)" },
  linkedin: { logo: "/logos/linkedin.svg", glow: "rgba(10, 102, 194, 0.25)" },
  google: { logo: "/logos/google.svg", glow: "rgba(66, 133, 244, 0.25)" },
  tedx: { logo: "/logos/tedx.svg", glow: "rgba(230, 43, 30, 0.25)" },
  devquest: { logo: "/logos/devquest.svg", glow: "rgba(96, 165, 250, 0.25)" },
  khinext: { logo: "/logos/khinext.svg", glow: "rgba(34, 197, 94, 0.25)" },
  icydd: { logo: "/logos/icydd.svg", glow: "rgba(56, 189, 248, 0.25)" },
};

export const CONCEPT_MAP: Record<string, React.ReactNode> = {
  layout: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  cube: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  api: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4" />
    </svg>
  ),
  database: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  sparkles: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.9 4.8L18 9.7l-3.9 3.5.9 5.3L12 16.2 9 18.5l.9-5.3L6 9.7l4.1-1.9L12 3z" />
    </svg>
  ),
  bug: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="8" width="12" height="12" rx="6" />
      <path d="M12 4v4M4 11h4M16 11h4M4 16h4M16 16h4" />
    </svg>
  ),
  gauge: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 14l3-3M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  ),
  "git-branch": (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  "pen-tool": (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  users: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  calendar: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "message-square": (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

export function isBrand(name: string): boolean {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return key in BRAND_MAP;
}

interface TechLogoProps {
  name: string;
  conceptIcon?: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export function TechLogo({
  name,
  conceptIcon,
  size = 40,
  className = "",
  showGlow = false,
}: TechLogoProps) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const brand = BRAND_MAP[key];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-500"
            style={{ backgroundColor: brand.glow, transform: "scale(1.4)" }}
          />
        )}
        <Image
          src={brand.logo}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
    );
  }

  const iconKey = conceptIcon || "cube";
  const icon = CONCEPT_MAP[iconKey] || CONCEPT_MAP["cube"];

  return (
    <div
      className={`inline-flex items-center justify-center text-[#3a3a3a] shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title={name}
    >
      {icon}
    </div>
  );
}
