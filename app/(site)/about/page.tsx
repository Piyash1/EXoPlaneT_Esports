import AboutHero from "@/components/about/AboutHero";
import CorePillars from "@/components/about/CorePillars";
import MissionStatement from "@/components/about/MissionStatement";
import TeamsBackground from "@/components/teams/TeamsBackground";
import FooterBackground from "@/components/teams/FooterBackground";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      {/* Cinematic Duo-Tone Background */}
      <TeamsBackground />

      {/* Hero Section - The Mission Header */}
      <AboutHero />

      {/* Core Values Section */}
      <CorePillars />

      {/* Mission Details Section */}
      <MissionStatement />

      {/* Footer Area with Synced Glow */}
      <div className="h-[20vh] relative">
        <FooterBackground />
      </div>
    </main>
  );
}
