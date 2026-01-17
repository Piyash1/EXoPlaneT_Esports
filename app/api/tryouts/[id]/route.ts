import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { z } from "zod";

const StatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

/**
 * PATCH /api/tryouts/[id]
 * Update status of a tryout request (Admin/Manager only)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Check authorization: Admin or Manager only
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const { status } = StatusUpdateSchema.parse(body);

    const tryoutRequest = await prisma.tryoutRequest.update({
      where: { id },
      data: { status },
    });

    // If approved, create player profile and update user role
    if (status === "APPROVED" && tryoutRequest.userId) {
      // 1. Update user role
      await prisma.user.update({
        where: { id: tryoutRequest.userId },
        data: { role: "PLAYER" },
      });

      // 2. Create/Update player profile
      // Check if player profile already exists for this user (via playerId in User)
      // or check by IGN. Since Tryouts have IGN, we use that.
      await prisma.player.upsert({
        where: { ign: tryoutRequest.ign },
        create: {
          ign: tryoutRequest.ign,
          fullName: tryoutRequest.name,
          role: tryoutRequest.role,
          user: { connect: { id: tryoutRequest.userId } },
        },
        update: {
          fullName: tryoutRequest.name,
          role: tryoutRequest.role,
          user: { connect: { id: tryoutRequest.userId } },
        },
      });
    }

    return apiResponse.success(tryoutRequest);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized")
        return apiResponse.error("Sign in required", 401);
      if (error.message === "Forbidden")
        return apiResponse.error("Admin or Manager access required", 403);
    }
    return apiResponse.handleError(error);
  }
}
