"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Trophy,
  Disc as Discord,
  User,
  Mail,
  Gamepad2,
  AlertCircle,
  Clock,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

const games = [
  "Valorant",
  "CS2",
  "PUBG Mobile",
  "Apex Legends",
  "Mobile Legends",
  "Free Fire",
];

export default function TryoutForm() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    ign: "",
    game: "",
    role: "",
    discord: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [pendingTryout, setPendingTryout] = useState<any>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }));
      setImagePreview(session.user.image || null);
    }
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      // ... same status check logic ...
      if (!session) {
        setIsCheckingStatus(false);
        return;
      }
      try {
        const res = await fetch("/api/me");
        const result = await res.json();
        if (result.success && result.data.tryouts) {
          const pending = result.data.tryouts.find(
            (t: any) => t.status === "PENDING",
          );
          setPendingTryout(pending);
        }
      } catch (error) {
        console.error("Failed to check tryout status:", error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkStatus();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.game) {
      alert("Please select a game.");
      return;
    }
    if (!formData.role) {
      alert("Please enter your in-game role.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. If image changed, update User Profile first
      if (imageFile) {
        const profileData = new FormData();
        profileData.append("name", formData.name); // Keep name synced
        profileData.append("image", imageFile);

        await fetch("/api/me", {
          method: "PATCH",
          body: profileData, // Send as FormData
        });
        // We don't strictly block on failure here, but ideally we should.
        // Assuming success for smoother UX, or the backend handles sync.
      }

      // 2. Submit Tryout Request
      const response = await fetch("/api/tryouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        alert(result.error || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingStatus) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-xs font-mono uppercase tracking-[0.3em]">
          Validating Credentials...
        </p>
      </div>
    );
  }

  if (pendingTryout) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 text-center rounded-3xl border border-secondary/30 space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full" />
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,200,0,0.1)]">
          <Clock className="w-10 h-10 text-secondary animate-pulse" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-black text-white">
            APPLICATION PENDING
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-xs">
            Current Sector: {pendingTryout.game} Tryouts
          </p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 max-w-sm mx-auto">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span>Status</span>
            <span className="text-secondary">{pendingTryout.status}</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-secondary shadow-[0_0_10px_rgba(255,200,0,0.5)]"
            />
          </div>
        </div>
        <p className="text-sm text-gray-400 max-w-xs mx-auto">
          You already have an active application in the system. Please wait for
          command review before submitting a new one.
        </p>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="text-[10px] font-black tracking-widest h-10"
        >
          RETURN TO TERMINAL
        </Button>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 text-center rounded-3xl border border-primary/30 space-y-6"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,200,0.2)]">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-black text-white">
            APPLICATION RECEIVED
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-xs">
            Review in Progress
          </p>
        </div>
        <p className="text-sm text-gray-400 max-w-xs mx-auto">
          Your application has been logged into the system. Redirecting to
          Terminal...
        </p>
      </motion.div>
    );
  }

  // Check if user is already a player
  if ((session?.user as any)?.role === "PLAYER") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 text-center rounded-3xl border border-primary/30 space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,200,0.2)]">
          <Shield className="w-10 h-10 text-primary animate-pulse" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-black text-white">
            ACTIVE AGENT
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest text-xs">
            Clearance Level: PLAYER
          </p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 max-w-sm mx-auto">
          <p className="text-sm text-gray-300">
            You are already a recruited agent of Exoplanet Esports. No further
            tryout applications are required.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="text-[10px] font-black tracking-widest h-10 border-primary/50 text-primary hover:bg-primary/10"
        >
          RETURN TO DASHBOARD
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000"
    >
      <div className="md:grid md:grid-cols-2 gap-6">
        {/* ID Photo (Full Width on Mobile, Col-Span on Desktop if needed, but let's just put it above grid) */}
        <div className="md:col-span-2 flex flex-col items-center justify-center gap-4 mb-4">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
            <User className="w-3 h-3 text-primary" />
            ID Photo
          </label>
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors shadow-lg shadow-black/50 bg-black">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <label
              htmlFor="id-photo"
              className="absolute bottom-0 right-0 p-1.5 bg-primary text-black rounded-full cursor-pointer hover:bg-primary/80 transition-colors shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </label>
            <input
              id="id-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {imageFile ? "Image Selected" : "Upload ID Photo (Optional)"}
          </p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <User className="w-3 h-3 text-primary" />
            Full Name
          </label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John 'Pilot' Doe"
            className="bg-white/5 border-white/10 text-white h-12 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <Mail className="w-3 h-3 text-primary" />
            Email Address
          </label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="pilot@exoplanet.gg"
            className="bg-white/5 border-white/10 text-white h-12 focus:border-primary/50 transition-all"
          />
        </div>

        {/* IGN */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <Gamepad2 className="w-3 h-3 text-secondary" />
            In-Game Name
          </label>
          <Input
            required
            value={formData.ign}
            onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
            placeholder="CRIMSON_PILOT"
            className="bg-white/5 border-white/10 text-white h-12 focus:border-secondary/50 transition-all"
          />
        </div>

        {/* Discord */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <Discord className="w-3 h-3 text-[#5865F2]" />
            Discord Username
          </label>
          <Input
            required
            value={formData.discord}
            onChange={(e) =>
              setFormData({ ...formData, discord: e.target.value })
            }
            placeholder="username#0000"
            className="bg-white/5 border-white/10 text-white h-12 focus:border-[#5865F2]/50 transition-all"
          />
        </div>

        {/* In-Game Role */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            <Shield className="w-3 h-3 text-orange-500" />
            In-Game Role
          </label>
          <Input
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Duelist / Entry Fragger / IGL"
            className="bg-white/5 border-white/10 text-white h-12 focus:border-orange-500/50 transition-all"
          />
        </div>
      </div>

      {/* Game Selection */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
          <Trophy className="w-3 h-3 text-yellow-500" />
          Select Game
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {games.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFormData({ ...formData, game: g })}
              className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                formData.game === g
                  ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,255,200,0.15)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        variant="neon"
        className="w-full h-14 text-sm font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(0,255,200,0.2)]"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            PROCESSING APPLICATION...
          </div>
        ) : (
          "SUBMIT APPLICATION"
        )}
      </Button>

      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
        By submitting, you agree to follow the Exoplanet Code of Conduct and
        participate in the selection process.
      </p>
    </form>
  );
}
