import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * GET /api/players
 * Fetch all players
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    const players = await prisma.player.findMany({
      where: teamId ? { teamId } : {},
      include: {
        team: {
          select: { name: true },
        },
      },
      orderBy: { ign: "asc" },
    });

    return apiResponse.success(players);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
// Note: POST for players is usually handled via registration or admin,
// so we'll stick to GET for now to keep it simple.
