import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedTeams from "@/components/home/FeaturedTeams";
import Achievements from "@/components/home/Achievements";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturedTeams />
      <Achievements />
      <CTASection />
    </div>
  );
}
