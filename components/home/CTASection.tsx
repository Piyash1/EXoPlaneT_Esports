"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.1),transparent_50%)]" />

      <div className="container mx-auto relative z-10 text-center space-y-8 px-4">
        <h2 className="text-5xl md:text-8xl font-heading font-bold text-white leading-tight">
          YOUR LEGEND
          <br />
          STARTS HERE
        </h2>
        <Link href="/tryouts">
          <Button
            size="lg"
            variant="neon"
            className="text-xl px-16 py-8 rounded-full"
          >
            APPLY FOR TRYOUTS
          </Button>
        </Link>
      </div>
    </section>
  );
}
