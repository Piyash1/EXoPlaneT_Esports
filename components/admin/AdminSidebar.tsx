"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Swords,
  ShieldAlert,
  LogOut,
  ArrowLeft,
  Settings,
  Menu,
  ChevronRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tryouts",
    href: "/admin/tryouts",
    icon: Swords,
    badge: true,
  },
  {
    title: "Teams",
    href: "/admin/teams",
    icon: ShieldAlert,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-md border border-white/10 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-slate-950/95 backdrop-blur-2xl border-r border-red-500/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Tactical Header */}
            <div className="h-24 flex flex-col justify-center px-6 border-b border-white/5 relative bg-red-950/5">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-sm bg-red-500/10 border border-red-500/20">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black tracking-tighter text-xl text-white">
                    COMMAND
                  </span>
                  <span className="text-[8px] font-mono font-bold text-red-500 tracking-[0.4em] -mt-1 uppercase">
                    Center Nexus
                  </span>
                </div>
              </div>
            </div>

            {/* Nav Items - HUDS style */}
            <div className="flex-1 py-8 px-4 space-y-2">
              <div className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-[0.3em] px-3 mb-4">
                Main Systems
              </div>
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold transition-all relative group overflow-hidden border",
                      isActive
                        ? "bg-red-500/5 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
                        : "text-muted-foreground border-transparent hover:text-white hover:bg-white/5",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive
                            ? "text-red-500"
                            : "text-muted-foreground group-hover:text-white",
                        )}
                      />
                      <span className="uppercase tracking-widest text-xs">
                        {item.title}
                      </span>
                    </div>
                    {isActive ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
                    ) : (
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Tactical Footer */}
            <div className="p-6 border-t border-white/5 bg-black/40 space-y-3">
              <Link
                href="/"
                className="flex items-center gap-3 w-full px-3 py-2 text-[10px] font-black text-muted-foreground hover:text-white transition-colors uppercase tracking-[0.2em] group border border-transparent hover:border-white/10 rounded-sm"
              >
                <ArrowLeft className="w-3 h-3 group-hover:text-white transition-colors" />
                Exit Command
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2 text-[10px] font-black text-muted-foreground hover:text-red-500 transition-colors uppercase tracking-[0.2em] group border border-transparent hover:border-red-500/20 rounded-sm"
              >
                <LogOut className="w-3 h-3 group-hover:text-red-500 transition-colors" />
                Terminate Link
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
