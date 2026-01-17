import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { PlayerSchema } from "@/lib/validations";

/**
 * POST /api/admin/recruit
 * Converts a TryoutRequest into an official Player record.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authorize Admin
    await apiResponse.requireRole(["ADMIN"]);

    const body = await request.json();
    const { tryoutRequestId, teamId, role, ign, fullName, image } = body;

    if (!tryoutRequestId) {
      return apiResponse.error("Tryout Request ID is required", 400);
    }

    // 2. Fetch specific tryout request
    const tryoutRequest = await prisma.tryoutRequest.findUnique({
      where: { id: tryoutRequestId },
      include: { user: true },
    });

    if (!tryoutRequest) {
      return apiResponse.error("Tryout request not found", 404);
    }

    if (!tryoutRequest.userId) {
      return apiResponse.error(
        "Candidate must be a registered user to be recruited",
        400,
      );
    }

    // 3. Check if IGN is already taken by ANOTHER user
    const existingPlayerWithIgn = await prisma.player.findUnique({
      where: { ign: ign || tryoutRequest.ign },
    });

    if (
      existingPlayerWithIgn &&
      existingPlayerWithIgn.userId !== tryoutRequest.userId
    ) {
      return apiResponse.error(
        "This IGN is already assigned to another operative",
        400,
      );
    }

    // 4. Upsert Player record (Transaction)
    const result = await prisma.$transaction(async (tx) => {
      // Create or update the player
      const player = await tx.player.upsert({
        where: { userId: tryoutRequest.userId! },
        update: {
          ign: ign || tryoutRequest.ign,
          fullName: fullName || tryoutRequest.name,
          role: role || tryoutRequest.role,
          teamId,
          image: image || tryoutRequest.user?.image,
        },
        create: {
          ign: ign || tryoutRequest.ign,
          fullName: fullName || tryoutRequest.name,
          role: role || tryoutRequest.role,
          teamId,
          image: image || tryoutRequest.user?.image,
          userId: tryoutRequest.userId!,
        },
      });

      // Update tryout request status to recruited
      await tx.tryoutRequest.update({
        where: { id: tryoutRequestId },
        data: { status: "APPROVED" }, // Or "RECRUITED" if we had that
      });

      // Update User role to PLAYER
      await tx.user.update({
        where: { id: tryoutRequest.userId! },
        data: { role: "PLAYER" },
      });

      return player;
    });

    return apiResponse.success(result, 201);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
