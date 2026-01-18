"use client";

import { useState, useEffect, useRef } from "react";
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
  { name: "Tournaments", href: "/tournaments" },
  { name: "Achievements", href: "/achievements" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300 will-change-transform">
              <Image
                src="/logo-main.png"
                alt="Exoplanet Logo"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(0,255,200,0.3)] transition-all duration-300"
              />
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter text-white uppercase italic antialiased group-hover:text-primary/90 transition-colors">
              EXO
              <span className="text-primary transition-colors group-hover:text-white">
                PLANET
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
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

          {/* Action Buttons & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!isPending && (
              <>
                {session ? (
                  <UserDropdown />
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        className="text-sm sm:text-base text-muted-foreground hover:text-white px-2 sm:px-4"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/tryouts" className="hidden md:block">
                      <Button variant="neon" className="text-base px-6">
                        Apply Now
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-b border-white/10 overflow-hidden"
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
