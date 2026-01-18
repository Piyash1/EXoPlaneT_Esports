"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import { Loader2, ShieldAlert, Trophy, Users, History } from "lucide-react";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";
import TeamDetailHero from "@/components/teams/TeamDetailHero";
import OperativeCard from "@/components/teams/OperativeCard";

interface TeamDetail {
  id: string;
  name: string;
  logoUrl: string | null;
  game: { name: string };
  players: any[];
  achievements: any[];
  _count: { players: number };
}

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const res = await fetch(`/api/teams/${id}`);
        const result = await res.json();
        if (result.success) {
          setTeam(result.data);
        } else {
          setError(result.error || "Unit data not found.");
        }
      } catch (err) {
        setError("Network connection failure. Unable to retrieve team info.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <TeamsBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-xs font-mono font-bold text-primary uppercase tracking-[0.4em] animate-pulse">
            Initializing Secure Uplink...
          </p>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <TeamsBackground />
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <ShieldAlert className="w-20 h-20 text-red-500 mx-auto opacity-50" />
          <h2 className="text-4xl font-heading font-black text-white italic tracking-tighter uppercase">
            Access <span className="text-red-500">Denied</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
            {error ||
              "The requested division does not exist in our active rosters."}
          </p>
          <div className="pt-8">
            <a
              href="/teams"
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Return to Command
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-black overflow-hidden pb-24">
      <TeamsBackground />

      <div className="relative z-10">
        <TeamDetailHero team={team} />

        <div className="container mx-auto px-4 mt-16">
          {/* Section: Roster */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-primary/20 bg-primary/5 mb-4">
                  <Users className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                    Active Lineup
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-white italic tracking-tighter uppercase">
                  The <span className="text-primary">Roster</span>
                </h2>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                    Roster Size
                  </p>
                  <p className="text-xl font-heading font-black text-white italic">
                    {team.players?.length ?? 0} / 05
                  </p>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                    Status
                  </p>
                  <p className="text-xl font-heading font-black text-primary italic underline decoration-primary/30 underline-offset-4">
                    READY
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.players?.map((player, index) => (
                <OperativeCard key={player.id} player={player} index={index} />
              ))}

              {/* Recruiting Card Slot */}
              {(team.players?.length ?? 0) < 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="border-2 border-dashed border-white/5 rounded-lg flex flex-col items-center justify-center p-8 bg-white/2 min-h-[300px] group hover:border-primary/20 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest text-center mb-6 opacity-30">
                    Sector Available for Deployment
                  </p>
                  <a
                    href="/tryouts"
                    className="px-6 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
                  >
                    Apply for Intake
                  </a>
                </motion.div>
              )}
            </div>
          </div>

          {/* Section: Achievements */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-sm">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-4xl font-heading font-black text-white italic tracking-tighter uppercase">
                  Engagement <span className="text-secondary">History</span>
                </h2>
                <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest mt-1">
                  Personnel Achievement Log
                </p>
              </div>
            </div>

            <div className="grid gap-4 max-w-4xl">
              {team.achievements.length > 0 ? (
                team.achievements.map((ach, idx) => (
                  <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-sm hover:border-secondary/30 transition-all"
                  >
                    <div className="text-2xl font-heading font-black text-secondary/30 italic group-hover:text-secondary transition-colors">
                      {new Date(ach.date).getFullYear()}
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="flex-1">
                      <h4 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter group-hover:text-secondary transition-colors">
                        {ach.title}
                      </h4>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide mt-1">
                        {ach.description || "Operational Success Confirmed"}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-20 text-center border border-dashed border-white/5 rounded-sm bg-white/2">
                  <History className="w-12 h-12 text-white/5 mx-auto mb-4" />
                  <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest opacity-30">
                    Initial Deployment Phase. No history recorded yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-32">
          <FooterBackground />
        </div>
      </div>
    </div>
  );
}
