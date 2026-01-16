import { apiResponse } from "@/lib/api-utils";
import prisma from "@/lib/prisma";

/**
 * GET /api/stats
 * Public endpoint for platform-wide counts
 */
export async function GET() {
  try {
    const [teamsCount, playersCount, gamesCount, achievementsCount] =
      await Promise.all([
        prisma.team.count(),
        prisma.player.count(),
        prisma.game.count(),
        prisma.achievement.count(),
      ]);

    return apiResponse.success({
      teams: teamsCount,
      players: playersCount,
      games: gamesCount,
      achievements: achievementsCount,
    });
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
