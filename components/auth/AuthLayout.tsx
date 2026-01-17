"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black py-12 px-4">
      {/* Go Back to Home */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">
          Return Home
        </span>
      </Link>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg-pubg.png" // Reusing the high-quality asset
          alt="Auth Background"
          fill
          className="object-cover opacity-40 grayscale-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.15),transparent_70%)]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-0 mix-blend-overlay" />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[450px] relative z-10"
      >
        <div className="text-center mb-8 space-y-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white"
          >
            EXO<span className="text-primary">PLANET</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px w-24 bg-linear-to-r from-transparent via-primary to-transparent mx-auto"
          />
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] font-bold">
            {subtitle}
          </p>
        </div>

        <div className="glass backdrop-blur-3xl border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Decorative Corner Glows */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 blur-2xl rounded-full group-hover:bg-primary/20 transition-colors" />
          <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-secondary/10 blur-2xl rounded-full" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
            {children}
          </div>
        </div>

        {/* Footer Link / Info */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EXOPLANET ESPORTS. ALL RIGHTS
          RESERVED.
        </p>
      </motion.div>
    </div>
  );
}
