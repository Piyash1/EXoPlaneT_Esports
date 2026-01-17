"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MissionStatement() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/40">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-primary text-sm font-bold tracking-[0.4em] uppercase">
                THE INITIATIVE
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight uppercase tracking-tighter">
                BEYOND THE{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
                  HORIZON
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed">
              <p>
                Founded in the digital frontier, Exoplanet Esports was built on
                a single transmission:{" "}
                <span className="text-white font-medium">
                  To unify the most skilled pilots across the galaxy.
                </span>
              </p>
              <p>
                Our structure is a hybrid of elite athletic training and
                advanced technological integration. We provide our squads with
                the tools they need to reach synchronous performance—where
                action becomes instinct and victory becomes inevitable.
              </p>
              <p>
                We operate across multiple sectors, including PUBG Mobile,
                Valorant, and Apex Legends, consistently pushing the boundaries
                of what is possible in organized competitive play.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 pt-6">
              <div className="space-y-1">
                <p className="text-4xl font-heading font-black text-white">
                  2023
                </p>
                <p className="text-xs text-primary/60 font-bold uppercase tracking-widest">
                  Est. Orbit
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-heading font-black text-white">
                  50+
                </p>
                <p className="text-xs text-primary/60 font-bold uppercase tracking-widest">
                  Deployments
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-heading font-black text-white">
                  10M+
                </p>
                <p className="text-xs text-primary/60 font-bold uppercase tracking-widest">
                  Global Reach
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-full border border-primary/20 p-8 animate-spin-slow">
              <div className="absolute inset-0 border-t-2 border-primary/40 rounded-full" />
              <div className="absolute inset-0 border-b-2 border-blue-500/40 rounded-full rotate-45" />
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5">
                <Image
                  src="/hero-bg.png"
                  alt="Planet Core"
                  fill
                  className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-radial-gradient(circle, transparent_40%, black_100%)" />
              </div>
            </div>

            {/* HUD Callouts */}
            <div className="absolute -top-4 -right-4 glass px-4 py-2 border border-primary/30 rounded-lg backdrop-blur-xl">
              <p className="text-[10px] font-mono text-primary animate-pulse uppercase tracking-wider">
                SYNC_LEVEL: 100%
              </p>
            </div>
            <div className="absolute -bottom-4 -left-4 glass px-4 py-2 border border-blue-500/30 rounded-lg backdrop-blur-xl">
              <p className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                CORE_STABILITY: NOMINAL
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
