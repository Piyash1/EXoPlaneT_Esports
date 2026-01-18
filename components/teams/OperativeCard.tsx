"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Target, Zap } from "lucide-react";

interface PlayerCardProps {
  player: {
    id: string;
    ign: string;
    role: string | null;
    image: string | null;
  };
  index: number;
}

export default function PlayerCard({ player, index }: PlayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Tactical HUD Border */}
      <div className="absolute -inset-px bg-linear-to-b from-white/20 via-primary/50 to-white/5 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity blur-[1px] group-hover:blur-[2px]" />

      <div className="relative bg-black/60 backdrop-blur-xl rounded-lg overflow-hidden border border-white/10 h-full flex flex-col">
        {/* Animated Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] pointer-events-none opacity-20" />

        {/* Profile Image Container */}
        <div className="relative aspect-square overflow-hidden bg-slate-900">
          {player.image ? (
            <Image
              src={player.image}
              alt={player.ign}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Shield className="w-16 h-16 text-white/10" />
            </div>
          )}

          {/* HUD Overlay Elements */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

          <div className="absolute top-3 left-3 flex gap-1">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
            <div className="w-8 h-[2px] bg-primary/30 mt-1" />
          </div>

          <div className="absolute bottom-3 left-3">
            <div className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase mb-1">
              // Active Player
            </div>
            <h4 className="text-lg md:text-xl font-heading font-black text-white italic tracking-tighter leading-none group-hover:text-primary transition-colors">
              {player.ign}
            </h4>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest">
                {player.role || "Member"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-secondary fill-secondary" />
              <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-tighter">
                LVL 99
              </span>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Tactical Stats Mask */}
          <div className="grid grid-cols-2 gap-2 text-[8px] font-mono font-bold uppercase tracking-widest text-white/40">
            <div className="flex justify-between border-l border-white/10 pl-2">
              <span>STR:</span>
              <span className="text-white">A+</span>
            </div>
            <div className="flex justify-between border-l border-white/10 pl-2">
              <span>DEX:</span>
              <span className="text-white">MAX</span>
            </div>
            <div className="flex justify-between border-l border-white/10 pl-2">
              <span>INT:</span>
              <span className="text-white">B</span>
            </div>
            <div className="flex justify-between border-l border-white/10 pl-2">
              <span>AGI:</span>
              <span className="text-white">S</span>
            </div>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute -inset-2 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
}
