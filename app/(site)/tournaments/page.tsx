"use client";

import { motion } from "framer-motion";
import { Trophy, Timer, Shield, Target, Zap, Loader2 } from "lucide-react";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";
import { HudBadge } from "@/components/ui/HudBadge";
import { Button } from "@/components/ui/button";

export default function TournamentsPage() {
  return (
    <div className="min-h-screen relative bg-black overflow-hidden flex flex-col pt-20">
      <TeamsBackground />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Tactical HUD Header */}
          <div className="flex justify-center mb-4">
            <div className="relative p-1 rounded-sm border border-primary/30 bg-primary/5 backdrop-blur-md">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
              <div className="px-4 py-1 flex items-center gap-2">
                <Timer className="w-3 h-3 text-primary animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em]">
                  Status: Sector Under Construction
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-white italic tracking-tighter uppercase leading-none">
              TOURN<span className="text-primary">AMENTS</span>
            </h1>
            <p className="text-muted-foreground font-mono text-[10px] md:text-base uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-60">
              Competitive Engine Initializing
            </p>
          </div>

          {/* Central HUD Card */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-px bg-linear-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl p-8 md:p-12 overflow-hidden">
              {/* Animated Grid Lines */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent animate-pulse" />

              <div className="relative z-10 space-y-8">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-spin-slow">
                    <Trophy className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(0,255,200,0.5)]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xl md:text-2xl font-heading font-black text-white italic tracking-tight uppercase">
                    Deployment in Progress
                  </p>
                  <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                    Our world-class tournament infrastructure is being
                    calibrated. Get ready for the most tactical competition in
                    the exoplanet system.
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pt-4">
                  {[
                    { label: "Ruleset", value: "98%", status: "Calibrated" },
                    { label: "Prizing", value: "85%", status: "Locked" },
                    { label: "Security", value: "100%", status: "Shielded" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                        {stat.label}
                      </div>
                      <div className="text-lg font-heading font-black text-white italic">
                        {stat.value}
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: stat.value }}
                          transition={{ delay: 1 + i * 0.2, duration: 1 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Button variant="neon" className="px-12 h-14 text-lg">
              Notify Command
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10">
        <FooterBackground />
      </div>
    </div>
  );
}
