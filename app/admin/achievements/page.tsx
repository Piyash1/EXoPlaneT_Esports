"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Calendar,
  Users,
  LayoutGrid,
  List,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HudBadge } from "@/components/ui/HudBadge";
import AchievementDialog from "@/components/admin/AchievementDialog";
import { DeleteAchievementDialog } from "@/components/admin/DeleteAchievementDialog";

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [achievementToDelete, setAchievementToDelete] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/achievements");
      const result = await res.json();
      if (result.success) {
        setAchievements(result.data);
      } else {
        setError(result.error || "Failed to retrieve logs.");
      }
    } catch (err) {
      setError("Sync Error: Connection to database failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!achievementToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/admin/achievements/${achievementToDelete.id}`,
        {
          method: "DELETE",
        },
      );
      const result = await res.json();
      if (result.success) {
        setAchievementToDelete(null);
        fetchAchievements();
      }
    } catch (err) {
      setError("Failed to delete record.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (ach: any) => {
    setAchievementToDelete(ach);
  };

  const filteredAchievements = achievements.filter(
    (ach) =>
      ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ach.team.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-12 pb-24 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="space-y-4">
          <HudBadge label="Module: Hall of Fame" variant="danger" />
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase italic tracking-tighter">
              Achievement <span className="text-red-500">Logs</span>
            </h1>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-muted-foreground">
              Verified Operational Records
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            setSelectedAchievement(null);
            setIsDialogOpen(true);
          }}
          className="bg-red-600 hover:bg-red-500 text-white rounded-sm px-8 h-14 font-black italic uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:scale-105"
        >
          <Plus className="mr-2 w-5 h-5" /> Log Achievement
        </Button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-red-500 transition-colors" />
          <Input
            placeholder="FILTER BY TITLE OR TEAM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-black/40 border-white/10 text-white focus:border-red-500/50 uppercase font-mono text-xs tracking-widest rounded-sm"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
          <p className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-[0.4em]">
            Synchronizing Logs...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((ach, idx) => (
              <motion.div
                key={ach.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="absolute -inset-px bg-linear-to-b from-red-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-950 border border-white/5 p-6 rounded-lg space-y-4 hover:border-red-500/30 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedAchievement(ach);
                          setIsDialogOpen(true);
                        }}
                        className="p-2 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-red-500/30 text-white transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(ach)}
                        className="p-2 bg-red-500/5 border border-white/10 rounded-sm hover:bg-red-500/20 hover:border-red-500/50 text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-red-500 transition-colors">
                      {ach.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono font-bold uppercase tracking-widest">
                      <Users className="w-3 h-3" /> {ach.team.name}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground font-mono text-[10px]">
                      <Calendar className="w-3 h-3" />
                      {new Date(ach.date).getFullYear()}
                    </div>
                    <HudBadge label="Verified" variant="danger" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredAchievements.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/5 bg-white/2 rounded-lg">
              <AlertCircle className="w-12 h-12 text-white/5 mx-auto mb-4" />
              <p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-[0.3em]">
                No records found in current sector
              </p>
            </div>
          )}
        </div>
      )}

      <AchievementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        achievement={selectedAchievement}
        onSuccess={fetchAchievements}
      />

      <DeleteAchievementDialog
        achievement={achievementToDelete}
        isOpen={!!achievementToDelete}
        onClose={() => setAchievementToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
