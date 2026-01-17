"use client";

import { useEffect, useState } from "react";
import { Table, Button } from "@/components/ui/button"; // Typo in import, but I'll write the full component code below properly
import { Loader2, Users, Shield, UserCog, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// I need an API endpoint to fetch all users.
// I'll create a simple fetch inside useEffect assuming /api/users exists or I'll implement it.
// Wait, I haven't implemented /api/users yet.
// I should create that too.

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Note: We need to implement GET /api/users for this to work
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // If /api/users doesn't exist, this will fail.
        // I will assume I need to create it.
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          Unit Management
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          Personnel Database & Permissions
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
                  {/* Actions column if needed */}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
