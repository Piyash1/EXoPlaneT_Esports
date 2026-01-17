"use client";

import { motion } from "framer-motion";

export default function TeamsBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Base radial gradient - Stronger center focus */}

      {/* Static background gradients - Primary Cyan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,200,0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,200,0.1),transparent_50%)]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
    </div>
  );
}
