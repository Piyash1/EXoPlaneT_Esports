"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  ShieldCheck,
  Swords,
  X,
  Upload,
  Target,
  Check,
  AlertCircle,
  Plus,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TeamDialogProps {
  team?: any | null; // If present, edit mode
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TeamDialog({
  team,
  isOpen,
  onClose,
  onSuccess,
}: TeamDialogProps) {
  const [games, setGames] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");
  const [wins, setWins] = useState(0);
  const [rank, setRank] = useState("Tier 1");
  const [readiness, setReadiness] = useState(100);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchGames();
      if (team) {
        setName(team.name);
        setGameId(team.gameId);
        setWins(team.wins || 0);
        setRank(team.rank || "Tier 1");
        setReadiness(team.readiness || 100);
        setPreviewUrl(team.logoUrl);
      } else {
        setName("");
        setGameId("");
        setWins(0);
        setRank("Tier 1");
        setReadiness(100);
        setPreviewUrl(null);
      }
      setLogoBase64(null);
      setError(null);
    }
  }, [isOpen, team]);

  const fetchGames = async () => {
    setIsLoadingGames(true);
    try {
      const res = await fetch("/api/games");
      const result = await res.json();
      if (result.success) setGames(result.data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setIsLoadingGames(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoBase64(base64);
        setPreviewUrl(base64);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!name || !gameId) {
      setError("Name and Game are required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const method = team ? "PATCH" : "POST";
      const url = team ? `/api/teams/${team.id}` : "/api/teams";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gameId,
          wins,
          rank,
          readiness,
          logoUrl: logoBase64 || previewUrl || "", // Send base64 or existing URL
        }),
      });

      const result = await res.json();
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error || "Operation failed");
      }
    } catch (err) {
      setError("A connection error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <HudCard
        variant={team ? "secondary" : "primary"}
        className="w-full max-w-lg overflow-visible"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-sm border",
                  team
                    ? "bg-secondary/10 border-secondary/20"
                    : "bg-primary/10 border-primary/20",
                )}
              >
                {team ? (
                  <Edit3 className="w-5 h-5 text-secondary" />
                ) : (
                  <Plus className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter transition-all">
                  {team ? "Modify" : "Establish"}{" "}
                  <span
                    className={cn(
                      "font-heading",
                      team ? "text-secondary" : "text-primary",
                    )}
                  >
                    Squadron Unit
                  </span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  {team
                    ? `Unit ID: ${team.id.slice(0, 8)}`
                    : "Initializing New Asset"}
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

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center gap-3 text-red-500 text-[10px] font-mono uppercase tracking-widest animate-pulse">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Logo Upload */}
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="relative group cursor-pointer">
                <div
                  className={cn(
                    "w-24 h-24 rounded-sm border border-dashed flex items-center justify-center overflow-hidden bg-white/5 transition-all group-hover:bg-white/10",
                    previewUrl ? "border-white/20" : "border-white/10",
                  )}
                >
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground/30" />
                  )}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white">
                      Choose Logo
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>
              <p className="text-[8px] text-muted-foreground uppercase font-mono tracking-widest">
                Recommended: Square PNG/SVG (Max 2MB)
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Target className="w-3 h-3 text-red-500" />
                Unit Signature (Name)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter unit name..."
                className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 placeholder:text-muted-foreground/30 font-mono uppercase"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-red-500" />
                Operational Area (Game)
              </label>
              {isLoadingGames ? (
                <div className="h-10 flex items-center px-4 bg-white/5 border border-white/10 rounded-sm italic text-xs text-muted-foreground animate-pulse">
                  Scanning available areas...
                </div>
              ) : (
                <select
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 appearance-none font-mono"
                >
                  <option value="">SELECT AREA</option>
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name} ({game.type})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  Wins
                </label>
                <input
                  type="number"
                  value={wins}
                  onChange={(e) => setWins(parseInt(e.target.value) || 0)}
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  Rank
                </label>
                <input
                  type="text"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="Tier 1"
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  Ready %
                </label>
                <input
                  type="number"
                  value={readiness}
                  max={100}
                  min={0}
                  onChange={(e) =>
                    setReadiness(
                      Math.min(100, Math.max(0, parseInt(e.target.value) || 0)),
                    )
                  }
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-12 uppercase font-black italic tracking-widest text-xs border border-white/5 rounded-sm hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting || !name || !gameId}
              onClick={handleSubmit}
              className={cn(
                "flex-2 h-12 uppercase font-black italic tracking-widest text-xs rounded-sm transition-all hover:scale-[1.02] text-black",
                team
                  ? "bg-secondary hover:bg-secondary-dark shadow-[0_0_20px_rgba(30,58,138,0.3)]"
                  : "bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(0,255,200,0.3)]",
              )}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : team ? (
                "Commence Update"
              ) : (
                "Authorize Deployment"
              )}
            </Button>
          </div>
        </div>
      </HudCard>
    </div>
  );
}
