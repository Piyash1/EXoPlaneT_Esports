"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/lib/data";
import { Trophy, Calendar, DollarSign, Users } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export default function AchievementCard({
  achievement,
  index,
}: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-3xl border border-white/5 p-8 transition-all duration-500 hover:border-yellow-500/40 hover:translate-y-[-8px] hover:shadow-[0_0_40px_rgba(255,184,0,0.1)]">
        {/* Holographic Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-yellow-500/40 transition-all duration-500 shadow-[0_0_15px_rgba(255,184,0,0.1)]">
            <Trophy className="w-7 h-7 text-yellow-500" />
          </div>
          <div className="text-[10px] font-mono text-primary/40 uppercase tracking-widest text-right">
            SEC: ACHIEVEMENT_LOG
            <br />
            ID: {achievement.id.toString().padStart(4, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-heading font-black text-white group-hover:text-yellow-500 transition-colors uppercase tracking-tight leading-tight">
            {achievement.title}
          </h3>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary/60">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Date
                </span>
              </div>
              <p className="text-white font-bold text-sm">
                {new Date(achievement.date).getFullYear()}
              </p>
            </div>
            <div className="space-y-1 col-span-2 pt-2">
              <div className="flex items-center gap-2 text-primary/60">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Squad
                </span>
              </div>
              <p className="text-white/80 font-medium text-sm italic">
                "
                {typeof achievement.team === "object"
                  ? achievement.team?.name
                  : achievement.team}
                "
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tech Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            Verified Record
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,255,200,0.8)]" />
        </div>

        {/* Hover Highlight */}
        <div className="absolute inset-x-8 bottom-0 h-[2px] w-0 bg-yellow-500 group-hover:w-[calc(100%-64px)] transition-all duration-700 mx-auto" />
      </div>
    </motion.div>
  );
}
