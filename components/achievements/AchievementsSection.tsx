"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/lib/data";
import AchievementCard from "./AchievementCard";
import TiltCard from "../ui/TiltCard";
import { LayoutGrid, GalleryHorizontal } from "lucide-react";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({
  achievements,
}: AchievementsSectionProps) {
  console.log("AchievementsSection: Mounted");
  const [view, setView] = useState<"carousel" | "grid">("carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (view !== "carousel" || isHovered || achievements.length === 0) return;

    const interval = setInterval(() => {
      nextProject();
    }, 3000);

    return () => clearInterval(interval);
  }, [view, isHovered, activeIndex, achievements.length]);

  // Handle mobile view resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("grid");
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevProject = () => {
    setActiveIndex(
      (prev) => (prev - 1 + achievements.length) % achievements.length,
    );
  };

  if (achievements.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10 py-10 min-h-[40vh]">
      {/* View Toggle */}
      <div className="view-toggle-container hidden md:flex justify-center gap-4 mb-16">
        <button
          onClick={() => setView("carousel")}
          aria-label="Switch to carousel view"
          className={`view-toggle-btn flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-[20px] cursor-pointer ${
            view === "carousel"
              ? "bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              : "bg-black/30 border-white/10 text-white/50 hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-white"
          }`}
        >
          <GalleryHorizontal className="w-5 h-5" />
          <span>Carousel View</span>
        </button>
        <button
          onClick={() => setView("grid")}
          aria-label="Switch to grid view"
          className={`view-toggle-btn flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-[20px] cursor-pointer ${
            view === "grid"
              ? "bg-yellow-500/20 border-yellow-500 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              : "bg-black/30 border-white/10 text-white/50 hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-white"
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Grid View</span>
        </button>
      </div>

      {view === "carousel" ? (
        <div
          className="carousel-container relative w-full max-w-[1400px] mx-auto px-5 py-5 pb-20 perspective-2000 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="project-count-container text-center mb-10">
            <span className="text-base text-white/80 font-semibold px-6 py-2.5 bg-black/40 backdrop-blur-[20px] border border-yellow-500/30 rounded-full shadow-[0_5px_20px_rgba(234,179,8,0.15)]">
              Record {activeIndex + 1} of {achievements.length}
            </span>
          </div>

          <div className="carousel-wrapper relative w-full h-[500px] flex items-center justify-center perspective-1000">
            <div className="carousel-track relative w-full h-full flex items-center justify-center preserve-3d">
              {/* Spotlight Floor */}
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/20 blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen" />

              <AnimatePresence initial={false} mode="popLayout">
                {achievements.map((achievement, idx) => {
                  const total = achievements.length;
                  // If only 1 item, static position
                  if (total === 1) {
                    return (
                      <motion.div
                        key={achievement.id}
                        className="carousel-item absolute z-50 w-[340px] sm:w-[380px]"
                      >
                        <AchievementCard
                          achievement={achievement}
                          isActive={true}
                        />
                      </motion.div>
                    );
                  }

                  const angleStep = 40; // Fixed angle separation
                  const radius = 550;

                  // Calculate shortest distance offset
                  let offset = idx - activeIndex;
                  if (offset > total / 2) offset -= total;
                  if (offset < -total / 2) offset += total;

                  // Limit visibility to Center + 2 neighbors on each side
                  if (Math.abs(offset) > 2) return null;

                  const angle = offset * angleStep * (Math.PI / 180);
                  const cosAngle = Math.cos(angle);
                  const sinAngle = Math.sin(angle);

                  const x = sinAngle * radius;
                  const z = cosAngle * radius - radius;

                  // Adjusted scale/opacity for fixed angle view
                  // Center (offset 0) -> scale 1, opacity 1
                  // Neighbors (offset 1) -> scale 0.85, opacity 0.7
                  const scale = 1.0 - Math.abs(offset) * 0.15;
                  const opacity = 1.0 - Math.abs(offset) * 0.3;

                  const zIndex = 100 - Math.abs(offset);
                  const isActive = idx === activeIndex;

                  return (
                    <motion.div
                      key={achievement.id}
                      layout
                      animate={{
                        x: x,
                        z: z + (isActive ? 50 : 0),
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex,
                        rotateY: -offset * 15,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className={`carousel-item absolute w-[340px] sm:w-[380px] origin-center ${
                        isActive ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      onClick={() => {
                        if (offset !== 0) setActiveIndex(idx);
                      }}
                    >
                      <AchievementCard
                        achievement={achievement}
                        isActive={isActive}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prevProject}
            aria-label="Show previous"
            className="absolute top-1/2 left-5 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-black/60 backdrop-blur-[25px] border-2 border-yellow-500/30 flex items-center justify-center text-white hover:scale-115 hover:bg-yellow-500/20 hover:border-yellow-500 transition-all z-50 shadow-[0_10px_40px_rgba(234,179,8,0.2)] cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={nextProject}
            aria-label="Show next"
            className="absolute top-1/2 right-5 -translate-y-1/2 w-[60px] h-[60px] rounded-full bg-black/60 backdrop-blur-[25px] border-2 border-yellow-500/30 flex items-center justify-center text-white hover:scale-115 hover:bg-yellow-500/20 hover:border-yellow-500 transition-all z-50 shadow-[0_10px_40px_rgba(234,179,8,0.2)] cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {achievements.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-yellow-500 w-10 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.8)] rounded-[10px]"
                    : "bg-white/30 hover:bg-yellow-500/50"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 place-items-center">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TiltCard>
                  <AchievementCard achievement={achievement} isActive={true} />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
