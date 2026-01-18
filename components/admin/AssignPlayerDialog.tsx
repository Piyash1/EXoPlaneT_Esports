"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Search,
  Target,
  UserPlus,
  X,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AssignPlayerDialogProps {
  teamId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AssignPlayerDialog({
  teamId,
  isOpen,
  onClose,
  onSuccess,
}: AssignPlayerDialogProps) {
  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/players");
      const result = await res.json();
      if (result.success) {
        setPlayers(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch players:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchPlayers();
  }, [isOpen]);

  const handleAssign = async (playerId: string) => {
    setIsSubmitting(playerId);
    try {
      const res = await fetch(`/api/players/${playerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId }),
      });
      const result = await res.json();
      if (result.success) {
        onSuccess();
        fetchPlayers(); // Refresh list to show updated status
      }
    } catch (err) {
      console.error("Assignment failed:", err);
    } finally {
      setIsSubmitting(null);
    }
  };

  const filteredPlayers = players.filter(
    (p) =>
      p.ign.toLowerCase().includes(search.toLowerCase()) ||
      p.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <HudCard variant="primary" className="w-full max-w-xl overflow-visible">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-primary/10 border border-primary/20">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">
                  Assign{" "}
                  <span className="text-primary font-heading">Personnel</span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  Global Operative Database
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

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search operatives by IGN or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 text-xs text-white focus:outline-none focus:border-primary/50 font-mono uppercase tracking-wider"
            />
          </div>

          {/* Players List */}
          <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-4 border border-dashed border-white/5 rounded-sm">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Scanning Database...
                </p>
              </div>
            ) : filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-sm hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-sm overflow-hidden border border-white/10 bg-black/20">
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt={player.ign}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                          <Target className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white uppercase font-mono tracking-tight">
                        {player.ign}
                      </div>
                      <div className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        {player.team ? (
                          <span className="text-red-500 font-bold italic line-clamp-1">
                            // Assigned: {player.team.name}
                          </span>
                        ) : (
                          <span className="text-primary font-bold line-clamp-1">
                            // Status: Unassigned
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={
                      player.teamId === teamId || isSubmitting === player.id
                    }
                    onClick={() => handleAssign(player.id)}
                    className={cn(
                      "h-9 px-4 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all",
                      player.teamId === teamId
                        ? "bg-white/5 text-muted-foreground cursor-not-allowed"
                        : "bg-primary hover:bg-primary-dark text-black",
                    )}
                  >
                    {isSubmitting === player.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : player.teamId === teamId ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      "Transfer"
                    )}
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border border-dashed border-white/5 rounded-sm opacity-50">
                <p className="text-[10px] font-mono uppercase tracking-widest">
                  No operatives found in current sector
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 flex justify-between items-center border-t border-white/5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-red-500" />
              <span className="text-[8px] text-muted-foreground uppercase font-mono tracking-widest">
                Manual override active
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-10 px-6 text-[10px] font-black uppercase tracking-widest border border-white/5"
            >
              Close DB
            </Button>
          </div>
        </div>
      </HudCard>
    </div>
  );
}

import { Check } from "lucide-react";
