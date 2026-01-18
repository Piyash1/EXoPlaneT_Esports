import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";

/**
 * GET /api/achievements
 * Fetch all verified achievements for the public Hall of Fame
 */
export async function GET(request: NextRequest) {
  try {
    const achievements = await prisma.achievement.findMany({
      include: {
        team: {
          select: {
            name: true,
            game: { select: { name: true } },
          },
        },
      },
      orderBy: { date: "desc" },
    });

    return apiResponse.success(achievements);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
