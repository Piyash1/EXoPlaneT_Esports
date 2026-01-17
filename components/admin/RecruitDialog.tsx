"use client";

import { useState, useEffect } from "react";
import { Loader2, ShieldAlert, Swords, Target, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { cn } from "@/lib/utils";

interface RecruitDialogProps {
  tryout: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RecruitDialog({
  tryout,
  isOpen,
  onClose,
  onSuccess,
}: RecruitDialogProps) {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [role, setRole] = useState(tryout.role || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchTeams = async () => {
        setIsLoadingTeams(true);
        try {
          const res = await fetch("/api/teams");
          const result = await res.json();
          if (result.success) {
            setTeams(result.data);
            // Default to matching game if possible
            const matchingTeam = result.data.find((t: any) =>
              t.game?.name.toLowerCase().includes(tryout.game.toLowerCase()),
            );
            if (matchingTeam) setSelectedTeamId(matchingTeam.id);
          }
        } catch (error) {
          console.error("Failed to fetch teams:", error);
        } finally {
          setIsLoadingTeams(false);
        }
      };
      fetchTeams();
    }
  }, [isOpen, tryout.game]);

  const handleRecruit = async () => {
    if (!selectedTeamId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tryoutRequestId: tryout.id,
          teamId: selectedTeamId,
          role: role,
          ign: tryout.ign,
          fullName: tryout.name,
        }),
      });
      const result = await res.json();
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        alert(result.error || "Recruitment failed");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <HudCard variant="primary" className="w-full max-w-lg overflow-visible">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-primary/10 border border-primary/20">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">
                  Personnel{" "}
                  <span className="text-primary font-heading">Onboarding</span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  Target: {tryout.ign}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-sm transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Target className="w-3 h-3 text-primary" />
                Assigned Platoon (Team)
              </label>
              {isLoadingTeams ? (
                <div className="h-10 flex items-center px-4 bg-white/5 border border-white/10 rounded-sm italic text-xs text-muted-foreground animate-pulse">
                  Scanning active rosters...
                </div>
              ) : (
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-primary/50 appearance-none"
                >
                  <option value="">SELECT ROSTER</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.game.name})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Swords className="w-3 h-3 text-primary" />
                Combat Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. DUELIST, IGL, SUPPORT"
                className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground/30 font-mono"
              />
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/10 rounded-sm">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-[10px] text-primary/80 leading-relaxed font-mono uppercase">
                Execution will grant official [PLAYER] clearance and integrate
                candidate into the selected squad roster.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-12 uppercase font-black italic tracking-widest text-xs border border-white/5 rounded-sm hover:bg-white/5"
            >
              Abort
            </Button>
            <Button
              disabled={!selectedTeamId || isSubmitting}
              onClick={handleRecruit}
              className="flex-2 h-12 bg-primary hover:bg-primary-dark text-black uppercase font-black italic tracking-widest text-xs rounded-sm shadow-[0_0_20px_rgba(0,255,200,0.3)] transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Deploy Personnel"
              )}
            </Button>
          </div>
        </div>
      </HudCard>
    </div>
  );
}

import { X } from "lucide-react";
