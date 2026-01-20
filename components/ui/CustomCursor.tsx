"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-9999 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 50,
          mass: 0.1,
        }}
      />

      {/* Outer ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-9998"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "var(--primary)" : "rgba(0, 255, 200, 0.3)",
          backgroundColor: isHovering
            ? "rgba(0, 255, 200, 0.1)"
            : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        {/* Crosshair accents */}
        <div className="absolute top-1/2 left-0 w-1 h-px bg-primary/50 -translate-y-1/2 -translate-x-1" />
        <div className="absolute top-1/2 right-0 w-1 h-px bg-primary/50 -translate-y-1/2 translate-x-1" />
        <div className="absolute top-0 left-1/2 w-px h-1 bg-primary/50 -translate-x-1/2 -translate-y-1" />
        <div className="absolute bottom-0 left-1/2 w-px h-1 bg-primary/50 -translate-x-1/2 translate-y-1" />
      </motion.div>
    </>
  );
}
