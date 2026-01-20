"use client";

import { motion } from "framer-motion";
import { Trophy, Timer, ArrowRight } from "lucide-react";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";
import { HudBadge } from "@/components/ui/HudBadge";
import { Button } from "@/components/ui/button";

import { HudCard } from "@/components/ui/HudCard";

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
            <HudBadge
              variant="primary"
              icon={Timer}
              label="Status: Sector Under Construction"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black text-white italic tracking-tighter uppercase leading-none text-glow-primary">
              TOURN<span className="text-primary">AMENTS</span>
            </h1>
            <p className="text-muted-foreground font-mono text-[10px] md:text-base uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-60">
              Competitive Engine Initializing
            </p>
          </div>

          {/* Central HUD Card */}
          <HudCard
            variant="primary"
            className="max-w-2xl mx-auto shadow-[0_0_50px_rgba(0,255,200,0.1)]"
          >
            <div className="relative z-10 space-y-8">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
                  <Trophy className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(0,255,200,0.5)]" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-heading font-black text-white italic tracking-tight uppercase">
                  Deployment in Progress
                </h2>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest leading-relaxed max-w-sm mx-auto">
                  Our world-class tournament infrastructure is being calibrated.
                  Get ready for the most tactical competition in the exoplanet
                  system.
                </p>
              </div>

              {/* Progress Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                {[
                  { label: "Ruleset", value: "98%", status: "Calibrated" },
                  { label: "Prizing", value: "85%", status: "Locked" },
                  { label: "Security", value: "100%", status: "Shielded" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                      {stat.label}
                    </div>
                    <div className="text-xl font-heading font-black text-white italic text-glow">
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

              <div className="pt-8">
                <Button
                  variant="neon"
                  size="lg"
                  className="w-full sm:w-auto px-12 h-14 text-lg"
                >
                  Notify Command
                </Button>
              </div>
            </div>
          </HudCard>
        </motion.div>
      </div>

      <div className="relative z-10">
        <FooterBackground />
      </div>
    </div>
  );
}
