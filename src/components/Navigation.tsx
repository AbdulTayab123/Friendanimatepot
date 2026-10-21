"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useSmoothScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const { scrollTo } = useSmoothScroll();
  const navPillRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Scroll threshold for initials fill and name fade
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update sliding indicator pill position
  useEffect(() => {
    if (!navPillRef.current) return;
    const activeEl = navPillRef.current.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement;

    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Handle escape key and body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
    }
    scrollTo(href, { offset: -32 });
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] z-50 pointer-events-none transition-[width] duration-75 ease-linear"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 w-full z-40 px-[clamp(18px,4vw,64px)] pt-5 pb-3 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Initials mark + Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-full p-1"
            aria-label={`${PROFILE.name} - Back to top`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[#0d0d0d] text-[#f4f2ee] border border-[#0d0d0d]"
                  : "bg-transparent text-[#0d0d0d] border border-[#0d0d0d]"
              }`}
            >
              AW
            </div>
            <span
              className={`font-semibold tracking-tight text-sm text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          {/* Desktop Nav Pill */}
          <nav
            ref={navPillRef}
            aria-label="Primary"
            className={`hidden md:flex items-center relative p-1.5 rounded-full border transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
              scrolled
                ? "bg-white/80 backdrop-blur-md border-[rgba(13,13,13,0.08)] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                : "bg-white/40 backdrop-blur-sm border-transparent"
            }`}
          >
            {/* Sliding solid ink indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 bg-[#0d0d0d] rounded-full transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />

            {NAV.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-section={secId}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 no-underline ${
                    isActive ? "text-[#f4f2ee]" : "text-[#77756f] hover:text-[#0d0d0d]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Pill Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(13,13,13,0.12)] bg-white/90 backdrop-blur-md text-xs font-semibold tracking-wider uppercase text-[#0d0d0d] shadow-sm hover:bg-[#0d0d0d] hover:text-[#f4f2ee] transition-all"
            aria-expanded={menuOpen}
            aria-controls="mobile-overlay"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                menuOpen ? "bg-[#f4f2ee]" : "bg-[#0d0d0d]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        id="mobile-overlay"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-30 bg-[#f4f2ee] flex flex-col justify-between p-8 md:hidden transition-[clip-path] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          menuOpen
            ? "clip-path-open pointer-events-auto"
            : "clip-path-closed pointer-events-none"
        }`}
        style={{
          clipPath: menuOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)",
        }}
      >
        <div className="pt-20">
          <p className="font-mono text-xs text-[#77756f] uppercase tracking-widest mb-8">
            Navigation
          </p>
          <nav className="flex flex-col gap-6">
            {NAV.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group flex items-baseline gap-4 text-3xl font-bold tracking-tight text-[#0d0d0d] hover:text-[#77756f] transition-colors"
                style={{
                  transitionDelay: `${menuOpen ? idx * 40 + 100 : 0}ms`,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: "transform 0.5s ease, opacity 0.5s ease, color 0.2s ease",
                }}
              >
                <span className="font-mono text-xs text-[#77756f] font-normal">
                  0{idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-[rgba(13,13,13,0.1)] pt-6 flex flex-col gap-2">
          <p className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
            Contact
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-sm font-medium text-[#0d0d0d] underline"
          >
            {PROFILE.email}
          </a>
          <p className="text-xs text-[#77756f]">{PROFILE.location}</p>
        </div>
      </div>
    </>
  );
}
