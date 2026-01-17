"use client";

import { motion } from "framer-motion";
import { Shield, Target, Zap, Cpu } from "lucide-react";

const pillars = [
  {
    title: "EXCELLENCE",
    description:
      "Upholding the highest standards in competitive play and operational execution.",
    icon: Target,
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "INNOVATION",
    description:
      "Leveraging cutting-edge tools and strategies to stay ahead of the meta.",
    icon: Cpu,
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    title: "COMMUNITY",
    description:
      "Building a global network of elite players and passionate supporters.",
    icon: Shield,
    color: "from-primary/20 to-blue-500/5",
  },
  {
    title: "VELOCITY",
    description:
      "Rapid adaptation and decisive action in the ever-changing gaming landscape.",
    icon: Zap,
    color: "from-blue-600/20 to-primary/5",
  },
];

export default function CorePillars() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 uppercase tracking-tighter">
            THE <span className="text-primary">PILLARS</span> OF OUR DOMINANCE
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div
                className={`h-full glass p-8 rounded-3xl border border-white/5 bg-linear-to-br ${pillar.color} transition-all duration-500 group-hover:border-primary/50 group-hover:translate-y-[-8px]`}
              >
                <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 tracking-wider uppercase group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {pillar.description}
                </p>

                {/* Decorative Accent */}
                <div className="mt-6 h-px w-0 bg-primary/50 group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
