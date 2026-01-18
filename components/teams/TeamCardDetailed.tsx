"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trophy, Users, Crosshair, ArrowRight } from "lucide-react";

interface TeamCardProps {
  team: any;
  index: number;
}

export default function TeamCardDetailed({ team, index }: TeamCardProps) {
  const logo = team.logoUrl || "/team-pubg.png";
  const gameName = team.game?.name || team.game || "PUBG Mobile";
  const memberCount = team._count?.players ?? team.members ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative w-full"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-white/10">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 group-hover:opacity-10 transition-opacity" />

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-1/3 h-52 md:h-auto overflow-hidden bg-slate-900/50">
            <Image
              src={logo}
              alt={team.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/60 md:bg-linear-to-r md:from-transparent md:to-black/80" />

            {/* Rank Badge */}
            <div className="absolute top-4 left-4 md:left-auto md:right-4 bg-black/60 backdrop-blur border border-primary/30 px-3 py-1 rounded-sm">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                {team.rank || "Tier 1"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-5 md:p-6 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-2xl font-heading font-black text-white italic tracking-tighter mb-1 group-hover:text-primary transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.3em]">
                    {gameName} Team
                  </p>
                </div>
                {/* Tech Decoration */}
                <div className="hidden md:flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-1 h-6 -skew-x-12 ${i === 3 ? "bg-primary" : "bg-white/10"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center group-hover:border-primary/20 transition-colors">
                  <Trophy className="w-5 h-5 mx-auto mb-2 text-secondary" />
                  <div className="text-xl font-heading font-black text-white italic">
                    {team.wins ?? 0}
                  </div>
                  <div className="text-[8px] text-muted-foreground uppercase font-mono tracking-widest">
                    Wins
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center group-hover:border-primary/20 transition-colors">
                  <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-heading font-black text-white italic">
                    {memberCount}
                  </div>
                  <div className="text-[8px] text-muted-foreground uppercase font-mono tracking-widest">
                    Players
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center group-hover:border-primary/20 transition-colors">
                  <Crosshair className="w-5 h-5 mx-auto mb-2 text-white/70" />
                  <div className="text-xl font-heading font-black text-white italic tracking-tighter">
                    {team.readiness ?? 100}%
                  </div>
                  <div className="text-[8px] text-muted-foreground uppercase font-mono tracking-widest">
                    Ready
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={`/teams/${team.id}`} className="flex-1">
                <Button className="w-full bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] border-none font-black italic tracking-widest uppercase text-xs h-10 sm:h-12 rounded-sm shadow-[0_0_20px_rgba(0,255,200,0.2)]">
                  View Team
                </Button>
              </Link>
              <Button
                variant="outline"
                className="flex-1 border-white/10 hover:border-white/20 text-[10px] uppercase font-black italic tracking-widest h-10 sm:h-12 rounded-sm"
              >
                Combat Log <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
