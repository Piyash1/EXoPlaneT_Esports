"use client";

import { achievements } from "@/lib/data";

export default function Achievements() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            LEGACY OF{" "}
            <span className="text-secondary drop-shadow-[0_0_15px_rgba(217,0,217,0.5)]">
              VICTORY
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Defining moments where we proved our dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, i) => (
            <div key={item.id} className="relative group">
              {/* Connector Line (Desktop) - Decorative */}
              <div className="hidden lg:block absolute top-1/2 -left-4 w-4 h-px bg-white/10 group-hover:bg-primary/50 transition-colors" />

              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-xl opacity-20 blur-md group-hover:opacity-60 transition duration-500 group-hover:duration-200" />
              <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-lg p-8 flex flex-col justify-between border border-white/10 group-hover:border-white/30 transition-colors">
                <div>
                  <div className="text-white/5 font-heading font-bold text-6xl absolute top-2 right-4 select-none group-hover:text-primary/10 transition-colors">{`0${i + 1}`}</div>
                  <h3 className="text-xl font-bold text-white mb-2 pr-8 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary mb-6 font-mono tracking-wider">
                    {item.date}
                  </p>
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool</span>
                      <span className="text-white font-mono font-bold text-shadow-sm">
                        {item.prize}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Squad</span>
                      <span className="text-white">{item.team}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
