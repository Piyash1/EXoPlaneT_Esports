import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { AchievementSchema } from "@/lib/validations";

/**
 * GET /api/admin/achievements
 * Fetch all achievements with team details for admin management
 */
export async function GET(request: NextRequest) {
  try {
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

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

/**
 * POST /api/admin/achievements
 * Create a new achievement
 */
export async function POST(request: NextRequest) {
  try {
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const body = await request.json();
    const validatedData = AchievementSchema.parse(body);

    const achievement = await prisma.achievement.create({
      data: validatedData,
      include: {
        team: {
          select: { name: true },
        },
      },
    });

    return apiResponse.success(achievement, 201);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
