"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy } from "lucide-react";

export default function AchievementsHero() {
  return (
    <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Cinematic & Dramatic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-achievements-bg.png"
          alt="Hall of Fame Background"
          fill
          className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          priority
        />
        {/* Premium Gold/Dark Bluish Glow Overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none mix-blend-screen"
          style={{
            boxShadow:
              "inset 0 0 150px 30px rgba(30, 58, 138, 0.4), inset 0 0 50px 10px rgba(255, 184, 0, 0.1)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 z-0 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-yellow-500/30 bg-black/60 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,184,0,0.15)]">
            <Trophy className="w-4 h-4 text-yellow-500 animate-bounce" />
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">
              Hall of Fame: exoplanet_triumphs
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tighter drop-shadow-2xl uppercase">
            OUR{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 via-white to-primary">
              LEGACY
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light tracking-wide leading-relaxed mt-4">
            A testament to endurance, precision, and the relentless pursuit of
            excellence across every competitive sector.
          </p>
        </motion.div>
      </div>

      {/* HUD Counters */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="text-[10px] font-mono text-primary/40 space-y-1 text-right">
          <p>VICTORIES_RECORDED: 35</p>
          <p>TOTAL_PRIZE_POOL: $85,000</p>
          <p>STATUS: UNSTOPPABLE</p>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-yellow-500/50 to-transparent" />
    </section>
  );
}
