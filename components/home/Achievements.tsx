"use client";

import { achievements } from "@/lib/data";

export default function Achievements() {
  return (
    <section className="py-32 bg-linear-to-b from-black to-primary/5 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">
            LEGACY OF <span className="text-secondary">VICTORY</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Defining moments where we proved our dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <div key={item.id} className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary rounded-xl opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-full bg-black rounded-lg p-8 flex flex-col justify-between border border-white/10 bg-linear-to-b from-white/10 to-black backdrop-blur-sm">
                <div>
                  <div className="text-secondary font-heading font-bold text-5xl opacity-20 absolute top-4 right-4">{`0${i + 1}`}</div>
                  <h3 className="text-xl font-bold text-white mb-2 pr-8">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary mb-6">{item.date}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prize</span>
                      <span className="text-white font-mono">{item.prize}</span>
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
