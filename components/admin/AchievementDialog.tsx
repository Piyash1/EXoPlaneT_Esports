"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Loader2,
  Trophy,
  Calendar,
  Users,
  X,
  AlertCircle,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/ui/HudCard";
import { HudBadge } from "@/components/ui/HudBadge";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AchievementSchema } from "@/lib/validations";
import { uploadImageAction } from "@/app/actions/upload";

interface AchievementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  achievement?: any;
  onSuccess: () => void;
}

export default function AchievementDialog({
  open,
  onOpenChange,
  achievement,
  onSuccess,
}: AchievementDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      title: "",
      image: "",
      rank: "",
      date: new Date().toISOString().split("T")[0],
      teamId: "",
    },
  });

  const currentImage = watch("image");

  useEffect(() => {
    if (open) {
      fetchTeams();
      if (achievement) {
        reset({
          title: achievement.title || "",
          image: achievement.image || "",
          rank: achievement.rank || "",
          date: achievement.date
            ? new Date(achievement.date).toISOString().split("T")[0]
            : "",
          teamId: achievement.teamId || "",
        });
      } else {
        reset({
          title: "",
          image: "",
          rank: "",
          date: new Date().toISOString().split("T")[0],
          teamId: "",
        });
      }
    }
  }, [open, achievement, reset]);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/teams");
      const result = await res.json();
      if (result.success) setTeams(result.data);
    } catch (err) {
      console.error("Failed to fetch teams:", err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size too large. Max 5MB.");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const result = await uploadImageAction(base64String, "achievements");

        if (result.success && result.url) {
          setValue("image", result.url);
        } else {
          alert("Failed to upload image.");
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      alert("Error processing image.");
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const url = achievement
        ? `/api/admin/achievements/${achievement.id}`
        : "/api/admin/achievements";
      const method = achievement ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        onOpenChange(false);
        onSuccess();
      } else {
        alert(result.error || "Failed to log achievement.");
      }
    } catch (err) {
      alert("Communication with command center failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <HudCard
        variant="danger"
        className="w-full max-w-lg overflow-visible relative"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm border bg-red-500/10 border-red-500/20">
                <Trophy className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">
                  {achievement ? "Modify" : "Log New"}{" "}
                  <span className="text-red-500">Achievement</span>
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  Protocol: Verified Record Documentation
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-white/10 rounded-sm transition-colors text-muted-foreground hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Trophy className="w-3 h-3 text-red-500" />
                Achievement Title
              </label>
              <input
                {...register("title")}
                placeholder="PRO LEAGUE CHAMPIONS..."
                className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 placeholder:text-muted-foreground/30 font-mono uppercase italic font-bold"
              />
              {errors.title && (
                <span className="text-red-500 text-[10px] font-mono">
                  {errors.title.message as string}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-3 h-3 text-red-500" />
                  Responsible Team
                </label>
                <select
                  {...register("teamId")}
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 appearance-none font-mono uppercase"
                >
                  <option value="">SELECT TEAM</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {errors.teamId && (
                  <span className="text-red-500 text-[10px] font-mono">
                    {errors.teamId.message as string}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-red-500" />
                  Record Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 font-mono"
                />
                {errors.date && (
                  <span className="text-red-500 text-[10px] font-mono">
                    {errors.date.message as string}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-3 h-3 text-red-500" />
                Proof Image / Trophy (Optional)
              </label>

              <div className="flex items-center gap-4">
                {/* Preview Area */}
                <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-sm flex items-center justify-center overflow-hidden relative group">
                  {currentImage ? (
                    <Image
                      src={currentImage as string}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-white/20" />
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex-1">
                  <input
                    type="file"
                    ref={imageInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full h-10 border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider relative"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin mr-2" />
                        Uploading
                      </>
                    ) : (
                      <>
                        <Upload className="w-3 h-3 mr-2" />
                        {currentImage ? "Change Image" : "Upload File"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Trophy className="w-3 h-3 text-red-500" />
                Rank / Placement (Optional)
              </label>
              <input
                {...register("rank")}
                placeholder="#1, FINALIST, ETC."
                className="w-full h-10 bg-slate-900 border border-white/10 rounded-sm px-3 text-xs text-white focus:outline-none focus:border-red-500/50 placeholder:text-muted-foreground/30 font-mono uppercase"
              />
            </div>

            {/* Footer */}
            <div className="flex gap-4 pt-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-12 uppercase font-black italic tracking-widest text-xs border border-white/5 rounded-sm hover:bg-white/5"
              >
                Abort mission
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isUploading}
                className="flex-2 h-12 bg-red-600 hover:bg-red-500 text-white uppercase font-black italic tracking-widest text-xs rounded-sm transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : achievement ? (
                  "Finalize Log"
                ) : (
                  "Log Achievement"
                )}
              </Button>
            </div>
          </form>
        </div>
      </HudCard>
    </div>
  );
}
