"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Check,
  X,
  Swords,
  User,
  ShieldCheck,
  Mail,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HudBadge } from "@/components/ui/HudBadge";
import { HudCard } from "@/components/ui/HudCard";
import { RecruitDialog } from "@/components/admin/RecruitDialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminTryoutsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [recruitingTryout, setRecruitingTryout] = useState<any | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/tryouts");
      const result = await res.json();
      if (result.success) {
        setRequests(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch tryouts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/tryouts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await res.json();
      if (result.success) {
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status } : req)),
        );
      }
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <HudBadge label="Operations" variant="danger" />
          <HudBadge label="Applications" variant="secondary" />
        </div>
        <h1 className="text-4xl font-heading font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
          <Swords className="w-10 h-10 text-red-500" />
          Tryout <span className="text-red-500">Logistics</span>
        </h1>
        <p className="text-muted-foreground text-[10px] uppercase font-mono tracking-[0.4em] mt-1 ml-1">
          Recruitment Pipeline & Candidate Evaluation
        </p>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4 border border-white/5 bg-black/20 rounded-lg">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Initializing Telemetry...
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {requests.map((request) => (
            <HudCard
              key={request.id}
              variant={
                request.status === "APPROVED"
                  ? "primary"
                  : request.status === "REJECTED"
                    ? "danger"
                    : "ghost"
              }
              className="relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Section */}
                <div className="flex flex-col items-center gap-4 min-w-[140px]">
                  <div className="relative w-24 h-24 rounded-sm border border-white/10 overflow-hidden bg-white/5">
                    {request.user?.image ? (
                      <Image
                        src={request.user.image}
                        alt={request.ign}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">
                        <User className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-1 w-full text-center text-[8px] font-mono text-white/50">
                      {request.status}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading font-black text-white tracking-widest italic">
                      {request.ign}
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase font-bold">
                      {request.name}
                    </div>
                  </div>
                </div>

                {/* Intel Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-red-500" />
                        Objective
                      </div>
                      <div className="text-sm font-bold text-white">
                        {request.game}
                      </div>
                      <div className="text-[10px] text-red-500 font-mono italic">
                        {request.role || "UNASSIGNED"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                        <Mail className="w-3 h-3 text-red-500" />
                        Comms
                      </div>
                      <div className="text-xs text-white font-mono">
                        {request.email}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" />
                        {request.discord}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest mb-1 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-red-500" />
                        Timestamp
                      </div>
                      <div className="text-[10px] text-white font-mono">
                        {new Date(request.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <StatusBadge status={request.status} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    {request.status === "PENDING" ? (
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            handleUpdateStatus(request.id, "APPROVED")
                          }
                          disabled={!!processingId}
                          className="flex-1 h-10 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/20 rounded-sm text-[10px] font-black uppercase tracking-widest"
                        >
                          {processingId === request.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Authorize"
                          )}
                        </Button>
                        <Button
                          onClick={() =>
                            handleUpdateStatus(request.id, "REJECTED")
                          }
                          disabled={!!processingId}
                          className="flex-1 h-10 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-sm text-[10px] font-black uppercase tracking-widest"
                        >
                          {processingId === request.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Terminate"
                          )}
                        </Button>
                      </div>
                    ) : request.status === "APPROVED" ? (
                      <Button
                        onClick={() => setRecruitingTryout(request)}
                        className="w-full h-10 bg-primary/10 hover:bg-primary text-primary hover:text-black border border-primary/20 rounded-sm text-[10px] font-black uppercase tracking-widest"
                      >
                        Initialize Recruitment
                      </Button>
                    ) : (
                      <div className="text-center p-3 border border-white/5 bg-white/5 rounded-sm opacity-50">
                        <p className="text-[9px] font-mono uppercase text-muted-foreground tracking-widest">
                          Candidate Terminated
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* HUD Decoration */}
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-1 h-1 rounded-full bg-red-500/40 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-red-500/20" />
              </div>
            </HudCard>
          ))}
          {requests.length === 0 && (
            <div className="p-12 text-center border border-dashed border-white/10 rounded-xl">
              <p className="text-sm font-bold text-white/50 uppercase tracking-widest">
                No active data streams detected
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recruitment Dialog */}
      {recruitingTryout && (
        <RecruitDialog
          isOpen={!!recruitingTryout}
          tryout={recruitingTryout}
          onClose={() => setRecruitingTryout(null)}
          onSuccess={fetchRequests}
        />
      )}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const variants: any = {
    PENDING: "warning",
    APPROVED: "primary",
    REJECTED: "danger",
  };
  return <HudBadge label={status} variant={variants[status] || "secondary"} />;
};
