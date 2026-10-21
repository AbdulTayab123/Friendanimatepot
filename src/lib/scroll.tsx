"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? 0,
        immediate: options?.immediate ?? false,
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
        }
      } else if (target) {
        target.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
