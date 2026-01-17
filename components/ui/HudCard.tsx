"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  showScanningLine?: boolean;
  delay?: number;
}

export function HudCard({
  children,
  className,
  variant = "primary",
  showScanningLine = true,
  delay = 0,
}: HudCardProps) {
  const variantStyles = {
    primary: "border-primary/20 hover:border-primary/50",
    secondary: "border-secondary/20 hover:border-secondary/50",
    danger: "border-red-500/20 hover:border-red-500/50",
    ghost: "border-white/5 hover:border-white/20",
  };

  const glowStyles = {
    primary: "shadow-[0_0_20px_rgba(0,255,200,0.05)]",
    secondary: "shadow-[0_0_20px_rgba(30,58,138,0.05)]",
    danger: "shadow-[0_0_20px_rgba(239,68,68,0.05)]",
    ghost: "",
  };

  const accentColors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    danger: "bg-red-500",
    ghost: "bg-white/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative group bg-black/40 backdrop-blur-xl border rounded-lg overflow-hidden transition-all duration-500",
        variantStyles[variant],
        glowStyles[variant],
        className,
      )}
    >
      {/* Tactical HUD Corners */}
      <div
        className={cn(
          "absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 opacity-30 group-hover:opacity-100 transition-opacity",
          variant === "primary"
            ? "border-primary"
            : variant === "secondary"
              ? "border-secondary"
              : variant === "danger"
                ? "border-red-500"
                : "border-white",
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-30 group-hover:opacity-100 transition-opacity",
          variant === "primary"
            ? "border-primary"
            : variant === "secondary"
              ? "border-secondary"
              : variant === "danger"
                ? "border-red-500"
                : "border-white",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-30 group-hover:opacity-100 transition-opacity",
          variant === "primary"
            ? "border-primary"
            : variant === "secondary"
              ? "border-secondary"
              : variant === "danger"
                ? "border-red-500"
                : "border-white",
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 opacity-30 group-hover:opacity-100 transition-opacity",
          variant === "primary"
            ? "border-primary"
            : variant === "secondary"
              ? "border-secondary"
              : variant === "danger"
                ? "border-red-500"
                : "border-white",
        )}
      />

      {/* Dynamic Scanning Line */}
      {showScanningLine && (
        <motion.div
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className={cn(
            "absolute left-0 right-0 h-1px opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none z-10",
            accentColors[variant],
            variant === "primary" && "shadow-[0_0_10px_rgba(0,255,200,0.8)]",
            variant === "secondary" && "shadow-[0_0_10px_rgba(30,58,138,0.8)]",
            variant === "danger" && "shadow-[0_0_10px_rgba(239,68,68,0.8)]",
          )}
        />
      )}

      {/* HUD Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 p-6">{children}</div>

      {/* Bottom Status Bar Decor */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 opacity-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className={cn("w-1.5 h-[2px]", accentColors[variant])} />
        ))}
      </div>
    </motion.div>
  );
}
