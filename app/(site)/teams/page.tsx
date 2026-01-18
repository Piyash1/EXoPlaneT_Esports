"use client";

import { useEffect, useState } from "react";
import TeamsHero from "@/components/teams/TeamsHero";
import TeamCardDetailed from "@/components/teams/TeamCardDetailed";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";
import { Loader2, Zap } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch("/api/teams");
        const result = await res.json();
        if (result.success) setTeams(result.data);
      } catch (err) {
        console.error("Gallery Sync Failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      <TeamsBackground />

      <div className="relative z-10">
        <TeamsHero />

        <div className="container mx-auto px-4 py-16 min-h-[40vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em]">
                Synchronizing Unit Data...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              {teams.map((team, index) => (
                <TeamCardDetailed key={team.id} team={team} index={index} />
              ))}

              {teams.length === 0 && (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-xl bg-white/2">
                  <Zap className="w-12 h-12 text-white/5 mx-auto mb-4" />
                  <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest opacity-30 italic">
                    No active divisions found in the current sector.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative z-10">
          <FooterBackground />
        </div>
      </div>
    </div>
  );
}
