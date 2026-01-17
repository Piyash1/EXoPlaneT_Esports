"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: session, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        console.error(error);
      } else if (session) {
        const role = (session.user as any).role;
        router.push(role === "ADMIN" ? "/admin" : "/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="CREATE PROFILE" subtitle="Join the Organization">
      <SocialAuthButtons isLoading={isLoading} setIsLoading={setIsLoading} />

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black/40 backdrop-blur-xl px-2 text-muted-foreground">
            Or create your account
          </span>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="John 'Ghost' Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">
            Email
          </label>
          <Input
            type="email"
            placeholder="pilot@exoplanet.gg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-black hover:bg-primary/90 hover:scale-[1.02] h-12 font-bold transition-all mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              CREATING ACCOUNT...
            </div>
          ) : (
            "JOIN THE SQUAD"
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white font-bold hover:text-primary transition-colors"
          >
            LOGIN TO PORTAL
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
