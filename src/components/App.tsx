"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#f4f2ee] text-[#0d0d0d] overflow-x-hidden selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
      {/* Fixed Navigation & Scroll Progress */}
      <Navigation />

      {/* 1. Hero */}
      <Hero />

      {/* 2. About */}
      <AboutSection />

      {/* 3. Skills */}
      <SkillsSection />

      {/* 4. Work */}
      <WorkSection />

      {/* 5. Certifications */}
      <CertificationsSection />

      {/* 6. Experience */}
      <ExperienceSection />

      {/* 7. Achievements */}
      <AchievementsSection />

      {/* 8. Contact & Footer */}
      <ContactSection />
    </div>
  );
}
