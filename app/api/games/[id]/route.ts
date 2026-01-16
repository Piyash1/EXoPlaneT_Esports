import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * GET /api/games/[id]
 * Fetch a single game with all associated teams
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        teams: {
          include: {
            _count: {
              select: { players: true },
            },
          },
        },
      },
    });

    if (!game) return apiResponse.error("Game not found", 404);

    return apiResponse.success(game);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
