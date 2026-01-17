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
    badge: true, // You could fetch real counts later
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
            "fixed inset-y-0 left-0 z-40 w-64 bg-black/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-red-500" />
                <span className="font-heading font-black tracking-wider text-lg text-white">
                  COMMAND
                </span>
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 py-6 px-3 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative group overflow-hidden",
                      isActive
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "text-muted-foreground hover:text-white hover:bg-white/5",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive
                          ? "text-red-500"
                          : "text-muted-foreground group-hover:text-white",
                      )}
                    />
                    <span className="uppercase tracking-wide">
                      {item.title}
                    </span>
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-lg shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-white/5 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 w-full px-3 py-2 text-sm font-bold text-muted-foreground hover:text-white transition-colors uppercase tracking-wide group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:text-white transition-colors" />
                Back to Site
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm font-bold text-muted-foreground hover:text-red-500 transition-colors uppercase tracking-wide group"
              >
                <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                Log Out
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
