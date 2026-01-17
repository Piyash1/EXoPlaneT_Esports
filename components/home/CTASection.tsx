"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden group">
      {/* Background is now typically handled by parent wrapper with FooterBackground for consistency */}

      {/* Floating Particles (Simulated with simple divs for performance) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping opacity-20" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full animate-ping opacity-20 delay-700" />
      <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-ping opacity-40 delay-300" />

      <div className="container mx-auto relative z-10 text-center space-y-10 px-4">
        <h2 className="text-5xl md:text-8xl font-heading font-black text-white leading-tight drop-shadow-2xl">
          YOUR LEGEND
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
            STARTS HERE
          </span>
        </h2>
        <Link href="/tryouts">
          <Button
            size="lg"
            variant="neon"
            className="text-xl px-16 py-8 rounded-none skew-x-[-10deg] hover:skew-x-[-10deg] border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,255,200,0.3)] hover:shadow-[0_0_50px_rgba(0,255,200,0.6)]"
          >
            <span className="skew-x-10 font-bold tracking-widest">
              APPLY FOR TRYOUTS
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
