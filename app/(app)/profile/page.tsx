"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Camera,
  Settings2,
  Lock,
  ExternalLink,
  Rocket,
  Check,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { uploadAvatarAction } from "@/app/actions/upload";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name);
    }
  }, [session]);

  if (isPending || !session) return null;

  const user = session.user as any;

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsUpdating(true);
    try {
      await authClient.updateUser({
        name: name.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setIsEditing(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setIsUploadingAvatar(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        const result = await uploadAvatarAction(base64String);
        if (result.success && result.url) {
          await authClient.updateUser({
            image: result.url,
          });
        } else {
          alert(
            "Failed to upload avatar: " + (result.error || "Unknown error"),
          );
        }
      } catch (error) {
        console.error("Avatar upload error:", error);
        alert("An error occurred while uploading the avatar.");
      } finally {
        setIsUploadingAvatar(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Card Header */}
        <div className="glass rounded-3xl border border-white/5 overflow-hidden">
          <div className="h-32 bg-linear-to-r from-primary/20 via-primary/5 to-secondary/20 relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          </div>
          <div className="px-8 pb-8 flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12 relative z-10">
            <div className="relative group">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
              />
              <div className="w-32 h-32 rounded-3xl border-4 border-black bg-black overflow-hidden shadow-2xl relative">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  fill
                  className={`object-cover transition-opacity duration-300 ${isUploadingAvatar ? "opacity-30" : "opacity-100"}`}
                />
                {isUploadingAvatar && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl disabled:cursor-not-allowed"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="grow space-y-2">
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl font-heading font-black text-white bg-white/5 border-primary/30 h-10 w-full max-w-sm"
                    autoFocus
                  />
                ) : (
                  <h1 className="text-3xl font-heading font-black text-white">
                    {user.name}
                  </h1>
                )}
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-tighter flex items-center gap-1.5 shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                  {user.role}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Member Since {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isUpdating}
                  size="sm"
                  className="bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest px-4"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold uppercase tracking-widest border-white/10 hover:bg-white/5 px-4"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="h-10 text-xs font-bold uppercase tracking-widest border-white/10 hover:bg-white/5"
              >
                <Settings2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Account Information */}
            <div className="glass rounded-2xl border border-white/5 p-8 space-y-6">
              <h3 className="font-heading font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Player Identity
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    Display Name
                  </label>
                  <Input
                    value={isEditing ? name : user.name}
                    onChange={
                      isEditing ? (e) => setName(e.target.value) : undefined
                    }
                    readOnly={!isEditing}
                    className={`bg-white/5 border-white/10 text-white ${
                      isEditing
                        ? "border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20"
                        : "cursor-default focus:ring-0"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    System Role
                  </label>
                  <Input
                    value={user.role}
                    readOnly
                    className="bg-white/5 border-white/10 text-white cursor-default focus:ring-0"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <Input
                    value={user.email}
                    readOnly
                    className="bg-white/5 border-white/10 text-white cursor-default focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="glass rounded-2xl border border-white/5 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Lock className="w-5 h-5 text-secondary" />
                  Security Protocols
                </h3>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest animate-pulse">
                  Encryption Active
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">
                      Password Management
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Update your account password
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10"
                  >
                    CHANGE PASSWORD
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">
                      Linked Accounts
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Manage external connections
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[10px] font-bold uppercase tracking-widest hover:bg-white/10"
                  >
                    MANAGE <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Rank/Badge Display */}
            <div className="glass rounded-2xl border border-white/5 p-6 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent" />
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(0,255,200,0.1)]">
                <Rocket className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">
                  Membership Level
                </h4>
                <p className="text-primary font-black font-heading text-2xl uppercase">
                  {user.role}
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-wider">
                Current status: active. Full platform access granted.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
              <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest">
                Danger Zone
              </h4>
              <p className="text-[10px] text-muted-foreground uppercase leading-relaxed">
                Deletion of this profile is permanent. All account history will
                be lost.
              </p>
              <Button
                variant="ghost"
                className="w-full h-9 text-[10px] text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold uppercase tracking-widest border border-red-500/20"
              >
                DELETE ACCOUNT
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
