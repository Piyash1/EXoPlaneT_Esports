"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/90 p-6 shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-500/10 p-3 text-red-500">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                className="bg-white/5 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={onConfirm}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete User"
                )}
              </Button>
            </div>

            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
