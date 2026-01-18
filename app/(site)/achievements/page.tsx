"use client";

import AchievementsHero from "@/components/achievements/AchievementsHero";
import AchievementCard from "@/components/achievements/AchievementCard";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";
import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/achievements");
        const result = await res.json();
        if (result.success) setAchievements(result.data);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Cinematic Duo-Tone Background */}
      <TeamsBackground />

      {/* Hero Section - Hall of Fame Header */}
      <AchievementsHero />

      {/* Trophy Section Grid */}
      <section className="relative z-10 py-24 min-h-[40vh]">
        <div className="container px-4 md:px-6 mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em]">
                Synchronizing Records...
              </p>
            </div>
          ) : achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
              <AlertCircle className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-[0.3em]">
                No verified records found in archives
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Area with Synced Glow */}
      <div className="h-[20vh] relative">
        <FooterBackground />
      </div>
    </main>
  );
}
