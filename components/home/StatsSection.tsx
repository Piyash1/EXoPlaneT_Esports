"use client";

import { statsData } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="py-20 relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="relative group p-px rounded-2xl bg-linear-to-b from-white/10 to-transparent hover:from-primary/50 transition-all duration-500"
            >
              <div className="relative h-full bg-linear-to-b from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 border border-white/5 hover:border-primary/20 transition-all duration-300">
                <div
                  className={`p-3 rounded-full bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-5xl font-bold font-heading text-white tracking-tighter group-hover:text-primary transition-colors duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-heading font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
