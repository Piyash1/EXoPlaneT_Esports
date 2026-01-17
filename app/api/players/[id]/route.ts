import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { PlayerSchema } from "@/lib/validations";

/**
 * PATCH /api/players/[id]
 * Update player details (team, role, etc)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const player = await prisma.player.update({
      where: { id },
      data: body,
    });

    return apiResponse.success(player);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * DELETE /api/players/[id]
 * Remove player record
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await apiResponse.requireRole(["ADMIN"]);
    const { id } = await params;

    await prisma.player.delete({
      where: { id },
    });

    return apiResponse.success({ message: "Player removed successfully" });
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
