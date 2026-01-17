"use client";

import { useEffect, useState } from "react";
import { Users, Swords, Trophy, Activity, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "text-white",
  delay = 0,
}: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group"
  >
    <div
      className={cn(
        "absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity",
        color,
      )}
    >
      <Icon className="w-16 h-16" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-5 h-5", color)} />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="text-4xl font-heading font-black text-white mb-2">
        {value}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs font-bold text-green-500">
          <ArrowUpRight className="w-3 h-3" />
          {trend} this week
        </div>
      )}
    </div>
  </motion.div>
);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    tryouts: 0,
    pendingTryouts: 0,
    activePlayers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            setStats(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch admin stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">
          Command Center
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          System Overview & Metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          color="text-primary"
          trend="+12%"
        />
        <StatCard
          title="Total Applications"
          value={stats.tryouts}
          icon={Swords}
          color="text-secondary"
          delay={0.1}
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingTryouts}
          icon={Activity}
          color="text-yellow-500"
          delay={0.2}
          trend={stats.pendingTryouts > 5 ? "Action Required" : null}
        />
        <StatCard
          title="Active Roster"
          value={stats.activePlayers}
          icon={Trophy}
          color="text-red-500"
          delay={0.3}
        />
      </div>

      {/* Recent Actions Section (Placeholder) */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide mb-4">
            System Logs
          </h2>
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border border-dashed border-white/10 rounded-xl">
            NO RECENT SYSTEM ALERTS
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20">
          <h2 className="text-lg font-bold text-red-500 uppercase tracking-wide mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 animate-pulse" />
            Live Status
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Database</span>
              <span className="text-green-500 font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">API Gateway</span>
              <span className="text-green-500 font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discord Bot</span>
              <span className="text-yellow-500 font-bold">MAINTENANCE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
