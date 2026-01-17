"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Rocket,
  User,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ShieldCheck,
  Loader2,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import UserDropdown from "@/components/layout/UserDropdown";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Teams", href: "/teams" },
  { name: "Games", href: "/games" },
  { name: "Achievements", href: "/achievements" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-xl tracking-wider text-white">
              EXO<span className="text-primary">PLANET</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary relative group",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isPending && (
              <>
                {session ? (
                  <UserDropdown />
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="text-base text-muted-foreground hover:text-white"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/tryouts">
                      <Button variant="neon" className="text-base px-6">
                        Apply Now
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-white/5 hover:text-primary",
                    pathname === link.href
                      ? "text-primary bg-white/5"
                      : "text-foreground",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                {!isPending && (
                  <>
                    {session ? (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden relative">
                            <Image
                              src={session.user.image || "/default-avatar.png"}
                              alt={session.user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white uppercase tracking-tighter">
                              {session.user.name}
                            </span>
                            <span className="text-[10px] text-primary uppercase font-bold">
                              {(session.user as any).role}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          disabled={isSigningOut}
                          onClick={async () => {
                            setIsSigningOut(true);
                            await authClient.signOut({
                              fetchOptions: {
                                onSuccess: () => {
                                  setIsSigningOut(false);
                                  setIsOpen(false);
                                },
                                onError: () => {
                                  setIsSigningOut(false);
                                },
                              },
                            });
                          }}
                        >
                          {isSigningOut ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <LogOut className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <User className="w-4 h-4 mr-2" /> Login
                          </Button>
                        </Link>
                        <Link href="/tryouts" onClick={() => setIsOpen(false)}>
                          <Button variant="default" className="w-full">
                            Apply for Roster
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
