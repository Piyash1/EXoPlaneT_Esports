import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedTeams from "@/components/home/FeaturedTeams";
import Achievements from "@/components/home/Achievements";
import CTASection from "@/components/home/CTASection";
import FooterBackground from "@/components/teams/FooterBackground";
import RevealAnimation from "@/components/home/RevealAnimation";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <RevealAnimation />
      <HeroSection />
      <StatsSection />
      <FeaturedTeams />
      <Achievements />
      <div className="relative">
        <FooterBackground />
        <CTASection />
      </div>
    </div>
  );
}
