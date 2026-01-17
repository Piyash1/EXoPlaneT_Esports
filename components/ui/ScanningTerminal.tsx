"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Terminal, Activity } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface LogEntry {
  id: string;
  text: string;
  type?: "info" | "success" | "warning" | "error";
  timestamp: string;
}

interface ScanningTerminalProps {
  logs: LogEntry[];
  title?: string;
  className?: string;
  isScanning?: boolean;
}

export function ScanningTerminal({
  logs,
  title = "SYSTEM LOGS",
  className,
  isScanning = true,
}: ScanningTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-black/60 border border-white/5 rounded-lg overflow-hidden glass",
        className,
      )}
    >
      {/* Terminal Header */}
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isScanning && (
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-[9px] text-primary font-mono animate-pulse uppercase">
                Scanning...
              </span>
            </div>
          )}
          <div className="w-2 h-2 rounded-full bg-primary/20 animate-ping" />
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-xs overflow-y-auto custom-scrollbar space-y-2 scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 group"
            >
              <span className="text-[10px] text-muted-foreground shrink-0 select-none">
                [{log.timestamp}]
              </span>
              <span
                className={cn(
                  "break-all",
                  log.type === "success" && "text-primary",
                  log.type === "warning" && "text-yellow-500",
                  log.type === "error" && "text-red-500",
                  !log.type && "text-white/80",
                )}
              >
                <span className="text-primary mr-1 opacity-50">›</span>
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {logs.length === 0 && (
          <div className="flex items-center justify-center h-full opacity-20 italic text-[10px]">
            Waiting for system telemetry...
          </div>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="h-1 bg-white/5 relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/3 bg-linear-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </div>
  );
}
