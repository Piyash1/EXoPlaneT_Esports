"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Shield, UserCog, Mail, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const result = await res.json();
          if (result.success) setUsers(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const confirmDelete = async () => {
    if (!userToDelete) return;

    setDeletingId(userToDelete);
    try {
      const res = await fetch(`/api/users/${userToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
        setUserToDelete(null);
      } else {
        const result = await res.json();
        console.error("Failed to delete user:", result.error || "System Error");
      }
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <ConfirmDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
        isLoading={!!deletingId}
      />
      <div>
        <h1 className="text-3xl font-black font-heading text-white tracking-widest uppercase mb-2">
          User Management
        </h1>
        <p className="text-muted-foreground">
          View and manage registered users and their roles.
        </p>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Identity
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Email
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Role
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs">
                    Joined
                  </th>
                  <th className="p-4 font-bold text-muted-foreground uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt=""
                            className="w-8 h-8 rounded-full border border-white/10"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <UserCog className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white">
                            {user.name}
                          </div>
                          {user.playerProfile?.ign && (
                            <div className="text-xs text-primary font-mono">
                              {user.playerProfile.ign}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border",
                          user.role === "ADMIN"
                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                            : user.role === "MANAGER"
                              ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                              : user.role === "PLAYER"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-white/5 text-muted-foreground border-white/10",
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground font-mono">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={
                          deletingId === user.id || user.role === "ADMIN"
                        }
                        onClick={() => setUserToDelete(user.id)}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                      >
                        {deletingId === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
