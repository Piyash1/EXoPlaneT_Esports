"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pb-32">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0">
        {/* Fallback Image / Poster - Using our generated asset */}
        {/* 
        <Image
          src="/hero-bg.png"
          alt="Battle Royale Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        */}

        {/* Video Element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
          poster="/hero-bg.png"
        >
          <source src="/animated-hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays */}
        {/* Static Color Aura - Premium Dark Bluish Glow */}
        <div
          className="absolute inset-0 z-1 pointer-events-none mix-blend-screen"
          style={{
            boxShadow: "inset 0 0 100px 20px rgba(30, 58, 138, 0.3)",
          }}
        />

        {/* Subtle Bottom Fade for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-1" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 z-0 mix-blend-overlay" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-blue-500/30 bg-black/60 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(30,58,138,0.3)]">
            <span className="text-blue-400 text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
              The Future of Esports
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-white drop-shadow-2xl">
            EXO
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-white to-blue-600">
              PLANET
            </span>
          </h1>

          <p className="max-w-2xl text-xl md:text-2xl text-gray-200 font-light tracking-wide leading-relaxed drop-shadow-md">
            Dominate the battlegrounds. The next evolution of competitive
            esports is here.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-6 pt-8"
          >
            <Link href="/tryouts">
              <Button
                size="lg"
                variant="sku"
                className="h-16 px-12 text-xl font-bold tracking-widest shadow-[0_0_30px_rgba(30,58,138,0.5)] hover:shadow-[0_0_50px_rgba(30,58,138,0.7)] hover:scale-105 transition-all bg-blue-600 text-white border-none"
              >
                JOIN THE SQUAD
              </Button>
            </Link>
            <Link href="/teams">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 text-lg border-white/30 bg-black/40 hover:bg-white/10 hover:border-white backdrop-blur-md text-white transition-all"
              >
                WATCH HIGHLIGHTS <Play className="ml-3 w-5 h-5 fill-current" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
          Drop Zone
        </span>
        <motion.div
          animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 bg-primary"
        />
      </motion.div>
    </section>
  );
}
