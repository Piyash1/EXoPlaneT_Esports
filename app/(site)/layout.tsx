import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalGlow from "@/components/layout/GlobalGlow";
import DynamicBackground from "@/components/layout/DynamicBackground";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <GlobalGlow />
      <DynamicBackground />
      <Navbar />
      <main className="grow pt-16 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
