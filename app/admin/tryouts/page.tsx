"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Check if badge exists or use custom
import { Loader2, Check, X, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple Badge component if not available
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    APPROVED: "bg-green-500/10 text-green-500 border-green-500/20",
    REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span
      className={cn(
        "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border",
        styles[status as keyof typeof styles] || styles.PENDING,
      )}
    >
      {status}
    </span>
  );
};

export default function AdminTryoutsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

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
        // Optimistic update
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status } : req)),
        );
      } else {
        alert("Failed to update status: " + result.error);
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
          <Swords className="w-8 h-8 text-secondary" />
          Tryout Operations
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Review and Process Applications
        </p>
      </div>

      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Player
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Game / Role
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Discord
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Submitted
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Status
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-white">{request.ign}</div>
                      <div className="text-xs text-muted-foreground">
                        {request.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">
                        {request.game}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest">
                        {request.role || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-muted-foreground">
                      {request.discord}
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="p-4 text-right">
                      {request.status === "PENDING" && (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(request.id, "APPROVED")
                            }
                            disabled={!!processingId}
                            className="h-8 bg-green-500/20 hover:bg-green-500/40 text-green-500 border border-green-500/50"
                          >
                            {processingId === request.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(request.id, "REJECTED")
                            }
                            disabled={!!processingId}
                            className="h-8 bg-red-500/20 hover:bg-red-500/40 text-red-500 border border-red-500/50"
                          >
                            {processingId === request.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-12 text-center text-muted-foreground"
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
