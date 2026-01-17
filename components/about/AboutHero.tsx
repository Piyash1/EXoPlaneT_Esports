"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Cinematic & Dark */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-about-bg.png"
          alt="Exoplanet Command Center"
          fill
          className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
          priority
        />
        {/* Premium Dark Bluish Glow Aura */}
        <div
          className="absolute inset-0 z-1 pointer-events-none mix-blend-screen"
          style={{
            boxShadow: "inset 0 0 150px 30px rgba(30, 58, 138, 0.4)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 z-0 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-block px-6 py-2 rounded-full border border-primary/30 bg-black/60 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,255,200,0.1)]">
            <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
              Mission Log: exoplanet_initiative
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tighter drop-shadow-2xl uppercase">
            REDEFINING{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-white to-blue-600">
              ESPORTS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light tracking-wide leading-relaxed mt-4">
            We are not just an organization. We are the architects of the next
            competitive era—where talent meets technology in the ultimate gaming
            nexus.
          </p>
        </motion.div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute bottom-12 left-12 hidden lg:block">
        <div className="text-[10px] font-mono text-primary/40 space-y-1">
          <p>STRIKE_FORCE_CAPACITY: 100%</p>
          <p>NEURAL_LINK: ACTIVE</p>
          <p>LOCATION: SECTOR_EXO_01</p>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
