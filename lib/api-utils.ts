import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { auth } from "./auth";
import { headers } from "next/headers";

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
};

export const apiResponse = {
  success: <T>(data: T, status = 200) => {
    return NextResponse.json({ success: true, data }, { status });
  },

  error: (message: string, status = 400, details?: any) => {
    return NextResponse.json(
      { success: false, error: message, details },
      { status },
    );
  },

  handleError: (error: any) => {
    console.error("[API ERROR]:", error);

    if (error instanceof ZodError) {
      return apiResponse.error("Validation Error", 400, error.issues);
    }

    if (error.code === "P2002") {
      return apiResponse.error("Unique constraint failed", 409);
    }

    return apiResponse.error(
      error instanceof Error ? error.message : "Internal Server Error",
      500,
    );
  },

  /**
   * Helper to get current session
   */
  getSession: async () => {
    return await auth.api.getSession({
      headers: await headers(),
    });
  },

  /**
   * RBAC Helper: Protects routes based on user role
   */
  requireRole: async (allowedRoles: string[]) => {
    const session = await apiResponse.getSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const userRole = (session.user as any).role;
    if (!allowedRoles.includes(userRole)) {
      throw new Error("Forbidden");
    }

    return session;
  },
};
