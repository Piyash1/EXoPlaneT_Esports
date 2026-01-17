import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * GET /api/users
 * Fetch all users (Admin/Manager only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authorization
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        playerProfile: {
          select: { ign: true },
        },
      },
    });

    return apiResponse.success(users);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized")
        return apiResponse.error("Sign in required", 401);
      if (error.message === "Forbidden")
        return apiResponse.error("Access denied", 403);
    }
    return apiResponse.handleError(error);
  }
}
