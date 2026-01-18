"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, Trophy, Users, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { HudBadge } from "@/components/ui/HudBadge";

interface TeamDetailHeroProps {
  team: {
    name: string;
    logoUrl?: string | null;
    game: { name: string };
    players?: any[];
    _count?: { players: number };
  };
}

export default function TeamDetailHero({ team }: TeamDetailHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-12">
      {/* Background with Team Logo Blur */}
      <div className="absolute inset-0 z-0">
        {team.logoUrl ? (
          <Image
            src={team.logoUrl}
            alt=""
            fill
            className="object-contain opacity-20 scale-150 blur-3xl saturate-200"
          />
        ) : (
          <div className="absolute inset-0 bg-primary/5" />
        )}

        {/* Animated Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-1" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-sm border border-white/10 bg-white/5 group-hover:border-primary/50 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest font-mono">
              Return to All Teams
            </span>
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Main Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-primary/20 blur-3xl animate-pulse" />
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-xl border-2 border-primary/30 p-6 bg-black/40 backdrop-blur-xl overflow-hidden group">
              {/* Tech Lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />

              {team.logoUrl ? (
                <Image
                  src={team.logoUrl}
                  alt={team.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <Shield className="w-full h-full text-white/10" />
              )}
            </div>
          </motion.div>

          {/* Team Intel */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                <HudBadge label="Active Team" variant="primary" />
                <HudBadge label={team.game.name} variant="secondary" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white italic tracking-tighter uppercase leading-none mb-4">
                {team.name}
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                      Members
                    </p>
                    <p className="text-xl font-black text-white italic font-heading">
                      {team._count?.players ?? team.players?.length ?? 0} Member
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                    <Trophy className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                      Global Rank
                    </p>
                    <p className="text-xl font-black text-white italic font-heading">
                      #4 Worldwide
                    </p>
                  </div>
                </div> */}

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                      Region
                    </p>
                    <p className="text-xl font-black text-white italic font-heading">
                      Asia Pacific
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
