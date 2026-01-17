import TeamsHero from "@/components/teams/TeamsHero";
import TeamCardDetailed from "@/components/teams/TeamCardDetailed";
import CTASection from "@/components/home/CTASection";
import { featuredTeams } from "@/lib/data";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";

export default function TeamsPage() {
  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Animated Primary Gradient Background */}
      <TeamsBackground />

      <div className="relative z-10">
        <TeamsHero />

        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {featuredTeams.map((team, index) => (
              <TeamCardDetailed key={team.id} team={team} index={index} />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative">
            <FooterBackground />
            <CTASection />
          </div>
        </div>
      </div>
    </div>
  );
}
