"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  Shield,
  History,
  Users,
  Loader2,
  Activity,
  Cpu,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { ScanningTerminal } from "@/components/ui/ScanningTerminal";
import { cn } from "@/lib/utils"; // Assuming cn utility is available here

const stats = [
  { label: "OPERATIONS", value: "124", icon: Target, color: "primary" },
  { label: "SQUADS", value: "3", icon: Users, color: "secondary" },
  { label: "TROPHIES", value: "18", icon: Trophy, color: "warning" },
  { label: "RANK", value: "ELITE", icon: Shield, color: "primary" },
];

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/me");
        const result = await response.json();
        if (result.success) {
          const tryoutLogs = (result.data.tryouts || []).map((t: any) => ({
            id: t.id,
            text: `TRYOUT_REQUEST: ${t.game.toUpperCase()} [${t.status}]`,
            type:
              t.status === "APPROVED"
                ? "success"
                : t.status === "PENDING"
                  ? "warning"
                  : "error",
            timestamp: new Date(t.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
          setLogs(tryoutLogs);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full animate-pulse-slow" />
      </div>

      {/* Header HUD - Pilot Login Sequence */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <HudBadge label="Connection: Secure" variant="primary" />
            <HudBadge label="Sector: 7G-NEXUS" variant="secondary" />
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-white uppercase italic">
              Terminal <span className="text-primary">Online</span>
            </h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="w-8 h-1px bg-primary/50" />
              <p className="text-xs font-mono uppercase tracking-[0.3em]">
                OPERATOR:{" "}
                <span className="text-white font-bold">
                  {session.user.name}
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="px-6 py-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
              <Cpu className="w-3 h-3 text-primary" />
              Sync State
            </div>
            <div className="text-primary font-black tracking-tighter text-xl">
              ACTIVE
            </div>
          </div>
          <div className="px-6 py-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
              <Globe className="w-3 h-3 text-secondary" />
              Network
            </div>
            <div className="text-secondary font-black tracking-tighter text-xl">
              LOCAL
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid - Modular HUD Units */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <HudCard
            key={stat.label}
            variant={stat.color as any}
            delay={index * 0.1}
            className="group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={cn(
                  "p-2 rounded-sm bg-white/5 border border-white/10 group-hover:scale-110 transition-transform",
                  stat.color === "primary" ? "text-primary" : "text-secondary",
                )}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-[8px] font-mono opacity-30 uppercase tracking-[0.2em]">
                UNIT_{index + 1}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-4xl font-heading font-black text-white tracking-tighter">
                {stat.value}
              </p>
            </div>
          </HudCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Activity Terminal */}
        <div className="lg:col-span-2 h-[400px]">
          <ScanningTerminal
            logs={logs}
            title="SQUAD_TELEMETRY_LOGS"
            isScanning={isLoading}
          />
        </div>

        {/* Mission / Personal Profile Module */}
        <HudCard variant="ghost" className="relative group">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full border-2 border-primary/20 p-1 group-hover:border-primary/50 transition-all">
              <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-bold text-white uppercase italic tracking-wide">
                Squad Status
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">
                Operation: Vanguard
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative aspect-square sm:aspect-video rounded-sm border border-white/10 overflow-hidden">
              <Image
                src="/hero-about-bg.png"
                alt="Active Mission"
                fill
                className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <HudBadge label="Tier 1" variant="warning" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>Battle Readiness</span>
                  <span className="text-primary italic">92%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-linear-to-r from-primary via-cyan-400 to-secondary shadow-[0_0_15px_rgba(0,255,200,0.5)]"
                  />
                </div>
              </div>

              <Button
                onClick={() => router.push("/tryouts")}
                className="w-full h-12 bg-transparent border border-primary/30 text-primary text-xs font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 relative group/btn overflow-hidden rounded-sm"
              >
                <span className="relative z-10">Request Redeployment</span>
                <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform" />
              </Button>
            </div>
          </div>
        </HudCard>
      </div>
    </div>
  );
}
