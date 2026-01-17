"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamsHero() {
  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Synced with Home Hero */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-teams-bg.png"
          alt="Teams Banner"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Animated Color Aura - Synced with Home Hero */}
        <motion.div
          className="absolute inset-0 z-1 pointer-events-none mix-blend-screen"
          animate={{
            boxShadow: [
              "inset 0 0 50px 0px rgba(0, 255, 200, 0)",
              "inset 0 0 100px 20px rgba(30, 58, 138, 0.3)",
              "inset 0 0 50px 0px rgba(0, 255, 200, 0)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-1" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 z-0 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-black/60 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(30,58,138,0.3)]">
            <span className="text-blue-400 text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
              Rosters Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight drop-shadow-2xl">
            OUR{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
              SQUADS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mt-6">
            Meet the elite players representing Exoplanet on the global stage.
          </p>
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
