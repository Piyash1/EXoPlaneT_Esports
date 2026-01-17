"use client";

import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";

export default function VerifyEmailPage() {
  return (
    <AuthLayout title="TRANSMISSION SENT" subtitle="Neural Link Verification">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Mail className="w-8 h-8 text-primary animate-pulse" />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          We have dispatched a verification signal to your inbox. Please confirm
          your neural link to access the terminal.
        </p>

        <div className="space-y-4 w-full">
          <Link href="/login" className="w-full block">
            <Button variant="neon" className="w-full font-bold tracking-widest">
              RETURN TO LOGIN <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground">
            Didn't receive the signal?{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Resend Transmission
            </span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
