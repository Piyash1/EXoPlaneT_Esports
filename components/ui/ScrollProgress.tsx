"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-100"
      style={{ scaleX }}
    >
      <div className="absolute top-0 right-0 w-[100px] h-full bg-linear-to-l from-primary to-transparent blur-[2px]" />
      <div className="absolute top-0 right-0 w-[20px] h-[4px] bg-white blur-xs -translate-y-px" />
    </motion.div>
  );
}
