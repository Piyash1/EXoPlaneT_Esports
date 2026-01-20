"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoloImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function HoloImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
}: HoloImageProps) {
  return (
    <div className={cn("relative group overflow-hidden", containerClassName)}>
      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] opacity-20 group-hover:opacity-40 transition-opacity duration-300" />

      {/* Tactical Glow */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-t from-primary/10 to-transparent" />

      {/* Edge Counters */}
      <div className="absolute top-2 left-2 z-30 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-px bg-primary" />
        <div className="w-px h-4 bg-primary" />
      </div>
      <div className="absolute bottom-2 right-2 z-30 opacity-40 rotate-180 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-px bg-primary" />
        <div className="w-px h-4 bg-primary" />
      </div>

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-all duration-700 group-hover:scale-110",
          className,
        )}
      />

      {/* Chromatic Aberration Filter (SVG) */}
      <svg className="hidden">
        <filter id="chromaticAberration">
          <feOffset in="SourceGraphic" dx="-2" dy="0" result="red" />
          <feOffset in="SourceGraphic" dx="2" dy="0" result="blue" />
          <feComposite in="red" in2="blue" operator="xor" />
        </filter>
      </svg>
    </div>
  );
}
