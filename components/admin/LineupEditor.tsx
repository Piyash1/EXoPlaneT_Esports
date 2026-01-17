"use client";

import { useState } from "react";
import {
  Loader2,
  ShieldCheck,
  Swords,
  Trash2,
  UserMinus,
  UserPlus,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AssignPlayerDialog } from "./AssignPlayerDialog";

interface LineupEditorProps {
  team: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function LineupEditor({
  team,
  isOpen,
  onClose,
  onUpdate,
}: LineupEditorProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<"lineup" | "settings">("lineup");
  const [isAssigning, setIsAssigning] = useState(false);

  const handleRemovePlayer = async (playerId: string) => {
    if (!confirm("RELEASE PERSONNEL FROM ACTIVE DUTY?")) return;
    setIsUpdating(true);
    try {
      // We'll create a player-specific API or use a general PATCH for player
      const res = await fetch(`/api/players/${playerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId: null }),
      });
      const result = await res.json();
      if (result.success) onUpdate();
    } catch (error) {
      console.error("Cleanup failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <HudCard
        variant="ghost"
        className="w-full max-w-2xl overflow-visible bg-slate-950/50"
      >
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center">
                <Swords className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter">
                  {team.name}{" "}
                  <span className="text-red-500 font-heading">
                    SQUAD INTERFACE
                  </span>
                </h3>
                <p className="text-[9px] text-muted-foreground font-mono uppercase tracking-[0.3em]">
                  Operational Area: {team.game?.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-sm transition-colors group"
            >
              <X className="w-5 h-5 text-muted-foreground group-hover:text-white" />
            </button>
          </div>

          <div className="flex gap-4 border-b border-white/5 pb-4">
            <button
              onClick={() => setActiveTab("lineup")}
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-sm transition-all",
                activeTab === "lineup"
                  ? "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  : "text-muted-foreground hover:text-white hover:bg-white/5",
              )}
            >
              Lineup Management
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={cn(
                "text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-sm transition-all",
                activeTab === "settings"
                  ? "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  : "text-muted-foreground hover:text-white hover:bg-white/5",
              )}
            >
              Unit Parameters
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[300px]">
            {activeTab === "lineup" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                    Active Personnel
                  </h4>
                  <HudBadge
                    label={`${team.players?.length || 0} / 5`}
                    variant="secondary"
                  />
                </div>

                <div className="grid gap-3">
                  {team.players?.length > 0 ? (
                    team.players.map((player: any) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-sm group hover:border-red-500/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-sm border border-white/10 bg-black/20 overflow-hidden relative">
                            {player.image ? (
                              <Image
                                src={player.image}
                                alt={player.ign}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center opacity-20">
                                <UserMinus className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white uppercase font-mono">
                              {player.ign}
                            </div>
                            <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest italic">
                              {player.role || "UNASSIGNED"}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemovePlayer(player.id)}
                          className="p-2 text-muted-foreground/30 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all opacity-0 group-hover:opacity-100"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center border border-dashed border-white/5 rounded-sm">
                      <p className="text-[10px] font-mono uppercase text-muted-foreground opacity-30">
                        Unit currently unmanned
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={() => setIsAssigning(true)}
                    className="w-full h-12 mt-4 bg-white/5 hover:bg-white/10 text-white border border-dashed border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Assign Personnel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-12 text-center opacity-50">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-xs font-mono uppercase tracking-widest">
                  Parameter manipulation coming soon...
                </p>
              </div>
            )}
          </div>

          <AssignPlayerDialog
            teamId={team.id}
            isOpen={isAssigning}
            onClose={() => setIsAssigning(false)}
            onSuccess={onUpdate}
          />

          {/* Footer */}
          <div className="pt-8 flex justify-end">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-10 text-[10px] font-black uppercase tracking-widest italic"
            >
              Close Interface
            </Button>
          </div>
        </div>
      </HudCard>
    </div>
  );
}
