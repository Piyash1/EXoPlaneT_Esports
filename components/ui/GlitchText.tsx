"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  variant?: "primary" | "secondary" | "white";
}

export function GlitchText({
  text,
  className,
  as: Component = "h2",
  variant = "primary",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const variantClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
  };

  const glitchColor = variant === "primary" ? "text-secondary" : "text-primary";

  return (
    <Component
      className={cn(
        "relative inline-block tracking-tighter",
        variantClasses[variant],
        className,
      )}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className="relative z-10">{text}</span>

      {isGlitching && (
        <>
          <motion.span
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0.5, 0.8, 0],
              x: [-2, 2, -1],
              clipPath: [
                "inset(10% 0 80% 0)",
                "inset(40% 0 45% 0)",
                "inset(70% 0 10% 0)",
              ],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className={cn("absolute inset-0 z-0 opacity-50", glitchColor)}
          >
            {text}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0.5, 0.8, 0],
              x: [2, -2, 1],
              clipPath: [
                "inset(15% 0 75% 0)",
                "inset(45% 0 40% 0)",
                "inset(75% 0 5% 0)",
              ],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className={cn(
              "absolute inset-0 z-0 opacity-50",
              variant === "white" ? "text-primary" : "text-white",
            )}
          >
            {text}
          </motion.span>
        </>
      )}
    </Component>
  );
}
