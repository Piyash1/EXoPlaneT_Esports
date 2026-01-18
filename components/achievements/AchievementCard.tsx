"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Achievement } from "@/lib/data";
import { Trophy, Calendar, Users } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  isActive?: boolean;
}

export default function AchievementCard({
  achievement,
  isActive = false,
}: AchievementCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Safe checks for team name if it's an object or string
  const teamName =
    typeof achievement.team === "object"
      ? achievement.team?.name
      : achievement.team;

  // Formatting date
  const dateYear = new Date(achievement.date).getFullYear();

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`box w-full max-w-[380px] bg-black/40 backdrop-blur-[30px] rounded-[20px] overflow-hidden border transition-all duration-500 flex flex-col relative ${
        isActive ? "group" : ""
      } ${
        isActive
          ? "border-yellow-500/80 shadow-[0_30px_80px_rgba(234,179,8,0.2)] scale-105 hover:-translate-y-[15px] hover:scale-105 hover:border-yellow-500/60 hover:bg-yellow-500/10 hover:shadow-[0_25px_80px_rgba(234,179,8,0.3)]"
          : "border-yellow-500/20 shadow-[0_10px_40px_rgba(234,179,8,0.1)] opacity-50 grayscale-[0.5] pointer-events-none"
      }`}
    >
      {/* Rotating Gradient Background */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,transparent,var(--primary))] opacity-0 group-hover:opacity-30 animate-spin-slow transition-opacity duration-400 pointer-events-none"></div>

      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(234,179,8, 0.15), transparent 80%)`,
        }}
      ></div>

      {/* Image Container with Rank Overlay */}
      <div className="project-image-container relative w-full h-[240px] overflow-hidden rounded-t-[18px] bg-black/30 flex items-center justify-center group">
        {achievement.image ? (
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center z-0" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />
            <div className="relative z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Trophy className="w-24 h-24 text-yellow-500 drop-shadow-[0_0_25px_rgba(234,179,8,0.5)]" />
            </div>
          </>
        )}

        {/* Rank Badge - Top Right */}
        {achievement.rank && (
          <div className="absolute top-3 right-3 z-30">
            <div className="px-4 py-1.5 rounded-full bg-yellow-500/90 backdrop-blur border border-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              <span className="text-xs font-black text-black uppercase tracking-wider">
                {achievement.rank}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="project-content-area p-6 flex flex-col flex-1 text-center relative z-10">
        {/* Title */}
        <div className="topic text-[24px] font-black mb-4 text-white transition-all duration-300 group-hover:text-yellow-500 relative leading-tight">
          <span className="relative z-10 uppercase tracking-tighter">
            {achievement.title}
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1 text-yellow-400 z-0 select-none uppercase tracking-tighter">
            {achievement.title}
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2 text-cyan-400 z-0 select-none uppercase tracking-tighter">
            {achievement.title}
          </span>
        </div>
        {/* Info Stack (Team & Date) */}
        <div className="w-full h-px bg-white/10 mb-5" /> {/* Divider */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 group-hover:text-cyan-400 transition-colors duration-300">
            <Users className="w-4 h-4 text-white/50 group-hover:text-cyan-400" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                Team
              </p>
              <p className="text-xs font-bold text-white/90">{teamName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 group-hover:text-yellow-500 transition-colors duration-300">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                Season
              </p>
              <p className="text-xs font-bold text-white/90">{dateYear}</p>
            </div>
            <Calendar className="w-4 h-4 text-white/50 group-hover:text-yellow-500" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes glitch-1 {
          0% {
            transform: translate(0);
            opacity: 0.5;
          }
          20% {
            transform: translate(-3px, 2px);
          }
          40% {
            transform: translate(-3px, -2px);
          }
          60% {
            transform: translate(3px, 2px);
          }
          80% {
            transform: translate(3px, -2px);
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }
        @keyframes glitch-2 {
          0% {
            transform: translate(0);
            opacity: 0.5;
          }
          20% {
            transform: translate(3px, -2px);
          }
          40% {
            transform: translate(3px, 2px);
          }
          60% {
            transform: translate(-3px, -2px);
          }
          80% {
            transform: translate(-3px, 2px);
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }
        .animate-glitch-1 {
          animation: glitch-1 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
            infinite;
        }
        .animate-glitch-2 {
          animation: glitch-2 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse
            both infinite;
        }
      `}</style>
    </div>
  );
}
