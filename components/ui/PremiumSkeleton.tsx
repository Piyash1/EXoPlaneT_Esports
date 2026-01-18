"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "rectangle" | "button";
  width?: string | number;
  height?: string | number;
}

export function PremiumSkeleton({
  className,
  variant = "rectangle",
  width,
  height,
}: PremiumSkeletonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "card":
        return "rounded-lg border border-white/5 bg-black/40";
      case "circle":
        return "rounded-full";
      case "button":
        return "rounded-sm h-10";
      default:
        return "rounded-sm";
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/5 backdrop-blur-sm",
        getVariantStyles(),
        className,
      )}
      style={{ width, height }}
    >
      {/* Scanning Line Effect */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 255, 200, 0.1) 50%, transparent 100%)",
        }}
      />

      {/* Glitch Overlay (Optional subtle flickers) */}
      <motion.div
        className="absolute inset-0 bg-white/5 mix-blend-overlay z-20"
        animate={{ opacity: [0, 0.1, 0, 0.05, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          times: [0, 0.1, 0.2, 0.3, 1],
        }}
      />

      {/* HUD Corners for Card Variant */}
      {variant === "card" && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/30" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/30" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30" />
        </>
      )}

      {/* Loading Text Simulator (for larger skeletons) */}
      {(variant === "card" || (typeof height === "number" && height > 100)) && (
        <div className="absolute bottom-2 right-2 flex gap-1 items-end">
          <motion.div
            animate={{ height: [2, 8, 4, 10, 2] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-0.5 bg-primary/30"
          />
          <motion.div
            animate={{ height: [4, 2, 8, 4, 6] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="w-0.5 bg-primary/30"
          />
          <motion.div
            animate={{ height: [6, 4, 2, 8, 4] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-0.5 bg-primary/30"
          />
        </div>
      )}
    </div>
  );
}
