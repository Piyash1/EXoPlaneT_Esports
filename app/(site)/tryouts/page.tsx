import TryoutForm from "@/components/tryouts/TryoutForm";
import { Zap } from "lucide-react";
import { apiResponse } from "@/lib/api-utils";
import { redirect } from "next/navigation";

export default async function TryoutsPage() {
  const session = await apiResponse.getSession();

  if (!session) {
    redirect("/login?callbackUrl=/tryouts");
  }
  return (
    <div className="container max-w-4xl py-24 px-4 mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-pulse">
          <Zap className="w-3 h-3" />
          Applications Open
        </div>
        <h1 className="text-5xl md:text-6xl font-heading font-black text-white tracking-tighter">
          JOIN OUR <span className="text-primary">ROSTER</span>
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-bold">
          Professional Recruitment Process
        </p>
      </div>

      <div className="glass p-8 md:p-12 rounded-4xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">
          <TryoutForm />
        </div>
      </div>
    </div>
  );
}
