import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { apiResponse } from "@/lib/api-utils";
import { AchievementSchema } from "@/lib/validations";

/**
 * GET /api/achievements
 * Fetch all platform achievements
 */
export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      include: {
        team: {
          select: {
            name: true,
            game: {
              select: { name: true },
            },
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
 * POST /api/achievements
 * Add a new achievement (Admin/Manager only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authorization: Admin or Manager only
    await apiResponse.requireRole(["ADMIN", "MANAGER"]);

    const body = await request.json();

    // Validate request body
    const validatedData = AchievementSchema.parse(body);

    const achievement = await prisma.achievement.create({
      data: validatedData,
    });

    return apiResponse.success(achievement, 201);
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
