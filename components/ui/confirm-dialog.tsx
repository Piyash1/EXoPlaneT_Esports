"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudCard } from "@/components/admin/../ui/HudCard";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-md"
          >
            <HudCard variant="danger" className="overflow-visible">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-sm">
                      <ShieldAlert className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">
                        {title.split(" ").map((word, i) =>
                          i === title.split(" ").length - 1 ? (
                            <span key={i} className="text-red-500">
                              {word}
                            </span>
                          ) : (
                            word + " "
                          ),
                        )}
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest italic">
                        Security Protocol Activated
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-sm transition-colors group"
                  >
                    <X className="w-5 h-5 text-muted-foreground group-hover:text-white" />
                  </button>
                </div>

                <div className="h-px bg-white/5 w-full" />

                {/* Warning Content */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        Irreversible Operation
                      </p>
                      <p className="text-[10px] text-red-500/70 leading-relaxed font-mono uppercase">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 h-12 uppercase font-black italic tracking-widest text-xs border border-white/5 rounded-sm hover:bg-white/5"
                  >
                    Abort
                  </Button>
                  <Button
                    disabled={isLoading}
                    onClick={onConfirm}
                    className="flex-2 h-12 bg-red-500 hover:bg-red-600 text-white uppercase font-black italic tracking-widest text-xs rounded-sm shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Confirm Authorization"
                    )}
                  </Button>
                </div>
              </div>
            </HudCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
