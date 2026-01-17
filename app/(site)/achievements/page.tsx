import AchievementsHero from "@/components/achievements/AchievementsHero";
import AchievementCard from "@/components/achievements/AchievementCard";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";
import { achievements } from "@/lib/data";

export default function AchievementsPage() {
  return (
    <main className="relative min-h-screen">
      {/* Cinematic Duo-Tone Background */}
      <TeamsBackground />

      {/* Hero Section - Hall of Fame Header */}
      <AchievementsHero />

      {/* Trophy Section Grid */}
      <section className="relative z-10 py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Area with Synced Glow */}
      <div className="h-[20vh] relative">
        <FooterBackground />
      </div>
    </main>
  );
}
