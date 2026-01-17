"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudBadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "warning";
  className?: string;
  glitch?: boolean;
}

export function HudBadge({
  label,
  variant = "primary",
  className,
  glitch = true,
}: HudBadgeProps) {
  const variants = {
    primary: "text-primary border-primary/30 bg-primary/5",
    secondary: "text-secondary border-secondary/30 bg-secondary/5",
    danger: "text-red-500 border-red-500/30 bg-red-500/5",
    warning: "text-yellow-500 border-yellow-500/30 bg-yellow-500/5",
  };

  const glowColors = {
    primary: "rgba(0, 255, 200, 0.5)",
    secondary: "rgba(30, 58, 138, 0.5)",
    danger: "rgba(239, 68, 68, 0.5)",
    warning: "rgba(234, 179, 8, 0.5)",
  };

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <motion.div
        whileHover={
          glitch
            ? {
                x: [0, -1, 1, -1, 0],
                transition: { duration: 0.2, repeat: Infinity },
              }
            : {}
        }
        className={cn(
          "px-2 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
          variants[variant],
        )}
        style={{
          textShadow: `0 0 8px ${glowColors[variant]}`,
          boxShadow: `inset 0 0 10px ${glowColors[variant].replace("0.5", "0.1")}`,
        }}
      >
        {label}
      </motion.div>

      {/* Decorative HUD dot */}
      <span
        className={cn(
          "absolute -right-1 -top-1 w-1 h-1 rounded-full animate-pulse",
          variant === "primary"
            ? "bg-primary"
            : variant === "secondary"
              ? "bg-secondary"
              : variant === "danger"
                ? "bg-red-500"
                : "bg-yellow-500",
        )}
      />
    </div>
  );
}
