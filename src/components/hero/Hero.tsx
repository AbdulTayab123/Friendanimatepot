"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useSmoothScroll } from "@/lib/scroll";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Animation ke liye State
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Thoda sa delay taake video load ho jaye
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
            setIsMuted(true);
            setAutoplayBlocked(true);
          }).catch(() => setIsPlaying(false));
        });
    }

    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        video.play().then(() => {
          setIsMuted(false);
          setAutoplayBlocked(false);
        }).catch(() => {});
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.35, 0.5, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Canvas Background Remover
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const isBackground = (r: number, g: number, b: number) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      return min > 200 && max - min < 25; 
    };

    const processFrame = (time: number) => {
      animationFrameId = requestAnimationFrame(processFrame);
      if (time - lastTime < interval) return;
      lastTime = time;

      if (video.readyState < 2 || video.paused || video.ended) return;

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;
      const visited = new Uint8Array(w * h);
      const queue: number[] = [];

      const checkAndQueue = (x: number, y: number) => {
        const idx = y * w + x;
        if (visited[idx]) return;
        const i = idx * 4;
        if (isBackground(data[i], data[i + 1], data[i + 2])) {
          visited[idx] = 1;
          queue.push(idx);
        }
      };

      for (let x = 0; x < w; x++) {
        checkAndQueue(x, 0);
        checkAndQueue(x, h - 1);
      }
      for (let y = 0; y < h; y++) {
        checkAndQueue(0, y);
        checkAndQueue(w - 1, y);
      }

      while (queue.length > 0) {
        const idx = queue.pop()!;
        const i = idx * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const min = Math.min(r, g, b);

        data[i + 3] = Math.max(0, Math.min(255, (255 - min) * 4));

        const x = idx % w;
        const y = Math.floor(idx / w);

        if (x > 0) checkAndQueue(x - 1, y);
        if (x < w - 1) checkAndQueue(x + 1, y);
        if (y > 0) checkAndQueue(x, y - 1);
        if (y < h - 1) checkAndQueue(x, y + 1);
      }

      ctx.putImageData(imageData, 0, 0);
    };

    animationFrameId = requestAnimationFrame(processFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.play().then(() => {
        setIsMuted(false);
        setAutoplayBlocked(false);
      }).catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center pt-20 sm:pt-24 pb-8 sm:pb-12 px-[clamp(18px,4vw,64px)] overflow-hidden"
      style={{ backgroundColor: "var(--paper)" }}
    >
      {/* BACKGROUND TEXT */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        aria-hidden="true"
      >
        <span
          className="block text-[clamp(6rem,22vw,26rem)] font-extrabold tracking-tighter uppercase whitespace-nowrap"
          style={{
            WebkitTextStroke: "1.5px rgba(13, 13, 13, 0.15)",
            color: "transparent",
            fontFamily: "var(--font-inter-tight)",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* AVATAR CONTAINER */}
      <div className="relative z-10 w-full max-w-[768px] flex-1 min-h-0 flex items-center justify-center my-auto">
        <div
          className="relative w-full max-w-[768px] mx-auto flex items-center justify-center bg-transparent"
          style={{
            aspectRatio: "768/960",
            height: "clamp(50svh, 64svh, 760px)",
          }}
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none select-none"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          <canvas
            ref={canvasRef}
            className="relative w-full h-full object-contain pointer-events-none select-none bg-transparent"
          />
        </div>

        {/* Sound Control Button */}
        <div className="absolute bottom-2 right-2 sm:right-6 z-20">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute intro audio" : "Mute intro audio"}
            className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2"
          >
            {autoplayBlocked && (
              <span className="absolute inset-0 rounded-full bg-[#0d0d0d] animate-ping opacity-30 pointer-events-none" />
            )}
            {isMuted ? (
              <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* HEADING & CTAs (LINE BY LINE ANIMATION) */}
      <div className="relative z-20 w-full max-w-[1320px] mx-auto flex flex-col items-center text-center mt-2 shrink-0">
        
        <h1 className="text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-tight text-[#0d0d0d] leading-[1.15] mb-6 max-w-[900px] text-balance">
          
          {/* Line 1: Founder & CEO */}
          <span className="block overflow-hidden pb-1">
            <span 
              className={`block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
                isLoaded ? "translate-y-0" : "translate-y-full"
              }`}
            >
              Founder &amp; CEO of AH Digital Hub,
            </span>
          </span>

          {/* Line 2: Full Stack Developer */}
          <span className="block overflow-hidden pb-2">
            <span 
              className={`block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${
                isLoaded ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <span className="font-serif italic font-normal text-[#77756f]">a Full Stack Developer.</span>
            </span>
          </span>
          
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollTo("#work", { offset: -40 }); }} className="btn-primary">
            Explore work
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact", { offset: -40 }); }} className="btn-secondary">
            Let&apos;s talk
          </a>
          <a href={PROFILE.resumePath} download="Ameema_Waheed_Resume.pdf" className="btn-secondary">
            <span>Résumé</span>
            <span className="font-mono text-xs">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}