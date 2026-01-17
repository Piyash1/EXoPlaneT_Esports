"use client";

import { motion } from "framer-motion";

export default function GlobalGlow() {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Static Premium Dark Bluish Glow Aura - Wraps full page periphery */}
      <div
        className="absolute inset-0 z-1 mix-blend-screen"
        style={{
          boxShadow: "inset 0 0 350px 80px rgba(30, 58, 138, 0.3)",
        }}
      />
    </div>
  );
}
