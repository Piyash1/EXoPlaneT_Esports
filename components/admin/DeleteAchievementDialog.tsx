"use client";

import { Loader2, ShieldAlert, X, AlertTriangle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";

interface DeleteAchievementDialogProps {
  achievement: any | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteAchievementDialog({
  achievement,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteAchievementDialogProps) {
  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <HudCard variant="danger" className="w-full max-w-md overflow-visible">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-sm">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">
                  Record <span className="text-red-500">Expungement</span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest italic">
                  Critical Authorization Required
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

          <div className="h-px bg-white/5 w-full" />

          {/* Warning Content */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Irreversible Data Loss
                </p>
                <p className="text-[10px] text-red-500/70 leading-relaxed font-mono uppercase">
                  You are about to purge the achievement:{" "}
                  <span className="text-white font-black italic">
                    [{achievement.title.toUpperCase()}]
                  </span>{" "}
                  from the verified archives. This action cannot be reversed.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-sm">
              <Trophy className="w-4 h-4 text-red-500/50" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Linked Team: {achievement.team.name}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-4 pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-12 uppercase font-black italic tracking-widest text-xs border border-white/5 rounded-sm hover:bg-white/5"
            >
              Abort mission
            </Button>
            <Button
              disabled={isDeleting}
              onClick={onConfirm}
              className="flex-2 h-12 bg-red-500 hover:bg-red-600 text-white uppercase font-black italic tracking-widest text-xs rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02]"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Authorize Purge"
              )}
            </Button>
          </div>
        </div>
      </HudCard>
    </div>
  );
}
