"use server";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

// Since better-auth handles most client-side, we can use these for specific server-side logic if needed
// However, for clean code, we'll keep the client-side calls in components and use these only for redirects or post-auth logic

export async function handlePostAuthRedirect() {
  redirect("/dashboard");
}
