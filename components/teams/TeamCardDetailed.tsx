"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Crosshair, ArrowRight } from "lucide-react";
import { Team } from "@/lib/data";

interface TeamCardProps {
  team: Team;
  index: number;
}

export default function TeamCardDetailed({ team, index }: TeamCardProps) {
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
          <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
            <Image
              src={team.image}
              alt={team.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/0 via-transparent to-black/60 md:bg-linear-to-r md:from-transparent md:to-black/80" />

            {/* Rank Badge */}
            <div className="absolute top-4 left-4 md:left-auto md:right-4 bg-black/60 backdrop-blur border border-primary/30 px-3 py-1 rounded-sm">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                {team.rank}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-muted-foreground font-mono text-sm tracking-wide">
                    {team.game}
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
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center group-hover:border-primary/20 transition-colors">
                  <Trophy className="w-5 h-5 mx-auto mb-2 text-secondary" />
                  <div className="text-xl font-bold text-white">
                    {team.wins}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Wins
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center group-hover:border-primary/20 transition-colors">
                  <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold text-white">
                    {team.members}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Members
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5 text-center group-hover:border-primary/20 transition-colors">
                  <Crosshair className="w-5 h-5 mx-auto mb-2 text-white/70" />
                  <div className="text-xl font-bold text-white">98%</div>
                  <div className="text-[10px] text-muted-foreground uppercase">
                    Win Rate
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] border-none font-bold">
                View Roster
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/20 hover:border-white"
              >
                Live Stats <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
