import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * GET /api/teams/[id]
 * Fetch a single team with its roster and achievements
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        game: true,
        players: {
          select: {
            id: true,
            ign: true,
            role: true,
            image: true,
          },
        },
        achievements: {
          orderBy: { date: "desc" },
        },
      },
    });

    if (!team) return apiResponse.error("Team not found", 404);

    return apiResponse.success(team);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
