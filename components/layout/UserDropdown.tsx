"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!session) return null;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: () => {
          setIsSigningOut(false);
        },
      },
    });
  };

  const user = session.user as any;
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-primary/50 transition-colors">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="hidden lg:flex flex-col items-start leading-tight">
          <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
            {user.name.split(" ")[0]}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {user.role}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-64 z-50 glass backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Dropdown Header */}
            <div className="p-4 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden relative">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                    {user.email}
                  </span>
                </div>
              </div>
              {isAdmin && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-tighter">
                  <ShieldCheck className="w-3 h-3" />
                  Administrator
                </div>
              )}
            </div>

            {/* Links Group */}
            <div className="p-2 space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
              >
                <LayoutDashboard className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                Player Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
              >
                <User className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                Player Profile
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                >
                  <ShieldCheck className="w-4 h-4 text-muted-foreground group-hover/item:text-secondary transition-colors" />
                  Admin Portal
                </Link>
              )}
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
              >
                <Settings className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                Account Settings
              </Link>
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-white/5">
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all disabled:opacity-50"
              >
                {isSigningOut ? (
                  <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
