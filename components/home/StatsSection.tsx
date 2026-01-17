"use client";

import { useEffect, useRef } from "react";
import { statsData } from "@/lib/data";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Parse the number from the string (e.g. "50+" -> 50)
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      if (!isNaN(numericValue)) {
        motionValue.set(numericValue);
      }
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format with the original suffix if present
        const suffix = value.replace(/[0-9]/g, "");
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, value]);

  return <span ref={ref}>{value}</span>; // Initial render
}

export default function StatsSection() {
  return (
    <section className="py-20 relative z-20">
      {/* Background Grid Extension */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Holographic Border Effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl opacity-30 group-hover:opacity-100 blur-sm transition duration-500" />

              <div className="relative h-full bg-black/60 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 border border-white/10 hover:border-primary/50 transition-all duration-300">
                {/* Glowing Icon Container */}
                <div
                  className={`relative p-4 rounded-full bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="absolute inset-0 rounded-full bg-current opacity-20 blur-md" />
                  <stat.icon className="w-8 h-8 relative z-10" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-5xl font-bold font-heading text-white tracking-tighter group-hover:text-primary transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    <Counter value={stat.value} />
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-heading font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
