"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Plus,
  ShieldAlert,
  Swords,
  Trash2,
  Users,
  Edit3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LineupEditor } from "@/components/admin/LineupEditor";
import { TeamDialog } from "@/components/admin/TeamDialog";
import { DeleteTeamDialog } from "@/components/admin/DeleteTeamDialog";

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<any | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<any | null>(null);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/teams");
      const result = await res.json();
      if (result.success) {
        setTeams(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!teamToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/teams/${teamToDelete.id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setTeams((prev) => prev.filter((t) => t.id !== teamToDelete.id));
        setTeamToDelete(null);
      }
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteTeam = (team: any) => {
    setTeamToDelete(team);
  };

  const handleCreateNew = () => {
    setTeamToEdit(null);
    setIsDialogOpen(true);
  };

  const handleEditTeam = (team: any) => {
    setTeamToEdit(team);
    setIsDialogOpen(true);
  };

  const handleOpenLineup = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  // Find the selected team object from the list to ensure it's always the latest data
  const selectedTeam = teams.find((t) => t.id === selectedTeamId);

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <HudBadge label="Tactical" variant="danger" />
            <HudBadge label="Division Management" variant="secondary" />
          </div>
          <h1 className="text-4xl font-heading font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <ShieldAlert className="w-10 h-10 text-red-500" />
            Roster <span className="text-red-500">Nexus</span>
          </h1>
          <p className="text-muted-foreground text-[10px] uppercase font-mono tracking-[0.4em] mt-1 ml-1">
            Global Unit Deployment & Squad Configuration
          </p>
        </div>

        <Button
          onClick={handleCreateNew}
          className="bg-red-500 hover:bg-red-600 text-white gap-2 uppercase font-black italic tracking-widest text-xs h-12 px-8 rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Establish New Unit
        </Button>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4 border border-white/5 bg-black/20 rounded-lg">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Scanning Network For Units...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {teams.map((team) => (
            <HudCard key={team.id} variant="ghost" className="relative group">
              <div className="flex items-start gap-6">
                {/* Unit Icon/Logo */}
                <div className="relative w-20 h-20 rounded-sm border border-white/10 overflow-hidden bg-white/5 shrink-0">
                  {team.logoUrl ? (
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <Swords className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Unit Intel */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[8px] font-mono text-red-500 uppercase tracking-[0.2em] font-bold">
                      // {team.game?.name || "UNASSIGNED"} DIVISION
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTeam(team)}
                        className="p-1.5 hover:bg-white/10 rounded-sm transition-colors text-muted-foreground hover:text-white"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(team)}
                        className="p-1.5 hover:bg-red-500/20 rounded-sm transition-colors text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter mb-4 truncate">
                    {team.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-sm">
                      <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-2 mb-1">
                        <Users className="w-3 h-3 text-red-500" />
                        Personnel
                      </div>
                      <div className="text-xl font-heading font-black text-white italic">
                        {team._count?.players || 0}
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-sm">
                      <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-3 h-3 text-red-500" />
                        Status
                      </div>
                      <div className="text-[10px] font-mono text-white/80 uppercase">
                        Operational
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HUD Lineup Preview */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mb-4">
                  Current Deployment
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  {team.players?.length > 0 ? (
                    team.players.map((p: any) => (
                      <div
                        key={p.id}
                        className="px-2 py-1 bg-red-500/5 border border-red-500/20 text-red-500 rounded-sm"
                      >
                        {p.ign}{" "}
                        <span className="text-[8px] opacity-50">
                          [{p.role || "??"}]
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground/30 italic">
                      No personnel assigned to this unit.
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => handleOpenLineup(team.id)}
                  className="w-full h-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest"
                >
                  Enter Squadron Interface
                </Button>
              </div>
            </HudCard>
          ))}
          {teams.length === 0 && (
            <div className="col-span-full p-20 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
              <ShieldAlert className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-sm font-bold text-white/50 uppercase tracking-[0.2em]">
                No active divisions detected. Deploying recommended.
              </p>
            </div>
          )}
        </div>
      )}

      <DeleteTeamDialog
        isOpen={!!teamToDelete}
        team={teamToDelete}
        onClose={() => setTeamToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

      {/* Team Dialog (Create/Edit) */}
      <TeamDialog
        isOpen={isDialogOpen}
        team={teamToEdit}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={fetchTeams}
      />

      {/* Lineup Editor Overlay */}
      {selectedTeam && (
        <LineupEditor
          team={selectedTeam}
          isOpen={!!selectedTeamId}
          onClose={() => setSelectedTeamId(null)}
          onUpdate={fetchTeams}
        />
      )}
    </div>
  );
}
