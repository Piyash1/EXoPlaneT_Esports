"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Swords,
  Trophy,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Cpu,
  Server,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { ScanningTerminal } from "@/components/ui/ScanningTerminal";
import DashboardLoading from "./loading";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    tryouts: 0,
    pendingTryouts: 0,
    activePlayers: 0,
  });
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            setStats(result.data);

            // Mocking some system logs for the terminal
            setLogs([
              {
                id: "1",
                text: "CORE_ENGINE: SYSTEM_OOT_READY",
                timestamp: "04:00",
                type: "success" as const,
              },
              {
                id: "2",
                text: "DATABASE: LATENCY_7MS",
                timestamp: "04:02",
                type: "info" as const,
              },
              {
                id: "3",
                text: "SECURITY: BRUTE_FORCE_PREVENTED [IP: 192.x.x.x]",
                timestamp: "04:15",
                type: "warning" as const,
              },
              {
                id: "4",
                text: `USERS: ${result.data.users} IDENTITIES_SYNCED`,
                timestamp: "04:30",
                type: "info" as const,
              },
            ]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch admin stats");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="space-y-12 relative pb-12">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Header - Tactical Command Center */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <HudBadge label="Clearance: Level 5" variant="danger" />
            <HudBadge label="Status: High Alert" variant="warning" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase italic tracking-tighter">
              Command <span className="text-red-500">Center</span>
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="w-12 h-0.5 bg-red-600/50" />
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">
                System Master Access
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <HudCard
            variant="ghost"
            className="p-4 py-3 min-w-[140px] text-center border-red-500/10"
            showScanningLine={false}
          >
            <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-2">
              <Zap className="w-3 h-3 text-red-500" />
              Neural Link
            </div>
            <div className="text-red-500 font-black tracking-tighter text-xl">
              CONNECTED
            </div>
          </HudCard>
          <HudCard
            variant="ghost"
            className="p-4 py-3 min-w-[140px] text-center border-red-500/10"
            showScanningLine={false}
          >
            <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-2">
              <Server className="w-3 h-3 text-red-500" />
              Storage
            </div>
            <div className="text-red-500 font-black tracking-tighter text-xl">
              98% FREE
            </div>
          </HudCard>
        </div>
      </div>

      {/* Stats Grid - High Alert Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HudCard variant="danger" className="relative group">
          <div className="flex justify-between items-start mb-4">
            <Users className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-mono text-red-500/50">
              MTRC_USR_01
            </span>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Global Users
          </p>
          <p className="text-4xl font-heading font-black text-white">
            {stats.users}
          </p>
        </HudCard>

        <HudCard variant="danger" className="relative group" delay={0.1}>
          <div className="flex justify-between items-start mb-4">
            <Swords className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-mono text-red-500/50">
              MTRC_APP_02
            </span>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Applications
          </p>
          <p className="text-4xl font-heading font-black text-white">
            {stats.tryouts}
          </p>
        </HudCard>

        <HudCard variant="danger" className="relative group" delay={0.2}>
          <div className="flex justify-between items-start mb-4">
            <Activity className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-mono text-red-500/50">
              ALRT_PND_03
            </span>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Pending Review
          </p>
          <p className="text-4xl font-heading font-black text-red-500 italic">
            {stats.pendingTryouts}
          </p>
        </HudCard>

        <HudCard variant="danger" className="relative group" delay={0.3}>
          <div className="flex justify-between items-start mb-4">
            <Trophy className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-mono text-red-500/50">
              MTRC_PLR_04
            </span>
          </div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Elite Roster
          </p>
          <p className="text-4xl font-heading font-black text-white">
            {stats.activePlayers}
          </p>
        </HudCard>
      </div>

      {/* Main Command View */}
      <div className="grid lg:grid-cols-3 gap-8 h-[450px]">
        <div className="lg:col-span-2">
          <ScanningTerminal
            logs={logs}
            title="SYSTEM_DIAGNOSTIC_FEED"
            isScanning={isLoading}
            className="border-red-500/10"
          />
        </div>

        <HudCard
          variant="danger"
          className="flex flex-col h-full bg-red-950/10 border-red-500/20"
        >
          <h2 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            Security Matrix
          </h2>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">
                  Firewall Integrity
                </span>
                <span className="text-red-500">99.8%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "99.8%" }}
                  className="h-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                />
              </div>
            </div>

            <div className="p-4 rounded-sm bg-red-500/5 border border-red-500/10 space-y-3">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-red-500/70">
                <span>Node Status</span>
                <span>Uptime</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">DB_PRIMARY</span>
                  <span className="text-green-500">99.9%</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">API_GATEWAY</span>
                  <span className="text-green-500">100%</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground">CDN_NEXUS</span>
                  <span className="text-yellow-500">84.2%</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-4 mt-auto border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300">
            System Overhaul
          </button>
        </HudCard>
      </div>
    </div>
  );
}
