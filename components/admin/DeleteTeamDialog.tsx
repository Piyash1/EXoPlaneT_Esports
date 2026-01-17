"use client";

import { Loader2, ShieldAlert, Trash2, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { cn } from "@/lib/utils";

interface DeleteTeamDialogProps {
  team: any | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteTeamDialog({
  team,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteTeamDialogProps) {
  if (!isOpen || !team) return null;

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
                  Unit <span className="text-red-500">Decommissioning</span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest italic">
                  Authorization Required
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
                  Irreversible Action Detected
                </p>
                <p className="text-[10px] text-red-500/70 leading-relaxed font-mono uppercase">
                  You are about to dismantle the{" "}
                  <span className="text-white font-black">[{team.name}]</span>{" "}
                  division. This will terminate all roster connections and
                  permanent personnel logs.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest text-center py-2">
              Type{" "}
              <span className="text-red-500 font-bold italic">"TERMINATE"</span>{" "}
              to confirm (Manual Override Coming Soon)
            </p>
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
              disabled={isDeleting}
              onClick={onConfirm}
              className="flex-2 h-12 bg-red-500 hover:bg-red-600 text-white uppercase font-black italic tracking-widest text-xs rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02]"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Deploy Destruction"
              )}
            </Button>
          </div>
        </div>
      </HudCard>
    </div>
  );
}
