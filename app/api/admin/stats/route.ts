import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * GET /api/admin/stats
 * Secure endpoint for admin dashboard statistics
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Check Authorization
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    // 2. Aggregate Data in Parallel
    const [totalUsers, totalTryouts, pendingTryouts, activePlayers] =
      await Promise.all([
        prisma.user.count(),
        prisma.tryoutRequest.count(),
        prisma.tryoutRequest.count({ where: { status: "PENDING" } }),
        prisma.player.count(), // Or prisma.user.count({ where: { role: "PLAYER" } }) depending on definition
      ]);

    return apiResponse.success({
      users: totalUsers,
      tryouts: totalTryouts,
      pendingTryouts: pendingTryouts,
      activePlayers: activePlayers,
    });
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
