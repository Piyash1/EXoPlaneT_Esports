"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  Rocket,
  Trophy,
  Target,
  Zap,
  Shield,
  Activity,
  History,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "MATCHES", value: "124", icon: Target, color: "text-primary" },
  { label: "ROSTERS", value: "3", icon: Users, color: "text-secondary" },
  {
    label: "ACHIEVEMENTS",
    value: "18",
    icon: Trophy,
    color: "text-yellow-500",
  },
  { label: "LEVEL", value: "ELITE", icon: Shield, color: "text-cyan-400" },
];

const recentActivity = [
  {
    type: "TRIALS",
    event: "CS2 ROSTER TRYOUT",
    status: "PENDING",
    date: "2H AGO",
  },
  {
    type: "AWARD",
    event: "BATTLE-HARDENED BADGE",
    status: "UNLOCKED",
    date: "1D AGO",
  },
  {
    type: "JOIN",
    event: "JOINED VALORANT SQUAD",
    status: "SUCCESS",
    date: "3D AGO",
  },
];

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [tryouts, setTryouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/me");
        const result = await response.json();
        if (result.success) {
          setTryouts(result.data.tryouts || []);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.3em]">
            <Activity className="w-4 h-4 animate-pulse" />
            System Live: Squad Terminal
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-white">
            WELCOME BACK,{" "}
            <span className="text-primary uppercase">
              {session.user.name.split(" ")[0]}
            </span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md">
            System connection established. Current sector: 7G. Ready for
            operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex gap-4"
        >
          <div className="p-4 glass rounded-xl border border-white/10 text-center min-w-[120px]">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
              Status
            </div>
            <div className="text-primary font-bold">READY</div>
          </div>
          <div className="p-4 glass rounded-xl border border-white/10 text-center min-w-[120px]">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
              Connection
            </div>
            <div className="text-secondary font-bold">SECURE</div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
            <div className="space-y-1 relative z-10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-3xl font-heading font-black text-white">
                {stat.value}
              </p>
            </div>
            {/* HUD Corner Detail */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-primary/50" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-primary/50" />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-2xl border border-white/5 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-heading font-bold text-white flex items-center gap-2 uppercase tracking-wide">
              <History className="w-5 h-5 text-primary" />
              Recent Logs
            </h3>
            <span className="text-[10px] text-muted-foreground font-mono">
              X-84-TRANS-LOG
            </span>
          </div>
          <div className="p-6 space-y-6 grow">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-xs font-mono uppercase tracking-widest">
                  Accessing Logs...
                </p>
              </div>
            ) : tryouts.length > 0 ? (
              tryouts.map((tryout, idx) => (
                <div
                  key={tryout.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        tryout.status === "PENDING"
                          ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                          : tryout.status === "APPROVED"
                            ? "bg-primary shadow-[0_0_8px_rgba(0,255,200,0.5)]"
                            : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      }`}
                    />
                    <div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                        APPLICATION
                      </div>
                      <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {tryout.game} Tryout Request
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 ${
                        tryout.status === "PENDING"
                          ? "text-yellow-500"
                          : tryout.status === "APPROVED"
                            ? "text-primary"
                            : "text-red-500"
                      }`}
                    >
                      {tryout.status}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1 font-mono uppercase">
                      {new Date(tryout.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-4 border border-dashed border-white/10 rounded-xl">
                <AlertCircle className="w-10 h-10 opacity-20" />
                <div className="text-center">
                  <p className="text-sm font-bold text-white/50 uppercase tracking-widest">
                    No active logs detected
                  </p>
                  <p className="text-[10px] mt-1 mb-4">
                    Submit a tryout request to join a roster.
                  </p>
                  <Button
                    onClick={() => router.push("/tryouts")}
                    size="sm"
                    variant="neon"
                    className="text-[10px] font-black tracking-widest py-1"
                  >
                    START APPLICATION
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mission Status / Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl border border-white/5 p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          <h3 className="font-heading font-bold text-white mb-6 uppercase tracking-wide">
            Squad Status
          </h3>

          <div className="space-y-8">
            <div className="relative aspect-video rounded-xl border border-white/10 overflow-hidden">
              <Image
                src="/hero-bg-pubg.png"
                alt="Active Mission"
                fill
                className="object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">
                  Current Roster
                </div>
                <div className="text-white font-bold text-lg">
                  VALORANT ELITE SQUAD
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>Roster Level</span>
                  <span>75%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-linear-to-r from-primary to-cyan-400 shadow-[0_0_10px_rgba(0,255,200,0.5)]"
                  />
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all duration-300">
                Member Settings
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
