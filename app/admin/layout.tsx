"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      } else if (
        (session.user as any).role !== "ADMIN" &&
        (session.user as any).role !== "MANAGER"
      ) {
        router.push("/dashboard"); // Redirect normal users to normal dashboard
      } else {
        setIsAuthorized(true);
      }
    }
  }, [session, isPending, router]);

  if (isPending || !isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-red-600 animate-pulse">
          Verifying Clearance...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
